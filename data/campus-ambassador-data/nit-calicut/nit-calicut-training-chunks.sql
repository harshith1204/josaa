-- NIT Calicut Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'location',
'Location: National Institute of Technology Calicut, NIT Campus P.O., Kattangal, Mukkam Road, Kozhikode-673601, Kerala',
'NIT Calicut (National Institute of Technology Calicut) is located at NIT Campus P.O., Kattangal, Mukkam Road, Kozhikode-673601, Kerala.',
1, '04/04/26 12:18 am', '04/04/26 12:18 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'transport',
'Airport: Calicut International Airport, Karipur, Kerala, 20.2km. Railway: Kozhikode Railway Station, 19km. Bus stop: NITC Bus Stop, 800m',
'Transport near NIT Calicut: Calicut International Airport (Karipur) is 20.2 km away. Kozhikode Railway Station is 19 km away. NITC Bus Stop is 800 m from campus.',
3, '04/04/26 12:21 am', '04/04/26 12:23 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'restaurants',
'Restaurant: Over The Moon (OTM), Kattangal, Mukkam Road',
'Nearby restaurant at NIT Calicut: Over The Moon (OTM) on Kattangal, Mukkam Road.',
1, '04/04/26 12:24 am', '04/04/26 12:24 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'delivery',
'Delivery: Swiggy Instamart, Dominos, Zomato',
'Food and grocery delivery apps available at NIT Calicut: Swiggy Instamart, Dominos, and Zomato.',
1, '04/04/26 12:26 am', '04/04/26 12:26 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'tourist',
'Tourist: Kozhikode Beach, SM Street, Kappad Beach, Tali Temple, Kozhippara Falls, Mananchira Square',
'Tourist places near NIT Calicut: Kozhikode Beach, SM Street, Kappad Beach, Tali Temple, Kozhippara Falls, and Mananchira Square.',
1, '04/04/26 12:29 am', '04/04/26 12:29 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'malls',
'Malls: Gokulam Mall, HiLite Mall, Focus Mall',
'Shopping malls near NIT Calicut: Gokulam Mall, HiLite Mall, and Focus Mall.',
1, '04/04/26 12:30 am', '04/04/26 12:30 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'climate',
'Climate: Tropical monsoon, high humidity, hot summers, heavy rainfall',
'Climate at NIT Calicut: Tropical monsoon climate with high humidity, hot summers, and heavy rainfall.',
1, '04/04/26 12:32 am', '04/04/26 12:32 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'language',
'Language: Local Malayalam/Hindi/English. College: Malayalam/Telugu/Hindi/Tamil/English',
'Languages spoken around NIT Calicut: Locally Malayalam, Hindi, and English. In college: Malayalam, Telugu, Hindi, Tamil, and English.',
1, '04/04/26 12:34 am', '04/04/26 12:34 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'clubs',
'Clubs: DnD (Dance & Dramatics), CM (Club Mathematica), Enquiry Club, AV Club (movies), ISTE Club',
'Clubs at NIT Calicut: DnD (Dance & Dramatics), CM (Club Mathematica), Enquiry Club, AV Club (movies), and ISTE Club.',
1, '04/04/26 12:38 am', '04/04/26 12:38 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'attendance',
'Attendance: Maximum 80%, Minimum 70%',
'Attendance at NIT Calicut: Unique range of maximum 80% and minimum 70%. This differs from most NITs which have a flat 75% requirement.',
1, '04/04/26 12:43 am', '04/04/26 12:43 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'wifi',
'WiFi, LAN available',
'WiFi and LAN are both available at NIT Calicut.',
1, '04/04/26 12:46 am', '04/04/26 12:46 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'fests',
'Fests: Cultural - Ragam, Technical - Tathva',
'Fests at NIT Calicut: Ragam (cultural fest) and Tathva (technical fest).',
1, '04/04/26 12:47 am', '04/04/26 12:47 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'hostels',
'Boys hostels juniors: A, B, C. 2nd/3rd years: Mega Hostels. 4th years: Old Mega Hostels, E, D. Girls: MLH, F, G. PG: PG1, PG2. Sharing: Juniors 3 per room, Seniors (2nd/3rd) 2 per room, 4th years single, PG single',
'Hostels at NIT Calicut: Boys 1st year hostels A, B, C with 3-sharing rooms. Boys 2nd/3rd year in Mega Hostels with 2-sharing rooms. Boys 4th year in Old Mega Hostels, E, D with single rooms. Girls hostels: MLH, F, G. PG hostels: PG1, PG2 with single rooms.',
2, '04/04/26 12:50 am', '04/04/26 12:51 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'mess',
'Mess timings: Morning 7-9, Afternoon 12-2, Evening 4-5, Night 7-9',
'Mess timings at NIT Calicut: Breakfast 7 AM - 9 AM, Lunch 12 PM - 2 PM, Evening snacks 4 PM - 5 PM, Dinner 7 PM - 9 PM.',
1, '04/04/26 12:53 am', '04/04/26 12:53 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'laundry',
'Laundry: Washing machines',
'Laundry at NIT Calicut: Washing machines are available in hostels.',
1, '04/04/26 12:53 am', '04/04/26 12:53 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'elections',
'Elections: Gen Sec, UGAS, Technical Affairs Council, Student Affairs Council',
'Elections at NIT Calicut: Positions include General Secretary (Gen Sec), UGAS, Technical Affairs Council, and Student Affairs Council.',
1, '04/04/26 12:55 am', '04/04/26 12:55 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'sports',
'Sports: Cricket, Volleyball, Kho-Kho, Kabaddi, Football, Badminton',
'Sports at NIT Calicut: Cricket, Volleyball, Kho-Kho, Kabaddi, Football, and Badminton.',
1, '04/04/26 12:56 am', '04/04/26 12:56 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'canteen',
'Canteens: Milma, Swadhistam, Cochin, Samtrupthi, Amul',
'Canteens at NIT Calicut: 5 canteens on campus - Milma, Swadhistam, Cochin, Samtrupthi, and Amul.',
1, '04/04/26 12:57 am', '04/04/26 12:57 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'shops',
'Shops: COPS',
'Shops on NIT Calicut campus: COPS (Co-operative Store).',
1, '04/04/26 12:58 am', '04/04/26 12:58 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'fines',
'Fines: Late entry after 12 more than 3 times Rs 1000, Losing ID Rs 1000',
'Fines at NIT Calicut: Late entry after 12 AM midnight more than 3 times results in Rs 1,000 fine. Losing your ID card costs Rs 1,000.',
1, '04/04/26 1:02 am', '04/04/26 1:02 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'gym',
'Gym: NITC Gym, Mega Gym',
'Gym at NIT Calicut: Two gyms available - NITC Gym and Mega Gym.',
1, '04/04/26 1:02 am', '04/04/26 1:02 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'ambassador_message', 'health_centre',
'Medical: Health Center',
'Health centre at NIT Calicut: Health Center is available on campus.',
1, '04/04/26 1:03 am', '04/04/26 1:03 am', 'whatsapp');

-- Fee Structure (from official 18-page fee structure PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'fee_pdf', 'fee_structure_category1',
'Category 1 Open/EWS/OBC (Income >5L) + DASA(CIWG)/MEA: Tuition Rs 62,500/sem. Other Fees Monsoon Rs 19,100 (Reg 2000, Exam 2000, Activities 600, Assoc&Cultural 1200, Welfare 1200, Career Dev 1200, Library 4000, Computing 600, Internet 1200, Sports 1200, Health 1200, Med Insurance 1500, Campus Amenities 1200). Other Fees Winter Rs 6,400. One-time Rs 61,000 (Caution 20000, Admission 5000, Campus Dev 25000, Alumni 5000, Convocation 5000, ID 1000). 1st Sem Total Rs 1,42,600. 2nd Sem Rs 68,900. Subsequent Monsoon Rs 81,600. Subsequent Winter Rs 68,900.',
'Fee structure at NIT Calicut Category 1 (Open/EWS/OBC income above 5 lakh + DASA CIWG/MEA): Tuition fee is Rs 62,500 per semester. Other fees in Monsoon semester total Rs 19,100 and in Winter semester Rs 6,400. One-time fees total Rs 61,000. First semester total is Rs 1,42,600, second semester Rs 68,900. Subsequent Monsoon semesters Rs 81,600 and Winter semesters Rs 68,900. Hostel seat rent Rs 12,000 per semester charged extra.',
1, '04/04/26 12:18 am', '04/04/26 1:03 am', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'fee_pdf', 'fee_structure_category2',
'Category 2 Open/EWS/OBC (Income 1-5L): Tuition Rs 20,833/sem (1/3rd). Same other fees. 1st Sem Total Rs 1,00,933. 2nd Sem Rs 27,233.',
'Fee structure at NIT Calicut Category 2 (Open/EWS/OBC income Rs 1-5 lakh): Tuition fee is Rs 20,833 per semester (one-third of full tuition). Same other fees apply. First semester total is Rs 1,00,933, second semester Rs 27,233. Hostel seat rent Rs 12,000 per semester extra.',
1, '04/04/26 12:18 am', '04/04/26 1:03 am', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'fee_pdf', 'fee_structure_category3',
'Category 3 Open/EWS/OBC (Income <1L) + SC/ST/PH: Tuition Rs 0. Same other fees. 1st Sem Total Rs 80,100. 2nd Sem Rs 6,400.',
'Fee structure at NIT Calicut Category 3 (Open/EWS/OBC income below 1 lakh + SC/ST/PH): Tuition fee is fully waived (Rs 0). Same other fees apply. First semester total is Rs 80,100, second semester Rs 6,400. Hostel seat rent Rs 12,000 per semester extra.',
1, '04/04/26 12:18 am', '04/04/26 1:03 am', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Calicut', 'fee_pdf', 'fee_structure_dasa',
'DASA Non-CIWG Non-SAARC: Tuition USD 4,000/sem. DASA Non-CIWG SAARC: Tuition USD 2,000/sem.',
'Fee structure at NIT Calicut for DASA international students: Non-CIWG Non-SAARC students pay USD 4,000 per semester tuition. Non-CIWG SAARC students pay USD 2,000 per semester tuition.',
1, '04/04/26 12:18 am', '04/04/26 1:03 am', 'fee_pdf');
