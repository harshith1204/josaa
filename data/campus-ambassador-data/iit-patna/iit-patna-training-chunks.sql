-- IIT Patna Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'location',
'Location: Indian Institute of Technology Patna, Bihta, Patna, Bihar 801106',
'IIT Patna (Indian Institute of Technology Patna) is located at Bihta, Patna, Bihar 801106.',
1, '04/04/26 5:52 pm', '04/04/26 5:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'transport',
'Transport: Airport via cabs/autos/buses. Railway: Bihta (nearest), Danapur, Patna Junction. Bus: Patna Bus Stand, Pataliputra Bus Stand. Ola/Uber available',
'Transport near IIT Patna: Airport is accessible via cabs, autos, and buses. Nearest railway station is Bihta. Danapur and Patna Junction are also nearby. Bus stands: Patna Bus Stand and Pataliputra Bus Stand. Ola and Uber are available.',
1, '04/04/26 5:54 pm', '04/04/26 5:54 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'restaurants',
'Restaurants: Inside campus Food Court. Bihta: Banjara, Shahi Darbar, Bihari Thaath. Cafes: Chai Sutta Bar, Momo cafes. Patna: Pista House, Barkaas',
'Restaurants near IIT Patna: Food Court inside campus. In Bihta: Banjara, Shahi Darbar, Bihari Thaath. Cafes: Chai Sutta Bar and Momo cafes. In Patna city: Pista House and Barkaas.',
1, '04/04/26 5:57 pm', '04/04/26 5:57 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'tourist',
'Tourist places: Near: Bihta surroundings, temples. Patna: Golghar, Buddha Smriti Park, Patna Museum, Marine Drive. Weekend: Rajgir, Nalanda, Bodh Gaya. Long: Sikkim, Darjeeling, Mussoorie, Rishikesh, Delhi, Jaipur, Kolkata',
'Tourist places near IIT Patna: In Bihta surroundings there are temples. In Patna: Golghar, Buddha Smriti Park, Patna Museum, Marine Drive. Weekend trips: Rajgir, Nalanda, Bodh Gaya. Long trips: Sikkim, Darjeeling, Mussoorie, Rishikesh, Delhi, Jaipur, Kolkata.',
1, '04/04/26 5:59 pm', '04/04/26 5:59 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'malls',
'Malls: P&M Mall, City Centre Patna, Vasundhara Metro Mall. Bihta: V-Mart',
'Shopping malls near IIT Patna: P&M Mall, City Centre Patna, and Vasundhara Metro Mall in Patna. V-Mart in Bihta.',
1, '04/04/26 6:01 pm', '04/04/26 6:01 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'climate',
'Climate: Summer 35-45C (heatwaves), Monsoon moderate-heavy rain, Winter 5-15C (fog), Spring/Autumn pleasant. Pretty weird and confusing',
'Climate at IIT Patna: Summers are 35-45C with heatwaves. Monsoon brings moderate to heavy rain. Winters are 5-15C with fog. Spring and Autumn are pleasant. Weather is described as pretty weird and confusing.',
1, '04/04/26 6:02 pm', '04/04/26 6:02 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'language',
'Languages: Bhojpuri, Hindi, English (campus only mostly)',
'Languages spoken around IIT Patna: Bhojpuri, Hindi, and English. English is used mostly on campus only.',
1, '04/04/26 6:03 pm', '04/04/26 6:03 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'hostels_boys',
'Boys Hostels: CV Raman (1st year boys, 3 per room), Aryabhatta A+B (2nd year boys, 2 per room), Kalam C+D (3rd/4th year boys, 2 per room)',
'Boys hostels at IIT Patna: 3 hostels total. CV Raman Hostel is for 1st year boys with 3 per room. Aryabhatta A+B is for 2nd year boys with 2 per room. Kalam C+D is for 3rd and 4th year boys with 2 per room.',
1, '04/04/26 6:05 pm', '04/04/26 6:05 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'hostels_girls',
'Girls Hostels: Aryabhatta (1st year), Asima (2nd year + 3rd/4th year)',
'Girls hostels at IIT Patna: 2 hostels. Aryabhatta Hostel is for 1st year girls. Asima Hostel is for 2nd year and 3rd/4th year girls.',
1, '04/04/26 6:06 pm', '04/04/26 6:06 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'mess',
'Mess: Each hostel has separate mess. 1st years combined in CV Raman',
'Mess at IIT Patna: Each hostel has its own separate mess. All 1st year students eat in the CV Raman mess (combined).',
1, '04/04/26 6:08 pm', '04/04/26 6:08 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'laundry',
'Laundry: Each block has separate laundry (paid from this year). External laundry "Cleanologist" outside hostel',
'Laundry at IIT Patna: Each hostel block has separate laundry facilities, which are paid from this year. An external laundry service called Cleanologist is available outside the hostel.',
1, '04/04/26 6:09 pm', '04/04/26 6:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'elections',
'Elections: For 1st/2nd/3rd years. Positions: Sports, HoSCA (culturals), SWB (Student Welfare Board), AIR (Alumni, new for 3rd to 4th), Hostel Affairs, Vice President (only for those going to 4th year, must have held position before)',
'Elections at IIT Patna: Held for 1st, 2nd, and 3rd year students. Positions include Sports Secretary, HoSCA (Head of Student Cultural Affairs), SWB (Student Welfare Board), AIR (Alumni and Industrial Relations, new position for 3rd to 4th year), Hostel Affairs Secretary, and Vice President (only for students going to 4th year who have previously held a position).',
1, '04/04/26 6:11 pm', '04/04/26 6:11 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'sports',
'Sports: Cricket, Volleyball, Badminton, Basketball, Table Tennis, Lawn Tennis, Football, Hockey, Chess, Carrom Board',
'Sports at IIT Patna: Cricket, Volleyball, Badminton, Basketball, Table Tennis, Lawn Tennis, Football, Hockey, Chess, and Carrom Board.',
1, '04/04/26 6:13 pm', '04/04/26 6:13 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'canteen',
'Canteen: Food Court (2 food shops + 1 grocery/snacks shop). Shops outside Gate 1',
'Canteen at IIT Patna: Food Court on campus with 2 food shops and 1 grocery/snacks shop. Additional shops are available outside Gate 1.',
1, '04/04/26 6:14 pm', '04/04/26 6:14 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'medical',
'Medical: Institute hospital with ambulance (far from hostels). NSMCH (Medical College Hospital) outside campus, show ID card, pay first then reimbursed via form',
'Medical facilities at IIT Patna: Institute hospital with ambulance service, though located far from hostels. NSMCH (Medical College Hospital) is outside campus where students show their ID card, pay upfront, and then get reimbursed via a form.',
1, '04/04/26 6:16 pm', '04/04/26 6:16 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'fee_pdf', 'fee_structure',
'Fee: 1st Sem Rs 1,64,750 (Indian). One-time Rs 20,000 Campus Amenities + Rs 5,000 Hostel refundable. Academic Rs 10,750, Tuition Rs 1,00,000, Hostel Rs 6,500, Other Rs 14,000, Gymkhana Rs 5,000, Transport Rs 1,500, Health Insurance Rs 2,000. International Rs 3,64,750. 2nd Sem onwards Rs 1,25,000. SC/ST/PH tuition exempted. Below 1L full remission. 1-5L 2/3rd remission.',
'Fee structure at IIT Patna: 1st semester total for Indian students is Rs 1,64,750 which includes one-time refundable deposits of Rs 20,000 (Campus Amenities) and Rs 5,000 (Hostel). Semester breakdown: Academic Rs 10,750, Tuition Rs 1,00,000, Hostel Rs 6,500, Other Institute Rs 14,000, Gymkhana Rs 5,000, Transport Rs 1,500, Health Insurance Rs 2,000. International students pay Rs 3,64,750 for 1st semester. From 2nd semester onwards Indian students pay Rs 1,25,000. SC/ST/PH students have tuition exempted. Family income below 1 lakh gets full fee remission. Family income 1-5 lakh gets 2/3rd fee remission.',
1, '04/04/26 6:18 pm', '04/04/26 6:18 pm', 'fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'attendance',
'Attendance: 75% mandatory per semester per course. Below = not eligible for exam (must do summer term). Valid medical reason accepted',
'Attendance at IIT Patna: 75% attendance is mandatory per semester per course. Students below 75% are not eligible for the exam and must complete a summer term. Valid medical reasons are accepted as exceptions.',
1, '04/04/26 6:21 pm', '04/04/26 6:21 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'wifi',
'WiFi: Available all hostels. LAN in CV Raman and Aryabhatta. Kalam has WiFi only (no LAN). 5G available. Poor network in academic departments but WiFi there',
'WiFi at IIT Patna: WiFi is available in all hostels. LAN connectivity is available in CV Raman and Aryabhatta hostels. Kalam hostel has WiFi only with no LAN. 5G network is available. Academic departments have poor mobile network but WiFi is available there.',
1, '04/04/26 6:22 pm', '04/04/26 6:22 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'fests',
'Fests: Celesta, Anwesha, Infinito, TEDx',
'Fests at IIT Patna: Celesta (tech fest), Anwesha (cultural fest), Infinito (sports fest), and TEDx.',
1, '04/04/26 6:24 pm', '04/04/26 6:24 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Patna', 'ambassador_message', 'clubs',
'Clubs - HoSCA (Cultural): Exousia, Aria, Quiz Club, Vincestroke, Yavanika, Anime Club, HOOT, Hexachrome, Pixxel, Syahi. STC (Technical): Tinkerers Lab, Robocon IITP, MoodBoard Design, Sparkonics, Astronomy & Particle Physics Club, NJACK-ML, NJACK-CP, NJACK-Dev, NJACK-CyberSec, ChessX, IITPMotorsports, Finance Club, MatES. Sports: Athletics, Badminton, Basketball, Cricket, Chess, Football, Table Tennis, Lawn Tennis, Volleyball, Squash, Weightlifting/Powerlifting, Skating',
'Clubs at IIT Patna: HoSCA (Cultural) clubs include Exousia, Aria, Quiz Club, Vincestroke, Yavanika, Anime Club, HOOT, Hexachrome, Pixxel, and Syahi. STC (Technical) clubs include Tinkerers Lab, Robocon IITP, MoodBoard Design, Sparkonics, Astronomy & Particle Physics Club, NJACK-ML, NJACK-CP, NJACK-Dev, NJACK-CyberSec, ChessX, IITPMotorsports, Finance Club, and MatES. Sports clubs include Athletics, Badminton, Basketball, Cricket, Chess, Football, Table Tennis, Lawn Tennis, Volleyball, Squash, Weightlifting/Powerlifting, and Skating.',
1, '04/04/26 6:25 pm', '04/04/26 6:25 pm', 'whatsapp');
