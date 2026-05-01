import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const OWNER_EMAIL = 'harshithsai24@gmail.com';
const BUCKET = 'site-data';
const ALLOWED_KEYS = ['college', 'placements'];

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

export async function POST(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 503 });

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const { key, data } = body ?? {};
  if (!key || !data) return NextResponse.json({ error: 'Missing key or data' }, { status: 400 });
  if (!ALLOWED_KEYS.includes(key)) return NextResponse.json({ error: 'Invalid key' }, { status: 400 });

  let pretty;
  try {
    pretty = JSON.stringify(JSON.parse(data), null, 2);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
  }

  // Ensure the bucket exists (no-op if it already does)
  await sb.storage.createBucket(BUCKET, { public: false }).catch(() => {});

  const bytes = Buffer.from(pretty, 'utf-8');
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(`${key}.json`, bytes, { contentType: 'application/json', upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fire-and-forget: trigger the Render agent to re-index this college/placements JSON
  const agentIngestUrl = process.env.AGENT_INGEST_URL;
  const ingestSecret   = process.env.INGEST_SECRET;
  const college_id     = JSON.parse(data).college_id || null;
  if (agentIngestUrl && ingestSecret && college_id) {
    fetch(`${agentIngestUrl}/ingest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ingestSecret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: key, college_id, data }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true, path: `${key}.json` });
}
