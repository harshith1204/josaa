"""
Tool: get_media_urls

Fetches campus photos/videos from Supabase college_media table.
Returns S3 URLs along with captions and media type.

The section → category mapping:
  D1 section          Admin panel category
  hostels_boys  →     hostel
  hostels_girls →     hostel
  academics     →     class   (classrooms)
  campus        →     campus
  sports/clubs/extra → extra_curricular
  mess/canteen  →     campus  (no dedicated category)
"""
from __future__ import annotations

import json
from typing import List, Optional

from langchain_core.tools import tool

from app.core.db import supabase


# Maps fine-grained D1 sections to admin-panel categories
_SECTION_TO_CATEGORY = {
    "hostels_boys": "hostel",
    "hostels_girls": "hostel",
    "hostel": "hostel",
    "academics": "class",
    "class": "class",
    "classrooms": "class",
    "campus": "campus",
    "sports": "extra_curricular",
    "clubs": "extra_curricular",
    "extra": "extra_curricular",
    "extra_curricular": "extra_curricular",
    "fests": "extra_curricular",
}

_VALID_CATEGORIES = {"hostel", "class", "campus", "extra_curricular"}


@tool
async def get_media_urls(
    college_id: str,
    category: Optional[str] = None,
    section_hint: Optional[str] = None,
    limit: int = 4,
) -> str:
    """
    Retrieve campus photos and videos for a college.
    Use this when the user asks to "show me photos", "what does the hostel look like",
    "show campus pictures", or any visual question about the college.

    Args:
        college_id:    Kebab-case college id, e.g. "iiit-gwalior".
        category:      One of: hostel, class, campus, extra_curricular.
                       Leave blank to return from any category.
        section_hint:  Fine-grained hint (e.g. "sports", "mess") — will be
                       mapped to the correct category automatically.
        limit:         Max number of media items to return (default 4).
    """
    db = supabase()

    # Resolve category from section_hint if category not provided
    if not category and section_hint:
        category = _SECTION_TO_CATEGORY.get(section_hint.lower())

    # Validate category
    if category and category not in _VALID_CATEGORIES:
        # Try mapping
        category = _SECTION_TO_CATEGORY.get(category.lower())

    query = (
        db.table("college_media")
        .select("url, filename, caption, media_type, duration_secs, category")
        .eq("college_id", college_id)
        .order("uploaded_at", desc=True)
        .limit(limit * 3)  # fetch extra so we can filter/dedupe
    )

    if category:
        query = query.eq("category", category)

    resp = query.execute()
    rows = resp.data or []

    if not rows:
        if category:
            return (
                f"No {category} media found for '{college_id}'. "
                "Media may not have been uploaded yet."
            )
        return f"No media found for '{college_id}'."

    # Deduplicate by URL and cap at limit
    seen_urls = set()
    items = []
    for row in rows:
        if row["url"] not in seen_urls:
            seen_urls.add(row["url"])
            items.append(
                {
                    "url": row["url"],
                    "type": row.get("media_type", "photo"),
                    "caption": row.get("caption") or row.get("filename") or "",
                    "duration": row.get("duration_secs"),
                    "category": row.get("category", ""),
                }
            )
        if len(items) >= limit:
            break

    return json.dumps({"media": items}, ensure_ascii=False)
