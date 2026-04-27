-- NIT Surathkal Training Data - Message-based intelligent chunks
-- Grouped by topic + timestamp, raw + cleaned text preserved
-- NOTE: Very limited data — ambassador only shared PDFs, no text about campus life
-- Personal info (name, roll, email, phone) removed

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Surathkal', 'fee_pdf', 'hostel_fee_new_admission',
'NITK Hostel Fee Structure 2025-26 B.Tech/MCA/M.Tech/MBA/M.Sc/Ph.D New Admission: Hostel Admission Fee Rs 1000, Establishment Charges: Maintenance Rs 120, Student Concession Fund Rs 150, Mess Concession Fund Rs 150, GOEM Rs 550, Students Medical Relief Fund Rs 100, V.P. Fund Rs 250, Winner-cadre overhead Rs 1000, Security Rs 20, Student Contingency Fund Rs 70, Games/T.A.S.K Fund Rs 70, Diwali Fund Rs 30, Hostel Day Celebrations Rs 70, Recreation committee Rs 130, Miscellaneous Rs 20. Total Fee Rs 3900. Mess Advance Rs 22000. Grand Total Rs 25300.',
'Hostel fee structure at NITK Surathkal for 2025-26 new admission (B.Tech/MCA/M.Tech/MBA/M.Sc/Ph.D): Hostel Admission Fee Rs 1,000. Establishment Charges total Rs 1,900 including Maintenance Rs 120, Student Concession Fund Rs 150, Mess Concession Fund Rs 150, GOEM Rs 550, Students Medical Relief Fund Rs 100, V.P. Fund Rs 250, Winner-cadre overhead Rs 1,000, Security Rs 20, Student Contingency Fund Rs 70, Games/T.A.S.K Fund Rs 70, Diwali Fund Rs 30, Hostel Day Celebrations Rs 70, Recreation committee Rs 130, Miscellaneous Rs 20. Total fee Rs 3,900. Mess Advance Rs 22,000. Grand total Rs 25,300.',
1, '05/04/26 12:08 pm', '05/04/26 12:08 pm', 'hostel_fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Surathkal', 'fee_pdf', 'hostel_fee_subsequent',
'Subsequent odd semester ~Rs 34310. Subsequent even semester ~Rs 33790.',
'Hostel fee at NITK Surathkal for subsequent semesters: Odd semesters approximately Rs 34,310 and even semesters approximately Rs 33,790. This includes mess advance and establishment charges.',
1, '05/04/26 12:08 pm', '05/04/26 12:08 pm', 'hostel_fee_pdf');

INSERT INTO training_data (college, chunk_type, topic, raw_text, cleaned_text, message_count, timestamp_start, timestamp_end, source)
VALUES ('NIT Surathkal', 'attendance_image', 'attendance_policy',
'Attendance: 75% minimum for end-semester exams. Can be relaxed up to 65% by Director. Extra 5% relaxation possible. Medical exigency can relax to 50%. Below 65% = Detained and not allowed in exam.',
'Attendance policy at NITK Surathkal: Minimum 75% attendance required for end-semester exams. The Director can relax the requirement up to 65%. An additional 5% relaxation is possible in special cases. Medical exigency allows relaxation down to 50%. Students with attendance below 65% are marked as "Detained" and are not permitted to appear for the end-semester examination.',
1, '05/04/26 12:08 pm', '05/04/26 12:08 pm', 'attendance_image');
