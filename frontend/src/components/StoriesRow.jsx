'use client';

export default function StoriesRow({ stories = [], onStoryClick }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {stories.map((story, index) => (
        <button
          key={index}
          onClick={() => onStoryClick?.(index)}
          className="flex flex-col items-center gap-1 shrink-0"
        >
          {/* Gradient ring */}
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
            <div className="w-full h-full rounded-full bg-[#0d0d1a] flex items-center justify-center text-2xl">
              {story.emoji}
            </div>
          </div>
          {/* Label */}
          <span className="text-[10px] text-gray-400 font-medium max-w-[64px] truncate text-center">
            {story.abbr || story.name}
          </span>
        </button>
      ))}
    </div>
  );
}
