import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/r2';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'uploads';
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const url = await uploadImage(file, file.name, folder);
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
