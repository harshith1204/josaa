-- NIT Srinagar Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'clubs',
'Clubs: FOSS Club, IOT Club, Band Club (musical), Sargam Club (dance), Movie Club, Photography Club',
'Clubs at NIT Srinagar: FOSS Club (Free and Open Source Software), IOT Club, Band Club (musical), Sargam Club (dance), Movie Club, and Photography Club.',
1, '04/04/26 1:51 pm', '04/04/26 1:51 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'attendance',
'Attendance 75% mandatory',
'Attendance at NIT Srinagar: 75% attendance is mandatory.',
1, '04/04/26 1:51 pm', '04/04/26 1:51 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'wifi',
'WiFi and LAN available in hostel. Only postpaid SIM works (no prepaid). 5G and 4G available',
'WiFi at NIT Srinagar: WiFi and LAN available in hostel. Only postpaid SIM works (prepaid SIMs do not work). 5G and 4G mobile connectivity available.',
1, '04/04/26 1:52 pm', '04/04/26 1:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'fests',
'Fests: April/May - Rang-e-Chinnar (cultural), September/October - Techvaganza (tech)',
'Fests at NIT Srinagar: Rang-e-Chinnar (cultural fest) in April/May, and Techvaganza (tech fest) in September/October.',
1, '04/04/26 1:54 pm', '04/04/26 1:54 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'location',
'Location: NIT Srinagar, Hazratbal, Srinagar, J&K 190006',
'NIT Srinagar (National Institute of Technology Srinagar) is located at Hazratbal, Srinagar, Jammu & Kashmir, 190006.',
1, '04/04/26 1:55 pm', '04/04/26 1:55 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'transport',
'Transport: Srinagar Railway Station 17km, Srinagar Airport 19km, Srinagar Bus Stand 10km',
'Transport near NIT Srinagar: Srinagar Railway Station is 17 km away. Srinagar Airport is 19 km away. Srinagar Bus Stand is 10 km away.',
3, '04/04/26 1:55 pm', '04/04/26 1:59 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'restaurants',
'Restaurants: Shawarma Hut (500m), Zam Zam Mediterranean (8km), Bay Leaf (800m), other Kashmir restaurants',
'Nearby restaurants at NIT Srinagar: Shawarma Hut (500 m from campus), Zam Zam Mediterranean (8 km), Bay Leaf (800 m), and other Kashmir restaurants.',
1, '04/04/26 1:57 pm', '04/04/26 1:57 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'tourist',
'Tourist places: Pahalgam (94km), Gulmarg (60km), Sonmarg, Chandwari, Amarnath Temple',
'Tourist places near NIT Srinagar: Pahalgam (94 km), Gulmarg (60 km), Sonmarg, Chandwari, and Amarnath Temple.',
1, '04/04/26 2:00 pm', '04/04/26 2:00 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'malls',
'Malls: City Mall (8km), MS Shopping Mall (8.5km)',
'Shopping malls near NIT Srinagar: City Mall (8 km) and MS Shopping Mall (8.5 km).',
1, '04/04/26 2:02 pm', '04/04/26 2:02 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'climate',
'Climate: Winter Dec-Feb, Spring Mar-Apr, Summer May-Aug, Rainy Jun-Aug, Autumn Sep-Nov',
'Climate at NIT Srinagar: Winter (December-February), Spring (March-April), Summer (May-August), Rainy (June-August), Autumn (September-November). Srinagar experiences all seasons with cold winters and pleasant summers.',
1, '04/04/26 2:04 pm', '04/04/26 2:04 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'hostels',
'Hostels: Indus, Chenab, Mansar, Mansbal, Jhelum Extension, Jhelum, Tawi, PG Hostel. Jhelum for 4th year (single rooms based on CGPA), remaining 4th year in Tawi. Other years allotted randomly.',
'Hostels at NIT Srinagar: 8 hostels total - Indus, Chenab, Mansar, Mansbal, Jhelum Extension, Jhelum, Tawi, and PG Hostel. Jhelum Hostel is for 4th year students with single rooms allotted based on CGPA. Remaining 4th year students are placed in Tawi. Other year students are allotted hostels randomly.',
3, '04/04/26 2:06 pm', '04/04/26 2:08 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'mess_assignment',
'Mess separate for each hostel',
'At NIT Srinagar, each hostel has its own separate mess.',
1, '04/04/26 2:09 pm', '04/04/26 2:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'laundry',
'Laundry separate for each hostel, bill included in fee structure',
'Laundry at NIT Srinagar: Separate laundry for each hostel. Laundry bill is included in the fee structure.',
1, '04/04/26 2:10 pm', '04/04/26 2:10 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'elections',
'No elections conducted',
'Elections at NIT Srinagar: No elections are conducted.',
1, '04/04/26 2:11 pm', '04/04/26 2:11 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'sports',
'Sports: Badminton, Football, Cricket, Volleyball, Tennis, Table Tennis, Chess',
'Sports at NIT Srinagar: Badminton, Football, Cricket, Volleyball, Tennis, Table Tennis, and Chess.',
1, '04/04/26 2:12 pm', '04/04/26 2:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'canteen',
'5 canteens, 10AM-11:30PM/12AM',
'Canteens at NIT Srinagar: 5 canteens on campus, operating from 10 AM to 11:30 PM / 12 AM.',
1, '04/04/26 2:13 pm', '04/04/26 2:13 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'shops',
'6 shops available on campus',
'Shops at NIT Srinagar: 6 shops are available on campus.',
1, '04/04/26 2:14 pm', '04/04/26 2:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'fines',
'Fines Rs 1000-5000 for: Inappropriate behavior, Ragging, Smoking/Drinking on premises, Fights, Damaging equipment',
'Fines at NIT Srinagar: Rs 1,000 to Rs 5,000 for inappropriate behavior, ragging, smoking/drinking on premises, fights, and damaging equipment.',
1, '04/04/26 2:16 pm', '04/04/26 2:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'gym',
'Gym: Boys and girls separate, fee to be paid (not included in fee structure)',
'Gym at NIT Srinagar: Boys and girls have separate gym facilities. Fee must be paid separately (not included in the fee structure).',
1, '04/04/26 2:17 pm', '04/04/26 2:17 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'ambassador_message', 'health_centre',
'Medical unit available, medicines free of cost',
'Health centre at NIT Srinagar: Medical unit available on campus. Medicines are provided free of cost.',
1, '04/04/26 2:18 pm', '04/04/26 2:18 pm', 'whatsapp');

-- Fee Structure (from fee structure image OCR)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'fee_image', 'fee_structure',
'B.Tech Batch 2023 Even Semester. Part I: Admission Rs 1000, Library Rs 500, IT System Rs 1100, T&P Rs 500, Transport Rs 500, Medical Rs 300, Exam Rs 1200, Gymkhana Rs 1500, Mediclaim Rs 270, Hostel Rent Rs 1500, Light/Water Rs 1000, Cable TV Rs 130, Mess Establishment Rs 1500. Subtotal Rs 11,000. SC/ST/PwD Rs 11,000. Income <1L Rs 11,000. Income 1-5L Rs 31,833. Income >5L Rs 73,500. Part II: BHM Rs 1,500 + Mess Advance Rs 21,000 = Rs 22,500. 8th Sem: SC/ST Rs 12,500, <1L Rs 12,500, 1-5L Rs 33,333, >5L Rs 75,000. Foreign: SAARC USD 2,000/sem, Non-SAARC USD 4,000/sem.',
'Fee structure at NIT Srinagar for B.Tech Batch 2023 (per semester): Part I base charges Rs 11,000 covering admission, library, IT, T&P, transport, medical, exam, gymkhana, mediclaim insurance, hostel, utilities, cable TV, and mess establishment. SC/ST/PwD and family income below Rs 1 lakh pay Rs 11,000 (no tuition). Family income Rs 1-5 lakh pay Rs 31,833. Family income above Rs 5 lakh pay Rs 73,500. Part II adds BHM Rs 1,500 and mess advance Rs 21,000 (adjustable) totaling Rs 22,500. 8th semester has additional transcript and convocation fees. Foreign students: SAARC USD 2,000/sem, Non-SAARC USD 4,000/sem.',
1, '04/04/26 1:51 pm', '04/04/26 2:18 pm', 'fee_image');

-- Mess Menu (from Chenab Mess PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'mess_pdf', 'mess_menu',
'Chenab Mess NIT Srinagar. Monday to Sunday full menu with breakfast, lunch, and dinner. Kashmiri Roti as daily breakfast option. Chicken on Mon/Wed/Fri dinners. Desserts: Kheer Tue, Halwa Thu, Sewaiyan Sun.',
'NIT Srinagar Chenab Mess menu serves 3 meals daily: breakfast, lunch, and dinner. Unique feature: Kashmiri Roti is offered as a daily breakfast alternative. Non-veg options (chicken) available at dinner on Monday, Wednesday, and Friday. Butter Chicken on Friday. Desserts include Kheer on Tuesday, Halwa on Thursday, and Sewaiyan on Sunday. North Indian and Kashmiri cuisine with items like Salt Tea, Dhaniya Roti, and Kashmiri Roti.',
1, '04/04/26 1:51 pm', '04/04/26 2:18 pm', 'mess_pdf');

-- Timetable (from Timetable PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Srinagar', 'timetable_pdf', 'academics',
'B.Tech 2nd Semester Spring 2026. 8 branches: Civil (2 sections), Mechanical, Chemical, Metallurgical & Materials, Electrical, ECE, CSE, IT. Classes 9AM-5:20PM Mon-Fri. Common subjects: Engg Physics, Math II, Advanced English, Env Studies, Elements of Mech Engg, Engg Mechanics, Workshop Practice, Engg Drawing. Branch-specific for EE/ECE/CSE/IT: Engg Chemistry, Computer Programming, Basic Electrical Engg. Labs: Physics, Chemistry, Language, Computer Programming, Workshop.',
'Academics at NIT Srinagar: B.Tech 2nd Semester (Spring 2026) has 8 branches - Civil Engineering (2 sections), Mechanical Engineering, Chemical Engineering, Metallurgical & Materials Engineering, Electrical Engineering, Electronics & Communication Engineering, Computer Science Engineering, and Information Technology. Classes run Monday to Friday from 9 AM to 5:20 PM. Common subjects include Engineering Physics, Mathematics II, Advanced English and Communication Skills, Environmental Studies, Elements of Mechanical Engineering, Engineering Mechanics, Workshop Practice, and Engineering Drawing. EE/ECE/CSE/IT have additional branch-specific subjects. Timetable I/C: Dr. Vijay Kumar, Classroom I/C: Dr. Bonasi Krishna Srihari.',
1, '04/04/26 1:51 pm', '04/04/26 2:18 pm', 'timetable_pdf');
