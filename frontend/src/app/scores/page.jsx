'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import CollegeRow from '@/components/CollegeRow';
import CutoffChart from '@/components/CutoffChart';
import { sanitizeHTML } from '@/lib/sanitize';
import CompareStats from '@/components/CompareStats';
import Badge from '@/components/Badge';
import { nirfRankings, formatInstituteRank, getBranchEmoji } from '@/data/colleges';
import { choices } from '@/data/choices';

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Map choices.js institute names → RAG bot college names
const RAG_COLLEGE_MAP = {
  'IIITM Gwalior': 'IIIT Gwalior',
  'IIITDM Kancheepuram': 'IIIT Kancheepuram',
  'IIIT Senapati Manipur': 'IIIT Manipur',
  'MANIT Bhopal': 'NIT Bhopal',
  'NIT Karnataka, Surathkal': 'NIT Surathkal',
};

// Colleges we have RAG data for (exact RAG bot names)
const RAG_COLLEGES = new Set([
  'IIIT Gwalior','IIIT Kancheepuram','IIIT Manipur','IIITDM Jabalpur',
  'IIT Bhilai','IIT Bhubaneswar','IIT Dhanbad','IIT Gandhinagar','IIT Guwahati',
  'IIT Hyderabad','IIT Indore','IIT Kanpur','IIT Kharagpur','IIT Madras','IIT Mandi','IIT Palakkad','IIT Patna',
  'MNIT Jaipur','NIT Agartala','NIT Andhra Pradesh','NIT Bhopal','NIT Calicut',
  'NIT Durgapur','NIT Goa','NIT Hamirpur','NIT Jalandhar','NIT Jamshedpur',
  'NIT Kurukshetra','NIT Manipur','NIT Nagaland','NIT Patna',
  'NIT Puducherry','NIT Rourkela','NIT Sikkim','NIT Silchar','NIT Srinagar',
  'NIT Surathkal','NIT Warangal','VNIT Nagpur',
]);

function getRagCollegeName(instituteName) {
  if (!instituteName) return null;
  const mapped = RAG_COLLEGE_MAP[instituteName] || instituteName;
  return RAG_COLLEGES.has(mapped) ? mapped : null;
}

// Group colleges by type with computed stats
function buildCollegeList() {
  const map = {};
  choices.forEach((c) => {
    if (!map[c.institute]) {
      const info = nirfRankings[c.institute] || {};
      map[c.institute] = {
        name: c.institute,
        nirf: info.nirf,
        nit: info.nit,
        iiit: info.iiit,
        estd: info.estd,
        bestCutoff: c.cutoff,
        bestProgram: c.program,
        programs: [],
      };
    }
    map[c.institute].programs.push(c);
    if (c.cutoff < map[c.institute].bestCutoff) {
      map[c.institute].bestCutoff = c.cutoff;
      map[c.institute].bestProgram = c.program;
    }
  });
  return Object.values(map);
}

function getTypeRank(col) {
  if (col.nit) return 'NIT-' + col.nit;
  if (col.iiit) return 'IIIT-' + col.iiit;
  return null;
}

function getEmoji(name) {
  const p = name.toLowerCase();
  if (p.includes('trichy') || p.includes('tiruchirappalli')) return '🏛️';
  if (p.includes('surathkal') || p.includes('karnataka')) return '🌊';
  if (p.includes('rourkela')) return '⚙️';
  if (p.includes('warangal')) return '🏗️';
  if (p.includes('calicut')) return '🌴';
  if (p.includes('nagpur')) return '🔬';
  if (p.includes('jaipur')) return '🏰';
  if (p.includes('silchar')) return '🌿';
  if (p.includes('durgapur')) return '🏭';
  if (p.includes('delhi')) return '🌇';
  if (p.includes('iiit')) return '💻';
  if (p.includes('bit') || p.includes('iiest')) return '🎓';
  return '🏫';
}

function getCollegeType(col) {
  if (col.nit && col.nirf && col.nirf < 55) return 'topNit';
  if (col.nit) return 'otherNit';
  if (col.iiit) return 'iiit';
  return 'other';
}

const typeLabels = {
  topNit: { label: 'Top NITs', color: 'text-blue-400', icon: '🔥' },
  otherNit: { label: 'Other NITs', color: 'text-cyan-400', icon: '🏛️' },
  iiit: { label: 'IIITs', color: 'text-purple-400', icon: '💻' },
  other: { label: 'Other Institutes', color: 'text-gray-400', icon: '🎓' },
};

const filterTabs = ['All', 'NIT', 'IIIT', 'Top 10'];

// ──────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────
export default function ScoresPage() {
  const allColleges = useMemo(() => buildCollegeList(), []);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [detailTab, setDetailTab] = useState('overview');
  const [compareTarget, setCompareTarget] = useState('');
  const [collapsed, setCollapsed] = useState({});

  // AI Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  // Filtered colleges
  const filtered = useMemo(() => {
    let list = allColleges;
    if (filter === 'NIT') list = list.filter((c) => c.nit);
    else if (filter === 'IIIT') list = list.filter((c) => c.iiit);
    else if (filter === 'Top 10') list = list.filter((c) => c.nirf && c.nirf <= 55);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.programs.some((p) => p.program.toLowerCase().includes(q)));
    }
    return list;
  }, [allColleges, filter, search]);

  // Group by type
  const grouped = useMemo(() => {
    const groups = { topNit: [], otherNit: [], iiit: [], other: [] };
    filtered.forEach((c) => {
      groups[getCollegeType(c)].push(c);
    });
    // Sort each group by best cutoff
    Object.values(groups).forEach((g) => g.sort((a, b) => a.bestCutoff - b.bestCutoff));
    return groups;
  }, [filtered]);

  const toggleFav = (name) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const toggleCollapse = (key) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // College detail stats
  const collegeStats = useMemo(() => {
    if (!selectedCollege) return null;
    const progs = selectedCollege.programs;
    const cutoffs = progs.map((p) => p.cutoff);
    return {
      bestCutoff: Math.min(...cutoffs),
      avgCutoff: Math.round(cutoffs.reduce((a, b) => a + b, 0) / cutoffs.length),
      topCutoff: Math.min(...cutoffs),
      nirf: selectedCollege.nirf || 0,
      estd: selectedCollege.estd || 0,
      programs: progs.length,
    };
  }, [selectedCollege]);

  // Compare target stats
  const compareStats = useMemo(() => {
    if (!compareTarget) return null;
    const col = allColleges.find((c) => c.name === compareTarget);
    if (!col) return null;
    const cutoffs = col.programs.map((p) => p.cutoff);
    return {
      bestCutoff: Math.min(...cutoffs),
      avgCutoff: Math.round(cutoffs.reduce((a, b) => a + b, 0) / cutoffs.length),
      topCutoff: Math.min(...cutoffs),
      nirf: col.nirf || 0,
      estd: col.estd || 0,
      programs: col.programs.length,
    };
  }, [compareTarget, allColleges]);

  // AI Chat
  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const ragCollege = getRagCollegeName(selectedCollege?.name);
      if (ragCollege) {
        // Use the combined RAG chatbot
        const res = await fetch('https://cutoffs-chatbot.fresherschat.workers.dev/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: msg, college: ragCollege }),
        });
        const data = await res.json();
        setChatMessages((prev) => [
          ...prev,
          { role: 'ai', content: data.answer || 'No response.', media: data.media || [] },
        ]);
      } else {
        // Fallback to old /api/ask for colleges without RAG data
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: `${selectedCollege?.name}: ${msg}` }),
        });
        const data = await res.json();
        setChatMessages((prev) => [
          ...prev,
          { role: 'ai', html: data.html, content: data.answer || 'No response.' },
        ]);
      }
    } catch {
      setChatMessages((prev) => [...prev, { role: 'ai', content: 'Error. Try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Classify branches for box score
  const coreBranches = useMemo(() => {
    if (!selectedCollege) return [];
    return selectedCollege.programs.filter((p) => {
      const l = p.program.toLowerCase();
      return l.includes('cse') || l.includes('computer') || l.includes('it ') || l.includes('information tech') || l.includes('ai') || l.includes('data science') || l.includes('cyber');
    });
  }, [selectedCollege]);

  const otherBranches = useMemo(() => {
    if (!selectedCollege) return [];
    const coreNos = new Set(coreBranches.map((p) => p.no));
    return selectedCollege.programs.filter((p) => !coreNos.has(p.no));
  }, [selectedCollege, coreBranches]);

  // ── DETAIL VIEW ──
  if (selectedCollege) {
    const info = formatInstituteRank(selectedCollege.name);
    // Fake trend data (since we only have 2025 cutoffs, simulate)
    const bestCutoff = selectedCollege.programs[0]?.cutoff || 1000;
    const trendA = [Math.round(bestCutoff * 1.15), Math.round(bestCutoff * 1.07), bestCutoff];

    return (
      <div className="min-h-screen pb-20">
        {/* Back + Header */}
        <div className="sticky top-0 z-20 bg-[#0a0a0c]/95 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => { setSelectedCollege(null); setDetailTab('overview'); setChatMessages([]); }} className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-gray-400 text-xs truncate flex-1">JoSAA 2025 Rankings</span>
            <button onClick={() => toggleFav(selectedCollege.name)} className="text-gray-400">
              {favorites.has(selectedCollege.name) ? (
                <svg className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Score header (like match score) */}
        <div className="text-center py-5 px-4 bg-gradient-to-b from-[#13131a] to-transparent">
          <span className="text-red-400 text-[11px] font-medium">JoSAA 2025</span>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="text-center">
              <span className="text-3xl">{getEmoji(selectedCollege.name)}</span>
            </div>
            <div className="text-center">
              <p className="text-white font-black text-3xl tabular-nums tracking-tight">
                {fmtNum(selectedCollege.bestCutoff)}
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5">Best Cutoff Rank</p>
            </div>
            <div className="text-center">
              {info.nirf && (
                <span className="inline-block bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-2.5 py-1 text-xs font-bold">
                  #{info.nirf}
                </span>
              )}
            </div>
          </div>
          <p className="text-white font-semibold text-sm mt-2">{selectedCollege.name}</p>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            {info.typeRank && <Badge text={info.typeRank} variant="purple" />}
            {info.estd && <Badge text={`Est. ${info.estd}`} variant="blue" />}
            <Badge text={`${selectedCollege.programs.length} Programs`} variant="green" />
          </div>

          {/* Match Live badge */}
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 bg-[#1a1a2e] border border-white/10 rounded-full px-3 py-1 text-[11px] text-gray-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              JoSAA 2025 Data
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/10 px-2 sticky top-[52px] z-10 bg-[#0a0a0c]">
          {['overview', 'branches', 'compare', 'ask'].map((tab) => (
            <button
              key={tab}
              onClick={() => setDetailTab(tab)}
              className={`flex-1 py-3 text-xs font-medium capitalize transition-colors relative ${
                detailTab === tab ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'ask' ? (
                <span className="flex items-center justify-center gap-1">Ask AI <span className="text-orange-400">🔥</span></span>
              ) : tab === 'branches' ? 'Box Score' : tab}
              {detailTab === tab && <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-400 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="px-4 py-4">
          {/* ═══ OVERVIEW TAB ═══ */}
          {detailTab === 'overview' && (
            <div className="space-y-4">
              {/* Chart */}
              <div className="bg-[#13131a] rounded-xl p-3 border border-white/5">
                <CutoffChart
                  dataA={trendA}
                  dataB={[]}
                  labelA={selectedCollege.name}
                />
              </div>

              {/* Year breakdown (simulated) */}
              <div className="bg-[#13131a] rounded-xl border border-white/5 overflow-hidden">
                <div className="grid grid-cols-4 text-[10px] font-medium text-gray-500 border-b border-white/5">
                  <div className="p-2.5 pl-3">Branch</div>
                  <div className="p-2.5 text-center">2023</div>
                  <div className="p-2.5 text-center">2024</div>
                  <div className="p-2.5 text-center text-blue-400">2025</div>
                </div>
                {selectedCollege.programs.slice(0, 6).map((p, i) => {
                  const branch = p.program.split('(')[0].trim();
                  const c23 = Math.round(p.cutoff * 1.15);
                  const c24 = Math.round(p.cutoff * 1.07);
                  return (
                    <div key={i} className={`grid grid-cols-4 text-xs border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                      <div className="p-2.5 pl-3 text-white font-medium truncate">{branch}</div>
                      <div className="p-2.5 text-center text-gray-500 tabular-nums">{fmtNum(c23)}</div>
                      <div className="p-2.5 text-center text-gray-400 tabular-nums">{fmtNum(c24)}</div>
                      <div className="p-2.5 text-center text-blue-400 font-semibold tabular-nums">{fmtNum(p.cutoff)}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats Rings */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Programs', val: selectedCollege.programs.length, max: 20, color: '#3b82f6' },
                  { label: 'Avg Cutoff', val: Math.round(collegeStats?.avgCutoff / 1000) || 0, max: 170, color: '#ef4444', suffix: 'k' },
                  { label: 'NIRF Rank', val: selectedCollege.nirf || 0, max: 300, color: '#10b981', prefix: '#' },
                ].map((ring) => {
                  const pct = Math.min((ring.val / ring.max) * 100, 100);
                  const r = 28, circ = 2 * Math.PI * r;
                  return (
                    <div key={ring.label} className="bg-[#13131a] rounded-xl border border-white/5 p-3 text-center">
                      <svg width="68" height="68" className="mx-auto">
                        <circle cx="34" cy="34" r={r} fill="none" stroke="#ffffff08" strokeWidth="5" />
                        <circle
                          cx="34" cy="34" r={r} fill="none" stroke={ring.color} strokeWidth="5"
                          strokeDasharray={circ}
                          strokeDashoffset={circ - (circ * pct) / 100}
                          strokeLinecap="round"
                          transform="rotate(-90 34 34)"
                        />
                        <text x="34" y="36" textAnchor="middle" className="text-sm font-bold" fill="white" fontSize="14">
                          {ring.prefix || ''}{ring.val}{ring.suffix || ''}
                        </text>
                      </svg>
                      <p className="text-gray-500 text-[10px] mt-1">{ring.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Comparison bars vs Avg */}
              <div className="bg-[#13131a] rounded-xl border border-white/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-red-400 text-xs font-medium">Foul</span>
                  <span className="text-gray-400 text-[10px]">vs Average NIT</span>
                  <span className="text-red-400 text-xs font-medium">Foul</span>
                </div>
                {[
                  { label: 'Best Cutoff', a: selectedCollege.bestCutoff, b: 15000 },
                  { label: 'NIRF Rank', a: selectedCollege.nirf || 100, b: 100 },
                ].map((bar) => {
                  const total = bar.a + bar.b || 1;
                  return (
                    <div key={bar.label} className="mb-2">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-white text-xs font-bold">{fmtNum(bar.a)}</span>
                        <span className="text-gray-400 text-[10px]">{bar.label}</span>
                        <span className="text-white text-xs font-bold">{fmtNum(bar.b)}</span>
                      </div>
                      <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 rounded-l-full" style={{ width: `${(bar.a / total) * 100}%` }} />
                        <div className="bg-red-500/60 rounded-r-full" style={{ width: `${(bar.b / total) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ BOX SCORE TAB ═══ */}
          {detailTab === 'branches' && (
            <div className="bg-[#13131a] rounded-xl border border-white/5 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-white/5">
                <span className="bg-blue-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {selectedCollege.name.split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="text-gray-600 text-[10px]">|</span>
                <span className="text-gray-400 text-[10px]">📊 Glossary</span>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[1fr_60px_60px_50px] gap-1 px-3 py-2 text-[10px] text-gray-500 font-medium border-b border-white/5">
                <span>Started</span>
                <span className="text-center">CUTOFF</span>
                <span className="text-center">RANK</span>
                <span className="text-center">NIRF</span>
              </div>

              {/* Core branches (Started) */}
              {coreBranches.map((p, i) => {
                const info = formatInstituteRank(p.institute);
                const isHighlight = p.cutoff < 10000;
                return (
                  <div key={p.no} className={`grid grid-cols-[1fr_60px_60px_50px] gap-1 items-center px-3 py-2.5 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm shrink-0">{getBranchEmoji(p.program)}</span>
                      <div className="min-w-0">
                        <p className="text-blue-400 text-xs font-medium truncate">{p.program.split('(')[0].trim()}</p>
                        <p className="text-gray-600 text-[9px] truncate">{p.program.includes('(') ? p.program.match(/\(([^)]+)\)/)?.[1] || '' : ''}</p>
                      </div>
                    </div>
                    <span className={`text-center text-xs font-bold tabular-nums ${isHighlight ? 'text-green-400' : 'text-white'}`}>{fmtNum(p.cutoff)}</span>
                    <span className="text-center text-xs text-gray-400 tabular-nums">#{p.no}</span>
                    <span className="text-center text-xs text-blue-400 tabular-nums">{info.nirf || '-'}</span>
                  </div>
                );
              })}

              {/* Bench header */}
              {otherBranches.length > 0 && (
                <>
                  <div className="grid grid-cols-[1fr_60px_60px_50px] gap-1 px-3 py-2 text-[10px] text-gray-500 font-medium border-b border-white/5 bg-white/[0.03]">
                    <span>Bench</span>
                    <span className="text-center">CUTOFF</span>
                    <span className="text-center">RANK</span>
                    <span className="text-center">NIRF</span>
                  </div>
                  {otherBranches.map((p, i) => {
                    const info = formatInstituteRank(p.institute);
                    return (
                      <div key={p.no} className={`grid grid-cols-[1fr_60px_60px_50px] gap-1 items-center px-3 py-2.5 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm shrink-0">{getBranchEmoji(p.program)}</span>
                          <div className="min-w-0">
                            <p className="text-blue-400 text-xs font-medium truncate">{p.program.split('(')[0].trim()}</p>
                            <p className="text-gray-600 text-[9px] truncate">{p.program.includes('(') ? p.program.match(/\(([^)]+)\)/)?.[1] || '' : ''}</p>
                          </div>
                        </div>
                        <span className="text-center text-xs text-white tabular-nums">{fmtNum(p.cutoff)}</span>
                        <span className="text-center text-xs text-gray-400 tabular-nums">#{p.no}</span>
                        <span className="text-center text-xs text-blue-400 tabular-nums">{info.nirf || '-'}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* ═══ COMPARE TAB ═══ */}
          {detailTab === 'compare' && (
            <div className="space-y-4">
              {/* Match header style */}
              <div className="bg-[#13131a] rounded-xl border border-white/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-500/20 text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">Match</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <span className="text-2xl block">{getEmoji(selectedCollege.name)}</span>
                    <p className="text-white text-xs font-medium mt-1 truncate px-1">{selectedCollege.name.replace(/NIT |IIIT |IIITM |IIITDM /, '')}</p>
                  </div>

                  <span className="text-gray-600 text-xs shrink-0 px-2">vs</span>

                  <div className="text-center flex-1">
                    {compareTarget ? (
                      <>
                        <span className="text-2xl block">{getEmoji(compareTarget)}</span>
                        <p className="text-white text-xs font-medium mt-1 truncate px-1">{compareTarget.replace(/NIT |IIIT |IIITM |IIITDM /, '')}</p>
                      </>
                    ) : (
                      <p className="text-gray-500 text-xs">Select college</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Selector */}
              <select
                value={compareTarget}
                onChange={(e) => setCompareTarget(e.target.value)}
                className="w-full bg-[#13131a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="">Pick a college to compare...</option>
                {allColleges
                  .filter((c) => c.name !== selectedCollege.name)
                  .sort((a, b) => a.bestCutoff - b.bestCutoff)
                  .map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
              </select>

              {/* Stats */}
              {collegeStats && compareStats && (
                <div className="bg-[#13131a] rounded-xl border border-white/5 p-4">
                  <CompareStats statsA={collegeStats} statsB={compareStats} />
                </div>
              )}

              {!compareTarget && (
                <p className="text-gray-600 text-xs text-center py-8">Select a college above to see head-to-head comparison</p>
              )}
            </div>
          )}

          {/* ═══ ASK AI TAB ═══ */}
          {detailTab === 'ask' && (
            <div className="space-y-3">
              {/* Quick prompts */}
              <div className="flex flex-wrap gap-1.5">
                {(getRagCollegeName(selectedCollege?.name)
                  ? ['How are the hostels?', 'How is mess food?', 'What are the fees?', 'How is WiFi?', 'What sports are there?', 'How to reach?']
                  : ['Placements?', 'Best branch?', 'Hostel life?', 'Fees?']
                ).map((q) => (
                  <button
                    key={q}
                    onClick={() => setChatInput(q)}
                    className="bg-[#1a1a2e] border border-white/10 rounded-full px-3 py-1 text-[11px] text-gray-400 hover:text-white hover:border-purple-500/30 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* RAG data badge */}
              {(() => { const rc = getRagCollegeName(selectedCollege?.name); return rc ? (
                <div className="flex items-center gap-1.5 text-[10px] text-green-400/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live data from students at {rc}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  General AI — no student data yet for this college
                </div>
              ); })()}

              {/* Chat messages */}
              <div className="bg-[#13131a] rounded-xl border border-white/5 overflow-hidden">
                {chatMessages.length > 0 && (
                  <div className="p-3 space-y-2.5 max-h-[420px] overflow-y-auto">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs ${
                          msg.role === 'user'
                            ? 'bg-blue-600/20 border border-blue-500/20 text-blue-200 rounded-br-md'
                            : 'bg-[#1e1e28] border border-white/5 text-gray-300 rounded-bl-md'
                        }`}>
                          {msg.html ? (
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.html) }} />
                          ) : (
                            <div style={{ whiteSpace: 'pre-wrap' }}
                              dangerouslySetInnerHTML={{ __html: (msg.content || '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                            />
                          )}
                          {/* Media grid for RAG responses */}
                          {msg.media && msg.media.length > 0 && (
                            <div className="mt-2 grid gap-1 rounded-xl overflow-hidden"
                              style={{ gridTemplateColumns: msg.media.length === 1 ? '1fr' : '1fr 1fr' }}>
                              {msg.media.slice(0, 4).map((m, mi) => (
                                m.type === 'video' ? (
                                  <video key={mi} src={m.url} className="w-full object-cover rounded-lg"
                                    style={{ height: msg.media.length === 1 ? '180px' : '100px' }}
                                    controls preload="metadata" playsInline muted />
                                ) : (
                                  <img key={mi} src={m.url} alt={m.caption || ''} className="w-full object-cover rounded-lg"
                                    style={{ height: msg.media.length === 1 ? '180px' : '100px' }} />
                                )
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-[#1e1e28] border border-white/5 rounded-2xl rounded-bl-md px-3 py-2.5">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}

                <form onSubmit={handleChat} className="flex items-center border-t border-white/5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={getRagCollegeName(selectedCollege?.name) ? 'Ask about hostel, mess, fees, sports...' : 'Ask anything about this college...'}
                    className="flex-1 bg-transparent px-3 py-3 text-xs text-white placeholder-gray-500 outline-none"
                  />
                  <button type="submit" disabled={chatLoading} className="px-3 py-3 text-blue-400 disabled:opacity-50">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0a0a0c]/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <h1 className="text-white font-bold text-base tracking-wide">RANKINGS</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter tabs (like Football / Basketball) */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
              filter === tab
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'bg-[#13131a] border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'NIT' && '🏛️'}
            {tab === 'IIIT' && '💻'}
            {tab === 'All' && '🎯'}
            {tab === 'Top 10' && '🔥'}
            <span>{tab}</span>
            <span className={`text-[10px] ${filter === tab ? 'text-blue-300' : 'text-gray-600'}`}>
              {tab === 'All' ? allColleges.length : tab === 'NIT' ? allColleges.filter(c => c.nit).length : tab === 'IIIT' ? allColleges.filter(c => c.iiit).length : allColleges.filter(c => c.nirf && c.nirf <= 55).length}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search colleges or branches..."
            className="w-full bg-[#13131a] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Favorites section */}
      {favorites.size > 0 && (
        <div className="mb-1">
          <button
            onClick={() => toggleCollapse('favorites')}
            className="w-full flex items-center justify-between px-4 py-2 bg-yellow-500/5 border-y border-yellow-500/10"
          >
            <span className="text-yellow-400 text-xs font-semibold flex items-center gap-1.5">
              ⭐ Favorites
              <span className="text-yellow-400/60">{favorites.size}</span>
            </span>
            <svg className={`w-4 h-4 text-gray-500 transition-transform ${collapsed.favorites ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {!collapsed.favorites && allColleges.filter((c) => favorites.has(c.name)).map((col) => (
            <CollegeRow
              key={col.name}
              institute={col.name}
              bestCutoff={col.bestCutoff}
              bestProgram={col.bestProgram}
              nirf={col.nirf}
              typeRank={getTypeRank(col)}
              estd={col.estd}
              emoji={getEmoji(col.name)}
              isFav={true}
              onToggleFav={() => toggleFav(col.name)}
              onClick={() => setSelectedCollege(col)}
            />
          ))}
        </div>
      )}

      {/* Grouped college list */}
      {Object.entries(grouped).map(([type, colleges]) => {
        if (colleges.length === 0) return null;
        const info = typeLabels[type];
        return (
          <div key={type} className="mb-1">
            {/* League header */}
            <button
              onClick={() => toggleCollapse(type)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-[#0d0d15] border-y border-white/5"
            >
              <span className={`text-xs font-semibold flex items-center gap-1.5 ${info.color}`}>
                {info.icon} {info.label}
                <span className="text-gray-600 font-normal">{colleges.length}</span>
              </span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${collapsed[type] ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {/* College rows */}
            {!collapsed[type] && colleges.map((col) => (
              <CollegeRow
                key={col.name}
                institute={col.name}
                bestCutoff={col.bestCutoff}
                bestProgram={col.bestProgram}
                nirf={col.nirf}
                typeRank={getTypeRank(col)}
                estd={col.estd}
                emoji={getEmoji(col.name)}
                isFav={favorites.has(col.name)}
                onToggleFav={() => toggleFav(col.name)}
                onClick={() => setSelectedCollege(col)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
