'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ComboCard from '@/components/ComboCard';
import { sanitizeHTML } from '@/lib/sanitize';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import { comboStrategies } from '@/data/combos';
import { choices } from '@/data/choices';
import { formatInstituteRank } from '@/data/colleges';

export default function CutoffsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General');
  const [chatInput, setChatInput] = useState(initialQuery);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewCombo, setPreviewCombo] = useState(null);
  const [toast, setToast] = useState(null);

  const comboGridRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Filter choices based on the preview combo's criteria
  const comboChoices = useMemo(() => {
    if (!previewCombo) return [];
    const branchKeywords = previewCombo.branchFocus.map((b) => b.toLowerCase());
    return choices.filter((c) => {
      const p = c.program.toLowerCase();
      return branchKeywords.some((kw) => p.includes(kw.toLowerCase()));
    });
  }, [previewCombo]);

  // Compute stats for preview
  const previewStats = useMemo(() => {
    if (!previewCombo || comboChoices.length === 0) return null;
    const userRank = parseInt(rank);
    if (!userRank) return { total: comboChoices.length, withinReach: 0, safe: 0 };
    const withinReach = comboChoices.filter((c) => c.cutoff >= userRank).length;
    const safe = comboChoices.filter((c) => c.cutoff >= userRank * 1.2).length;
    return { total: comboChoices.length, withinReach, safe };
  }, [previewCombo, comboChoices, rank]);

  // Generate button handler
  const handleGenerate = () => {
    if (comboGridRef.current) {
      comboGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // AI Chat - POST to /api/ask
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();

      if (data.html) {
        setChatMessages((prev) => [...prev, { role: 'ai', html: data.html }]);
      } else if (data.type === 'preference') {
        setChatMessages((prev) => [
          ...prev,
          { role: 'ai', content: 'Enter your JEE rank above and click "Generate 50 Combos" to get personalized preference strategies.' },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: 'ai', content: data.answer || 'No response received.' },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = (combo) => {
    setPreviewCombo(combo);
  };

  // PDF Download using jspdf from CDN
  const handleDownload = async (combo) => {
    const branchKeywords = combo.branchFocus.map((b) => b.toLowerCase());
    const matchingChoices = choices.filter((c) => {
      const p = c.program.toLowerCase();
      return branchKeywords.some((kw) => p.includes(kw.toLowerCase()));
    });

    try {
      // Dynamically load jspdf
      if (!window.jspdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Title
      doc.setFontSize(16);
      doc.setTextColor(100, 60, 180);
      doc.text(`Strategy #${combo.id}: ${combo.title}`, 14, 20);

      // User info
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Category: ${category}${rank ? ` | Rank: ${rank}` : ''}`, 14, 28);
      doc.text(`Branch Focus: ${combo.branchFocus.join(', ')}`, 14, 34);
      doc.text(`Generated by cutoffs.ai`, 14, 40);

      // Table header
      let y = 50;
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(40, 40, 60);
      doc.rect(14, y - 4, 182, 8, 'F');
      doc.text('#', 16, y);
      doc.text('Institute', 26, y);
      doc.text('Program', 100, y);
      doc.text('Cutoff', 170, y);
      y += 8;

      // Table rows
      doc.setTextColor(50, 50, 50);
      matchingChoices.forEach((c, i) => {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
        if (i % 2 === 0) {
          doc.setFillColor(245, 245, 250);
          doc.rect(14, y - 4, 182, 7, 'F');
        }
        doc.text(String(i + 1), 16, y);
        doc.text(c.institute.substring(0, 38), 26, y);
        doc.text(c.program.substring(0, 35), 100, y);
        doc.text(c.cutoff.toLocaleString(), 170, y);
        y += 7;
      });

      doc.save(`preference-combo-${combo.id}.pdf`);
      setToast('PDF Downloaded!');
    } catch (err) {
      setToast('Failed to generate PDF. Try again.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-white">50 Preference Combos</h1>
        <p className="text-gray-400 text-sm mt-1">
          AI-curated strategies for your JoSAA counselling
        </p>
      </div>

      {/* Input Bar */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 flex-wrap">
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="Your Rank"
            className="flex-1 min-w-[120px] bg-[#13131a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#13131a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="General">General</option>
            <option value="OBC-NCL">OBC-NCL</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>
          <button
            onClick={handleGenerate}
            className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Generate 50 Combos
          </button>
        </div>
      </div>

      {/* AI Chat Section */}
      <div className="px-4 pb-6">
        <div className="bg-[#13131a] border border-white/5 rounded-2xl overflow-hidden">
          {/* Chat messages */}
          {chatMessages.length > 0 && (
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-purple-600/20 border border-purple-500/20 text-purple-200 rounded-br-md'
                        : 'bg-[#1e1e28] border border-white/5 text-gray-300 rounded-bl-md'
                    }`}
                  >
                    {msg.html ? (
                      <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.html) }} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1e1e28] border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Chat input */}
          <form onSubmit={handleAskAI} className="flex items-center border-t border-white/5">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about cutoffs, colleges, branches..."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-3 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Combo Cards Grid */}
      <div ref={comboGridRef} className="px-4 pb-8">
        <h2 className="text-white font-semibold text-base mb-3">All Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {comboStrategies.map((combo) => (
            <ComboCard
              key={combo.id}
              combo={combo}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewCombo}
        onClose={() => setPreviewCombo(null)}
        title={previewCombo?.title || 'Strategy Preview'}
      >
        {previewCombo && (
          <div className="space-y-4">
            {/* Strategy Info */}
            <p className="text-gray-400 text-sm">{previewCombo.description}</p>

            {/* Branch Focus */}
            <div>
              <p className="text-gray-500 text-xs mb-2 font-medium">Branch Focus</p>
              <div className="flex flex-wrap gap-1.5">
                {previewCombo.branchFocus.map((b) => (
                  <Badge key={b} text={b} variant="green" />
                ))}
              </div>
            </div>

            {/* Blocked Branches */}
            {previewCombo.blockedBranches.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs mb-2 font-medium">Blocked Branches</p>
                <div className="flex flex-wrap gap-1.5">
                  {previewCombo.blockedBranches.map((b) => (
                    <Badge key={b} text={b} variant="red" />
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#16162a] rounded-lg p-3 text-center">
                <p className="text-purple-400 font-bold text-lg">{previewCombo.stats.matchingSeats}</p>
                <p className="text-gray-500 text-[10px]">Seats</p>
              </div>
              <div className="bg-[#16162a] rounded-lg p-3 text-center">
                <p className="text-blue-400 font-bold text-lg">{previewCombo.stats.rankGap}</p>
                <p className="text-gray-500 text-[10px]">Rank Range</p>
              </div>
              <div className="bg-[#16162a] rounded-lg p-3 text-center">
                <p className="text-green-400 font-bold text-lg">{previewCombo.stats.placement}</p>
                <p className="text-gray-500 text-[10px]">Placement</p>
              </div>
            </div>

            {/* Matching Choices Table */}
            <div>
              <p className="text-white text-sm font-semibold mb-2">
                Matching Programs ({comboChoices.length})
              </p>

              {/* Table header */}
              <div className="grid grid-cols-[32px_1fr_auto] gap-2 px-3 py-1.5 text-[10px] text-gray-500 font-medium uppercase tracking-wide border-b border-white/5">
                <span>#</span>
                <span>Institute / Program</span>
                <span>Cutoff</span>
              </div>

              <div className="space-y-0 max-h-72 overflow-y-auto">
                {comboChoices.map((c, idx) => {
                  const instData = formatInstituteRank(c.institute);
                  const userRank = parseInt(rank);
                  const canGet = userRank && c.cutoff >= userRank;

                  return (
                    <div
                      key={c.no}
                      className={`grid grid-cols-[32px_1fr_auto] gap-2 items-center px-3 py-2 border-b border-white/5 last:border-0 ${
                        canGet ? 'bg-green-500/10' : ''
                      }`}
                    >
                      <span className="text-gray-500 text-[10px]">{idx + 1}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-white text-xs font-medium truncate">{c.institute}</p>
                          {instData.nirf && (
                            <span className="shrink-0 bg-blue-500/20 text-blue-400 text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                              NIRF #{instData.nirf}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-[10px] truncate">{c.program}</p>
                      </div>
                      <span className={`text-xs font-bold shrink-0 ${canGet ? 'text-green-400' : 'text-gray-400'}`}>
                        {c.cutoff.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats summary */}
            {previewStats && (
              <div className="bg-[#16162a] rounded-xl p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Total Matching</span>
                  <span className="text-white font-bold">{previewStats.total}</span>
                </div>
                {parseInt(rank) > 0 && (
                  <>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Within Reach (cutoff &ge; your rank)</span>
                      <span className="text-green-400 font-bold">{previewStats.withinReach}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Safe Picks (20% margin)</span>
                      <span className="text-blue-400 font-bold">{previewStats.safe}</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Download PDF from modal */}
            <button
              onClick={() => handleDownload(previewCombo)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              Download PDF
            </button>
          </div>
        )}
      </Modal>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg shadow-green-600/30 animate-in slide-in-from-bottom duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
