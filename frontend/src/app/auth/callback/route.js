import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_EMAILS = ['harshithsai24@gmail.com'];

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Default to /verify-phone — Supabase strips custom ?next= from emailRedirectTo
  // OAuth logins pass ?next= explicitly so they still land on the right page
  const next = searchParams.get('next') ?? '/onboarding';

  if (code) {
    // cookies() is synchronous in Next.js 14
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const isAdmin = ADMIN_EMAILS.includes(data.session?.user?.email);
      const destination = isAdmin ? '/admin' : (next.startsWith('/') ? next : '/simulator');
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
}
