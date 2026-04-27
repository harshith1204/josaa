import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request) {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const { filePath } = await request.json();
  if (!filePath || typeof filePath !== 'string') {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  }

  // Generate a signed URL valid for 1 hour
  const { data, error } = await supabase.storage
    .from('ambassador-docs')
    .createSignedUrl(filePath, 3600);

  if (error) {
    return NextResponse.json({ error: 'Failed to generate URL' }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
