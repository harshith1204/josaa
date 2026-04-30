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

export async function GET(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 503 });

  const { data: { users }, error } = await sb.auth.admin.listUsers({ perPage: 1000 });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const shaped = users.map(u => ({
    id: u.id,
    email: u.email,
    full_name: u.user_metadata?.full_name || u.user_metadata?.name || null,
    avatar_url: u.user_metadata?.avatar_url || null,
    is_admin: u.app_metadata?.is_admin === true || u.email === OWNER_EMAIL,
    is_owner: u.email === OWNER_EMAIL,
    created_at: u.created_at,
    last_sign_in: u.last_sign_in_at,
  }));

  // owner always first, then admins, then rest; alpha within groups
  shaped.sort((a, b) => {
    if (a.is_owner !== b.is_owner) return a.is_owner ? -1 : 1;
    if (a.is_admin !== b.is_admin) return a.is_admin ? -1 : 1;
    return (a.email || '').localeCompare(b.email || '');
  });

  return NextResponse.json({ users: shaped });
}
