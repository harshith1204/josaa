-- IIT Hyderabad Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'location',
'Location: IIT Hyderabad, Kandi, Sangareddy, Hyderabad, Telangana',
'IIT Hyderabad (Indian Institute of Technology Hyderabad) is located at Kandi, Sangareddy, Hyderabad, Telangana.',
1, '01/04/26 11:21 pm', '01/04/26 11:21 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'transport',
'Transport: Bus stop Sangareddy, Railway Lingampalli, Airport Rajiv Gandhi',
'Transport near IIT Hyderabad: Sangareddy Bus Stop is the nearest bus stop. Lingampalli Railway Station is the nearest railway station. Rajiv Gandhi International Airport is the nearest airport.',
1, '01/04/26 11:24 pm', '01/04/26 11:24 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'restaurants',
'Restaurants: Dominos in IITH, nearby Kings, Zam Zam. Swiggy/Zomato available',
'Restaurants at IIT Hyderabad: Dominos is available inside the campus. Nearby restaurants include Kings and Zam Zam. Swiggy and Zomato delivery apps are available.',
1, '01/04/26 11:27 pm', '01/04/26 11:27 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'language',
'Language: State Telugu, Campus English/Hindi/Telugu/Tamil',
'Languages at IIT Hyderabad: The state language is Telugu. On campus, English, Hindi, Telugu, and Tamil are commonly spoken.',
1, '01/04/26 11:37 pm', '01/04/26 11:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'attendance',
'Attendance: Depends on courses taken',
'Attendance at IIT Hyderabad depends on the courses taken. There is no fixed mandatory attendance percentage.',
1, '01/04/26 11:40 pm', '01/04/26 11:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'wifi',
'WiFi: LAN ports in rooms',
'WiFi at IIT Hyderabad: LAN ports are available in hostel rooms.',
1, '01/04/26 11:40 pm', '01/04/26 11:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'hostels_1st_year',
'Hostels: 4 UG 1st year hostels, 2 sharing',
'Hostels at IIT Hyderabad: There are 4 UG 1st year hostels with double (2) sharing rooms.',
1, '01/04/26 11:43 pm', '01/04/26 11:43 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'sports',
'Sports: Volleyball, Tennis, Basketball, Badminton, Cricket, Athletics, Football, Chess, Carroms, Foosball',
'Sports at IIT Hyderabad: Volleyball, Tennis, Basketball, Badminton, Cricket, Athletics, Football, Chess, Carroms, and Foosball.',
1, '02/04/26 12:18 am', '02/04/26 12:18 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'hospital',
'Hospital: In college, paid',
'Hospital at IIT Hyderabad: There is an in-campus hospital. Services are paid.',
1, '02/04/26 12:19 am', '02/04/26 12:19 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'laundry',
'Laundry: Washing machines in hostels, ironing in old canteen',
'Laundry at IIT Hyderabad: Washing machines are available in hostels. Ironing facility is available in the old canteen area.',
1, '02/04/26 12:21 am', '02/04/26 12:21 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'climate',
'Climate: A bit sunny, some days cloudy',
'Climate at IIT Hyderabad: A bit sunny, some days cloudy.',
1, '03/04/26 11:02 am', '03/04/26 11:02 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'timetable',
'Timetable: Every course has a slot, students make their own timetable',
'Timetable at IIT Hyderabad: Every course has a designated slot. Students create their own timetable by selecting course slots.',
1, '03/04/26 11:05 am', '03/04/26 11:05 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'shops',
'Shops: Mobile accessories, stationery, barber in old canteen',
'Shops at IIT Hyderabad: Mobile accessories shop, stationery shop, and barber shop are all located in the old canteen area.',
1, '03/04/26 11:10 am', '03/04/26 11:10 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'curfew',
'Fines: Can enter and leave college anytime, any day (NO FINES/CURFEW)',
'Curfew at IIT Hyderabad: There is no curfew. Students can enter and leave the campus at any time, on any day. No fines for late entry.',
1, '03/04/26 11:12 am', '03/04/26 11:12 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'gym',
'Gym: One in sports complex, another near it. No trainer, no membership (FREE)',
'Gym at IIT Hyderabad: Two gyms available - one in the sports complex and another nearby. No trainer is available. No membership fee required, gym is free for all students.',
1, '03/04/26 11:15 am', '03/04/26 11:15 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'fests',
'Fests: For almost every cultural occasion, DJ nights',
'Fests at IIT Hyderabad: Fests are held for almost every cultural occasion, including DJ nights. Main fests include Elan & nVision (annual fest), Milan (inter-hostel fest), and Diesta (inter-department fest).',
1, '03/04/26 12:01 pm', '03/04/26 12:01 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'elections',
'Elections: 17 positions - President, Gen Sec I Female, Gen Sec II Male, Welfare Sec, Cultural & Literary Sec, Academic Affairs Sec, Technical Affairs Sec, Sports Sec, Mess Sec, Media & PR Sec, Alumni Affairs Sec, UG Rep I Female, UG Rep II Male, PG Rep I Female, PG Rep II Male, Doctoral Rep I Female, Doctoral Rep II Male',
'Elections at IIT Hyderabad: 17 elected positions in student governance. Executive positions: President, General Secretary I (Female), General Secretary II (Male), Welfare Secretary, Cultural & Literary Secretary, Academic Affairs Secretary, Technical Affairs Secretary, Sports Secretary, Mess Secretary, Media & PR Secretary, Alumni Affairs Secretary. Representative positions: UG Representative I (Female), UG Representative II (Male), PG Representative I (Female), PG Representative II (Male), Doctoral Representative I (Female), Doctoral Representative II (Male).',
1, '03/04/26 12:21 pm', '03/04/26 12:21 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'malls',
'Malls: Inorbit Mall (city), Lakeshore Mall, Lulu Mall (city)',
'Malls near IIT Hyderabad: Inorbit Mall (in the city), Lakeshore Mall, and Lulu Mall (in the city).',
1, '03/04/26 1:28 pm', '03/04/26 1:28 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'tourist',
'Tourist: Water Bund (nearby), Wonderla, Charminar, Tank Bund',
'Tourist places near IIT Hyderabad: Water Bund (nearby), Wonderla amusement park, Charminar, and Tank Bund.',
1, '03/04/26 1:37 pm', '03/04/26 1:37 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'clubs',
'Clubs - Management: FCC, E-Cell, Tinkerers Lab, TEDx IITH. Cultural: Infocus, Behind The Lens, Silhouettes, Vibes, Shuffle, Gesture, Rang De Manch, Otaku, LitSoc. Technical: Aero Club, Cepheid, Elektronica, Kludge, Infero, Lambda, Epoch, Robotix, Torque, Glitch. Fest Related: Elan & nVision, Milan, Diesta. Other: Sunshine, Echo IITH, Cultural & Literary Council, EML, EBSB, Prakriti, Prayas',
'Clubs at IIT Hyderabad (~40 clubs in 5 categories): Management clubs - FCC (Finance & Consulting), E-Cell (Entrepreneurship), Tinkerers Lab, TEDx IITH. Cultural clubs - Infocus (Photography), Behind The Lens (Filmmaking), Silhouettes (Fashion), Vibes (Music), Shuffle (Dance), Gesture (Arts), Rang De Manch (Stage Play), Otaku (Anime), LitSoc (Literary Society). Technical clubs - Aero Club (planes/drones), Cepheid (astronomy), Elektronica (electronics), Kludge (cybersecurity), Infero (competitive programming), Lambda (WebDev), Epoch (AI/ML), Robotix (Robotics), Torque (automobile engineering), Glitch (Game Dev). Fest related - Elan & nVision (Main Fest), Milan (Inter Hostel Fest), Diesta (Inter Dept Fest). Other - Sunshine (Mental Health), Echo IITH (Media Council), Cultural & Literary Council, EML (Extra Mural Lectures), EBSB, Prakriti (Nature), Prayas (Rural Dev).',
1, '03/04/26 4:07 pm', '03/04/26 4:07 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'canteen',
'Canteen: Old canteen, New canteen with cafes and bakeries',
'Canteens at IIT Hyderabad: Old canteen and New canteen. The new canteen has cafes and bakeries.',
1, '03/04/26 5:50 pm', '03/04/26 5:50 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'mess',
'Mess: Old and new mess, veg menu, veg+non-veg extras (paid)',
'Mess at IIT Hyderabad: Two messes - old mess and new mess. Veg menu is included in the base mess fee. Veg and non-veg extras are available and paid separately.',
1, '03/04/26 5:51 pm', '03/04/26 5:51 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'hostels_boys_1st_year',
'1st Year Double Sharing Boys: Vivekananda, SN Bose, Ramanuja. Girls: Kalpana Chawla',
'1st year hostels at IIT Hyderabad (double sharing): Boys hostels - Vivekananda, SN Bose, and Ramanuja. Girls hostel - Kalpana Chawla.',
1, '04/04/26 12:38 am', '04/04/26 12:38 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'hostels_boys_single',
'Single Sharing Boys: Visweswaraya, Ramanujan, Sarabhai, Bhabha, Kalam, Susruta, Kautilya, Varahamira, Brahmagupta, Vyasa, Charaka, Raman',
'Single sharing boys hostels at IIT Hyderabad (12 hostels): Visweswaraya, Ramanujan, Sarabhai, Bhabha, Kalam, Susruta, Kautilya, Varahamira, Brahmagupta, Vyasa, Charaka, and Raman.',
1, '04/04/26 2:02 am', '04/04/26 2:02 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'ambassador_message', 'hostels_girls_single',
'Single Sharing Girls: Aryabhatta, Gargi, Maitreyi, Anandhi Joshi, Sarojini Naidu, Bhaskara',
'Single sharing girls hostels at IIT Hyderabad (6 hostels): Aryabhatta, Gargi, Maitreyi, Anandhi Joshi, Sarojini Naidu, and Bhaskara.',
1, '04/04/26 2:03 am', '04/04/26 2:03 am', 'whatsapp');

-- Fee Structure (from official fee PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Hyderabad', 'fee_pdf', 'fee_structure',
'B.Tech/BDes UG July-Dec 2025. One-time: Rs 19,000 (Joining 7000 + Student Activity 6000 + Security Deposit 6000 refundable). Semester Gen/EWS/OBC/OCI/PIO: Tuition 1,00,000 + Other 13,500 + Welfare 1,000 + Hostel 16,000 + Mess 15,470 = 1,45,970. Insurance 1,888/yr. Grand Total 1,66,858. SC/ST/PH: Tuition NIL, Total 45,970, Grand Total 66,858. Foreign: Tuition 3,00,000, Grand Total 3,66,858.',
'Fee structure at IIT Hyderabad for B.Tech/BDes UG (July-Dec 2025 semester): One-time fees Rs 19,000 (Joining Fee Rs 7,000 + Student Activity Fee Rs 6,000 + Security Deposit Rs 6,000 refundable). Per semester for Gen/EWS/OBC/OCI/PIO: Tuition Rs 1,00,000 + Registration/Exam/Gymkhana/Medical/IT/Sports/Lab/Transport Rs 13,500 + Student Welfare Fund Rs 1,000 + Hostel Rs 16,000 + Mess Rs 15,470 (Rs 130/day x 119 days) = Total Rs 1,45,970. Medical Insurance Rs 1,888/year (Rs 2L coverage). Grand Total Rs 1,66,858. SC/ST/PH: Tuition NIL, semester total Rs 45,970, Grand Total Rs 66,858. Foreign Nationals: Tuition Rs 3,00,000/semester, Grand Total Rs 3,66,858.',
1, '01/04/26 11:21 pm', '04/04/26 2:03 am', 'fee_pdf');
