# IIIT Gwalior — First Report
## Data Collection Report — cutoffs.ai

**Full Name:** ABV-Indian Institute of Information Technology and Management, Gwalior
**Data Sources:** WhatsApp chat with ambassador, Mess schedule image, Timetable PDF, Telegram export (48 photos + 6 videos)
**Date Collected:** 31 March 2026 (WhatsApp), 06 April 2026 (Telegram media processed)
**Ambassador:** B.Tech student (contact stored separately)
**Verified By:** Manual review of all images, PDFs, and chat text

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | ✅ Complete | WhatsApp chat |
| Hostels | ✅ Complete | WhatsApp chat |
| Mess | ✅ Complete | WhatsApp chat + mess schedule image |
| Fee Structure | ❌ Missing | Google Drive link only (not extracted) |
| WiFi | ⚠️ Partial | WhatsApp chat (no speed/limit details) |
| Attendance | ✅ Complete | WhatsApp chat |
| Clubs | ✅ Complete | WhatsApp chat |
| Fests | ⚠️ Partial | WhatsApp chat (no dates/duration) |
| Sports | ✅ Complete | WhatsApp chat |
| Canteen | ✅ Complete | WhatsApp chat |
| Laundry | ✅ Complete | WhatsApp chat |
| Gym | ✅ Complete | WhatsApp chat |
| Medical | ✅ Complete | WhatsApp chat |
| Transport | ✅ Complete | WhatsApp chat |
| Restaurants | ✅ Complete | WhatsApp chat |
| Nearby Places | ✅ Complete | WhatsApp chat |
| Language & Climate | ✅ Complete | WhatsApp chat |

---

## Key Data Points

### Hostels
- **Boys:** IVH (1st year, 4-sharing, attached washroom), Satpura (1st year, 3-sharing), BH-2 (2nd year, 2-sharing; CG > 8 gets single room), BH-1 & BH-3 (3rd-5th year, single rooms)
- **Girls:** GH — same sharing pattern as boys
- First year allocation: IVH or Satpura based on branch
- Mess located in same hostel as 1st year students

### Gate & Fines
- Main gate closes at 10 PM
- Late entry fine: Rs 5,000
- Applies to both boys and girls

### Mess & Canteen
- Cafeteria (veg food)
- OAT canteen (non-veg food)
- Night canteen in specific hostels only, 10 PM to 2 AM
- Weekly menu: North Indian cuisine (Idli, Dosa, Paratha, Egg Bhurji for breakfast; Rice, Dal, Sabji for lunch; Pav Bhaji, Samosa for snacks; Roti, Rice, Dal for dinner)

### Fee Structure
- NOT EXTRACTED — shared as Google Drive link (Fees-July-2024.pdf)
- Link: https://share.google/G2YowLBorEpigmvsR — needs to be downloaded separately

### Key Facts
- Attendance: 75% mandatory (need medical certificate if below, else barred from exam)
- WiFi: Free across entire campus including hostels
- Climate: Winter 12-18 degrees C, Summer up to 42 degrees C
- Language: Hindi local, professors teach in Hindi and English
- Medical: Hospital inside campus near all hostels, free of cost
- Gym: Single gym for both boys and girls
- Laundry: Rs 800/month (1st year), or pay per pair; from 2nd year can buy washing machine in group
- Transport: Railway station 3-4 km, Airport 6 km, cycles allowed inside campus

### Clubs (6 total)
- Music Club, Acting Club, Dance Club, Coding Club, Science Club, Sports Club

### Fests (4 total)
- Aurora (Cultural), Infotsav (Technical), Urga (Sports), Celistia (Cultural)

### Sports (10 facilities)
- Cricket, Football, Volleyball, Swimming, Tennis, Badminton, Squash, Table Tennis, Basketball, Gym

### Restaurants
- Biryani by Kilo, Molecule, Grace Foods, Deccan Dhum, Tandoori Knights
- Swiggy and Zomato delivery available

### Nearby Places
- **Tourist:** Gwalior Fort (3 km), Sun Temple, Italian Garden, Tighra Dam, Tomb of Tansen, Zoo
- **Shopping:** DB Mall (3-4 km), DD Mall (4-5 km), Badha Market (4-5 km)

### Departments (5)
- Information Technology, Computer Science and Engineering, Electrical and Electronics, Engineering Sciences, Management Studies

---

## Data Gaps

1. Fee structure — Google Drive link only, not yet downloaded/extracted
2. Fest dates/duration — not mentioned
3. WiFi speed/data limit — not mentioned
4. Attendance tracking method — biometric or manual?
5. Room furniture details — ✅ NOW CONFIRMED from Telegram photos: bed (mattress on floor), desk, chair, curtained window, electrical outlets, tube light
6. Gym timing — not mentioned
7. Canteen prices — not mentioned
8. Mess timing — not specified
9. Elections / student council — not mentioned
10. Placement statistics — not mentioned

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| IMG-20260402-WA0035.jpg | Student ID card | ❌ DELETED |
| IMG-20260402-WA0036.jpg | Mess schedule | ✅ KEPT |
| IMG-20260331-WA0000.jpg | cutoffs.ai app screenshot | ❌ DELETED |
| IMG-20260331-WA0001.jpg | cutoffs.ai app screenshot | ❌ DELETED |
| IMG-20260331-WA0002.jpg | cutoffs.ai app screenshot | ❌ DELETED |
| IMG-20260331-WA0019.jpg | cutoffs.ai app screenshot | ❌ DELETED |
| IMG-20260331-WA0028.jpg | Payment QR code | ❌ DELETED |
| IMG-20260331-WA0029.jpg | Payment transaction screenshot | ❌ DELETED |
| IMG-20260402-WA0012 to WA0031 | Campus photos/videos (20 files) | ✅ PROCESSED via Telegram export |
| campus.zip | Campus photos/videos archive (96MB) | ✅ Stored in telegram-export/files/ |
| Timetable PDF | 7 pages, full even semester 2025-26 | ✅ KEPT |

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | ✅ | 17 sections + telegram media info |
| Supabase college_details | ✅ | 17 sections |
| D1 training_data | ✅ | 21 chunks (+1 telegram) |
| D1 knowledge_chunks | ✅ | 83 chunks (+12 telegram) |
| D1 ambassador_contacts | ✅ | 1 record |
| R2 storage | ✅ | 48 photos + 6 videos uploaded |

---

## Files in Folder

```
iiit-gwalior/
├── iiit-gwalior-knowledge-base.json
├── iiit-gwalior-knowledge-chunks.sql
├── iiit-gwalior-training-chunks.sql
├── iiit-gwalior-telegram-chunks.sql        ← NEW (12 knowledge + 1 training from Telegram)
├── iiit-gwalior-media-index.json           ← NEW (48 photos + 6 videos labelled)
├── iiit-gwalior-r2-urls.json               ← NEW (R2 public URLs for all media)
├── iiit-gwalior-whatsapp-chat-raw.txt
├── iiit-gwalior-whatsapp-chat-cleaned.txt
├── iiit-gwalior-mess-schedule.jpg
├── iiit-gwalior-timetable-even-sem-2026.pdf
├── iiit-gwalior-firstreport.md
└── telegram-export/                        ← NEW
    ├── result.json
    ├── photos/ (48 photos)
    ├── video_files/ (6 videos)
    └── files/ (campus.zip — 96MB)
```

---

---

## Telegram Media Summary (Processed 06 April 2026)

**48 photos** and **6 videos** from ambassador RAVINDRANADH via Telegram personal chat.

### Ambassador's Labels (in order):
Hostel rooms → Boys hostel BH-1 → EEE Department → BH-2 → OAT canteen → Sports complex → Convention hall → Football ground → Auditorium → Open air theatre → Lecture halls → Department buildings → IVH → Mess → Tennis court → Academic building → Hospital → Library → Cafeteria → Bio diversity park

### Media by Section:
| Section | Photos | Videos |
|---------|--------|--------|
| Campus (general, OAT, convention hall, main gate, bio park) | 17 | 5 |
| Academics (EEE dept, lecture halls, Management Studies, library) | 10 | 1 |
| Hostels Boys (BH-1, BH-2, Aravali, rooms) | 7 | 0 |
| Sports (complex, football, tennis) | 5 | 0 |
| Canteen (cafeteria, OAT canteen) | 2 | 0 |
| Mess (interior) | 2 | 0 |
| Medical (hospital) | 1 | 0 |

### New Data from Photos:
- **Aravali hostel** confirmed (Hindi signage: अरावली छात्रावास)
- **Room furniture:** Bed (mattress on floor), desk, chair, curtained window, electrical outlets, tube light
- **Mess hall:** Steel dining tables with stools, ceiling fans, spacious
- **OAT:** Large sandstone amphitheatre with tiered seating
- **Convention hall:** Red carpeted stage, projector, podium

All 54 files uploaded to Cloudflare R2. URLs in iiit-gwalior-r2-urls.json.

*Report updated 6 April 2026. Data subject to verification by user.*
