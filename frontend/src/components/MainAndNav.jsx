'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

function isNoNavRoute(pathname) {
  if (!pathname) return false;
  return pathname === '/' || pathname === '/auth' || pathname.startsWith('/auth/');
}

export default function MainAndNav({ children }) {
  const pathname = usePathname();
  const hideNav = isNoNavRoute(pathname);

  return (
    <>
      <main className={hideNav ? '' : 'pb-20'}>{children}</main>
      {!hideNav && <BottomNav />}
    </>
  );
}
