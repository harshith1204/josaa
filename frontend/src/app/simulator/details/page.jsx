'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import '../../landing.css';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];
const CATEGORIES = ['General', 'OBC-NCL', 'EWS', 'SC', 'ST'];
const GENDERS = ['Gender-Neutral', 'Female-only'];

const fieldStyle = {
  width: '100%', padding: '12px 16px',
  background: 'var(--surface-2)', border: '1px solid var(--border)',
  borderRadius: '12px', color: 'var(--text)', fontSize: '15px',
  fontFamily: 'var(--sans)', outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  appearance: 'none', WebkitAppearance: 'none',
};
const labelStyle = {
  fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)',
  fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
  marginBottom: '8px', display: 'block',
};

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

function Spinner({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ animation: 'spin 0.8s linear infinite', display: 'block' }}>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
    </svg>
  );
}

function DetailsForm() {
  // useSearchParams is safe here inside Suspense
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';

  const [checking, setChecking] = useState(true);
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General');
  const [homeState, setHomeState] = useState('');
  const [gender, setGender] = useState('Gender-Neutral');
  const [userName, setUserName] = useState('');
  const [saving, setSaving] = useState(false);
  const [focus, setFocus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) { setChecking(false); return; }
    const sb = getSupabase();
    if (!sb) { setChecking(false); return; }

    sb.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.replace('/auth'); return; }
      const m = user.user_metadata || {};
      setUserName(m.full_name || user.email || '');

      if (m.jee_rank) {
        if (!isEdit) {
          // First-time check passed — user already has details, skip
          router.replace('/simulator');
          return;
        }
        // Edit mode: pre-fill with existing values
        setRank(String(m.jee_rank));
        setCategory(m.category || 'General');
        setHomeState(m.home_state || '');
        setGender(m.gender || 'Gender-Neutral');
      }
      setChecking(false);
    });
  }, [router, isEdit]);

  const canSave = rank && parseInt(rank) > 0 && homeState;

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    setError('');

    const payload = {
      jee_rank: parseInt(rank),
      category,
      home_state: homeState,
      gender,
    };

    if (isSupabaseConfigured()) {
      const sb = getSupabase();
      if (sb) {
        const { error: updateError } = await sb.auth.updateUser({ data: payload });
        if (updateError) {
          setError(updateError.message);
          setSaving(false);
          return;
        }
      }
    }

    router.push('/simulator');
  };

  const focusStyle = (key) =>
    focus === key ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px rgba(255,107,53,0.12)' } : {};

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c' }}>
        <Spinner size={36} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px', padding: '24px' }}>

        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '20px', padding: '4px 14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>cutoffs.ai</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.2 }}>
            {isEdit ? 'Update your details' : (userName ? `Welcome, ${userName.split(' ')[0]}!` : 'Almost there!')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {isEdit ? 'Change your rank or category and save.' : 'Enter your rank details once — we\'ll save them for all future sessions.'}
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '28px', boxShadow: '0 24px 60px rgba(0,0,0,0.35)', backdropFilter: 'blur(20px)' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <span style={{ fontSize: '20px' }}>📝</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>JEE Main Details</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Open Category Rank *</label>
              <input
                type="number" placeholder="e.g. 15000"
                value={rank} onChange={e => setRank(e.target.value)}
                onFocus={() => setFocus('rank')} onBlur={() => setFocus(null)}
                style={{ ...fieldStyle, ...focusStyle('rank') }}
              />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>
              <div style={{ position: 'relative' }}>
                <select value={category} onChange={e => setCategory(e.target.value)}
                  onFocus={() => setFocus('cat')} onBlur={() => setFocus(null)}
                  style={{ ...fieldStyle, ...focusStyle('cat'), cursor: 'pointer', paddingRight: '36px' }}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronIcon />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Home State *</label>
              <div style={{ position: 'relative' }}>
                <select value={homeState} onChange={e => setHomeState(e.target.value)}
                  onFocus={() => setFocus('state')} onBlur={() => setFocus(null)}
                  style={{ ...fieldStyle, ...focusStyle('state'), cursor: 'pointer', paddingRight: '36px' }}>
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronIcon />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Gender *</label>
              <div style={{ position: 'relative' }}>
                <select value={gender} onChange={e => setGender(e.target.value)}
                  onFocus={() => setFocus('gender')} onBlur={() => setFocus(null)}
                  style={{ ...fieldStyle, ...focusStyle('gender'), cursor: 'pointer', paddingRight: '36px' }}>
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: '16px', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', fontSize: '13px', color: '#f87171' }}>
              {error}
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={!canSave || saving}
          style={{
            width: '100%', marginTop: '20px', padding: '16px',
            background: canSave ? 'var(--accent)' : 'var(--surface-2)',
            border: 'none', borderRadius: '16px',
            color: canSave ? '#fff' : 'var(--text-muted)',
            fontSize: '15px', fontWeight: 700, fontFamily: 'var(--sans)',
            cursor: canSave ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            boxShadow: canSave ? '0 8px 24px rgba(255,107,53,0.35)' : 'none',
          }}
        >
          {saving
            ? <><Spinner /> Saving...</>
            : isEdit
              ? <>Update Details <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
              : <>Save & Start Simulator <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
          }
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
          {isEdit ? 'Changes will apply to your next simulator session.' : "Your details are saved securely and won't be asked again."}
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        select option { background: #111115; color: #e8e6e1; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
}

export default function SimulatorDetailsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
        </svg>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <DetailsForm />
    </Suspense>
  );
}
