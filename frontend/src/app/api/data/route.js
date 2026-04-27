import { NextResponse } from 'next/server';

// Rate limiting: simple in-memory counter
const requestCounts = new Map();
const RATE_LIMIT = 30; // requests per minute per IP
const WINDOW = 60000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now - entry.start > WINDOW) {
    requestCounts.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!['sim', 'dashboard'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = type === 'sim'
      ? path.join(process.cwd(), 'data', 'sim-data.json')
      : path.join(process.cwd(), 'data', 'dashboard_data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex',
      }
    });
  } catch (e) {
    return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  }
}
