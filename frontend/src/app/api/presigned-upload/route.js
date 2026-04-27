import { NextResponse } from 'next/server';
import { getPresignedUploadUrl } from '@/lib/r2';

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm',
];

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(request) {
  try {
    const { filename, contentType, folder, fileSize } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'filename and contentType required' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    if (fileSize && fileSize > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 100MB.' }, { status: 400 });
    }

    const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const { uploadUrl, fileUrl, key } = await getPresignedUploadUrl(sanitized, contentType, folder || 'uploads');

    return NextResponse.json({ uploadUrl, fileUrl, key });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
