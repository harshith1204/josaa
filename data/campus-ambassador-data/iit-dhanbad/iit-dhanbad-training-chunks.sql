-- IIT Dhanbad Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'location',
'Location: jharkhand, dhanbad district',
'IIT (ISM) Dhanbad is located in Dhanbad district, Jharkhand - 826004. Formerly known as Indian School of Mines, established in 1926.',
1, '01/04/26 11:18 pm', '01/04/26 11:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'transport',
'Transport Nearby railway station: dhanbad junction (4.2km) Nearby airport:ranchi (156km), kazi Nazrul airport in durgapur (90km) Nearby bus station: dhanbad bus station',
'Transport near IIT Dhanbad: By train — Dhanbad Junction Railway Station (4.2 km from campus). By air — Ranchi Airport (156 km) and Kazi Nazrul Airport in Durgapur (90 km). Dhanbad Bus Station is also nearby.',
2, '01/04/26 11:24 pm', '01/04/26 11:26 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'restaurants',
'Restaurants: Swiggy and zomato, Donne briyani house(3.5km) Champaran meat house(3km)',
'Restaurants near IIT Dhanbad: Donne Biryani House (3.5 km) and Champaran Meat House (3 km). Food delivery through Swiggy and Zomato is available.',
1, '01/04/26 11:28 pm', '01/04/26 11:28 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'tourist',
'Tourist places: Thopchanchi lake(36 km) Prasanath hills(85 km) Sita falls(26.5km) Bhatinda water falls(20.2km) Maithon dam(46Km)',
'Tourist places near IIT Dhanbad: Topchanchi Lake (36 km), Parasanath Hills (85 km), Sita Falls (26.5 km), Bhatinda Waterfalls (20.2 km), and Maithon Dam (46 km).',
1, '01/04/26 11:32 pm', '01/04/26 11:32 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'malls',
'Malls: Ozone mall(3.5km) Prabhatam(3km)',
'Shopping malls near IIT Dhanbad: Ozone Mall (3.5 km) and Prabhatam (3 km).',
1, '01/04/26 11:34 pm', '01/04/26 11:34 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'climate',
'Weather: Winter - cold very high Summer- high temperature Winter has more days',
'Climate at IIT Dhanbad: Very cold winters with a longer winter season. Very hot summers.',
1, '01/04/26 11:35 pm', '01/04/26 11:35 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'language',
'Language: hindi',
'The primary language at IIT Dhanbad is Hindi.',
1, '01/04/26 11:44 pm', '01/04/26 11:44 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'document_ocr', 'fee_structure',
'Fees (image attached). B.Tech approximate first semester total Rs 2,25,000+ includes tuition Rs 1,00,000, hostel, mess, one-time fees.',
'IIT Dhanbad fee structure for B.Tech: First semester total is approximately Rs 2,25,000+ (includes tuition fee Rs 1,00,000, hostel charges, mess charges, and one-time fees). Exact detailed breakdown pending from fee structure image.',
1, '01/04/26 11:54 pm', '01/04/26 11:54 pm', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'timetable',
'Timetable (image attached)',
'IIT Dhanbad EE Department timetable image is available for reference.',
1, '02/04/26 12:04 am', '02/04/26 12:04 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'clubs',
'Clubs,fests and sports health care timings and other mentioned (in College Directory 2024 PDF)',
'Clubs at IIT Dhanbad include ARKA (Aeronautics, 2017), Fotofreaks (Photography), RoboISM (Robotics, 2009), Abhay (Dramatics), Quiz Club (2011), LCI (Filmography), Data and Software Technology Club (formerly Cyber Labs), and Literary and Debating Club. Many more clubs listed in College Directory 2024.',
1, '02/04/26 12:08 am', '02/04/26 12:08 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'attendance',
'Attendance: no mandatory of 75 percentage',
'IIT Dhanbad does not have a mandatory 75% attendance rule. The attendance policy is more relaxed compared to other IITs and NITs.',
1, '02/04/26 12:08 am', '02/04/26 12:08 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'wifi',
'Wifi: available in campus. Wifi land has for every hostel but changes for each hostel',
'WiFi is available across the IIT Dhanbad campus. WiFi and LAN are available in every hostel, but connection details vary per hostel.',
2, '02/04/26 12:09 am', '02/04/26 12:38 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'fests',
'Clubs,fests and sports mentioned in College Directory',
'Fests at IIT Dhanbad: Khanan (Annual Geo-Mining Fest, biggest mining fest in India, 3-day summit), Srijan (Biggest Socio-Cultural Fest of Eastern India since 1977, 30,000+ footfall from 200+ colleges, prize money Rs 6 lakh+), Parakram (Annual Sports Fest), Basant (Alumni Convention), and Concetto (Annual Techno-Management Fest).',
1, '02/04/26 12:08 am', '02/04/26 12:08 am', 'directory_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'hostels',
'Hostels: every hostel has two members expect in new Rosaline(1st,2nd,3rd year)they are 3 members',
'Hostels at IIT Dhanbad: Boys have 6 hostels — Aquamarine, Jasper, Amber, Topaz, Sapphire, Diamond. Girls have 3 hostels — Emerald, Opal, Ruby & Rosaline. Every hostel has 2 members per room except New Rosaline (1st, 2nd, 3rd year) which has 3 members per room.',
1, '02/04/26 12:21 am', '02/04/26 12:21 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'mess',
'Mess:every hostel has their mess',
'Every hostel at IIT Dhanbad has its own mess.',
1, '02/04/26 12:21 am', '02/04/26 12:21 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'laundry',
'Laundry: no washing machine Dhobi s are able',
'Laundry at IIT Dhanbad: No washing machines available. Dhobis (washermen) provide laundry service.',
1, '02/04/26 12:22 am', '02/04/26 12:22 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'elections',
'Elections: it''s conducted as state elections but MLA as senate and CM as president and they are 1.president 2.chair person 3.finance convenor 4.gen sec cultural and media 5.gen sec sports 6.gen sec tech And post''s are given to senate (it''s depend on president)',
'Elections at IIT Dhanbad are conducted like state elections. MLA equivalent is Senate and CM equivalent is President. Posts include President, Chairperson, Finance Convenor, Gen Sec Cultural and Media, Gen Sec Sports, and Gen Sec Tech. Senate posts are assigned by the President.',
1, '02/04/26 12:26 am', '02/04/26 12:26 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'canteen',
'Canteen: every hostel as their seperate canteens and one maintain canteen',
'Every hostel at IIT Dhanbad has its own separate canteen. There is also one main canteen on campus.',
1, '02/04/26 12:27 am', '02/04/26 12:27 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'shops',
'Shops: hostel has shops and some shops in ground floor of library',
'Shops at IIT Dhanbad: Hostels have shops. Some shops are also located on the ground floor of the library building.',
1, '02/04/26 12:28 am', '02/04/26 12:28 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'fines',
'Fines:if mobile taken to exam (back for that sub also)but it depends on prof',
'Fines at IIT Dhanbad: If a mobile phone is taken to an exam, it results in a back paper for that subject. Enforcement depends on the professor.',
1, '02/04/26 12:32 am', '02/04/26 12:32 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'gym',
'Gym:boys had seperate gym and girls had separate gym Arrange for respective hostels',
'Gym at IIT Dhanbad: Boys have a separate gym and girls have a separate gym. Gyms are arranged for respective hostels.',
1, '02/04/26 12:33 am', '02/04/26 12:33 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Dhanbad', 'ambassador_message', 'medical',
'Medical:free if you checked by doctor',
'Medical facilities at IIT Dhanbad: Free if checked by the doctor on campus.',
1, '02/04/26 12:33 am', '02/04/26 12:33 am', 'whatsapp');
