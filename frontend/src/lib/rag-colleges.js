// Map choices.js institute names → RAG worker college names (must match worker corpus).
export const RAG_COLLEGE_MAP = {
  'IIITM Gwalior': 'IIIT Gwalior',
  'IIITDM Kancheepuram': 'IIIT Kancheepuram',
  'IIIT Senapati Manipur': 'IIIT Manipur',
  'MANIT Bhopal': 'NIT Bhopal',
  'NIT Karnataka, Surathkal': 'NIT Surathkal',
};

export const RAG_COLLEGES = new Set([
  'IIIT Gwalior', 'IIIT Kancheepuram', 'IIIT Manipur', 'IIITDM Jabalpur',
  'IIT Bhilai', 'IIT Bhubaneswar', 'IIT Dhanbad', 'IIT Gandhinagar', 'IIT Guwahati',
  'IIT Hyderabad', 'IIT Indore', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Madras', 'IIT Mandi', 'IIT Palakkad', 'IIT Patna',
  'MNIT Jaipur', 'NIT Agartala', 'NIT Andhra Pradesh', 'NIT Bhopal', 'NIT Calicut',
  'NIT Durgapur', 'NIT Goa', 'NIT Hamirpur', 'NIT Jalandhar', 'NIT Jamshedpur',
  'NIT Kurukshetra', 'NIT Manipur', 'NIT Nagaland', 'NIT Patna',
  'NIT Puducherry', 'NIT Rourkela', 'NIT Sikkim', 'NIT Silchar', 'NIT Srinagar',
  'NIT Surathkal', 'NIT Warangal', 'VNIT Nagpur',
]);

export function getRagCollegeName(instituteName) {
  if (!instituteName) return null;
  const mapped = RAG_COLLEGE_MAP[instituteName] || instituteName;
  return RAG_COLLEGES.has(mapped) ? mapped : null;
}
