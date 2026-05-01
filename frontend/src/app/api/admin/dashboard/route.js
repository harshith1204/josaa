import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const OWNER_EMAIL = 'harshithsai24@gmail.com';

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function verifyOwner(token) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  const { data: { user } } = await client.auth.getUser(token);
  return user?.email === OWNER_EMAIL ? user : null;
}

// GET /api/admin/dashboard
// Returns aggregated stats + per-college media counts and placement years.
export async function GET(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'Service role key not configured' }, { status: 503 });

  const [collegesRes, placementsRes, mediaRes, usersRes] = await Promise.all([
    sb.from('colleges').select('college_id, name, short_name, type, state, zone, updated_at').order('name'),
    sb.from('college_placements').select('college_id, year'),
    sb.from('college_media').select('college_id, category, media_type'),
    sb.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ]);

  if (collegesRes.error) return NextResponse.json({ error: collegesRes.error.message }, { status: 500 });
  if (placementsRes.error) return NextResponse.json({ error: placementsRes.error.message }, { status: 500 });
  if (mediaRes.error) return NextResponse.json({ error: mediaRes.error.message }, { status: 500 });

  const colleges = collegesRes.data ?? [];
  const placements = placementsRes.data ?? [];
  const media = mediaRes.data ?? [];
  const totalUsers = usersRes.data?.users?.length ?? 0;

  // Build placement years map: college_id → sorted year[]
  const placementMap = {};
  for (const { college_id, year } of placements) {
    if (!placementMap[college_id]) placementMap[college_id] = [];
    placementMap[college_id].push(year);
  }
  for (const id of Object.keys(placementMap)) {
    placementMap[id].sort((a, b) => b - a);
  }

  // Build media counts map: college_id → { category → { photos, videos } }
  const CATEGORIES = ['hostel', 'class', 'campus', 'extra'];
  const mediaMap = {};
  for (const { college_id, category, media_type } of media) {
    if (!mediaMap[college_id]) {
      mediaMap[college_id] = { hostel: { photos: 0, videos: 0 }, class: { photos: 0, videos: 0 }, campus: { photos: 0, videos: 0 }, extra: { photos: 0, videos: 0 } };
    }
    if (CATEGORIES.includes(category)) {
      if (media_type === 'video') mediaMap[college_id][category].videos++;
      else mediaMap[college_id][category].photos++;
    }
  }

  const enriched = colleges.map(c => ({
    ...c,
    placement_years: placementMap[c.college_id] ?? [],
    media: mediaMap[c.college_id] ?? { hostel: { photos: 0, videos: 0 }, class: { photos: 0, videos: 0 }, campus: { photos: 0, videos: 0 }, extra: { photos: 0, videos: 0 } },
  }));

  const totalMedia = media.length;

  return NextResponse.json({
    stats: { total_users: totalUsers, total_colleges: colleges.length, total_media: totalMedia },
    colleges: enriched,
  });
}
