// Mock data for local development without Supabase

export const MOCK_AMBASSADORS = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@iitb.ac.in', phone: '9876543210', role: 'ambassador', college: 'IIT Bombay', is_active: true, created_at: '2026-03-15T10:00:00Z', upload_count: 12, approved_count: 8, pending_count: 3, rejected_count: 1, last_active: '2026-03-20T14:30:00Z' },
  { id: '2', name: 'Priya Patel', email: 'priya@nitk.edu.in', phone: '9876543211', role: 'ambassador', college: 'NIT Surathkal', is_active: true, created_at: '2026-03-16T10:00:00Z', upload_count: 8, approved_count: 5, pending_count: 2, rejected_count: 1, last_active: '2026-03-21T09:15:00Z' },
  { id: '3', name: 'Amit Kumar', email: 'amit@iitd.ac.in', phone: '9876543212', role: 'ambassador', college: 'IIT Delhi', is_active: true, created_at: '2026-03-14T10:00:00Z', upload_count: 15, approved_count: 12, pending_count: 2, rejected_count: 1, last_active: '2026-03-21T11:45:00Z' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha@nitt.edu.in', phone: '9876543213', role: 'ambassador', college: 'NIT Trichy', is_active: true, created_at: '2026-03-17T10:00:00Z', upload_count: 6, approved_count: 4, pending_count: 1, rejected_count: 1, last_active: '2026-03-19T16:20:00Z' },
  { id: '5', name: 'Karan Singh', email: 'karan@iitm.ac.in', phone: '9876543214', role: 'ambassador', college: 'IIT Madras', is_active: false, created_at: '2026-03-13T10:00:00Z', upload_count: 3, approved_count: 2, pending_count: 0, rejected_count: 1, last_active: '2026-03-18T08:00:00Z' },
  { id: '6', name: 'Ananya Gupta', email: 'ananya@nitw.ac.in', phone: '9876543215', role: 'ambassador', college: 'NIT Warangal', is_active: true, created_at: '2026-03-18T10:00:00Z', upload_count: 9, approved_count: 7, pending_count: 2, rejected_count: 0, last_active: '2026-03-21T13:00:00Z' },
];

export const MOCK_UPLOADS = [
  { id: 'u1', ambassador_id: '1', ambassador_name: 'Rahul Sharma', college_name: 'IIT Bombay', category: 'campus', caption: 'Main Building - Heritage Architecture', description: 'The iconic main building of IIT Bombay with its distinctive architecture. This is one of the most photographed spots on campus.', image_urls: ['/uploads/mock-iitb-main.jpg'], status: 'pending', review_note: null, reviewed_by: null, created_at: '2026-03-21T09:00:00Z', reviewed_at: null },
  { id: 'u2', ambassador_id: '2', ambassador_name: 'Priya Patel', college_name: 'NIT Surathkal', category: 'hostel', caption: 'Girls Hostel Block A', description: 'Newly renovated girls hostel with modern amenities. Each room has AC and attached bathroom.', image_urls: ['/uploads/mock-nitk-hostel.jpg'], status: 'pending', review_note: null, reviewed_by: null, created_at: '2026-03-21T08:30:00Z', reviewed_at: null },
  { id: 'u3', ambassador_id: '3', ambassador_name: 'Amit Kumar', college_name: 'IIT Delhi', category: 'lab', caption: 'Computer Science Lab', description: 'State-of-the-art CS lab with 200+ workstations, GPU clusters for ML research.', image_urls: ['/uploads/mock-iitd-lab.jpg'], status: 'approved', review_note: 'Great quality photos!', reviewed_by: 'admin', created_at: '2026-03-20T14:00:00Z', reviewed_at: '2026-03-20T16:00:00Z' },
  { id: 'u4', ambassador_id: '1', ambassador_name: 'Rahul Sharma', college_name: 'IIT Bombay', category: 'canteen', caption: 'Hostel 4 Mess', description: 'The famous H4 mess serving North and South Indian food. Known for its biryani on Sundays.', image_urls: ['/uploads/mock-iitb-mess.jpg'], status: 'approved', review_note: null, reviewed_by: 'admin', created_at: '2026-03-19T11:00:00Z', reviewed_at: '2026-03-19T15:00:00Z' },
  { id: 'u5', ambassador_id: '4', ambassador_name: 'Sneha Reddy', college_name: 'NIT Trichy', category: 'fest', caption: 'Festember 2025 Main Stage', description: 'The main stage during Festember cultural fest. Features performances by top artists.', image_urls: ['/uploads/mock-nitt-fest.jpg'], status: 'rejected', review_note: 'Image is too blurry, please retake', reviewed_by: 'admin', created_at: '2026-03-18T17:00:00Z', reviewed_at: '2026-03-19T10:00:00Z' },
  { id: 'u6', ambassador_id: '6', ambassador_name: 'Ananya Gupta', college_name: 'NIT Warangal', category: 'library', caption: 'Central Library Reading Hall', description: 'The central library with 24/7 reading hall access during exam season. Has 50,000+ books.', image_urls: ['/uploads/mock-nitw-lib.jpg'], status: 'pending', review_note: null, reviewed_by: null, created_at: '2026-03-21T07:00:00Z', reviewed_at: null },
  { id: 'u7', ambassador_id: '3', ambassador_name: 'Amit Kumar', college_name: 'IIT Delhi', category: 'sports', caption: 'Cricket Ground', description: 'Full-size cricket ground with floodlights for night matches. Hosts inter-IIT cricket.', image_urls: ['/uploads/mock-iitd-cricket.jpg'], status: 'revision', review_note: 'Good content but please add more photos showing the stands and pavilion', reviewed_by: 'admin', created_at: '2026-03-20T10:00:00Z', reviewed_at: '2026-03-20T12:00:00Z' },
  { id: 'u8', ambassador_id: '2', ambassador_name: 'Priya Patel', college_name: 'NIT Surathkal', category: 'campus', caption: 'Beach View from Campus', description: 'NITK is one of the few engineering colleges in India with a beach within the campus.', image_urls: ['/uploads/mock-nitk-beach.jpg'], status: 'approved', review_note: 'Beautiful shot!', reviewed_by: 'admin', created_at: '2026-03-19T08:00:00Z', reviewed_at: '2026-03-19T09:30:00Z' },
];

export const COLLEGES_LIST = [
  'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
  'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT BHU', 'IIT Indore',
  'IIT Ropar', 'IIT Patna', 'IIT Gandhinagar', 'IIT Jodhpur', 'IIT Mandi',
  'IIT Tirupati', 'IIT Palakkad', 'IIT Dharwad', 'IIT Bhilai', 'IIT Goa',
  'IIT Jammu', 'IIT Dhanbad',
  'NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'NIT Calicut', 'NIT Rourkela',
  'NIT Allahabad', 'NIT Jaipur', 'NIT Nagpur', 'NIT Kurukshetra', 'NIT Durgapur',
  'NIT Silchar', 'NIT Hamirpur', 'NIT Srinagar', 'NIT Jalandhar', 'NIT Bhopal',
  'NIT Jamshedpur', 'NIT Patna', 'NIT Raipur', 'NIT Agartala', 'NIT Meghalaya',
  'NIT Manipur', 'NIT Mizoram', 'NIT Nagaland', 'NIT Sikkim', 'NIT Arunachal',
  'NIT Uttarakhand', 'NIT Goa', 'NIT Delhi', 'NIT Puducherry', 'NIT Andhra Pradesh',
];

export const CATEGORIES = [
  { id: 'campus', label: 'Campus', icon: '🏛️' },
  { id: 'hostel', label: 'Hostel', icon: '🏠' },
  { id: 'lab', label: 'Lab', icon: '🔬' },
  { id: 'library', label: 'Library', icon: '📚' },
  { id: 'canteen', label: 'Canteen', icon: '🍽️' },
  { id: 'fest', label: 'Fest', icon: '🎉' },
  { id: 'classroom', label: 'Classroom', icon: '📝' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'other', label: 'Other', icon: '📷' },
];
