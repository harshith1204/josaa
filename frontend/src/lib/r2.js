import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const r2Client = process.env.R2_ACCOUNT_ID ? new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
}) : null;

const BUCKET = process.env.R2_BUCKET_NAME || 'cutoffs-uploads';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

export async function getPresignedUploadUrl(filename, contentType, folder = 'uploads') {
  if (!r2Client || !PUBLIC_URL) {
    throw new Error('R2 not configured');
  }
  const key = `${folder}/${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(r2Client, command, {
    expiresIn: 600,
    signableHeaders: new Set(['content-type']),
    unhoistableHeaders: new Set(['content-type']),
  });
  const fileUrl = `${PUBLIC_URL}/${key}`;
  return { uploadUrl, fileUrl, key };
}

export async function uploadImage(file, filename, folder = 'uploads') {
  // If R2 is configured, upload there
  if (r2Client && PUBLIC_URL) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `${folder}/${Date.now()}-${filename}`;
    await r2Client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }));
    return `${PUBLIC_URL}/${key}`;
  }

  // Fallback: save locally to public/uploads/
  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = join(process.cwd(), 'public', 'uploads');
  await mkdir(dir, { recursive: true });
  const fname = `${Date.now()}-${filename}`;
  await writeFile(join(dir, fname), buffer);
  return `/uploads/${fname}`;
}

export const isR2Configured = () => !!r2Client && !!PUBLIC_URL;
