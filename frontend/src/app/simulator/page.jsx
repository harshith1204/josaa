'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SimulatorPage() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data === 'go-home' || e.data === 'back-to-home') {
        router.push('/');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0c' }}>
      <iframe
        src="https://josaa-simulator-ivory.vercel.app/?direct=1&noai=1"
        allow="fullscreen"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
}
