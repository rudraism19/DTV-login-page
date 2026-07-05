import { useState, useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import { User, Skill, SyncSource } from './types';

const INITIAL_SKILLS: Skill[] = [
  { name: 'Coding Competence', level: 65, category: 'Technical', description: 'Syntax fluency, software design patterns, and algorithmic implementation.' },
  { name: 'Analytical Problem Solving', level: 70, category: 'Analytical', description: 'Deconstructing challenges and identifying optimal complexity models.' },
  { name: 'Practical Application', level: 55, category: 'Practical', description: 'System engineering, deployment, and workspace project engineering.' },
  { name: 'Mathematical Fundamentals', level: 60, category: 'Technical', description: 'Linear algebra, calculus coefficients, and statistics logic.' },
  { name: 'Collaborative Synergy', level: 75, category: 'Soft Skills', description: 'Productive teamwork, communication channels, and shared code reviews.' },
];

const INITIAL_SOURCES: SyncSource[] = [
  {
    id: 'github',
    name: 'GitHub Profile',
    icon: '🐙',
    connected: false,
    status: 'idle',
    metrics: ['Commits submitted', 'Active pull requests', 'Repository stars'],
  },
  {
    id: 'leetcode',
    name: 'LeetCode Solved Matrix',
    icon: '💻',
    connected: false,
    status: 'idle',
    metrics: ['Algorithms solved', 'Monthly coding streak', 'Contest percentile'],
  },
  {
    id: 'canvas',
    name: 'Canvas LMS Portal',
    icon: '🎓',
    connected: false,
    status: 'idle',
    metrics: ['Assessment average', 'Syllabus homework completed', 'Class attendance'],
  },
];

export default function App() {
  const [view, setView] = useState<'signin' | 'signup' | 'forgot' | 'dashboard'>('signin');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('dtv_student_session');
    if (savedSession) {
      try {
        setCurrentUser(JSON.parse(savedSession));
        setView('dashboard');
      } catch (err) {
        console.error('Failed to parse saved session', err);
      }
    }
  }, []);

  // Sync user state changes to session store
  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('dtv_student_session', JSON.stringify(updatedUser));
  };

  const handleSignInSuccess = (email: string) => {
    // Generate a default student profile matching the email or name prefix
    const namePrefix = email.split('@')[0];
    const fullName = namePrefix
      .split('.')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Alex Rivera';

    const defaultUser: User = {
      id: `std_${Date.now()}`,
      email,
      fullName,
      fieldOfStudy: 'Computer Science & AI',
      targetCareer: 'AI Research Scientist',
      skills: INITIAL_SKILLS,
      studyHours: 42,
      xp: 380,
      level: 1,
      syncSources: INITIAL_SOURCES,
    };

    handleUpdateUser(defaultUser);
    setView('dashboard');
  };

  const handleSignUpSuccess = (data: {
    fullName: string;
    email: string;
    mobileNumber: string;
    role: string;
    city: string;
  }) => {
    // Map selected role to fieldOfStudy and targetCareer to keep the dashboard context cohesive
    let fieldOfStudy = 'Computer Science & AI';
    let targetCareer = 'AI Software Engineer';

    if (data.role === 'School Student') {
      fieldOfStudy = 'General Science & Technology';
      targetCareer = 'Future Tech Innovator';
    } else if (data.role === 'Postgraduate') {
      fieldOfStudy = 'Data Science & Machine Learning';
      targetCareer = 'AI Research Scientist';
    } else if (data.role === 'Parent') {
      fieldOfStudy = 'Child Education & Developmental Coaching';
      targetCareer = 'Academic Development Mentor';
    } else if (data.role === 'Career Counsellor') {
      fieldOfStudy = 'Human Capital & Career Guidance';
      targetCareer = 'Strategic Career Architect';
    } else if (data.role === 'Other') {
      fieldOfStudy = 'Interdisciplinary Explorations';
      targetCareer = 'Self-Guided Tech Pioneer';
    }

    const newUser: User = {
      id: `std_${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      role: data.role,
      city: data.city,
      fieldOfStudy,
      targetCareer,
      skills: INITIAL_SKILLS.map(s => ({ ...s, level: Math.floor(Math.random() * 20) + 45 })), // randomized baseline
      studyHours: 0,
      xp: 0,
      level: 1,
      syncSources: INITIAL_SOURCES,
    };

    handleUpdateUser(newUser);
    setView('dashboard');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('dtv_student_session');
    setView('signin');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center selection:bg-[#d4af37] selection:text-[#101415] overflow-x-hidden text-white font-sans bg-[#101415]">
      {/* Interactive shader backdrop */}
      <ShaderBackground />

      {/* Main Container */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center items-center">
        {view === 'signin' && (
          <SignIn
            onSignUpClick={() => setView('signup')}
            onForgotPasswordClick={() => setView('forgot')}
            onSignInSuccess={handleSignInSuccess}
          />
        )}

        {view === 'signup' && (
          <SignUp
            onSignInClick={() => setView('signin')}
            onSignUpSuccess={handleSignUpSuccess}
          />
        )}

        {view === 'forgot' && (
          <ForgotPassword onSignInClick={() => setView('signin')} />
        )}

        {view === 'dashboard' && currentUser && (
          <Dashboard
            user={currentUser}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignOut}
          />
        )}
      </div>

      {/* Persistent platform footer */}
      <footer className="w-full text-center py-6 relative z-10 border-t border-white/5 bg-[#101415]/80 backdrop-blur-md">
        <p className="text-[10px] font-semibold text-[#cbc3d7]/50 uppercase tracking-widest leading-relaxed">
          © 2026 Eco-Novators. All rights reserved. Digital Twin Verse for Students™
        </p>
      </footer>
    </div>
  );
}
