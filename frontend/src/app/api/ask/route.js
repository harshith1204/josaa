/**
 * /api/ask — Edge proxy to the Render agent /chat endpoint.
 *
 * Called by page.jsx and simulator/page.jsx with:
 *   POST /api/ask
 *   Body: { question, college, history? }
 *
 * Streams SSE tokens back to the browser.
 */
export const runtime = 'edge';

export async function POST(request) {
  const agentUrl = process.env.AGENT_URL;
  if (!agentUrl) {
    return new Response(
      JSON.stringify({ error: 'AGENT_URL not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const upstream = await fetch(`${agentUrl}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}
