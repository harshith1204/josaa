-- NIT Andhra Pradesh (Tadepalligudem) Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'location',
'Nit Tadepalligudem,Ganesh Nagar,west godavari,534101, Andhrapradesh',
'NIT Andhra Pradesh (NITAP) is located at Ganesh Nagar, Tadepalligudem, West Godavari, Andhra Pradesh 534101.',
1, '04/04/26 2:29 pm', '04/04/26 2:29 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'transport',
'Busstand-5km Railway station -7km Rajamundry airport-50km',
'Transport near NIT Andhra Pradesh: Bus Stand is 5 km away, Railway Station is 7 km away, and Rajahmundry Airport is 50 km away.',
3, '04/04/26 2:31 pm', '04/04/26 2:31 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'restaurants',
'Food forest,hungry birds,skygarden,kadali,ramayya mess,nayudu gari biryani All the restaurants within 6km radius',
'Nearby restaurants at NIT Andhra Pradesh: Food Forest, Hungry Birds, Sky Garden, Kadali, Ramayya Mess, and Nayudu Gari Biryani. All within 6 km radius.',
2, '04/04/26 2:33 pm', '04/04/26 2:34 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'tourist',
'Penugonda, maredumilli,antharvedi,annavaram,dwaraka tirumala,vadapalli,perupalem beach, Gouri patnam',
'Tourist places near NIT Andhra Pradesh: Penugonda, Maredumilli, Antharvedi, Annavaram, Dwaraka Tirumala, Vadapalli, Perupalem Beach, and Gouri Patnam.',
1, '04/04/26 2:35 pm', '04/04/26 2:35 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'malls',
'GV mall,chennai shopping mall Within 3km Vijetha super market,vishal mart,reliance Within 5km',
'Shopping near NIT Andhra Pradesh: GV Mall and Chennai Shopping Mall within 3 km. Vijetha Supermarket, Vishal Mart, and Reliance within 5 km.',
4, '04/04/26 2:37 pm', '04/04/26 2:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'climate',
'Mostly sunny',
'Climate at NIT Andhra Pradesh: Mostly sunny.',
1, '04/04/26 2:38 pm', '04/04/26 2:38 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'language',
'Languages-telugu mostly',
'Languages at NIT Andhra Pradesh: Telugu is mostly spoken.',
1, '04/04/26 2:39 pm', '04/04/26 2:39 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'document_ocr', 'fee_structure',
'Fee structure image. Odd Sem: Library 2400, Exam 2400, Other 2400. Tuition 62500 (Gen >5L), 20833 (1-5L), 0 (SC/ST/<1L). Even Sem similar. ARB and OEB must pay full tuition. Central Easy Pay.',
'NIT Andhra Pradesh fee structure: Odd semester fees include Library Rs 2,400, Exam Rs 2,400, Other Rs 2,400. Tuition fee is Rs 62,500 for General category (income above 5 lakh), Rs 20,833 for income 1-5 lakh, and Rs 0 for SC/ST or income below 1 lakh. Even semester has similar structure. ARB and OEB students must pay full tuition during admission and semester registration. Fee payment through Central Easy Pay.',
1, '04/04/26 2:42 pm', '04/04/26 2:42 pm', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'document_ocr', 'hostel_fee',
'Hostel fee image. 1st Year B.Tech AY 2023-24. Hostel Caution Deposit, Room charges, Establishment charges, Mess security deposit, Maintenance Rs 140/day.',
'NIT Andhra Pradesh hostel fee for 1st Year B.Tech students AY 2023-24: Includes Hostel Caution Deposit, Room Charges, Establishment Charges, and Mess Security Deposit. Daily maintenance charge is Rs 140.',
1, '04/04/26 2:49 pm', '04/04/26 2:49 pm', 'image_ocr');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'clubs',
'1.Dhvani 2.Painting and photography 3.Robotics 4.Career guidance 5.literature and debate 6.I & E cell 7.Nature club 8.Brindavanam club 9.Bhavisya bharat 10.Shilpi',
'Clubs at NIT Andhra Pradesh: Dhvani, Painting and Photography, Robotics, Career Guidance, Literature and Debate, I&E Cell, Nature Club, Brindavanam Club, Bhavisya Bharat, and Shilpi. Total 10 clubs.',
1, '04/04/26 2:50 pm', '04/04/26 2:50 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'attendance',
'Attendance mandatory 80%',
'NIT Andhra Pradesh has 80% mandatory attendance requirement.',
1, '04/04/26 2:51 pm', '04/04/26 2:51 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'wifi',
'Wifi facility available Airtel and jio -5G&4G',
'NIT Andhra Pradesh has WiFi facility available. Airtel and Jio 5G/4G connectivity also available.',
2, '04/04/26 2:52 pm', '04/04/26 2:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'fests',
'Odd sem -techkriya(September or October) Even sem-vulcanzy(February)',
'Fests at NIT Andhra Pradesh: Odd semester has Techkriya (September/October). Even semester has Vulcanzy (February).',
1, '04/04/26 2:52 pm', '04/04/26 2:52 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'girls_hostels',
'Girls AMRUTHA mess No of hostels blocks -5 Krishnaveni - for 1st years=4 per room Bhima for 2nd years -2 per room Tungabhadra for 3rd years -2 per room Ghata prabha for 4th years - 1 per room Munneru for both 4th years and PHD''s -1per room',
'Girls hostels at NIT Andhra Pradesh: 5 hostel blocks. Krishnaveni for 1st years (4 per room), Bhima for 2nd years (2 per room), Tungabhadra for 3rd years (2 per room), Ghata Prabha for 4th years (1 per room), Munneru for 4th years and PhD (1 per room). Girls mess is Amrutha Mess.',
1, '04/04/26 3:03 pm', '04/04/26 3:03 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'laundry',
'Available of Dhobi And dhobi ghaat (clothes washing area)',
'Laundry at NIT Andhra Pradesh: Dhobi (washerman) available. Dhobi Ghaat (clothes washing area) also available on campus.',
1, '04/04/26 3:05 pm', '04/04/26 3:05 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'sports',
'Cricket, badminton, football, basketball, kabbadi, Kho -kho,chess, tennis,carroms,tug of war, weight lifting',
'Sports at NIT Andhra Pradesh: Cricket, Badminton, Football, Basketball, Kabaddi, Kho-Kho, Chess, Tennis, Carroms, Tug of War, and Weightlifting.',
1, '04/04/26 3:07 pm', '04/04/26 3:07 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'canteen',
'Canteen -1 (Dokka Seethamma canteen) timings 9 am to 10 pm Shops - fast food, stationery,',
'NIT Andhra Pradesh has one canteen: Dokka Seethamma Canteen, open from 9 AM to 10 PM. Campus shops include fast food and stationery.',
1, '04/04/26 3:09 pm', '04/04/26 3:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'fines',
'Late registration fines Starts from 500 Usage of Kettle fine 10000 to 20000 Alcohol consumption - suspension a week or fine 10000 to 30000',
'Fines at NIT Andhra Pradesh: Late registration fine starts from Rs 500. Kettle usage fine is Rs 10,000 to Rs 20,000. Alcohol consumption results in fine of Rs 10,000 to Rs 30,000 plus suspension for a week.',
3, '04/04/26 3:11 pm', '04/04/26 3:11 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'gym',
'Common gym not free',
'NIT Andhra Pradesh has a common gym available. It is not free.',
1, '04/04/26 3:12 pm', '04/04/26 3:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'elections',
'No elections',
'NIT Andhra Pradesh does not have student elections.',
1, '04/04/26 3:12 pm', '04/04/26 3:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'medical',
'Dispensary walkable distance With free of cost',
'NIT Andhra Pradesh has a dispensary within walkable distance from campus. Medical services are free of cost.',
1, '04/04/26 3:12 pm', '04/04/26 3:12 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'ambassador_message', 'boys_hostels',
'Vamsadhara Hall of residence -1 st yr (4 mem) Nagavalli hall of residence -2nd yr(2) Indravati hall of residence, Sabari hall of residence -3 rd yr(2) Godavari Purna Manjeera Banganga Pranahitha 4 th yr Swarna mukhi - phd scholars',
'Boys hostels at NIT Andhra Pradesh: Vamsadhara (1st year, 4 per room), Nagavalli (2nd year, 2 per room), Indravati and Sabari (3rd year, 2 per room), Godavari, Purna, Manjeera, Banganga, and Pranahitha (4th year, 1 per room), Swarna Mukhi (PhD scholars). Total 10 boys hostels.',
4, '04/04/26 7:07 pm', '05/04/26 2:28 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Andhra Pradesh', 'document_ocr', 'mess_schedule',
'Amrutha Mess schedule images (boys and girls). Full 7-day schedule with breakfast, lunch, snacks, dinner. Official mess menu with stamps.',
'NIT Andhra Pradesh mess schedule: Full 7-day menu available for both boys and girls mess. Amrutha Mess is the girls mess. Schedule covers breakfast, lunch, snacks, and dinner for each day of the week. Official menu with institutional stamps.',
2, '04/04/26 3:04 pm', '04/04/26 7:07 pm', 'image_ocr');
