"""
POST /ingest — Admin-triggered indexing endpoint.

Called by the Next.js admin panel (save-json/route.js) after a college or
placements JSON is saved to Supabase Storage.

Request headers:
  Authorization: Bearer <INGEST_SECRET>

Request body:
  {
    "type":       "college" | "placements",
    "college_id": "nit-manipur",       # kebab-case
    "data":       "<json string>"      # the raw JSON that was saved
  }

Steps:
  1. Validate auth
  2. Parse + chunk the JSON
  3. Embed all chunks via Cloudflare bge-m3 (batched)
  4. Upsert into Supabase knowledge_chunks
     (delete existing chunks for same college+section first to avoid stale data)
"""
from __future__ import annotations

import json
import os
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, Header, status
from pydantic import BaseModel

from app.core.db import supabase
from app.core.embeddings import embeddings
from app.ingest.chunk_college import chunk_college_json
from app.ingest.chunk_placements import chunk_placements_json

router = APIRouter()


# ── Auth ─────────────────────────────────────────────────────────────────────

async def verify_ingest_secret(authorization: str = Header(...)):
    expected = os.environ.get("INGEST_SECRET", "")
    token = authorization.replace("Bearer ", "", 1)
    if not expected or token != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


# ── Models ───────────────────────────────────────────────────────────────────

class IngestRequest(BaseModel):
    type: str        # "college" | "placements"
    college_id: str
    data: str        # raw JSON string


# ── Helpers ──────────────────────────────────────────────────────────────────

async def _embed_and_upsert(chunks: List[Dict[str, Any]]) -> int:
    """Embed all chunks and upsert into knowledge_chunks. Returns count upserted."""
    if not chunks:
        return 0

    db = supabase()
    texts = [c["chunk_text"] for c in chunks]
    vectors = await embeddings.aembed_documents(texts)

    rows = []
    for chunk, vec in zip(chunks, vectors):
        rows.append(
            {
                "college_id": chunk["college_id"],
                "college": chunk.get("college", chunk["college_id"]),
                "section": chunk["section"],
                "chunk_text": chunk["chunk_text"],
                "token_count": chunk.get("token_count"),
                "embedding": vec,
                "media_urls": chunk.get("media_urls", []),
            }
        )

    # Upsert in batches of 50
    upserted = 0
    for i in range(0, len(rows), 50):
        batch = rows[i : i + 50]
        db.table("knowledge_chunks").insert(batch).execute()
        upserted += len(batch)

    return upserted


# ── Route ────────────────────────────────────────────────────────────────────

@router.post("/ingest", dependencies=[Depends(verify_ingest_secret)])
async def ingest(req: IngestRequest):
    try:
        data: Dict[str, Any] = json.loads(req.data)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {e}")

    # Ensure college_id is set in the data dict
    data.setdefault("college_id", req.college_id)

    if req.type == "college":
        chunks = chunk_college_json(data)
    elif req.type == "placements":
        chunks = chunk_placements_json(data)
    else:
        raise HTTPException(status_code=400, detail=f"Unknown type: {req.type!r}. Use 'college' or 'placements'.")

    if not chunks:
        return {"status": "ok", "upserted": 0, "message": "No chunks generated — check JSON structure."}

    # Delete stale chunks for this college + type before upserting fresh ones
    db = supabase()
    if req.type == "placements":
        db.table("knowledge_chunks").delete().eq("college_id", req.college_id).eq("section", "placements").execute()
    else:
        # For college JSON, delete all non-placements chunks for this college
        db.table("knowledge_chunks").delete().eq("college_id", req.college_id).neq("section", "placements").execute()

    upserted = await _embed_and_upsert(chunks)

    return {
        "status": "ok",
        "college_id": req.college_id,
        "type": req.type,
        "chunks_generated": len(chunks),
        "upserted": upserted,
    }
