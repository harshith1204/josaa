-- Migration: Upgrade knowledge_chunks for multi-college RAG with pgvector
-- Requires pgvector extension (already available on Supabase)

CREATE EXTENSION IF NOT EXISTS vector;

-- Drop old table if migrating from seed.sql schema (single college, no embeddings column)
-- Comment this out if you want to preserve existing data
-- DROP TABLE IF EXISTS knowledge_chunks;

CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id          BIGSERIAL PRIMARY KEY,
  college_id  TEXT NOT NULL,             -- matches colleges.college_id, e.g. "iit-bombay"
  college     TEXT,                      -- human-readable name (legacy compat, optional)
  section     TEXT NOT NULL,             -- overview | hostel | placements | campus | extra_curricular | academics
  chunk_text  TEXT NOT NULL,
  media_urls  TEXT[],                    -- R2 URLs contextually relevant to this chunk
  embedding   VECTOR(1024),              -- BGE-M3 output (1024-dim)
  token_count INT,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Cosine similarity index for fast ANN search (adjust lists based on row count)
CREATE INDEX IF NOT EXISTS idx_kc_embedding ON knowledge_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_kc_college ON knowledge_chunks(college_id);
CREATE INDEX IF NOT EXISTS idx_kc_section ON knowledge_chunks(section);
CREATE INDEX IF NOT EXISTS idx_kc_college_section ON knowledge_chunks(college_id, section);

ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read knowledge_chunks"
  ON knowledge_chunks FOR SELECT USING (true);

-- Helper function for vector similarity search (used by RAG API)
CREATE OR REPLACE FUNCTION match_knowledge_chunks(
  query_embedding VECTOR(1024),
  match_college   TEXT DEFAULT NULL,
  match_sections  TEXT[] DEFAULT NULL,
  match_count     INT DEFAULT 10,
  similarity_threshold FLOAT DEFAULT 0.3
)
RETURNS TABLE (
  id          BIGINT,
  college_id  TEXT,
  section     TEXT,
  chunk_text  TEXT,
  media_urls  TEXT[],
  similarity  FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id,
    kc.college_id,
    kc.section,
    kc.chunk_text,
    kc.media_urls,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks kc
  WHERE
    (match_college IS NULL OR kc.college_id = match_college)
    AND (match_sections IS NULL OR kc.section = ANY(match_sections))
    AND kc.embedding IS NOT NULL
    AND 1 - (kc.embedding <=> query_embedding) > similarity_threshold
  ORDER BY kc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
