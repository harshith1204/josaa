'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import CollegeCard from '@/components/CollegeCard';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import { choices } from '@/data/choices';
import { formatInstituteRank, getBranchEmoji, formatDelta } from '@/data/colleges';
import { studentNames } from '@/data/students';

const categoryTabs = ['All', 'CSE', 'ECE', 'IT', 'AI/ML', 'EE'];

const DEFAULT_RANK = 15000;

const quickInfoItems = [
  { key: 'hostel', label: 'Hostel', emoji: '\u{1F3E0}', detail: 'AC & WiFi enabled, 24x7 security' },
  { key: 'placements', label: 'Placements', emoji: '\u{1F4BC}', detail: 'Average: 12 LPA, Highest: 45 LPA' },
  { key: 'fee', label: 'Fee', emoji: '\u{1F4B0}', detail: '1.5-2L per year (government subsidy)' },
  { key: 'campus', label: 'Campus', emoji: '\u{1F333}', detail: '200+ acres, green campus' },
];

const hotQueries = [
  { q: 'Placement stats?', getAnswer: (inst, prog) => inst.includes('NIT Tiruchirappalli') ? 'Over 95% placement rate with median CTC of 12 LPA for CSE. Top recruiters include Google, Microsoft, Amazon, Goldman Sachs, and Adobe.' : inst.includes('NIT Karnataka') ? 'Over 92% placement rate. Top recruiters: Google, Microsoft, Amazon, Cisco, Intel.' : `Placement rate for ${prog} at ${inst} typically ranges from 80-95%. CSE and IT branches see the highest placement rates.` },
  { q: 'Hostel facilities?', getAnswer: (inst) => inst.includes('Tiruchirappalli') ? 'NIT Trichy has 18 hostels with AC rooms, WiFi, mess, gym, and 24x7 security. Single and shared rooms available.' : `${inst} provides hostel accommodation with WiFi, mess facilities, common rooms, and 24x7 security. Most rooms are shared (2-3 per room) with AC available in newer blocks.` },
  { q: 'Campus life?', getAnswer: (inst, _prog, estd) => estd ? `Established in ${estd}, ${inst} has a well-developed campus with sports facilities, tech clubs, cultural fests, hackathons, and active student chapters of IEEE, ACM, and more.` : `${inst} offers a vibrant campus life with technical festivals, cultural events, sports competitions, and numerous student-run clubs and societies.` },
  { q: 'How competitive is this seat?', getAnswer: (_inst, _prog, _estd, cutoff) => cutoff < 5000 ? 'Extremely competitive. Only the top 5,000 ranks can secure this seat. This is a premium choice.' : cutoff < 15000 ? 'Highly competitive. You need a strong JEE rank in the top 15,000 to secure this seat.' : cutoff < 50000 ? 'Moderately competitive. A rank under 50,000 gives you a good chance at this seat.' : 'Accessible for a wider range of ranks. A solid choice for students in the 50,000+ rank bracket.' },
];

function getStudentsForChoice(choiceNo) {
  const base = (choiceNo * 7) % studentNames.length;
  return [
    studentNames[base % studentNames.length],
    studentNames[(base + 3) % studentNames.length],
    studentNames[(base + 7) % studentNames.length],
  ];
}

function getGradient(no) {
  const gradients = [
    'from-purple-600 to-blue-600',
    'from-blue-600 to-cyan-600',
    'from-cyan-600 to-teal-600',
    'from-teal-600 to-green-600',
    'from-green-600 to-emerald-600',
    'from-orange-600 to-red-600',
    'from-pink-600 to-purple-600',
    'from-indigo-600 to-purple-600',
  ];
  return gradients[no % gradients.length];
}

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [expandedInfo, setExpandedInfo] = useState(null);
  const [activeQueryIdx, setActiveQueryIdx] = useState(0);

  const filteredChoices = useMemo(() => {
    let filtered = choices;

    if (activeTab !== 'All') {
      filtered = filtered.filter((c) => {
        const p = c.program.toLowerCase();
        switch (activeTab) {
          case 'CSE':
            return p.includes('cse') || p.includes('computer science') || p.includes('cs ') || p.includes('cs and');
          case 'ECE':
            return p.includes('ece') || p.includes('electronics and comm') || p.includes('vlsi');
          case 'IT':
            return p.includes('it ') || p.includes('it-') || p.includes('information technology') || p.includes('iiot');
          case 'AI/ML':
            return p.includes('ai') || p.includes('ml') || p.includes('data') || p.includes('ds');
          case 'EE':
            return p.includes('ee ') || p.includes('electrical') || p.includes('ee (');
          default:
            return true;
        }
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.institute.toLowerCase().includes(q) ||
          c.program.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [search, activeTab]);

  const handleCardClick = useCallback((choice) => {
    setSelectedChoice(choice);
    setExpandedInfo(null);
    setActiveQueryIdx(Math.floor(Math.random() * hotQueries.length));
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedChoice(null);
    setExpandedInfo(null);
  }, []);

  const rankInfo = selectedChoice ? formatInstituteRank(selectedChoice.institute) : null;
  const delta = selectedChoice ? DEFAULT_RANK - selectedChoice.cutoff : 0;
  const students = selectedChoice ? getStudentsForChoice(selectedChoice.no) : [];
  const currentQuery = hotQueries[activeQueryIdx];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Explore Colleges</h1>
        <p className="text-text-secondary text-sm mt-1">
          {filteredChoices.length} programs across NITs, IIITs & more
        </p>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search colleges or programs..."
        />
      </div>

      {/* Category Tabs */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border min-h-[36px] ${
                activeTab === tab
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  : 'bg-[#13131a] text-gray-400 border-white/5 hover:border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredChoices.map((choice) => (
            <CollegeCard
              key={choice.no}
              choice={choice}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {filteredChoices.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">&#128269;</p>
            <p className="text-gray-500 text-sm">No colleges found matching your search.</p>
            <button
              onClick={() => { setSearch(''); setActiveTab('All'); }}
              className="mt-3 px-4 py-2 rounded-lg bg-purple-600/20 text-purple-400 text-sm hover:bg-purple-600/30 transition-colors min-h-[44px]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* College Detail Modal */}
      <Modal
        isOpen={!!selectedChoice}
        onClose={handleCloseModal}
        title={selectedChoice?.institute || ''}
      >
        {selectedChoice && rankInfo && (
          <div className="space-y-4">
            {/* Gradient Header */}
            <div className={`bg-gradient-to-r ${getGradient(selectedChoice.no)} -mx-4 -mt-4 p-4 rounded-t-none`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getBranchEmoji(selectedChoice.program)}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-white/80 text-xs font-medium">Choice #{selectedChoice.no}</p>
                  <p className="text-white font-bold text-base truncate">{selectedChoice.program}</p>
                </div>
              </div>
            </div>

            {/* Key Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-[#16162a] rounded-xl p-3 text-center">
                <p className="text-gray-500 text-[10px] mb-0.5">Cutoff Rank</p>
                <p className="text-white font-bold text-lg">{selectedChoice.cutoff.toLocaleString()}</p>
              </div>
              {rankInfo.nirf && (
                <div className="bg-[#16162a] rounded-xl p-3 text-center">
                  <p className="text-gray-500 text-[10px] mb-0.5">NIRF Ranking</p>
                  <p className="text-blue-400 font-bold text-lg">#{rankInfo.nirf}</p>
                </div>
              )}
              {rankInfo.estd && (
                <div className="bg-[#16162a] rounded-xl p-3 text-center">
                  <p className="text-gray-500 text-[10px] mb-0.5">Established</p>
                  <p className="text-green-400 font-bold text-lg">{rankInfo.estd}</p>
                </div>
              )}
              {rankInfo.typeRank && (
                <div className="bg-[#16162a] rounded-xl p-3 text-center">
                  <p className="text-gray-500 text-[10px] mb-0.5">Type Rank</p>
                  <p className="text-purple-400 font-bold text-lg">{rankInfo.typeRank}</p>
                </div>
              )}
            </div>

            {/* Delta from your rank */}
            <div className="bg-[#16162a] rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Delta from rank {DEFAULT_RANK.toLocaleString()}</p>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-bold ${delta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatDelta(delta)}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${delta >= 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {delta >= 0 ? 'Within reach' : 'Aspirational'}
                </span>
              </div>
            </div>

            {/* Branch Emoji & Full Name */}
            <div className="flex items-start gap-3 bg-[#16162a] rounded-xl p-3">
              <span className="text-2xl shrink-0">{getBranchEmoji(selectedChoice.program)}</span>
              <div>
                <p className="text-white font-semibold text-sm">{selectedChoice.program}</p>
                <p className="text-gray-500 text-xs mt-0.5">{selectedChoice.institute}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {rankInfo.nirf && <Badge text={`NIRF #${rankInfo.nirf}`} variant="blue" />}
              {rankInfo.typeRank && <Badge text={rankInfo.typeRank} variant="purple" />}
              {rankInfo.estd && <Badge text={`Est. ${rankInfo.estd}`} variant="green" />}
            </div>

            {/* Quick Info Section */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-2">Quick Info</h3>
              <div className="space-y-1.5">
                {quickInfoItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setExpandedInfo(expandedInfo === item.key ? null : item.key)}
                    className="w-full bg-[#16162a] rounded-lg p-3 text-left transition-all hover:bg-[#1e1e30] min-h-[44px]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.emoji}</span>
                        <span className="text-white text-sm font-medium">{item.label}</span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-4 h-4 text-gray-500 transition-transform ${expandedInfo === item.key ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    {expandedInfo === item.key && (
                      <p className="text-gray-400 text-xs mt-2 pl-7">{item.detail}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Avatars */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-2">Students who got this seat</h3>
              <div className="flex items-center gap-3">
                {students.map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img
                      src={`https://robohash.org/${encodeURIComponent(name)}?size=40x40&set=set4`}
                      alt={name}
                      className="w-8 h-8 rounded-full bg-[#16162a] border border-white/10"
                    />
                    <span className="text-gray-400 text-xs">{name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Query Q&A */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-2">Hot Query</h3>
              <div className="bg-[#16162a] rounded-xl p-3">
                <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                  {hotQueries.map((hq, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQueryIdx(i)}
                      className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-all min-h-[28px] ${
                        i === activeQueryIdx
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-white/5 text-gray-500 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      {hq.q}
                    </button>
                  ))}
                </div>
                <p className="text-purple-400 text-xs font-medium mb-1">{currentQuery.q}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentQuery.getAnswer(
                    selectedChoice.institute,
                    selectedChoice.program,
                    rankInfo.estd,
                    selectedChoice.cutoff
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  handleCloseModal();
                  router.push('/preferences');
                }}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors min-h-[48px]"
              >
                Add to Preferences
              </button>
              <button
                onClick={() => {
                  handleCloseModal();
                  router.push(`/cutoffs?q=${encodeURIComponent(selectedChoice.institute + ' ' + selectedChoice.program)}`);
                }}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors min-h-[48px]"
              >
                Ask AI about this
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
