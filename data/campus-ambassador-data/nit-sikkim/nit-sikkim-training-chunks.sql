-- NIT Sikkim Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'location',
'Location: National Institute of Technology Sikkim, Ravangla, Barfung Road, Namchi District, Sikkim 737139',
'NIT Sikkim (National Institute of Technology Sikkim) is located at Ravangla, Barfung Road, Namchi District, Sikkim 737139.',
1, '04/04/26 1:07 pm', '04/04/26 1:07 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'transport',
'Transport: New Jalpaiguri Station 120km, Bagdogra Airport 130km. From airport/station: SNT bus or share taxi till 1pm (Rs 450, or Rs 800-900 if landslide). Separate cab Rs 4000. Daily bus at 1pm Rs 280',
'Transport near NIT Sikkim: New Jalpaiguri Station is 120 km away. Bagdogra Airport is 130 km away. From airport or station, take SNT bus or share taxi available till 1 PM (Rs 450, or Rs 800-900 if there is a landslide). A separate cab costs Rs 4,000. A daily bus is available at 1 PM for Rs 280.',
1, '04/04/26 1:09 pm', '04/04/26 1:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'restaurants',
'Restaurants: Many restaurants in market 2km away',
'Nearby restaurants at NIT Sikkim: Many restaurants are available in the market 2 km away from campus.',
1, '04/04/26 1:14 pm', '04/04/26 1:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'tourist',
'Tourist places: Near: Namchi (Chardham), Pelling. Gangtok, North Sikkim (Lachung, Lachen), Nathula Pass. Kalimpong, Darjeeling, Lamhatta, Tinchule, Downhill',
'Tourist places near NIT Sikkim: Namchi (Chardham temple complex), Pelling, Gangtok, North Sikkim (Lachung, Lachen), Nathula Pass, Kalimpong, Darjeeling, Lamhatta, Tinchule, and Downhill.',
1, '04/04/26 1:16 pm', '04/04/26 1:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'malls',
'Malls: No malls nearby. Zudio/Trends/Reliance etc 26km away',
'Shopping near NIT Sikkim: No malls nearby. Zudio, Trends, Reliance and similar stores are 26 km away.',
1, '04/04/26 1:18 pm', '04/04/26 1:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'climate',
'Climate: Mostly winter. Non-stop rain in rainy season. Summer morning sunny, afternoon rain likely',
'Climate at NIT Sikkim: Mostly winter weather. Non-stop rain during rainy season. Summer mornings are sunny but afternoon rain is likely.',
1, '04/04/26 1:20 pm', '04/04/26 1:20 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'language',
'Language: Mostly Hindi. Local people speak Nepali/Bengali/Hindi',
'Languages spoken around NIT Sikkim: Mostly Hindi. Local people speak Nepali, Bengali, and Hindi.',
1, '04/04/26 1:21 pm', '04/04/26 1:21 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'clubs',
'Clubs: Anuvrat, Devcans, Nirmaan, Photography Club, The Regnant Club, Yantrikaa. Cells: E&I Cell, Web Dev Cell, T&P Cell',
'Clubs at NIT Sikkim: Anuvrat, Devcans, Nirmaan, Photography Club, The Regnant Club, and Yantrikaa. Cells include E&I Cell (Entrepreneurship & Innovation), Web Dev Cell, and T&P Cell (Training & Placement).',
1, '04/04/26 1:25 pm', '04/04/26 1:25 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'attendance',
'Attendance: 75% mandatory. 25% can be covered by medical certificates',
'Attendance at NIT Sikkim: 75% attendance is mandatory. The remaining 25% can be covered by medical certificates.',
1, '04/04/26 1:27 pm', '04/04/26 1:27 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'wifi',
'WiFi: 10GB per day per student. Uninterrupted in hostel rooms, classrooms, labs',
'WiFi at NIT Sikkim: 10 GB per day per student. Uninterrupted connectivity in hostel rooms, classrooms, and labs.',
1, '04/04/26 1:30 pm', '04/04/26 1:30 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'fests',
'Fests: Udgam (cultural), Abhiyantran (technical) - 2 per year',
'Fests at NIT Sikkim: Udgam (cultural fest) and Abhiyantran (technical fest). 2 fests held per year.',
1, '04/04/26 1:33 pm', '04/04/26 1:33 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'hostels_boys',
'Boys Hostels: BH-1 and BH-2 (excluding 1st year). 1st year boys hostel 1.5km outside campus. PhD: no hostels. MTech: 2 hostels in campus',
'Boys hostels at NIT Sikkim: BH-1 and BH-2 for 2nd year and above (in campus). 1st year boys hostel is 1.5 km outside campus. MTech students have 2 hostels within campus. PhD students do not have hostel facility.',
1, '04/04/26 1:38 pm', '04/04/26 1:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'hostels_girls',
'Girls Hostels: GH-1, GH-2, GH-3 in campus. Faculty/Staff: FS hostel',
'Girls hostels at NIT Sikkim: 3 hostels - GH-1, GH-2, and GH-3, all located within campus. Faculty and staff have a separate FS hostel.',
2, '04/04/26 1:40 pm', '04/04/26 1:41 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'mess_cost',
'Mess: 1 boys mess (all boys including MTech/PhD), 1 girls mess (all girls). Same menu. Rs 140/day',
'Mess at NIT Sikkim: 1 boys mess (serves all boys including MTech and PhD) and 1 girls mess (serves all girls). Same menu for everyone. Costs Rs 140 per day.',
1, '04/04/26 1:44 pm', '04/04/26 1:44 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'mess_timings',
'Mess Timings: Breakfast 7-9am (working), 8-10am (weekends). Lunch 12-2pm. Tea 5:30-6:30pm. Dinner 8-9:45pm',
'Mess timings at NIT Sikkim: Breakfast 7-9 AM (working days), 8-10 AM (weekends). Lunch 12-2 PM. Tea 5:30-6:30 PM. Dinner 8-9:45 PM.',
1, '04/04/26 1:48 pm', '04/04/26 1:48 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'mess_menu',
'Mess Menu: Mon: Sattu/Aloo Paratha, Arhar Dal/Rajma, Shahi Paneer/Butter Chicken. Tue: Pav Bhaji/Medu Vada, Masoor Dal+Mix Veg, Chana Dal Tarka+Aloo Matar. Wed: Gobi/Veg Paratha, Chana Dal+Aloo Dam+Palak, Egg Curry/Mushroom Curry. Thu: Uttapam/Poha+Sev, Masoor Dal+Besan Kadhi, Puri+Aloo/Gobi Dum+Chole. Fri: Bread Butter Jam+Eggs, Arhar Dal+Cabbage Fry+Soyabean, Paneer Chilli/Chicken Chilli OR Biryani (alternate weeks). Sat: Dosa/Idli, Khichdi+Chokha+Papad, Fried Rice+Manchurian. Sun: Chole Bhatura+Fruit, Matar Paneer/Fish Curry, Dal Makhani+Gulab Jamun/Jalebi',
'NIT Sikkim mess menu (from PDF): Monday - Breakfast: Sattu/Aloo Paratha, Lunch: Arhar Dal/Rajma, Dinner: Shahi Paneer/Butter Chicken. Tuesday - Breakfast: Pav Bhaji/Medu Vada, Lunch: Masoor Dal+Mix Veg, Dinner: Chana Dal Tarka+Aloo Matar. Wednesday - Breakfast: Gobi/Veg Paratha, Lunch: Chana Dal+Aloo Dam+Palak, Dinner: Egg Curry/Mushroom Curry. Thursday - Breakfast: Uttapam/Poha+Sev, Lunch: Masoor Dal+Besan Kadhi, Dinner: Puri+Aloo/Gobi Dum+Chole. Friday - Breakfast: Bread Butter Jam+Eggs, Lunch: Arhar Dal+Cabbage Fry+Soyabean, Dinner: Paneer Chilli/Chicken Chilli OR Biryani (alternate weeks). Saturday - Breakfast: Dosa/Idli, Lunch: Khichdi+Chokha+Papad, Dinner: Fried Rice+Manchurian. Sunday - Breakfast: Chole Bhatura+Fruit, Lunch: Matar Paneer/Fish Curry, Dinner: Dal Makhani+Gulab Jamun/Jalebi.',
2, '04/04/26 1:55 pm', '04/04/26 1:58 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'mess_portions',
'Mess Portions: Bread 4pcs, Butter 10g, Jam 20g, Chicken 120-135g, Egg 2pcs, Fish 120-135g, Paneer 70-80g, Tea 200ml, Pav 4pcs. Biryani every 2 weeks. South/North Indian/Sikkim food covered',
'Mess portion sizes at NIT Sikkim: Bread 4 pcs, Butter 10g, Jam 20g, Chicken 120-135g, Egg 2 pcs, Fish 120-135g, Paneer 70-80g, Tea 200ml, Pav 4 pcs. Biryani served every 2 weeks (alternate Fridays). Menu covers South Indian, North Indian, and Sikkim food.',
1, '04/04/26 1:58 pm', '04/04/26 1:58 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'laundry',
'Laundry: 1-2 washing machines per hostel, Rs 50/wash',
'Laundry at NIT Sikkim: 1-2 washing machines available per hostel. Costs Rs 50 per wash.',
1, '04/04/26 2:01 pm', '04/04/26 2:01 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'elections',
'Elections: No elections',
'Elections at NIT Sikkim: No student elections are held.',
1, '04/04/26 2:03 pm', '04/04/26 2:03 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'sports',
'Sports: Cricket, Football, Volleyball, Badminton, Kho-Kho, Basketball, Chess, Carrom. Annual sports event (whole college including faculty)',
'Sports at NIT Sikkim: Cricket, Football, Volleyball, Badminton, Kho-Kho, Basketball, Chess, and Carrom. Annual sports event involving the entire college including faculty.',
1, '04/04/26 2:06 pm', '04/04/26 2:06 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'canteen',
'Canteen: On-campus canteen (snacks+food). Small canteen 100m outside. Grocery shop 1km. 2 restaurants 2km',
'Canteens at NIT Sikkim: On-campus canteen serving snacks and food. Small canteen located 100 meters outside campus. Grocery shop 1 km away. 2 restaurants 2 km away.',
1, '04/04/26 2:10 pm', '04/04/26 2:10 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'shops',
'Shops: Market 2km away',
'Shops near NIT Sikkim: Market is 2 km away from campus.',
1, '04/04/26 2:12 pm', '04/04/26 2:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'fines',
'Fines: Misbehavior Rs 20,000 + deregister 1 semester. Property damage Rs 20,000-50,000. VERY strict!',
'Fines at NIT Sikkim: Misbehavior incurs a Rs 20,000 fine plus deregistration for 1 semester. Property damage incurs a Rs 20,000 to Rs 50,000 fine. Enforcement is very strict.',
1, '04/04/26 2:17 pm', '04/04/26 2:17 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'gym',
'Gym: Boys only gym, free, any time',
'Gym at NIT Sikkim: Boys only. Free for students. Accessible at any time.',
1, '04/04/26 2:19 pm', '04/04/26 2:19 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'ambassador_message', 'health_centre',
'Medical: Open 8am-10pm. Ambulance for urgency. College bears testing expenses. Buy medicines yourself if not available',
'Health centre at NIT Sikkim: Open 8 AM to 10 PM. Ambulance available for emergencies. College bears testing expenses. Students must buy medicines themselves if not available at the health centre.',
1, '04/04/26 2:22 pm', '04/04/26 2:22 pm', 'whatsapp');

-- Fee Structure (from official fee structure PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'fee_pdf', 'fee_structure',
'Fee Structure: Tuition Rs 62,500/sem (full), Rs 20,834 (2/3rd remission), Rs 0 (SC/ST/PwD/<1L). Exam Rs 870, Reg Rs 298, Library Rs 926, Lab Rs 1,157, Internet Rs 585, Sports Rs 992, Medical Rs 353, Insurance Rs 585, Dev Fund Rs 585, T&P Rs 176, Dept Rs 585, Grade Card Rs 231. Sub-total full: Rs 70,945, 2/3rd: Rs 29,279. One-time: Admission Rs 5,000, ID Rs 3,000, Welfare Rs 500, Alumni Rs 7,500, Convocation Rs 750, Caution Rs 7,500. Total one-time: Rs 16,750 (first sem), Rs 8,250 (other). Hostel: Mess Caution Rs 7,500 (one-time), Hostel Caution Rs 750, Hostel Fee Rs 1,742, Maint Rs 297, Total hostel: Rs 10,927 first sem. Bus optional Rs 1,743/sem. Mess charges separate.',
'Fee structure at NIT Sikkim (per semester): Full tuition Rs 62,500. With 2/3rd remission Rs 20,834. SC/ST/PwD/income below 1 lakh Rs 0 tuition. Additional per-semester fees: Exam Rs 870, Registration Rs 298, Library Rs 926, Lab Rs 1,157, Internet Rs 585, Sports Rs 992, Medical Rs 353, Insurance Rs 585, Development Fund Rs 585, T&P Rs 176, Department Rs 585, Grade Card Rs 231. Total per semester (full tuition): Rs 70,945. Total per semester (2/3rd remission): Rs 29,279. One-time fees (first semester): Admission Rs 5,000, ID Card Rs 3,000, Welfare Rs 500, Alumni Rs 7,500, Convocation Rs 750, Caution Deposit Rs 7,500 = Rs 16,750 total. One-time fees (subsequent semesters): Rs 8,250. Hostel fees: Mess Caution Rs 7,500 (one-time), Hostel Caution Rs 750, Hostel Fee Rs 1,742, Maintenance Rs 297 = Rs 10,927 first semester. Optional bus fee Rs 1,743 per semester. Mess charges are separate.',
1, '04/04/26 2:30 pm', '04/04/26 2:38 pm', 'fee_pdf');

-- Mess Menu (from official mess menu PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'mess_pdf', 'mess_menu',
'NIT Sikkim mess menu from PDF. Monday to Sunday full menu with breakfast, lunch, and dinner. Portions: Bread 4pcs, Butter 10g, Jam 20g, Chicken 120-135g, Egg 2pcs, Fish 120-135g, Paneer 70-80g, Tea 200ml, Pav 4pcs.',
'NIT Sikkim mess menu (from PDF) serves 4 meals daily: breakfast, lunch, tea, and dinner. Menu features North Indian staples (parathas, dal, rajma, chole), South Indian items (dosa, idli, uttapam, medu vada), and non-veg options (butter chicken, egg curry, fish curry, chicken chilli, biryani). Biryani served alternate Fridays. Sunday special includes Gulab Jamun or Jalebi as dessert. Covers South Indian, North Indian, and Sikkim food. Rs 140 per day.',
1, '04/04/26 1:55 pm', '04/04/26 1:58 pm', 'mess_pdf');

-- Timetable (from official timetable PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Sikkim', 'timetable_pdf', 'academics',
'Timetable from PDF, 6 pages: ECE 4th Sem, 6th Sem, 8th Sem. CSE 4th Sem, 6th Sem. EE 4th Sem. Subjects: Signal Processing, Analog Electronics, Microprocessor, Communication Systems, VLSI, Embedded Systems.',
'NIT Sikkim timetable (from PDF, 6 pages): Covers ECE 4th, 6th, and 8th semester; CSE 4th and 6th semester; EE 4th semester. Subjects include Signal Processing, Analog Electronics, Microprocessor, Communication Systems, VLSI, Embedded Systems, and more. NIT Sikkim offers B.Tech in CSE, ECE, and EE.',
1, '04/04/26 2:44 pm', '04/04/26 2:44 pm', 'timetable_pdf');
