# Campus Ambassador Data Pipeline — Standard Procedure
## cutoffs.ai — Data Collection, Organization & Storage

---

## INPUT: What ambassador provides
1. **WhatsApp chat export** (.zip with or without media)
2. **Telegram chat export** (JSON + photos/ + video_files/)
3. **PDFs** (fee structure, timetable, circulars)
4. **Images** (mess schedule, hostel photos, campus photos)
5. **Videos** (campus tour, hostel walkthrough, etc.)
6. **Phone call notes** (typed by us after calling ambassador)

---

## STEP 1: Extract & Organize Files

### Folder Structure
```
data/campus-ambassador-data/
└── {college-slug}/                    # e.g. nit-warangal
    ├── {slug}-whatsapp-chat-raw.txt   # Original chat (reference only)
    ├── {slug}-whatsapp-chat-cleaned.txt # Personal info removed
    ├── {slug}-knowledge-base.json     # All structured data
    ├── {slug}-media-index.json        # Labels for all photos/videos
    ├── {slug}-fee-structure-btech.pdf # Fee PDF (if available)
    ├── {slug}-mess-schedule.jpeg      # Mess schedule image
    ├── {slug}-timetable-sem1.jpeg     # Timetable image
    ├── {slug}-hostel-fee-receipt.jpg  # Fee receipt (personal info in receipt is OK - we OCR data only)
    ├── {slug}-training-chunks.sql     # SQL for D1 training_data table
    ├── {slug}-knowledge-chunks.sql    # SQL for D1 knowledge_chunks table
    └── telegram-export/               # If Telegram data available
        ├── result.json
        ├── photos/
        └── video_files/
```

### File Naming Convention
All files prefixed with college slug: `{college-slug}-{description}.{ext}`
Examples: `nit-warangal-mess-schedule.jpeg`, `nit-nagaland-fee-structure-btech.pdf`

---

## STEP 2: Review & Filter Content

### REMOVE (delete immediately):
- Payment screenshots (PhonePe, GPay, UPI)
- Payment QR codes
- Student ID cards with photo
- Personal bank details
- Telegram/WhatsApp QR codes (our own marketing material)
- Screenshots of phone notifications
- Memes or unrelated images

### KEEP but REDACT:
- Fee receipts → OCR the data (amounts, categories) but don't store student name/roll/parents
- Chat text → Remove phone numbers, emails, names from cleaned version
- Store ambassador contact info SEPARATELY in `ambassador_contacts` table

### KEEP as-is:
- Campus photos, hostel photos, mess photos
- Fee structure PDFs (official documents)
- Mess schedule images
- Timetable images
- Campus tour videos

---

## STEP 3: OCR & Data Extraction

### For images:
- Read each image using Claude's vision
- Extract text data (fees, schedules, timetables)
- Cross-verify OCR'd data with chat text messages
- If conflicts: prefer the more detailed/recent source

### For PDFs:
- Try pypdf text extraction first
- If image-based PDF: convert pages to PNG via PyMuPDF, then OCR
- Only extract B.Tech / 5-year Dual Degree data (JoSAA courses only)
- Skip M.Tech, M.Sc, PhD, MBA fee structures

---

## STEP 4: Build Knowledge Base JSON

### Structure:
```json
{
  "college": "NIT Warangal",
  "sources": ["whatsapp_chat", "fee_receipt_image", "mess_schedule_image"],
  "data_date": "2026-03-31",
  "sections": {
    "overview": {...},
    "hostels_boys": {...},
    "hostels_girls": {...},
    "mess": {...},
    "fee_structure": {...},
    "wifi": {...},
    "attendance": {...},
    "clubs": {...},
    "fests": {...},
    "sports": {...},
    "canteen": {...},
    "laundry": {...},
    "elections": {...},
    "medical": {...},
    "transport": {...},
    "restaurants": {...},
    "nearby_places": {...},
    "language": {...}
  }
}
```

### Rules:
- Fee: simplified totals, not every line item
- Only B.Tech / JoSAA courses
- Use exact numbers from receipts/PDFs
- Note data gaps explicitly

---

## STEP 5: Store in 4 Databases

### 1. Local File (knowledge-base.json)
- Complete structured data for reference
- Stays in the college folder

### 2. Supabase `college_details` table
- Push each section as a separate row via `/api/college-details` POST
- Used by the website and admin panel
- History tracked automatically

### 3. D1 `training_data` table (Cloudflare)
- Message-based intelligent chunks for AI training
- Each chunk = one complete topic from the conversation
- Fields: college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source
- Group consecutive messages by same person on same topic
- Keep original typos/slang in raw_text
- Grammar-corrected version in cleaned_text
- Source: 'whatsapp', 'telegram', 'phone_call', 'pdf_ocr', 'image_ocr'
- NEVER include personal info (phone, email, names) in training data

### 4. D1 `knowledge_chunks` table (Cloudflare)
- Single-fact chunks for RAG chatbot vector search
- Each chunk = one individual fact
- Split long paragraphs into separate facts
- Fields: college, section, chunk_text

### 5. D1 `ambassador_contacts` table (Cloudflare)
- Phone numbers and emails stored here ONLY
- Never in training_data or knowledge_chunks
- Fields: college, phone, email, name, role

---

## STEP 6: Generate Report

After all data is stored, generate a complete college guide report:
- All sections with data formatted in tables
- Data gaps listed at the end
- Source attribution (WhatsApp, PDF OCR, image OCR, phone call)
- No personal info in the report
- Send to user for verification before finalizing

---

## STEP 7: Media Processing (Optional — for chatbot)

If building a college-specific RAG chatbot with media:
1. View each photo/video
2. Label with description + section tag
3. Create media-index.json
4. Upload to R2 via Worker proxy
5. Store labels + R2 URLs in `media_assets` table
6. Chatbot matches media by section when answering queries

---

## CHECKLIST (per college)

- [ ] WhatsApp zip extracted
- [ ] All images reviewed — sensitive ones deleted
- [ ] Files renamed with college prefix
- [ ] Chat text cleaned (personal info removed)
- [ ] PDFs/images OCR'd and data extracted
- [ ] Knowledge base JSON created
- [ ] Pushed to Supabase `college_details`
- [ ] Training chunks created and stored in D1 `training_data`
- [ ] Knowledge chunks created and stored in D1 `knowledge_chunks`
- [ ] Ambassador contact stored in D1 `ambassador_contacts`
- [ ] First report saved as `{slug}-firstreport.md` in college folder
- [ ] (Optional) Telegram export processed
- [ ] (Optional) Media uploaded to R2 with labels

---

## DATABASES SUMMARY

| Database | Table | Purpose | Contains Personal Info? |
|----------|-------|---------|----------------------|
| Supabase | college_details | Website display | No |
| D1 | training_data | AI model training | No |
| D1 | knowledge_chunks | RAG chatbot | No |
| D1 | ambassador_contacts | Internal only | Yes (phone, email) |
| D1 | media_assets | Chatbot media | No |
| Local | knowledge-base.json | Reference | No |
| Local | whatsapp-chat-raw.txt | Reference only | Yes (kept locally, not in DB) |
