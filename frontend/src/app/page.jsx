'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import './landing.css';

const HERO_STORY_COLLEGES = [
  { id: 'IITB', label: 'IIT Bombay' },
  { id: 'IITD', label: 'IIT Delhi' },
  { id: 'IITM', label: 'IIT Madras' },
  { id: 'NITT', label: 'NIT Trichy' },
  { id: 'BITS', label: 'BITS Pilani' },
  { id: 'AIIMS', label: 'AIIMS Delhi' },
  { id: 'IITK', label: 'IIT Kanpur' },
  { id: 'NITW', label: 'NIT Warangal' },
  { id: 'VIT', label: 'VIT Vellore' },
  { id: 'IIITH', label: 'IIIT Hyd' },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [isChatActive, setIsChatActive] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [comboModalData, setComboModalData] = useState(null);
  const [demoText, setDemoText] = useState('');
  const [isDemoVisible, setIsDemoVisible] = useState(false);
  const [statValues, setStatValues] = useState({ colleges: 0, exams: 0, points: 0, year: 2020 });
  const statsRef = useRef(null);
  const statsDoneRef = useRef(false);
  const landingRef = useRef(null);

  const rotatingWords = [
    'cutoffs', 'cutoffs', 'mess', 'hostel', 'rooms', 
    'tourist places', 'infrastructure', 'canteens', 
    'transportation', 'fests', 'clubs'
  ];

  const demoResponseText = `Based on JoSAA 2025 data, the closing rank for NIT Trichy CSE (General category) was:

• Round 1: 4,892
• Round 5: 5,841
• Round 6 (Final): 6,102

The cutoff has been trending upward ~3% yearly. For 2026, I'd estimate the closing rank around 6,200-6,400.

💡 With your JEE Main rank, you have a strong chance in Round 3 onwards. Want me to suggest backup options?`;

  // Rotating words logic
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  useEffect(() => {
    if (isChatActive) {
      setIsDemoVisible(false);
      setDemoText('');
    }
  }, [isChatActive]);

  // Scroll reveal and Demo typewriter trigger (re-bind when #demo remounts after chat closes)
  const chatWindowRef = useRef(null);
  useLayoutEffect(() => {
    if (isChatActive) return undefined;

    const root = landingRef.current;
    if (!root) return undefined;

    const elements = root.querySelectorAll('.reveal');

    const markIfInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      // Any real overlap with the viewport (relaxed vs strict ratio thresholds)
      const overlaps =
        rect.bottom > 0 &&
        rect.top < vh &&
        rect.right > 0 &&
        rect.left < vw;
      if (overlaps) {
        el.classList.add('visible');
        if (el.classList.contains('chat-window')) setIsDemoVisible(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('chat-window')) setIsDemoVisible(true);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 15% 0px' }
    );

    elements.forEach((el) => {
      markIfInViewport(el);
      observer.observe(el);
    });

    // Separate observer for the chat window (no longer has .reveal)
    const chatEl = chatWindowRef.current;
    let chatObserver;
    if (chatEl) {
      chatObserver = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setIsDemoVisible(true); },
        { threshold: 0, rootMargin: '0px 0px 15% 0px' }
      );
      const chatRect = chatEl.getBoundingClientRect();
      const vh = window.innerHeight;
      if (chatRect.bottom > 0 && chatRect.top < vh) setIsDemoVisible(true);
      else chatObserver.observe(chatEl);
    }

    const recheck = () => {
      elements.forEach(markIfInViewport);
    };

    requestAnimationFrame(() => {
      recheck();
      requestAnimationFrame(recheck);
    });

    const t = window.setTimeout(recheck, 320);
    window.addEventListener('resize', recheck);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', recheck);
      observer.disconnect();
      chatObserver?.disconnect();
    };
  }, [isChatActive]);

  // Typewriter effect for demo
  useEffect(() => {
    if (isDemoVisible && demoText.length < demoResponseText.length) {
      const timeout = setTimeout(() => {
        setDemoText(demoResponseText.substring(0, demoText.length + 1));
      }, demoResponseText[demoText.length] === '\n' ? 80 : Math.random() * 15 + 10);
      return () => clearTimeout(timeout);
    }
  }, [isDemoVisible, demoText, demoResponseText]);

  // Count-up animation for hero stats
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsDoneRef.current) {
        statsDoneRef.current = true;
        const targets = { colleges: 6000, exams: 50, points: 10, year: 2026 };
        const dur = 1800;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setStatValues({
            colleges: Math.round(e * targets.colleges),
            exams: Math.round(e * targets.exams),
            points: Math.round(e * targets.points),
            year: Math.round(2020 + e * (targets.year - 2020)),
          });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setIsChatActive(true);
    setAiResult({ body: 'Searching cutoff data...', meta: '' });

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: searchQuery }),
      });

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();
      
      if (data.type === 'preference') {
        setAiResult({ 
          type: 'preference', 
          data: data,
          meta: `${data.combos.length} strategies generated · Source: JoSAA Official`
        });
      } else {
        setAiResult({
          type: 'text',
          body: data.answer || 'No response received.',
          meta: `${data.source === 'template' ? 'Instant' : 'AI Generated'} · Source: JoSAA Official`
        });
      }
    } catch (err) {
      setAiResult({ body: 'Error: ' + err.message, meta: '' });
    } finally {
      setIsSearching(false);
    }
  };

  const fillSearch = (hint) => {
    setSearchQuery(hint);
  };

  const closeResult = () => {
    setAiResult(null);
    setIsChatActive(false);
  };

  const fmtRank = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const downloadPDF = async (combo) => {
    const jspdf = await import('jspdf');
    const doc = new jspdf.jsPDF();
    const data = aiResult.data;

    doc.setFontSize(22);
    doc.setTextColor(255, 107, 53);
    doc.text('cutoffs.ai', 14, 20);

    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text(`${combo.title} — Preference List`, 14, 32);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Rank: ${fmtRank(data.userRank)} | ${data.seatTypeLabel} | ${data.year} | ${data.gender}`, 14, 40);
    doc.text(combo.subtitle, 14, 47);

    doc.setDrawColor(200, 200, 200);
    doc.line(14, 51, 196, 51);

    let y = 61;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('#', 16, y);
    doc.text('Institute', 26, y);
    doc.text('Program', 90, y);
    doc.text('Closing Rank', 155, y);

    y += 12;
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    combo.entries.forEach((e, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(String(i + 1), 16, y);
      doc.text(e.shortInstitute.substring(0, 32), 26, y);
      doc.setFontSize(9);
      doc.text(e.program.substring(0, 38), 90, y);
      doc.setFontSize(10);
      doc.text(fmtRank(e.closingRank), 155, y);
      y += 9;
      doc.setDrawColor(235, 235, 235);
      doc.line(14, y - 4, 196, y - 4);
    });

    const safeName = combo.title.toLowerCase().replace(/\s+/g, '-');
    doc.save(`preference-${safeName}-rank-${data.userRank}.pdf`);
  };

  return (
    <div ref={landingRef} className={`landing-container ${isChatActive ? 'chat-active' : ''}`}>
      <div className="grid-bg"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <nav>
        <Link href="/" className="nav-logo">
          <span className="dot"></span>
          cutoffs.ai
        </Link>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#exams">Exams</a></li>
          <li><a href="#colleges">Colleges</a></li>
          <li><Link href="/auth" className="nav-cta">Get Started</Link></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="stories-row" aria-label="Featured colleges">
          <div className="stories-track">
            {[...HERO_STORY_COLLEGES, ...HERO_STORY_COLLEGES].map((col, i) => (
              <div key={`${col.id}-${i}`} className="story-item">
                <div className="story-ring">
                  <div className="story-avatar">
                    {col.id.includes('IIT') || col.id.includes('NIT') ? (
                      <>
                        {col.id.slice(0, 3)}
                        <br />
                        {col.id.slice(3)}
                      </>
                    ) : (
                      col.id
                    )}
                  </div>
                </div>
                <span>{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-badge">
          <span className="badge-dot"></span>
          Powered by AI · Updated for 2026 Admissions
        </div>

        <h1>
          Every &nbsp;College &nbsp;
          <span className="rotating-wrapper">
            <span className="rotating-words" style={{ transform: `translateY(-${rotatingIndex * (100 / rotatingWords.length)}%)` }}>
              {rotatingWords.map((word, i) => <em key={i}>{word}</em>)}
            </span>
          </span>
        </h1>

        <div className="search-container">
          <form className="search-box" onSubmit={handleSearch}>
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input 
              id="searchInput"
              type="text" 
              placeholder="Ask anything... 'JEE Main cutoff for NIT Trichy CSE'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={`search-btn ${isSearching ? 'loading' : ''}`}>
              {isSearching ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              )}
              {isSearching ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          <div className={`search-hints ${isChatActive ? 'hidden' : ''}`}>
            {['IIT Bombay CSE cutoff', 'Best NITs for ECE', 'BITS Pilani fees 2026', 'NIT vs IIIT comparison'].map(hint => (
              <span key={hint} className="hint-tag" onClick={() => fillSearch(hint)}>{hint}</span>
            ))}
          </div>
          <p className={`hero-sub ${isChatActive ? 'hidden' : ''}`}>Ask anything about Indian colleges — cutoffs, placements, fees, rankings, seat matrix — and get instant, accurate answers powered by AI.</p>

          <div className={`ai-result ${aiResult ? 'visible' : ''}`}>
            <button className="close-btn" onClick={closeResult}>&times;</button>
            <div className="ai-result-header">
              <span className="dot"></span>
              cutoffs.ai
            </div>
            
            {aiResult?.type === 'preference' ? (
              <div className="combo-container">
                <div className="combo-header">
                  <div className="combo-title">Your JoSAA Preference Strategies</div>
                  <div className="combo-subtitle">Rank {fmtRank(aiResult.data.userRank)} · {aiResult.data.seatTypeLabel} · {aiResult.data.year}</div>
                </div>
                <div className="combo-grid">
                  {aiResult.data.combos.map(combo => (
                    <div key={combo.id} className="combo-card">
                      <div className="combo-card-header">
                        <div className="combo-card-num">#{combo.id + 1}</div>
                        <div className="combo-card-title">{combo.title}</div>
                        <div className="combo-card-sub">{combo.subtitle}</div>
                      </div>
                      <div className="combo-card-body">
                         <div className="pref-filter-section">
                           <div className="pref-filter-label">🎯 Branch Focus</div>
                           <div className="pref-tags">
                             {(combo.branchFocus && combo.branchFocus.length > 0) ? combo.branchFocus.map(b => <span key={b} className="pref-tag pref-tag-focus">✓ {b}</span>) : <span className="pref-tag pref-tag-neutral">All Branches</span>}
                           </div>
                         </div>
                         <div className="combo-card-stats">
                           <div className="combo-stat-item"><div className="combo-stat-num">{combo.stats.options}</div><div className="combo-stat-label">Options</div></div>
                           <div className="combo-stat-item"><div className="combo-stat-num" style={{color:'#8b5cf6'}}>{combo.stats.iits}</div><div className="combo-stat-label">IITs</div></div>
                           <div className="combo-stat-item"><div className="combo-stat-num" style={{color:'#10b981'}}>{combo.stats.safe}</div><div className="combo-stat-label">Safe</div></div>
                         </div>
                      </div>
                      <div className="combo-card-footer">
                        <button className="combo-preview-btn" onClick={() => setComboModalData(combo)}>👁️ Preview</button>
                        <button className="combo-pdf-btn" onClick={() => downloadPDF(combo)}>📥 PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="ai-result-body" dangerouslySetInnerHTML={{ __html: aiResult?.body || '' }}></div>
            )}
            <div className="ai-result-meta">{aiResult?.meta}</div>
          </div>
        </div>

        {!isChatActive && (
          <div className="hero-bottom">
            <div className="hero-promo">
              <Link href="/simulator" className="hero-promo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, #1a1510 0%, #15130f 100%)', border: '1px solid rgba(255, 107, 53, 0.2)', borderRadius: '16px', padding: '18px 22px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 107, 53, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>Engineering Counselling Simulator</div>
                  <div style={{ fontSize: '12px', color: '#8a8a95', lineHeight: 1.4 }}>Practice choice filling for JoSAA & NEET with real cutoff data</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="hero-stats" ref={statsRef}>
              <div className="stat">
                <div className="stat-num">{statValues.colleges.toLocaleString()}<span>+</span></div>
                <div className="stat-label">Colleges Covered</div>
              </div>
              <div className="stat">
                <div className="stat-num">{statValues.exams}<span>+</span></div>
                <div className="stat-label">Entrance Exams</div>
              </div>
              <div className="stat">
                <div className="stat-num">{statValues.points}<span>M+</span></div>
                <div className="stat-label">Data Points</div>
              </div>
              <div className="stat">
                <div className="stat-num">{statValues.year}</div>
                <div className="stat-label">Updated Data</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {!isChatActive && (
        <>
          <section id="demo">
            <div className="demo-section">
              <div className="reveal">
                <div className="section-label">// AI Assistant</div>
                <h2 className="section-title">Ask like you'd<br/>ask a <em style={{fontFamily:'var(--serif)',color:'var(--accent)'}}>senior</em></h2>
                <p className="section-desc">No more scrolling through forums or outdated PDFs. Just ask in plain language and get accurate, sourced answers instantly.</p>
                <div style={{display:'flex',flexDirection:'column',gap:'14px',marginTop:'8px'}}>
                  {['Real-time cutoff data from official sources', 'Compare colleges side-by-side', 'Personalized recommendations based on your rank', 'Covers JEE, NEET, CUET, state CETs & more'].map(text => (
                    <div key={text} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                      <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'var(--accent-2)',flexShrink:0}}></div>
                      <span style={{fontSize:'15px',color:'var(--text-muted)',lineHeight:1.5}}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`chat-window stagger-2${isDemoVisible ? ' glow' : ''}`} ref={chatWindowRef}>
                <div className="chat-header"><span className="online"></span>cutoffs.ai — Online</div>
                <div className="chat-body" id="chatBody">
                  <div className="msg msg-user">What's the JEE Main cutoff for NIT Trichy CSE for General category?</div>
                  <div className="msg msg-ai" style={{ whiteSpace: 'pre-wrap' }}>{demoText}</div>
                </div>
                <div className="chat-input-bar">
                  <input type="text" placeholder="Ask about any college..." readOnly />
                  <button><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
                </div>
              </div>
            </div>
          </section>

          <section id="features">
            <div className="features-section">
              <div className="reveal">
                <div className="section-label">// Capabilities</div>
                <h2 className="section-title">Everything you need,<br/>nothing you don't</h2>
              </div>
              <div className="features-grid">
                {[
                  { icon: '📊', title: 'Cutoff Predictor', desc: 'Enter your rank and get predicted cutoffs across all rounds for every college and branch.', fi: 'fi-1' },
                  { icon: '🏛️', title: 'College Profiles', desc: 'Deep-dive into 6,000+ colleges — placements, faculty, infrastructure, hostel life.', fi: 'fi-2' },
                  { icon: '⚖️', title: 'Compare Tool', desc: 'Side-by-side comparison of colleges on 25+ parameters.', fi: 'fi-3' },
                  { icon: '💰', title: 'Fees & Scholarships', desc: 'Complete fee structures with hostel, mess, and hidden charges.', fi: 'fi-4' },
                  { icon: '📈', title: 'Placement Reports', desc: 'Real placement data — median packages, top recruiters, branch-wise stats.', fi: 'fi-5' },
                  { icon: '🗺️', title: 'Seat Matrix', desc: 'Category-wise seat availability, spot round vacancies, and closing rank data.', fi: 'fi-6' }
                ].map((feat, i) => (
                  <div key={i} className={`feature-card reveal reveal-scale-up stagger-${(i % 3) + 1}`}>
                    <div className={`feature-icon ${feat.fi}`}>{feat.icon}</div>
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="exams">
            <div className="exams-section">
              <div className="reveal">
                <div className="section-label">// Supported Exams</div>
                <h2 className="section-title">Every exam, covered</h2>
                <p className="section-desc">From national entrances to state-level CETs, we track cutoffs and college data for all major exams.</p>
              </div>
              {[
                [{icon:'🎯', t:'JEE Main & Advanced', s:'IITs, NITs, IIITs, GFTIs', fi:'fi-1'}, {icon:'🩺', t:'NEET UG', s:'AIIMS, JIPMER, GMCs', fi:'fi-2'}, {icon:'📝', t:'CUET', s:'Central Universities', fi:'fi-3'}, {icon:'💻', t:'BITSAT', s:'BITS Pilani, Goa, Hyderabad', fi:'fi-4'}],
                [{icon:'🏗️', t:'State CETs', s:'MHT-CET, KCET, WBJEE, AP EAMCET', fi:'fi-5'}, {icon:'📐', t:'GATE', s:'IITs, NITs M.Tech admissions', fi:'fi-6'}, {icon:'🎨', t:'NATA / JEE Paper 2', s:'Architecture colleges', fi:'fi-1'}, {icon:'📚', t:'CAT / MAT / XAT', s:'IIMs, Top B-Schools', fi:'fi-2'}]
              ].map((row, ri) => (
                <div key={ri} className="exams-row">
                  {row.map((exam, ei) => (
                    <div key={ei} className={`exam-pill reveal stagger-pill-${ei + 1}`}>
                      <div className={`exam-icon ${exam.fi}`}>{exam.icon}</div>
                      <div><h4>{exam.t}</h4><span>{exam.s}</span></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="marquee-section" id="colleges">
            <div className="reveal reveal-scale-up marquee-intro">
              <div className="section-label">// Top Colleges</div>
              <h2 className="section-title">Tracking India's best</h2>
            </div>
            <div className="marquee-track">
              {[
                { r: 'NIRF #1 · Engineering', t: 'IIT Madras', l: 'Chennai, TN', tags: ['JEE Advanced', '₹2.2L/yr', '₹32L median'] },
                { r: 'NIRF #2 · Engineering', t: 'IIT Delhi', l: 'New Delhi', tags: ['JEE Advanced', '₹2.2L/yr', '₹30L median'] },
                { r: 'NIRF #3 · Engineering', t: 'IIT Bombay', l: 'Mumbai, MH', tags: ['JEE Advanced', '₹2.2L/yr', '₹28L median'] },
                { r: 'NIRF #1 · Medical', t: 'AIIMS Delhi', l: 'New Delhi', tags: ['NEET UG', '₹5K/yr', 'Govt.'] },
                { r: 'Top Private', t: 'BITS Pilani', l: 'Pilani, RJ', tags: ['BITSAT', '₹5.5L/yr', '₹22L median'] }
              ].concat([
                { r: 'NIRF #1 · Engineering', t: 'IIT Madras', l: 'Chennai, TN', tags: ['JEE Advanced', '₹2.2L/yr', '₹32L median'] },
                { r: 'NIRF #2 · Engineering', t: 'IIT Delhi', l: 'New Delhi', tags: ['JEE Advanced', '₹2.2L/yr', '₹30L median'] }
              ]).map((col, i) => (
                <div key={i} className="college-card">
                  <div className="college-rank">{col.r}</div>
                  <h4>{col.t}</h4>
                  <div className="college-loc">{col.l}</div>
                  <div className="college-tags">
                    {col.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cta-section">
            <div className="reveal reveal-scale-up">
              <div className="section-label">// Get Started</div>
              <h2 className="section-title">Stop guessing.<br/>Start <em style={{fontFamily:'var(--serif)',color:'var(--accent)'}}>knowing</em>.</h2>
              <p className="section-desc">Join thousands of students making smarter college decisions with AI-powered insights.</p>
              <Link href="/auth" className="cta-btn">
                Start Exploring Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </section>

          <footer style={{ padding: '48px 40px', borderTop: '1px solid var(--border)', maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'24px' }}>
            <div className="foot-brand">© 2026 cutoffs.ai</div>
            <div style={{ display:'flex', gap:'24px', alignItems:'center', flexWrap:'wrap' }}>
              <a href="tel:9030614948" style={{ display:'flex', alignItems:'center', gap:'6px', color:'var(--text-muted)', textDecoration:'none', fontSize:'14px', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--text)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                9030614948
              </a>
              <a href="mailto:Cutoff.ai@gmail.com" style={{ display:'flex', alignItems:'center', gap:'6px', color:'var(--text-muted)', textDecoration:'none', fontSize:'14px', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--text)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Cutoff.ai@gmail.com
              </a>
            </div>
            <ul className="nav-links" style={{ display: 'flex', gap: '24px' }}>
              <li><a href="#">About</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </footer>
        </>
      )}

      {/* Preference Modal */}
      {comboModalData && (
        <div className="combo-modal-overlay" onClick={() => setComboModalData(null)}>
          <div className="combo-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setComboModalData(null)}>&times;</button>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '18px', color: 'var(--text)' }}>{comboModalData.title}</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
                {comboModalData.subtitle} · {comboModalData.stats.options} options · Rank {fmtRank(aiResult.data.userRank)}
              </div>
            </div>
            <div className="preview-grid">
              {comboModalData.entries.map((e, i) => (
                <div key={i} className="preview-card">
                  <div className="preview-card-rank">
                    <span className="pref-num">#{i + 1}</span> 
                    {aiResult.data.userRank <= e.closingRank * 0.85 ? '✅ Safe' : '⚡ Competitive'}
                  </div>
                  <h4>{e.shortInstitute}</h4>
                  <div className="preview-prog">{e.program}</div>
                  <div className="preview-tags">
                    <span className="tag-cutoff">Cutoff: {fmtRank(e.closingRank)}</span>
                    <span>{e.quotaFull}</span>
                    <span>{e.seatLabel}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="combo-modal-download">
               <button className="combo-pdf-btn" style={{ display: 'inline-flex', padding: '12px 28px' }} onClick={() => { setComboModalData(null); downloadPDF(comboModalData); }}>
                 📥 Download PDF
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
