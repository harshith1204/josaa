# IIT Guwahati — First Report
## Data Collection Report — cutoffs.ai

**Data Sources:** WhatsApp chat with ambassador (with media), Fee structure PDF (1 page, image-based)
**Date Collected:** 31 March 2026
**Ambassador:** B.Tech student — contact stored separately
**Verified By:** Manual review of all 6 images + 2 PDFs, OCR of fee structure, cross-verified with chat text

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | ✅ Complete | WhatsApp chat |
| Boys Hostels (9 hostels) | ✅ Complete | WhatsApp chat |
| Girls Hostels (3 hostels) | ✅ Complete | WhatsApp chat |
| Other Hostels | ✅ Complete | WhatsApp chat (Married Scholar Hostel) |
| Mess | ⚠️ Partial | WhatsApp chat (each hostel has own mess, no schedule) |
| Fee Structure (B.Tech) | ✅ Complete | PDF OCR (detailed 8-semester breakdown) |
| WiFi | ⚠️ Partial | WhatsApp chat (available, no details) |
| Attendance | ✅ Complete | WhatsApp chat |
| Clubs | ✅ Complete | WhatsApp chat |
| Fests | ✅ Complete | WhatsApp chat |
| Sports | ✅ Complete | WhatsApp chat |
| Canteen | ✅ Complete | WhatsApp chat |
| Shops | ✅ Complete | WhatsApp chat |
| Laundry | ✅ Complete | WhatsApp chat |
| Fines | ✅ Complete | WhatsApp chat |
| Elections | ✅ Complete | WhatsApp chat |
| Medical | ✅ Complete | WhatsApp chat |
| Transport | ✅ Complete | WhatsApp chat |
| Restaurants | ✅ Complete | WhatsApp chat |
| Nearby Places / Malls | ✅ Complete | WhatsApp chat |
| Tourist | ✅ Complete | WhatsApp chat |
| Language & Climate | ✅ Complete | WhatsApp chat |

---

## Key Data Points

### Hostels (13 total)
- **Boys (10):** Brahmaputra, Lohit, Kapili, Dihing, Kameng, Umiam, Barak, Siang, Manas — all same pattern: 1st/2nd yr sharing, 3rd/4th yr single room, each has own mess. Gaurang — M.Tech 1st yr double sharing.
- **Girls (3):** Subhansiri, Disang, Dhansiri — same pattern as boys.
- **Other:** Married Scholar Hostel for married PhD candidates.

### Fee (B.Tech, General/EWS/OBC-NCL, July 2025)
- **1st semester: Rs 1,66,000** (Tuition 1L + Hostel/Mess 33,200 + Deposit 12,000 + Other 20,800)
- **2nd-8th semester: ~Rs 1,43,200 each** + Medical Insurance
- **Total 4 years: Rs 11,68,400** + Medical Insurance Premium
- Hostel includes: rent, maintenance, electricity, water, mess advance Rs 22,000/sem
- One-time admission: Rs 10,800 non-refundable
- Refundable deposit: Rs 12,000 (1st sem only)

### Canteen & Gym
- Every hostel has its own canteen
- Lohit canteen: open till **4 AM**
- Other canteens: close at **1 AM**
- 2 central gyms (boys), 1 central gym (girls), every hostel has own gym

### Sports
- Cricket, Badminton, Table Tennis, Archery, Lawn Tennis, Football, Volleyball, Athletics, Kabbadi, Kho Kho

### Transport
- Kamakhya Railway: 12 km
- Guwahati Railway: 9.1 km
- Airport: 21 km
- Campus: E-autos and e-buggy (paid)

### Other
- Attendance: 75% (depends on professor)
- Medical: Hospital on campus, free for students
- Laundry: All hostels. Paid laundry in Lohit.
- Climate: Winter lasts long
- Language: Hindi and English on campus

---

## Data Gaps

1. **Mess schedule** — no weekly menu provided, only "each hostel has own mess"
2. **WiFi details** — speed, data limit, blocked sites
3. **Hostel sharing details** — exact number per room (double? triple?)
4. **Gate timing / curfew** — not mentioned
5. **Room furniture** — what's provided?
6. **Climate details** — temperature range, monsoon, humidity
7. **SC/ST/EWS fee** — only General/OBC-NCL fee provided
8. **Hostel allotment** — how are students assigned to hostels?
9. **Mess timing** — not provided
10. **On-campus restaurants pricing** — Lauriat, Urban Tadka costs?

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0000 | cutoffs.ai app screenshot | ❌ DELETED — our app |
| WA0001 | cutoffs.ai app screenshot | ❌ DELETED — our app |
| WA0002 | cutoffs.ai app screenshot | ❌ DELETED — our app |
| WA0019 | cutoffs.ai Telegram QR | ❌ DELETED — marketing |
| WA0025 | PhonePe payment QR | ❌ DELETED — personal |
| WA0023 | PhonePe transaction screenshot | ❌ DELETED — personal |
| PROVISIONAL-IDENTITY-CARD.pdf | Student provisional ID | ❌ DELETED — personal ID |
| fee structure-compressed.pdf | Fee structure (B.Tech) | ✅ KEPT — OCR'd all fee data |

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | ✅ | 21 sections |
| Supabase college_details | ✅ | 21 sections |
| D1 training_data | ✅ | 14 chunks |
| D1 knowledge_chunks | ✅ | 89 chunks |
| D1 ambassador_contacts | ✅ | 1 record |
| Local cleaned chat | ✅ | Personal info removed |

---

## Files in Folder

```
iit-guwahati/
├── iit-guwahati-firstreport.md              ← This report
├── iit-guwahati-knowledge-base.json
├── iit-guwahati-whatsapp-chat-raw.txt
├── iit-guwahati-whatsapp-chat-cleaned.txt
├── iit-guwahati-fee-structure-btech.pdf
├── iit-guwahati-training-chunks.sql
├── iit-guwahati-knowledge-chunks.sql
└── gen_chunks.py                            ← Utility script (can delete)
```

---

*Report generated 2 April 2026. Data subject to verification by user.*
