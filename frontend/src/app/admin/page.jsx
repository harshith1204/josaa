'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import '../landing.css';

const OWNER_EMAIL = 'harshithsai24@gmail.com';

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type = 'info', onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  const c = { success: { bg: 'rgba(0,212,170,0.1)', border: 'rgba(0,212,170,0.3)', text: 'var(--accent-2)' }, error: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#f87171' }, info: { bg: 'rgba(108,92,231,0.1)', border: 'rgba(108,92,231,0.3)', text: 'var(--accent-3)' } }[type];
  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, padding: '12px 18px', borderRadius: '12px', background: c.bg, border: `1px solid ${c.border}`, color: c.text, fontSize: '14px', fontFamily: 'var(--sans)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animation: 'toastIn 0.25s ease', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '320px' }}>
      {type === 'success' ? <CheckIcon size={15} /> : <InfoIcon size={15} />}
      {message}
    </div>
  );
}

// ── JSON Editor Modal ─────────────────────────────────────────────────────────
function JsonModal({ title, placeholder, initialValue, onProceed, onClose }) {
  const [value, setValue] = useState(initialValue || '');
  const [valid, setValid] = useState(initialValue ? tryParse(initialValue) : null);

  function tryParse(v) {
    if (!v.trim()) return null;
    try { JSON.parse(v); return true; } catch { return false; }
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '660px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Paste your JSON below, then click Proceed.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {valid !== null && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontFamily: 'var(--mono)', background: valid ? 'rgba(0,212,170,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${valid ? 'rgba(0,212,170,0.3)' : 'rgba(239,68,68,0.3)'}`, color: valid ? 'var(--accent-2)' : '#f87171' }}>
                {valid ? <CheckIcon size={11} /> : <XIcon size={11} />}{valid ? 'Valid' : 'Invalid'}
              </span>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}><XIcon size={18} /></button>
          </div>
        </div>

        <textarea
          value={value}
          onChange={e => { setValue(e.target.value); setValid(tryParse(e.target.value)); }}
          placeholder={placeholder}
          spellCheck={false}
          autoFocus
          style={{ width: '100%', height: '360px', padding: '14px 16px', resize: 'vertical', background: 'var(--surface-2)', border: `1px solid ${valid === false ? 'rgba(239,68,68,0.45)' : 'var(--border)'}`, borderRadius: '12px', fontSize: '13px', lineHeight: 1.75, color: 'var(--text)', fontFamily: 'var(--mono)', outline: 'none', transition: 'border-color 0.2s', caretColor: 'var(--accent)' }}
          onFocus={e => { if (valid !== false) e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = valid === false ? 'rgba(239,68,68,0.45)' : 'var(--border)'; }}
        />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { try { setValue(JSON.stringify(JSON.parse(value), null, 2)); setValid(true); } catch {} }} style={mBtn('#fff', 'var(--surface-2)', 'var(--border)')}>
              <CodeIcon /> Format
            </button>
            <button onClick={() => { setValue(''); setValid(null); }} style={mBtn('var(--text-muted)', 'transparent', 'var(--border)')}>Clear</button>
          </div>
          <button onClick={() => { if (valid !== false && value.trim()) onProceed(value.trim()); }} disabled={valid === false || !value.trim()} style={{ ...mBtn('#fff', valid === false || !value.trim() ? 'rgba(255,107,53,0.35)' : 'var(--accent)', 'transparent'), cursor: valid === false || !value.trim() ? 'not-allowed' : 'pointer' }}>
            Proceed →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Data Tab ──────────────────────────────────────────────────────────────────
function DataTab({ savedJson, onOpenJson, mediaFiles, mediaRefs, onMediaChange }) {
  const jsonItems = [
    { key: 'college',    label: 'College',    sub: 'Cutoffs, branches, seats & institute info',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
    { key: 'placements', label: 'Placements', sub: 'CTC, companies, year-wise placement data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  ];

  const mediaPills = [
    { key: 'hostel', label: 'Hostel',          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { key: 'class',  label: 'Classrooms',       icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { key: 'campus', label: 'Campus',           icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { key: 'extra',  label: 'Extra Curricular', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', gap: '16px', animation: 'fadeUp 0.22s ease' }}>

      {/* ── JSON card ── */}
      <div style={{ flex: '0 0 340px', display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', overflow: 'hidden' }}>
        <p style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '6px' }}>JSON DATA</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>Click a category to open the editor and paste structured data.</p>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
          {jsonItems.map(({ key, label, sub, icon }) => {
            const has = !!savedJson[key];
            return (
              <button key={key} onClick={() => onOpenJson(key)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '13px', border: `1px solid ${has ? 'rgba(0,212,170,0.35)' : 'var(--border)'}`, background: has ? 'rgba(0,212,170,0.05)' : 'var(--surface-2)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = has ? 'rgba(0,212,170,0.6)' : 'rgba(255,107,53,0.4)'; e.currentTarget.style.background = has ? 'rgba(0,212,170,0.09)' : 'rgba(255,107,53,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = has ? 'rgba(0,212,170,0.35)' : 'var(--border)'; e.currentTarget.style.background = has ? 'rgba(0,212,170,0.05)' : 'var(--surface-2)'; }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0, background: has ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${has ? 'rgba(0,212,170,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: has ? 'var(--accent-2)' : 'var(--text-muted)' }}>
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{label}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{has ? 'Data loaded' : sub}</p>
                </div>
                {has
                  ? <CheckIcon size={16} color="var(--accent-2)" />
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                }
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Media card ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', overflow: 'hidden' }}>
        <p style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '6px' }}>MEDIA</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Select a category to upload images or videos.</p>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px', minHeight: 0 }}>
          {mediaPills.map(({ key, label, icon }) => {
            const count = mediaFiles[key]?.length ?? 0;
            return (
              <div key={key}>
                <input ref={el => mediaRefs.current[key] = el} type="file" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={e => onMediaChange(key, e)} />
                <button
                  onClick={() => mediaRefs.current[key]?.click()}
                  style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '14px', border: `1px solid ${count > 0 ? 'rgba(108,92,231,0.35)' : 'var(--border)'}`, background: count > 0 ? 'rgba(108,92,231,0.06)' : 'var(--surface-2)', cursor: 'pointer', transition: 'all 0.2s', color: count > 0 ? 'var(--accent-3)' : 'var(--text-muted)', position: 'relative' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = count > 0 ? 'rgba(108,92,231,0.6)' : 'rgba(255,107,53,0.4)'; e.currentTarget.style.color = count > 0 ? 'var(--accent-3)' : 'var(--text)'; e.currentTarget.style.background = count > 0 ? 'rgba(108,92,231,0.1)' : 'rgba(255,107,53,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = count > 0 ? 'rgba(108,92,231,0.35)' : 'var(--border)'; e.currentTarget.style.color = count > 0 ? 'var(--accent-3)' : 'var(--text-muted)'; e.currentTarget.style.background = count > 0 ? 'rgba(108,92,231,0.06)' : 'var(--surface-2)'; }}
                >
                  {count > 0 && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', minWidth: '20px', height: '20px', padding: '0 5px', borderRadius: '10px', background: 'rgba(108,92,231,0.2)', border: '1px solid rgba(108,92,231,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--accent-3)' }}>
                      {count}
                    </span>
                  )}
                  <span style={{ opacity: count > 0 ? 1 : 0.55 }}>{icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--sans)', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', opacity: 0.65 }}>
                    {count > 0 ? `${count} file${count > 1 ? 's' : ''} selected` : 'Click to upload'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ── Admin Access Tab ──────────────────────────────────────────────────────────
function AdminAccessTab({ users, usersLoading, usersError, searchQuery, setSearchQuery, togglingUser, onLoad, onToggle }) {
  const q = searchQuery.toLowerCase();
  const filtered = users.filter(u => u.email?.toLowerCase().includes(q) || (u.full_name || '').toLowerCase().includes(q));
  const adminCount = users.filter(u => u.is_admin).length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.22s ease' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '4px' }}>USER ACCESS</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>All registered users — toggle admin access per user.</p>
          </div>
          <button onClick={onLoad} disabled={usersLoading} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--sans)', cursor: usersLoading ? 'not-allowed' : 'pointer', transition: 'all 0.18s', opacity: usersLoading ? 0.6 : 1 }}
            onMouseEnter={e => { if (!usersLoading) { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)'; e.currentTarget.style.color = 'var(--text)'; } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={usersLoading ? { animation: 'spin 1s linear infinite' } : {}}>
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            {usersLoading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '14px', flexShrink: 0 }}>
          <svg style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name or email…" style={{ width: '100%', padding: '9px 36px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--sans)', outline: 'none', transition: 'border-color 0.2s' }}
            onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '2px' }}><XIcon size={13} /></button>
          )}
        </div>

        {/* Error */}
        {usersError && (
          <div style={{ flexShrink: 0, padding: '12px 14px', borderRadius: '11px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: '12px' }}>
            <p style={{ fontSize: '13px', color: '#f87171', marginBottom: '4px', fontWeight: 500 }}>Failed to load users</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{usersError}</p>
          </div>
        )}

        {/* List area — scrolls internally */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>

          {/* Loading skeleton */}
          {usersLoading && users.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ height: '58px', borderRadius: '11px', background: 'var(--surface-2)', border: '1px solid var(--border)', opacity: 1 - i * 0.13 }} />
              ))}
            </div>
          )}

          {/* Empty prompt */}
          {!usersLoading && users.length === 0 && !usersError && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Click Refresh to load users from Supabase.</p>
            </div>
          )}

          {/* No results */}
          {!usersLoading && users.length > 0 && filtered.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>No users match "<strong style={{ color: 'var(--text)' }}>{searchQuery}</strong>"</p>
            </div>
          )}

          {/* User rows */}
          {filtered.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '2px' }}>
              {filtered.map(u => {
                const initial = (u.full_name || u.email || '?')[0].toUpperCase();
                const isToggling = togglingUser === u.id;
                return (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '11px', background: 'var(--surface-2)', border: `1px solid ${u.is_owner ? 'rgba(108,92,231,0.22)' : u.is_admin ? 'rgba(255,107,53,0.18)' : 'var(--border)'}`, transition: 'border-color 0.2s' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, background: u.is_owner ? 'rgba(108,92,231,0.18)' : u.is_admin ? 'rgba(255,107,53,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${u.is_owner ? 'rgba(108,92,231,0.35)' : u.is_admin ? 'rgba(255,107,53,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: u.is_owner ? 'var(--accent-3)' : u.is_admin ? 'var(--accent)' : 'var(--text-muted)', overflow: 'hidden' }}>
                      {u.avatar_url ? <img src={u.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {u.full_name && <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.full_name}</p>}
                      <p style={{ fontSize: u.full_name ? '11px' : '13px', color: u.full_name ? 'var(--text-muted)' : 'var(--text)', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</p>
                    </div>

                    {u.is_admin && (
                      <span style={{ flexShrink: 0, fontSize: '10px', padding: '2px 9px', borderRadius: '20px', fontFamily: 'var(--mono)', fontWeight: 600, letterSpacing: '0.05em', background: u.is_owner ? 'rgba(108,92,231,0.12)' : 'rgba(255,107,53,0.08)', border: `1px solid ${u.is_owner ? 'rgba(108,92,231,0.3)' : 'rgba(255,107,53,0.2)'}`, color: u.is_owner ? 'var(--accent-3)' : 'var(--accent)' }}>
                        {u.is_owner ? 'OWNER' : 'ADMIN'}
                      </span>
                    )}

                    <button
                      onClick={() => !u.is_owner && onToggle(u.id, u.is_admin)}
                      disabled={u.is_owner || isToggling}
                      style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, fontFamily: 'var(--sans)', cursor: u.is_owner ? 'not-allowed' : 'pointer', transition: 'all 0.18s', border: '1px solid', opacity: u.is_owner ? 0.3 : 1, background: u.is_admin ? 'rgba(239,68,68,0.06)' : 'rgba(0,212,170,0.06)', borderColor: u.is_admin ? 'rgba(239,68,68,0.25)' : 'rgba(0,212,170,0.25)', color: u.is_admin ? '#f87171' : 'var(--accent-2)', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { if (!u.is_owner && !isToggling) { e.currentTarget.style.background = u.is_admin ? 'rgba(239,68,68,0.12)' : 'rgba(0,212,170,0.12)'; e.currentTarget.style.borderColor = u.is_admin ? 'rgba(239,68,68,0.5)' : 'rgba(0,212,170,0.5)'; } }}
                      onMouseLeave={e => { e.currentTarget.style.background = u.is_admin ? 'rgba(239,68,68,0.06)' : 'rgba(0,212,170,0.06)'; e.currentTarget.style.borderColor = u.is_admin ? 'rgba(239,68,68,0.25)' : 'rgba(0,212,170,0.25)'; }}
                    >
                      {isToggling
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        : u.is_admin
                          ? <XIcon size={12} />
                          : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      }
                      {!isToggling && (u.is_admin ? 'Remove' : 'Make Admin')}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {users.length > 0 && (
          <p style={{ flexShrink: 0, marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
            {filtered.length} of {users.length} user{users.length !== 1 ? 's' : ''} · {adminCount} admin{adminCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading]           = useState(true);
  const [user, setUser]                 = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [isOwner, setIsOwner]           = useState(false);
  const [tab, setTab]                   = useState('data');

  const [jsonModal, setJsonModal] = useState(null);
  const [savedJson, setSavedJson] = useState({ college: null, placements: null });

  const [mediaFiles, setMediaFiles] = useState({ hostel: [], class: [], campus: [], extra: [] });
  const mediaRefs = useRef({});

  const [users, setUsers]               = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError]     = useState('');
  const [searchQuery, setSearchQuery]   = useState('');
  const [togglingUser, setTogglingUser] = useState(null);
  const [toast, setToast]               = useState(null);

  const showToast = (message, type = 'info') => setToast({ message, type });

  useEffect(() => {
    async function checkAuth() {
      if (!isSupabaseConfigured()) { setLoading(false); setAccessDenied(true); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth?next=/admin'); return; }
      setUser(user);
      if (user.email === OWNER_EMAIL) setIsOwner(true);
      else setAccessDenied(true);
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (tab === 'admins' && users.length === 0 && !usersLoading && !usersError) fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const fetchUsers = async () => {
    setUsersLoading(true); setUsersError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error('No session');
      const res = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load users');
      setUsers(json.users);
    } catch (e) { setUsersError(e.message); }
    setUsersLoading(false);
  };

  const handleToggleAdmin = async (userId, currentlyAdmin) => {
    setTogglingUser(userId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/toggle-admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` }, body: JSON.stringify({ userId, grant: !currentlyAdmin }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to update');
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_admin: !currentlyAdmin } : u));
      showToast(currentlyAdmin ? 'Admin access removed' : 'Admin access granted', 'success');
    } catch (e) { showToast(e.message, 'error'); }
    setTogglingUser(null);
  };

  const handleMediaChange = (key, e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setMediaFiles(prev => ({ ...prev, [key]: [...prev[key], ...files] }));
    showToast(`${files.length} file${files.length > 1 ? 's' : ''} selected`, 'success');
    e.target.value = '';
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      <style>{keyframes}</style>
    </div>
  );

  if (accessDenied) return (
    <div className="landing-container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="grid-bg" /><div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '380px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Access Denied</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>You don't have permission to view this page.</p>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 22px', background: 'var(--accent)', borderRadius: '10px', color: '#fff', fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Go Home
        </Link>
      </div>
      <style>{keyframes}</style>
    </div>
  );

  const userInitial = (user?.email?.[0] ?? '?').toUpperCase();

  return (
    <div className="landing-container" style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="grid-bg" /><div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      {/* ── Header ── */}
      <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 28px', background: 'rgba(10,10,12,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', position: 'relative', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--sans)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Home
          </Link>
          <div style={{ width: '1px', height: '16px', background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 500 }}>cutoffs.ai</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.25)', borderRadius: '20px', padding: '2px 10px', fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--mono)', fontWeight: 600, letterSpacing: '0.06em' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />ADMIN
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/simulator" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '9px', background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.22)', color: 'var(--accent-2)', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--sans)', textDecoration: 'none', transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,170,0.14)'; e.currentTarget.style.borderColor = 'rgba(0,212,170,0.44)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,170,0.07)'; e.currentTarget.style.borderColor = 'rgba(0,212,170,0.22)'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>
            Open App
          </Link>
          <div style={{ width: '1px', height: '18px', background: 'var(--border)' }} />
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff' }}>{userInitial}</div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</span>
          {isOwner && <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(108,92,231,0.12)', border: '1px solid rgba(108,92,231,0.3)', color: 'var(--accent-3)', fontFamily: 'var(--mono)', fontWeight: 600 }}>OWNER</span>}
        </div>
      </header>

      {/* ── Content wrapper ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

        {/* Title + tabs */}
        <div style={{ flexShrink: 0, padding: '20px 28px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--serif)', lineHeight: 1.2 }}>Admin Panel</h1>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Manage college data and team access.</p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '3px', width: 'fit-content' }}>
            {[
              { id: 'data',   label: 'Data',         icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
              { id: 'admins', label: 'Admin Access',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--sans)', transition: 'all 0.18s', background: tab === t.id ? 'var(--accent)' : 'transparent', color: tab === t.id ? '#fff' : 'var(--text-muted)' }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, minHeight: 0, padding: '14px 28px 20px' }}>
          {tab === 'data' && (
            <DataTab
              savedJson={savedJson}
              onOpenJson={setJsonModal}
              mediaFiles={mediaFiles}
              mediaRefs={mediaRefs}
              onMediaChange={handleMediaChange}
            />
          )}
          {tab === 'admins' && (
            <AdminAccessTab
              users={users}
              usersLoading={usersLoading}
              usersError={usersError}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              togglingUser={togglingUser}
              onLoad={fetchUsers}
              onToggle={handleToggleAdmin}
            />
          )}
        </div>
      </div>

      {/* JSON Modal */}
      {jsonModal && (() => {
        const cfg = { college: { title: 'College Data', ph: '{\n  "colleges": [\n    { "name": "IIT Bombay", "code": "IITB" }\n  ]\n}' }, placements: { title: 'Placements Data', ph: '{\n  "placements": [\n    { "year": 2024, "avg_ctc": "18 LPA" }\n  ]\n}' } }[jsonModal];
        return <JsonModal title={cfg.title} placeholder={cfg.ph} initialValue={savedJson[jsonModal] || ''} onProceed={v => { setSavedJson(p => ({ ...p, [jsonModal]: v })); setJsonModal(null); showToast(`${jsonModal === 'college' ? 'College' : 'Placements'} data saved`, 'success'); }} onClose={() => setJsonModal(null)} />;
      })()}

      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      <style>{keyframes}</style>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function mBtn(color, bg, borderColor) {
  return { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: bg, color, cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--sans)', transition: 'all 0.18s', outline: 'none', whiteSpace: 'nowrap' };
}
function CheckIcon({ size = 16, color = 'currentColor' }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function XIcon({ size = 16, color = 'currentColor' }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
function InfoIcon({ size = 16, color = 'currentColor' }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>; }
function CodeIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>; }

const keyframes = `
  @keyframes spin    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
