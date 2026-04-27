'use client';
import { formatInstituteRank, getBranchEmoji } from '@/data/colleges';

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function CollegeCard({ choice, onClick }) {
  const { no, institute, program, cutoff } = choice;
  const rankInfo = formatInstituteRank(institute);
  const emoji = getBranchEmoji(program);

  // Generate a gradient based on the choice number
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
  const gradient = gradients[no % gradients.length];

  // Get institute initials
  const initials = institute
    .split(/[\s,]+/)
    .filter((w) => w.length > 1 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 3)
    .join('');

  return (
    <div
      onClick={() => onClick?.(choice)}
      className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer group"
    >
      {/* Gradient header */}
      <div className={`bg-gradient-to-r ${gradient} p-3 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-white/80 text-[10px] font-medium">Choice #{no}</span>
          <p className="text-white font-semibold text-sm truncate">{institute}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2.5">
        {/* Program */}
        <div className="flex items-start gap-2">
          <span className="text-lg shrink-0">{emoji}</span>
          <p className="text-gray-300 text-sm leading-snug">{program}</p>
        </div>

        {/* Cutoff & NIRF */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-[10px]">Cutoff Rank</p>
            <p className="text-white font-bold text-lg">{fmtNum(cutoff)}</p>
          </div>
          <div className="text-right space-y-0.5">
            {rankInfo.nirf && (
              <span className="inline-block bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-2 py-0.5 text-[10px] font-medium">
                NIRF #{rankInfo.nirf}
              </span>
            )}
            {rankInfo.typeRank && (
              <span className="block bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full px-2 py-0.5 text-[10px] font-medium">
                {rankInfo.typeRank}
              </span>
            )}
          </div>
        </div>

        {/* Established */}
        {rankInfo.estd && (
          <p className="text-gray-600 text-[10px]">Est. {rankInfo.estd}</p>
        )}
      </div>
    </div>
  );
}
