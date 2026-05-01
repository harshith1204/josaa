#!/usr/bin/env python3
"""
One-time migration: Cloudflare D1 → Supabase pgvector

Reads backend/chatbot/seed_all_colleges.sql (all chunk INSERT statements),
embeds every chunk via Cloudflare bge-m3 REST API, then upserts into
Supabase knowledge_chunks.

Usage:
  cd agent/
  cp .env.example .env   # fill in real values
  python scripts/migrate_from_d1.py [--dry-run] [--college "NIT Manipur"]

Env vars required (from .env or shell):
  CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_AI_TOKEN
  SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

# Load .env if present
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

import httpx
from supabase import create_client

# ── Paths ────────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).resolve().parents[2]
SEED_SQL = REPO_ROOT / "backend" / "chatbot" / "seed_all_colleges.sql"

# ── Config ───────────────────────────────────────────────────────────────────
CF_ACCOUNT = os.environ["CLOUDFLARE_ACCOUNT_ID"]
CF_TOKEN   = os.environ["CLOUDFLARE_AI_TOKEN"]
SUPA_URL   = os.environ["SUPABASE_URL"]
SUPA_KEY   = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

EMBED_URL = (
    f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT}"
    "/ai/run/@cf/baai/bge-m3"
)
EMBED_HEADERS = {
    "Authorization": f"Bearer {CF_TOKEN}",
    "Content-Type": "application/json",
}

BATCH_EMBED  = 32   # max texts per bge-m3 request
BATCH_UPSERT = 50   # rows per Supabase upsert call


# ── SQL parser ────────────────────────────────────────────────────────────────

_INSERT_RE = re.compile(
    r"INSERT INTO knowledge_chunks\s*\(college,\s*section,\s*chunk_text\)\s*VALUES\s*"
    r"\('([^']*)',\s*'([^']*)',\s*'((?:[^']|'')*)'\s*\)\s*;",
    re.IGNORECASE,
)

def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def parse_seed_sql(path: Path, college_filter: Optional[str] = None) -> List[Dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    rows = []
    for m in _INSERT_RE.finditer(text):
        college  = m.group(1).replace("''", "'")
        section  = m.group(2).replace("''", "'")
        chunk    = m.group(3).replace("''", "'")
        if college_filter and college.lower() != college_filter.lower():
            continue
        rows.append(
            {
                "college_id": _slugify(college),
                "college":    college,
                "section":    section,
                "chunk_text": chunk,
            }
        )
    return rows


# ── Embedding ─────────────────────────────────────────────────────────────────

def embed_batch(texts: List[str]) -> List[List[float]]:
    with httpx.Client(timeout=60.0) as client:
        resp = client.post(EMBED_URL, headers=EMBED_HEADERS, json={"text": texts})
        resp.raise_for_status()
        return resp.json()["result"]["data"]


def embed_all(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    print(f"  Embedding {len(rows)} chunks in batches of {BATCH_EMBED}…")
    for i in range(0, len(rows), BATCH_EMBED):
        batch = rows[i : i + BATCH_EMBED]
        texts = [r["chunk_text"] for r in batch]
        vecs  = embed_batch(texts)
        for row, vec in zip(batch, vecs):
            row["embedding"] = vec
        if (i // BATCH_EMBED + 1) % 10 == 0:
            print(f"    {i + len(batch)}/{len(rows)} embedded")
    return rows


# ── Supabase upsert ───────────────────────────────────────────────────────────

def upsert_all(rows: List[Dict[str, Any]], dry_run: bool = False) -> int:
    if dry_run:
        print(f"  [dry-run] Would upsert {len(rows)} rows.")
        return 0

    db = create_client(SUPA_URL, SUPA_KEY)

    # Group by college_id so we delete stale data per college before inserting
    colleges_seen: set = set()

    upserted = 0
    for i in range(0, len(rows), BATCH_UPSERT):
        batch_rows = rows[i : i + BATCH_UPSERT]

        # Delete existing chunks for each new college we're about to insert
        for row in batch_rows:
            cid = row["college_id"]
            if cid not in colleges_seen:
                colleges_seen.add(cid)
                db.table("knowledge_chunks").delete().eq("college_id", cid).execute()
                print(f"  Cleared existing chunks for '{cid}'")

        batch = [
            {
                "college_id":  r["college_id"],
                "college":     r["college"],
                "section":     r["section"],
                "chunk_text":  r["chunk_text"],
                "embedding":   r["embedding"],
                "token_count": int(len(r["chunk_text"].split()) * 1.3),
                "media_urls":  [],
            }
            for r in batch_rows
        ]
        db.table("knowledge_chunks").insert(batch).execute()
        upserted += len(batch)
        print(f"  Upserted {upserted}/{len(rows)}")
    return upserted


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Migrate D1 chunks to Supabase pgvector")
    parser.add_argument("--college", help="Migrate only this college (exact name)")
    parser.add_argument("--dry-run", action="store_true", help="Parse + embed only, no Supabase writes")
    args = parser.parse_args()

    if not SEED_SQL.exists():
        print(f"ERROR: seed file not found: {SEED_SQL}", file=sys.stderr)
        sys.exit(1)

    print(f"Parsing {SEED_SQL} …")
    rows = parse_seed_sql(SEED_SQL, college_filter=args.college)
    if not rows:
        print("No rows matched. Check --college value or seed file.")
        sys.exit(0)
    print(f"  Parsed {len(rows)} chunks" + (f" for '{args.college}'" if args.college else " (all colleges)"))

    rows = embed_all(rows)
    upserted = upsert_all(rows, dry_run=args.dry_run)

    print(f"\nDone. {upserted} rows upserted into Supabase knowledge_chunks.")


if __name__ == "__main__":
    main()
