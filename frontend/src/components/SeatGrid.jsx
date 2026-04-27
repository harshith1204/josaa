'use client';

export default function SeatGrid({ assignments = {}, onSeatClick, lockedSeats = new Set() }) {
  const rows = 10;
  const cols = 10;

  const getSeatState = (seatNo) => {
    if (lockedSeats.has(seatNo)) return 'locked';
    if (assignments[seatNo]) return 'assigned';
    return 'available';
  };

  const stateStyles = {
    available: 'bg-[#16162a] border-white/10 text-gray-500 hover:border-purple-500/50 hover:text-gray-300 cursor-pointer',
    assigned: 'bg-green-500/20 border-green-500/40 text-green-400 cursor-pointer',
    locked: 'bg-orange-500/20 border-orange-500/40 text-orange-400 cursor-not-allowed',
  };

  return (
    <div>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: rows * cols }, (_, i) => {
          const seatNo = i + 1;
          const state = getSeatState(seatNo);

          return (
            <button
              key={seatNo}
              onClick={() => {
                if (state !== 'locked') onSeatClick?.(seatNo);
              }}
              disabled={state === 'locked'}
              className={`aspect-square rounded-md border text-[10px] sm:text-xs font-medium flex items-center justify-center transition-all ${stateStyles[state]}`}
              title={
                assignments[seatNo]
                  ? `#${seatNo}: ${assignments[seatNo]}`
                  : `Seat #${seatNo}`
              }
            >
              {seatNo}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#16162a] border border-white/10" />
          <span className="text-gray-500 text-[10px]">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/40" />
          <span className="text-gray-500 text-[10px]">Assigned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-orange-500/20 border border-orange-500/40" />
          <span className="text-gray-500 text-[10px]">Locked</span>
        </div>
      </div>
    </div>
  );
}
