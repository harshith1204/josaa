import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'sivakumarpothireddy009@gmail.com,premkumardharavath02@gmail.com,akshaytadepalli88724@gmail.com').split(',');

export async function POST(request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ isAdmin: false });
  return NextResponse.json({ isAdmin: ADMIN_EMAILS.includes(email.trim()) });
}
