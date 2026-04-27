'use client';
import Badge from './Badge';

export default function ComboCard({ combo, onPreview, onDownload }) {
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold">
            {combo.id}
          </span>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm leading-tight truncate">
              {combo.title}
            </h3>
            <p className="text-gray-400 text-xs mt-0.5 truncate">{combo.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 pb-3 space-y-2">
        {/* Branch Focus */}
        {combo.branchFocus && combo.branchFocus.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {combo.branchFocus.map((branch) => (
              <Badge key={branch} text={branch} variant="green" />
            ))}
          </div>
        )}
        {/* Blocked Branches */}
        {combo.blockedBranches && combo.blockedBranches.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {combo.blockedBranches.map((branch) => (
              <Badge key={branch} text={branch} variant="red" />
            ))}
          </div>
        )}
        {/* Location */}
        {combo.locationFocus && (
          <Badge text={combo.locationFocus} variant="blue" />
        )}
      </div>

      {/* Stats Grid */}
      {combo.stats && (
        <div className="grid grid-cols-3 border-t border-white/5 divide-x divide-white/5">
          <div className="py-2.5 px-3 text-center">
            <p className="text-purple-400 font-bold text-sm">{combo.stats.matchingSeats}</p>
            <p className="text-gray-500 text-[10px] mt-0.5">Seats</p>
          </div>
          <div className="py-2.5 px-3 text-center">
            <p className="text-blue-400 font-bold text-sm">{combo.stats.rankGap}</p>
            <p className="text-gray-500 text-[10px] mt-0.5">Rank Gap</p>
          </div>
          <div className="py-2.5 px-3 text-center">
            <p className="text-green-400 font-bold text-sm">{combo.stats.placement}</p>
            <p className="text-gray-500 text-[10px] mt-0.5">Placement</p>
          </div>
        </div>
      )}

      {/* Description */}
      {combo.description && (
        <div className="px-4 py-2.5 border-t border-white/5">
          <p className="text-gray-400 text-xs leading-relaxed">{combo.description}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex border-t border-white/5">
        <button
          onClick={() => onPreview?.(combo)}
          className="flex-1 py-2.5 text-center text-purple-400 text-xs font-medium hover:bg-purple-500/10 transition-colors"
        >
          Preview
        </button>
        <div className="w-px bg-white/5" />
        <button
          onClick={() => onDownload?.(combo)}
          className="flex-1 py-2.5 text-center text-blue-400 text-xs font-medium hover:bg-blue-500/10 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
