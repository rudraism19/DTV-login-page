import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Phone, MapPin, Sparkles, ArrowLeft } from 'lucide-react';

interface SignUpProps {
  onSignInClick: () => void;
  onSignUpSuccess: (data: {
    fullName: string;
    email: string;
    mobileNumber: string;
    role: string;
    city: string;
  }) => void;
}

const ROLES = [
  'School Student',
  'Undergraduate',
  'Postgraduate',
  'Parent',
  'Career Counsellor',
  'Other',
];

export default function SignUp({ onSignInClick, onSignUpSuccess }: SignUpProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !mobileNumber || !role || !city || !password || !confirmPassword) {
      setError('Please fill in all fields to register.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    onSignUpSuccess({
      fullName,
      email,
      mobileNumber,
      role,
      city,
    });
  };

  return (
    <div className="w-full max-w-xl px-6 py-8 relative z-10 flex flex-col items-center animate-[fadeInScale_0.6s_ease-out_forwards]">
      {/* Logo Area */}
      <div className="mb-6 flex flex-col items-center text-center">
        <img
          id="dtv-logo-signup"
          alt="Digital Twin Verse"
          referrerPolicy="no-referrer"
          className="w-20 h-20 rounded-2xl object-cover shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-[#d4af37]/20 mb-4"
          src="https://lh3.googleusercontent.com/aida/AP1WRLulsIFEb3rpbjzyuQ_4Ev9v7vzOI3hqAGGJq_uAEQTk6bvEB-tYRH1EP88dU1MVIYE0fz6Q8MbiMrFZOx3n0pWnP2Qzb7SvCb6o10LR0IFskt94L_ybjg3Cz1CoXSYinB5NShcuwFjGjAK81CPR8A06EUh06gwxFp-SQ6TsJRkPwIjtxY-J3I3GT5xF2GS9IH02iCDnhoZtjAoC-UiwJOIAjG9-w18_9RbnlBBqdnCBOG3tiQ47T6UTCoTi"
        />
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 font-sans">
          Create Your Twin Profile
        </h1>
        <p className="text-xs text-[#cbc3d7] text-center max-w-sm">
          Initialize your academic digital twin. Your twin will model your skills, simulate pathways, and serve as your personalized study partner.
        </p>
      </div>

      {/* SignUp Card */}
      <div id="signup-card" className="glass-card w-full rounded-2xl p-6 md:p-8 backdrop-blur-xl bg-[#131314]/60 border border-[#d4af37]/15 shadow-2xl relative">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-2.5 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <UserIcon size={16} />
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="glass-input w-full rounded-lg py-2.5 pl-10 pr-3 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none"
                  placeholder="e.g. Alex Rivera"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="signup-email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <Mail size={16} />
                </span>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full rounded-lg py-2.5 pl-10 pr-3 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none"
                  placeholder="e.g. alex@university.edu"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <Phone size={16} />
                </span>
                <input
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="glass-input w-full rounded-lg py-2.5 pl-10 pr-3 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none"
                  placeholder="e.g. +1 (555) 019-2834"
                />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="city">
                City
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <MapPin size={16} />
                </span>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="glass-input w-full rounded-lg py-2.5 pl-10 pr-3 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none"
                  placeholder="e.g. San Francisco"
                />
              </div>
            </div>
          </div>

          {/* I am (Role) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="role">
              I am (Role)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                <Sparkles size={16} />
              </span>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`glass-input w-full rounded-lg py-2.5 pl-10 pr-8 bg-black/65 border border-white/10 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none appearance-none cursor-pointer ${
                  role === '' ? 'text-[#b4acc0]' : 'text-white'
                }`}
              >
                <option value="" disabled className="bg-[#191c1e] text-[#b4acc0]">
                  Select your role
                </option>
                {ROLES.map((roleOpt) => (
                  <option key={roleOpt} value={roleOpt} className="bg-[#191c1e] text-white">
                    {roleOpt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="signup-password">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <Lock size={16} />
                </span>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full rounded-lg py-2.5 pl-10 pr-3 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <Lock size={16} />
                </span>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="glass-input w-full rounded-lg py-2.5 pl-10 pr-3 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <button
            id="signup-submit-btn"
            type="submit"
            className="btn-primary w-full mt-4 py-3 rounded-lg text-[#101415] font-bold text-xs bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#e5c04c] hover:to-[#bc9d3d] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_10px_25px_-5px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            Instantiate My Twin
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 text-center relative z-10">
          <button
            id="back-to-signin-btn"
            onClick={onSignInClick}
            className="text-xs font-semibold text-[#cbc3d7] hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
