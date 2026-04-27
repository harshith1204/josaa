-- IIT Kanpur Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'transport',
'Location: IIT Kanpur, Kalyanpur, Uttar Pradesh 208016
Transport:
Kanpur Central Railway Station ~18kms
Chakeri Airport~20kms
Jagarkati Bus stop~ 15km',
'IIT Kanpur is located in Kalyanpur, Uttar Pradesh 208016. Kanpur Central Railway Station is approximately 18 km away. Chakeri Airport is approximately 20 km away. Jagarkati Bus Stop is approximately 15 km away.',
2, '03/04/26 11:57 am', '03/04/26 11:58 am', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'canteen',
'Swiggy, Zomato
In Campus:
Mama meow
Tadka Restaurant
Chai Pani Resturant
Campus Restuarant
Cafe Coffee Day
Starbucks
Burger Singh
Subway
Dominos Pizza',
'Food delivery apps Swiggy and Zomato are available at IIT Kanpur. On-campus restaurants include Mama Meow, Tadka Restaurant, Chai Pani Restaurant, Campus Restaurant, Cafe Coffee Day, Starbucks, Burger Singh, Subway, and Dominos Pizza.',
1, '03/04/26 12:03 pm', '03/04/26 12:03 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'tourist_places',
'Tourist Places:
Zoological Park
Blueworld Park
Ganga barrage
Agra
Ayodhya
Vrindavan
Varanasi',
'Tourist places near IIT Kanpur include Zoological Park, Blueworld Park, Ganga Barrage, Agra, Ayodhya, Vrindavan, and Varanasi.',
1, '03/04/26 12:06 pm', '03/04/26 12:06 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'malls',
'Malls:
Z Square
Max
Vishal Mart
Rave Moti Mall',
'Malls near IIT Kanpur: Z Square, Max, Vishal Mart, and Rave Moti Mall.',
1, '03/04/26 12:07 pm', '03/04/26 12:07 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'climate',
'Climate:
Winter less than 6°C
Summer greater than 45°C',
'IIT Kanpur has extreme weather. Winters go below 6°C and summers exceed 45°C.',
1, '03/04/26 12:09 pm', '03/04/26 12:09 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'language',
'Languages:
Mostly Hindi
English',
'The primary language at IIT Kanpur is Hindi. English is also widely used.',
1, '03/04/26 12:10 pm', '03/04/26 12:10 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'fee_structure',
'Apart from this mess and electricity bills
~4000 per month',
'At IIT Kanpur, mess and electricity bills combined cost approximately Rs 4000 per month, in addition to the semester fee.',
1, '03/04/26 12:11 pm', '03/04/26 12:11 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'clubs',
'Clubs:
Find all the clubs here
Anime Society, Book Club, Dance Club (Krazzy O''ve Sync), Debating Society, Design And Animation Club, Dramatics Club (Fursat Mandli), English Literary Society, Fine Arts Club, Film Club, Hindi Sahitya Sabha, Humour House, Music Club, Photography Club, Quiz Club, Student Film Society
Robotics club, Areo modeling club, Skating Club, Motorsport club',
'Cultural clubs at IIT Kanpur include Anime Society, Book Club, Dance Club (Krazzy O''ve Sync), Debating Society, Design and Animation Club, Dramatics Club (Fursat Mandli), English Literary Society, Fine Arts Club (FAC), Film Club, Hindi Sahitya Sabha, Humour House, Music Club, Photography Club, Quiz Club, and Student Film Society. Technical and sports clubs include Robotics Club, Aero Modeling Club, Skating Club, and Motorsport Club.',
3, '03/04/26 12:14 pm', '03/04/26 12:15 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'attendance',
'Attendence:
Not Mandatory for all courses, depends on the professors
Min Attendence required to appear in Semester Exam''s ~75%',
'Attendance at IIT Kanpur is not mandatory for all courses and depends on the professor. However, a minimum of approximately 75% attendance is required to appear in semester exams.',
2, '03/04/26 12:15 pm', '03/04/26 12:17 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'wifi',
'Wifi
Iitk 5g
and 4G available 90% around the campus',
'IIT Kanpur has IITK 5G WiFi and 4G connectivity available across approximately 90% of the campus.',
1, '03/04/26 12:18 pm', '03/04/26 12:18 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'fests',
'1. Udghosh Sports festival during October
2. Antaragni cultural festival during October or November
3. Teckrithi Tech festival during March
4. E-Summit mostly Feb/March
Freshers
Galaxy,
Inferno
Among Halls',
'Major fests at IIT Kanpur: Udghosh (sports festival, October), Antaragni (cultural festival, October/November), Techkriti (tech festival, March), and E-Summit (entrepreneurship, February/March). Freshers events include Galaxy and Inferno, held among halls.',
4, '03/04/26 12:21 pm', '03/04/26 12:22 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'hostels',
'Total 15 Halls
3 Girls and rest are boys
Girls:
Hall 4 (Double/Single)-1st Year
Hall 6 (Double/Single) -2,3,4 Years
Girls Hostel 1 (Double/Single) PG and higher studies
Boys:
Hall 1, 4th Year higher responsibility students like General Secretary, Organizer,..
Hall 2 -2nd  and 3rd Year
Hall 3-2nd  and 3rd Year
Hall 5-2nd  and 3rd Year
Hall 7-4th year
Hall 8-PhD higher education
Hall 9-4th year
Hall 10-phD
Hall 11-4th year
Hall 12-2nd  and 3rd Year
Hall 13- 1st years
Hall 14 -PG Mtech
Hall 13,12,5,3,2
Double/Triple for 2nd/3rd year
Rest halls are single sharing
Hall 12-for 3rd year students
Single and Double Sharing',
'IIT Kanpur has 15 halls of residence — 3 for girls and 12 for boys. Girls hostels: Hall 4 for 1st year (double/single sharing), Hall 6 for 2nd-4th year (double/single), Girls Hostel 1 for PG. Boys hostels: Hall 13 for 1st years, Halls 2, 3, 5 for 2nd-3rd year, Hall 12 for 3rd year (single/double), Halls 7, 9, 11 for 4th year, Hall 1 for senior responsibility holders, Halls 8, 10 for PhD, Hall 14 for PG/MTech. Halls 13, 12, 5, 3, 2 have double/triple sharing. Other halls are single sharing.',
8, '03/04/26 12:22 pm', '03/04/26 12:37 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'campus_facilities',
'All halls have canteens, stationary, printout,
All Boys halls have Barbour shops
DOAA Canteen 24hrs open
Late Academic or Pre-Registration fine 2k or 2.5k
Combine gym available for all
Most of the halls have gym facilities free of cost
Old Sports Complex:
Gym
Skating Rink
Tennis
Vollyball
Basketball
Gym is paid on the month basis /semester /yearly
For students-350/- per month',
'All halls at IIT Kanpur have canteens, stationery shops, and printout facilities. All boys halls have barber shops. The DOAA Canteen is open 24 hours. Late academic or pre-registration fine is Rs 2000-2500. A combined gym is available for all students. Most halls have gym facilities free of cost. The Old Sports Complex has a gym, skating rink, tennis, volleyball, and basketball courts. The gym costs Rs 350 per month for students, with monthly, semester, or yearly payment options.',
7, '03/04/26 12:38 pm', '03/04/26 12:42 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'medical',
'Health Centre: 24hrs
An insurance will be added in semester so medical charges not required to pay
Free of cost
Ambulances available in case of emergency
In emergency,If you are  admitted outside of the campus, upto 1Lakh will get reimbursed upon bills submission',
'IIT Kanpur Health Centre is open 24 hours and is free of cost for students as insurance is included in the semester fee. Ambulances are available for emergencies. If admitted to a hospital outside campus, up to Rs 1 lakh is reimbursed upon bill submission.',
2, '03/04/26 12:44 pm', '03/04/26 12:45 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'laundry',
'Laundry:
In all halls Dhobi available comes to every rooms
Washing machines
1 Common Laundry Available for all',
'Laundry at IIT Kanpur: Dhobi service is available in all halls and comes to every room. Washing machines are available, and there is 1 common laundry facility accessible to all students.',
1, '03/04/26 12:30 pm', '03/04/26 12:30 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'sports',
'Old Sports Complex:
Gym, Skating Rink, Tennis, Vollyball, Basketball
Evening Halls have indore games like
Table tennis
Carrom
Chess
Also
Volleyball
Cricket Ground
Basketball in some of the halls',
'The Old Sports Complex at IIT Kanpur has gym, skating rink, tennis, volleyball, and basketball facilities. Halls have indoor games including table tennis, carrom, and chess. Outdoor facilities at halls include volleyball courts, cricket grounds, and basketball courts in some halls.',
2, '03/04/26 12:41 pm', '03/04/26 12:46 pm', 'whatsapp');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIT Kanpur', 'ambassador_message', 'mess_menu',
'Mess Menu of Hall Of Residence-12 (APRIL 2026). Daily items: Bread, Jam, Butter, Milk, Egg (2pcs), Tea, Dalia, Cornflakes for breakfast. Roti, Rice, Pickle, Raita for lunch and dinner. Chicken Fried Rice available daily. Monday: Aloo Pyaz Paratha, Dum Aloo, Dal Makhani, Butter Chicken, Veg Biryani. Tuesday: Khasta Kachori, Paratha, Egg Biryani, Chhola Kulcha. Wednesday: Uttapam Sambhar, Rajma, Baigan Bharta, Chicken Bharra, Kadhai Paneer. Thursday: Bombay Sandwich, Paneer Cutlet, Chilli Chicken, Fish Finger. Friday: Indori Poha Jalebi, Fish Curry, Paneer Kathi Roll, Chicken Biryani. Saturday: Idli Wada Sambhar, Paneer Khurchan, Chicken Malai Tikka. Sunday: Mysore Dosa, Tawa Fish, Paneer/Chicken Korma, Gulab Jamun.',
'Mess menu for Hall 12, IIT Kanpur (April 2026): Daily breakfast includes bread, jam, butter, milk, eggs, tea, dalia, and cornflakes. Lunch and dinner include roti, rice, pickle, raita. Chicken fried rice is available daily. Highlights: Monday has Aloo Pyaz Paratha and Butter Chicken. Tuesday has Khasta Kachori and Egg Biryani. Wednesday has Uttapam with Sambhar and Chicken Bharra. Thursday has Bombay Sandwich and Chilli Chicken. Friday has Indori Poha with Jalebi and Chicken Biryani. Saturday has Idli-Wada-Sambhar and Chicken Malai Tikka. Sunday has Mysore Dosa and Paneer/Chicken Korma with Gulab Jamun.',
1, '03/04/26 2:03 pm', '03/04/26 2:03 pm', 'pdf_ocr');
