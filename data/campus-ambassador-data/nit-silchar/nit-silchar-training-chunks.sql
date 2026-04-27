-- NIT Silchar Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'location',
'Location: NIT Silchar, Silchar-Hailakandi Road, District Cachar, Assam, Pin 788010',
'NIT Silchar (National Institute of Technology Silchar) is located at Silchar-Hailakandi Road, District Cachar, Assam, Pin 788010.',
1, '04/04/26 11:17 am', '04/04/26 11:17 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'transport',
'Transport: ISBT Bus Stand 11km, Silchar Airport 25km, Railway Station 15km',
'Transport near NIT Silchar: ISBT Bus Stand is 11 km away. Silchar Airport is 25 km away. Silchar Railway Station is 15 km away.',
1, '04/04/26 11:19 am', '04/04/26 11:20 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'restaurants',
'Restaurants: City Dhaba (at NIT gate), Vaishali Dhaba & Restaurant (1.5km), Promila Restaurant (4.2km), Madhuban Resort (1km)',
'Nearby restaurants at NIT Silchar: City Dhaba (at NIT gate), Vaishali Dhaba & Restaurant (1.5 km from campus), Promila Restaurant (4.2 km from campus), and Madhuban Resort (1 km from campus).',
1, '04/04/26 11:24 am', '04/04/26 11:24 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'tourist',
'Tourist: North East states (Sikkim, Meghalaya, Tawang). No best tourist places in Silchar',
'Tourist places near NIT Silchar: North East states like Sikkim, Meghalaya, and Tawang are popular trips. No major tourist places in Silchar city itself.',
1, '04/04/26 11:26 am', '04/04/26 11:26 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'malls',
'Malls: Goldighi Municipal Mall (7.2km)',
'Shopping malls near NIT Silchar: Goldighi Municipal Mall (7.2 km from campus).',
1, '04/04/26 11:27 am', '04/04/26 11:27 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'climate',
'Climate: Humid subtropical, hot humid summers, intense monsoons Jun-Sep, mild dry winters',
'Climate at NIT Silchar: Humid subtropical climate with hot humid summers, intense monsoons from June to September, and mild dry winters.',
1, '04/04/26 11:31 am', '04/04/26 11:31 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'language',
'Language: Hindi mostly, locals speak Assamese',
'Languages spoken around NIT Silchar: Hindi is mostly spoken. Locals speak Assamese.',
1, '04/04/26 11:33 am', '04/04/26 11:33 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'clubs',
'Clubs: Coding Club, ML Club, E-Cell, Aaveg (dance), Finance Club, Sports Club (Volleyball, Kho-Kho, Kabaddi, Football, Athletics)',
'Clubs at NIT Silchar: Technical clubs include Coding Club, ML Club, and E-Cell. Finance Club is also available. Cultural clubs include Aaveg (dance club). Sports Club covers Volleyball, Kho-Kho, Kabaddi, Football, and Athletics.',
1, '04/04/26 11:11 am', '04/04/26 11:11 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'attendance',
'Attendance: Sir dependent, 75%',
'Attendance at NIT Silchar: 75% attendance is required. Enforcement is professor/sir dependent.',
1, '04/04/26 11:11 am', '04/04/26 11:12 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'wifi',
'WiFi: LAN in hostel rooms and labs. Mobile: Jio/Airtel 5G',
'WiFi at NIT Silchar: LAN connectivity in hostel rooms and labs. Mobile network: Jio and Airtel 5G available.',
1, '04/04/26 11:13 am', '04/04/26 11:13 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'fests',
'Fests: November Technosis, February Incandescence',
'Fests at NIT Silchar: Technosis (technical fest) in November, Incandescence (cultural fest) in February.',
1, '04/04/26 11:15 am', '04/04/26 11:15 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'hostels_boys',
'Boys Hostels: 1st years: Aryabhatta (2 sharing), BH3 (1 sharing). 2nd years: BH8 (3 sharing), BH4 (3 sharing), BH1 (3 sharing). 3rd years: BH9 (9A,9B,9C,9D) (2 sharing), BH6 & BH7 (3 sharing). 4th years: BH9 (single), BH6 & BH7 (single)',
'Boys hostels at NIT Silchar: 1st year students are allotted Aryabhatta Hostel (2-sharing rooms) or BH3 (single rooms). 2nd year students get BH8, BH4, or BH1 (all 3-sharing rooms). 3rd year students get BH9 blocks 9A/9B/9C/9D (2-sharing rooms) or BH6 & BH7 (3-sharing rooms). 4th year students get BH9 (single rooms) or BH6 & BH7 (single rooms).',
1, '04/04/26 11:38 am', '04/04/26 11:39 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'mess_assignment',
'Every hostel has separate mess',
'At NIT Silchar, every hostel has its own separate mess.',
1, '04/04/26 11:39 am', '04/04/26 11:39 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'laundry',
'Every hostel has washing machines',
'Laundry at NIT Silchar: Washing machines are available in every hostel.',
1, '04/04/26 11:42 am', '04/04/26 11:42 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'elections',
'Elections: 4th years nominate. Positions: GSS (Sports), GST (Technical), GSC (Cultural), VP, GS',
'Elections at NIT Silchar: 4th year students nominate candidates. Elected positions include GSS (General Secretary Sports), GST (General Secretary Technical), GSC (General Secretary Cultural), VP (Vice President), and GS (General Secretary).',
1, '04/04/26 11:47 am', '04/04/26 11:47 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'sports',
'Sports: Volleyball, Football, Chess, Badminton, Basketball, Kho-Kho, Kabaddi, Cricket, Athletics',
'Sports at NIT Silchar: Volleyball, Football, Chess, Badminton, Basketball, Kho-Kho, Kabaddi, Cricket, and Athletics.',
1, '04/04/26 11:49 am', '04/04/26 11:49 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'canteen',
'Every hostel has canteen 10AM-10PM. Academic canteen: FPS shops (7 shops, 10AM-9PM)',
'Canteens at NIT Silchar: Every hostel has its own canteen operating 10 AM to 10 PM. Academic canteen consists of FPS shops (7 shops) operating 10 AM to 9 PM.',
2, '04/04/26 11:50 am', '04/04/26 11:52 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'fines',
'Fines: Late registration Rs 500/day. Fine for taking mess plate to room',
'Fines at NIT Silchar: Late registration fine of Rs 500 per day. Fine imposed for taking mess plate to room.',
1, '04/04/26 11:54 am', '04/04/26 11:54 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'gym',
'Gym: Common gym, free, in sports complex',
'Gym at NIT Silchar: Common gym located in the sports complex. Free for all students.',
1, '04/04/26 11:55 am', '04/04/26 11:55 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'ambassador_message', 'health_centre',
'Medical: Free dispensary, near girls hostel, ~800m from boys hostel',
'Health centre at NIT Silchar: Free dispensary available. Located near girls hostel, approximately 800 m from boys hostel.',
1, '04/04/26 11:56 am', '04/04/26 11:56 am', 'whatsapp');

-- Fee Structure (from official fee structure image OCR)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'fee_image', 'fee_structure',
'B.Tech 2nd/4th/6th Sem (Jan-Jun 2025): Part I subtotal Rs 11,000 (without tuition). SC/ST/PwD: Rs 11,000. Income <1L: Rs 11,000. Income 1-5L: Rs 31,833. Income >5L: Rs 73,500. Part II: BHM Rs 1,500 + Mess Advance Rs 21,000 = Rs 22,500. 8th Sem: Subtotal Rs 12,500. SC/ST/PwD: Rs 12,500. Income <1L: Rs 12,500. Income 1-5L: Rs 33,333. Income >5L: Rs 75,000. Foreign: SAARC USD 2,000/sem, Non-SAARC USD 4,000/sem. Payment: DD to Director NIT Silchar or SBI Collect.',
'Fee structure at NIT Silchar for B.Tech (per semester): Part I includes Admission fee, Library fee, IT System fee, T&P Charges, Transport, Medical, Examination, Gymkhana/Sport, Mediclaim Insurance, Hostel Seat Rent, Light & Water, Cable TV, Mess Establishment totaling Rs 11,000 (without tuition). With tuition: SC/ST/PwD pay Rs 11,000; family income below 1 lakh pay Rs 11,000; income 1-5 lakh pay Rs 31,833; income above 5 lakh pay Rs 73,500. Part II adds BHM Contribution Rs 1,500 and Mess Advance Rs 21,000 totaling Rs 22,500. 8th semester adds Transcript Fee Rs 1,500 and Convocation Registration Rs 50. Foreign students: SAARC USD 2,000/semester, Non-SAARC USD 4,000/semester. Payment via DD to Director NIT Silchar or SBI Collect online portal.',
1, '04/04/26 11:11 am', '04/04/26 11:56 am', 'fee_image');

-- Mess Menu (from BH8 mess menu PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'mess_pdf', 'mess_menu',
'BH8 NIT Silchar Mess Menu. Monday to Sunday full menu with breakfast, lunch, snacks, and dinner. Veg and non-veg options daily.',
'NIT Silchar BH8 mess menu serves 4 meals daily: breakfast, lunch, evening snacks, and dinner. Both veg and non-veg options available daily. Chicken on Monday, Wednesday, Friday, and Sunday. Fish on Saturday. Egg curry on Tuesday. Dessert/sweet served every day (Rice Kheer, Fruit Custard, Rasogolla, Fruit Salad, Frooti, Amul Masti, Ice Cream/Amul Lassi). Breakfast options include Idli, Poha, Maggi, Upma, Sewai, Cornflakes with Bread Butter Jam alternative. Snacks include Tea with Sandwich, Chowmin, Bhel, or Bhujia.',
1, '04/04/26 11:11 am', '04/04/26 11:56 am', 'mess_pdf');

-- Timetable (from Timetable PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Silchar', 'timetable_pdf', 'academics',
'1st Semester July-Dec 2024. 11 sections A-K. Group 1 (A-E): PH101, MA101, ME101, EE101, HS101, CE101. Labs: PH111, EE111, HS111. Group 2 (F-K): CH101, MA101, CS101, EC101, CE102, ME111. Labs: CH111, EC111, CS111, ME111. Classes 8AM-5PM Mon-Fri.',
'Academics at NIT Silchar: 1st semester (July-Dec 2024) has 11 sections (A through K) split into 2 groups. Group 1 (Sections A-E) studies Physics (PH101), Mathematics-I (MA101), Engineering Mechanics (ME101), Basic Electrical (EE101), Communicative English (HS101), and Environmental Science (CE101), with labs for Physics, Electrical, and Language. Group 2 (Sections F-K) studies Chemistry (CH101), Mathematics-I (MA101), Intro to Programming (CS101), Basic Electronics (EC101), Environmental Science (CE102), and Workshop (ME111), with labs for Chemistry, Electronics, Programming, and Workshop. Classes run 8 AM to 5 PM, Monday to Friday.',
1, '04/04/26 11:11 am', '04/04/26 11:56 am', 'timetable_pdf');
