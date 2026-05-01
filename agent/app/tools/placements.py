"""
Tool: get_placement_stats

Fetches placement statistics from the Supabase college_placements table.
Falls back to knowledge_chunks search if the structured table is empty.
"""
from __future__ import annotations

import json
from typing import Optional

from langchain_core.tools import tool

from app.core.db import supabase
from app.core.embeddings import embeddings
from app.core.reranker import rerank


@tool
async def get_placement_stats(
    college_id: str,
    year: Optional[int] = None,
) -> str:
    """
    Get placement statistics for a college: CTC figures, top recruiters,
    sector breakdown, branch-wise placement rates.
    Use this when the user asks about salary packages, placements, companies,
    job offers, CTC, PPOs, or internship conversions.

    Args:
        college_id: Kebab-case college id, e.g. "nit-warangal".
        year:       Optional year, e.g. 2024. Returns latest if not specified.
    """
    db = supabase()

    # Try structured placements table first
    query = db.table("college_placements").select("*").eq("college_id", college_id)
    if year:
        query = query.eq("year", year)
    else:
        query = query.order("year", desc=True).limit(1)

    resp = query.execute()
    rows = resp.data or []

    if rows:
        row = rows[0]
        placement_data = row.get("data", {})
        yr = row.get("year", "latest")
        label = f"{college_id} placements {yr}"

        parts = []
        summary = placement_data.get("summary", {})
        if summary.get("placement_percentage"):
            parts.append(f"Placement rate: {summary['placement_percentage']}%")
        if summary.get("total_placed"):
            parts.append(
                f"Placed: {summary['total_placed']} / {summary.get('total_registered', '?')}"
            )
        if summary.get("companies_visited"):
            parts.append(f"Companies: {summary['companies_visited']}")

        ctc = placement_data.get("ctc", {})
        if ctc.get("average"):
            parts.append(f"Average CTC: {ctc['average']}")
        if ctc.get("highest_domestic"):
            parts.append(f"Highest (domestic): {ctc['highest_domestic']}")
        if ctc.get("highest_international"):
            parts.append(f"Highest (international): {ctc['highest_international']}")
        if ctc.get("median"):
            parts.append(f"Median CTC: {ctc['median']}")

        recruiters = placement_data.get("top_recruiters", [])[:5]
        if recruiters:
            names = [r.get("name", "") for r in recruiters]
            parts.append(f"Top recruiters: {', '.join(names)}")

        if parts:
            return f"{label} — " + "; ".join(parts) + "."

    # Fallback: semantic search in knowledge_chunks
    query_text = f"{college_id} placements salary CTC recruiters"
    query_vec = await embeddings.aembed_query(query_text)

    kc_rows = (
        db.rpc(
            "match_knowledge_chunks",
            {
                "query_embedding": query_vec,
                "match_college": college_id,
                "match_sections": ["placements"],
                "match_count": 10,
                "similarity_threshold": 0.25,
            },
        )
        .execute()
        .data
        or []
    )

    if not kc_rows:
        return (
            f"No placement data found for '{college_id}'. "
            "Placement data may not have been uploaded yet."
        )

    ranked = await rerank(query_text, kc_rows, text_key="chunk_text", top_k=5)
    return "\n".join(c["chunk_text"] for c in ranked)
