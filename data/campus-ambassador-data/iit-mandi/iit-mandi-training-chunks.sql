-- IIT Mandi Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'transport',
'transportation: Chandigarh Airport then bus to ISBT Mandi',
'Transport to IIT Mandi: Nearest airport is Chandigarh Airport. From Chandigarh Airport, take a bus to ISBT Mandi to reach the campus.',
1, '04/04/26 9:18 pm', '04/04/26 9:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'restaurants',
'restaurants: Himalayan Cafe, Babaji Dhaba. NO Swiggy/Zomato',
'Restaurants near IIT Mandi: Himalayan Cafe and Babaji Dhaba. NO Swiggy or Zomato delivery available.',
1, '04/04/26 9:20 pm', '04/04/26 9:20 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'tourist',
'tourist places: Parashar Lake, Manali, Kullu',
'Tourist places near IIT Mandi: Parashar Lake, Manali, and Kullu.',
1, '04/04/26 9:22 pm', '04/04/26 9:22 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'climate',
'Climate: More like rainy',
'Climate at IIT Mandi: More like rainy climate.',
1, '04/04/26 9:25 pm', '04/04/26 9:25 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'language',
'Language: Hindi and Telugu are more',
'The more commonly spoken languages at IIT Mandi are Hindi and Telugu.',
1, '04/04/26 9:26 pm', '04/04/26 9:26 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'document_ocr', 'fee_structure',
'fee structure (PDF attached). Below 1 lakh annual income Rs 50,000/sem, Above 5 lakh Rs 1,50,000/sem. SC/ST/PH 100% tuition exemption. Continuation fee Rs 2,000/sem for semester break.',
'IIT Mandi fee structure: Annual income below Rs 1 lakh — Rs 50,000 per semester. Annual income above Rs 5 lakh — Rs 1,50,000 per semester. SC/ST/PH get 100% tuition fee exemption. Continuation fee of Rs 2,000 per semester for semester break.',
1, '04/04/26 9:30 pm', '04/04/26 9:30 pm', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'image_ocr', 'timetable',
'timetable (image attached). Classes 10:00-11:00, 10:00-1:00 PM, 11:00-11:00 AM, 12:00-1:00 PM, 2:00-5:00 PM (labs). Subjects: Mechanics (IC-121), Applied Electronics (IC-161), Complex Calculus (IC-113), Prob & Stats (IC-203), Calc & Integral (IC-119), Graphics for Design (IC-148), Design Practicum (IC-107P). Labs: Prob & Stats Lab (IC-203P), Electronics Lab (IC-161P), Graphics Lab (IC-148P), Design Practicum (IC-107P). Mon-Fri schedule.',
'IIT Mandi timetable: Mon-Fri schedule. Class timings — 10:00-11:00 AM, 11:00 AM-12:00 PM, 12:00-1:00 PM, 2:00-5:00 PM (labs). Subjects: Mechanics (IC-121), Applied Electronics (IC-161), Complex Calculus (IC-113), Probability and Statistics (IC-203), Calculus and Integral (IC-119), Graphics for Design (IC-148), Design Practicum (IC-107P). Labs: Prob & Stats Lab (IC-203P), Electronics Lab (IC-161P), Graphics Lab (IC-148P), Design Practicum (IC-107P).',
1, '04/04/26 9:35 pm', '04/04/26 9:35 pm', 'timetable_image');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'clubs',
'Clubs: HNT, PMC, ART GEEKS, Drama, Dance, Robotronics',
'Clubs at IIT Mandi: HNT, PMC, ART GEEKS, Drama, Dance, and Robotronics.',
1, '04/04/26 9:40 pm', '04/04/26 9:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'attendance',
'attendance: 80% mandatory',
'Attendance at IIT Mandi: 80% attendance is mandatory.',
1, '04/04/26 9:42 pm', '04/04/26 9:42 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'wifi',
'Wifi: 5G Wi-Fi network',
'WiFi at IIT Mandi: 5G Wi-Fi network available on campus.',
1, '04/04/26 9:43 pm', '04/04/26 9:43 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'fests',
'Fests: Exodia, Raneeti, Expecto',
'Fests at IIT Mandi: Exodia, Raneeti, and Expecto.',
1, '04/04/26 9:45 pm', '04/04/26 9:45 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'hostels',
'Hostel Boys: Dashir, Sulvalsar, Surajtal. Girls: Gauri Kund, Beaskund. Total 972 rooms, 1398 student capacity. 1st year 4 per room, remaining 1 or 2 sharing',
'Hostels at IIT Mandi: Boys have 3 hostels — Dashir, Sulvalsar, Surajtal. Girls have 2 hostels — Gauri Kund, Beaskund. Total 972 rooms with 1398 student capacity. 1st year students have 4 per room, remaining years have 1 or 2 sharing.',
1, '04/04/26 9:50 pm', '04/04/26 9:50 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'mess',
'mess: 5 messes - Alder, Peepal, Tulasi, Oak, Pine',
'Mess at IIT Mandi: 5 messes available — Alder, Peepal, Tulasi, Oak, and Pine.',
1, '04/04/26 9:52 pm', '04/04/26 9:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'laundry',
'Laundry: Free, each hostel has 2 washing machines',
'Laundry at IIT Mandi: Free laundry service. Each hostel has 2 washing machines.',
1, '04/04/26 9:55 pm', '04/04/26 9:55 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'sports',
'Sports: Volleyball, Football, Hockey, Basketball, Badminton, Swimming, Cricket',
'Sports facilities at IIT Mandi: Volleyball, Football, Hockey, Basketball, Badminton, Swimming, and Cricket.',
1, '04/04/26 10:00 pm', '04/04/26 10:00 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'canteen',
'canteen: Monal, Parakeet, Drongo. All timings 11AM-1AM',
'Canteen at IIT Mandi: 3 canteens — Monal, Parakeet, and Drongo. All open from 11 AM to 1 AM.',
1, '04/04/26 10:05 pm', '04/04/26 10:05 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'shops',
'Shops: Supermarket, Redstarter (main shops)',
'Shops at IIT Mandi: Supermarket and Redstarter are the main shops on campus.',
1, '04/04/26 10:08 pm', '04/04/26 10:08 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'fines',
'Fines: Smoking/Drinking Rs 2,000-10,000. Ragging Rs 10,000',
'Fines at IIT Mandi: Smoking or drinking attracts a fine of Rs 2,000 to Rs 10,000. Ragging attracts a fine of Rs 10,000.',
1, '04/04/26 10:12 pm', '04/04/26 10:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'gym',
'Gym: Different gyms for boys and girls. Morning 6-8, Evening 7-10. NOT free',
'Gym at IIT Mandi: Different gyms for boys and girls. Morning timing 6 AM to 8 AM, evening timing 7 PM to 10 PM. Gym is NOT free.',
1, '04/04/26 10:15 pm', '04/04/26 10:15 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Mandi', 'ambassador_message', 'medical',
'Medical: Campus hospital, medical charges included in fees',
'Medical at IIT Mandi: Campus hospital available. Medical charges are included in the fees.',
1, '04/04/26 10:20 pm', '04/04/26 10:20 pm', 'whatsapp');
