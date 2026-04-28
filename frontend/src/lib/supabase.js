import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => !!supabaseUrl && !!supabaseAnonKey;

// Returns a browser client that stores PKCE verifier in cookies (not localStorage)
// so the server-side callback can complete the OAuth exchange.
export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Backwards-compat singleton (lazy so it only runs in the browser)
let _client = null;
export const supabase = new Proxy({}, {
  get(_, prop) {
    if (!_client) _client = getSupabase();
    return _client?.[prop];
  }
});
