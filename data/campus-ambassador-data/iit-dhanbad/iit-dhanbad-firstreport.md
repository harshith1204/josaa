# IIT Dhanbad -- First Report
## Data Collection Report -- cutoffs.ai

**Full Name:** IIT (ISM) Dhanbad (Indian Institute of Technology, Indian School of Mines), established 1926
**Data Sources:** WhatsApp chat with ambassador (with media), Fee structure image, EE timetable image, Hostel allocation PDF, College Directory 2024 PDF (44 pages)
**Date Collected:** 1-2 April 2026
**Ambassador:** B.Tech, 25JE batch -- contact stored separately
**Verified By:** Manual review of all images, cross-verified with chat text and hostel allocation PDF

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | Done | WhatsApp chat |
| Boys Hostels | Done | Hostel Allocation PDF + WhatsApp chat |
| Girls Hostels | Done | Hostel Allocation PDF + WhatsApp chat |
| Hostel Sharing | Done | WhatsApp chat |
| Mess | Partial | WhatsApp chat (no schedule/timing) |
| Fee Structure | Partial | Image kept, detailed extraction pending |
| WiFi | Done | WhatsApp chat |
| Attendance | Done | WhatsApp chat |
| Clubs | Done | College Directory 2024 PDF + WhatsApp chat |
| Fests | Done | College Directory 2024 PDF |
| Sports | Partial | WhatsApp chat (no facility details) |
| Canteen | Partial | WhatsApp chat (no timing) |
| Shops | Done | WhatsApp chat |
| Laundry | Done | WhatsApp chat |
| Elections | Done | WhatsApp chat |
| Fines | Done | WhatsApp chat |
| Gym | Done | WhatsApp chat |
| Medical | Partial | WhatsApp chat (no timing) |
| Transport | Done | WhatsApp chat |
| Restaurants | Done | WhatsApp chat |
| Nearby Places | Done | WhatsApp chat |
| Shopping/Malls | Done | WhatsApp chat |
| Language | Done | WhatsApp chat |
| Climate | Done | WhatsApp chat |
| Gate timing | Missing | Not provided |

---

## Key Data Points

### Established 1926
- Formerly Indian School of Mines, one of the oldest technical institutions in India
- Located in Dhanbad district, Jharkhand - 826004

### Hostels
- **Boys (6):** Aquamarine, Jasper, Amber, Topaz, Sapphire, Diamond
- **Girls (3):** Emerald, Opal, Ruby & Rosaline
- **Sharing:** 2-sharing in all hostels except New Rosaline (1st, 2nd, 3rd year) which is 3-sharing
- Detailed year-wise allocation available from hostel PDF

### Attendance
- No mandatory 75% attendance rule -- more relaxed policy

### Fests
- **Srijan:** Biggest Socio-Cultural Fest of Eastern India since 1977, 30,000+ footfall from 200+ colleges, prize money Rs 6 lakh+
- **Khanan:** Annual Geo-Mining Fest -- biggest mining fest in India, 3-day summit
- **Parakram:** Annual Sports Fest
- **Concetto:** Annual Techno-Management Fest
- **Basant:** Alumni Convention

### Elections
- Conducted like state elections -- Senate as MLA, President as CM
- Posts: President, Chairperson, Finance Convenor, Gen Sec Cultural and Media, Gen Sec Sports, Gen Sec Tech
- Senate posts assigned by President

### Clubs (from College Directory 2024)
- ARKA (Aeronautics, 2017), Fotofreaks (Photography), RoboISM (Robotics, 2009), Abhay (Dramatics), Quiz Club (2011), LCI (Filmography), Data and Software Technology Club (formerly Cyber Labs), Literary and Debating Club
- Many more in College Directory PDF (44 pages)

### Fee Structure
- B.Tech first semester approximately Rs 2,25,000+ (tuition Rs 1,00,000 + hostel + mess + one-time fees)
- Fee image kept for reference -- detailed breakdown pending

### Laundry
- No washing machines available
- Dhobis (washermen) provide laundry service

### Fines
- Mobile phone in exam = back paper for that subject (depends on professor)

### Other
- **Mess:** Every hostel has own mess
- **Canteen:** Every hostel has separate canteen + one main canteen
- **Shops:** Hostel shops + ground floor of library
- **Gym:** Separate gyms for boys and girls, arranged per hostel
- **Medical:** Free if checked by campus doctor
- **WiFi:** Available campus-wide, WiFi + LAN in every hostel (varies per hostel)

### Transport
- Dhanbad Junction Railway Station: 4.2 km
- Ranchi Airport: 156 km
- Kazi Nazrul Airport (Durgapur): 90 km
- Dhanbad Bus Station: nearby

### Nearby
- Restaurants: Donne Biryani House (3.5 km), Champaran Meat House (3 km). Swiggy/Zomato available.
- Tourist: Topchanchi Lake (36 km), Parasanath Hills (85 km), Sita Falls (26.5 km), Bhatinda Waterfalls (20.2 km), Maithon Dam (46 km)
- Malls: Ozone Mall (3.5 km), Prabhatam (3 km)

### Language & Climate
- Language: Hindi
- Climate: Very cold winters (longer winter season), very hot summers

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0000 | App screenshot | DELETED -- marketing material |
| WA0001 | App screenshot | DELETED -- marketing material |
| WA0002 | App screenshot | DELETED -- marketing material |
| WA0019 | App screenshot | DELETED -- marketing material |
| WA0005 | EE timetable image | KEPT -- academic reference |
| WA0006 | Fee structure image | KEPT -- fee data reference |
| WA0007 | Student ID card | DELETED -- personal ID |
| WA0008 | Student ID card | DELETED -- personal ID |
| WA0009 | Payment QR screenshot | DELETED -- payment info |

---

## Data Gaps

1. **Fee detailed breakdown** -- image kept but exact line-by-line OCR pending
2. **Mess schedule** -- only "every hostel has mess" mentioned, no timing or menu
3. **Sports facilities details** -- only "multiple facilities" and Parakram fest mentioned
4. **Medical timing** -- only "free with campus doctor" mentioned, no hours
5. **Gate timing / curfew** -- not mentioned
6. **Canteen timing** -- not mentioned
7. **Transport costs** -- auto/cab fares not mentioned
8. **Delivery policy** -- Zomato/Swiggy to hostel or gate not mentioned

---

## College Directory PDF
- 44-page College Directory 2024 FINAL.pdf kept in folder
- Contains detailed clubs, fests, sports, medical info
- Further extraction possible if needed

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | Done | 21 sections |
| Supabase college_details | Done | 21 sections |
| D1 training_data | Done | 22 chunks |
| D1 knowledge_chunks | Done | 68 chunks |
| D1 ambassador_contacts | Done | 1 record |
| Local cleaned chat | Done | Personal info removed |

---

## Files in Folder

```
iit-dhanbad/
  iit-dhanbad-firstreport.md              -- This report
  iit-dhanbad-knowledge-base.json         -- Structured data
  iit-dhanbad-whatsapp-chat-raw.txt       -- Original chat (reference)
  iit-dhanbad-whatsapp-chat-cleaned.txt   -- Personal info removed
  iit-dhanbad-knowledge-chunks.sql        -- D1 knowledge chunks SQL (68 statements)
  iit-dhanbad-training-chunks.sql         -- D1 training data SQL (22 chunks)
  iit-dhanbad-fee-structure.jpg           -- Fee structure image
  iit-dhanbad-timetable-ee.jpg            -- EE timetable image
  iit-dhanbad-hostel-allocation-2025-26.pdf -- Hostel allocation PDF
  iit-dhanbad-college-directory-2024.pdf  -- College Directory PDF (44 pages)
```

---

*Report generated 4 April 2026. Data subject to verification by user.*
