-- IIT Bhubaneswar Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'location',
'Location: Indian Institute of Technology Bhubaneswar, Jatani, Khordha, Odisha 752050',
'IIT Bhubaneswar (Indian Institute of Technology Bhubaneswar) is located at Jatani, Khordha, Odisha 752050.',
1, '04/04/26 5:49 pm', '04/04/26 5:49 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'transport',
'Transport: Autos available 24/7. No Ola/Uber/Rapido. Khurda Road Junction 6.5km. Biju Patnaik Airport 29km. College buses to Bhubaneswar on weekends',
'Transport near IIT Bhubaneswar: Autos are available 24/7. Ola, Uber, and Rapido are not available. Khurda Road Junction railway station is 6.5 km away. Biju Patnaik International Airport is 29 km away. College buses run to Bhubaneswar city on weekends.',
1, '04/04/26 5:51 pm', '04/04/26 5:51 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'restaurants',
'Restaurants: Hyderabadi Biryani House, ISKCON Canteen, Saffron Spices, Red Cottage, Kebabs Era, Vickys',
'Nearby restaurants at IIT Bhubaneswar: Hyderabadi Biryani House, ISKCON Canteen, Saffron Spices, Red Cottage, Kebabs Era, and Vickys.',
1, '04/04/26 5:54 pm', '04/04/26 5:54 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'delivery',
'Delivery apps: Swiggy, Zomato, Blinkit (available till 10 pm)',
'Food and grocery delivery apps available at IIT Bhubaneswar: Swiggy, Zomato, and Blinkit. All available till 10 pm only.',
1, '04/04/26 5:55 pm', '04/04/26 5:55 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'language',
'Language: Outside campus Odia + Hindi, Inside campus Hindi + English',
'Languages at IIT Bhubaneswar: Outside campus Odia and Hindi are spoken. Inside campus Hindi and English are used.',
1, '04/04/26 5:57 pm', '04/04/26 5:57 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'hostels_boys',
'Boys Hostels: RHR (1st year, separate rooms), MHR (2nd year, separate rooms), BHR (3rd/4th year, separate rooms)',
'Boys hostels at IIT Bhubaneswar: 3 hostels total. RHR for 1st year boys with separate rooms. MHR for 2nd year boys with separate rooms. BHR for 3rd and 4th year boys with separate rooms. All boys get single rooms.',
1, '04/04/26 5:59 pm', '04/04/26 5:59 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'hostels_girls',
'Girls Hostels: Sangam (1st year, 3 sharing), SHR (MTech/PhD, separate), GHR (2nd-4th year, separate)',
'Girls hostels at IIT Bhubaneswar: 3 hostels. Sangam for 1st year girls with 3-sharing rooms. SHR for MTech/PhD girls with separate rooms. GHR for 2nd to 4th year girls with separate rooms.',
1, '04/04/26 6:01 pm', '04/04/26 6:01 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'laundry',
'Washing machines available on every floor in all hostels + paid laundry service',
'Laundry at IIT Bhubaneswar: Washing machines are available on every floor in all hostels. Paid laundry service is also available.',
1, '04/04/26 6:02 pm', '04/04/26 6:02 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'sports',
'Sports: Basketball, Volleyball, Tennis, Badminton, Football, Squash courts. Sports clubs for every sport',
'Sports at IIT Bhubaneswar: Basketball, Volleyball, Tennis, Badminton, Football, and Squash courts available. Sports clubs exist for every sport.',
2, '04/04/26 6:04 pm', '04/04/26 6:13 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'canteen',
'Canteen in every hostel, open till 1:15 am (except Sangam hostel)',
'Canteens at IIT Bhubaneswar: Every hostel has a canteen open till 1:15 AM, except Sangam hostel.',
1, '04/04/26 6:06 pm', '04/04/26 6:06 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'rules',
'Fines: Late registration fine. Malpractice fine. Students can go out 24/7 (except 1st year girls)',
'Rules at IIT Bhubaneswar: Late registration fine and malpractice fine are applicable. Students can go out of campus 24/7 except 1st year girls.',
1, '04/04/26 6:08 pm', '04/04/26 6:08 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'clubs',
'Tech Clubs: RISC (robotics), Neuromancers (coding), WebND (web+design), Nakshatra (astronomy), FEBS (finance). Cultural: Clix (photo), Aaroh (music), D Groovers (dance), Kalakrithi (arts), Cinewave (film), QuizSoc, Panacea (English lit), Abhivyakti (Hindi lit), Oracle (journalism), Souls for Solace (social)',
'Clubs at IIT Bhubaneswar: Technical clubs include RISC (robotics), Neuromancers (coding), WebND (web and design), Nakshatra (astronomy), and FEBS (finance). Cultural clubs include Clix (photography), Aaroh (music), D Groovers (dance), Kalakrithi (arts), Cinewave (film), QuizSoc (quizzing), Panacea (English literature), Abhivyakti (Hindi literature), Oracle (journalism), and Souls for Solace (social service).',
2, '04/04/26 6:10 pm', '04/04/26 6:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'attendance',
'Attendance: Professor''s choice (no fixed percentage)',
'Attendance at IIT Bhubaneswar: Attendance policy is at the professor''s choice. There is no fixed mandatory percentage.',
1, '04/04/26 6:14 pm', '04/04/26 6:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'wifi',
'WiFi and LAN available in every room',
'WiFi and LAN at IIT Bhubaneswar: Both WiFi and LAN connectivity are available in every hostel room.',
1, '04/04/26 6:15 pm', '04/04/26 6:15 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'fests',
'Fest: Pravaah (annual cultural + tech fest, held in February)',
'Fests at IIT Bhubaneswar: Pravaah is the annual cultural and tech fest, held in February.',
1, '04/04/26 6:16 pm', '04/04/26 6:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'tourist',
'Tourist places: Veena Theatre 4km, DN Regalia Mall 19km, Nexus Esplanade 31km, Wonderla 10km, Baruni Hill beside campus, Nandankanan Zoo 42km, Puri 60km, Konark 63km, Lingaraj 25km',
'Tourist places near IIT Bhubaneswar: Veena Theatre (4 km), DN Regalia Mall (19 km), Nexus Esplanade Mall (31 km), Wonderla Amusement Park (10 km), Baruni Hill (beside campus), Nandankanan Zoo (42 km), Puri (60 km), Konark (63 km), and Lingaraj Temple (25 km).',
1, '04/04/26 6:18 pm', '04/04/26 6:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'shops',
'Shops inside campus: Fruit shop, Bakery, Ice cream, Juice, Supermarket, Stationery, General store',
'Shops on IIT Bhubaneswar campus: Fruit shop, Bakery, Ice cream shop, Juice shop, Supermarket, Stationery shop, and General store.',
1, '04/04/26 6:21 pm', '04/04/26 6:21 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'gym',
'Gym available in the Student Activity Center',
'Gym at IIT Bhubaneswar: Available in the Student Activity Center.',
1, '04/04/26 6:22 pm', '04/04/26 6:22 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'medical',
'Medical: 24/7 free. Ambulance. Apollo Pharmacy. Rs 5000 medical insurance',
'Medical facilities at IIT Bhubaneswar: 24/7 free medical center. Ambulance service available. Apollo Pharmacy on campus. Rs 5000 medical insurance provided to students.',
1, '04/04/26 6:24 pm', '04/04/26 6:24 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'mess_timings',
'Mess timings: Breakfast 7:30-10, Lunch 12-2, Dinner 8-10pm. Monthly special dinner.',
'Mess timings at IIT Bhubaneswar: Breakfast 7:30-10:00 AM, Lunch 12:00-2:00 PM, Dinner 8:00-10:00 PM. A monthly special dinner is also organized.',
2, '04/04/26 6:25 pm', '04/04/26 6:27 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'ambassador_message', 'mess_daily',
'Daily compulsory: Bread unlimited, Butter 2 chiplets, Jam 20g, Cornflakes/Oats, Sprouted grains, Milk 250ml, Tea, Salad',
'Daily compulsory items in IIT Bhubaneswar mess: Bread (unlimited), Butter (2 chiplets), Jam (20g), Cornflakes/Oats, Sprouted grains, Milk (250ml), Tea, and Salad.',
1, '04/04/26 6:28 pm', '04/04/26 6:28 pm', 'whatsapp');

-- Mess Menu (from PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'mess_pdf', 'mess_menu',
'Weekly mess menu: Mon: Masala Idli+Vada, Lauki Kofta, Chole Bhature+Gulab Jamun. Tue: Upma/Maggi, Kadhi Pakora, Veg Fried Rice+Rice Kheer. Wed: Missi Paratha+Paneer/Egg Bhurji, Rajma, Chicken Kasa/Kadai Paneer+Ice Cream. Thu: Puri+Aloo Dum, Dalma, Egg Kasa/Paneer Butter Masala+Kalakand. Fri: Punugulu/Poha Jalebi, Matar Paneer/Fish Curry, Manchurian+Sewaya Kheer. Sat: Aloo Onion Paratha, Chole Paneer+Tehri. Sun: Masala Dosa, Veg/Chicken Biryani+Cold Drink, Ghee+Veg Pongal+Millet Kheer.',
'IIT Bhubaneswar mess menu (weekly): Serves 3 meals daily (breakfast, lunch, dinner). Menu features North Indian staples, South Indian breakfasts (Masala Dosa, Masala Idli, Punugulu), Odia specialties (Dalma), and non-veg options on select days (Chicken Biryani, Fish Curry, Egg dishes). Desserts like Gulab Jamun, Ice Cream, Kheer, and Kalakand are served with dinner. Sunday lunch includes Biryani with a cold drink.',
1, '04/04/26 6:30 pm', '04/04/26 6:30 pm', 'mess_pdf');

-- Academics (from Timetable PDF)
INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Bhubaneswar', 'timetable_pdf', 'academics',
'Spring 2026, 2nd Sem. Branches: CE, CSE, EE, ECE, EP, ME',
'Academics at IIT Bhubaneswar: Spring 2026 (2nd Semester) timetable available. B.Tech branches include CE (Civil Engineering), CSE (Computer Science and Engineering), EE (Electrical Engineering), ECE (Electronics and Communication Engineering), EP (Engineering Physics), and ME (Mechanical Engineering).',
1, '04/04/26 6:32 pm', '04/04/26 6:32 pm', 'timetable_pdf');
