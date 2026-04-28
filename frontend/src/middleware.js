import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase';

const PROTECTED_ROUTES = ['/explore', '/cutoffs', '/preferences', '/profile', '/scores', '/simulator'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  if (!isProtected) return NextResponse.next();

  const response = NextResponse.next();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createMiddlewareClient(request, response);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/explore/:path*',
    '/cutoffs/:path*',
    '/preferences/:path*',
    '/profile/:path*',
    '/scores/:path*',
    '/simulator/:path*',
  ],
};
