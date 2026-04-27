const fs = require('fs');
const mediaIndex = JSON.parse(fs.readFileSync('iiit-gwalior-media-index.json','utf8'));
const r2Urls = JSON.parse(fs.readFileSync('iiit-gwalior-r2-urls.json','utf8'));

const urlMap = {};
r2Urls.forEach(r => { urlMap[r.file] = r.url; });

let sql = '';

// Telegram photos
mediaIndex.photos.forEach(p => {
  const url = urlMap[p.file] || '';
  if (!url) return;
  const caption = (p.caption || '').replace(/'/g, "''");
  sql += `INSERT INTO media_assets (media_type, caption, r2_url, duration_seconds, section) VALUES ('photo', '${caption}', '${url}', 0, '${p.section}');\n`;
});

// Telegram videos
mediaIndex.videos.forEach(v => {
  const url = urlMap[v.file] || '';
  if (!url) return;
  const caption = (v.caption || '').replace(/'/g, "''");
  sql += `INSERT INTO media_assets (media_type, caption, r2_url, duration_seconds, section) VALUES ('video', '${caption}', '${url}', 0, '${v.section}');\n`;
});

// Campus.zip items
const zipItems = [
  ['hostel_room_inside.jpg','hostels_boys','Hostel room - bed, desk, chair','photo'],
  ['hostel_room_inside1.jpg','hostels_boys','Hostel room - another angle','photo'],
  ['hostel_inside.jpg','hostels_boys','Hostel interior','photo'],
  ['hostel_corridor.jpg','hostels_boys','Hostel corridor','photo'],
  ['hostel_washroom.jpg','hostels_boys','Hostel washroom','photo'],
  ['boys_hostel.jpg','hostels_boys','Boys hostel exterior','photo'],
  ['gym_1.jpg','gym','Gym - weight machines','photo'],
  ['gym_2.jpg','gym','Gym - equipment','photo'],
  ['gym_outside.jpg','gym','Gym building exterior','photo'],
  ['swimming_pool.jpg','sports','Swimming pool - outdoor full size','photo'],
  ['cricket_ground.jpg','sports','Cricket ground','photo'],
  ['football_ground.jpg','sports','Football ground','photo'],
  ['badminton_court.jpg','sports','Badminton court','photo'],
  ['basket_ball.jpg','sports','Basketball court','photo'],
  ['volleyball_ground.jpg','sports','Volleyball ground','photo'],
  ['lawn_tennis.jpg','sports','Lawn tennis court','photo'],
  ['Table_tennis.jpg','sports','Table tennis','photo'],
  ['sports_complex.jpg','sports','Sports complex building','photo'],
  ['meal.jpeg','mess','Mess meal - puri sabji eggs banana','photo'],
  ['breakfast.jpg','mess','Breakfast at mess','photo'],
  ['classroom.jpg','academics','Classroom interior','photo'],
  ['lab.jpeg','academics','Lab facility','photo'],
  ['library.jpg','academics','Library interior','photo'],
  ['library_outside.jpg','academics','Library exterior','photo'],
  ['canteen.jpg','canteen','Canteen','photo'],
  ['main_entrance.jpg','campus','Main entrance gate','photo'],
  ['hostel_room_vid.mp4','hostels_boys','Hostel room video tour','video'],
  ['hostel_bathroom_vid.mp4','hostels_boys','Hostel bathroom video','video'],
  ['gym_vid.mp4','gym','Gym video tour','video'],
  ['football_ground_vid.mp4','sports','Football ground video','video'],
  ['badminton_vid.mp4','sports','Badminton court video','video'],
  ['library_vid.mp4','academics','Library video tour','video'],
  ['canteen_vid.mp4','canteen','Canteen video tour','video'],
  ['main_entrance_vid.mp4','campus','Main entrance video','video'],
];

zipItems.forEach(([file, section, caption, type]) => {
  const match = r2Urls.find(r => r.file && r.file.includes(file.replace('.jpg','').replace('.jpeg','').replace('.mp4','')));
  if (match) {
    sql += `INSERT INTO media_assets (media_type, caption, r2_url, duration_seconds, section) VALUES ('${type}', '${caption}', '${match.url}', 0, '${section}');\n`;
  }
});

fs.writeFileSync('iiit-gwalior-media-assets.sql', sql);
console.log('Generated ' + sql.split('\n').filter(l=>l.trim()).length + ' INSERT statements');
