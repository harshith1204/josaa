"""
Cloudflare BGE-Reranker-Base via REST API.

Used after vector search to re-score and re-rank the top-20 candidate
chunks down to the top-8, improving answer quality significantly.
"""
from __future__ import annotations

import os
from typing import Any, Dict, List

import httpx


CF_RERANK_URL = (
    "https://api.cloudflare.com/client/v4/accounts/{account_id}"
    "/ai/run/@cf/baai/bge-reranker-base"
)


def _headers() -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {os.environ['CLOUDFLARE_AI_TOKEN']}",
        "Content-Type": "application/json",
    }


def _url() -> str:
    return CF_RERANK_URL.format(account_id=os.environ["CLOUDFLARE_ACCOUNT_ID"])


async def rerank(
    query: str,
    chunks: List[Dict[str, Any]],
    text_key: str = "chunk_text",
    top_k: int = 8,
) -> List[Dict[str, Any]]:
    """
    Re-rank chunks using bge-reranker-base.

    Args:
        query: The user question.
        chunks: List of dicts, each containing at least text_key.
        text_key: Key in each dict that holds the text to score.
        top_k: Maximum number of chunks to return.

    Returns:
        Subset of chunks sorted by descending rerank score, with
        a 'rerank_score' key added to each dict.
    """
    if not chunks:
        return []

    contexts = [{"text": c[text_key]} for c in chunks]

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                _url(),
                headers=_headers(),
                json={"query": query, "contexts": contexts, "top_k": top_k},
            )
            resp.raise_for_status()
            raw = resp.json()["result"]["response"]
    except Exception as exc:
        # Graceful fallback: return top-k unchanged
        print(f"[reranker] error: {exc} — returning top-{top_k} by vector score")
        return chunks[:top_k]

    # raw is a list of {id: int, score: float}
    def sigmoid(x: float) -> float:
        import math
        return 1.0 / (1.0 + math.exp(-x))

    ranked = [
        {**chunks[r["id"]], "rerank_score": sigmoid(r["score"])}
        for r in raw
    ]
    ranked.sort(key=lambda c: c["rerank_score"], reverse=True)
    return ranked[:top_k]
