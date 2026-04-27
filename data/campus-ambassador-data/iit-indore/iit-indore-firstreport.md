# IIT Indore -- First Report
## Data Collection Report -- cutoffs.ai

**Full Name:** Indian Institute of Technology Indore
**Data Sources:** WhatsApp chat with ambassador (with media), Fee structure PDF (2 pages), Timetable xlsx
**Date Collected:** 2-3 April 2026
**Ambassador:** B.Tech student -- contact stored separately
**Verified By:** Manual review of all images and documents

---

## Data Summary

| Section | Status | Source |
|---------|--------|--------|
| Overview | Done | WhatsApp chat |
| Boys Hostels | Done | WhatsApp chat |
| Girls Hostels | Done | WhatsApp chat |
| Mess | Done | WhatsApp chat |
| Fee Structure | Done | Fee PDF (2 pages) + WhatsApp chat |
| WiFi | Done | WhatsApp chat |
| Attendance | Done | WhatsApp chat |
| Clubs | Done | WhatsApp chat |
| Fests | Done | WhatsApp chat |
| Sports | Done | WhatsApp chat |
| Canteen | Done | WhatsApp chat |
| Shops | Done | WhatsApp chat |
| Laundry | Done | WhatsApp chat |
| Elections | Done | WhatsApp chat |
| Fines | Done | WhatsApp chat |
| Gym | Done | WhatsApp chat |
| Medical | Done | WhatsApp chat |
| Transport | Done | WhatsApp chat |
| Restaurants | Done | WhatsApp chat |
| Nearby Places | Done | WhatsApp chat |
| Shopping/Malls | Done | WhatsApp chat |
| Language | Done | WhatsApp chat |
| Climate | Done | WhatsApp chat |
| Gate timing | Missing | Not provided |
| Hostel furniture | Missing | Not provided |
| Mess schedule/timing | Missing | Not provided |

---

## Key Data Points

### Location
- Khandwa Road, Simrol, Indore, Madhya Pradesh - 452020
- 21 km from Indore city

### Hostels
- **Boys (5):** CVR (1st year, double), VSB (2nd year, double), APJ (3rd/4th year, single), PM Ajay (M.Tech/M.Sc, double), HJB (PG/PhD, single)
- **Girls (1):** DA (all girls, double occupancy)

### Fee Structure
- B.Tech and B.Des (2025 batch, tentative)
- First semester: Rs 1,42,000 (tuition Rs 1,00,000 + insurance Rs 1,600 + per-semester Rs 6,300 + one-time admission Rs 8,100 + refundable deposit Rs 10,000 + accommodation Rs 16,000)
- Second semester: Rs 1,22,300
- Third semester: Rs 1,23,900
- Subsequent semesters: ~Rs 1,22,000 to 1,24,000
- Total 4 years (8 semesters): approximately Rs 9,90,000 to 10,00,000
- SC/ST/PwD exempted from tuition fee
- Full 8-semester breakdown available in PDF

### Mess
- 3 caterers: Food Sutra, Sheela, Surendar Arora
- Students choose their caterer every month

### Attendance
- 70% attendance criteria observed

### Sports
- 9 indoor badminton courts
- Swimming pool
- Fully developed athletic stadium (running track, long jump, high jump)
- 2 football fields, 1 cricket field
- Hockey court, 2 tennis courts, 3 volleyball courts, 1 basketball area
- Squash courts

### Canteen
- Overnight canteen available
- Dominos on campus
- Multiple outlets: AS Canteen, Yewale, Cafe Beats, Amul Parlour, Noors, Jucilicious Cafe

### Laundry
- 4 washing machines + 2 dryers per hostel (paid)
- Separate campus laundry service (monthly payment)

### Medical
- Health center on campus, ~600m from hostels
- Ambulance service in emergencies
- Treatment free of cost

### Fests
- E-Summit (Entrepreneur), Lakshya (Sports), Ingenium (Tech/Cultural), TEDx, Rangreza (Garba), Apna Cultural

### Clubs
- Cultural: Aina, Avana, Kaizen Dance, Music, Prakriti, Mystic Hues, Deb Soc, Srijan, Drapes
- Technical: Programming, Designing, Cybersecurity, AI
- Sports: Football, Cricket, Hockey, Basketball, Volleyball, Swimming, Chess, Board games

### Elections
- Held every academic year, generally in even semester

### Other
- **WiFi:** Available mostly everywhere on campus
- **Gym:** Available on campus
- **Shops:** La Fresco (daily needs, snacks)
- **Fines:** Demolition in hostels/labs, no ragging, fighting leads to action

### Transport
- Indore Junction Railway Station (INDB): 25 km
- Devi Ahilyabai Holkar International Airport: 31 km
- Bus facilities from Indore city to campus
- Distance campus to city: 21 km

### Nearby
- Restaurants: Bombay Darbar (500m), Sardar Ji (100m). Swiggy/Zomato available.
- Tourist: Tincha Waterfalls, Patalpani, Jam Gate, Rajwada Palace, Lotus Valley, Indore Zoo Park, Lal Bagh Palace, Kaanch Mandir
- Malls: Phoenix Citadel, C21, Treasure Island, Nexus

### Language & Climate
- Language: Hindi
- Climate: All three seasons at high intensity

---

## Images Reviewed

| File | Content | Action |
|------|---------|--------|
| WA0011 | Student ID card | DELETED -- personal ID |
| WA0000 | App screenshot | DELETED -- marketing material |
| WA0001 | App screenshot | DELETED -- marketing material |
| WA0002 | App screenshot | DELETED -- marketing material |
| WA0019 | App screenshot | DELETED -- marketing material |

---

## Files Kept

| File | Content |
|------|---------|
| Fee structure PDF | 2025 B.Tech/B.Des 4-year fee structure (2 pages) |
| Timetable xlsx | 2026 Spring Semester class timetable |

---

## Data Gaps

1. **Gate timing / curfew** -- not mentioned
2. **Hostel furniture details** -- not mentioned (beds, cupboards, desks, etc.)
3. **Mess schedule / timing** -- only caterer names and monthly choice mentioned, no meal timing or menu
4. **Transport costs** -- auto/cab fares not mentioned
5. **Delivery policy** -- Zomato/Swiggy to hostel or gate not clarified
6. **Canteen timing** -- not mentioned
7. **Medical timing** -- only location and free treatment mentioned, no hours

---

## Storage Status

| Database | Status | Records |
|----------|--------|---------|
| Local knowledge-base.json | Done | 20 sections |
| Supabase college_details | Done | 20 sections |
| D1 training_data | Done | 23 chunks |
| D1 knowledge_chunks | Done | 76 chunks |
| D1 ambassador_contacts | Done | 1 record |
| Local cleaned chat | Done | Personal info removed |

---

## Files in Folder

```
iit-indore/
  iit-indore-firstreport.md              -- This report
  iit-indore-knowledge-base.json         -- Structured data
  iit-indore-whatsapp-chat-raw.txt       -- Original chat (reference)
  iit-indore-whatsapp-chat-cleaned.txt   -- Personal info removed
  iit-indore-knowledge-chunks.sql        -- D1 knowledge chunks SQL (76 statements)
  iit-indore-training-chunks.sql         -- D1 training data SQL (23 chunks)
  iit-indore-fee-structure-btech-2025.pdf -- Fee structure PDF (2 pages)
  iit-indore-timetable-spring-2026.xlsx  -- Spring 2026 timetable
```

---

*Report generated 4 April 2026. Data subject to verification by user.*
