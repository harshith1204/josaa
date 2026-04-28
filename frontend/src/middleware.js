import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase-middleware';

const PROTECTED_ROUTES = ['/explore', '/cutoffs', '/preferences', '/profile', '/scores', '/simulator'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isVerifyPhone = pathname === '/verify-phone';

  if (!isProtected && !isVerifyPhone) return NextResponse.next();

  const response = NextResponse.next();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createMiddlewareClient(request, response);
  // getUser() validates the token server-side — safe against forged cookies
  const { data: { user } } = await supabase.auth.getUser();

  // Not logged in → send to /auth
  if (!user) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const phoneVerified = user.user_metadata?.phone_verified === true;

  // Logged in, phone not verified, trying to access protected route → verify phone first
  if (isProtected && !phoneVerified) {
    return NextResponse.redirect(new URL('/verify-phone', request.url));
  }

  // Logged in, phone already verified, trying to access /verify-phone → skip ahead
  if (isVerifyPhone && phoneVerified) {
    return NextResponse.redirect(new URL('/explore', request.url));
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
    '/verify-phone',
  ],
};
