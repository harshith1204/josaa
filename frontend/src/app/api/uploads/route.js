import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

const ADMIN_KEY = process.env.ADMIN_API_KEY || 'cutoffs-admin-2025';
function checkAuth(request) { return request.headers.get('x-admin-key') === ADMIN_KEY; }

export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured', mock: true }, { status: 200 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const ambassador_id = searchParams.get('ambassador_id');

  let query = supabase.from('uploads').select('*, profiles!ambassador_id(name, college)').order('created_at', { ascending: false });
  if (status && status !== 'all') query = query.eq('status', status);
  if (ambassador_id) query = query.eq('ambassador_id', ambassador_id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await request.json();
  const { ambassador_id, college_name, category, caption, description, image_urls } = body;

  const { data, error } = await supabase
    .from('uploads')
    .insert({ ambassador_id, college_name, category, caption, description, image_urls, status: 'pending' })
    .select().single();

  if (error) return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  return NextResponse.json(data);
}
