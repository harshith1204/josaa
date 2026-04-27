-- IIIT Gwalior - Additional knowledge chunks from Telegram export (photos/videos)
-- 48 photos + 6 videos reviewed and labelled

INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'hostels_boys', 'Hostels Boys > Aravali Chhatrawas (Aravali Hostel) is a boys hostel at IIIT Gwalior.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'hostels_boys', 'Hostels Boys > Room furniture: bed (mattress on floor), desk/table, chair, curtained window, electrical outlets, tube light.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'campus', 'Campus > IIIT Gwalior has an Open Air Theatre (OAT) — a large sandstone amphitheatre with tiered seating for events.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'campus', 'Campus > Convention hall with red carpeted stage, projector, and podium — used for events and seminars.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'campus', 'Campus > Bio diversity park is present within the campus.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'campus', 'Campus > Main gate has ABV-IIITM Gwalior signage in both Hindi and English.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'campus', 'Campus > Library building is on campus.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'campus', 'Campus > Management Studies department (Block-1) is on campus.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'sports', 'Sports > Sports complex building confirmed on campus. Football ground and tennis court available.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'mess', 'Mess > Mess hall has steel dining tables with stools, ceiling fans, spacious interior.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'medical', 'Medical > Hospital building is on campus near hostels.');
INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIIT Gwalior', 'media', 'Media > 48 campus photos and 6 campus tour videos available covering hostels, academics, mess, canteen, sports, medical, and campus areas.');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('IIIT Gwalior', 'ambassador_media_labels', 'campus_facilities',
'Hostel rooms, Boys hostel bh-1, EEE DEPARTMENT, Bh-2, OAT canteen, Sports complex, Convention hall, Football ground, Auditorium, Open air theatre, Lecture halls, + department buildings, Ivh, Mess, Tennis court, Academic buliding, Hospital, Library, Cafeteria, Bio diversity park',
'Campus facilities at IIIT Gwalior confirmed from 48 photos and 6 videos: Boys hostels BH-1 and BH-2 with hostel rooms, Aravali hostel, EEE Department building, OAT canteen, Sports complex with football ground and tennis court, Convention hall, Auditorium, Open Air Theatre (large amphitheatre), Lecture halls, Department buildings including Management Studies Block-1, IVH (International Visitors Hostel), Mess hall with steel tables, Academic building, Hospital, Library, Cafeteria, and Bio diversity park. Main gate with ABV-IIITM signage.',
20, '01/04/26 10:17 pm', '01/04/26 10:23 pm', 'telegram');
