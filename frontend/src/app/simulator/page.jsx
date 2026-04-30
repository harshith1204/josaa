'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../landing.css';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  simulatorChoices,
  instituteTypes,
  allInstitutes,
  allPrograms,
} from '@/data/simulator-choices';
import { generateStrategy } from '@/data/simulator-strategies';
import { abbrevInstitute, abbrevProgram } from '@/lib/simulator-abbrev';

function fmtNum(n) {
  return n?.toLocaleString?.() ?? n;
}

// ─── Institute → zone mapping ──────────────────────────────────────────────────

const INSTITUTE_ZONES = {
  // IITs
  'Indian Institute of Technology Bombay': 'West',
  'Indian Institute of Technology Delhi': 'North',
  'Indian Institute of Technology Madras': 'South',
  'Indian Institute of Technology Kharagpur': 'East',
  'Indian Institute of Technology Kanpur': 'North',
  'Indian Institute of Technology Roorkee': 'North',
  'Indian Institute of Technology Guwahati': 'NE',
  'Indian Institute of Technology Hyderabad': 'South',
  'Indian Institute of Technology Gandhinagar': 'West',
  'Indian Institute of Technology Jodhpur': 'West',
  'Indian Institute of Technology Patna': 'East',
  'Indian Institute of Technology Bhubaneswar': 'East',
  'Indian Institute of Technology Mandi': 'North',
  'Indian Institute of Technology Indore': 'Central',
  'Indian Institute of Technology (BHU) Varanasi': 'North',
  'Indian Institute of Technology (ISM) Dhanbad': 'East',
  'Indian Institute of Technology Tirupati': 'South',
  'Indian Institute of Technology Palakkad': 'South',
  'Indian Institute of Technology Dharwad': 'South',
  'Indian Institute of Technology Jammu': 'North',
  'Indian Institute of Technology Bhilai': 'Central',
  'Indian Institute of Technology Goa': 'West',
  'Indian Institute of Technology Varanasi': 'North',
  // NITs
  'National Institute of Technology Tiruchirappalli': 'South',
  'National Institute of Technology Warangal': 'South',
  'National Institute of Technology Karnataka Surathkal': 'South',
  'National Institute of Technology Calicut': 'South',
  'National Institute of Technology Rourkela': 'East',
  'Motilal Nehru National Institute of Technology Allahabad': 'North',
  'National Institute of Technology Delhi': 'North',
  'National Institute of Technology Durgapur': 'East',
  'National Institute of Technology Silchar': 'NE',
  'National Institute of Technology Agartala': 'NE',
  'National Institute of Technology Manipur': 'NE',
  'National Institute of Technology Meghalaya': 'NE',
  'National Institute of Technology Mizoram': 'NE',
  'National Institute of Technology Nagaland': 'NE',
  'National Institute of Technology Sikkim': 'NE',
  'National Institute of Technology Arunachal Pradesh': 'NE',
  'National Institute of Technology Srinagar': 'North',
  'Malaviya National Institute of Technology Jaipur': 'West',
  'National Institute of Technology Kurukshetra': 'North',
  'Dr. B R Ambedkar National Institute of Technology Jalandhar': 'North',
  'National Institute of Technology Hamirpur': 'North',
  'National Institute of Technology Uttarakhand': 'North',
  'National Institute of Technology Patna': 'East',
  'National Institute of Technology Raipur': 'Central',
  'Maulana Azad National Institute of Technology Bhopal': 'Central',
  'National Institute of Technology Goa': 'West',
  'National Institute of Technology Puducherry': 'South',
  'National Institute of Technology Andhra Pradesh': 'South',
  'Sardar Vallabhbhai National Institute of Technology Surat': 'West',
  // IIITs
  'Indian Institute of Information Technology Hyderabad': 'South',
  'Indian Institute of Information Technology Allahabad': 'North',
  'Indian Institute of Information Technology Delhi': 'North',
  'Indian Institute of Information Technology Bangalore': 'South',
  'Atal Bihari Vajpayee Indian Institute of Information Technology and Management Gwalior': 'Central',
  'Indian Institute of Information Technology Design and Manufacturing Kancheepuram': 'South',
  'Indian Institute of Information Technology Sri City Chittoor': 'South',
  'Indian Institute of Information Technology Kottayam': 'South',
  'Indian Institute of Information Technology Guwahati': 'NE',
  'Indian Institute of Information Technology Kalyani': 'East',
  'Indian Institute of Information Technology Una': 'North',
  'Indian Institute of Information Technology Lucknow': 'North',
  'Indian Institute of Information Technology Manipur': 'NE',
  'Indian Institute of Information Technology Nagpur': 'West',
  'Indian Institute of Information Technology Pune': 'West',
  'Indian Institute of Information Technology Vadodara': 'West',
  'Indian Institute of Information Technology Bhopal': 'Central',
  'Indian Institute of Information Technology Jabalpur': 'Central',
  'Indian Institute of Information Technology Raipur': 'Central',
  'Indian Institute of Information Technology Design and Manufacturing Jabalpur': 'Central',
  'Indian Institute of Information Technology Dharwad': 'South',
  'Indian Institute of Information Technology Tiruchirappalli': 'South',
};

// ─── Loading screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c' }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2.5"
        style={{ animation: 'spin 0.8s linear infinite' }}>
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
      </svg>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────

function ProfileDropdown({ name, email }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initial = (name || email || '?')[0].toUpperCase();

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      const sb = getSupabase();
      if (sb) await sb.auth.signOut();
    }
    router.push('/auth');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          border: open ? '2px solid rgba(255,107,53,0.6)' : '2px solid transparent',
          cursor: 'pointer', fontSize: '14px', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          boxShadow: open ? '0 0 0 3px rgba(255,107,53,0.2)' : 'none',
          flexShrink: 0,
        }}
        aria-label="Profile menu"
      >
        {initial}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: '#1a1a22', border: '1px solid var(--border)',
          borderRadius: '12px', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          minWidth: '210px', zIndex: 1000, overflow: 'hidden',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, flexShrink: 0 }}>
                {initial}
              </div>
              <div style={{ minWidth: 0 }}>
                {name && <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>}
                {email && <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</div>}
              </div>
            </div>
          </div>

          <div style={{ padding: '6px 0' }}>
            <button
              onClick={() => { setOpen(false); router.push('/simulator/details?edit=true'); }}
              style={{ width: '100%', textAlign: 'left', padding: '9px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,53,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Profile
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
            <button
              onClick={handleLogout}
              style={{ width: '100%', textAlign: 'left', padding: '9px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Choice detail modal ──────────────────────────────────────────────────────

const TYPE_DOT_STYLE = {
  IIT:  { background: 'var(--accent-3)', boxShadow: '0 0 10px rgba(108, 92, 231, 0.4)' },
  NIT:  { background: 'var(--accent-2)', boxShadow: '0 0 10px rgba(0, 212, 170, 0.35)' },
  IIIT: { background: 'var(--accent)',   boxShadow: '0 0 10px rgba(255, 107, 53, 0.35)' },
  GFTI: { background: 'var(--text-muted)', boxShadow: 'none' },
};

function ChoiceModal({ choice, userRank, filledIds, onAdd, onRemove, onClose }) {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const isInList = filledIds.has(choice.id);
  const canGetSeat = userRank <= choice.closingRank;
  const spread = choice.closingRank - choice.openingRank;
  const dotStyle = TYPE_DOT_STYLE[choice.type] || TYPE_DOT_STYLE.GFTI;

  const instShort = abbrevInstitute(choice.institute);
  const progShort = abbrevProgram(choice.program);
  const chips = [
    `${progShort} cutoff at ${instShort}`,
    `${instShort} placements`,
    `${progShort.split(/[·(]/)[0].trim()} scope & salary`,
  ];

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const askAI = async (q) => {
    if (!q.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResult('');
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setAiResult(data.answer || 'No response received.');
    } catch {
      setAiResult('Could not connect to AI. Please try again.');
    }
    setAiLoading(false);
  };

  return (
    <div className="sim-choice-modal-overlay" onClick={onClose}>
      <div className="sim-choice-modal" onClick={e => e.stopPropagation()}>
        <button type="button" className="sim-choice-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="sim-choice-type-dot" style={dotStyle} aria-hidden />
            <span className="sim-choice-institute">{instShort}</span>
          </div>
          <div className="sim-choice-program">{progShort}</div>
          {(choice.institute !== instShort || choice.program !== progShort) && (
            <div className="sim-choice-full-detail">
              {choice.institute !== instShort && <div>{choice.institute}</div>}
              {choice.program !== progShort && <div style={{ marginTop: choice.institute !== instShort ? 4 : 0 }}>{choice.program}</div>}
            </div>
          )}
          <div className="sim-choice-meta">
            {choice.type} &nbsp;•&nbsp; JoSAA 2025 R6 &nbsp;•&nbsp; {choice.seatType}
          </div>
        </div>

        <div className="sim-choice-stat-grid">
          {[
            { label: 'OPENING RANK', value: fmtNum(choice.openingRank) },
            { label: 'CLOSING RANK', value: fmtNum(choice.closingRank) },
            { label: 'SPREAD',       value: fmtNum(spread) },
            {
              label: 'YOUR RANK',
              value: fmtNum(userRank),
              valueStyle: { color: canGetSeat ? 'var(--accent-2)' : 'var(--accent)' },
            },
          ].map(({ label, value, valueStyle }) => (
            <div key={label} className="sim-choice-stat-card">
              <div className="sim-choice-stat-label">{label}</div>
              <div className="sim-choice-stat-value" style={valueStyle}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '16px' }}>
          {canGetSeat ? (
            <div className="sim-choice-banner sim-choice-banner--ok">
              ✓ Your rank qualifies for this seat
            </div>
          ) : (
            <div className="sim-choice-banner sim-choice-banner--warn">
              Need {fmtNum(userRank - choice.closingRank)} better rank to get this seat
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          {isInList ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span className="sim-choice-in-list">✓ Already in your list</span>
              <button type="button" className="sim-choice-remove-btn" onClick={() => onRemove(choice.id)}>
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="sim-choice-add-btn"
              onClick={() => { onAdd(choice); onClose(); }}
            >
              + Add to List
            </button>
          )}
        </div>

        <div className="sim-choice-ai-section">
          <div className="sim-choice-ai-label">ASK AI</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            {chips.map((chip, i) => (
              <button
                type="button"
                key={i}
                className="sim-choice-chip"
                onClick={() => { setAiQuery(chip); askAI(chip); }}
              >
                {chip}
              </button>
            ))}
          </div>
          {aiLoading && (
            <div className="sim-choice-ai-loading">Thinking…</div>
          )}
          {aiResult && !aiLoading && (
            <div className="sim-choice-ai-result">{aiResult}</div>
          )}
          <div className="sim-choice-input-row">
            <input
              className="sim-choice-input"
              value={aiQuery}
              onChange={e => setAiQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && askAI(aiQuery)}
              placeholder={`Ask anything about ${progShort} at ${instShort}…`}
            />
            <button
              type="button"
              className="sim-choice-ask-btn"
              onClick={() => askAI(aiQuery)}
              disabled={aiLoading || !aiQuery.trim()}
            >
              {aiLoading ? '…' : 'Ask'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Custom filter dropdown ───────────────────────────────────────────────────

function FilterDropdown({ value, options, onChange, placeholder, searchable = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setQuery(''); }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && searchable && searchRef.current) searchRef.current.focus();
  }, [open, searchable]);

  const filtered = query
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleSelect = (opt) => { onChange(opt); setOpen(false); setQuery(''); };

  return (
    <div ref={ref} style={{ flex: 1, position: 'relative', minWidth: 0 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '7px 10px', background: '#fff',
          border: open ? '1px solid #1a73e8' : '1px solid #ced4da',
          borderRadius: '4px', cursor: 'pointer', fontSize: '13px', color: '#333',
          boxShadow: open ? '0 0 0 2px rgba(26,115,232,0.15)' : 'none',
          transition: 'border-color 0.15s', textAlign: 'left', gap: '6px',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {value || placeholder}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: '#fff', border: '1px solid #ced4da',
          borderRadius: '6px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          zIndex: 500, overflow: 'hidden',
        }}>
          {searchable && (
            <div style={{ padding: '8px 8px 4px' }}>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                style={{ width: '100%', padding: '5px 8px', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '10px 12px', fontSize: '12px', color: '#999' }}>No results</div>
            ) : filtered.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                style={{
                  width: '100%', textAlign: 'left', padding: '7px 12px',
                  background: opt === value ? '#e8f0fe' : 'none',
                  border: 'none', cursor: 'pointer', fontSize: '13px',
                  color: opt === value ? '#1a73e8' : '#333',
                  fontWeight: opt === value ? 600 : 400,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
                onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = '#f5f5f5'; }}
                onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = 'none'; }}
              >
                {opt === value && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="3" style={{ flexShrink: 0 }}>
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                )}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Strategy Bot Panel ───────────────────────────────────────────────────────

const STRATEGIES = [
  { id: 'safe',       icon: '🛡️', label: 'Safe' },
  { id: 'moderate',   icon: '⚖️', label: 'Moderate' },
  { id: 'aggressive', icon: '🔥', label: 'Aggressive' },
  { id: 'branch',     icon: '💻', label: 'Branch' },
  { id: 'college',    icon: '🏛️', label: 'College' },
];

const TYPE_CONFIG = [
  { label: 'IITs',  typeFull: 'Indian Institute of Technology',            color: '#7c3aed' },
  { label: 'NITs',  typeFull: 'National Institute of Technology',           color: '#2563eb' },
  { label: 'IIITs', typeFull: 'Indian Institute of Information Technology', color: '#ea580c' },
  { label: 'GFTIs', typeFull: 'Other GFTIs',                               color: '#6b7280' },
];

const ZONE_CONFIG = [
  { zone: 'North',   label: 'North',      letter: 'N',  color: '#3b82f6' },
  { zone: 'South',   label: 'South',      letter: 'S',  color: '#22c55e' },
  { zone: 'East',    label: 'East',       letter: 'E',  color: '#ca8a04' },
  { zone: 'West',    label: 'West',       letter: 'W',  color: '#f97316' },
  { zone: 'Central', label: 'Central',    letter: 'C',  color: '#8b5cf6' },
  { zone: 'NE',      label: 'North East', letter: 'NE', color: '#ec4899' },
];

function BotPanel({
  filledChoices, setFilledChoices,
  rank, category,
  filterType, setFilterType,
  filterZone, setFilterZone,
  messages, setMessages,
  filledFilter, setFilledFilter,
}) {
  const [inputText, setInputText] = useState('');
  const [convoState, setConvoState] = useState('idle'); // 'idle' | 'awaiting_count'
  const [pendingStrategy, setPendingStrategy] = useState(null);
  const messagesEndRef = useRef(null);

  // Safety counts (rank / closingRank); ignore invalid closing ranks
  const { safeCount, midCount, riskyCount } = useMemo(() => {
    let s = 0, m = 0, r = 0;
    for (const c of filledChoices) {
      if (c.closingRank <= 0) continue;
      const t = rank / c.closingRank;
      if (t <= 0.75) s++;
      else if (t <= 1.05) m++;
      else r++;
    }
    return { safeCount: s, midCount: m, riskyCount: r };
  }, [filledChoices, rank]);
  const total = filledChoices.length;
  const ratioSum = safeCount + midCount + riskyCount;

  // Best highlights from filled list
  const bestIIT = filledChoices.find(c => c.type === 'IIT');
  const bestCS  = filledChoices.find(c => c.program.toLowerCase().includes('computer science'));

  // Eligible counts (rank <= closingRank) per type and zone
  const eligibleCounts = useMemo(() => {
    const eligible = simulatorChoices.filter(c => rank <= c.closingRank);
    const byType = {};
    for (const { label, typeFull } of TYPE_CONFIG) {
      byType[label] = eligible.filter(c => c.typeFull === typeFull).length;
    }
    const byZone = {};
    for (const { zone } of ZONE_CONFIG) {
      byZone[zone] = eligible.filter(c => (INSTITUTE_ZONES[c.institute] || 'Other') === zone).length;
    }
    return { byType, byZone };
  }, [rank]);

  // Welcome message on mount — includes a live stats card message
  useEffect(() => {
    if (messages.length === 0) {
      const eligibleTotal = simulatorChoices.filter(c => rank <= c.closingRank).length;
      setMessages([
        { role: 'bot', text: "Hey! I'm your choice filling guide. I'll help you build the perfect preference list." },
        { role: 'bot', text: `Nice, rank **${fmtNum(rank)}**! Found **${eligibleTotal}** choices within your range. Want me to add them all, or pick a strategy?` },
        { role: 'bot', type: 'stats' },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addAllInRange = () => {
    const filledIds = new Set(filledChoices.map(c => c.id));
    const eligible = simulatorChoices.filter(c => rank <= c.closingRank && !filledIds.has(c.id));
    setFilledChoices(prev => [...prev, ...eligible]);
    setMessages(prev => [...prev,
      { role: 'bot', text: `Added **${eligible.length}** choices within your rank range to your list!` },
    ]);
  };

  const handleStrategyClick = (stratId, stratIcon, stratLabel) => {
    setMessages(prev => [...prev,
      { role: 'user', text: `${stratIcon} ${stratLabel}` },
      { role: 'bot', text: `Going with ${stratIcon} **${stratLabel}**! How many choices do you want?`, quickOptions: [10, 15, 25, 'All'] },
    ]);
    setPendingStrategy(stratId);
    setConvoState('awaiting_count');
  };

  const applyStrategyWithCount = (count) => {
    if (!pendingStrategy) return;
    const limit = count === 'All' ? 999 : Number(count);
    const result = generateStrategy(pendingStrategy, rank, limit);
    const strat = STRATEGIES.find(s => s.id === pendingStrategy);
    setFilledChoices(result.choices);
    setMessages(prev => [...prev,
      { role: 'user', text: String(count) },
      { role: 'bot', text: `Done! Added **${result.choices.length}** choices using ${strat.icon} ${strat.label}.` },
    ]);
    setPendingStrategy(null);
    setConvoState('idle');
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');

    if (convoState === 'awaiting_count') {
      const num = parseInt(text, 10);
      if (!isNaN(num) && num > 0) {
        applyStrategyWithCount(num);
      } else {
        setMessages(prev => [...prev,
          { role: 'user', text },
          { role: 'bot', text: 'Please enter a number like 10, 25, or tap one of the options.' },
        ]);
      }
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text }]);
    const lower = text.toLowerCase();
    let response;
    if (lower.includes('safe') || lower.includes('risk')) {
      response = `Your list has ${safeCount} safe, ${midCount} borderline, and ${riskyCount} risky choices. A solid list has more safe picks at the bottom and stretch goals at the top.`;
    } else if (lower.includes('iit')) {
      response = `IITs are the most competitive. Try "College 🏛️" to prioritise IITs/NITs for rank ${fmtNum(rank)}.`;
    } else if (lower.includes('cs') || lower.includes('computer')) {
      response = `CS has the highest cutoffs. Try "Branch 💻" to get the best CS options for rank ${fmtNum(rank)}.`;
    } else if (lower.includes('add all')) {
      addAllInRange();
      return;
    } else {
      response = `I can help you build your JoSAA list! Try the strategy buttons, or ask about IITs, CS programs, or safety.`;
    }
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 500);
  };

  const shortName = (name) => (name ? abbrevInstitute(name) : '—');

  // Bold **text** renderer
  const renderText = (text) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    );

  const safetyDefs = [
    { filter: 'ratio-safe',  count: safeCount,  bg: '#22c55e', dimBg: '#dcfce7', dimText: '#15803d', label: 'Safe'   },
    { filter: 'ratio-mid',   count: midCount,   bg: '#f59e0b', dimBg: '#fef3c7', dimText: '#b45309', label: 'Border' },
    { filter: 'ratio-risky', count: riskyCount, bg: '#ef4444', dimBg: '#fee2e2', dimText: '#b91c1c', label: 'Risky'  },
  ];

  // Inline stats card — rendered as a chat message, reads live state
  const StatsCard = () => {
    const denom = Math.max(ratioSum, 1);
    return (
    <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '16px', padding: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', marginTop: '4px' }}>

      {/* Safety breakdown */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Safety Breakdown</span>
          <span style={{ fontSize: '10px', color: '#9ca3af' }}>{total} filled · tap to filter</span>
        </div>

        {/* Proportional bar — text-free, never breaks */}
        <div style={{ height: '8px', borderRadius: '999px', background: '#f3f4f6', overflow: 'hidden', display: 'flex', marginBottom: '10px' }}>
          {total === 0 ? (
            <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '999px' }} />
          ) : (
            safetyDefs.map(seg => (
              <div
                key={seg.filter}
                style={{
                  flex: `${seg.count} 0 0`,
                  background: seg.bg,
                  opacity: filledFilter === seg.filter ? 1 : filledFilter !== 'full' ? 0.35 : 1,
                  transition: 'opacity 0.2s',
                  minWidth: seg.count > 0 ? '4px' : '0px',
                }}
              />
            ))
          )}
        </div>

        {/* Three tappable stat chips — fixed 3-column grid, never squeezes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
          {safetyDefs.map(seg => {
            const active = filledFilter === seg.filter;
            const pct = ratioSum > 0 ? Math.round((seg.count / denom) * 100) : 0;
            return (
              <button
                key={seg.filter}
                type="button"
                onClick={() => setFilledFilter(active ? 'full' : seg.filter)}
                style={{
                  border: active ? `1.5px solid ${seg.bg}` : '1.5px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '8px 6px',
                  background: active ? seg.dimBg : '#fafafa',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s',
                  outline: 'none',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 800, color: active ? seg.dimText : '#111', lineHeight: 1.1 }}>{seg.count}</div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: active ? seg.dimText : '#6b7280', marginTop: '2px', letterSpacing: '0.04em' }}>{seg.label}</div>
                {ratioSum > 0 && <div style={{ fontSize: '9px', color: active ? seg.bg : '#9ca3af', marginTop: '2px', fontWeight: 500 }}>{pct}%</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Best IIT / Best CS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {[
          { label: 'Best IIT', value: bestIIT ? shortName(bestIIT.institute) : '—' },
          { label: 'Best CS',  value: bestCS  ? shortName(bestCS.institute)  : '—' },
        ].map(({ label, value }) => (
          <div key={label} style={{ border: '1px solid #ebebeb', borderRadius: '12px', padding: '8px 10px' }}>
            <div style={{ fontSize: '9px', color: '#aaa', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '3px', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '13px', color: '#111', fontWeight: 700, lineHeight: 1.3 }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: '#f2f2f2', marginBottom: '12px' }} />

      {/* Institute Types */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#aaa', letterSpacing: '0.08em', marginBottom: '8px' }}>
          INSTITUTE TYPES <span style={{ fontWeight: 400 }}>(tap to select)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {TYPE_CONFIG.map(({ label, typeFull, color }) => {
            const count = eligibleCounts.byType[label] || 0;
            const active = filterType === typeFull;
            return (
              <button key={label}
                onClick={() => setFilterType(active ? 'All Institute Types' : typeFull)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.15s', border: `1.5px solid ${active ? color : '#e8e8e8'}`, background: active ? `${color}10` : '#fff' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: active ? color : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: active ? '#fff' : '#999', flexShrink: 0 }}>{count}</span>
                <span style={{ flex: 1, fontSize: '12px', color: '#222', fontWeight: 600, textAlign: 'left' }}>{label}</span>
                <span style={{ fontSize: '11px', opacity: 0.3, flexShrink: 0 }}>🚫</span>
                <span style={{ fontSize: '9px', color: '#ccc', flexShrink: 0 }}>▼</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ height: '1px', background: '#f2f2f2', marginBottom: '12px' }} />

      {/* Zones */}
      <div>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#aaa', letterSpacing: '0.08em', marginBottom: '8px' }}>
          ZONES — ELIGIBLE INSTITUTES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {ZONE_CONFIG.map(({ zone, label, letter, color }) => {
            const count = eligibleCounts.byZone[zone] || 0;
            const active = filterZone === zone;
            return (
              <button key={zone}
                onClick={() => setFilterZone(active ? '' : zone)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.15s', border: `1.5px solid ${active ? color : '#e8e8e8'}`, background: active ? `${color}12` : '#fff' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: letter.length > 1 ? '8px' : '10px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{letter}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#555', flexShrink: 0, minWidth: '20px' }}>{count}</span>
                <span style={{ flex: 1, fontSize: '12px', color: '#222', fontWeight: 500, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
                <span style={{ fontSize: '11px', opacity: 0.3, flexShrink: 0 }}>🚫</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
  };

  return (
    <div style={{ background: '#fafafa', display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Arial, sans-serif', fontSize: '13px' }}>

      {/* Chat — scrollable, contains all messages including the live stats card */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 10px', minHeight: 0 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            {msg.type === 'stats' ? (
              <StatsCard />
            ) : msg.role === 'bot' ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#ff6b35', fontSize: '18px', lineHeight: '1.45', flexShrink: 0 }}>●</span>
                <div style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: 1.65 }}>
                  {renderText(msg.text)}
                  {msg.quickOptions && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                      {msg.quickOptions.map(opt => (
                        <button key={opt} onClick={() => applyStrategyWithCount(opt)}
                          style={{ padding: '6px 20px', border: '1.5px solid #d0d0d0', borderRadius: '20px', background: '#fff', cursor: 'pointer', fontSize: '13px', color: '#333', fontWeight: 500, transition: 'all 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.borderColor = '#bbb'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#d0d0d0'; }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ padding: '9px 16px', background: '#efefef', borderRadius: '18px 18px 4px 18px', fontSize: '13px', color: '#333', maxWidth: '85%', lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Strategy pills — single horizontal scroll row, no wrap */}
      <div style={{ borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <button onClick={addAllInRange}
            style={{ padding: '7px 12px', border: '1.5px solid #e8e8e8', borderRadius: '20px', background: '#fff', cursor: 'pointer', fontSize: '12px', color: '#333', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            + Add all
          </button>
          {STRATEGIES.map(({ id, icon, label }) => (
            <button key={id}
              onClick={() => handleStrategyClick(id, icon, label)}
              style={{ padding: '7px 12px', border: '1.5px solid #e8e8e8', borderRadius: '20px', background: '#fff', cursor: 'pointer', fontSize: '12px', color: '#333', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Input — always pinned at bottom */}
      <div style={{ padding: '0 12px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #e8e8e8', borderRadius: '24px', padding: '6px 6px 6px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={convoState === 'awaiting_count' ? 'How many choices? Type a number...' : 'Pick a strategy or type one...'}
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#333' }}
          />
          <button
            onClick={sendMessage}
            style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#ff6b35', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(255,107,53,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '10px', color: '#ccc', margin: '6px 0 0', lineHeight: 1.4 }}>
          cutoffs.ai can make mistakes. Verify important info.
        </p>
      </div>

      <style>{`.bot-scroll::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

// ─── JoSAA Choice Filling Interface ──────────────────────────────────────────

function ChoiceFillingScreen({ profile }) {
  const router = useRouter();
  const [filledChoices, setFilledChoices] = useState([]);
  const [filterType, setFilterType] = useState('All Institute Types');
  const [filterInstitute, setFilterInstitute] = useState('All Institutes');
  const [filterProgram, setFilterProgram] = useState('All Programs');
  const [filterZone, setFilterZone] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchApplied, setSearchApplied] = useState('');
  const [filledFilter, setFilledFilter] = useState('full');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [botMessages, setBotMessages] = useState([]);

  const rank = profile.jee_rank;

  const filledIds = useMemo(() => new Set(filledChoices.map(c => c.id)), [filledChoices]);

  const availableChoices = useMemo(() => {
    let list = simulatorChoices;
    if (filterType !== 'All Institute Types') list = list.filter(c => c.typeFull === filterType);
    if (filterInstitute !== 'All Institutes') list = list.filter(c => c.institute === filterInstitute);
    if (filterProgram !== 'All Programs') list = list.filter(c => c.program === filterProgram);
    if (filterZone) list = list.filter(c => (INSTITUTE_ZONES[c.institute] || 'Other') === filterZone);
    if (searchApplied) {
      const q = searchApplied.toLowerCase();
      list = list.filter(c => c.institute.toLowerCase().includes(q) || c.program.toLowerCase().includes(q));
    }
    return list.filter(c => !filledIds.has(c.id));
  }, [filterType, filterInstitute, filterProgram, filterZone, searchApplied, filledIds]);

  const openingCount = useMemo(() => filledChoices.filter(c => c.openingRank < rank).length, [filledChoices, rank]);
  const middleCount  = useMemo(() => filledChoices.filter(c => c.openingRank <= rank && c.closingRank >= rank).length, [filledChoices, rank]);
  const closingCount = useMemo(() => filledChoices.filter(c => c.closingRank > rank).length, [filledChoices, rank]);

  const { ratioSafeCount, ratioMidCount, ratioRiskyCount } = useMemo(() => {
    let s = 0, m = 0, r = 0;
    for (const c of filledChoices) {
      if (c.closingRank <= 0) continue;
      const t = rank / c.closingRank;
      if (t <= 0.75) s++;
      else if (t <= 1.05) m++;
      else r++;
    }
    return { ratioSafeCount: s, ratioMidCount: m, ratioRiskyCount: r };
  }, [filledChoices, rank]);

  const ratioOf = (c) => (c.closingRank > 0 ? rank / c.closingRank : Infinity);

  const displayedFilled = useMemo(() => {
    if (filledFilter === 'ratio-safe')
      return filledChoices.filter(c => c.closingRank > 0 && ratioOf(c) <= 0.75);
    if (filledFilter === 'ratio-mid')
      return filledChoices.filter(c => {
        if (c.closingRank <= 0) return false;
        const r = ratioOf(c);
        return r > 0.75 && r <= 1.05;
      });
    if (filledFilter === 'ratio-risky')
      return filledChoices.filter(c => c.closingRank > 0 && ratioOf(c) > 1.05);
    if (filledFilter === 'opening') return filledChoices.filter(c => c.openingRank < rank);
    if (filledFilter === 'middle')  return filledChoices.filter(c => c.openingRank <= rank && c.closingRank >= rank);
    if (filledFilter === 'closing') return filledChoices.filter(c => c.closingRank > rank);
    return filledChoices;
  }, [filledFilter, filledChoices, rank]);

  const addChoice    = (choice) => { setFilledChoices(prev => [...prev, { ...choice }]); setSaved(false); };
  const removeChoice = (id)     => { setFilledChoices(prev => prev.filter(c => c.id !== id)); setSaved(false); };

  const moveUp = (gIdx) => {
    if (gIdx === 0) return;
    setFilledChoices(prev => { const next = [...prev]; [next[gIdx - 1], next[gIdx]] = [next[gIdx], next[gIdx - 1]]; return next; });
    setSaved(false);
  };

  const moveDown = (gIdx) => {
    setFilledChoices(prev => {
      if (gIdx >= prev.length - 1) return prev;
      const next = [...prev]; [next[gIdx], next[gIdx + 1]] = [next[gIdx + 1], next[gIdx]]; return next;
    });
    setSaved(false);
  };

  const globalIdx = (id) => filledChoices.findIndex(c => c.id === id);

  const handleSave = async () => {
    setSaving(true);
    if (isSupabaseConfigured()) {
      const sb = getSupabase();
      if (sb) {
        const { data: { user } } = await sb.auth.getUser();
        if (user) await sb.auth.updateUser({ data: { saved_choices: filledChoices.map(c => c.id) } });
      }
    }
    setSaving(false);
    setSaved(true);
  };

  const handleSaveAndHome = async () => { await handleSave(); router.push('/'); };

  const handleDownloadPDF = async () => {
    if (!filledChoices.length) { alert('Please add at least one choice before downloading.'); return; }
    const jspdf = await import('jspdf').catch(() => null);
    if (!jspdf) { alert('PDF export unavailable.'); return; }
    const doc = new jspdf.jsPDF();
    doc.setFontSize(14); doc.setTextColor(255, 107, 53);
    doc.text('cutoffs.ai — JoSAA Simulator', 14, 16);
    doc.setFontSize(11); doc.setTextColor(60, 60, 60);
    doc.text(`Rank: ${fmtNum(rank)} | ${profile.category} | ${profile.home_state} | ${profile.gender}`, 14, 24);
    doc.setDrawColor(200, 200, 200); doc.line(14, 28, 196, 28);
    let y = 36;
    doc.setFontSize(9); doc.setTextColor(120, 120, 120);
    doc.text('#', 14, y); doc.text('Institute', 22, y); doc.text('Program', 100, y);
    doc.text('Opening CR', 155, y); doc.text('Closing CR', 178, y);
    y += 8; doc.setFontSize(10); doc.setTextColor(40, 40, 40);
    filledChoices.forEach((c, i) => {
      if (y > 275) { doc.addPage(); y = 16; }
      doc.text(String(i + 1), 14, y);
      doc.text(abbrevInstitute(c.institute), 22, y);
      doc.setFontSize(8); doc.text(abbrevProgram(c.program), 100, y); doc.setFontSize(10);
      doc.text(fmtNum(c.openingRank), 155, y); doc.text(fmtNum(c.closingRank), 178, y);
      y += 8; doc.setDrawColor(235, 235, 235); doc.line(14, y - 3, 196, y - 3);
    });
    doc.save(`josaa-choices-rank-${rank}.pdf`);
  };

  const applyFilter = () => setSearchApplied(searchText);
  const clearFilter = () => { setSearchText(''); setSearchApplied(''); setFilterType('All Institute Types'); setFilterInstitute('All Institutes'); setFilterProgram('All Programs'); setFilterZone(''); };

  const pillStyle = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px',
    border: active ? '2px solid #1a6b3f' : '2px solid #ccc',
    background: active ? '#e8f5e9' : '#fff', color: active ? '#1a6b3f' : '#555',
    fontWeight: active ? 700 : 400,
  });

  const pillBadge = (n, active) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: active ? '#1a6b3f' : '#888', color: '#fff', fontSize: '11px', fontWeight: 700 }}>{n}</span>
  );

  return (
    <div style={{ background: '#f8f9fa', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif', fontSize: '14px', overflow: 'hidden' }}>

      {/* Dark nav — matches landing page */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px',
        background: 'rgba(10,10,12,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #2a2a32',
        flexShrink: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', minWidth: 0 }}>
          {/* Logo — same wordmark treatment as landing nav */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}
          >
            <span className="brand-dot" aria-hidden />
            <span className="nav-brand-split" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}>
              <span className="nav-brand-cutoffs">cutoffs</span>
              <span className="nav-brand-ai">.ai</span>
            </span>
          </Link>
          <span style={{ width: '1px', height: '16px', background: 'var(--border)', flexShrink: 0 }} />
          <div className="sim-nav-pill-row" style={{ minWidth: 0 }}>
            <span className="sim-nav-pill sim-nav-pill--accent">
              Rank {fmtNum(rank)} · {profile.category}
            </span>
            <span className="sim-nav-pill sim-nav-pill--muted">{profile.home_state}</span>
          </div>
        </div>
        <ProfileDropdown name={profile.name} email={profile.email} />
      </div>

      {/* Body: left scrollable content + right bot sidebar */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>

        {/* Left scrollable area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', minWidth: 0 }}>

          {/* Filters */}
          <div style={{ background: '#fff', border: '1px solid #dee2e6', borderRadius: '6px', padding: '14px 16px', marginBottom: '12px' }}>
            <strong style={{ fontSize: '13px', color: '#333', display: 'block', marginBottom: '10px' }}>View Available Choice(s) as</strong>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <FilterDropdown
                value={filterType}
                options={instituteTypes}
                onChange={setFilterType}
                placeholder="All Institute Types"
              />
              <FilterDropdown
                value={filterInstitute}
                options={allInstitutes}
                onChange={setFilterInstitute}
                placeholder="All Institutes"
                searchable
              />
              <FilterDropdown
                value={filterProgram}
                options={allPrograms}
                onChange={setFilterProgram}
                placeholder="All Programs"
                searchable
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={searchText} onChange={e => setSearchText(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilter()}
                placeholder="Enter institute or program name to Search and Filter"
                style={{ flex: 1, padding: '7px 12px', border: '1px solid #ced4da', borderRadius: '4px', fontSize: '13px' }} />
              <button onClick={applyFilter} style={{ padding: '7px 20px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Filter</button>
              <button onClick={clearFilter} style={{ padding: '7px 20px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Clear All</button>
            </div>
          </div>

          {/* Action buttons — symmetric bar, aligned with filter card + app accent */}
          <div
            className="sim-choice-action-bar-wrap"
            style={{
              marginBottom: '14px',
              padding: '12px 14px',
              background: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
            }}
          >
            <div className="sim-choice-action-bar">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  minHeight: '44px',
                  padding: '10px 16px',
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fff',
                  background: saving ? '#9ca3af' : 'var(--accent)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  boxShadow: saving ? 'none' : '0 2px 8px rgba(255, 107, 53, 0.22)',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
              >
                {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save and Continue'}
              </button>
              <button
                type="button"
                onClick={handleSaveAndHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  minHeight: '44px',
                  padding: '10px 16px',
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#2d2d33',
                  background: '#fff',
                  border: '1px solid #ced4da',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                Save and Go to Home
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  padding: '10px 16px',
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#f4f4f5',
                  background: '#3f3f46',
                  border: '1px solid #27272a',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                Download PDF
              </button>
            </div>
          </div>

          {/* Two-panel grid: compact tables; wider bot rail */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '10px', alignItems: 'start' }}>

            {/* Available Choices — compact row density */}
            <div style={{ background: '#fff', border: '1px solid #dee2e6', borderRadius: '6px', overflow: 'hidden', minWidth: 0 }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #dee2e6' }}>
                <strong style={{ fontSize: '14px', color: '#333' }}>Available Choice(s)</strong>
                <div style={{ color: '#d32f2f', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
                  Total available : {availableChoices.length}
                </div>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 300px)', overflowX: 'auto', overflowY: 'auto', minWidth: 0 }}>
                <table style={{ width: '100%', minWidth: 0, borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
                  <colgroup>
                    <col style={{ width: '40%' }} />
                    <col />
                    <col style={{ width: '74px' }} />
                  </colgroup>
                  <thead>
                    <tr style={{ background: '#495057', color: '#fff', position: 'sticky', top: 0 }}>
                      <th style={{ padding: '5px 6px 5px 8px', textAlign: 'left', fontWeight: 600 }}>Institute</th>
                      <th style={{ padding: '5px 2px 5px 6px', textAlign: 'left', fontWeight: 600 }}>Program</th>
                      <th style={{ padding: '5px 4px', textAlign: 'center', fontWeight: 600 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableChoices.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '18px', textAlign: 'center', color: '#888' }}>No choices match the current filters.</td></tr>
                    ) : availableChoices.map((c, i) => (
                      <tr key={c.id} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                        <td style={{ padding: '4px 6px 4px 8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <button onClick={() => setSelectedChoice(c)}
                            style={{ background: 'none', border: 'none', padding: 0, color: '#1a73e8', cursor: 'pointer', fontSize: '12px', textAlign: 'left', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.15s', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            onMouseEnter={e => e.currentTarget.style.textDecorationColor = '#1a73e8'}
                            onMouseLeave={e => e.currentTarget.style.textDecorationColor = 'transparent'}>
                            {abbrevInstitute(c.institute)}
                          </button>
                        </td>
                        <td style={{ padding: '4px 2px 4px 6px', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{abbrevProgram(c.program)}</td>
                        <td style={{ padding: '4px 4px', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <button onClick={() => addChoice(c)}
                            style={{ padding: '3px 10px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Filled Choices — even vertical spacing (stack uses same gap throughout) */}
            <div style={{ background: '#fff', border: '1px solid #dee2e6', borderRadius: '6px', overflow: 'hidden', minWidth: 0 }}>
              <div
                style={{
                  padding: '10px 12px',
                  borderBottom: '1px solid #dee2e6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', rowGap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', minWidth: 0 }}>
                    <strong style={{ fontSize: '14px', color: '#333', lineHeight: 1.25 }}>Filled Choice(s)</strong>
                    <span style={{ color: '#d32f2f', fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>
                      Total Filled : {filledChoices.length}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#555', fontWeight: 600, lineHeight: 1.25, flexShrink: 0 }}>
                    Saved: {saved ? filledChoices.length : 0}
                  </div>
                </div>
                <div
                  className="sim-filled-pills-scroll"
                  style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    minWidth: 0,
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <button type="button" onClick={() => setFilledFilter('full')} style={{ ...pillStyle(filledFilter === 'full'), flexShrink: 0 }}>
                    {pillBadge(filledChoices.length, filledFilter === 'full')} Full List
                  </button>
                  <button type="button" onClick={() => setFilledFilter('opening')} style={{ ...pillStyle(filledFilter === 'opening'), flexShrink: 0 }}>
                    {pillBadge(openingCount, filledFilter === 'opening')} Opening &lt;{fmtNum(rank)}
                  </button>
                  <button type="button" onClick={() => setFilledFilter('middle')} style={{ ...pillStyle(filledFilter === 'middle'), flexShrink: 0 }}>
                    {pillBadge(middleCount, filledFilter === 'middle')} Mid
                  </button>
                  <button type="button" onClick={() => setFilledFilter('closing')} style={{ ...pillStyle(filledFilter === 'closing'), flexShrink: 0 }}>
                    {pillBadge(closingCount, filledFilter === 'closing')} Closing &gt;{fmtNum(rank)}
                  </button>
                  <button type="button" onClick={() => setFilledFilter(filledFilter === 'ratio-safe' ? 'full' : 'ratio-safe')} style={{ ...pillStyle(filledFilter === 'ratio-safe'), flexShrink: 0 }}>
                    {pillBadge(ratioSafeCount, filledFilter === 'ratio-safe')} Safe
                  </button>
                  <button type="button" onClick={() => setFilledFilter(filledFilter === 'ratio-mid' ? 'full' : 'ratio-mid')} style={{ ...pillStyle(filledFilter === 'ratio-mid'), flexShrink: 0 }}>
                    {pillBadge(ratioMidCount, filledFilter === 'ratio-mid')} Border
                  </button>
                  <button type="button" onClick={() => setFilledFilter(filledFilter === 'ratio-risky' ? 'full' : 'ratio-risky')} style={{ ...pillStyle(filledFilter === 'ratio-risky'), flexShrink: 0 }}>
                    {pillBadge(ratioRiskyCount, filledFilter === 'ratio-risky')} Risky
                  </button>
                </div>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 300px)', overflowX: 'auto', overflowY: 'auto', minWidth: 0 }}>
                <table style={{ width: '100%', minWidth: 0, borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
                  <colgroup>
                    <col style={{ width: '28%' }} />
                    <col />
                    <col style={{ width: '34px' }} />
                    <col style={{ width: '68px' }} />
                    <col style={{ width: '36px' }} />
                    <col style={{ width: '52px' }} />
                  </colgroup>
                  <thead>
                    <tr style={{ background: '#198754', color: '#fff', position: 'sticky', top: 0 }}>
                      <th style={{ padding: '5px 6px 5px 8px', textAlign: 'left', fontWeight: 600 }}>Institute</th>
                      <th style={{ padding: '5px 2px 5px 6px', textAlign: 'left', fontWeight: 600 }}>Program</th>
                      <th style={{ padding: '5px 2px', textAlign: 'center', fontWeight: 600 }}>No.</th>
                      <th style={{ padding: '5px 4px', textAlign: 'center', fontWeight: 600 }}>Remove</th>
                      <th style={{ padding: '5px 4px', textAlign: 'center', fontWeight: 600 }}>Up</th>
                      <th style={{ padding: '5px 4px', textAlign: 'center', fontWeight: 600 }}>Down</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedFilled.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: '18px', textAlign: 'center', color: '#888' }}>
                        {filledChoices.length === 0 ? 'No choices filled yet. Use the Add button or ask the bot for a strategy.' : 'No choices in this category.'}
                      </td></tr>
                    ) : displayedFilled.map((c, dispIdx) => {
                      const gIdx = globalIdx(c.id);
                      return (
                        <tr key={c.id} style={{ background: dispIdx % 2 === 0 ? '#fff' : '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                          <td style={{ padding: '4px 6px 4px 8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <button onClick={() => setSelectedChoice(c)}
                              style={{ background: 'none', border: 'none', padding: 0, color: '#1a73e8', cursor: 'pointer', fontSize: '12px', textAlign: 'left', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.15s', display: 'block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => e.currentTarget.style.textDecorationColor = '#1a73e8'}
                              onMouseLeave={e => e.currentTarget.style.textDecorationColor = 'transparent'}>
                              {abbrevInstitute(c.institute)}
                            </button>
                          </td>
                          <td style={{ padding: '4px 2px 4px 6px', color: '#333', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{abbrevProgram(c.program)}</td>
                          <td style={{ padding: '4px 2px', textAlign: 'center', fontWeight: 700, color: '#333', fontSize: '12px' }}>{gIdx + 1}</td>
                          <td style={{ padding: '4px 4px', textAlign: 'center' }}>
                            <button type="button" onClick={() => removeChoice(c.id)}
                              style={{ padding: '2px 6px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
                              ✕
                            </button>
                          </td>
                          <td style={{ padding: '4px 3px', textAlign: 'center' }}>
                            <button type="button" onClick={() => moveUp(gIdx)} disabled={gIdx === 0}
                              style={{ padding: '2px 6px', background: gIdx === 0 ? '#ccc' : '#6c757d', color: '#fff', border: 'none', borderRadius: '3px', cursor: gIdx === 0 ? 'not-allowed' : 'pointer', fontSize: '11px', fontWeight: 600 }}>
                              ↑
                            </button>
                          </td>
                          <td style={{ padding: '4px 3px', textAlign: 'center' }}>
                            <button type="button" onClick={() => moveDown(gIdx)} disabled={gIdx >= filledChoices.length - 1}
                              style={{ padding: '2px 6px', background: gIdx >= filledChoices.length - 1 ? '#ccc' : '#6c757d', color: '#fff', border: 'none', borderRadius: '3px', cursor: gIdx >= filledChoices.length - 1 ? 'not-allowed' : 'pointer', fontSize: '11px', fontWeight: 600 }}>
                              ↓
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Bot sidebar — full height from nav to bottom */}
        <div style={{ width: 'min(500px, 44vw)', minWidth: '300px', flexShrink: 0, borderLeft: '1px solid #dee2e6', display: 'flex', flexDirection: 'column' }}>
          <BotPanel
            filledChoices={filledChoices}
            setFilledChoices={(choices) => { setFilledChoices(choices); setSaved(false); }}
            rank={rank}
            category={profile.category}
            filterType={filterType}
            setFilterType={setFilterType}
            filterZone={filterZone}
            setFilterZone={setFilterZone}
            messages={botMessages}
            setMessages={setBotMessages}
            filledFilter={filledFilter}
            setFilledFilter={setFilledFilter}
          />
        </div>

      </div>

      {/* Choice detail modal */}
      {selectedChoice && (
        <ChoiceModal
          choice={selectedChoice}
          userRank={rank}
          filledIds={filledIds}
          onAdd={addChoice}
          onRemove={removeChoice}
          onClose={() => setSelectedChoice(null)}
        />
      )}

      <style>{`
        @keyframes spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .sim-choice-action-bar {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          align-items: stretch;
          width: 100%;
        }
        @media (max-width: 720px) {
          .sim-choice-action-bar {
            grid-template-columns: 1fr;
          }
        }
        .sim-filled-pills-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .sim-filled-pills-scroll::-webkit-scrollbar {
          display: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}

// ─── Root page ────────────────────────────────────────────────────────────────

export default function SimulatorPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      router.replace('/simulator/details');
      return;
    }
    const sb = getSupabase();
    if (!sb) { router.replace('/simulator/details'); return; }

    sb.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.replace('/auth'); return; }
      const m = user.user_metadata || {};
      if (!m.jee_rank) {
        router.replace('/simulator/details');
        return;
      }
      setProfile({
        jee_rank:   m.jee_rank,
        category:   m.category   || 'General',
        home_state: m.home_state || '',
        gender:     m.gender     || 'Gender-Neutral',
        name:       m.full_name  || '',
        email:      user.email   || '',
      });
      setLoading(false);
    });
  }, [router]);

  if (loading) return <LoadingScreen />;
  return <ChoiceFillingScreen profile={profile} />;
}
