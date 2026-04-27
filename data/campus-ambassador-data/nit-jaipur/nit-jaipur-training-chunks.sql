-- MNIT Jaipur Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'location',
'Location: Malaviya National Institute of Technology Jaipur, JLN Marg, Malviya Nagar, Jaipur, Rajasthan 302017',
'MNIT Jaipur (Malaviya National Institute of Technology Jaipur) is located at JLN Marg, Malviya Nagar, Jaipur, Rajasthan 302017.',
1, '02/04/26 9:00 pm', '02/04/26 9:00 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'transport',
'Transport: Jaipur Junction 9km, Gandhinagar Railway 3.5km, Durgapura Railway 4km, Jaipur International Airport 5km, Sindhi Camp Bus Stand 10km, Narayan Singh Circle Bus Stop 6km',
'Transport near MNIT Jaipur: Jaipur Junction Railway Station is 9 km away. Gandhinagar Railway Station is 3.5 km away. Durgapura Railway Station is 4 km away. Jaipur International Airport is 5 km away. Sindhi Camp Bus Stand is 10 km away. Narayan Singh Circle Bus Stop is 6 km away.',
1, '02/04/26 9:03 pm', '02/04/26 9:03 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'restaurants',
'Restaurants: Hyderabadi Dum Biryani (Andhra Bhawan), Lick-a-Chick, Manpasand (veg only)',
'Nearby restaurants at MNIT Jaipur: Hyderabadi Dum Biryani (Andhra Bhawan), Lick-a-Chick, and Manpasand (vegetarian only).',
1, '02/04/26 9:07 pm', '02/04/26 9:07 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'tourist',
'Tourist places: Hawa Mahal, Jal Mahal, Nahargarh Fort, Jaigarh Fort, Marble Gate Jawahar Circle, City Palace, Jhalana Leopard Safari, Peacock Garden, Gaitor Ki Chhatriyan, Galtaji Temple (Monkey Temple)',
'Tourist places near MNIT Jaipur: Hawa Mahal, Jal Mahal, Nahargarh Fort, Jaigarh Fort, Marble Gate Jawahar Circle, City Palace, Jhalana Leopard Safari, Peacock Garden, Gaitor Ki Chhatriyan, and Galtaji Temple (Monkey Temple).',
1, '02/04/26 9:10 pm', '02/04/26 9:10 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'malls',
'Malls: GT Central, World Trade Park (WTP), Crystal Court, JTM Mall, Pink Square, Triton Mall',
'Shopping malls near MNIT Jaipur: GT Central, World Trade Park (WTP), Crystal Court, JTM Mall, Pink Square, and Triton Mall.',
1, '02/04/26 9:14 pm', '02/04/26 9:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'climate',
'Climate: Extremely high depending on season',
'Climate at MNIT Jaipur: Extremely high temperatures depending on season. Jaipur is known for very hot summers.',
1, '02/04/26 9:16 pm', '02/04/26 9:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'language',
'Language: Hindi',
'Language spoken around MNIT Jaipur: Hindi.',
1, '02/04/26 9:16 pm', '02/04/26 9:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'clubs',
'Clubs - Technical (16): Aeromodelling, Astronomy, BIS, CS Club, Consultancy, Data Science, Economics & Finances, Entrepreneurship, Infosec, Robotics, Science Club, Technical Communication House, Tinkering Lab, SAE BAJA, Zine, Codavids (Coding). Cultural (13): Drama (English+Hindi), Music, Photography, Creative Arts, Dance, Literary, Language, Debate, Quiz, Fashion, Film Making, Travel & Heritage, Limitless Ability (Inclusivity), NSS',
'Clubs at MNIT Jaipur: 16 technical clubs including Aeromodelling, Astronomy, BIS, CS Club, Consultancy, Data Science, Economics & Finances, Entrepreneurship, Infosec, Robotics, Science Club, Technical Communication House, Tinkering Lab, SAE BAJA, Zine, and Codavids (Coding). 13 cultural clubs including Drama (English+Hindi), Music, Photography, Creative Arts, Dance, Literary, Language, Debate, Quiz, Fashion, Film Making, Travel & Heritage, Limitless Ability (Inclusivity), and NSS.',
1, '02/04/26 9:20 pm', '02/04/26 9:20 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'attendance',
'Attendance: 75% minimum. FA grade (Failed due to Attendance) possible. Some profs count attendance in internal marks',
'Attendance at MNIT Jaipur: 75% minimum attendance is mandatory. Students can receive an FA grade (Failed due to Attendance) if attendance falls below the threshold. Some professors count attendance as part of internal marks.',
1, '02/04/26 9:25 pm', '02/04/26 9:25 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'wifi',
'WiFi: 10 Gbps NKN connection. Hostel WiFi 10-25 Mbps, LAN 120-130 Mbps. Central Library 24x7 WiFi. ICT Centre 24/7',
'WiFi at MNIT Jaipur: The institute has a 10 Gbps NKN (National Knowledge Network) connection. Hostel WiFi speed is 10-25 Mbps. LAN speed in hostels is 120-130 Mbps. Central Library has 24x7 WiFi. ICT Centre is available 24/7.',
1, '02/04/26 9:28 pm', '02/04/26 9:28 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'fests',
'Fests: Blitzschlag (3-day cultural, February, one of Rajasthan''s largest), Sphinx (tech+management), MICC (internal), Freshers, Dept fests, MST/Athletic Meet/Inter-Branch/Inter-NIT sports',
'Fests at MNIT Jaipur: Blitzschlag is a 3-day cultural fest held in February and is one of Rajasthan''s largest college fests. Sphinx is the technical and management fest. MICC is an internal fest. Other events include Freshers, Department fests, MST/Athletic Meet, Inter-Branch sports, and Inter-NIT sports.',
1, '02/04/26 9:32 pm', '02/04/26 9:32 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'hostels_boys',
'Boys Hostels (12): H1-Parijat, H2-Chaitanya, H3-Satpura, H4-Lohit, H5-Brihaspati, H6-Kabir, H7-Drona, H8-Varun, H9-Aurobindo, H10-PG Hostel, H15-Aravali, H16-Chandrashekhar',
'Boys hostels at MNIT Jaipur: 12 hostels total. H1-Parijat, H2-Chaitanya, H3-Satpura, H4-Lohit, H5-Brihaspati, H6-Kabir, H7-Drona, H8-Varun, H9-Aurobindo, H10-PG Hostel, H15-Aravali, and H16-Chandrashekhar.',
1, '02/04/26 9:38 pm', '02/04/26 9:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'hostels_girls',
'Girls Hostels (3): H11-Maitri, H12-Gargi, H14-Vinodini',
'Girls hostels at MNIT Jaipur: 3 hostels - H11-Maitri, H12-Gargi, and H14-Vinodini.',
1, '02/04/26 9:40 pm', '02/04/26 9:40 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'hostel_sharing',
'1st year students get 3-sharing rooms. From 2nd year onwards single rooms',
'Hostel room sharing at MNIT Jaipur: 1st year students are allotted 3-sharing rooms. From 2nd year onwards, students get single rooms.',
1, '02/04/26 9:42 pm', '02/04/26 9:42 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'mess',
'Mess: Every hostel has its own mess',
'Mess at MNIT Jaipur: Every hostel has its own mess.',
1, '02/04/26 9:44 pm', '02/04/26 9:44 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'laundry',
'Laundry: Laundry person comes twice a week',
'Laundry at MNIT Jaipur: A laundry person comes twice a week to collect and deliver clothes.',
1, '02/04/26 9:46 pm', '02/04/26 9:46 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'sports',
'Sports (14): Athletics, Badminton, Basketball, Cricket, Chess, Football, Table Tennis, Lawn Tennis, Volleyball, Weightlifting, Powerlifting, Kabaddi, Kho-Kho, Tug of War',
'Sports at MNIT Jaipur: 14 sports available including Athletics, Badminton, Basketball, Cricket, Chess, Football, Table Tennis, Lawn Tennis, Volleyball, Weightlifting, Powerlifting, Kabaddi, Kho-Kho, and Tug of War.',
1, '02/04/26 9:48 pm', '02/04/26 9:48 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'canteen',
'Canteens: Every hostel has a canteen + Central canteen',
'Canteens at MNIT Jaipur: Every hostel has its own canteen. A Central canteen is also available on campus.',
1, '02/04/26 9:50 pm', '02/04/26 9:50 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'shops',
'Shops: MNIT Shopping Complex, PMC (snacks/books/fruits/veg/xerox), Cycle shops',
'Shops on MNIT Jaipur campus: MNIT Shopping Complex, PMC (offering snacks, books, fruits, vegetables, and xerox services), and Cycle shops.',
1, '02/04/26 9:52 pm', '02/04/26 9:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'fines',
'Fines: Late physical reporting, late course registration, disciplinary fines',
'Fines at MNIT Jaipur: Students may be fined for late physical reporting, late course registration, and disciplinary violations.',
1, '02/04/26 9:54 pm', '02/04/26 9:54 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'gym',
'Gym: Institute gym, common for boys and girls',
'Gym at MNIT Jaipur: The institute gym is common for both boys and girls.',
1, '02/04/26 9:56 pm', '02/04/26 9:56 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('MNIT Jaipur', 'ambassador_message', 'health_centre',
'Medical facility: Primary Care Dispensary with Medical Officers, 2 nursing staff, Part-time Ayurvedic/Homeopathy/Gynecologist. Visiting specialists: Orthopedic, Cardiologist, Psychiatrist, Ophthalmologist, Surgeon, ENT. Free medicines for routine ailments',
'Medical facility at MNIT Jaipur: The campus has a Primary Care Dispensary with Medical Officers and 2 nursing staff. Part-time Ayurvedic, Homeopathy, and Gynecologist doctors are available. Visiting specialists include Orthopedic, Cardiologist, Psychiatrist, Ophthalmologist, Surgeon, and ENT. Free medicines are provided for routine ailments.',
1, '03/04/26 9:00 pm', '03/04/26 9:00 pm', 'whatsapp');
