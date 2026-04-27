-- IIT Indore Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'location',
'IIT Indore, khandwa rd, Simrol, Indore, Madhya Pradesh pincode: 452020',
'IIT Indore is located on Khandwa Road, Simrol, Indore, Madhya Pradesh - 452020. Distance from campus to Indore city is 21 km.',
1, '02/04/26 7:35 pm', '02/04/26 7:35 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'transport',
'transportation: Indore Junction Railway(INDB)(25km) nd Devi Ahilyabai Holkar International airport (31km) with bus facilities from indore city to campus. dist from campus to city : 21km',
'Transport near IIT Indore: By train — Indore Junction Railway Station (INDB), 25 km from campus. By air — Devi Ahilyabai Holkar International Airport, 31 km from campus. Bus facilities available from Indore city to campus. Distance from campus to city: 21 km.',
1, '02/04/26 10:39 pm', '02/04/26 10:39 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'restaurants',
'restaurants: Bombay darbar in walkable distance from campus (500m) sardar ji 100m from campus',
'Restaurants near IIT Indore: Bombay Darbar (500m walkable from campus) and Sardar Ji (100m from campus). Swiggy and Zomato delivery available.',
1, '02/04/26 10:40 pm', '02/04/26 10:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'tourist',
'tourist places: tincha waterfalls patalpani Jam Gate Rajwada Palace Lotus Valley Indore Zoo park lal bagh palace Kaanch mandir',
'Tourist places near IIT Indore: Tincha Waterfalls, Patalpani, Jam Gate, Rajwada Palace, Lotus Valley, Indore Zoo Park, Lal Bagh Palace, and Kaanch Mandir.',
1, '02/04/26 10:44 pm', '02/04/26 10:44 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'malls',
'Mall: no mall''s in campus Phoenix citadel mall C21 mall Treasure Island mall Nexus mall',
'Shopping malls near IIT Indore (none on campus): Phoenix Citadel Mall, C21 Mall, Treasure Island Mall, and Nexus Mall.',
1, '02/04/26 10:45 pm', '02/04/26 10:45 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'climate',
'Climate: all the three seasons are seen at their high intensity.',
'Climate at IIT Indore: All three seasons (summer, monsoon, winter) are experienced at high intensity.',
1, '02/04/26 10:46 pm', '02/04/26 10:46 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'language',
'Language: Hindi is the general language used',
'The general language used at IIT Indore is Hindi.',
1, '02/04/26 10:47 pm', '02/04/26 10:47 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'document_ocr', 'fee_structure',
'fee structure (PDF attached). 2025 B.Tech. and B.Des. Batch Four Year Fee Structure Tentative.',
'IIT Indore fee structure for B.Tech and B.Des (2025 batch, tentative): First semester total Rs 1,42,000 (tuition Rs 1,00,000, insurance Rs 1,600, per-semester fees Rs 6,300, one-time admission Rs 8,100, refundable deposit Rs 10,000, accommodation Rs 16,000). Second semester Rs 1,22,300. Third semester Rs 1,23,900. Subsequent semesters approximately Rs 1,22,000 to Rs 1,24,000. Total 4 years approximately Rs 9,90,000 to Rs 10,00,000. SC/ST/PwD exempted from tuition fee. Income below Rs 1 lakh: full tuition remission. Income Rs 1-5 lakh: 2/3rd remission.',
1, '02/04/26 10:51 pm', '02/04/26 10:51 pm', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'timetable',
'timetable (xlsx attached). 2026 Spring Semester Class Timetable.',
'IIT Indore 2026 Spring Semester class timetable available as xlsx file for reference.',
1, '02/04/26 11:03 pm', '02/04/26 11:03 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'clubs',
'Clubs: Aina (dramatics club) Avana(social welfare club) Kaizen Dance Club (dance club) music club Prakriti (nature nd wildlife club) Mystic hues (Photography club) Deb soc (Debating club) Srijan (literature club) Drapes (Fashion club) Tech clubs like programming, Designing, cybersecurity nd AI sports clubs all of them available',
'Clubs at IIT Indore: Cultural — Aina (Dramatics), Avana (Social Welfare), Kaizen Dance Club (Dance), Music Club, Prakriti (Nature and Wildlife), Mystic Hues (Photography), Deb Soc (Debating), Srijan (Literature), Drapes (Fashion). Technical — Programming, Designing, Cybersecurity, and AI clubs. Sports — all sports clubs available including Football, Cricket, Hockey, Basketball, Volleyball, Swimming, Chess, Board games.',
1, '02/04/26 11:04 pm', '02/04/26 11:04 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'attendance',
'attendance: 70% criteria observed',
'Attendance at IIT Indore: 70% attendance criteria is observed.',
1, '02/04/26 11:05 pm', '02/04/26 11:05 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'wifi',
'Wifi: available in mostly all places of the campus',
'WiFi is available in mostly all places of the IIT Indore campus.',
1, '02/04/26 11:05 pm', '02/04/26 11:05 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'fests',
'Fests: Esummit(entrepreneur fest) Lakshya(sports fest) Ingenium(tech nd cultu5) TedX(Ted talks) Rangreza(Gharba fest) Apna Cultural (multi cultural)',
'Fests at IIT Indore: E-Summit (Entrepreneur fest), Lakshya (Sports fest), Ingenium (Tech and cultural fest), TEDx (TED talks), Rangreza (Garba fest), and Apna Cultural (Multi-cultural fest).',
1, '02/04/26 11:08 pm', '02/04/26 11:08 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'hostels',
'Hostel: VSB HOSTEL(2nd year boys )-double occupancy DA HOSTEL(all girls)-double occupancy APJ HOSTEL(3&4th year boys) - single occupancy CVR HOSTEL(1st year boys )-double occupancy HJB HOSTEL(pg&phd)-single occupancy PM AJAY HOSTEL(M TECH & MSC)-double occupancy',
'Hostels at IIT Indore: Boys have 5 hostels — CVR (1st year, double), VSB (2nd year, double), APJ (3rd and 4th year, single), PM Ajay (M.Tech and M.Sc, double), HJB (PG and PhD, single). Girls have 1 hostel — DA (all girls, double occupancy).',
1, '03/04/26 12:01 pm', '03/04/26 12:01 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'mess',
'mess: 3 caterers in total food sutra, sheela and surendar arora one can choose from these for their caterer every month',
'Mess at IIT Indore: 3 caterers available — Food Sutra, Sheela, and Surendar Arora. Students can choose their caterer every month.',
1, '03/04/26 12:01 pm', '03/04/26 12:01 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'laundry',
'Laundry: 4 washing machines and 2 dryers available in every hostel paid service a laundry service is also available in campus (monthly payment)',
'Laundry at IIT Indore: 4 washing machines and 2 dryers available in every hostel (paid service). A separate laundry service is also available on campus with monthly payment.',
1, '03/04/26 12:04 pm', '03/04/26 12:04 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'elections',
'Elections: campus does hv elections for every academic year generally held in the even semester',
'Elections at IIT Indore: Campus has elections for every academic year, generally held in the even semester.',
1, '03/04/26 12:05 pm', '03/04/26 12:05 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'sports',
'Sports: two football fields one cricket field a fully developed athletic stadium run track, long jump nd high jump areas, hockey court, 2 Tennis courts 3 volley ball courts one basketball area 9 indoor badminton courts swimming pool squash courts',
'Sports facilities at IIT Indore: 2 football fields, 1 cricket field, fully developed athletic stadium (running track, long jump, high jump areas), hockey court, 2 tennis courts, 3 volleyball courts, 1 basketball area, 9 indoor badminton courts, swimming pool, and squash courts.',
1, '03/04/26 12:09 pm', '03/04/26 12:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'canteen',
'canteen: an over night canteen available As canteen(tea nd snacks like samosa and poha) Yewale (tea center) Cafe beats(south india dishes and snacks) Amul parlour, dominos, noors(veg n nonveg), jucilicious cafe',
'Canteen at IIT Indore: Overnight canteen available. AS Canteen (tea, samosa, poha), Yewale (tea center), Cafe Beats (South Indian dishes and snacks), Amul Parlour, Dominos, Noors (veg and non-veg), and Jucilicious Cafe.',
1, '03/04/26 12:12 pm', '03/04/26 12:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'shops',
'Shops: La fresco (all daily needs nd packed snacks found)',
'Shops at IIT Indore: La Fresco — daily needs and packed snacks.',
1, '03/04/26 12:13 pm', '03/04/26 12:13 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'gym',
'Gym: Available no specific name as such',
'Gym is available on campus at IIT Indore.',
1, '03/04/26 12:14 pm', '03/04/26 12:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'medical',
'Medical: Health center available in campus around 600m from hostel if emergency an ambulace is sent to the respective hostel of the patient. treatment is free of cost',
'Medical at IIT Indore: Health center available on campus, approximately 600m from hostels. In emergency, ambulance is sent to the respective hostel. Treatment is free of cost.',
1, '03/04/26 12:15 pm', '03/04/26 12:15 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Indore', 'ambassador_message', 'fines',
'Fines: exist for demolition in hostels or labs(amount dependson the act done nd higher officials decisions) no ragging allowed fighting in campus',
'Fines at IIT Indore: Fines for demolition in hostels or labs (amount depends on act and higher officials'' decisions). No ragging allowed. Fighting in campus leads to fines or action.',
1, '03/04/26 12:17 pm', '03/04/26 12:17 pm', 'whatsapp');
