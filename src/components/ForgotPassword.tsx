import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  onSignInClick: () => void;
}

export default function ForgotPassword({ onSignInClick }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-md px-6 py-12 relative z-10 flex flex-col items-center animate-[fadeInScale_0.6s_ease-out_forwards]">
      {/* Logo Area */}
      <div className="mb-8 flex flex-col items-center text-center">
        <img
          id="dtv-logo-forgot"
          alt="Digital Twin Verse"
          referrerPolicy="no-referrer"
          className="w-24 h-24 rounded-2xl object-cover shadow-[0_0_35px_rgba(212,175,55,0.25)] border border-[#d4af37]/20 mb-6"
          src="https://lh3.googleusercontent.com/aida/AP1WRLulsIFEb3rpbjzyuQ_4Ev9v7vzOI3hqAGGJq_uAEQTk6bvEB-tYRH1EP88dU1MVIYE0fz6Q8MbiMrFZOx3n0pWnP2Qzb7SvCb6o10LR0IFskt94L_ybjg3Cz1CoXSYinB5NShcuwFjGjAK81CPR8A06EUh06gwxFp-SQ6TsJRkPwIjtxY-J3I3GT5xF2GS9IH02iCDnhoZtjAoC-UiwJOIAjG9-w18_9RbnlBBqdnCBOG3tiQ47T6UTCoTi"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3 font-sans">
          Restore Access
        </h1>
        <p className="text-sm text-[#cbc3d7] text-center leading-relaxed backdrop-blur-md bg-black/40 rounded-xl p-4 border border-white/5">
          Enter your registered email address below, and we will send a restoration signal to rebuild your twin's synaptic connections.
        </p>
      </div>

      {/* ForgotPassword Card */}
      <div id="forgot-password-card" className="glass-card w-full rounded-2xl p-8 backdrop-blur-xl bg-[#131314]/60 border border-[#d4af37]/15 shadow-2xl relative">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col relative z-10">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-3 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#cbc3d7] block" htmlFor="forgot-email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#958ea0]">
                  <Mail size={18} />
                </span>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full rounded-lg py-3 pl-12 pr-4 text-white bg-black/60 border border-white/10 placeholder-[#b4acc0] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-sm outline-none"
                  placeholder="Please enter your email."
                />
              </div>
            </div>

            <button
              id="reset-submit-btn"
              type="submit"
              className="btn-primary w-full mt-4 py-3.5 rounded-lg text-[#101415] font-bold text-sm bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#e5c04c] hover:to-[#bc9d3d] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              Send Recovery Signal
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4 relative z-10">
            <div className="w-12 h-12 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail size={24} className="animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">Quantum Signal Sent!</h3>
            <p className="text-xs text-[#cbc3d7] leading-relaxed">
              We have dispatched a session restoration link to <strong className="text-white">{email}</strong>. Please check your inbox (including the spam/quarantine node) within 5 minutes.
            </p>
            <button
              id="back-btn"
              onClick={() => setSubmitted(false)}
              className="text-xs text-[#d4af37] hover:underline"
            >
              Try a different email address
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
          <button
            id="forgot-back-to-signin-btn"
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
