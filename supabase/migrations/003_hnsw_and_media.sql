-- Migration 003: HNSW index + extend college_media for chatbot
-- Run in Supabase SQL editor after 002_knowledge_chunks_v2.sql

-- ─── 1. Upgrade vector index: IVFFlat → HNSW ────────────────────────────────
-- HNSW has better recall and requires no training or periodic VACUUM ANALYZE.
-- Ideal for datasets under ~1M rows (our dataset is ~2k–50k chunks).

DROP INDEX IF EXISTS idx_kc_embedding;

CREATE INDEX idx_kc_embedding_hnsw ON knowledge_chunks
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- ─── 2. Extend college_media to hold chatbot-facing metadata ─────────────────
-- The old college_media table only had (college_id, category, url, filename).
-- The Cloudflare chatbot's media_assets table also stored caption, media_type,
-- and duration_seconds. We migrate those columns here.

ALTER TABLE college_media
  ADD COLUMN IF NOT EXISTS caption        TEXT,
  ADD COLUMN IF NOT EXISTS media_type     TEXT NOT NULL DEFAULT 'photo',
  ADD COLUMN IF NOT EXISTS duration_secs  INT;

-- Full-text search index on caption for keyword-based media matching
CREATE INDEX IF NOT EXISTS idx_college_media_caption_fts
  ON college_media
  USING gin(to_tsvector('english', coalesce(caption, '')));

-- ─── 3. Section-mapping helper: D1 section names → Supabase category names ───
-- The admin panel uses: hostel | classrooms | campus | extra_curricular
-- The D1 chatbot used:  hostels_boys | hostels_girls | academics | canteen |
--                       mess | sports | clubs | campus | medical | wifi | etc.
-- We keep both — college_media.category stores the admin-panel category,
-- knowledge_chunks.section stores the fine-grained D1 section name.
-- No schema change needed; this comment documents the mapping used in code.

-- ─── 4. Service-role write policy for college_media ──────────────────────────
-- (SELECT policy already exists from 001_colleges.sql)
-- Service role bypasses RLS automatically; no INSERT policy needed for server.
