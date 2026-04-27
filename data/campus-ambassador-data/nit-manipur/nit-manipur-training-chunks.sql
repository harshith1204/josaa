-- NIT Manipur Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'location',
'Location: National Institute of Technology Manipur, Langol, Imphal-795004, Manipur',
'NIT Manipur (National Institute of Technology Manipur) is located at Langol, Imphal-795004, Manipur. Phone: (0385) 2449312/2059391. Email: nitmanipur@yahoo.in. Website: www.nitmanipur.ac.in.',
1, '03/04/26 11:18 pm', '03/04/26 11:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'transport',
'Transport: Train Rajahmundry to Dimapur (Vivek Dibrugarh Express), Dimapur to Imphal by winger/bus. Imphal Airport 9.1km. Dimapur Railway Station 200-205km. Bus to railway station costs Rs 700',
'Transport near NIT Manipur: Imphal Airport is 9.1 km from campus. Dimapur Railway Station is 200-205 km away. Train route via Vivek Dibrugarh Express from Rajahmundry to Dimapur, then winger or bus to Imphal. Bus from Dimapur to Imphal costs Rs 700.',
3, '03/04/26 11:20 pm', '03/04/26 11:25 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'restaurants',
'Restaurants: Handi Story (Andhra style) 5.6km from campus. Many small local restaurants nearby',
'Nearby restaurants at NIT Manipur: Handi Story (Andhra style, 5.6 km from campus). Many small local restaurants are also available near campus.',
2, '03/04/26 11:27 pm', '03/04/26 11:28 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'tourist',
'Tourist places: Loktak Lake (48km), Keibul Lamjao National Park (55km), Ukhrul hill station (83km)',
'Tourist places near NIT Manipur: Loktak Lake (48 km), Keibul Lamjao National Park (55 km), and Ukhrul hill station (83 km).',
1, '03/04/26 11:33 pm', '03/04/26 11:33 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'shopping',
'Shopping: Zudio 5.7km, Trends 5.5km, Mamcy Mall 7.0km',
'Shopping near NIT Manipur: Zudio (5.7 km), Trends (5.5 km), and Mamcy Mall (7.0 km from campus).',
2, '03/04/26 11:36 pm', '03/04/26 11:41 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'climate',
'Climate: Moderate, subtropical monsoonal',
'Climate at NIT Manipur: Moderate, subtropical monsoonal climate.',
1, '03/04/26 11:40 pm', '03/04/26 11:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'language',
'Language: Official is Meitei (Manipuri/Meiteilon). Most people speak Hindi too',
'Languages spoken around NIT Manipur: Official language is Meitei (also called Manipuri or Meiteilon). Most people also speak Hindi.',
1, '03/04/26 11:42 pm', '03/04/26 11:43 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'hostels_boys',
'Boys Hostels: H01, H02, H03 inside campus. NIT Manipur Private Boys Hostel 05 (1.5km, for 1st years). PhD Hostel H04 (1km, for MTech/PhD). H03 for 2nd year, H02+H01 for 3rd+4th year. Room types: Big room (5 per room), Small room (3 per room)',
'Boys hostels at NIT Manipur: 5 hostels total. H01 and H02 are inside campus for 3rd and 4th year students. H03 is inside campus for 2nd year students. NIT Manipur Private Boys Hostel 05 is 1.5 km from campus for 1st year students. PhD Hostel H04 is 1 km from campus for MTech and PhD students. Room types include big rooms (5 per room) and small rooms (3 per room).',
4, '03/04/26 11:50 pm', '04/04/26 12:08 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'hostels_girls',
'Girls Hostels: NIT Manipur Takyel Girls Hostel (1st+2nd year, 4-6km from airport, 3km from bus stand). NIT Manipur Girls Hostel near campus (walking distance, 3rd+4th year)',
'Girls hostels at NIT Manipur: 2 hostels. NIT Manipur Takyel Girls Hostel is for 1st and 2nd year girls, located 4-6 km from airport and 3 km from bus stand. NIT Manipur Girls Hostel near campus is at walking distance and is for 3rd and 4th year girls.',
1, '03/04/26 11:58 pm', '03/04/26 11:58 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'mess_assignment',
'Mess: H02+H03 share same mess. H01 separate mess. Hostel 05 (1st years) separate mess. PhD hostel separate mess. All hostels same menu. Timings: Breakfast 7AM-9AM, Lunch 12PM-2PM, Snacks 5PM-6PM, Dinner 7PM-9PM',
'Mess at NIT Manipur: H02 and H03 share the same mess. H01 has a separate mess. Hostel 05 (1st years) has a separate mess. PhD hostel has a separate mess. All hostels follow the same menu. Meal timings: Breakfast 7 AM - 9 AM, Lunch 12 PM - 2 PM, Snacks 5 PM - 6 PM, Dinner 7 PM - 9 PM.',
3, '04/04/26 12:09 am', '04/04/26 12:13 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'laundry',
'Laundry: Washing machine only in H01, Rs 50/kg. Outside washing businesses available. Mostly wash own clothes',
'Laundry at NIT Manipur: Washing machine is available only in H01 hostel at Rs 50 per kg. Outside washing businesses are available. Most students wash their own clothes.',
1, '04/04/26 12:17 am', '04/04/26 12:17 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'elections',
'Elections: Not there',
'Elections at NIT Manipur: No student elections are conducted.',
1, '04/04/26 12:19 am', '04/04/26 12:19 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'sports',
'Sports: Cricket, Volleyball, Chess, Kho-Kho, Badminton. Inter-NIT sports, one sports meet per year',
'Sports at NIT Manipur: Cricket, Volleyball, Chess, Kho-Kho, and Badminton. Inter-NIT sports competitions are held along with one sports meet per year.',
2, '04/04/26 12:19 am', '04/04/26 12:21 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'events',
'No cultural events. Small events: Flash mob, Regen Hackathon. Big events: Freshers and Farewell',
'Events at NIT Manipur: No large cultural events. Small events include Flash mob and Regen Hackathon. The major events are Freshers and Farewell.',
2, '04/04/26 12:22 am', '04/04/26 12:23 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'canteen',
'Canteen: One canteen in hostel. 3 small restaurants near campus (belong to NIT Manipur), timings 9AM-7PM',
'Canteens at NIT Manipur: One canteen inside the hostel. 3 small restaurants near campus that belong to NIT Manipur, open from 9 AM to 7 PM.',
1, '04/04/26 12:25 am', '04/04/26 12:25 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'shops',
'Shops: One stationery shop near campus beside the 3 restaurants',
'Shops at NIT Manipur: One stationery shop near campus, located beside the 3 restaurants.',
1, '04/04/26 12:28 am', '04/04/26 12:28 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'fines',
'Fines: Rs 2000 late fine for coming late after holidays. Rs 5000-10000 for indisciplinary actions',
'Fines at NIT Manipur: Rs 2,000 late fine for returning late after holidays. Rs 5,000 to Rs 10,000 for indisciplinary actions.',
2, '04/04/26 12:29 am', '04/04/26 12:31 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'gym',
'Gym: No gym in college. Private gym 5km from campus',
'Gym at NIT Manipur: No gym facility in the college. Nearest private gym is 5 km from campus.',
1, '04/04/26 12:35 am', '04/04/26 12:36 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'medical',
'Medical: No free medicines. Hospitals: Shija Hospitals (SHRI) 10.8km, RIMS 5.5km',
'Medical facilities at NIT Manipur: No free medicines available. Nearby hospitals: Shija Hospitals (SHRI) at 10.8 km and RIMS at 5.5 km from campus.',
2, '04/04/26 12:37 am', '04/04/26 12:39 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'clubs',
'Clubs: Inertia (dance), Pixel (photography), Qubit (coding)',
'Clubs at NIT Manipur: Inertia (dance club), Pixel (photography club), and Qubit (coding club).',
1, '04/04/26 12:50 am', '04/04/26 12:50 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'attendance',
'Attendance 75% for end exams',
'Attendance at NIT Manipur: 75% attendance is required to appear in end semester exams.',
1, '04/04/26 12:52 am', '04/04/26 12:52 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'ambassador_message', 'wifi',
'WiFi: Hostel and college WiFi available. Airtel and Jio 5G both good',
'WiFi at NIT Manipur: Both hostel and college WiFi are available. Airtel and Jio 5G networks have good coverage.',
1, '04/04/26 12:53 am', '04/04/26 12:53 am', 'whatsapp');

-- Fee Structure (from official fee structure PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'fee_pdf', 'fee_structure',
'B.Tech 2016 batch onwards per semester: Admission Fee Rs 1,000 (1st sem only), Tuition Fee Rs 62,500, Alumni Fee Rs 1,000, Institute Dev Fund Rs 1,000, Medical Insurance & GPD Rs 600, Library Rs 500, Exam Rs 500, Student Aid Rs 500, Grade Card Rs 500, Steno ID Rs 100. Hostel: Rent Rs 2,500-3,500, Establishment/Amenities/Maint Rs 2,500, Electricity Rs 1,000, Mess Caution Rs 7,500 (1st sem only, refundable). SC/ST/PH: Complete tuition fee exemption. Income <1L: Full tuition remission. Income 1-5L: 2/3rd tuition remission.',
'Fee structure at NIT Manipur for B.Tech (2016 batch onwards, per semester): Academic fees include Tuition Fee Rs 62,500, Alumni Fee Rs 1,000, Institute Development Fund Rs 1,000, Medical Insurance and GPD Rs 600, Library Fee Rs 500, Exam Fee Rs 500, Student Aid Rs 500, Grade Card Rs 500, Steno ID Fee Rs 100. One-time fees (1st semester only): Admission Fee Rs 1,000, Mess Caution Deposit Rs 7,500 (refundable). Hostel fees per semester: Hostel Rent Rs 2,500-3,500, Establishment/Amenities/Maintenance Rs 2,500, Electricity Rs 1,000. Fee waivers: SC/ST/PH get complete tuition fee exemption. Family income below Rs 1 lakh gets full tuition remission. Family income Rs 1-5 lakh gets 2/3rd tuition remission. SC/ST students under scholarship have tuition fee borne by Ministry of Tribal/Social Development.',
1, '03/04/26 11:18 pm', '04/04/26 12:53 am', 'fee_pdf');

-- Mess Menu (from mess menu image OCR)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'mess_image', 'mess_menu',
'NIT Boys Hostel-3, Langol. Breakfast 7AM-9AM, Lunch 12PM-2PM, Snacks 5PM-6PM, Dinner 7PM-9PM. Sunday to Saturday full menu.',
'NIT Manipur Boys Hostel-3 (Langol) mess menu serves 4 meals daily: Breakfast (7 AM - 9 AM), Lunch (12 PM - 2 PM), Snacks (5 PM - 6 PM), and Dinner (7 PM - 9 PM). Menu features a mix of North Indian staples with local Manipuri dishes including Ironba, Ametpa, and Uti. Non-veg days: Chicken on Sunday and Wednesday, Fish on Monday, Egg on Thursday and Saturday. Snacks are Milk Tea every day.',
1, '03/04/26 11:18 pm', '04/04/26 12:53 am', 'mess_image');

-- Timetable (from timetable PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Manipur', 'timetable_pdf', 'timetable',
'B.Tech 1st Sem July-Dec 2025: Group I (Civil+Mech) LH-18, Group II (Elec+ECE) LH-19 New Block, Group III (CSE) LH-16 New Block. Group I/II subjects: CS1201, EE1201, MA1101, EC1201, CE1201, ME1249, IC1192. Group III subjects: CH1101, ME1101, MA1101, PH1101, HS1101, ME1149. 4th Sem CSE: CS2401 FLAT, CS2402 ALGO, CS2403 COA, CS2404 OOPs, MA2401 Probability. Faculty: Dr. Yambem Jina Chanu, Dr. Oinam Bidyapati Chanu, Dr. Yumnam Surajkanta, Dr. Thiyam Susma Devi. Classes 9AM-5PM Mon-Fri.',
'Timetable at NIT Manipur: B.Tech 1st Semester (July-Dec 2025) is divided into 3 groups. Group I (Civil + Mechanical) is in LH-18 with subjects CS1201 Intro to Computing, EE1201 Basic Electrical, MA1101 Engineering Math-I, EC1201 Basic Electronics, CE1201 Environmental Sustainability, ME1249 Engineering Workshop, IC1192 NCC/NSS. Group II (Electrical + ECE) is in LH-19 New Block with the same subjects but different faculty. Group III (CSE) is in LH-16 New Block with subjects CH1101 Engineering Chemistry, ME1101 Engineering Mechanics, MA1101 Engineering Math-I, PH1101 Engineering Physics, HS1101 Communication Skills, ME1149 Engineering Drawing. 4th Semester CSE subjects: CS2401 FLAT, CS2402 Algorithms, CS2403 COA, CS2404 OOPs, MA2401 Probability. Faculty include Dr. Yambem Jina Chanu, Dr. Oinam Bidyapati Chanu, Dr. Yumnam Surajkanta, and Dr. Thiyam Susma Devi. Classes run 9 AM to 5 PM, Monday to Friday.',
1, '03/04/26 11:18 pm', '04/04/26 12:53 am', 'timetable_pdf');
