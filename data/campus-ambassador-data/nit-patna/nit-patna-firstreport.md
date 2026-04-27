# NIT Patna -- First Report
## Data Collection Report -- cutoffs.ai

**Data Sources:** WhatsApp chat with ambassador (with media), Fee structure PDF, Timetable PDF, Two mess schedule images
**Date Collected:** 1-2 April 2026
**Ambassador:** B.Tech CSE, UG25 batch -- contact stored separately
**Verified By:** Manual review of all images, OCR of mess schedules, cross-verified with chat text

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | Done | WhatsApp chat |
| Boys Hostels | Done | WhatsApp chat |
| Girls Hostels | Done | WhatsApp chat |
| Mess Schedule | Done | Image OCR (2 images) |
| Mess Timing | Done | Image OCR |
| Fee Structure | Done | PDF (FEE_UG_2024_25_NOTIFICATION) |
| WiFi | Partial | WhatsApp chat (no speed/limit details) |
| Attendance | Done | WhatsApp chat |
| Clubs | Done | WhatsApp chat |
| Fests | Partial | WhatsApp chat (no fest names) |
| Laundry | Done | WhatsApp chat |
| Transport | Done | WhatsApp chat |
| Restaurants | Done | WhatsApp chat |
| Nearby Places | Done | WhatsApp chat |
| Shopping/Malls | Done | WhatsApp chat |
| Language | Done | WhatsApp chat |
| Climate | Done | WhatsApp chat |
| Sports | Missing | Not provided |
| Gym | Missing | Not provided |
| Medical | Missing | Not provided |
| Canteen | Missing | Not provided |
| Elections | Missing | Not provided |
| Shops on campus | Missing | Not provided |
| Gate timing | Missing | Not provided |

---

## Key Data Points

### Two Campuses
- **Old Campus:** Ashok Rajpath Road, near Patna University, Patna - 800005
- **New Campus:** Bihta, Sikandarpur Village, Patna - 801103

### Hostels (Old Campus Only Mentioned)
- **Boys:** 6 hostels -- Kosi, Sone A, Sone B, Kosi Extension, Brahmaputra, Bagmati
- **Girls:** 1 hostel -- Ganga Hostel
- No details on new campus hostels, room sharing, or furniture

### Fee Structure (B.Tech / B.Arch / Dual Degree, 2024-25 onwards)
- **First Semester:** Rs 1,56,750 (Tuition Rs 62,500 + Part B Rs 94,250)
- Part B includes: Caution money Rs 10,000 (refundable), Development fee Rs 30,000, Hostel Rs 12,000, Mess advance Rs 20,000, Hostel security Rs 6,000 (refundable)
- **Subsequent Odd Semesters:** ~Rs 1,04,550
- **Even Semesters:** ~Rs 1,04,750
- **Exemptions:** SC/ST/PwD exempted from tuition. Income <1L full remission. Income 1-5L gets 2/3rd remission.

### Attendance
- 75% attendance criteria

### Mess
- **Timing:** Breakfast 7-9:30 AM, Lunch 12:30-2:30 PM, Evening snacks 5-6 PM, Dinner 8-10 PM
- **Mon-Thu:** Paratha/Puri/Idli/Aloo Paratha breakfast. Dal+Rice+Roti+Sabji lunch. Dal/Paneer/Kheer dinner.
- **Friday:** Halwa+Puri breakfast, Sewai dinner
- **Saturday:** Chole Bhature breakfast, Kadhi Pakora dinner
- **Sunday special:** Masala Dosa/Uttapam breakfast, Veg Biryani+Kofta lunch, Manchurian+Ice Cream (80ml) dinner
- Evening snacks: Tea+Coffee+Biscuits daily. Pickles with every meal. Min 3 salad items. Seasonal fruits daily.

### Clubs
- 20+ clubs (tech + cultural)
- Popular: Coding, Robotics, Drama, Dance, Photography

### Transport
- Railway: Patna Junction, Patliputra Junction, Danapur Junction
- Airport: Jay Prakash Narayan International Airport, Patna

### Laundry
- Old campus: Paid laundry in hostels
- New campus: Washing machines available

### Other
- Restaurants: Dominos, KFC, McDonalds, Pista House, Biryani King. Swiggy/Zomato likely available.
- Tourist: Patna Zoo, Rajgir (90 km), Bodh Gaya (140 km)
- Malls: City Center Mall, Gravity Mall
- Language: Hindi, Bhojpuri, English
- Climate: Moderate, slightly hot in summer
- WiFi: High speed, good coverage in hostels and college

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0000 | App screenshot | DELETED -- marketing material |
| WA0001 | App screenshot | DELETED -- marketing material |
| WA0002 | App screenshot | DELETED -- marketing material |
| WA0019 | App screenshot | DELETED -- marketing material |
| WA0033 | Student ID card | DELETED -- personal ID |
| WA0037 | Mess schedule image 1 | KEPT -- OCR'd mess data |
| WA0038 | Mess schedule image 2 | KEPT -- OCR'd mess data |

---

## Data Gaps

1. **New campus hostels** -- only old campus hostels mentioned, nothing about Bihta campus hostels
2. **Sports facilities** -- not mentioned at all
3. **Gym** -- not mentioned
4. **Medical / Health centre** -- not mentioned
5. **Canteen / food outlets on campus** -- not mentioned
6. **Elections / student council** -- not mentioned
7. **Shops on campus** -- not mentioned
8. **Fines / penalties** -- not mentioned
9. **Gate timing / curfew** -- not mentioned
10. **Hostel sharing details** -- room sharing (single/double/triple) not mentioned
11. **Hostel furniture** -- not mentioned
12. **Fest names** -- only "annual sports and cultural fest" mentioned, no specific names
13. **Transport costs** -- auto/cab fares not mentioned
14. **Delivery policy** -- Zomato/Swiggy to hostel or gate not mentioned

---

## Timetable

- ECE Department Jan-June 2026 timetable PDF KEPT in folder.

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | Done | 13 sections |
| Supabase college_details | Done | 13 sections |
| D1 training_data | Done | 16 chunks |
| D1 knowledge_chunks | Done | 56 chunks |
| D1 ambassador_contacts | Done | 1 record |
| Local cleaned chat | Done | Personal info removed |

---

## Files in Folder

```
nit-patna/
  nit-patna-firstreport.md              -- This report
  nit-patna-knowledge-base.json         -- Structured data
  nit-patna-whatsapp-chat-raw.txt       -- Original chat (reference)
  nit-patna-whatsapp-chat-cleaned.txt   -- Personal info removed
  nit-patna-knowledge-chunks.sql        -- D1 knowledge chunks SQL
  nit-patna-training-chunks.sql         -- D1 training data SQL
  nit-patna-fee-structure-ug.pdf        -- Fee structure PDF
  nit-patna-timetable-ece-2026.pdf      -- ECE timetable PDF
  nit-patna-mess-schedule-1.jpg         -- Mess schedule image 1
  nit-patna-mess-schedule-2.jpg         -- Mess schedule image 2
```

---

*Report generated 4 April 2026. Data subject to verification by user.*
