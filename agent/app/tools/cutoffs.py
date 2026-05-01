"""
Tool: lookup_cutoffs

Looks up JoSAA cutoff data from the Supabase colleges table.
The full cutoffs JSON is stored in colleges.data (uploaded via admin panel).

For now, queries the knowledge_chunks table for cutoff-related chunks
(section = 'placements' or 'overview') as a lightweight fallback until
the full cutoffs table is populated from simulator-cutoffs.json.
"""
from __future__ import annotations

import json
from typing import Optional

from langchain_core.tools import tool

from app.core.db import supabase
from app.core.embeddings import embeddings
from app.core.reranker import rerank


@tool
async def lookup_cutoffs(
    college: str,
    branch: Optional[str] = None,
    year: Optional[int] = None,
    quota: Optional[str] = None,
    gender: Optional[str] = None,
) -> str:
    """
    Look up JoSAA opening and closing ranks (cutoffs) for a college.
    Use this when the user asks about cutoffs, ranks required, opening rank,
    closing rank, or whether they can get admission with a specific rank.

    Args:
        college: Full or partial college name, e.g. "NIT Warangal".
        branch:  Optional branch/program name, e.g. "Computer Science".
        year:    Optional year, e.g. 2024. Defaults to most recent.
        quota:   Optional quota code: AI (All India), HS (Home State), OS (Other State).
        gender:  Optional: "Gender-Neutral" or "Female-only".
    """
    db = supabase()

    # Build a natural language query for semantic search
    parts = [f"{college} cutoffs"]
    if branch:
        parts.append(branch)
    if year:
        parts.append(str(year))
    if quota:
        parts.append(f"quota {quota}")
    query = " ".join(parts)

    query_vec = await embeddings.aembed_query(query)

    # Search knowledge_chunks for cutoff-related info
    rows = (
        db.rpc(
            "match_knowledge_chunks",
            {
                "query_embedding": query_vec,
                "match_college": None,  # search across all colleges
                "match_count": 15,
                "similarity_threshold": 0.3,
            },
        )
        .execute()
        .data
        or []
    )

    # Filter to the requested college name (case-insensitive)
    college_lower = college.lower()
    rows = [r for r in rows if college_lower in (r.get("college") or "").lower()]

    if not rows:
        return (
            f"No cutoff data found for '{college}'. "
            "Cutoff data may not have been uploaded yet. "
            "Try the JoSAA simulator at cutoffs.ai/simulator for official figures."
        )

    ranked = await rerank(query, rows, text_key="chunk_text", top_k=5)
    context = "\n".join(c["chunk_text"] for c in ranked)

    note = (
        "\n\nNote: For exact round-wise cutoffs, use the cutoffs.ai simulator "
        "which has complete JoSAA 2023–2025 data."
    )
    return context + note
