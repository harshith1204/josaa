# College RAG Chatbot — Setup Guide
## cutoffs.ai — Creating a new college chatbot from scratch

**Prerequisites:** Data pipeline completed (see README-DATA-PIPELINE.md). You should have:
- `{slug}-knowledge-base.json` (structured data)
- `{slug}-media-index.json` (photo/video labels)
- `telegram-export/` folder with photos + videos + result.json
- Knowledge chunks ready (or will generate them)

---

## Architecture Overview

```
User Question
     ↓
[BGE-M3 Embedding] → 1024-dim vector
     ↓
[Cloudflare Vectorize] → Top 50 similar chunks
     ↓
[BGE-Reranker-Base] → Top 8 reranked chunks
     ↓
[Gemma-3-12B-IT] → Conversational answer (if rerank score < 0.95)
     ↓
[Media Matching] → Caption search → Section fallback → Return 4 photos/videos
```

**Stack:** Cloudflare Workers + D1 (SQLite) + Vectorize + Workers AI + R2 (media storage)

---

## STEP 1: Create Cloudflare Resources

### 1a. Create D1 Database
```bash
npx wrangler d1 create {slug}-db
# Example: npx wrangler d1 create nit-trichy-db
# Note the database_id from output
```

### 1b. Create Vectorize Index
```bash
npx wrangler vectorize create {slug}-knowledge --dimensions=1024 --metric=cosine
# Must be 1024 dimensions (BGE-M3 output size)
```

### 1c. Create D1 Tables
```bash
npx wrangler d1 execute {slug}-db --remote --command "
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  college TEXT NOT NULL,
  section TEXT NOT NULL,
  chunk_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS media_assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  college TEXT NOT NULL,
  section TEXT NOT NULL,
  media_type TEXT NOT NULL,
  label TEXT,
  caption TEXT,
  r2_url TEXT NOT NULL,
  original_file TEXT,
  duration_seconds INTEGER
);
"
```

---

## STEP 2: Create Worker Project

### 2a. Folder Structure
```
chatbot-{slug}/
├── src/
│   └── index.js      # Main worker (copy from template below)
├── wrangler.toml      # Config (fill in IDs)
├── seed_all.sql       # Knowledge chunks SQL
└── seed_media_assets.sql  # Media assets SQL
```

### 2b. wrangler.toml Template
```toml
name = "{slug}-chatbot"
main = "src/index.js"
compatibility_date = "2024-12-01"

[ai]
binding = "AI"

[[d1_databases]]
binding = "DB"
database_name = "{slug}-db"
database_id = "PASTE_DATABASE_ID_HERE"

[[vectorize]]
binding = "VECTORIZE"
index_name = "{slug}-knowledge"

[vars]
COLLEGE_NAME = "College Full Name"
```

### 2c. Worker Code (src/index.js)
Copy from an existing chatbot (e.g. `chatbot-iiit-gwalior/src/index.js`) and change:

1. **System prompt** — Change college name in the LLM prompt:
   ```
   "answers questions about {COLLEGE NAME} based on real data..."
   "Refer to the college in third person (e.g. '{COLLEGE NAME} has...')"
   ```

2. **Section keywords** — Update `sectionKeywords` object with college-specific hostel names, mess names, building names:
   ```js
   const sectionKeywords = {
     'hostels_boys': ['hostel','room','HOSTEL_NAME_1','HOSTEL_NAME_2'],
     'mess': ['mess','food','MESS_NAME'],
     // etc.
   };
   ```

3. **Caption aliases** — Update `aliases` object for caption-based media search:
   ```js
   const aliases = {
     hostel:['Hostel','HOSTEL_NAME'],
     // etc.
   };
   ```

4. **HTML UI** — Change:
   - `<title>` tag
   - Header `<h1>` text
   - Suggestion buttons (college-specific questions)
   - Welcome message text
   - `college:` value in fetch body
   - Placeholder text in input

5. **Seed function** — Change `college:` metadata value in vectors
6. **Sections endpoint** — Change college name in SQL WHERE clause
7. **Default college** — Change `body.college || 'COLLEGE NAME'`

---

## STEP 3: Generate Knowledge Chunks SQL

### From knowledge-base.json
Each fact should be ONE chunk. Format:
```sql
INSERT INTO knowledge_chunks (college, section, chunk_text)
VALUES ('College Name', 'section_name', 'Section > Facts: One specific fact here.');
```

### Section names (standard set):
`overview`, `hostels_boys`, `hostels_girls`, `mess`, `fee_structure`, `wifi`, `attendance`, `clubs`, `fests`, `sports`, `canteen`, `laundry`, `elections`, `medical`, `transport`, `restaurants`, `nearby_places`, `language_climate`, `academics`, `campus`, `gym`

### Rules:
- One fact per chunk (not paragraphs)
- Use exact numbers, names, prices from ambassador data
- Prefix with `Section > Facts:` or `Section > SubSection:` for context
- Don't include metadata chunks about "how many photos we have" etc.
- Typical count: 80-200 chunks per college

### Seed the chunks:
```bash
npx wrangler d1 execute {slug}-db --remote --file seed_all.sql
```

---

## STEP 4: Upload Media to R2

### 4a. Label photos/videos
- View each photo from telegram-export/photos/
- Check telegram result.json for `reply_to_message_id` fields (ambassador may have labeled specific photos)
- Read text on buildings in photos for accurate labels
- Create media-index.json with section + caption for each file

### 4b. Upload to R2 via Worker proxy
For each file, use HTTP PUT to the upload worker:
```bash
curl -X PUT "https://cutoffs-upload.fresherschat.workers.dev/" \
  -H "Content-Type: image/jpeg" \
  -H "X-Filename: {slug}-photo_1.jpg" \
  -H "X-Folder: colleges/{slug}/photos" \
  --data-binary @photo_1.jpg
```

OR use wrangler directly for exact key control:
```bash
npx wrangler r2 object put "cutoffs-ai-uploads/colleges/{slug}/photos/{timestamp}-{filename}" \
  --file ./path/to/photo.jpg --remote --content-type image/jpeg
```

### 4c. Create media_assets SQL
```sql
INSERT INTO media_assets (college, section, media_type, label, caption, r2_url, original_file)
VALUES ('College Name', 'section', 'photo', 'Detailed description', 'Short caption',
  'https://cutoffs-upload.fresherschat.workers.dev/file/colleges/{slug}/photos/{key}',
  'original_filename.jpg');

-- For videos, add duration_seconds:
INSERT INTO media_assets (college, section, media_type, label, caption, r2_url, original_file, duration_seconds)
VALUES ('College Name', 'sports', 'video', 'Description', 'Caption',
  'https://cutoffs-upload.fresherschat.workers.dev/file/colleges/{slug}/videos/{key}',
  'original_video.mp4', 15);
```

### 4d. Seed media:
```bash
npx wrangler d1 execute {slug}-db --remote --file seed_media_assets.sql
```

---

## STEP 5: Deploy & Seed Vectors

### 5a. Deploy the worker:
```bash
cd chatbot-{slug}
npx wrangler deploy
```

### 5b. Seed vector embeddings:
```bash
curl https://{slug}-chatbot.fresherschat.workers.dev/seed
# Should return: {"success":true,"count":N}
```

### 5c. Test:
```bash
# Test a specific query
curl -s -X POST "https://{slug}-chatbot.fresherschat.workers.dev/chat" \
  -H "Content-Type: application/json" \
  -d '{"question":"hostels","college":"College Name"}' | python3 -m json.tool

# Check sections
curl https://{slug}-chatbot.fresherschat.workers.dev/sections
```

---

## STEP 6: Verify & Tune

### Common issues and fixes:

**Images not loading (404)**
- R2 files don't exist. Re-upload using wrangler r2 object put with exact keys matching DB URLs.

**Wrong images for queries**
- Section boost not matching. Add college-specific keywords to `sectionKeywords`.
- Caption search not finding matches. Add aliases to `aliases` object.

**LLM gives generic/wrong answers**
- Check if knowledge chunks are too vague. Each chunk should be one specific fact.
- Check if unrelated chunks (metadata, media descriptions) are polluting context. Delete them.

**"I don't have that information" even when data exists**
- Re-seed vectors: `curl .../seed` (vectors may be stale)
- Check D1 has the chunks: `npx wrangler d1 execute {slug}-db --remote --command "SELECT COUNT(*) FROM knowledge_chunks"`

**LLM adds preamble like "Hi! I have information about..."**
- Already handled by rule 9 in system prompt. If it persists, add stronger wording.

**Media shows for wrong section**
- The `hasRealAnswer` check was blocking media. We removed the `"don't have"` check — just use `result.method !== 'no_data'`.

---

## Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Embedding model | BGE-M3 (1024d) | Multi-lingual, handles Hindi/English |
| Reranker | BGE-Reranker-Base | Filters false positives before LLM |
| LLM | Gemma-3-12B-IT | Free on Cloudflare Workers AI |
| Direct extraction threshold | 0.95 | Almost always uses LLM for natural responses |
| Media selection | Caption search first, then section fallback | Precise matches for department/building queries |
| Section boost | +10 for keyword match in query | Ensures "gym" query prioritizes gym section |
| Vector upsert | `upsert` not `insert` | Allows re-seeding without deleting old vectors |

---

## Existing Chatbots (reference)

| College | Worker URL | D1 DB | Vectorize Index |
|---------|-----------|-------|-----------------|
| IIIT Gwalior | iiit-gwalior-chatbot.fresherschat.workers.dev | iiit-gwalior-db | iiit-gwalior-knowledge |
| NIT Nagaland | nit-nagaland-chatbot.fresherschat.workers.dev | nit-nagaland-db | nit-nagaland-knowledge |

---

## R2 Storage

- **Bucket:** `cutoffs-ai-uploads`
- **Proxy worker:** `cutoffs-upload.fresherschat.workers.dev`
- **URL format:** `https://cutoffs-upload.fresherschat.workers.dev/file/colleges/{slug}/{photos|videos}/{timestamp}-{filename}`
- **Allowed types:** JPEG, PNG, WebP, GIF, MP4, QuickTime, WebM
- **Max size:** 100MB per file
- **Videos:** Auto-processed with faststart (moov atom moved for instant playback)

---

## Quick Start Checklist (new college)

1. [ ] Data pipeline done (README-DATA-PIPELINE.md)
2. [ ] `npx wrangler d1 create {slug}-db` — note database_id
3. [ ] `npx wrangler vectorize create {slug}-knowledge --dimensions=1024 --metric=cosine`
4. [ ] Create D1 tables (knowledge_chunks + media_assets)
5. [ ] Copy chatbot folder from existing bot, update wrangler.toml
6. [ ] Update index.js (college name, section keywords, aliases, HTML UI)
7. [ ] Generate and seed knowledge chunks SQL
8. [ ] Upload media to R2, generate and seed media_assets SQL
9. [ ] `npx wrangler deploy`
10. [ ] `curl .../seed` to generate vector embeddings
11. [ ] Test queries, tune section keywords and aliases
12. [ ] Verify images load for each section
