'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import '../landing.css';

export default function VerifyPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.replace('/auth'); return; }
      if (user.user_metadata?.phone_verified) { router.replace('/explore'); return; }
      setUser(user);
    });

    // Set up invisible reCAPTCHA for Firebase phone auth
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }

    return () => {
      window.recaptchaVerifier?.clear();
      window.recaptchaVerifier = null;
    };
  }, [router]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!phone || phone.length < 10) { setError('Enter a valid 10-digit mobile number.'); return; }

    setLoading(true);
    const fullPhone = `+91${phone}`;

    // updateUser sends an OTP to the new phone number
    const { error } = await supabase.auth.updateUser({ phone: fullPhone });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setStep('otp');
    setSuccess(`OTP sent to +91 ${phone}`);
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp || otp.length < 6) { setError('Enter the 6-digit OTP.'); return; }

    setLoading(true);
    const fullPhone = `+91${phone}`;

    // Verify the OTP (type: 'phone_change' since we used updateUser)
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: fullPhone,
      token: otp.trim(),
      type: 'phone_change',
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    // Mark phone_verified in user metadata (fast, no DB query needed in middleware)
    await supabase.auth.updateUser({
      data: { phone_verified: true, phone: fullPhone },
    });

    // Also update profiles table for record-keeping
    if (user?.id) {
      await supabase.from('profiles').upsert({
        user_id: user.id,
        phone: fullPhone,
        phone_verified: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }

    router.push('/explore');
  };

  const handleResend = async () => {
    setOtp('');
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ phone: `+91${phone}` });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSuccess('New OTP sent.');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="grid-bg" />
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '20px', padding: '4px 14px', marginBottom: '16px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>Step 2 of 2</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: '8px' }}>
              {step === 'phone' ? 'Verify your phone' : 'Enter the OTP'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {step === 'phone'
                ? 'Add your mobile number to secure your account.'
                : <>We sent a 6-digit code to <span style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>+91 {phone}</span></>}
            </p>
          </div>

          {/* Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>

            {step === 'phone' ? (
              <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Mobile number</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-muted)', fontSize: '14px', fontFamily: 'var(--mono)', flexShrink: 0 }}>
                      +91
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      required
                      style={{ ...inputStyle, flex: 1 }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    />
                  </div>
                </div>

                {error && <ErrorBox>{error}</ErrorBox>}

                <button type="submit" disabled={loading || phone.length < 10} style={submitBtnStyle(loading || phone.length < 10)}
                  onMouseEnter={(e) => { if (!loading && phone.length >= 10) e.currentTarget.style.background = '#e85a28'; }}
                  onMouseLeave={(e) => { if (!loading && phone.length >= 10) e.currentTarget.style.background = 'var(--accent)'; }}
                >
                  {loading ? <Spinner /> : null}
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>6-digit code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    autoFocus
                    required
                    style={{ ...inputStyle, fontSize: '26px', letterSpacing: '0.35em', textAlign: 'center', fontFamily: 'var(--mono)' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  />
                </div>

                {error && <ErrorBox>{error}</ErrorBox>}
                {success && <SuccessBox>{success}</SuccessBox>}

                <button type="submit" disabled={loading || otp.length < 6} style={submitBtnStyle(loading || otp.length < 6)}
                  onMouseEnter={(e) => { if (!loading && otp.length >= 6) e.currentTarget.style.background = '#e85a28'; }}
                  onMouseLeave={(e) => { if (!loading && otp.length >= 6) e.currentTarget.style.background = 'var(--accent)'; }}
                >
                  {loading ? <Spinner /> : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); }} style={ghostBtnStyle}>
                    ← Change number
                  </button>
                  <button type="button" onClick={handleResend} disabled={loading} style={ghostBtnStyle}>
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {['Account', 'Phone'].map((label, i) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 1 ? 'var(--accent)' : 'var(--accent-2)', opacity: i === 1 ? 1 : 0.5 }} />
                <span style={{ fontSize: '10px', color: i === 1 ? 'var(--text-muted)' : 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorBox({ children }) {
  return <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', fontSize: '13px', color: '#f87171' }}>{children}</div>;
}
function SuccessBox({ children }) {
  return <div style={{ padding: '10px 14px', background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.25)', borderRadius: '10px', fontSize: '13px', color: 'var(--accent-2)' }}>{children}</div>;
}
function Spinner() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
}

const labelStyle = { fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontFamily: 'var(--mono)' };
const inputStyle = { width: '100%', padding: '11px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--sans)', transition: 'border-color 0.2s', outline: 'none' };
const submitBtnStyle = (disabled) => ({ width: '100%', padding: '13px', background: disabled ? 'rgba(255,107,53,0.4)' : 'var(--accent)', border: 'none', borderRadius: '12px', cursor: disabled ? 'not-allowed' : 'pointer', fontSize: '15px', fontWeight: 600, color: '#fff', fontFamily: 'var(--sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' });
const ghostBtnStyle = { color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'var(--sans)', padding: 0 };
