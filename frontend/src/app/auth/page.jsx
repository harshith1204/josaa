'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import '../landing.css';

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const redirectTo = searchParams.get('next') || '/onboarding';

  useEffect(() => {
    const errParam = searchParams.get('error');
    if (errParam === 'auth_callback_failed') {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleGoogleAuth = async () => {
    if (!isSupabaseConfigured()) { setError('Authentication is not configured yet.'); return; }
    setGoogleLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` },
    });
    if (error) { setError(error.message); setGoogleLoading(false); }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) { setError('Authentication is not configured yet.'); return; }
    setLoading(true);
    setError('');
    setSuccess('');

    if (tab === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push(redirectTo);
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Check your email and click the confirmation link to continue.');
        setTab('signin');
      }
    }
    setLoading(false);
  };

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="grid-bg" />
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      <header style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, padding: '16px 20px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--sans)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to home
        </Link>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '76px 24px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '20px', padding: '4px 14px', marginBottom: '20px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>cutoffs.ai</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: '8px' }}>
              {tab === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {tab === 'signin' ? 'Sign in to access your college insights' : 'Start exploring colleges with AI-powered insights'}
            </p>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px', backdropFilter: 'blur(20px)' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: '10px', padding: '4px', marginBottom: '28px', gap: '4px' }}>
              {['signin', 'signup'].map((t) => (
                <button key={t} onClick={() => { setTab(t); setError(''); setSuccess(''); }} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--sans)', transition: 'all 0.2s', background: tab === t ? 'var(--accent)' : 'transparent', color: tab === t ? '#fff' : 'var(--text-muted)' }}>
                  {t === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Google */}
            <button onClick={handleGoogleAuth} disabled={googleLoading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', cursor: googleLoading ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--sans)', transition: 'all 0.2s', opacity: googleLoading ? 0.7 : 1, marginBottom: '20px' }}
              onMouseEnter={(e) => { if (!googleLoading) e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {googleLoading ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {tab === 'signup' && (
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontFamily: 'var(--mono)' }}>Full name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; e.currentTarget.style.outline = 'none'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  />
                </div>
              )}
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontFamily: 'var(--mono)' }}>Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>Password</label>
                  {tab === 'signin' && (
                    <button type="button" onClick={async () => {
                      if (!email) { setError('Enter your email first.'); return; }
                      setLoading(true);
                      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth` });
                      setLoading(false);
                      if (error) setError(error.message);
                      else setSuccess('Password reset email sent.');
                    }} style={{ fontSize: '12px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', padding: 0 }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={tab === 'signup' ? 'Min. 6 characters' : '••••••••'} required minLength={6} style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; e.currentTarget.style.outline = 'none'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
              </div>

              {error && <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', fontSize: '13px', color: '#f87171' }}>{error}</div>}
              {success && <div style={{ padding: '10px 14px', background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.25)', borderRadius: '10px', fontSize: '13px', color: 'var(--accent-2)' }}>{success}</div>}

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: loading ? 'rgba(255,107,53,0.5)' : 'var(--accent)', border: 'none', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '15px', fontWeight: 600, color: '#fff', fontFamily: 'var(--sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', marginTop: '4px' }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#e85a28'; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent)'; }}
              >
                {loading ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setTab(tab === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess(''); }} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--sans)', fontWeight: 500 }}>
              {tab === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
          <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#555' }}>
            By continuing, you agree to our <a href="#" style={{ color: 'var(--text-muted)' }}>Terms</a> &amp; <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function AuthLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', color: '#8a8a95' }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <AuthForm />
    </Suspense>
  );
}

const inputStyle = {
  width: '100%', padding: '11px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)',
  borderRadius: '10px', fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--sans)', transition: 'border-color 0.2s', outline: 'none',
};
