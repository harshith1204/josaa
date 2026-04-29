'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../landing.css';

const STORAGE_KEY = 'exam_selected';

export default function OnboardingPage() {
  const router = useRouter();
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) {
      router.replace('/simulator');
    }
  }, [router]);

  const handleSelect = (exam) => {
    if (exam !== 'josaa') return;
    setSelecting(true);
    localStorage.setItem(STORAGE_KEY, exam);
    router.push('/simulator');
  };

  return (
    <div
      className="landing-container"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px', padding: '24px' }}>
        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '20px', padding: '4px 14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>cutoffs.ai</span>
          </div>
        </div>

        {/* Heading */}
        <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginBottom: '10px' }}>
          Which exam are you preparing for?
        </h1>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '40px' }}>
          We'll personalise your experience based on your exam.
        </p>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* JoSAA */}
          <button
            onClick={() => handleSelect('josaa')}
            disabled={selecting}
            style={{
              width: '100%', textAlign: 'left', padding: '24px 28px',
              background: 'var(--surface)', border: '1px solid rgba(255,107,53,0.35)',
              borderRadius: '20px', cursor: selecting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', opacity: selecting ? 0.7 : 1,
              backdropFilter: 'blur(20px)',
            }}
            onMouseEnter={(e) => { if (!selecting) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(255,107,53,0.06)'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.35)'; e.currentTarget.style.background = 'var(--surface)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  🎓
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>JoSAA</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>IIT, NIT &amp; GFTI counselling</div>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          {/* EAMCET — Coming Soon */}
          <div
            style={{
              width: '100%', textAlign: 'left', padding: '24px 28px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '20px', backdropFilter: 'blur(20px)',
              opacity: 0.55, cursor: 'not-allowed', position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(138,138,149,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  📚
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    EAMCET
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '20px', padding: '2px 9px', letterSpacing: '0.04em', fontFamily: 'var(--mono)' }}>
                      COMING SOON
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>AP &amp; Telangana engineering admissions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
