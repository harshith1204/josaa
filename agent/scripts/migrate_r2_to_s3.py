#!/usr/bin/env python3
"""
One-time migration: Cloudflare R2 media → AWS S3 + Supabase college_media

Reads backend/chatbot/seed_all_media.sql (INSERT INTO media_assets ...),
downloads each file from the R2 URL, re-uploads to S3, then inserts a row
into Supabase college_media with the new S3 URL, caption, media_type, and
duration_secs.

Usage:
  cd agent/
  cp .env.example .env   # fill in real values + S3 credentials
  python scripts/migrate_r2_to_s3.py [--dry-run] [--college "IIIT Gwalior"]

Env vars required:
  SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
  AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

Colleges with R2 media (from seed_all_media.sql):
  IIIT Gwalior, NIT Nagaland, IIT Kharagpur
"""
from __future__ import annotations

import argparse
import os
import re
import sys
import time
from pathlib import Path
from typing import Any, Dict, List, Optional
from urllib.parse import urlparse

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

import boto3
import httpx
from botocore.exceptions import ClientError
from supabase import create_client

# ── Paths ────────────────────────────────────────────────────────────────────
REPO_ROOT   = Path(__file__).resolve().parents[2]
MEDIA_FILES = [
    REPO_ROOT / "backend" / "chatbot" / "seed_all_media.sql",
    REPO_ROOT / "backend" / "chatbot" / "seed_media_iiit_gwalior.sql",
    REPO_ROOT / "backend" / "chatbot" / "seed_media_nit_nagaland_v2.sql",
    REPO_ROOT / "backend" / "chatbot" / "seed_media_iit_kharagpur.sql",
    REPO_ROOT / "backend" / "chatbot" / "seed_nit_media.sql",
]

# ── Config ───────────────────────────────────────────────────────────────────
SUPA_URL   = os.environ["SUPABASE_URL"]
SUPA_KEY   = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")
AWS_BUCKET = os.environ["AWS_S3_BUCKET"]

# D1 section name → admin-panel category
_SECTION_TO_CATEGORY = {
    "hostels_boys":  "hostel",
    "hostels_girls": "hostel",
    "hostel":        "hostel",
    "academics":     "class",
    "campus":        "campus",
    "sports":        "extra_curricular",
    "clubs":         "extra_curricular",
    "extra":         "extra_curricular",
    "canteen":       "campus",
    "mess":          "campus",
    "medical":       "campus",
    "gym":           "extra_curricular",
    "fests":         "extra_curricular",
}


# ── SQL parser ────────────────────────────────────────────────────────────────

_INSERT_RE = re.compile(
    r"INSERT INTO media_assets\s*\(college,\s*section,\s*media_type,\s*caption,\s*r2_url,\s*duration_seconds\)"
    r"\s*VALUES\s*\('([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'((?:[^']|'')*)',\s*'([^']*)',\s*(NULL|\d+)\s*\)\s*;",
    re.IGNORECASE,
)

def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def parse_media_sql(
    paths: List[Path], college_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    seen_urls: set = set()
    rows = []
    for path in paths:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        for m in _INSERT_RE.finditer(text):
            college        = m.group(1).replace("''", "'")
            section        = m.group(2)
            media_type     = m.group(3)
            caption        = m.group(4).replace("''", "'")
            r2_url         = m.group(5)
            duration_raw   = m.group(6)
            duration_secs  = None if duration_raw == "NULL" else int(duration_raw)

            if college_filter and college.lower() != college_filter.lower():
                continue
            if r2_url in seen_urls:
                continue
            seen_urls.add(r2_url)

            rows.append(
                {
                    "college":      college,
                    "college_id":   _slugify(college),
                    "section":      section,
                    "category":     _SECTION_TO_CATEGORY.get(section, "campus"),
                    "media_type":   media_type,
                    "caption":      caption,
                    "r2_url":       r2_url,
                    "duration_secs": duration_secs,
                }
            )
    return rows


# ── S3 upload ─────────────────────────────────────────────────────────────────

def _s3_key_from_r2_url(r2_url: str, college_id: str, filename: str) -> str:
    """Derive S3 key from R2 URL path."""
    parsed = urlparse(r2_url)
    # e.g. /file/colleges/iiit-gwalior/photos/1234-photo.jpg
    path = parsed.path.lstrip("/")
    # Remove the "file/" prefix if present (R2 worker adds it)
    path = re.sub(r"^file/", "", path)
    return path  # → colleges/iiit-gwalior/photos/1234-photo.jpg


def upload_to_s3(
    s3_client: Any,
    r2_url: str,
    college_id: str,
    media_type: str,
    filename: str,
) -> Optional[str]:
    """Download from R2, upload to S3. Returns public S3 URL or None on error."""
    s3_key = _s3_key_from_r2_url(r2_url, college_id, filename)
    content_type = "video/mp4" if media_type == "video" else "image/jpeg"

    try:
        with httpx.Client(timeout=60.0) as client:
            resp = client.get(r2_url)
            resp.raise_for_status()
            data = resp.content
    except Exception as e:
        print(f"    WARN: download failed for {r2_url}: {e}")
        return None

    try:
        s3_client.put_object(
            Bucket=AWS_BUCKET,
            Key=s3_key,
            Body=data,
            ContentType=content_type,
        )
    except ClientError as e:
        print(f"    WARN: S3 upload failed for {s3_key}: {e}")
        return None

    return f"https://{AWS_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{s3_key}"


# ── Supabase insert ───────────────────────────────────────────────────────────

def insert_college_media(db: Any, rows: List[Dict[str, Any]]) -> int:
    inserted = 0
    batch: List[Dict[str, Any]] = []
    for row in rows:
        if not row.get("s3_url"):
            continue
        # Ensure parent college row exists (upsert minimal record)
        db.table("colleges").upsert(
            {
                "college_id": row["college_id"],
                "name":       row["college"],
                "data":       {},
            },
            on_conflict="college_id",
        ).execute()

        batch.append(
            {
                "college_id":    row["college_id"],
                "category":      row["category"],
                "url":           row["s3_url"],
                "filename":      row.get("filename", ""),
                "caption":       row["caption"],
                "media_type":    row["media_type"],
                "duration_secs": row["duration_secs"],
            }
        )

        if len(batch) >= 50:
            db.table("college_media").insert(batch).execute()
            inserted += len(batch)
            batch = []

    if batch:
        db.table("college_media").insert(batch).execute()
        inserted += len(batch)

    return inserted


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Migrate R2 media to S3 + Supabase")
    parser.add_argument("--college", help="Migrate only this college (exact name)")
    parser.add_argument("--dry-run", action="store_true", help="Parse only, no uploads or DB writes")
    args = parser.parse_args()

    print("Parsing media SQL files…")
    rows = parse_media_sql(MEDIA_FILES, college_filter=args.college)
    if not rows:
        print("No rows found.")
        sys.exit(0)
    print(f"  Found {len(rows)} media items" + (f" for '{args.college}'" if args.college else ""))

    if args.dry_run:
        for r in rows[:5]:
            print(f"  [dry-run] {r['college']} / {r['section']} / {r['caption'][:60]}")
        print(f"  … (showing first 5 of {len(rows)})")
        return

    s3 = boto3.client(
        "s3",
        region_name=AWS_REGION,
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    db = create_client(SUPA_URL, SUPA_KEY)

    print("Uploading to S3…")
    for i, row in enumerate(rows):
        filename = row["r2_url"].split("/")[-1]
        row["filename"] = filename
        s3_url = upload_to_s3(s3, row["r2_url"], row["college_id"], row["media_type"], filename)
        row["s3_url"] = s3_url
        if (i + 1) % 20 == 0:
            print(f"  {i+1}/{len(rows)} uploaded")
        time.sleep(0.05)  # gentle rate limiting

    successful = sum(1 for r in rows if r.get("s3_url"))
    print(f"  {successful}/{len(rows)} files uploaded to S3")

    print("Inserting into Supabase college_media…")
    inserted = insert_college_media(db, rows)
    print(f"  {inserted} rows inserted")

    print(f"\nDone. {successful} files on S3, {inserted} rows in Supabase.")


if __name__ == "__main__":
    main()
