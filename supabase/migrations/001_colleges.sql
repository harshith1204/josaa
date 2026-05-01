-- Migration: College data tables
-- Run this in Supabase SQL editor or via supabase db push

-- Stores the full College JSON uploaded via admin panel
CREATE TABLE IF NOT EXISTS colleges (
  college_id  TEXT PRIMARY KEY,          -- kebab-case, e.g. "iit-bombay"
  name        TEXT NOT NULL,             -- full official name
  short_name  TEXT,                      -- e.g. "IIT Bombay"
  type        TEXT,                      -- IIT | NIT | IIIT | GFTI
  state       TEXT,
  zone        TEXT,                      -- North | South | East | West | Central | NE
  data        JSONB NOT NULL,            -- full College JSON blob
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Stores yearly placement JSON uploaded via admin panel
CREATE TABLE IF NOT EXISTS college_placements (
  id          SERIAL PRIMARY KEY,
  college_id  TEXT NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
  year        INT NOT NULL,
  data        JSONB NOT NULL,            -- full Placements JSON blob
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(college_id, year)
);

-- Media URLs per college (admin uploads → S3; URL stored here for chatbot + site)
CREATE TABLE IF NOT EXISTS college_media (
  id          SERIAL PRIMARY KEY,
  college_id  TEXT NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
  category    TEXT NOT NULL,             -- hostel | class | campus | extra (admin API)
  url         TEXT NOT NULL,             -- public HTTPS URL (e.g. S3)
  filename    TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_college_media_lookup ON college_media(college_id, category);

-- Row-level security: only service role can write; anon can read
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read colleges"
  ON colleges FOR SELECT USING (true);

CREATE POLICY "Public read college_placements"
  ON college_placements FOR SELECT USING (true);

CREATE POLICY "Public read college_media"
  ON college_media FOR SELECT USING (true);
