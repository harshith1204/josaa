'use client';

import BottomNav from '@/components/BottomNav';

export default function MainAndNav({ children }) {
  return (
    <>
      <main className="pb-20 min-h-0">{children}</main>
      <BottomNav />
    </>
  );
}
