-- NIT Patna Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'location',
'Location: old campus : nit patna - patna campus, ashok Rajpath road , near patna University, patna district, bihar - 800005 New campus: nit patna - bihta campus, Sikandarpur village, Bihta, Patna, Bihar - 801103',
'NIT Patna has two campuses. Old Campus is located at Ashok Rajpath Road, near Patna University, Patna - 800005. New Campus is at Bihta, Sikandarpur Village, Patna - 801103.',
1, '01/04/26 11:26 pm', '01/04/26 11:26 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'transport',
'Transport: by train : patna junction, patliputra junction, danapur junction Airport: jay prakash Narayan international airport, patna',
'Transport near NIT Patna: By train — Patna Junction, Patliputra Junction, Danapur Junction. By air — Jay Prakash Narayan International Airport, Patna.',
1, '01/04/26 11:29 pm', '01/04/26 11:29 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'restaurants',
'Restaurants : dominos, KFC, McDonald''s, pista house, briyani king',
'Nearby restaurants at NIT Patna: Dominos, KFC, McDonalds, Pista House, and Biryani King.',
1, '01/04/26 11:31 pm', '01/04/26 11:31 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'tourist',
'Tourist places: patna zoo , rajgir- 90km , bodhgaya - 140 km',
'Tourist places near NIT Patna: Patna Zoo, Rajgir (90 km away), and Bodh Gaya (140 km away).',
1, '01/04/26 11:33 pm', '01/04/26 11:33 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'malls',
'Malls : city center mall , gravity mall',
'Shopping malls near NIT Patna: City Center Mall and Gravity Mall.',
1, '01/04/26 11:34 pm', '01/04/26 11:34 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'climate',
'Climate: usually moderate, slightly hot during summer',
'Climate at NIT Patna: Usually moderate. Slightly hot during summer.',
1, '01/04/26 11:35 pm', '01/04/26 11:35 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'language',
'Languages: mostly hindi , bhojpuri, english',
'Languages at NIT Patna: Mostly Hindi, Bhojpuri, and English.',
1, '01/04/26 11:36 pm', '01/04/26 11:36 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'document_ocr', 'fee_structure',
'FEE_UG_2024_25_NOTIFICATION. B.Tech / B.Arch / Dual Degree. First Semester: Tuition 62500, Part B Total 94250, Grand Total 156750. Includes caution money 10000, development fee 30000, hostel fee 12000, mess advance 20000, hostel security 6000. Subsequent odd semesters ~104550. Even semesters ~104750. SC/ST/PwD exempted from tuition. Income below 1 lakh full remission. Income 1-5 lakh 2/3rd remission.',
'NIT Patna fee structure for B.Tech/B.Arch/Dual Degree (2024-25 onwards): First semester grand total is Rs 1,56,750 (Tuition Rs 62,500 + Part B Rs 94,250). Part B includes caution money Rs 10,000 (refundable), development fee Rs 30,000, hostel fee Rs 12,000, mess advance Rs 20,000, and hostel security Rs 6,000 (refundable). Subsequent odd semesters cost approximately Rs 1,04,550. Even semesters approximately Rs 1,04,750. SC/ST/PwD students are exempted from tuition fee. Income below Rs 1 lakh gets full tuition remission. Income Rs 1-5 lakh gets 2/3rd tuition remission.',
1, '01/04/26 11:47 pm', '01/04/26 11:47 pm', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'timetable',
'ECE Department TIme Table Jan-June 2026.pdf',
'NIT Patna ECE Department timetable for January-June 2026 semester is available as PDF.',
1, '01/04/26 11:55 pm', '01/04/26 11:55 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'clubs',
'Clubs : there are over 20 + clubs in the college which include both tech and cultural clubs. Coding, robotics, drama, dance, photography are some popular clubs',
'Clubs at NIT Patna: Over 20+ clubs including both tech and cultural clubs. Popular clubs include Coding, Robotics, Drama, Dance, and Photography.',
1, '02/04/26 12:48 am', '02/04/26 12:48 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'attendance',
'Attendance: 75 % attendance criteria is used',
'NIT Patna uses 75% attendance criteria.',
1, '02/04/26 12:49 am', '02/04/26 12:49 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'wifi',
'Wifi : college has high speed wifi with good coverage in both hostels and in college',
'NIT Patna has high speed WiFi with good coverage in both hostels and the college campus.',
1, '02/04/26 12:51 am', '02/04/26 12:51 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'fests',
'Fests : there will be an annual sports and cultural fest conducted every year and events will be conducted throughout the year',
'NIT Patna conducts an annual sports and cultural fest every year. Events are held throughout the year.',
1, '02/04/26 1:01 am', '02/04/26 1:01 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'hostels',
'Hostels : old campus: Boys : 6 hostels 1) kosi hostel 2) sone A hostel 3) sone B hostel 4) kosi extension hostel 5) Brahmaputra hostel 6) bagamathi hostel Girls : 1 hostel Ganga hostel',
'Hostels at NIT Patna old campus: Boys have 6 hostels — Kosi Hostel, Sone A Hostel, Sone B Hostel, Kosi Extension Hostel, Brahmaputra Hostel, and Bagmati Hostel. Girls have 1 hostel — Ganga Hostel.',
1, '02/04/26 1:06 am', '02/04/26 1:06 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'document_ocr', 'mess',
'Weekly mess schedule from images. Timing: Breakfast 7-9:30 AM, Evening 5-6 PM, Lunch 12:30-2:30 PM, Dinner 8-10 PM. Mon-Thu breakfast: Paratha/Puri/Idli/Aloo Paratha with milk tea banana sprouts. Lunch: Dal Rice Roti Sabji Bhujia Salad Fruit. Dinner: Dal/Paneer/Kheer Rice Roti Salad. Friday: Halwa+Puri breakfast, Sewai dinner. Saturday: Chole Bhature breakfast, Kadhi Pakora dinner. Sunday special: Masala Dosa/Uttapam breakfast, Veg Biryani+Kofta lunch, Manchurian+Ice Cream 80ml dinner.',
'NIT Patna mess schedule: Breakfast 7-9:30 AM, Lunch 12:30-2:30 PM, Evening snacks 5-6 PM (Tea/Coffee/Biscuits), Dinner 8-10 PM. Monday-Thursday breakfast includes Paratha, Puri, Idli, or Aloo Paratha with milk, tea, banana, and sprouts. Lunch has Dal, Rice, Roti, Sabji, Bhujia, Salad, and seasonal fruit. Dinner has Dal, Paneer, or Kheer with Rice, Roti, and Salad. Friday special: Halwa+Puri for breakfast, Sewai for dinner. Saturday special: Chole Bhature for breakfast, Kadhi Pakora for dinner. Sunday special: Masala Dosa or Uttapam for breakfast, Veg Biryani with Kofta for lunch, Manchurian with Ice Cream (80ml) for dinner. Pickles served at every meal. Minimum 3 salad items daily.',
2, '02/04/26 2:16 pm', '02/04/26 2:16 pm', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Patna', 'ambassador_message', 'laundry',
'Laundry: paid laundry available in old campus hostels In new campus washing machines are available',
'Laundry at NIT Patna: Paid laundry is available in old campus hostels. In the new campus, washing machines are available.',
1, '02/04/26 2:17 pm', '02/04/26 2:17 pm', 'whatsapp');
