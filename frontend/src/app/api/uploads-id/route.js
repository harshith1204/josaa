import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

const ADMIN_KEY = process.env.ADMIN_API_KEY || 'cutoffs-admin-2025';
function checkAuth(request) { return request.headers.get('x-admin-key') === ADMIN_KEY; }

export async function PATCH(request, { params }) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { id } = params;
  if (!id || typeof id !== 'string') return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const body = await request.json();
  const { status, review_note, reviewed_by } = body;

  const allowedStatuses = ['pending', 'approved', 'rejected', 'revision'];
  if (status && !allowedStatuses.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  const { data, error } = await supabase
    .from('uploads')
    .update({ status, review_note, reviewed_by, reviewed_at: new Date().toISOString() })
    .eq('id', id)
    .select().single();

  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json(data);
}
