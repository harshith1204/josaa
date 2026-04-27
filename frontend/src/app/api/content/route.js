import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ADMIN_KEY = process.env.ADMIN_API_KEY || 'cutoffs-admin-2025';
const ALLOWED_EMAILS = ['sivakumarpothireddy009@gmail.com','premkumardharavath02@gmail.com','akshaytadepalli88724@gmail.com'];

function checkAuth(request) {
  // Allow admin key OR Supabase Bearer token from allowed emails
  if (request.headers.get('x-admin-key') === ADMIN_KEY) return true;
  const authEmail = request.headers.get('x-user-email');
  if (authEmail && ALLOWED_EMAILS.includes(authEmail)) return true;
  return false;
}

// Also allow ambassador uploads via their auth token
async function checkAmbassadorAuth(request, supabase) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  const { data: { user } } = await supabase.auth.getUser(token);
  return user;
}

export async function POST(request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  // Check admin key OR ambassador auth token
  const isAdmin = checkAuth(request);
  const ambassador = !isAdmin ? await checkAmbassadorAuth(request, supabase) : null;
  if (!isAdmin && !ambassador) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { college, category, content_type, title, content, status, file_url } = body;

  if (!college || !category) {
    return NextResponse.json({ error: 'Missing required fields: college, category' }, { status: 400 });
  }

  const insertData = {
    college,
    category,
    content_type: content_type || 'image',
    title: title || '',
    content: content || '',
    status: status || 'pending',
    uploaded_by: ambassador ? ambassador.id : null
  };
  if (file_url) insertData.file_url = file_url;

  const { data, error } = await supabase
    .from('college_content')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('college_content insert error:', error);
    return NextResponse.json({ error: 'Insert failed: ' + error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const college = searchParams.get('college');

  let query = supabase.from('college_content').select('*').order('created_at', { ascending: false });
  if (college) query = query.eq('college', college);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { id, status } = await request.json();
  if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });

  const { data, error } = await supabase
    .from('college_content')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json(data);
}
