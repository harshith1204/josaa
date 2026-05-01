"""
Tool: search_college_knowledge

Semantic search over knowledge_chunks using Supabase pgvector (HNSW) +
Cloudflare bge-reranker-base for precision re-ranking.

Pipeline:
  1. Embed query with bge-m3 (1024-dim)
  2. Call match_knowledge_chunks() RPC  → top-20 candidates by cosine sim
  3. Re-rank top-20 with bge-reranker   → top-8 by cross-encoder score
  4. Return formatted context + any attached media_urls
"""
from __future__ import annotations

import json
from typing import Any, Dict, List, Optional

from langchain_core.tools import tool

from app.core.db import supabase
from app.core.embeddings import embeddings
from app.core.reranker import rerank


@tool
async def search_college_knowledge(
    query: str,
    college_id: str,
    sections: Optional[List[str]] = None,
) -> str:
    """
    Search factual information about a specific college.
    Use this for questions about hostels, mess food, fee structure,
    transport/how to reach, WiFi, sports facilities, clubs, fests,
    academics, attendance rules, campus life, medical facilities,
    laundry, gym, nearby places, or any general campus question.

    Args:
        query: The user's question in natural language.
        college_id: Kebab-case college identifier, e.g. "nit-manipur".
        sections: Optional list to restrict search to specific sections.
                  Valid values: overview, transport, hostels_boys,
                  hostels_girls, mess, fee_structure, wifi, sports,
                  clubs, placements, academics, campus, canteen,
                  medical, laundry, gym, attendance.
    """
    db = supabase()

    # Step 1: embed query
    query_vec = await embeddings.aembed_query(query)

    # Step 2: vector search via stored function
    params: Dict[str, Any] = {
        "query_embedding": query_vec,
        "match_college": college_id,
        "match_count": 20,
        "similarity_threshold": 0.25,
    }
    if sections:
        params["match_sections"] = sections

    response = db.rpc("match_knowledge_chunks", params).execute()
    rows: List[Dict[str, Any]] = response.data or []

    if not rows:
        return (
            f"No information found for college_id='{college_id}' "
            f"matching your query. The college may not be indexed yet."
        )

    # Step 3: re-rank
    ranked = await rerank(query, rows, text_key="chunk_text", top_k=8)

    # Step 4: format context for the LLM
    context_parts = []
    media_urls: List[str] = []

    for chunk in ranked:
        context_parts.append(chunk["chunk_text"])
        if chunk.get("media_urls"):
            media_urls.extend(chunk["media_urls"])

    context = "\n\n".join(context_parts)
    result: Dict[str, Any] = {"context": context}
    if media_urls:
        result["media_urls"] = list(dict.fromkeys(media_urls))[:4]  # dedupe, max 4

    return json.dumps(result, ensure_ascii=False)
