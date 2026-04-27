# NIT Warangal — First Report
## Data Collection Report — cutoffs.ai

**Data Sources:** WhatsApp chat with ambassador (with media), Hostel fee receipt image, Two mess schedule images
**Date Collected:** 31 March 2026
**Ambassador:** B.Tech CSE, 1st year (2024 batch, Roll: 24CSB0A49) — contact stored separately
**Verified By:** Manual review of all 7 images, OCR of fee receipt + mess schedules, cross-verified with chat text

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | ✅ Complete | WhatsApp chat |
| Boys Hostels | ✅ Complete | WhatsApp chat |
| Girls Hostels | ✅ Complete | WhatsApp chat |
| Mess (Boys + Girls) | ✅ Complete | WhatsApp chat |
| Mess Schedule | ✅ Complete | Image OCR (2 images) |
| Fee Structure (Hostel) | ✅ Complete | Fee receipt image OCR |
| Fee Structure (Tuition) | ❌ Missing | Not provided |
| WiFi | ⚠️ Partial | WhatsApp chat (URL only, no details) |
| Attendance | ✅ Complete | WhatsApp chat (detailed policy) |
| Clubs | ✅ Complete | WhatsApp chat |
| Fests | ✅ Complete | WhatsApp chat |
| Sports & Gym | ✅ Complete | WhatsApp chat |
| Canteen & Food | ✅ Complete | WhatsApp chat |
| Laundry | ✅ Complete | WhatsApp chat |
| Elections | ✅ Complete | WhatsApp chat |
| Medical | ✅ Complete | WhatsApp chat |
| Transport | ✅ Complete | WhatsApp chat |
| Restaurants | ✅ Complete | WhatsApp chat |
| Nearby Places | ✅ Complete | WhatsApp chat |
| Shopping | ✅ Complete | WhatsApp chat |
| Language | ✅ Complete | WhatsApp chat |
| Climate | ❌ Missing | Not provided |

---

## Key Data Points

### Hostels
- **Boys:** 1.8K Ultra Mega (1st yr), 1K Mega (3rd/4th yr), Azad/Bose/Ambedkar/Bhabha (2nd yr), 14th Block (PhD), ISH (international, single room)
- **Girls:** Priyadarshini Hall, Sarojini Hall, New LH-A/B/C
- **All rooms 2-sharing** (except ISH which is single)
- **Lift available in every hostel**

### Fee (Hostel Only — Per Semester)
- Maintenance: Rs 7,500
- Seat Rent: Rs 2,000
- Water & Electricity: Rs 5,500
- Mess: Rs 12,000
- **Total Hostel: Rs 27,000/semester**
- Source: Actual student receipt dated 14-Dec-2025
- **Tuition/academic fee NOT provided — data gap**

### Mess
- Boys: IFC-A (1st yr), IFC-B (3rd/4th yr), IFC-C (2nd yr), IFC-D (PhD), Godavari I & II, Krishna (M.Tech)
- Girls: Priyadarshini Mess, Sarojini Mess
- Timing: Breakfast 7-9 AM, Lunch 12-2:30 PM, Dinner 7-9 PM
- Cuisine: Strong South Indian + North Indian mix
- Specials: Tue Veg Briyani + Fruit Custard, Thu Kheer + Jalebi, Sun Gulab Jamun

### Attendance
- **80% mandatory** (stricter than most NITs)
- Expected to maintain 100%
- Max 20% condonation by HOD for medical/calamity
- Calculated from class commencement date

### Sports
- Events: Ayodhan (National), Inter-NIT, FPL (Football), SPL (Cricket)
- Facilities: 400m track, basketball (floodlit), tennis, badminton, indoor arena
- Gyms: 1.8K, 1K, SAC

### Other
- Laundry: Washerman shop 9 AM-9 PM daily + Smart Laundry rooms planned
- Medical: Weekdays 9:30-1 & 3-6, Weekends 9:30-11:30
- Transport: Kazipet Railway 3km, Warangal Railway 9km, Hanamkonda Bus Stand 5km
- Food: Food Street, Country Oven, Taaza Tiffins on campus. Swiggy/Zomato available.
- Tourist: Thousand Pillar Temple 7km, Bhadrakali Temple 8km

---

## Data Gaps

1. **Tuition / academic fee** — only hostel fee provided, need full fee structure
2. **WiFi details** — only URL given, need speed/limit/blocked sites
3. **Climate** — not mentioned at all
4. **Gate timing / curfew** — not mentioned
5. **Room furniture** — what's provided in hostels?
6. **1st year girls hostel** — which specific hostel for freshers?
7. **Transport costs** — auto/cab fares not mentioned
8. **Mess fee clarity** — is Rs 12,000 per semester or per month?
9. **Hostel allotment** — random or merit-based?
10. **Delivery policy** — Zomato/Swiggy to hostel or gate?

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0009 | Hostel fee receipt | ✅ KEPT — OCR'd fee data, renamed |
| WA0010 | Student ID card with photo | ❌ DELETED — personal ID |
| WA0011 | Mess schedule (IFC-C, blurry) | ✅ KEPT — OCR'd menu data |
| WA0013 | Mess schedule (detailed, clear) | ✅ KEPT — full weekly menu OCR'd |
| WA0019 | Cutoffs.ai Telegram QR | ❌ DELETED — marketing material |
| WA0020 | PhonePe payment QR | ❌ DELETED — personal payment |
| WA0024 | PhonePe transaction screenshot | ❌ DELETED — personal payment |

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | ✅ | 18 sections |
| Supabase college_details | ✅ | 18 sections |
| D1 training_data | ✅ | 15 chunks |
| D1 knowledge_chunks | ✅ | 92 chunks |
| D1 ambassador_contacts | ✅ | 1 record |
| Local cleaned chat | ✅ | Personal info removed |
| RAG chatbot | ❌ | Not built yet (data-only phase) |
| R2 media | ❌ | Not uploaded yet (only 3 images kept) |

---

## Files in Folder

```
nit-warangal/
├── nit-warangal-firstreport.md              ← This report
├── nit-warangal-knowledge-base.json         ← Structured data
├── nit-warangal-whatsapp-chat-raw.txt       ← Original chat (reference)
├── nit-warangal-whatsapp-chat-cleaned.txt   ← Personal info removed
├── nit-warangal-hostel-fee-receipt.jpg      ← Fee receipt (OCR'd)
├── nit-warangal-mess-schedule-ifc-c.jpg     ← IFC-C mess schedule
├── nit-warangal-mess-schedule-detailed.jpg  ← Detailed weekly menu
├── nit-warangal-training-chunks.sql         ← D1 training data SQL
└── nit-warangal-knowledge-chunks.sql        ← D1 knowledge chunks SQL
```

---

*Report generated 2 April 2026. Data subject to verification by user.*
