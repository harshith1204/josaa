// All data categories that ambassadors need to collect for each college
// Derived from referncedemo2.html college profile structure

export const DATA_CATEGORIES = [
  // Academic Info
  { id: 'fee', section: 'Academic', label: 'Fee Structure', icon: '', description: 'Fee receipts, category-wise fee, semester breakdown', priority: 'high', items: ['Fee receipt photos (hide name & personal details)', 'Category-wise fee (GEN, OBC, SC, ST, EWS) + income-wise slabs for each category', 'Semester/year-wise breakdown', 'Hostel + mess fee details', 'Scholarship info'] },
  { id: 'classroom', section: 'Academic', label: 'Classrooms', icon: '📝', description: 'Classroom photos, seating capacity, facilities', priority: 'medium', items: ['Classroom photos (multiple angles)', 'Seating capacity', 'Projector/smart board availability', 'AC/ventilation status'] },
  { id: 'timetable', section: 'Academic', label: 'Timetable', icon: '📅', description: 'Sample timetable, class hours, break schedule', priority: 'medium', items: ['Sample weekly timetable photo', 'Class timings (start/end)', 'Number of lectures per day', 'Lab schedule'] },
  { id: 'library', section: 'Academic', label: 'Library', icon: '📚', description: 'Library photos, timing, book count, digital access', priority: 'medium', items: ['Library interior photos', 'Operating hours', 'Reading hall capacity', '24/7 access during exams?', 'Digital library/e-resources'] },
  { id: 'clubs', section: 'Academic', label: 'Clubs & Societies', icon: '🎭', description: 'Technical & cultural clubs, achievements', priority: 'low', items: ['List of active clubs', 'Club photos & activities', 'Notable achievements', 'How to join / recruitment process'] },
  { id: 'labs', section: 'Academic', label: 'Labs', icon: '🔬', description: 'Lab photos, equipment, research facilities', priority: 'medium', items: ['Lab photos (CS, EE, ME, etc.)', 'Equipment available', 'Research labs & specializations', 'GPU/computing clusters'] },

  // Campus Life
  { id: 'hostel', section: 'Campus Life', label: 'Hostel', icon: '🏠', description: 'Room photos, amenities, rules, allotment process', priority: 'high', items: ['Room photos (single/double/triple)', 'Common areas photos', 'Amenities (AC, WiFi, laundry, gym)', 'Hostel allotment process', 'Hostel rules & timings'] },
  { id: 'mess', section: 'Campus Life', label: 'Mess & Dining', icon: '🍽️', description: 'Menu, food photos, ratings, mess fee', priority: 'high', items: ['Daily menu (day-wise)', 'Food photos per meal', 'Mess fee per semester', 'Special diet options (veg/non-veg/Jain)', 'Student ratings & reviews'] },
  { id: 'fests', section: 'Campus Life', label: 'Fests & Events', icon: '🎉', description: 'Cultural & tech fest photos, schedule, highlights', priority: 'medium', items: ['Fest photos & videos', 'Fest schedule/dates', 'Celebrity performances/guests', 'Competitions & prizes', 'Footfall numbers'] },
  { id: 'food', section: 'Campus Life', label: 'Food Outlets', icon: '🍕', description: 'Canteens, food courts, nearby restaurants', priority: 'low', items: ['Canteen/food court photos', 'Menu & prices', 'Operating hours', 'Popular dishes & ratings', 'Nearby restaurants/cafes'] },
  { id: 'sports', section: 'Campus Life', label: 'Sports', icon: '⚽', description: 'Sports facilities, grounds, gym, tournaments', priority: 'low', items: ['Sports grounds photos', 'Gym/fitness center photos', 'Available sports facilities', 'Inter-college tournaments', 'Sports achievements'] },
  { id: 'location', section: 'Campus Life', label: 'Location & Surroundings', icon: '📍', description: 'Campus location, nearby places, connectivity', priority: 'medium', items: ['Campus gate/entrance photos', 'Nearby city/town info', 'Distance to airport/railway station', 'Local transport availability', 'Weather & climate'] },
  { id: 'transport', section: 'Campus Life', label: 'Transport', icon: '🚌', description: 'Bus routes, auto/cab availability, campus shuttle', priority: 'low', items: ['Campus bus/shuttle schedule', 'Auto/cab availability & rates', 'Nearest bus stand/metro', 'Internal campus transport'] },
  { id: 'shops', section: 'Campus Life', label: 'Shops & Services', icon: '🛒', description: 'Campus shops, ATM, medical, printing', priority: 'low', items: ['On-campus shops & services', 'ATM/bank availability', 'Medical center/hospital', 'Printing/stationery shops', 'Nearest market/mall'] },
];

export const PRIORITY_COLORS = {
  high: { bg: '#2e1a1a', color: '#ef4444', label: 'Must Have' },
  medium: { bg: '#1a1a2e', color: '#8b5cf6', label: 'Important' },
  low: { bg: '#1a2e1a', color: '#22c55e', label: 'Nice to Have' },
};
