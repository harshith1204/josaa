'use client';

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function CollegeRow({ institute, bestCutoff, bestProgram, nirf, typeRank, estd, emoji, isFav, onToggleFav, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 text-left cursor-pointer"
    >
      {/* Time/Status badge */}
      <div className="shrink-0 w-14 text-center">
        {typeRank && (
          <span className="text-[10px] text-red-400 font-medium block">{typeRank}</span>
        )}
        {estd && (
          <span className="text-[10px] text-gray-500 block">{estd}</span>
        )}
      </div>

      {/* College info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-base shrink-0">{emoji || '🏛️'}</span>
          <p className="text-white text-sm font-medium truncate">{institute}</p>
        </div>
        <p className="text-gray-500 text-[11px] ml-7 truncate">{bestProgram}</p>
      </div>

      {/* Scores */}
      <div className="shrink-0 text-right flex items-center gap-3">
        <div>
          <p className="text-white font-bold text-base tabular-nums">{fmtNum(bestCutoff)}</p>
          {nirf && (
            <span className="text-[10px] text-blue-400">NIRF #{nirf}</span>
          )}
        </div>

        {/* Favorite star */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav?.(); }}
          className="text-gray-600 hover:text-yellow-400 transition-colors"
        >
          {isFav ? (
            <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}
