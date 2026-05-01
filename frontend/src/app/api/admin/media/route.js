import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const OWNER_EMAIL = 'harshithsai24@gmail.com';
const VALID_CATEGORIES = ['hostel', 'class', 'campus', 'extra'];

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

function s3Client() {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!region || !accessKeyId || !secretAccessKey) return null;
  return new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
}

// POST /api/admin/media
// Body: { college_id, category, filename, contentType }
// Returns a short-lived S3 presigned PUT URL + the final public URL.
// The client uploads the file directly to S3, then calls PUT to record it.
export async function POST(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION;
  const s3 = s3Client();
  if (!s3 || !bucket) {
    return NextResponse.json(
      { error: 'S3 not configured — set AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY' },
      { status: 503 }
    );
  }

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { college_id, category, filename, contentType } = body ?? {};
  if (!college_id) return NextResponse.json({ error: 'Missing college_id' }, { status: 400 });
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` }, { status: 400 });
  }
  if (!filename) return NextResponse.json({ error: 'Missing filename' }, { status: 400 });

  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key  = `media/${college_id}/${category}/${Date.now()}-${safe}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType || 'application/octet-stream',
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const fileUrl   = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  return NextResponse.json({ uploadUrl, fileUrl, key });
}

// PUT /api/admin/media
// Body: { college_id, category, url, filename, caption?, media_type? }
// Records a successfully-uploaded S3 file into Supabase college_media.
export async function PUT(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'Service role key not configured' }, { status: 503 });

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { college_id, category, url, filename, caption, media_type } = body ?? {};
  if (!college_id || !category || !url) {
    return NextResponse.json({ error: 'Missing college_id, category, or url' }, { status: 400 });
  }

  // Ensure the college row exists before inserting media
  const { data: college } = await sb
    .from('colleges')
    .select('college_id')
    .eq('college_id', college_id)
    .single();

  if (!college) {
    return NextResponse.json(
      { error: `College "${college_id}" not found. Save College JSON first.` },
      { status: 422 }
    );
  }

  const { error: dbErr } = await sb.from('college_media').insert({
    college_id,
    category,
    url,
    filename: filename || url.split('/').pop(),
    caption:  caption  || null,
    media_type: media_type || (url.match(/\.(mp4|mov|webm)$/i) ? 'video' : 'photo'),
  });

  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 });

  return NextResponse.json({ success: true, url, college_id, category });
}

// GET /api/admin/media?college_id=iiit-gwalior&category=hostel
export async function GET(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const caller = await verifyOwner(token);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const sb = adminClient();
  if (!sb) return NextResponse.json({ error: 'Service role key not configured' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get('college_id');
  const category  = searchParams.get('category');

  let query = sb.from('college_media').select('*').order('uploaded_at', { ascending: false });
  if (collegeId) query = query.eq('college_id', collegeId);
  if (category)  query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ media: data });
}
