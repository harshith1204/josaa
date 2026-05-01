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

// POST /api/admin/college
// Body: { type: 'college' | 'placements', data: { ...JSON } }
export async function POST(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'Service role key not configured' }, { status: 503 });

  const body = await request.json();
  const { type, data } = body;

  if (!type || !data) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
  }

  if (type === 'college') {
    const { college_id, name, short_name, zone, state } = data;
    if (!college_id || !name) {
      return NextResponse.json({ error: 'college_id and name are required' }, { status: 400 });
    }

    const { error } = await sb
      .from('colleges')
      .upsert({
        college_id,
        name,
        short_name: short_name || null,
        type: data.type || null,
        state: state || null,
        zone: zone || null,
        data,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'college_id' });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, college_id });
  }

  if (type === 'placements') {
    const { college_id, year } = data;
    if (!college_id || !year) {
      return NextResponse.json({ error: 'college_id and year are required' }, { status: 400 });
    }

    const { error } = await sb
      .from('college_placements')
      .upsert({
        college_id,
        year,
        data,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'college_id,year' });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, college_id, year });
  }

  return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
}

// GET /api/admin/college?college_id=iit-bombay
// Returns stored college + placements data for the admin to review
export async function GET(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'Service role key not configured' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get('college_id');

  if (collegeId) {
    const [{ data: college }, { data: placements }] = await Promise.all([
      sb.from('colleges').select('*').eq('college_id', collegeId).single(),
      sb.from('college_placements').select('*').eq('college_id', collegeId).order('year', { ascending: false }),
    ]);
    return NextResponse.json({ college, placements });
  }

  const { data: colleges, error } = await sb
    .from('colleges')
    .select('college_id, name, short_name, type, state, zone, updated_at')
    .order('name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ colleges });
}
