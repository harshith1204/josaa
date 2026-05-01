"""
Chunk a placements JSON into flat text chunks suitable for embedding.

Expected placements JSON schema:
{
  "college": "NIT Warangal",
  "college_id": "nit-warangal",
  "year": 2024,
  "summary": {
    "total_registered": 1200,
    "total_placed": 980,
    "placement_percentage": 81.7,
    "companies_visited": 150,
    "offers_received": 1240
  },
  "ctc": {
    "highest_domestic": "1.8 Cr",
    "highest_international": "2.1 Cr",
    "average": "12.5 LPA",
    "median": "10 LPA"
  },
  "top_recruiters": [
    { "name": "Microsoft", "offers": 45, "role": "SDE", "ctc_range": "24-45 LPA" }
  ],
  "sector_breakdown": {
    "it_software": 50,
    "core_engineering": 30,
    "finance": 10,
    "others": 10
  },
  "branch_wise": [
    { "branch": "CSE", "total": 120, "placed": 115, "avg_ctc": "18 LPA" }
  ]
}
"""
from __future__ import annotations

import re
from typing import Any, Dict, List


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _estimate_tokens(text: str) -> int:
    return int(len(text.split()) * 1.3)


def _mk(college_id: str, college: str, year: int, text: str) -> Dict[str, Any]:
    return {
        "college_id": college_id,
        "college": college,
        "section": "placements",
        "chunk_text": text,
        "token_count": _estimate_tokens(text),
    }


def chunk_placements_json(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Convert a placements JSON dict into a flat list of chunk dicts."""
    college = data.get("college", "Unknown College")
    college_id = data.get("college_id") or _slugify(college)
    year = data.get("year", "")
    label = f"{college} placements {year}"
    chunks: List[Dict[str, Any]] = []

    # Summary chunk
    summary = data.get("summary", {})
    if summary:
        parts = []
        if summary.get("total_registered"):
            parts.append(f"registered: {summary['total_registered']}")
        if summary.get("total_placed"):
            parts.append(f"placed: {summary['total_placed']}")
        if summary.get("placement_percentage"):
            parts.append(f"placement rate: {summary['placement_percentage']}%")
        if summary.get("companies_visited"):
            parts.append(f"companies: {summary['companies_visited']}")
        if summary.get("offers_received"):
            parts.append(f"offers: {summary['offers_received']}")
        if parts:
            text = f"{label} — summary: {', '.join(parts)}."
            chunks.append(_mk(college_id, college, year, text))

    # CTC chunk
    ctc = data.get("ctc", {})
    if ctc:
        parts = []
        if ctc.get("highest_domestic"):
            parts.append(f"highest domestic {ctc['highest_domestic']}")
        if ctc.get("highest_international"):
            parts.append(f"highest international {ctc['highest_international']}")
        if ctc.get("average"):
            parts.append(f"average {ctc['average']}")
        if ctc.get("median"):
            parts.append(f"median {ctc['median']}")
        if parts:
            text = f"{label} — CTC: {', '.join(parts)}."
            chunks.append(_mk(college_id, college, year, text))

    # Top recruiters — group into chunks of 5
    recruiters = data.get("top_recruiters", [])
    _GROUP = 5
    for i in range(0, len(recruiters), _GROUP):
        batch = recruiters[i : i + _GROUP]
        parts = []
        for r in batch:
            desc = r.get("name", "")
            if r.get("offers"):
                desc += f" ({r['offers']} offers"
                if r.get("ctc_range"):
                    desc += f", {r['ctc_range']}"
                if r.get("role"):
                    desc += f", {r['role']}"
                desc += ")"
            parts.append(desc)
        text = f"{label} — top recruiters: {', '.join(parts)}."
        chunks.append(_mk(college_id, college, year, text))

    # Sector breakdown
    sectors = data.get("sector_breakdown", {})
    if sectors:
        parts = [f"{k.replace('_', ' ')}: {v}%" for k, v in sectors.items()]
        text = f"{label} — sector breakdown: {', '.join(parts)}."
        chunks.append(_mk(college_id, college, year, text))

    # Branch-wise — one chunk per branch or group of 5
    branches = data.get("branch_wise", [])
    for i in range(0, len(branches), 5):
        batch = branches[i : i + 5]
        parts = []
        for b in batch:
            desc = b.get("branch", "")
            if b.get("placed") is not None:
                desc += f": {b['placed']}/{b.get('total', '?')} placed"
            if b.get("avg_ctc"):
                desc += f" avg {b['avg_ctc']}"
            parts.append(desc)
        text = f"{label} — branch-wise: {', '.join(parts)}."
        chunks.append(_mk(college_id, college, year, text))

    return chunks
