import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Deep merge: newData into existing, without overwriting existing non-empty values with empty ones
function mergeData(existing, incoming) {
  // For list-based sections (items array), always use the incoming version
  if (incoming.items) return incoming;

  const merged = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    if (value === '' || value === null || value === undefined) continue;
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      merged[key] = mergeData(merged[key] || {}, value);
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

// GET: Load college details by college_id and optional section
// Returns latest version from college_details (live table)
// Add ?history=true to get all versions from history table
export async function GET(request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get('college_id');
  const section = searchParams.get('section');
  const history = searchParams.get('history');

  if (!collegeId) return NextResponse.json({ error: 'college_id required' }, { status: 400 });

  // If history=true, return all versions from history table
  if (history === 'true') {
    let query = supabase
      .from('college_details_history')
      .select('*')
      .eq('college_id', collegeId)
      .order('created_at', { ascending: false });
    if (section) query = query.eq('section', section);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // Default: return latest from live table
  let query = supabase.from('college_details').select('*').eq('college_id', collegeId);
  if (section) query = query.eq('section', section);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// POST: Save college details
// 1. Fetch existing data
// 2. Merge incoming with existing (partial fills don't erase others' work)
// 3. Upsert merged result to college_details (live table)
// 4. Insert to college_details_history ONLY if data actually changed
export async function POST(request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await request.json();
  const { college_id, section, data, submitted_by } = body;

  if (!college_id || !section || !data) {
    return NextResponse.json({ error: 'college_id, section, and data required' }, { status: 400 });
  }

  const now = new Date().toISOString();

  // Fetch existing data for this college+section
  const { data: existing } = await supabase
    .from('college_details')
    .select('data')
    .eq('college_id', college_id)
    .eq('section', section)
    .single();

  // Merge: incoming data merged into existing (preserves other ambassadors' fields)
  const existingData = existing?.data || {};
  const mergedData = mergeData(existingData, data);

  // Check if anything actually changed
  const dataChanged = JSON.stringify(existingData) !== JSON.stringify(mergedData);

  // 1. Upsert live table with merged data
  const { data: result, error } = await supabase
    .from('college_details')
    .upsert({
      college_id,
      section,
      data: mergedData,
      submitted_by: submitted_by || null,
      updated_at: now
    }, { onConflict: 'college_id,section' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 2. Only append to history if data actually changed
  if (dataChanged) {
    await supabase
      .from('college_details_history')
      .insert({
        college_id,
        section,
        data: mergedData,
        submitted_by: submitted_by || null,
        created_at: now
      });
  }

  return NextResponse.json({ ...result, history_written: dataChanged });
}
