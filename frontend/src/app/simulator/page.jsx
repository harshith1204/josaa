'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../landing.css';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { generateStrategy, getStrategies, safetyLabel } from '@/data/simulator-strategies';

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Safety pill ──────────────────────────────────────────────────────────────

const SAFETY_COLORS = {
  'Very Safe':  { bg: 'rgba(46,125,50,0.15)',  border: 'rgba(46,125,50,0.35)',  text: '#66bb6a' },
  'Safe':       { bg: 'rgba(67,160,71,0.15)',  border: 'rgba(67,160,71,0.35)',  text: '#81c784' },
  'Moderate':   { bg: 'rgba(249,168,37,0.15)', border: 'rgba(249,168,37,0.35)', text: '#ffd54f' },
  'Risky':      { bg: 'rgba(230,81,0,0.15)',   border: 'rgba(230,81,0,0.35)',   text: '#ffb74d' },
  'Long Shot':  { bg: 'rgba(198,40,40,0.15)',  border: 'rgba(198,40,40,0.35)',  text: '#ef9a9a' },
};

function SafetyPill({ rank, closingRank }) {
  const label = safetyLabel(rank, closingRank);
  const colors = SAFETY_COLORS[label.level] || SAFETY_COLORS['Moderate'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      fontSize: '11px', fontWeight: 600, fontFamily: 'var(--mono)',
      padding: '3px 9px', borderRadius: '20px',
      background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text,
      whiteSpace: 'nowrap', letterSpacing: '0.02em',
    }}>
      {label.emoji} {label.level}
    </span>
  );
}

// ─── Shared input / select styles ─────────────────────────────────────────────

const fieldStyles = {
  label: {
    fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)',
    fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
    marginBottom: '8px', display: 'block',
  },
  input: {
    width: '100%', padding: '12px 16px',
    background: 'var(--surface-2)', border: '1px solid var(--border)',
    borderRadius: '12px', color: 'var(--text)', fontSize: '15px',
    fontFamily: 'var(--sans)', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    appearance: 'none', WebkitAppearance: 'none',
  },
};

// ─── Step 1: Rank Setup ───────────────────────────────────────────────────────

function StepSetup({ onLaunch }) {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General');
  const [homeState, setHomeState] = useState('');
  const [gender, setGender] = useState('Gender-Neutral');
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [advRank, setAdvRank] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [focus, setFocus] = useState(null);

  // Load saved profile from Supabase on mount
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const m = user.user_metadata || {};
      setSavedProfile({ name: m.full_name || user.email });
      if (m.jee_rank) {
        setRank(String(m.jee_rank));
        setCategory(m.category || 'General');
        setHomeState(m.home_state || '');
        setGender(m.gender || 'Gender-Neutral');
        setHasAdvanced(!!m.jee_adv_rank);
        if (m.jee_adv_rank) setAdvRank(String(m.jee_adv_rank));
      }
    });
  }, []);

  const canLaunch = rank && parseInt(rank) > 0 && homeState;

  const handleLaunch = async () => {
    if (!canLaunch || saving) return;
    setSaving(true);

    const payload = {
      jee_rank: parseInt(rank),
      category,
      home_state: homeState,
      gender,
      jee_adv_rank: hasAdvanced && advRank ? parseInt(advRank) : null,
    };

    // Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      const sb = getSupabase();
      if (sb) {
        const { data: { user } } = await sb.auth.getUser();
        if (user) {
          await sb.auth.updateUser({ data: payload });
        }
      }
    }

    setSaving(false);
    onLaunch(payload);
  };

  const inputFocusStyle = (key) =>
    focus === key
      ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px rgba(255,107,53,0.12)' }
      : {};

  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', position: 'relative', zIndex: 1,
    }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)',
            borderRadius: '20px', padding: '4px 14px', marginBottom: '18px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>cutoffs.ai</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.2 }}>
            Enter your rank details
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
            to start the simulator
          </p>
        </div>

        {/* Saved profile banner */}
        {savedProfile && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.2)',
            borderRadius: '12px', padding: '10px 16px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '16px' }}>👤</span>
            <span style={{ fontSize: '13px', color: '#4dd0b1', fontFamily: 'var(--sans)' }}>
              {savedProfile.name
                ? `Welcome back, ${savedProfile.name.split(' ')[0]}! Your saved profile has been loaded.`
                : 'Using your saved profile.'}
            </span>
          </div>
        )}

        {/* Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '24px', padding: '28px', boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(20px)',
        }}>

          {/* JEE Main section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px' }}>📝</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>JEE Main</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Rank */}
              <div>
                <label style={fieldStyles.label}>Open Category Rank *</label>
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  onFocus={() => setFocus('rank')}
                  onBlur={() => setFocus(null)}
                  style={{ ...fieldStyles.input, ...inputFocusStyle('rank') }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={fieldStyles.label}>Category *</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onFocus={() => setFocus('cat')}
                    onBlur={() => setFocus(null)}
                    style={{ ...fieldStyles.input, ...inputFocusStyle('cat'), cursor: 'pointer', paddingRight: '36px' }}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              {/* Home State */}
              <div>
                <label style={fieldStyles.label}>Home State *</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={homeState}
                    onChange={(e) => setHomeState(e.target.value)}
                    onFocus={() => setFocus('state')}
                    onBlur={() => setFocus(null)}
                    style={{ ...fieldStyles.input, ...inputFocusStyle('state'), cursor: 'pointer', paddingRight: '36px' }}
                  >
                    <option value="">Select your state</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label style={fieldStyles.label}>Gender *</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onFocus={() => setFocus('gender')}
                    onBlur={() => setFocus(null)}
                    style={{ ...fieldStyles.input, ...inputFocusStyle('gender'), cursor: 'pointer', paddingRight: '36px' }}
                  >
                    {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', margin: '0 0 20px' }} />

          {/* JEE Advanced toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: hasAdvanced ? '20px' : '0' }}>
            <button
              onClick={() => setHasAdvanced(v => !v)}
              style={{
                width: '44px', height: '24px', borderRadius: '12px', border: 'none',
                cursor: 'pointer', padding: '2px',
                background: hasAdvanced ? 'var(--accent)' : 'var(--surface-2)',
                transition: 'background 0.2s',
                display: 'flex', alignItems: 'center',
                flexShrink: 0,
              }}
              aria-label="Toggle JEE Advanced rank"
            >
              <span style={{
                width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                display: 'block',
                transform: hasAdvanced ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </button>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
              I have a JEE Advanced rank
            </span>
          </div>

          {/* JEE Advanced rank field */}
          {hasAdvanced && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '18px' }}>🎯</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>JEE Advanced</span>
              </div>
              <div>
                <label style={fieldStyles.label}>Open Category Rank *</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={advRank}
                  onChange={(e) => setAdvRank(e.target.value)}
                  onFocus={() => setFocus('adv')}
                  onBlur={() => setFocus(null)}
                  style={{ ...fieldStyles.input, ...inputFocusStyle('adv'), maxWidth: '220px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Launch button */}
        <button
          onClick={handleLaunch}
          disabled={!canLaunch || saving}
          style={{
            width: '100%', marginTop: '20px', padding: '16px',
            background: canLaunch ? 'var(--accent)' : 'var(--surface-2)',
            border: 'none', borderRadius: '16px',
            color: canLaunch ? '#fff' : 'var(--text-muted)',
            fontSize: '15px', fontWeight: 700, fontFamily: 'var(--sans)',
            cursor: canLaunch ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            boxShadow: canLaunch ? '0 8px 24px rgba(255,107,53,0.35)' : 'none',
            letterSpacing: '0.01em',
          }}
        >
          {saving ? (
            <>
              <Spinner /> Saving...
            </>
          ) : (
            <>
              Launch Simulator
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', fontFamily: 'var(--sans)' }}>
          Based on JoSAA 2025 Round 6 cutoff data
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Strategy Picker ──────────────────────────────────────────────────

const STRATEGY_ICONS = { safe: '🛡️', moderate: '⚖️', aggressive: '🔥', branch: '💻', college: '🏛️' };

function StepStrategy({ profile, onPick, onBack }) {
  const strategies = getStrategies();
  const [hovered, setHovered] = useState(null);

  const fmtRank = (n) => n?.toLocaleString?.() || n;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <button onClick={onBack} style={backBtnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Change details
          </button>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', marginTop: '16px' }}>
            Choose your strategy
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Rank <strong style={{ color: 'var(--text)' }}>{fmtRank(profile.jee_rank)}</strong>
            {' · '}{profile.category}{' · '}{profile.home_state}
            {profile.jee_adv_rank ? ` · JEE Adv ${fmtRank(profile.jee_adv_rank)}` : ''}
          </p>
        </div>

        {/* Strategy cards — 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {strategies.map((s) => {
            const isHov = hovered === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onPick(s.id)}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textAlign: 'left', padding: '22px', borderRadius: '18px',
                  background: isHov ? 'rgba(255,107,53,0.06)' : 'var(--surface)',
                  border: isHov ? '1px solid rgba(255,107,53,0.45)' : '1px solid var(--border)',
                  cursor: 'pointer', transition: 'all 0.18s',
                  transform: isHov ? 'translateY(-2px)' : 'none',
                  boxShadow: isHov ? '0 8px 32px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.12)',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{STRATEGY_ICONS[s.id]}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{s.name}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--mono)', marginBottom: '8px', letterSpacing: '0.02em' }}>
                  {s.tagline}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.55 }}>{s.description}</div>
              </button>
            );
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '20px' }}>
          Each strategy generates 25 personalised choices · Based on JoSAA 2025 data
        </p>
      </div>
    </div>
  );
}

// ─── Step 3: Results ──────────────────────────────────────────────────────────

function StepResults({ profile, strategyId, onBack }) {
  const result = useMemo(
    () => generateStrategy(strategyId, profile.jee_rank, 25),
    [strategyId, profile.jee_rank]
  );

  const fmtRank = (n) => n?.toLocaleString?.() || n;

  if (!result || !result.choices?.length) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>No results found</div>
          <div style={{ fontSize: '13px', marginBottom: '24px' }}>Try a different strategy or adjust your rank.</div>
          <button onClick={onBack} style={{ ...backBtnStyle, display: 'inline-flex' }}>← Back to strategies</button>
        </div>
      </div>
    );
  }

  const { strategy, choices } = result;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', zIndex: 1 }}>

      {/* Sticky summary bar */}
      <div style={{
        flexShrink: 0,
        background: 'rgba(10,10,12,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)', padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <button onClick={onBack} style={backBtnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Strategies
          </button>
          <div style={{ width: '1px', height: '16px', background: 'var(--border)', flexShrink: 0 }} />
          <span style={{ fontSize: '16px', flexShrink: 0 }}>{STRATEGY_ICONS[strategy.id]}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{strategy.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '1px' }}>
              Rank {fmtRank(profile.jee_rank)} · {choices.length} choices
            </div>
          </div>
        </div>
        <div style={{
          fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--accent)',
          background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)',
          borderRadius: '20px', padding: '3px 10px', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {strategy.tagline}
        </div>
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 32px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {choices.map((c, idx) => (
            <ChoiceRow key={c.id} choice={c} rank={profile.jee_rank} idx={idx} fmtRank={fmtRank} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChoiceRow({ choice, rank, idx, fmtRank }) {
  const [hov, setHov] = useState(false);

  const typeColors = {
    IIT:  { bg: 'rgba(108,92,231,0.12)', text: '#a78bfa', border: 'rgba(108,92,231,0.25)' },
    NIT:  { bg: 'rgba(0,212,170,0.1)',   text: '#4dd0b1', border: 'rgba(0,212,170,0.2)' },
    IIIT: { bg: 'rgba(255,107,53,0.1)',  text: '#ff8c5a', border: 'rgba(255,107,53,0.2)' },
    GFTI: { bg: 'rgba(138,138,149,0.1)', text: '#8a8a95', border: 'rgba(138,138,149,0.2)' },
  };
  const tc = typeColors[choice.type] || typeColors.GFTI;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(255,107,53,0.04)' : 'var(--surface)',
        border: hov ? '1px solid rgba(255,107,53,0.25)' : '1px solid var(--border)',
        borderRadius: '16px', padding: '16px 18px',
        transition: 'all 0.15s', cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>

        {/* Number */}
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--text-muted)', fontWeight: 600,
        }}>
          {idx + 1}
        </div>

        {/* Main info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '3px', lineHeight: 1.3 }}>
                {choice.institute}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {choice.program}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px',
                  background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
                  fontFamily: 'var(--mono)',
                }}>
                  {choice.type}
                </span>
                <SafetyPill rank={rank} closingRank={choice.closingRank} />
              </div>
            </div>

            {/* Ranks */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginBottom: '2px' }}>Closing rank</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                {fmtRank(choice.closingRank)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
                Opening: {fmtRank(choice.openingRank)}
              </div>
            </div>
          </div>

          {/* Reasoning */}
          {choice.explanation?.reasoning && (
            <div style={{
              marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)',
              lineHeight: 1.6, padding: '8px 12px',
              background: 'var(--surface-2)', borderRadius: '8px',
              borderLeft: '2px solid var(--border)',
            }}>
              {choice.explanation.reasoning}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared tiny helpers ──────────────────────────────────────────────────────

const backBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)',
  background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: 'var(--sans)', padding: 0, transition: 'color 0.15s',
};

function ChevronIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
    >
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Root page ────────────────────────────────────────────────────────────────

export default function SimulatorPage() {
  const router = useRouter();
  const [step, setStep] = useState('setup'); // 'setup' | 'strategy' | 'results'
  const [profile, setProfile] = useState(null);
  const [strategyId, setStrategyId] = useState(null);

  const handleLaunch = (p) => {
    setProfile(p);
    setStep('strategy');
  };

  const handlePickStrategy = (sid) => {
    setStrategyId(sid);
    setStep('results');
  };

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Header */}
      <header style={{
        position: 'relative', zIndex: 100, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px',
        background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
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

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {['setup', 'strategy', 'results'].map((s, i) => (
            <div key={s} style={{
              width: step === s ? '20px' : '6px', height: '6px', borderRadius: '3px',
              background: step === s ? 'var(--accent)' : 'var(--border)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </header>

      {/* Step content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflowY: step === 'setup' ? 'auto' : 'hidden' }}>
        {step === 'setup' && (
          <StepSetup onLaunch={handleLaunch} />
        )}
        {step === 'strategy' && profile && (
          <StepStrategy
            profile={profile}
            onPick={handlePickStrategy}
            onBack={() => setStep('setup')}
          />
        )}
        {step === 'results' && profile && strategyId && (
          <StepResults
            profile={profile}
            strategyId={strategyId}
            onBack={() => setStep('strategy')}
          />
        )}
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
