-- NIT Durgapur Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'location',
'Location: National Institute of Technology Durgapur, Mahatma Gandhi Avenue, A-Zone, Bardhaman, Durgapur, West Bengal 713209',
'NIT Durgapur is located at Mahatma Gandhi Avenue, A-Zone, Bardhaman, Durgapur, West Bengal 713209.',
1, '06/04/26 7:30 pm', '06/04/26 7:30 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'transport',
'Transport: Durgapur railway station 9km, city centre bus station 2.3km, Kazi Nazrul Islam airport 16km',
'Transport near NIT Durgapur: Durgapur Railway Station (9 km), City Centre Bus Station (2.3 km), and Kazi Nazrul Islam Airport (16 km).',
1, '06/04/26 7:32 pm', '06/04/26 7:32 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'restaurants',
'Restaurants: Suvam Hotel 1.6km, Peerless 1.5km, Fortune 1.7km, Citi Residency 1.6km, Biryani by Kilo 4.6km',
'Nearby restaurants at NIT Durgapur: Suvam Hotel (1.6 km), Peerless (1.5 km), Fortune (1.7 km), Citi Residency (1.6 km), and Biryani by Kilo (4.6 km).',
1, '06/04/26 7:34 pm', '06/04/26 7:34 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'tourist',
'Tourist: Durgapur Barrage, Shiv Shakti Dam. Kolkata: Nico Park 178km, Eco Park 182km, Victoria Memorial 178km. Dhanbad: Maithon Dam 60km, Bhatinda Waterfalls 120km. Darjeeling 554km',
'Tourist places near NIT Durgapur: Durgapur Barrage and Shiv Shakti Dam nearby. Kolkata side attractions include Nico Park (178 km), Eco Park (182 km), and Victoria Memorial (178 km). Dhanbad side has Maithon Dam (60 km) and Bhatinda Waterfalls (120 km). Darjeeling is 554 km away.',
1, '06/04/26 7:36 pm', '06/04/26 7:36 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'malls',
'Malls: Junction Mall 2km, Sentrum Mall 44km, Galaxy Mall 46km',
'Shopping malls near NIT Durgapur: Junction Mall (2 km), Sentrum Mall (44 km), and Galaxy Mall (46 km).',
1, '06/04/26 7:38 pm', '06/04/26 7:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'climate',
'Climate: winter 25/13C, rainy 32/25C, summer 37/28C',
'Climate at NIT Durgapur: Winter temperatures around 25/13 C, Rainy season 32/25 C, Summer 37/28 C.',
1, '06/04/26 7:40 pm', '06/04/26 7:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'language',
'Language: Bengali first, Hindi second',
'Languages at NIT Durgapur: Bengali is the primary language, Hindi is second.',
1, '06/04/26 7:41 pm', '06/04/26 7:41 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'document_ocr', 'fee_structure',
'Fee structure from image OCR - receipt showing various charges. Hard to read but ambassador confirmed: Hostel fee Rs 19000 + Rs 5000 caution deposit.',
'NIT Durgapur fee structure: Hostel fee is Rs 19,000 per semester with an additional Rs 5,000 caution deposit. Source is image OCR of a fee receipt, confirmed by ambassador.',
1, '06/04/26 7:44 pm', '06/04/26 7:44 pm', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'attendance',
'Attendance: below 75% = 1 grade point deduction, below 50% = 2 grade deduction, below 25% = fail. Unique system!',
'Attendance at NIT Durgapur uses a unique grade-point deduction system: Below 75% attendance results in 1 grade point deduction. Below 50% results in 2 grade point deduction. Below 25% results in Fail.',
1, '06/04/26 7:47 pm', '06/04/26 7:47 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'wifi',
'WiFi: every hostel has individual WiFi with individual password/username. 100 Mbps speed',
'WiFi at NIT Durgapur: Every hostel has individual WiFi with individual password and username. Speed is 100 Mbps.',
1, '06/04/26 7:49 pm', '06/04/26 7:49 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'fests',
'Fests: Arohan (tech, October), Cultural Fest (January). Monthly club fests: Runit (Jan), Recrave (Oct), E-Summit (Feb), Verve (March)',
'Fests at NIT Durgapur: Arohan is the tech fest held in October. Cultural Fest is held in January. Monthly club fests include Runit (January), Recrave (October), E-Summit (February), and Verve (March).',
1, '06/04/26 7:52 pm', '06/04/26 7:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'hostels',
'Hostels (14 halls): H1 Netaji Subhas Chandra Bose (4th yr boys), H2 Jagadish Chandra Bose (3rd yr boys), H3 Rabindranath Tagore (4th yr boys), H4 CV Raman (MTech 2nd yr boys), H5 Swami Vivekananda (MTech 1st yr boys), H6 Rishi Aurobindo (Foreigners Girls), H7 Sister Nivedita (MTech Girls), H8 Preetilata Waddader (PhD Girls), H9 Satyendra Nath Bose (3rd yr boys), H10 Mother Teresa (1st yr girls), H11 Meghnad Saha (1st yr boys), H12 APJ Abdul Kalam International (Foreigners Boys), H13 Sarojini Naidu (2nd/3rd/4th yr girls), H14 Dr BR Ambedkar (2nd yr boys)',
'Hostels at NIT Durgapur: 14 halls total. H1 Netaji Subhas Chandra Bose Hall (4th year boys), H2 Jagadish Chandra Bose Hall (3rd year boys), H3 Rabindranath Tagore Hall (4th year boys), H4 CV Raman Hall (MTech 2nd year boys), H5 Swami Vivekananda Hall (MTech 1st year boys), H6 Rishi Aurobindo Hall (Foreigners girls), H7 Sister Nivedita Hall (MTech girls), H8 Preetilata Waddader Hall (PhD girls), H9 Satyendra Nath Bose Hall (3rd year boys), H10 Mother Teresa Hall (1st year girls), H11 Meghnad Saha Hall (1st year boys), H12 APJ Abdul Kalam International Hall (Foreigners boys), H13 Sarojini Naidu Hall (2nd/3rd/4th year girls), H14 Dr BR Ambedkar Hall (2nd year boys).',
1, '06/04/26 7:56 pm', '06/04/26 7:56 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'laundry',
'Laundry: no washing machines, self wash. Dhobi available Rs 15 per cloth',
'Laundry at NIT Durgapur: No washing machines in hostels. Students do self wash. Dhobi service is available at Rs 15 per cloth.',
1, '06/04/26 8:00 pm', '06/04/26 8:00 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'elections',
'Elections: Gymkhana - President, VP, Gen Sec, Sports Sec, Cultural Sec',
'Elections at NIT Durgapur: Gymkhana positions include President, Vice President, General Secretary, Sports Secretary, and Cultural Secretary.',
1, '06/04/26 8:04 pm', '06/04/26 8:04 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'sports',
'Sports: Football, Cricket, Kabaddi, Badminton, Kho-Kho, Yoga, Basketball, Running, Athletics, Chess, Handball',
'Sports at NIT Durgapur: Football, Cricket, Kabaddi, Badminton, Kho-Kho, Yoga, Basketball, Running, Athletics, Chess, and Handball.',
1, '06/04/26 8:07 pm', '06/04/26 8:07 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'canteen',
'Canteens/Shops: Chandu Cafe, Wonder Cafe, Spice Delight, DFC, Cafeteria, Nescafe, Techno',
'Canteens and shops on NIT Durgapur campus: Chandu Cafe, Wonder Cafe, Spice Delight, DFC, Cafeteria, Nescafe, and Techno.',
1, '06/04/26 8:10 pm', '06/04/26 8:10 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'fines',
'Fines: College fee late: Rs 20/day for 15 days, Rs 50/day after 15 days',
'Fines at NIT Durgapur: Late college fee payment is charged Rs 20 per day for the first 15 days and Rs 50 per day after 15 days.',
1, '06/04/26 8:14 pm', '06/04/26 8:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'gym',
'Gym: one gym in girls hostel (girls only), second gym (boys and girls)',
'Gym at NIT Durgapur: One gym is located in the girls hostel and is restricted to girls only. A second gym is available for both boys and girls.',
1, '06/04/26 8:17 pm', '06/04/26 8:17 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'ambassador_message', 'medical',
'Medical: 24x7, guidance, insurance card provided, Rs 90k insurance policy, Rs 10k OPD',
'Medical facility at NIT Durgapur: 24x7 availability with guidance. Insurance card is provided to students. Insurance policy covers Rs 90,000 with Rs 10,000 OPD coverage.',
1, '06/04/26 8:20 pm', '06/04/26 8:20 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Durgapur', 'document_ocr', 'mess',
'Mess menu from PDF. Mon: Puri+Matar Aloo, Fish/Kadai Paneer. Tue: Uttapam, Sambhar. Wed: Poha+Bananas, Matar Paneer/Radhabhallavi+Chicken Do Pyaza+Gulab Jamun+Cold Drink. Thu: Bread Butter+Egg. Further days in PDF.',
'NIT Durgapur mess menu: Monday breakfast is Puri with Matar Aloo, non-veg option is Fish, veg option is Kadai Paneer. Tuesday breakfast is Uttapam with Sambhar. Wednesday breakfast is Poha with Bananas, lunch includes Matar Paneer or Radhabhallavi with Chicken Do Pyaza, Gulab Jamun and Cold Drink. Thursday breakfast is Bread Butter with Egg. Full weekly menu available in the mess menu PDF.',
1, '06/04/26 8:30 pm', '06/04/26 8:30 pm', 'document_ocr');
