import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

const ADMIN_KEY = process.env.ADMIN_API_KEY || 'cutoffs-admin-2025';

function checkAuth(request) {
  const key = request.headers.get('x-admin-key');
  return key === ADMIN_KEY;
}

export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const url = new URL(request.url);
  const includeAuth = url.searchParams.get('include_auth');

  const { data: profiles, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Query failed' }, { status: 500 });

  // Also fetch auth users to show email-verified-but-no-profile users
  let authUsers = [];
  if (includeAuth === '1') {
    try {
      const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 500 });
      authUsers = (authData?.users || []).map(u => ({
        id: u.id,
        email: u.email,
        email_confirmed_at: u.email_confirmed_at,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
      }));
    } catch(e) { /* ignore if auth admin not available */ }
  }

  return NextResponse.json({ profiles, authUsers });
}

export async function POST(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const body = await request.json();
  const { name, email, phone, college, role = 'ambassador', is_active } = body;
  const { data, error } = await supabase.from('profiles').insert({ name, email, phone, college, role, is_active: is_active || false }).select().single();
  if (error) return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const { id, action, review_note } = await request.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const updates = {};
  if (action === 'approve') {
    updates.is_active = true;
    updates.reviewed_at = new Date().toISOString();
    updates.review_note = review_note || 'Approved';
  } else if (action === 'reject') {
    updates.is_active = false;
    updates.review_note = review_note || 'Rejected';
  }

  const { data, error } = await supabase.from('profiles').update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  return NextResponse.json({ success: true });
}
