'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [rank, setRank] = useState('12450');
  const [category, setCategory] = useState('General');
  const [examType, setExamType] = useState('JEE Main');
  const [homeState, setHomeState] = useState('Tamil Nadu');
  const [signingOut, setSigningOut] = useState(false);

  // MFA state
  const [mfaFactors, setMfaFactors] = useState([]);
  const [mfaStep, setMfaStep] = useState(null); // null | 'enter_phone' | 'verify_otp'
  const [mfaPhone, setMfaPhone] = useState('');
  const [mfaOtp, setMfaOtp] = useState('');
  const [mfaEnrollData, setMfaEnrollData] = useState(null); // { factorId, challengeId }
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const [mfaSuccess, setMfaSuccess] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User');
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User');
      } else {
        setUser(null);
      }
    });
    loadMFAFactors();
    return () => subscription.unsubscribe();
  }, []);

  const loadMFAFactors = async () => {
    if (!isSupabaseConfigured()) return;
    const { data } = await supabase.auth.mfa.listFactors();
    if (data) setMfaFactors([...(data.phone || []), ...(data.totp || [])]);
  };

  const handleStartEnroll = async () => {
    setMfaError('');
    setMfaSuccess('');
    setMfaStep('enter_phone');
  };

  const handleSendOTP = async () => {
    if (!mfaPhone.trim()) { setMfaError('Enter a valid phone number.'); return; }
    setMfaLoading(true);
    setMfaError('');
    const phone = mfaPhone.startsWith('+') ? mfaPhone : `+91${mfaPhone}`;
    const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: 'phone',
      phone,
    });
    if (enrollError) { setMfaError(enrollError.message); setMfaLoading(false); return; }
    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: enrollData.id,
    });
    if (challengeError) { setMfaError(challengeError.message); setMfaLoading(false); return; }
    setMfaEnrollData({ factorId: enrollData.id, challengeId: challengeData.id });
    setMfaStep('verify_otp');
    setMfaLoading(false);
  };

  const handleVerifyEnroll = async () => {
    if (!mfaOtp.trim()) return;
    setMfaLoading(true);
    setMfaError('');
    const { error } = await supabase.auth.mfa.verify({
      factorId: mfaEnrollData.factorId,
      challengeId: mfaEnrollData.challengeId,
      code: mfaOtp.trim(),
    });
    if (error) { setMfaError(error.message); setMfaLoading(false); return; }
    setMfaSuccess('Phone 2FA enabled successfully.');
    setMfaStep(null);
    setMfaPhone('');
    setMfaOtp('');
    setMfaEnrollData(null);
    setMfaLoading(false);
    loadMFAFactors();
  };

  const handleRemoveFactor = async (factorId) => {
    setMfaLoading(true);
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    if (error) { setMfaError(error.message); }
    else { setMfaSuccess('2FA removed.'); loadMFAFactors(); }
    setMfaLoading(false);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="px-4 pt-6 pb-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <img
              src={
                user?.user_metadata?.avatar_url ||
                `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=80x80`
              }
              alt="Avatar"
              className="w-20 h-20 rounded-2xl bg-[#16162a] border border-white/10 object-cover"
            />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white text-xl font-bold bg-transparent outline-none border-b border-transparent focus:border-purple-500/50 w-full transition-colors"
              />
              {user?.email && (
                <p className="text-gray-500 text-xs mt-0.5 truncate">{user.email}</p>
              )}
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
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-gray-400 text-sm">Rank</span>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="bg-[#16162a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 w-28 text-right"
            />
          </div>
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
      <div className="px-4 pb-6">
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

      {/* Two-Factor Authentication */}
      <div className="px-4 pb-6">
        <h2 className="text-white font-semibold text-base mb-3">Two-Factor Authentication</h2>
        <div className="bg-[#13131a] border border-white/5 rounded-2xl p-4">
          {mfaFactors.length > 0 ? (
            <div className="space-y-3">
              {mfaFactors.map((factor) => (
                <div key={factor.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Phone {factor.factorType === 'phone' ? 'OTP' : 'Authenticator'}</p>
                      <p className="text-gray-500 text-[10px]">{factor.phone ? `••••••${factor.phone.slice(-4)}` : 'Active'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFactor(factor.id)}
                    disabled={mfaLoading}
                    className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {mfaSuccess && <p className="text-green-400 text-xs mt-2">{mfaSuccess}</p>}
              {mfaError && <p className="text-red-400 text-xs mt-2">{mfaError}</p>}
            </div>
          ) : mfaStep === null ? (
            <div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Not enabled</p>
                  <p className="text-gray-500 text-xs mt-0.5">Add your phone number to receive OTP codes when signing in.</p>
                </div>
              </div>
              {mfaError && <p className="text-red-400 text-xs mb-3">{mfaError}</p>}
              <button
                onClick={handleStartEnroll}
                className="w-full py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
              >
                Enable Phone 2FA
              </button>
            </div>
          ) : mfaStep === 'enter_phone' ? (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">Enter your mobile number to receive OTP codes.</p>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-[#16162a] border border-white/10 rounded-lg text-gray-400 text-sm font-mono flex-shrink-0">+91</div>
                <input
                  type="tel"
                  value={mfaPhone}
                  onChange={(e) => setMfaPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className="flex-1 bg-[#16162a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
              {mfaError && <p className="text-red-400 text-xs">{mfaError}</p>}
              <div className="flex gap-2">
                <button onClick={() => { setMfaStep(null); setMfaError(''); }} className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors">Cancel</button>
                <button onClick={handleSendOTP} disabled={mfaLoading || mfaPhone.length < 10} className="flex-1 py-2.5 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/30 transition-colors disabled:opacity-50">
                  {mfaLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">Enter the 6-digit code sent to <span className="text-white font-mono">+91 {mfaPhone}</span></p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={mfaOtp}
                onChange={(e) => setMfaOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full bg-[#16162a] border border-white/10 rounded-lg px-3 py-2.5 text-xl text-white text-center tracking-widest font-mono outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              {mfaError && <p className="text-red-400 text-xs">{mfaError}</p>}
              <div className="flex gap-2">
                <button onClick={() => { setMfaStep('enter_phone'); setMfaOtp(''); setMfaError(''); }} className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors">Back</button>
                <button onClick={handleVerifyEnroll} disabled={mfaLoading || mfaOtp.length < 6} className="flex-1 py-2.5 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors disabled:opacity-50">
                  {mfaLoading ? 'Verifying...' : 'Verify & Enable'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sign Out */}
      <div className="px-4 pb-8">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          {signingOut ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
