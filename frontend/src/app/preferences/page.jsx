'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import SeatGrid from '@/components/SeatGrid';
import Modal from '@/components/Modal';
import { sanitizeHTML } from '@/lib/sanitize';
import SearchBar from '@/components/SearchBar';
import TabBar from '@/components/TabBar';
import Badge from '@/components/Badge';
import { choices } from '@/data/choices';
import { getBranchEmoji, formatInstituteRank } from '@/data/colleges';

const tabs = [
  { id: 'selections', label: 'Your Selections' },
  { id: 'activity', label: 'Recent Activity' },
];

export default function PreferencesPage() {
  const [rank, setRank] = useState('15000');
  const [category, setCategory] = useState('General');
  const [homeState, setHomeState] = useState('');

  // Seat state
  const [assignments, setAssignments] = useState({});
  const [lockedSeats, setLockedSeats] = useState(new Set());
  const [history, setHistory] = useState([]);

  // Modal states
  const [modalMode, setModalMode] = useState(null); // 'assign' | 'manage' | null
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [modalSearch, setModalSearch] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState('selections');

  // AI Chat
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  // Confirm dialog
  const [confirmAction, setConfirmAction] = useState(null);

  const seatGridRef = useRef(null);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = useCallback((msg) => setToast(msg), []);

  const addHistory = useCallback((type, text) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistory((prev) => [{ type, text, time }, ...prev.slice(0, 99)]);
  }, []);

  // Filtered choices for assignment modal
  const filteredChoices = useMemo(() => {
    if (!modalSearch.trim()) return choices;
    const q = modalSearch.toLowerCase();
    return choices.filter(
      (c) =>
        c.institute.toLowerCase().includes(q) ||
        c.program.toLowerCase().includes(q)
    );
  }, [modalSearch]);

  // Handle seat click
  const handleSeatClick = (seatNo) => {
    if (lockedSeats.has(seatNo)) {
      showToast('This seat is locked. Unlock it first.');
      return;
    }

    setSelectedSeat(seatNo);
    setModalSearch('');

    if (assignments[seatNo]) {
      setModalMode('manage');
    } else {
      setModalMode('assign');
    }
  };

  // Assign a choice to a seat
  const handleAssignChoice = (choice) => {
    if (selectedSeat === null) return;
    const wasExisting = !!assignments[selectedSeat];
    setAssignments((prev) => ({
      ...prev,
      [selectedSeat]: choice,
    }));

    if (wasExisting) {
      addHistory('change', `Changed #${selectedSeat} to ${choice.institute} ${choice.program.split('(')[0].trim()}`);
    } else {
      addHistory('add', `Added ${choice.institute} ${choice.program.split('(')[0].trim()} to #${selectedSeat}`);
    }

    setSelectedSeat(null);
    setModalMode(null);
  };

  // Remove assignment
  const handleRemove = (seatNo) => {
    const old = assignments[seatNo];
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[seatNo];
      return next;
    });
    setLockedSeats((prev) => {
      const next = new Set(prev);
      next.delete(seatNo);
      return next;
    });
    if (old) {
      addHistory('remove', `Removed ${old.institute} ${old.program.split('(')[0].trim()} from #${seatNo}`);
    }
    setSelectedSeat(null);
    setModalMode(null);
  };

  // Lock a seat
  const handleLock = (seatNo) => {
    setLockedSeats((prev) => {
      const next = new Set(prev);
      next.add(seatNo);
      return next;
    });
    addHistory('lock', `Locked #${seatNo}`);
    setSelectedSeat(null);
    setModalMode(null);
  };

  // Unlock a seat
  const handleUnlock = (seatNo) => {
    setLockedSeats((prev) => {
      const next = new Set(prev);
      next.delete(seatNo);
      return next;
    });
    addHistory('change', `Unlocked #${seatNo}`);
    showToast(`Seat #${seatNo} unlocked`);
  };

  // Change - open assign modal for an existing seat
  const handleChange = () => {
    setModalMode('assign');
    setModalSearch('');
  };

  // Delete all
  const handleDeleteAll = () => {
    const count = Object.keys(assignments).length;
    if (count === 0) {
      showToast('No assignments to delete');
      return;
    }
    setConfirmAction({
      title: 'Delete All Assignments',
      message: `This will remove all ${count} assignments and unlock all seats. This cannot be undone.`,
      onConfirm: () => {
        setAssignments({});
        setLockedSeats(new Set());
        addHistory('remove', `Cleared all ${count} assignments`);
        showToast(`Deleted ${count} assignments`);
        setConfirmAction(null);
      },
    });
  };

  // Lock all
  const handleLockAll = () => {
    const assigned = Object.keys(assignments).map(Number);
    if (assigned.length === 0) {
      showToast('No assignments to lock');
      return;
    }
    setLockedSeats(new Set(assigned));
    addHistory('lock', `Locked all ${assigned.length} seats`);
    showToast(`Locked ${assigned.length} seats`);
  };

  // Load sheet (placeholder)
  const handleLoadSheet = () => {
    showToast('Coming soon!');
  };

  // AI Chat submit
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const question = chatInput.trim();
    setChatInput('');
    setChatLoading(true);
    setChatResponse(null);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();

      if (data.html) {
        setChatResponse({ html: data.html });
      } else {
        setChatResponse({ text: data.answer || 'No response.' });
      }
    } catch {
      setChatResponse({ text: 'Something went wrong. Please try again.' });
    } finally {
      setChatLoading(false);
    }
  };

  // Build assigned list for selections tab
  const assignedList = Object.entries(assignments)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([seat, choice]) => ({
      seat: Number(seat),
      choice,
      locked: lockedSeats.has(Number(seat)),
    }));

  // Build display assignments for SeatGrid (string map)
  const displayAssignments = useMemo(() => {
    const map = {};
    Object.entries(assignments).forEach(([seat, choice]) => {
      map[seat] = `${choice.institute} - ${choice.program}`;
    });
    return map;
  }, [assignments]);

  // Activity icons & colors
  const activityConfig = {
    add: { icon: '+', borderColor: 'border-l-green-500', textColor: 'text-green-400' },
    remove: { icon: 'x', borderColor: 'border-l-red-500', textColor: 'text-red-400' },
    lock: { icon: '!', borderColor: 'border-l-orange-500', textColor: 'text-orange-400' },
    change: { icon: '~', borderColor: 'border-l-blue-500', textColor: 'text-blue-400' },
  };

  return (
    <div className="min-h-screen">
      {/* User Info Bar */}
      <div className="px-4 pt-6 pb-3">
        <h1 className="text-xl font-bold text-white mb-3">Preference Builder</h1>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-[#13131a] border border-white/10 rounded-lg px-3 py-1.5">
            <span className="text-gray-500 text-xs">Rank:</span>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="bg-transparent text-white text-xs font-medium w-16 outline-none"
            />
          </div>
          <div className="flex items-center gap-1.5 bg-[#13131a] border border-white/10 rounded-lg px-3 py-1.5">
            <span className="text-gray-500 text-xs">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-white text-xs font-medium outline-none"
            >
              <option value="General">General</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 bg-[#13131a] border border-white/10 rounded-lg px-3 py-1.5">
            <span className="text-gray-500 text-xs">State:</span>
            <input
              type="text"
              value={homeState}
              onChange={(e) => setHomeState(e.target.value)}
              placeholder="e.g. TN"
              className="bg-transparent text-white text-xs font-medium w-14 outline-none placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      {/* AI Chat Input */}
      <div className="px-4 pb-4">
        <form
          onSubmit={handleChatSubmit}
          className="flex items-center bg-[#13131a] border border-white/5 rounded-xl overflow-hidden"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about preferences..."
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
          />
          <button
            type="submit"
            disabled={chatLoading}
            className="px-3 py-2.5 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
          >
            {chatLoading ? (
              <div className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </form>

        {/* Chat response */}
        {chatResponse && (
          <div className="mt-2 bg-[#1e1e28] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300">
            {chatResponse.html ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(chatResponse.html) }} />
            ) : (
              chatResponse.text
            )}
          </div>
        )}
      </div>

      {/* Seat Grid */}
      <div className="px-4 pb-4" ref={seatGridRef}>
        <div className="bg-[#13131a] border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-sm font-semibold">100 Preference Seats</h2>
            <span className="text-gray-500 text-xs">
              {Object.keys(assignments).length}/100 filled
            </span>
          </div>
          <SeatGrid
            assignments={displayAssignments}
            lockedSeats={lockedSeats}
            onSeatClick={handleSeatClick}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={handleLoadSheet}
          className="flex-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl py-2.5 text-xs font-medium hover:bg-blue-600/30 transition-colors"
        >
          Load Sheet
        </button>
        <button
          onClick={handleDeleteAll}
          className="flex-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl py-2.5 text-xs font-medium hover:bg-red-600/30 transition-colors"
        >
          Delete All
        </button>
        <button
          onClick={handleLockAll}
          className="flex-1 bg-orange-600/20 text-orange-400 border border-orange-500/30 rounded-xl py-2.5 text-xs font-medium hover:bg-orange-600/30 transition-colors"
        >
          Lock All
        </button>
      </div>

      {/* Tab Bar + Content */}
      <div className="px-4 pb-8">
        <div className="bg-[#13131a] border border-white/5 rounded-2xl overflow-hidden">
          <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="p-4">
            {activeTab === 'selections' ? (
              assignedList.length > 0 ? (
                <div className="space-y-2">
                  {assignedList.map(({ seat, choice, locked }) => {
                    const instData = formatInstituteRank(choice.institute);
                    return (
                      <button
                        key={seat}
                        onClick={() => {
                          // Scroll to seat grid
                          seatGridRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full flex items-center gap-3 bg-[#16162a] rounded-lg px-3 py-2.5 text-left hover:bg-[#1e1e30] transition-colors"
                      >
                        <span
                          className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold border shrink-0 ${
                            locked
                              ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                              : 'bg-green-500/20 border-green-500/40 text-green-400'
                          }`}
                        >
                          {seat}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium truncate">{choice.institute}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-gray-500 text-[10px] truncate">{choice.program}</p>
                            <span className="text-green-400 text-[10px] font-bold shrink-0">
                              {choice.cutoff.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        {locked && <Badge text="Locked" variant="orange" />}
                        {!locked && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemove(seat);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-6">
                  Click seats above to assign colleges
                </p>
              )
            ) : (
              history.length > 0 ? (
                <div className="space-y-1.5">
                  {history.map((item, i) => {
                    const config = activityConfig[item.type] || activityConfig.change;
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 bg-[#16162a] rounded-lg px-3 py-2.5 border-l-2 ${config.borderColor}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-300 text-xs">{item.text}</p>
                          <p className="text-gray-600 text-[10px] mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-6">
                  No recent activity. Start assigning colleges to seats.
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Assignment Modal - selecting a choice */}
      <Modal
        isOpen={modalMode === 'assign' && selectedSeat !== null}
        onClose={() => { setSelectedSeat(null); setModalMode(null); }}
        title={assignments[selectedSeat] ? `Change Seat #${selectedSeat}` : `Assign Seat #${selectedSeat}`}
      >
        <div className="space-y-3">
          <SearchBar
            value={modalSearch}
            onChange={setModalSearch}
            placeholder="Search colleges or programs..."
          />

          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {filteredChoices.map((choice) => {
              const instData = formatInstituteRank(choice.institute);
              const userRank = parseInt(rank);
              const canGet = userRank && choice.cutoff >= userRank;

              return (
                <button
                  key={choice.no}
                  onClick={() => handleAssignChoice(choice)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-left ${
                    canGet
                      ? 'bg-green-500/10 hover:bg-green-500/20 border border-green-500/20'
                      : 'bg-[#16162a] hover:bg-[#1e1e30]'
                  }`}
                >
                  <span className="text-lg shrink-0">{getBranchEmoji(choice.program)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-white text-xs font-medium truncate">{choice.institute}</p>
                      {instData.nirf && (
                        <span className="shrink-0 text-[9px] text-blue-400 bg-blue-500/20 px-1 py-0.5 rounded-full">
                          #{instData.nirf}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-[10px] truncate">{choice.program}</p>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${canGet ? 'text-green-400' : 'text-gray-400'}`}>
                    {choice.cutoff.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Manage Modal - options for an assigned seat */}
      <Modal
        isOpen={modalMode === 'manage' && selectedSeat !== null}
        onClose={() => { setSelectedSeat(null); setModalMode(null); }}
        title={`Seat #${selectedSeat}`}
      >
        {selectedSeat !== null && assignments[selectedSeat] && (
          <div className="space-y-4">
            {/* Current assignment */}
            <div className="bg-[#16162a] rounded-xl p-4">
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">Current Assignment</p>
              <p className="text-white text-sm font-medium">{assignments[selectedSeat].institute}</p>
              <p className="text-gray-400 text-xs mt-0.5">{assignments[selectedSeat].program}</p>
              <p className="text-green-400 text-xs font-bold mt-1">
                Cutoff: {assignments[selectedSeat].cutoff.toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleChange}
                className="w-full flex items-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl px-4 py-3 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-400">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                <div className="text-left">
                  <p className="text-blue-400 text-sm font-medium">Change</p>
                  <p className="text-gray-500 text-[10px]">Assign a different college</p>
                </div>
              </button>

              {!lockedSeats.has(selectedSeat) ? (
                <button
                  onClick={() => handleLock(selectedSeat)}
                  className="w-full flex items-center gap-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl px-4 py-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-orange-400">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <div className="text-left">
                    <p className="text-orange-400 text-sm font-medium">Lock</p>
                    <p className="text-gray-500 text-[10px]">Prevent accidental changes</p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => { handleUnlock(selectedSeat); setSelectedSeat(null); setModalMode(null); }}
                  className="w-full flex items-center gap-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl px-4 py-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-orange-400">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                  </svg>
                  <div className="text-left">
                    <p className="text-orange-400 text-sm font-medium">Unlock</p>
                    <p className="text-gray-500 text-[10px]">Allow changes again</p>
                  </div>
                </button>
              )}

              <button
                onClick={() => handleRemove(selectedSeat)}
                className="w-full flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl px-4 py-3 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-red-400">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <div className="text-left">
                  <p className="text-red-400 text-sm font-medium">Remove</p>
                  <p className="text-gray-500 text-[10px]">Clear this seat</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-[90vw] max-w-sm">
            <h3 className="text-white font-semibold text-base mb-2">{confirmAction.title}</h3>
            <p className="text-gray-400 text-sm mb-5">{confirmAction.message}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 bg-[#16162a] text-gray-300 border border-white/10 rounded-xl py-2.5 text-sm font-medium hover:bg-[#1e1e30] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction.onConfirm}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-[#1a1a2e] border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg animate-in slide-in-from-bottom duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
