'use client';

import { useState } from 'react';
import { studentNames } from '@/data/students';

const savedPrefs = [
  { id: 1, name: 'Aggressive CSE Top NITs', date: '2025-06-15', combos: 12 },
  { id: 2, name: 'Safe Bet Mid NITs', date: '2025-06-14', combos: 8 },
  { id: 3, name: 'South India Focus', date: '2025-06-12', combos: 15 },
];

const institutes = [
  'NIT Tiruchirappalli', 'NIT Karnataka, Surathkal', 'NIT Rourkela',
  'NIT Warangal', 'NIT Calicut', 'VNIT Nagpur', 'MNIT Jaipur',
  'NIT Silchar', 'NIT Durgapur', 'NIT Delhi', 'IIIT Allahabad',
  'IIITM Gwalior', 'NIT Kurukshetra', 'NIT Jalandhar', 'SVNIT Surat',
];

export default function ProfilePage() {
  const [name, setName] = useState('Aarav Kumar');
  const [rank, setRank] = useState('12450');
  const [category, setCategory] = useState('General');
  const [examType, setExamType] = useState('JEE Main');
  const [homeState, setHomeState] = useState('Tamil Nadu');

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="px-4 pt-6 pb-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <img
              src={`https://robohash.org/${encodeURIComponent(name)}?set=set4&size=80x80`}
              alt="Avatar"
              className="w-20 h-20 rounded-2xl bg-[#16162a] border border-white/10"
            />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white text-xl font-bold bg-transparent outline-none border-b border-transparent focus:border-purple-500/50 w-full transition-colors"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  Rank: {Number(rank).toLocaleString()}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {category}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  {examType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-4 pb-6">
        <h2 className="text-white font-semibold text-base mb-3">Settings</h2>
        <div className="bg-[#13131a] border border-white/5 rounded-2xl divide-y divide-white/5">
          {/* Exam Type */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-gray-400 text-sm">Exam Type</span>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="bg-[#16162a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
            </select>
          </div>
          {/* Category */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-gray-400 text-sm">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#16162a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="General">General</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>
          {/* Rank */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-gray-400 text-sm">Rank</span>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="bg-[#16162a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 w-28 text-right"
            />
          </div>
          {/* Home State */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-gray-400 text-sm">Home State</span>
            <input
              type="text"
              value={homeState}
              onChange={(e) => setHomeState(e.target.value)}
              className="bg-[#16162a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 w-36 text-right"
            />
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="px-4 pb-6">
        <h2 className="text-white font-semibold text-base mb-3">Your Network</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {studentNames.slice(0, 12).map((friendName, i) => (
            <div
              key={i}
              className="bg-[#13131a] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center hover:border-purple-500/20 transition-all"
            >
              <img
                src={`https://robohash.org/${encodeURIComponent(friendName)}?set=set4&size=48x48`}
                alt={friendName}
                className="w-12 h-12 rounded-full bg-[#16162a] border border-white/10 mb-2"
              />
              <p className="text-white text-xs font-medium truncate w-full">{friendName}</p>
              <p className="text-gray-500 text-[10px] truncate w-full mt-0.5">
                {institutes[i % institutes.length]}
              </p>
              <button className="mt-2 w-full bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg py-1.5 text-[10px] font-medium hover:bg-purple-600/30 transition-colors">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Preferences */}
      <div className="px-4 pb-8">
        <h2 className="text-white font-semibold text-base mb-3">Saved Preferences</h2>
        <div className="space-y-2">
          {savedPrefs.map((pref) => (
            <div
              key={pref.id}
              className="bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between hover:border-purple-500/20 transition-all"
            >
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">{pref.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500 text-[10px]">{pref.date}</span>
                  <span className="text-gray-600 text-[10px]">|</span>
                  <span className="text-purple-400 text-[10px]">{pref.combos} combos</span>
                </div>
              </div>
              <div className="flex gap-2 ml-3">
                <button className="text-gray-500 hover:text-blue-400 transition-colors p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-red-400 transition-colors p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
