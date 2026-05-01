"""
Cloudflare BGE-M3 embeddings via REST API.

Produces 1024-dimensional vectors — matches the knowledge_chunks.embedding
VECTOR(1024) column created in migration 002.
"""
from __future__ import annotations

import os
from typing import List

import httpx
from langchain_core.embeddings import Embeddings


CF_EMBED_URL = (
    "https://api.cloudflare.com/client/v4/accounts/{account_id}"
    "/ai/run/@cf/baai/bge-m3"
)
# BGE-M3 max batch size per request
_BATCH_SIZE = 32


class CloudflareEmbeddings(Embeddings):
    """LangChain Embeddings subclass backed by Cloudflare Workers AI bge-m3."""

    def __init__(self) -> None:
        self._account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
        self._token = os.environ["CLOUDFLARE_AI_TOKEN"]
        self._url = CF_EMBED_URL.format(account_id=self._account_id)
        self._headers = {
            "Authorization": f"Bearer {self._token}",
            "Content-Type": "application/json",
        }

    def _call_api(self, texts: List[str]) -> List[List[float]]:
        with httpx.Client(timeout=60.0) as client:
            resp = client.post(self._url, headers=self._headers, json={"text": texts})
            resp.raise_for_status()
            return resp.json()["result"]["data"]

    async def _acall_api(self, texts: List[str]) -> List[List[float]]:
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(
                self._url, headers=self._headers, json={"text": texts}
            )
            resp.raise_for_status()
            return resp.json()["result"]["data"]

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        results: List[List[float]] = []
        for i in range(0, len(texts), _BATCH_SIZE):
            batch = texts[i : i + _BATCH_SIZE]
            results.extend(self._call_api(batch))
        return results

    def embed_query(self, text: str) -> List[float]:
        return self._call_api([text])[0]

    async def aembed_documents(self, texts: List[str]) -> List[List[float]]:
        results: List[List[float]] = []
        for i in range(0, len(texts), _BATCH_SIZE):
            batch = texts[i : i + _BATCH_SIZE]
            results.extend(await self._acall_api(batch))
        return results

    async def aembed_query(self, text: str) -> List[float]:
        vecs = await self._acall_api([text])
        return vecs[0]


# Module-level singleton
embeddings = CloudflareEmbeddings()
