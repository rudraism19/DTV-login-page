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

  const handleSocialSignIn = (provider: string) => {
    const emailMap: Record<string, string> = {
      Google: 'google.student@digitaltwin.edu',
      GitHub: 'github.developer@digitaltwin.edu',
      Apple: 'apple.explorer@digitaltwin.edu',
    };
    onSignInSuccess(emailMap[provider] || 'social.student@digitaltwin.edu');
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

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative px-3 text-[10px] font-extrabold text-[#cbc3d7]/50 uppercase tracking-widest bg-[#131314]/90">
            Or continue with
          </span>
        </div>

        {/* Social Authentication Grid */}
        <div className="grid grid-cols-3 gap-3 relative z-10">
          {/* Google Button */}
          <button
            id="google-signin-btn"
            type="button"
            onClick={() => handleSocialSignIn('Google')}
            className="flex items-center justify-center py-2.5 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
            title="Sign in with Google"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
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
            id="github-signin-btn"
            type="button"
            onClick={() => handleSocialSignIn('GitHub')}
            className="flex items-center justify-center py-2.5 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
            title="Sign in with GitHub"
          >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </button>

          {/* Apple Button */}
          <button
            id="apple-signin-btn"
            type="button"
            onClick={() => handleSocialSignIn('Apple')}
            className="flex items-center justify-center py-2.5 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
            title="Sign in with Apple"
          >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.58 2.98-1.41z" />
            </svg>
          </button>
        </div>

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
