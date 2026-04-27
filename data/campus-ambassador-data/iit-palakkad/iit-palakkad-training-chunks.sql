-- IIT Palakkad Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'location',
'Location Kanjikode, Palakkad, Kerala (Pin: 678623)',
'IIT Palakkad is located at Kanjikode, Palakkad, Kerala - 678623.',
1, '04/04/26 9:11 pm', '04/04/26 9:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'transport',
'Near by local railway station : kanjikode Near by airport: Coimbatore Main railway station: Palakkad junction',
'Transport near IIT Palakkad: Local railway station — Kanjikode. Main railway station — Palakkad Junction. Nearest airport — Coimbatore.',
3, '04/04/26 9:13 pm', '04/04/26 9:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'restaurants',
'Near by resturant: ginger, malabar Swiggy, Zomato are available But not Instamart',
'Restaurants near IIT Palakkad: Ginger and Malabar. Swiggy and Zomato delivery available. Instamart not available.',
3, '04/04/26 9:15 pm', '04/04/26 9:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'tourist',
'Tourist places: Malampuzha Dam, Palakkad Fort',
'Tourist places near IIT Palakkad: Malampuzha Dam and Palakkad Fort.',
1, '04/04/26 9:17 pm', '04/04/26 9:17 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'malls',
'Malls are under construction',
'Shopping malls near IIT Palakkad are currently under construction.',
1, '04/04/26 9:18 pm', '04/04/26 9:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'climate',
'Mostly rainy season during mid may to September and normal summer during February to April ending, remaining time winter not to much cold',
'Climate at IIT Palakkad: Rainy season from mid May to September. Summer from February to April end. Remaining months are winter, not too cold.',
1, '04/04/26 9:20 pm', '04/04/26 9:20 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'language',
'Local language in college: 1 . Telugu 2 . Malayalam 3 . Hindi 4 . Tamil',
'Languages spoken at IIT Palakkad: Telugu, Malayalam, Hindi, and Tamil.',
1, '04/04/26 9:21 pm', '04/04/26 9:21 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'document_ocr', 'fee_structure',
'fee structure (PDF attached). B.Tech Mechanical Engineering. Registration Enrollment Fee 300, Examination Fee 500, Tuition Fee 100000, Hostel Seat Rent 6500, Electricity Water and SWD 1200. Total 108500. Mess fee : 35,000',
'IIT Palakkad fee structure for B.Tech: Registration Enrollment Rs 300, Examination Rs 500, Tuition Rs 1,00,000, Hostel Seat Rent Rs 6,500, Electricity Water and SWD Rs 1,200. Total Rs 1,08,500. Mess fee Rs 35,000 paid separately.',
2, '04/04/26 9:22 pm', '04/04/26 9:23 pm', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'clubs',
'Grafica, the arts club of IIT Palakkad, Vadya The Music Club of IIT Palakkad, Sync To Beat "Where Rhythm Meets Expression" at IIT Palakkad, Lifestyle Club, Yogshala (Yoga Club), Athletics Club, Yet Another Coding Club (YACC), The Robotics Club (TRC), Data Analysis Club (DAC), Finance Club Astronomy Club, Y-DYUTHI the Electrical and Electronics Club',
'Clubs at IIT Palakkad: Cultural — Grafica (Arts), Vadya (Music), Sync To Beat (Dance), Lifestyle Club, Yogshala (Yoga), Athletics Club. Technical — YACC (Coding), TRC (Robotics), DAC (Data Analysis), Finance Club, Astronomy Club, Y-DYUTHI (Electrical and Electronics).',
1, '04/04/26 9:28 pm', '04/04/26 9:28 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'attendance',
'85 % mandatory attandance',
'Attendance at IIT Palakkad: 85% mandatory attendance.',
1, '04/04/26 9:29 pm', '04/04/26 9:29 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'wifi',
'Wi fi : 5g and lan connection',
'WiFi at IIT Palakkad: 5G and LAN connection available.',
1, '04/04/26 9:30 pm', '04/04/26 9:30 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'fests',
'Major feast:Petrichor',
'Major fest at IIT Palakkad: Petrichor.',
1, '04/04/26 9:31 pm', '04/04/26 9:31 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'hostels',
'For 1 st years: 2 hostels Brindavani - boys Tilang - girls For remaining years: 2 hostels Malhar, saveri combined for boys and girls',
'Hostels at IIT Palakkad: 1st year boys — Brindavani. 1st year girls — Tilang. Remaining years — Malhar and Saveri (combined for boys and girls). 4 hostels total.',
1, '04/04/26 9:35 pm', '04/04/26 9:35 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'elections',
'(image attached) Final list of candidates contesting. 10 positions: Students General Secretary x2, Academic Affairs Secretary, Media and Cultural Affairs Secretary, Hostel Affairs Secretary x2, Sports Affairs Secretary, Technical Affairs Secretary, Post Graduate Affairs Secretary, Research Affairs Secretary',
'Elections at IIT Palakkad: 10 positions — Students General Secretary (x2), Academic Affairs Secretary, Media and Cultural Affairs Secretary, Hostel Affairs Secretary (x2), Sports Affairs Secretary, Technical Affairs Secretary, Post Graduate Affairs Secretary, Research Affairs Secretary.',
1, '04/04/26 9:37 pm', '04/04/26 9:37 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'laundry',
'For every Hostel there is separate washing machine room which is free',
'Laundry at IIT Palakkad: Free washing machines available in every hostel. Each hostel has a separate washing machine room.',
1, '04/04/26 9:38 pm', '04/04/26 9:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'sports',
'Outdoor: Cricket grounds, football ground, basketball court, and volleyball court. Indoor: Badminton courts, table tennis, and chess.',
'Sports facilities at IIT Palakkad: Outdoor — Cricket ground, Football ground, Basketball court, Volleyball court. Indoor — Badminton courts, Table Tennis, Chess.',
1, '04/04/26 9:43 pm', '04/04/26 9:43 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'canteen',
'Amul , Nescafe and 3 local canteen Nescafe: 9 am to 12 pm Amul: 10 am to 7 pm Local canteen: 8 am to 12 pm',
'Canteen at IIT Palakkad: Amul (10 am to 7 pm), Nescafe (9 am to 12 pm), and 3 local canteens (8 am to 12 pm).',
2, '04/04/26 9:44 pm', '04/04/26 9:45 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'shops',
'New city mart , ezee mart',
'Shops near IIT Palakkad: New City Mart and Ezee Mart.',
1, '04/04/26 9:46 pm', '04/04/26 9:46 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'fines',
'Coming late to college after sem holiday per day 500 /-',
'Fines at IIT Palakkad: Rs 500 per day for coming late to college after semester holiday.',
1, '04/04/26 9:48 pm', '04/04/26 9:48 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'gym',
'2 gyms all are free, for both boys and girls',
'Gym at IIT Palakkad: 2 gyms available, all free, for both boys and girls.',
1, '04/04/26 9:49 pm', '04/04/26 9:49 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Palakkad', 'ambassador_message', 'medical',
'We have Medical insurance so maximum more than 100 hospital are free all over india',
'Medical at IIT Palakkad: Medical insurance provided. Covers 100+ hospitals all over India, free of cost.',
1, '04/04/26 9:50 pm', '04/04/26 9:50 pm', 'whatsapp');
