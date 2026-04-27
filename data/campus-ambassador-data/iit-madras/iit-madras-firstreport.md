# IIT Madras — First Report
## Data Collection Report — cutoffs.ai

**Data Sources:** WhatsApp chat with ambassador (with media), Fee structure PDF (17 pages), Timetable image
**Date Collected:** 31 March - 1 April 2026
**Ambassador:** B.Tech EE, 2024 batch — contact stored separately
**Verified By:** Manual review of 8 images + 1 PDF (17 pages), OCR of fee structure, cross-verified with chat text

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | ✅ Complete | WhatsApp chat |
| Boys Hostels (16!) | ✅ Complete | WhatsApp chat |
| Girls Hostels (6) | ✅ Complete | WhatsApp chat |
| Mess (9 outlets) | ✅ Complete | WhatsApp chat |
| Fee Structure | ✅ Complete | PDF OCR (category-wise, 17 pages) |
| WiFi | ✅ Complete | WhatsApp chat (10 Gbps, LAN ports) |
| Attendance | ✅ Complete | WhatsApp chat (detailed P-grade system) |
| Clubs (37+ across 3 categories!) | ✅ Complete | WhatsApp chat |
| Fests (2 major + 12 dept fests) | ✅ Complete | WhatsApp chat |
| Sports (12 disciplines) | ✅ Complete | WhatsApp chat |
| Canteen (15+ outlets with timings!) | ✅ Complete | WhatsApp chat |
| Shops | ✅ Complete | WhatsApp chat |
| Laundry | ✅ Complete | WhatsApp chat |
| Fines | ✅ Complete | WhatsApp chat |
| Elections | ✅ Complete | WhatsApp chat |
| Gym | ✅ Complete | WhatsApp chat |
| Medical | ✅ Complete | WhatsApp chat (24/7, specialists) |
| Transport | ✅ Complete | WhatsApp chat |
| Restaurants | ✅ Complete | WhatsApp chat |
| Tourist / Malls | ✅ Complete | WhatsApp chat |
| Language / Climate | ✅ Complete | WhatsApp chat |
| Timetable | ✅ Partial | Image (B.Tech/DD other than 1st yr) |

---

## Key Data Points

### Hostels (22 total — largest among colleges processed)
- **Boys (16):** Alakananda, Brahmaputra, Cauvery, Ganga, Godavari, Jamuna, Krishna, Mahanadhi, Mandakini A, Mandakini B, Narmada, Pampa, Saraswathi, Sindhu, Tamiraparani, Tapti
- **Girls (6):** Bhadra, Sabarmati, Sarayu, Sharavathi, Swarnamukhi, Tunga

### Fee (B.Tech/B.S., 2024 batch)
| Category | Per Semester |
|----------|-------------|
| General/OBC/EWS (income > 5L) | **₹1,15,402** |
| General/OBC/EWS (income 1-5L) | ₹48,735 |
| General/OBC/EWS (income < 1L) | ₹15,402 |
| SC/ST/PwD (without scholarship) | ₹15,402 |
| SC/ST (with institute scholarship) | ₹7,902 |

### Canteen (IIT Madras speciality — 15+ outlets)
- **CCD** — **24/7** (yes, round the clock)
- **Rotormans Food Truck** — 9 PM to 4:30 AM (late night)
- **Cream Stone** — till 3 AM
- **Zaitoon** — till 3 AM
- **Nescafe** — till 3 AM
- **Himalaya Food Court** — 7 outlets under one roof

### Clubs (37+ — three categories)
- **Sabhas & Samitis (7):** Regional language societies
- **Sangam Clubs (16):** Quiz, Music, Drama, E-Sports, Comedy, etc.
- **CFI Clubs (14):** 3D Printing, Aero, AI, Cybersecurity, Blockchain, etc.

### Attendance (unique P-grade system)
- 75% required but not strictly enforced
- Poor attendance → "P" grade (not failing, but consequences)
- P grades affect: elective allotment, IDDD eligibility, honours, minor eligibility
- 3+ P grades: ineligible for IDDD, Dual Degree upgradation, YRF, honours

### Unique Facts
- **₹1 lakh fine** for injuring wildlife (campus inside Guindy National Park!)
- **₹10,000 fine** for speeding above 20 kmph
- **24/7 hospital** with specialists: ortho, cardio, psychiatrist, ophthalmologist, surgeon, ENT
- **Laundry bus** service for entire campus
- **10 Gbps WiFi** bandwidth
- **Shaastra** and **Saarang** — 5 days each, among India's largest college fests
- **12 department-specific fests** (EXEBIT for CSE, MECHANICA for Mech, etc.)

---

## Data Gaps

1. **Hostel sharing details** — how many per room? Which hostel for which year?
2. **Mess schedule** — no weekly menu
3. **Mess timing** — not provided
4. **Gate timing / curfew** — not mentioned
5. **Room furniture** — not mentioned
6. **Hostel allotment** — random or merit-based?
7. **Swiggy/Zomato** — available but not mentioned by ambassador (only nearby restaurants listed)

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0000-0002 (31 Mar) | cutoffs.ai app screenshots | ❌ DELETED |
| WA0019 | cutoffs.ai Telegram QR | ❌ DELETED |
| WA0030 | Student ID card (EE, 2024 batch) | ❌ DELETED — personal |
| WA0000 (1 Apr) | Timetable (B.Tech/DD) | ✅ KEPT — renamed |
| WA0001 (1 Apr) | Payment QR | ❌ DELETED |
| WA0002 (1 Apr) | Payment transaction | ❌ DELETED |
| Fee.pdf | Fee circular (17 pages) | ✅ KEPT — OCR'd B.Tech fees |

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | ✅ | 21 sections |
| Supabase college_details | ✅ | 21 sections |
| D1 training_data | ✅ | 19 chunks |
| D1 knowledge_chunks | ✅ | 177 chunks |
| D1 ambassador_contacts | ✅ | 1 record |
| Local cleaned chat | ✅ | Personal info removed |

---

## Files in Folder

```
iit-madras/
├── iit-madras-firstreport.md
├── iit-madras-knowledge-base.json
├── iit-madras-whatsapp-chat-raw.txt
├── iit-madras-whatsapp-chat-cleaned.txt
├── iit-madras-fee-structure.pdf
├── iit-madras-timetable.jpg
├── iit-madras-training-chunks.sql
└── iit-madras-knowledge-chunks.sql
```

---

*Report generated 2 April 2026. Best ambassador data received so far — 37+ clubs, 15+ canteen outlets with timings, detailed attendance policy, comprehensive fee structure.*
