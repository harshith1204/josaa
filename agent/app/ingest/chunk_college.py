"""
Chunk a college knowledge-base JSON into flat text chunks suitable for
embedding and storage in Supabase knowledge_chunks.

Input JSON shape (from admin panel / campus-ambassador JSONs):
{
  "college": "NIT Manipur",
  "full_name": "National Institute of Technology Manipur",
  "sections": {
    "overview":        { "facts": ["...", "..."] },
    "transport":       { "facts": [...] },
    "hostels_boys":    { "facts": [...] },
    "hostels_girls":   { "facts": [...] },
    "mess":            { "assignment": "...", "timings": "...",
                         "mess_schedule": {...}, "facts": [...] },
    "fee_structure":   { "facts": [...] },
    "wifi":            { "facts": [...] },
    "sports":          { "facts": [...] },
    "clubs":           { "facts": [...] },
    "placements":      { "facts": [...] },
    "academics":       { "facts": [...] },
    ...
  }
}

Each returned chunk dict:
  college_id  : kebab-case college id
  college     : human-readable name
  section     : section key
  chunk_text  : concatenated text
  token_count : rough estimate (word count * 1.3)
"""
from __future__ import annotations

import re
from typing import Any, Dict, List


_FACTS_PER_CHUNK = 5  # facts to bundle into one chunk


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _estimate_tokens(text: str) -> int:
    return int(len(text.split()) * 1.3)


def _chunk_facts(
    college: str,
    college_id: str,
    section: str,
    facts: List[str],
    prefix: str = "",
) -> List[Dict[str, Any]]:
    chunks = []
    label = f"{college} {section.replace('_', ' ')}:"
    if prefix:
        label = f"{college} {section.replace('_', ' ')} ({prefix}):"

    for i in range(0, max(len(facts), 1), _FACTS_PER_CHUNK):
        batch = facts[i : i + _FACTS_PER_CHUNK]
        text = f"{label} " + " ".join(batch)
        chunks.append(
            {
                "college_id": college_id,
                "college": college,
                "section": section,
                "chunk_text": text,
                "token_count": _estimate_tokens(text),
            }
        )
    return chunks


def _flatten_mess(college: str, college_id: str, mess: Dict[str, Any]) -> List[Dict[str, Any]]:
    chunks = []
    label = f"{college} mess:"

    # Assignment + timings as one chunk
    parts = []
    if mess.get("assignment"):
        parts.append(mess["assignment"])
    if mess.get("timings"):
        parts.append(f"Timings: {mess['timings']}")
    if parts:
        text = f"{label} " + " ".join(parts)
        chunks.append(
            {
                "college_id": college_id,
                "college": college,
                "section": "mess",
                "chunk_text": text,
                "token_count": _estimate_tokens(text),
            }
        )

    # Weekly schedule — one chunk per day
    schedule = mess.get("mess_schedule", {})
    if schedule:
        for day, meals in schedule.items():
            parts = [f"{day.capitalize()}:"]
            for meal, items in meals.items():
                parts.append(f"{meal} — {items}")
            text = f"{label} weekly schedule — " + " | ".join(parts)
            chunks.append(
                {
                    "college_id": college_id,
                    "college": college,
                    "section": "mess",
                    "chunk_text": text,
                    "token_count": _estimate_tokens(text),
                }
            )

    # Remaining facts
    if mess.get("facts"):
        chunks.extend(_chunk_facts(college, college_id, "mess", mess["facts"]))

    return chunks


def chunk_college_json(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Convert a college knowledge-base JSON dict into a flat list of chunk dicts.
    """
    college = data.get("college") or data.get("full_name", "Unknown College")
    college_id = data.get("college_id") or _slugify(college)
    sections: Dict[str, Any] = data.get("sections", {})

    chunks: List[Dict[str, Any]] = []

    for section_key, section_data in sections.items():
        if not isinstance(section_data, dict):
            continue

        # Special-case mess section (has schedule sub-object)
        if section_key == "mess":
            chunks.extend(_flatten_mess(college, college_id, section_data))
            continue

        # Generic: collect all list-of-string values as facts
        facts: List[str] = []
        for val in section_data.values():
            if isinstance(val, list):
                facts.extend(str(v) for v in val if v)
            elif isinstance(val, str) and val:
                facts.append(val)

        if facts:
            chunks.extend(_chunk_facts(college, college_id, section_key, facts))

    return chunks
