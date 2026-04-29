import { getRagCollegeName } from '@/lib/rag-colleges';

const DEFAULT_CHATBOT_BASE = 'https://cutoffs-chatbot.fresherschat.workers.dev';

/** Base URL for the RAG worker (no trailing slash). Set NEXT_PUBLIC_CUTOFFS_CHATBOT_URL in .env */
export function getCutoffsChatbotBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_CUTOFFS_CHATBOT_URL || DEFAULT_CHATBOT_BASE;
  return raw.replace(/\/+$/, '');
}

/**
 * POST /chat on the Cloudflare worker. Requires NEXT_PUBLIC_CUTOFFS_CHATBOT_URL (or default).
 * @param {{ question: string, college: string }} body
 */
export async function postRagChat({ question, college }) {
  const url = `${getCutoffsChatbotBaseUrl()}/chat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, college }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `RAG chat failed (${res.status})`);
  }
  return data;
}

/**
 * College-scoped chat: RAG worker when corpus exists, else POST /api/ask (must exist on your host).
 *
 * Note: there is no Next route for /api/ask in this repo by default; deploy backend/api/ask or add a route handler.
 *
 * @param {{ question: string, instituteName: string }} args
 * @returns {Promise<
 *   | { type: 'rag'; answer: string; media?: Array<{ type?: string; url: string; caption?: string }> }
 *   | { type: 'ask'; html?: string | boolean; answer?: string; [k: string]: unknown }
 * >}
 */
export async function fetchCollegeChatResponse({ question, instituteName }) {
  const ragCollege = getRagCollegeName(instituteName);
  if (ragCollege) {
    const data = await postRagChat({ question, college: ragCollege });
    return {
      type: 'rag',
      answer: data.answer || 'No response.',
      media: Array.isArray(data.media) ? data.media : [],
    };
  }
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: `${instituteName}: ${question}` }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Ask API failed (${res.status})`);
  }
  return { type: 'ask', ...data };
}
