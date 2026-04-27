# NIT Hamirpur — First Report
## Data Collection Report — cutoffs.ai

**Data Sources:** WhatsApp chat with ambassador (with media — but only payment images included)
**Date Collected:** 31 March 2026
**Ambassador:** B.Tech student — contact stored separately
**Verified By:** Manual review of 2 images (both payment — deleted), chat text processed

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | ✅ Complete | WhatsApp chat |
| Hostels | ✅ Complete | WhatsApp chat |
| Mess | ⚠️ Partial | WhatsApp chat (night canteen only, no schedule) |
| Fee Structure (B.Tech) | ✅ Complete | PDF OCR (8 pages, category-wise) |
| WiFi | ✅ Complete | WhatsApp chat (5G + WiFi + LAN) |
| Attendance | ✅ Complete | WhatsApp chat (70%) |
| Clubs (16!) | ✅ Complete | WhatsApp chat |
| Fests | ✅ Complete | WhatsApp chat |
| Sports | ✅ Complete | WhatsApp chat |
| Canteen (6 outlets) | ✅ Complete | WhatsApp chat |
| Laundry | ✅ Complete | WhatsApp chat |
| Elections | ✅ Complete | WhatsApp chat (none) |
| Fines | ✅ Complete | WhatsApp chat |
| Medical | ✅ Complete | WhatsApp chat |
| Transport | ✅ Complete | WhatsApp chat |
| Restaurants | ✅ Complete | WhatsApp chat |
| Tourist | ✅ Complete | WhatsApp chat |
| Shopping | ✅ Complete | WhatsApp chat |
| Timetable | ✅ Complete | PDF (6 pages, 10 sections A-J + Z) |

---

## Key Data Points

### Hostels
- **All hostels: 3-sharing** rooms
- **Exception: Neelkanth boys hostel — single rooms** (1-seater)
- **KBH hostel** for first year students
- Night canteens in all hostels (in mess area)

### WiFi
- **5G connectivity** on campus
- WiFi and LAN both available

### Attendance
- **70% mandatory** (lower than most NITs)

### Clubs (16 clubs — impressive variety)
Organisation, Music, PR, Dance, Fine Art, Discipline, Technical, INS & Control, English, Decoration, Hindi, Informal, Pixonoids, Web Team, Dramatics, SPIC MACAY Chapter

### Fests
- **HillFair** (cultural), **Nimbus** (technical), **Laalkar**

### Canteen
- 6 outlets: NS Cafe, 4H, Booth4, Varca, Eat N Sleep, Pizza Words
- Night canteens in all hostels
- Swiggy, Zomato, **and Blinkit** available

### Transport
- Dharamshala Airport: 30 km
- Una Railway Station: 30 km
- **3 free electric vehicles** for campus transport

### Other
- Elections: **None** (unusual for an NIT)
- Medical: Hospital in hostel, free
- Laundry: Pay per use
- Fines: End sem fine, backlog fines
- Tourist: Shimla, Dharamshala, Manali, Chandigarh (Himachal location advantage)

---

## Data Gaps

1. **Mess schedule** — no weekly menu provided
2. **Mess timing** — not provided
6. **Mess timing** — not provided
7. **Gate timing / curfew** — not mentioned
8. **Room furniture** — not mentioned
9. **Climate details** — only that it's in Himachal (hilly, cold winters implied)
10. **Language** — not mentioned (likely Hindi + English)
11. **Hostel allotment** — how students are assigned

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0026 | GPay UPI payment QR (ambassador) | ❌ DELETED — personal payment |
| WA0027 | PhonePe transaction screenshot | ❌ DELETED — personal payment |

**Note:** Ambassador also shared fee structure PDF, timetable PDF, and student ID — but these were `<Media omitted>` in the WhatsApp export (documents aren't always included). Need to collect these via Telegram or ask ambassador to reshare.

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | ✅ | 17 sections |
| Supabase college_details | ✅ | 17 sections |
| D1 training_data | ✅ | 12 chunks |
| D1 knowledge_chunks | ✅ | 81 chunks |
| D1 ambassador_contacts | ✅ | 1 record |
| Local cleaned chat | ✅ | Personal info removed |

---

## Files in Folder

```
nit-hamirpur/
├── nit-hamirpur-firstreport.md
├── nit-hamirpur-knowledge-base.json
├── nit-hamirpur-whatsapp-chat-raw.txt
├── nit-hamirpur-whatsapp-chat-cleaned.txt
├── nit-hamirpur-training-chunks.sql
└── nit-hamirpur-knowledge-chunks.sql
```

---

*Report generated 2 April 2026. Fee structure and timetable PDFs need to be collected separately.*
