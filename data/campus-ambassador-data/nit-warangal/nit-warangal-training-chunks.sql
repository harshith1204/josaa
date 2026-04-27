-- NIT Warangal Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone, parents, payment) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'clubs',
'Clubs : 1. NSS 2. Dance 3. Singing 4. Software engineering club 5. hackathon 6. dramatics',
'Clubs at NIT Warangal: NSS, Dance, Singing, Software Engineering Club, Hackathon, and Dramatics.',
1, '31/03/26 1:35 pm', '31/03/26 1:35 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'attendance',
'Attendance: 80%. NIT Warangal (NITW) strictly requires a minimum of 80% attendance in each course to appear for end-semester examinations. Students are expected to maintain 100% attendance, with a maximum 20% condonation allowed by the HOD for valid reasons (medical/calamity). Attendance is calculated from the class commencement date, not registration date.',
'NIT Warangal strictly requires 80% minimum attendance in each course to appear for end-semester exams. Students are expected to maintain 100% attendance. Maximum 20% condonation is allowed by the HOD for valid reasons like medical or calamity. Attendance is calculated from the class commencement date, not the registration date.',
2, '31/03/26 1:36 pm', '31/03/26 1:37 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'fests',
'National Institute of Technology, Warangal (NITW) hosts several major annual fests that are well-regarded in India. The major fests include: 1. SpringSpree 2. Technozion 3. CURA 4. Ayodhan',
'NIT Warangal hosts four major annual fests: SpringSpree (cultural fest), Technozion (technical fest), CURA (social responsibility fest), and Ayodhan (national sports fest). These are well-regarded across India.',
1, '31/03/26 1:39 pm', '31/03/26 1:39 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'hostels',
'Boys Hostels: 1. 1.8K Hostel (Ultra Mega Hostel): Frequently used by first-year UG students. [sharing rooms 2 persons per room] 1st year students. 2. 1K Block (Mega Hostel): Used for B.Tech II/III/IV year students. [sharing rooms 2 persons per room] 3rd and 4th year students 3. Azad Hall (S) [sharing rooms 2 persons per room] 2nd year 4. Bose Hall (S) [sharing rooms 2 persons per room] 2nd year 5. Ambedkar Hall (T) [sharing rooms 2 persons per room] 2nd year 6. Bhabha Hall (T) [sharing rooms 2 persons per room] 2nd year 7. 14th Block: Typically for PhD scholars. [sharing rooms 2 persons per room] 8. ISH (International Students Hostel): For DASA/ICCR students. [1 persons per room] Girls Hostels: 1. Priyadarshini Hall [sharing rooms 2 persons per room] 2. Sarojini Hall [sharing rooms 2 persons per room] 3. New LH-A, B, C (New Ladies Hostels) [sharing rooms 2 persons per room] Lift available in every Hostel.',
'Boys hostels at NIT Warangal: 1.8K Hostel (Ultra Mega) is for 1st year UG with 2-sharing rooms. 1K Block (Mega) is for 3rd and 4th year with 2-sharing rooms. Azad Hall, Bose Hall, Ambedkar Hall, and Bhabha Hall are for 2nd year students, all with 2-sharing rooms. 14th Block is for PhD scholars with 2-sharing. ISH (International Students Hostel) has single rooms for DASA/ICCR students. Girls hostels: Priyadarshini Hall, Sarojini Hall, and New LH-A, B, C, all with 2-sharing rooms. Every hostel has a lift.',
1, '31/03/26 1:44 pm', '31/03/26 1:44 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'mess',
'Main Boys Messes/Food Courts: 1. IFC-A (Institute Food Court A) 1st year 2. IFC-B (Institute Food Court B) 3rd and 4th year 3. IFC-C (Institute Food Court C) 2nd year 4. IFC-D (Institute Food Court D) PhD scholars Godavari Mess-I Godavari Mess-II Krishna Mess [m tech] Girls Messes: Priyadarshini Mess (located in the Ladies Hostel premises) Sarojini HoR Mess (associated with Sarojini Hall of Residence) Tentative Mess Timings (Daily) Breakfast: 07.00 A.M. to 09.00 A.M. Lunch: 12.00 P.M. to 02.30 P.M. Dinner: 07.00 P.M. to 09.00 P.M.',
'Boys mess at NIT Warangal: IFC-A serves 1st year, IFC-B serves 3rd and 4th year, IFC-C serves 2nd year, IFC-D serves PhD scholars. Additional messes include Godavari Mess-I, Godavari Mess-II, and Krishna Mess (for M.Tech). Girls mess: Priyadarshini Mess (in Ladies Hostel premises) and Sarojini HoR Mess (at Sarojini Hall). Mess timings: Breakfast 7-9 AM, Lunch 12-2:30 PM, Dinner 7-9 PM.',
1, '31/03/26 1:48 pm', '31/03/26 1:48 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'laundry',
'On-Campus Services Student Facility Complex: A dedicated laundry shop is located here, situated beside the Transport Section. Nitw Washerman Shop: This shop is located directly within the campus and provides standard laundry services. It is generally open daily from 9:00 AM to 9:00 PM. Hostel Laundry Upgrade: As of March 2026, NIT Warangal has invited tenders for the design and installation of Smart Laundry rooms within various hostels, including the Mega and Ultra Mega Halls',
'Laundry at NIT Warangal: A dedicated laundry shop is at the Student Facility Complex, beside the Transport Section. NITW Washerman Shop on campus is open daily 9 AM to 9 PM. As of March 2026, Smart Laundry rooms are being planned for the Mega and Ultra Mega hostels.',
1, '31/03/26 1:55 pm', '31/03/26 1:55 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'elections',
'Student Council Executive Positions: 1. Secretaries (B.Tech Final Year): Technical, Cultural, Athletics, Film, and Music. 2. Joint Secretaries (B.Tech III Year): Technical, Cultural, Athletics, Film, and Music. 3. PG Representatives (Final Year): Engineering (M.Tech), and MSc/MCA/MBA representatives for societies. 4. UG Representatives (I, II, III, IV Year): Two representatives per year/per society. 5. Student Representative (Nominated): Appointed by Dean (Student Welfare) for specific groups. 6. Class Representatives: One from each class/section.',
'Student elections at NIT Warangal: Secretaries are from B.Tech Final Year covering Technical, Cultural, Athletics, Film, and Music. Joint Secretaries are from B.Tech III Year. PG Representatives from Final Year M.Tech, MSc, MCA, MBA. UG Representatives have two per year per society. There is also a Nominated Student Representative appointed by Dean of Student Welfare, and Class Representatives from each class/section.',
1, '31/03/26 1:57 pm', '31/03/26 1:57 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'sports',
'Major Sports Events: Ayodhan (National Sports Fest) Inter-NIT Sports Meet Inter-Branch / Intramural Tournaments FPL (Football Premier League) SPL (Slam Premier League - Cricket) Freshmen Open Competitions Annual Sports Day Key Facilities: 400m Track Stadium Synthetic Basketball Courts (Floodlit) Tennis Courts (Synthetic & Clay) Wooden Badminton Courts Indoor Sports Arena Gymnasiums (Fitness Centres) Hostel Recreation Rooms',
'Sports at NIT Warangal: Major events include Ayodhan (National Sports Fest), Inter-NIT Sports Meet, FPL (Football Premier League), SPL (Cricket), Freshmen Open, and Annual Sports Day. Facilities include a 400m track stadium, synthetic floodlit basketball courts, tennis courts (synthetic and clay), wooden badminton courts, indoor sports arena, gyms, and hostel recreation rooms.',
1, '31/03/26 2:00 pm', '31/03/26 2:00 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'canteen_food',
'1. Food street. 2. Country oven 3. Taaza Tiffins. Nitw store. Hostel provided gyms. 1. 1.8k 2. 1k 3. Sac. Restaurants: 1. Pista house. 2. Chef table. 3. Paradise. Swiggy and Zomato operate in the Warangal/Hanamkonda area, including service to NIT Warangal (NITW).',
'Food outlets on NIT Warangal campus: Food Street, Country Oven, Taaza Tiffins, and NITW Store. Hostel gyms available at 1.8K, 1K, and SAC. Nearby restaurants include Pista House, Chef Table, and Paradise. Swiggy and Zomato deliver to NIT Warangal.',
5, '31/03/26 2:04 pm', '31/03/26 2:13 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'medical',
'Medical. Dispensary [health centre] General Timings Working Days (Monday to Friday): Morning: 9:30 AM to 1:00 PM Evening: 3:00 PM to 6:00 PM Weekends (Saturday & Sunday): Morning: 9:30 AM to 11:30 AM',
'Medical facility at NIT Warangal: Dispensary (Health Centre) on campus. Weekday timings: 9:30 AM to 1:00 PM and 3:00 PM to 6:00 PM (Monday-Friday). Weekend timings: 9:30 AM to 11:30 AM (Saturday-Sunday).',
1, '31/03/26 2:06 pm', '31/03/26 2:06 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'transport',
'Transport: Kazipet Railway station: [3kms] Warngal Railway station: [9kms] Hanmakonda Busstand: [5kms]',
'Transport near NIT Warangal: Kazipet Railway Station is 3 km away, Warangal Railway Station is 9 km away, and Hanamkonda Bus Stand is 5 km away.',
1, '31/03/26 2:09 pm', '31/03/26 2:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'nearby_places',
'The National Institute of Technology (NIT), Warangal is surrounded by several significant historical, religious, and natural landmarks. The most notable nearby sites include the Thousand Pillar Temple (~7 km away) and the Bhadrakali Temple (~8 km away), both of which are central to the regions Kakatiya heritage. Shopping malls. 1. Trends 2. West Side. 3. Zudio.',
'NIT Warangal is surrounded by historical Kakatiya heritage sites: Thousand Pillar Temple (~7 km) and Bhadrakali Temple (~8 km). Shopping options include Trends, West Side, and Zudio.',
3, '31/03/26 2:14 pm', '31/03/26 2:15 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'ambassador_message', 'language',
'Language: National Institute of Technology, Warangal (NITW) does not maintain a single public directory listing all languages spoken by its faculty. However, the Department of Humanities and Social Sciences (HSS) features several professors whose research and teaching focus specifically on English Language Education, Bilingualism, and Translation.',
'Telugu is the local language in Warangal. Hindi and English are widely understood on campus. The HSS department has professors specializing in English Language Education, Bilingualism, and Translation.',
1, '31/03/26 2:17 pm', '31/03/26 2:17 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'document_ocr', 'fee_structure',
'Hostel Fee Receipt. Maintenance Fee 7500. Seat Rent 2000. Water & Electricity Charges 5500. Mess Fee 12000. Total 27000.',
'NIT Warangal hostel fee per semester (from actual student receipt dated 14-Dec-2025): Maintenance Fee Rs 7500, Seat Rent Rs 2000, Water and Electricity Rs 5500, Mess Fee Rs 12000. Total hostel fee: Rs 27,000 per semester. This is hostel fee only — tuition and academic fees are separate.',
1, '14/12/25', '14/12/25', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Warangal', 'document_ocr', 'mess_schedule',
'Weekly mess schedule covering breakfast lunch and dinner. South Indian and North Indian cuisine. Breakfast includes Idly Vada Dosa Pesarattu Poori Uthappam Masala Dosa Aloo Paratha Maggie. Lunch includes Roti Rice curries Dal Sambhar Rasam Briyani. Dinner includes Roti Rice Paneer Pulao curries. Tuesday Veg Briyani and Fruit Custard. Thursday Rice Kheer and Jalebi. Sunday Gulab Jamun. Friday Watermelon.',
'NIT Warangal mess schedule: Strong mix of South Indian and North Indian cuisine. Breakfast includes items like Idly, Vada, Dosa, Pesarattu, Masala Dosa, Poori, Uthappam, Aloo Paratha, and Maggie with tea/coffee/milk. Lunch includes Roti, Rice, various curries, Dal, Sambhar, Rasam, and Butter Milk. Dinner includes Roti, Rice, Paneer dishes, Pulao, and various curries with Curd. Special items: Tuesday has Veg Briyani for lunch and Fruit Custard for dinner. Thursday has Rice Kheer for lunch and Jalebi for dinner. Sunday has Gulab Jamun for dinner. Friday has Watermelon for dinner.',
1, '31/03/26', '31/03/26', 'image_ocr');
