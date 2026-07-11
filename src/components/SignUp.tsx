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

  const handleSocialSignUp = (provider: string) => {
    const profileMap: Record<string, { fullName: string; email: string; mobileNumber: string; role: string; city: string }> = {
      Google: {
        fullName: 'Google Explorer',
        email: 'google.explorer@digitaltwin.edu',
        mobileNumber: '+1 (555) 012-3456',
        role: 'School Student',
        city: 'Mountain View',
      },
      GitHub: {
        fullName: 'GitHub Developer',
        email: 'github.developer@digitaltwin.edu',
        mobileNumber: '+1 (555) 098-7654',
        role: 'Undergraduate',
        city: 'San Francisco',
      },
      Apple: {
        fullName: 'Apple Creator',
        email: 'apple.creator@digitaltwin.edu',
        mobileNumber: '+1 (555) 456-7890',
        role: 'Postgraduate',
        city: 'Cupertino',
      },
    };

    const profile = profileMap[provider] || {
      fullName: 'Social Student',
      email: 'social.student@digitaltwin.edu',
      mobileNumber: '+1 (555) 000-0000',
      role: 'Undergraduate',
      city: 'Silicon Valley',
    };

    onSignUpSuccess(profile);
  };

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
      {/* Back to Home button */}
      <button 
        onClick={() => window.location.href = '/index.html'}
        className="absolute top-2 left-6 flex items-center gap-1.5 text-xs font-semibold text-[#cbc3d7]/60 hover:text-[#d4af37] transition-colors cursor-pointer group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </button>

      {/* Logo Area */}
      <div className="mb-6 flex flex-col items-center text-center">
        <img
          id="dtv-logo-signup"
          alt="Digital Twin Verse"
          referrerPolicy="no-referrer"
          className="w-20 h-20 rounded-2xl object-cover shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-[#d4af37]/20 mb-4"
          src="https://digitaltwinvrs.com/img/dtv-logo.jpg"
        />
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 font-sans">
          Create Your DTV Profile
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
                className={`glass-input w-full rounded-lg py-2.5 pl-10 pr-8 bg-black/65 border border-white/10 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs outline-none appearance-none cursor-pointer ${role === '' ? 'text-[#b4acc0]' : 'text-white'
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
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
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

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center z-10 w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative px-3 text-[9px] font-extrabold text-[#cbc3d7]/50 uppercase tracking-widest bg-[#131314]/90">
            Or register with
          </span>
        </div>

        {/* Social Registration Grid */}
        <div className="grid grid-cols-3 gap-3 relative z-10 w-full mb-2">
          {/* Google Button */}
          <button
            id="google-signup-btn"
            type="button"
            onClick={() => handleSocialSignUp('Google')}
            className="flex items-center justify-center py-2 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
            title="Register with Google"
          >
            <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
          </button>

          {/* GitHub Button */}
          <button
            id="github-signup-btn"
            type="button"
            onClick={() => handleSocialSignUp('GitHub')}
            className="flex items-center justify-center py-2 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
            title="Register with GitHub"
          >
            <svg className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </button>

          {/* Apple Button */}
          <button
            id="apple-signup-btn"
            type="button"
            onClick={() => handleSocialSignUp('Apple')}
            className="flex items-center justify-center py-2 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
            title="Register with Apple"
          >
            <svg className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.58 2.98-1.41z" />
            </svg>
          </button>
        </div>

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
