import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SignInProps {
  onSignUpClick: () => void;
  onForgotPasswordClick: () => void;
  onSignInSuccess: (email: string) => void;
}

export default function SignIn({ onSignUpClick, onForgotPasswordClick, onSignInSuccess }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    onSignInSuccess(email);
  };

  const handleDemoSignIn = () => {
    onSignInSuccess('student@digitaltwin.edu');
  };

  return (
    <div className="w-full max-w-md px-6 py-12 relative z-10 flex flex-col items-center animate-[fadeInScale_0.6s_ease-out_forwards]">
      {/* Logo Area */}
      <div className="mb-8 flex flex-col items-center text-center">
        <img
          id="dtv-logo"
          alt="Digital Twin Verse"
          referrerPolicy="no-referrer"
          className="w-24 h-24 rounded-2xl object-cover shadow-[0_0_35px_rgba(212,175,55,0.25)] border border-[#d4af37]/20 mb-6"
          src="https://lh3.googleusercontent.com/aida/AP1WRLulsIFEb3rpbjzyuQ_4Ev9v7vzOI3hqAGGJq_uAEQTk6bvEB-tYRH1EP88dU1MVIYE0fz6Q8MbiMrFZOx3n0pWnP2Qzb7SvCb6o10LR0IFskt94L_ybjg3Cz1CoXSYinB5NShcuwFjGjAK81CPR8A06EUh06gwxFp-SQ6TsJRkPwIjtxY-J3I3GT5xF2GS9IH02iCDnhoZtjAoC-UiwJOIAjG9-w18_9RbnlBBqdnCBOG3tiQ47T6UTCoTi"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3 font-sans">
          Sign In to Continue
        </h1>
        <p className="text-sm text-[#cbc3d7] text-center leading-relaxed backdrop-blur-md bg-black/40 rounded-xl p-4 border border-white/5 shadow-lg max-w-sm">
          Sign in first to unlock the student journey, continue your profile, and enter the main site. If you do not have an account yet, create one from this screen.
        </p>
      </div>

      {/* Login Card */}
      <div id="login-card" className="glass-card w-full rounded-2xl p-8 backdrop-blur-xl bg-[#131314]/60 border border-[#d4af37]/15 shadow-2xl relative">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-3 text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#cbc3d7] block" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#958ea0]">
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full rounded-lg py-3 pl-12 pr-4 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-sm outline-none"
                placeholder="Please enter a valid email."
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#cbc3d7]" htmlFor="password">
                Password
              </label>
              <button
                id="forgot-password-link"
                type="button"
                onClick={onForgotPasswordClick}
                className="text-xs font-semibold text-[#d4af37] hover:text-white transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#958ea0]">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full rounded-lg py-3 pl-12 pr-12 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-sm outline-none"
                placeholder="Please enter your password."
              />
              <button
                id="toggle-password-visibility"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#958ea0] hover:text-[#d4af37] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="relative flex items-center cursor-pointer select-none">
              <input
                id="remember-me-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-[#d4af37] border-[#d4af37]' : 'bg-black/60 border-white/10'}`}>
                {rememberMe && (
                  <svg className="w-3.5 h-3.5 text-[#101415] stroke-current stroke-3" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </label>
            <span className="text-xs font-semibold text-[#cbc3d7] select-none">Remember Me</span>
          </div>

          <button
            id="signin-submit-btn"
            type="submit"
            className="btn-primary w-full mt-4 py-3.5 rounded-lg text-[#101415] font-bold text-sm bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#e5c04c] hover:to-[#bc9d3d] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] relative overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 font-bold">Sign In</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
          </button>
        </form>

        {/* Demo login shortcut */}
        <div className="mt-4 text-center">
          <button
            id="demo-login-btn"
            type="button"
            onClick={handleDemoSignIn}
            className="text-[11px] font-semibold text-[#dbb8ff]/60 hover:text-[#dbb8ff] hover:underline transition-all cursor-pointer"
          >
          
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-white/10 text-center relative z-10">
          <p className="text-xs font-semibold text-[#cbc3d7]">
            Need an account?{' '}
            <button
              id="goto-signup-btn"
              onClick={onSignUpClick}
              className="text-[#d4af37] hover:text-white transition-colors ml-1 font-bold cursor-pointer"
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
