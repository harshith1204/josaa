'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../landing.css';

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
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: 'rgba(10,10,12,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)',
            textDecoration: 'none', fontFamily: 'var(--sans)', transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)',
            borderRadius: '20px', padding: '4px 14px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>cutoffs.ai</span>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
            / Simulator
          </span>
        </div>

        <div style={{ width: '60px' }} />
      </header>

      {/* Simulator frame */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>
        <div style={{
          flex: 1,
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          minHeight: 'calc(100vh - 120px)',
        }}>
          <iframe
            src="https://josaa-simulator-ivory.vercel.app/?direct=1&noai=1"
            allow="fullscreen"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block', minHeight: 'calc(100vh - 120px)' }}
          />
        </div>
      </div>
    </div>
  );
}
