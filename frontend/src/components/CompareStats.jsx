'use client';

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function StatRow({ label, valA, valB, lowerIsBetter = false }) {
  const numA = typeof valA === 'number' ? valA : 0;
  const numB = typeof valB === 'number' ? valB : 0;
  const total = numA + numB || 1;

  const aWins = lowerIsBetter ? numA < numB : numA > numB;
  const bWins = lowerIsBetter ? numB < numA : numB > numA;
  const tie = numA === numB;

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm font-bold tabular-nums ${aWins && !tie ? 'text-white' : 'text-gray-500'}`}>
          {typeof valA === 'number' ? fmtNum(valA) : valA}
        </span>
        <span className="text-gray-400 text-xs font-medium">{label}</span>
        <span className={`text-sm font-bold tabular-nums ${bWins && !tie ? 'text-white' : 'text-gray-500'}`}>
          {typeof valB === 'number' ? fmtNum(valB) : valB}
        </span>
      </div>
      {/* Bar */}
      <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden">
        <div
          className={`rounded-l-full transition-all ${aWins ? 'bg-blue-500' : tie ? 'bg-gray-600' : 'bg-blue-500/30'}`}
          style={{ width: `${(numA / total) * 100}%` }}
        />
        <div
          className={`rounded-r-full transition-all ${bWins ? 'bg-red-500' : tie ? 'bg-gray-600' : 'bg-red-500/30'}`}
          style={{ width: `${(numB / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function CompareStats({ statsA, statsB }) {
  if (!statsA || !statsB) return null;

  return (
    <div className="divide-y divide-white/5">
      <StatRow label="Best Cutoff" valA={statsA.bestCutoff} valB={statsB.bestCutoff} lowerIsBetter />
      <StatRow label="NIRF Rank" valA={statsA.nirf} valB={statsB.nirf} lowerIsBetter />
      <StatRow label="Established" valA={statsA.estd} valB={statsB.estd} lowerIsBetter />
      <StatRow label="Programs" valA={statsA.programs} valB={statsB.programs} />
      <StatRow label="Avg Cutoff" valA={statsA.avgCutoff} valB={statsB.avgCutoff} lowerIsBetter />
      <StatRow label="Top Branch Cutoff" valA={statsA.topCutoff} valB={statsB.topCutoff} lowerIsBetter />
    </div>
  );
}
