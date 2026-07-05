import React, { useState, useEffect, useRef } from 'react';
import { 
  User as UserIcon, BookOpen, Briefcase, Flame, Award, Clock, Sparkles, 
  Send, RefreshCw, BarChart2, Zap, Brain, LogOut, CheckCircle2, ChevronRight, Play, AlertCircle,
  Phone, MapPin
} from 'lucide-react';
import { User, Skill, ChatMessage, SyncSource } from '../types';

interface DashboardProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onSignOut: () => void;
}

export default function Dashboard({ user, onUpdateUser, onSignOut }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'hub' | 'ai' | 'sim' | 'sync'>('hub');
  
  // Tab 1: Synaptic Simulation State
  const [selectedSkillForSim, setSelectedSkillForSim] = useState<string>('');
  const [simHours, setSimHours] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStatus, setSimStatus] = useState<string>('');
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  
  // Tab 2: Gemini Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello ${user.fullName}! I am your Digital Twin AI Advisor. I have synchronized with your current major in **${user.fieldOfStudy}** and target career path of **${user.targetCareer}**.\n\nI can analyze your current skills twin, propose a custom syllabus to level up your weakest attributes, or simulate interactive quiz questions! What would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Tab 3: Simulation Lab Predictor States
  const [simulatedExtraStudy, setSimulatedExtraStudy] = useState<number>(0);

  // Tab 4: Sync Sources Progress States
  const [syncingSourceId, setSyncingSourceId] = useState<string | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  // Set default skill to focus on
  useEffect(() => {
    if (user.skills.length > 0 && !selectedSkillForSim) {
      setSelectedSkillForSim(user.skills[0].name);
    }
  }, [user.skills, selectedSkillForSim]);

  // 1. Study Simulator Logic
  const handleSynapticSimulation = async () => {
    if (!selectedSkillForSim || isSimulating) return;
    setIsSimulating(true);
    setSimulationLogs([]);
    
    const logs = [
      `Initializing neural interface for [${selectedSkillForSim}]...`,
      `Mapping cognitive baseline for ${user.fullName}...`,
      `Injecting study vectors for ${simHours} simulated hours...`,
      `Recalibrating academic neural pathways...`,
      `Synaptic twin state successfully updated!`
    ];

    for (let i = 0; i < logs.length; i++) {
      setSimStatus(logs[i]);
      setSimulationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[i]}`]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Update user state (increment hours, XP, and target skill level)
    const xpGained = simHours * 25;
    const skillIncrease = Math.min(10, Math.ceil(simHours * 1.5));
    
    const updatedSkills = user.skills.map(s => {
      if (s.name === selectedSkillForSim) {
        return { ...s, level: Math.min(100, s.level + skillIncrease) };
      }
      return s;
    });

    const newXp = user.xp + xpGained;
    const newLevel = Math.floor(newXp / 500) + 1;
    const didLevelUp = newLevel > user.level;

    const updatedUser: User = {
      ...user,
      skills: updatedSkills,
      studyHours: user.studyHours + simHours,
      xp: newXp,
      level: newLevel,
    };

    onUpdateUser(updatedUser);
    setIsSimulating(false);
    setSimStatus(`Completed! Gained +${xpGained} XP & +${skillIncrease} to ${selectedSkillForSim}!`);
    if (didLevelUp) {
      setSimulationLogs(prev => [...prev, `🎉 LEVEL UP! You are now Level ${newLevel}!`]);
    }
  };

  // 2. Chat with Gemini Server Endpoint
  const handleSendMessage = async (e?: React.FormEvent, presetPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = presetPrompt || userInput;
    if (!promptToSend.trim() || isChatLoading) return;

    const userMsgId = Date.now().toString();
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!presetPrompt) setUserInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          studentProfile: {
            fullName: user.fullName,
            fieldOfStudy: user.fieldOfStudy,
            targetCareer: user.targetCareer,
            level: user.level,
            xp: user.xp,
            studyHours: user.studyHours,
            skills: user.skills,
          },
          chatHistory: chatMessages.slice(-8).map(m => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Signal interface interrupted.');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text || 'My logic buffers timed out. Please try sending your study request again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: '⚠️ **Reconnection Error:** Failed to interface with Gemini. Make sure your server development workspace is running and your GEMINI_API_KEY is configured in the Secrets manager.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // 3. Connect & Sync Terminal Logic
  const handleToggleConnect = (id: string) => {
    const updatedSources = user.syncSources.map(src => {
      if (src.id === id) {
        const nextConnected = !src.connected;
        return {
          ...src,
          connected: nextConnected,
          status: nextConnected ? 'synced' as const : 'idle' as const,
          lastSynced: nextConnected ? new Date().toLocaleDateString() : undefined,
        };
      }
      return src;
    });
    onUpdateUser({ ...user, syncSources: updatedSources });
  };

  const handleSyncNow = async (id: string) => {
    if (syncingSourceId) return;
    setSyncingSourceId(id);

    const updatedSourcesProgress = user.syncSources.map(src => {
      if (src.id === id) return { ...src, status: 'syncing' as const };
      return src;
    });
    onUpdateUser({ ...user, syncSources: updatedSourcesProgress });

    // Simulate network sync latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate which skill gains points based on source type
    const source = user.syncSources.find(s => s.id === id);
    const updatedSkills = [...user.skills];
    let XP_GAINED = 150;
    let logMessage = '';

    if (id === 'github') {
      // Level up Coding + Practical
      updatedSkills[0].level = Math.min(100, updatedSkills[0].level + 8);
      updatedSkills[2].level = Math.min(100, updatedSkills[2].level + 6);
      logMessage = 'Synced 14 commits. +8 coding competence, +6 practical application.';
    } else if (id === 'leetcode') {
      // Level up Problem Solving
      updatedSkills[1].level = Math.min(100, updatedSkills[1].level + 12);
      logMessage = 'Synced 6 algorithms. +12 analytical problem solving.';
    } else if (id === 'canvas') {
      // Level up Mathematics
      updatedSkills[3].level = Math.min(100, updatedSkills[3].level + 10);
      logMessage = 'Synced 2 module assessments. +10 mathematical fundamentals.';
    }

    const newXp = user.xp + XP_GAINED;
    const newLevel = Math.floor(newXp / 500) + 1;

    const finalSources = user.syncSources.map(src => {
      if (src.id === id) {
        return {
          ...src,
          connected: true,
          status: 'synced' as const,
          lastSynced: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      return src;
    });

    onUpdateUser({
      ...user,
      skills: updatedSkills,
      xp: newXp,
      level: newLevel,
      syncSources: finalSources,
    });
    setSyncingSourceId(null);
  };

  // Helper values for calculations
  const calculateCareerReadiness = () => {
    const avgSkill = user.skills.reduce((acc, curr) => acc + curr.level, 0) / user.skills.length;
    // Career readiness is influenced by level and skills
    const readiness = Math.min(100, Math.round(avgSkill * 0.8 + user.level * 3));
    return readiness;
  };

  const calculatePredictedExamScore = () => {
    // Math + Analytical + Study hours influence exam grades
    const mathLvl = user.skills[3]?.level || 50;
    const analyticalLvl = user.skills[1]?.level || 50;
    const totalHours = user.studyHours + simulatedExtraStudy;
    const hoursFactor = Math.min(15, totalHours * 0.25);
    const score = Math.min(100, Math.round((mathLvl * 0.4 + analyticalLvl * 0.4) + hoursFactor + 10));
    return score;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10 relative z-10 flex flex-col h-full min-h-[90vh] animate-[fadeInScale_0.6s_ease-out_forwards]">
      {/* Header Panel */}
      <header id="dashboard-header" className="glass-card rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl border border-[#d4af37]/15">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Pulsing Avatar Halo representing Digital Twin energy */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#dbb8ff] opacity-40 blur-md animate-pulse"></div>
            <div className="relative w-16 h-16 rounded-full bg-[#131314] border-2 border-[#d4af37] flex items-center justify-center overflow-hidden">
              <Brain size={32} className="text-[#d4af37] animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#131314] flex items-center justify-center" title="Twin Online Sync Status">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-sans">{user.fullName}</h2>
              <span className="text-[10px] bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] px-2 py-0.5 rounded-full font-semibold">
                Level {user.level}
              </span>
            </div>
            <p className="text-xs text-[#cbc3d7] flex items-center gap-1.5 mt-1">
              <BookOpen size={12} className="text-[#dbb8ff]" /> {user.fieldOfStudy} {user.role && `(${user.role})`}
            </p>
            <p className="text-[11px] text-[#cbc3d7]/70 flex items-center gap-1.5 mt-0.5">
              <Briefcase size={12} className="text-[#d4af37]" /> Target: {user.targetCareer}
            </p>
            {(user.city || user.mobileNumber) && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 pt-1.5 border-t border-white/5">
                {user.city && (
                  <span className="text-[10px] text-[#cbc3d7]/60 flex items-center gap-1">
                    <MapPin size={10} className="text-emerald-400" /> {user.city}
                  </span>
                )}
                {user.mobileNumber && (
                  <span className="text-[10px] text-[#cbc3d7]/60 flex items-center gap-1">
                    <Phone size={10} className="text-[#dbb8ff]" /> {user.mobileNumber}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sync metrics strip */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-black/30 px-6 py-3 rounded-xl border border-white/5">
          <div className="text-center">
            <div className="text-xs text-[#cbc3d7]/60 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
              <Clock size={12} className="text-[#d4af37]" /> Active Hours
            </div>
            <div className="text-lg font-bold text-[#d4af37] font-mono mt-0.5">{user.studyHours}h</div>
          </div>
          <div className="w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="text-center">
            <div className="text-xs text-[#cbc3d7]/60 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
              <Flame size={12} className="text-orange-400" /> Twin XP
            </div>
            <div className="text-lg font-bold text-white font-mono mt-0.5">{user.xp} <span className="text-xs text-[#cbc3d7]/40">/ {user.level * 500}</span></div>
          </div>
          <div className="w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="text-center">
            <div className="text-xs text-[#cbc3d7]/60 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
              <Award size={12} className="text-[#dbb8ff]" /> Readiness Index
            </div>
            <div className="text-lg font-bold text-[#dbb8ff] font-mono mt-0.5">{calculateCareerReadiness()}%</div>
          </div>
        </div>

        {/* Control area */}
        <button
          id="sign-out-btn"
          onClick={onSignOut}
          className="text-[#958ea0] hover:text-[#d4af37] transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-xs font-semibold"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      {/* Main Workspace Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        {/* Navigation Sidebar (3 Cols) */}
        <nav className="lg:col-span-3 flex lg:flex-col gap-2 bg-[#131314]/40 border border-[#d4af37]/10 p-3 rounded-2xl backdrop-blur-xl h-fit overflow-x-auto whitespace-nowrap">
          <button
            id="tab-hub"
            onClick={() => setActiveTab('hub')}
            className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${activeTab === 'hub' ? 'bg-[#d4af37]/10 text-white font-bold border-l-2 border-[#d4af37]' : 'text-[#cbc3d7]/70 hover:text-white hover:bg-white/5'}`}
          >
            <Brain size={18} className={activeTab === 'hub' ? 'text-[#d4af37]' : 'text-[#958ea0]'} />
            <span className="text-xs">Twin Hub & Training</span>
          </button>
          <button
            id="tab-ai"
            onClick={() => setActiveTab('ai')}
            className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${activeTab === 'ai' ? 'bg-[#d4af37]/10 text-white font-bold border-l-2 border-[#d4af37]' : 'text-[#cbc3d7]/70 hover:text-white hover:bg-white/5'}`}
          >
            <Sparkles size={18} className={activeTab === 'ai' ? 'text-[#d4af37]' : 'text-[#958ea0]'} />
            <span className="text-xs">AI Twin Mentor (Gemini)</span>
          </button>
          <button
            id="tab-sim"
            onClick={() => setActiveTab('sim')}
            className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${activeTab === 'sim' ? 'bg-[#d4af37]/10 text-white font-bold border-l-2 border-[#d4af37]' : 'text-[#cbc3d7]/70 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart2 size={18} className={activeTab === 'sim' ? 'text-[#d4af37]' : 'text-[#958ea0]'} />
            <span className="text-xs">Simulation Lab</span>
          </button>
          <button
            id="tab-sync"
            onClick={() => setActiveTab('sync')}
            className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${activeTab === 'sync' ? 'bg-[#d4af37]/10 text-white font-bold border-l-2 border-[#d4af37]' : 'text-[#cbc3d7]/70 hover:text-white hover:bg-white/5'}`}
          >
            <RefreshCw size={18} className={activeTab === 'sync' ? 'text-[#d4af37]' : 'text-[#958ea0]'} />
            <span className="text-xs">External Data Sync</span>
          </button>
        </nav>

        {/* Content Panel (9 Cols) */}
        <main className="lg:col-span-9 flex flex-col">
          
          {/* TAB 1: TWIN HUB & SIMULATOR */}
          {activeTab === 'hub' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Left Column: Skill Twin Radar Chart Model */}
              <div id="skills-visualization-card" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Brain size={18} className="text-[#d4af37]" /> Synaptic Skills Twin
                  </h3>
                  <p className="text-[11px] text-[#cbc3d7]/60">
                    Real-time modeling of your academic capabilities and competencies.
                  </p>
                </div>

                {/* Custom Interactive SVG Skill Radar Visualizer */}
                <div className="flex-grow flex items-center justify-center min-h-[220px] relative">
                  <svg viewBox="0 0 300 300" className="w-full max-w-[260px] h-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    {/* Concentric grid rings */}
                    <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                    <circle cx="150" cy="150" r="90" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                    <circle cx="150" cy="150" r="60" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                    <circle cx="150" cy="150" r="30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                    
                    {/* Axes lines */}
                    {user.skills.map((_, index) => {
                      const angle = (index * 2 * Math.PI) / user.skills.length - Math.PI / 2;
                      const x = 150 + 120 * Math.cos(angle);
                      const y = 150 + 120 * Math.sin(angle);
                      return (
                        <line key={index} x1="150" y1="150" x2={x} y2={y} stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
                      );
                    })}

                    {/* Skill points polygon */}
                    <polygon
                      points={user.skills.map((skill, index) => {
                        const angle = (index * 2 * Math.PI) / user.skills.length - Math.PI / 2;
                        const distance = (skill.level / 100) * 120;
                        const x = 150 + distance * Math.cos(angle);
                        const y = 150 + distance * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="rgba(212, 175, 55, 0.15)"
                      stroke="#d4af37"
                      strokeWidth="2"
                    />

                    {/* Outer vertex markers and text */}
                    {user.skills.map((skill, index) => {
                      const angle = (index * 2 * Math.PI) / user.skills.length - Math.PI / 2;
                      const textDistance = 135;
                      const tx = 150 + textDistance * Math.cos(angle);
                      const ty = 150 + textDistance * Math.sin(angle);
                      
                      const vertexDistance = (skill.level / 100) * 120;
                      const vx = 150 + vertexDistance * Math.cos(angle);
                      const vy = 150 + vertexDistance * Math.sin(angle);

                      return (
                        <g key={index}>
                          <circle cx={vx} cy={vy} r="4" className="fill-[#d4af37] stroke-black stroke-2 shadow-lg" />
                          <text
                            x={tx}
                            y={ty}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-[#cbc3d7] font-semibold text-[10px] font-sans"
                          >
                            {skill.name} ({skill.level})
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Direct Skills list */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
                  {user.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      onClick={() => setSelectedSkillForSim(skill.name)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer text-left ${selectedSkillForSim === skill.name ? 'bg-[#d4af37]/10 border-[#d4af37]/30' : 'bg-black/25 border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-white truncate max-w-[80px]">{skill.name}</span>
                        <span className="text-[#d4af37] font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-[#d4af37] h-1" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Synaptic Study Simulator */}
              <div id="twin-training-card" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Zap size={18} className="text-[#d4af37]" /> Synaptic Simulation Training
                    </h3>
                    <p className="text-[11px] text-[#cbc3d7]/60">
                      Model cognitive study hours and simulate immediate skill twin growth.
                    </p>
                  </div>

                  {/* Skill selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]">Focus Skill Area</label>
                    <select
                      id="sim-skill-select"
                      value={selectedSkillForSim}
                      onChange={(e) => setSelectedSkillForSim(e.target.value)}
                      className="glass-input w-full rounded-lg py-2.5 px-3 text-white bg-black/60 border border-white/10 text-xs outline-none cursor-pointer"
                    >
                      {user.skills.map((skill) => (
                        <option key={skill.name} value={skill.name} className="bg-[#191c1e] text-white">
                          {skill.name} ({skill.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hours slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]">
                      <span>Study Simulation Duration</span>
                      <span className="text-[#d4af37] font-mono">{simHours} Hours</span>
                    </div>
                    <input
                      id="sim-hours-slider"
                      type="range"
                      min="1"
                      max="12"
                      value={simHours}
                      onChange={(e) => setSimHours(parseInt(e.target.value))}
                      className="w-full accent-[#d4af37] h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-[#cbc3d7]/40 font-mono">
                      <span>1h (Micro-Session)</span>
                      <span>12h (Exam Cram)</span>
                    </div>
                  </div>

                  {/* Execution button */}
                  <button
                    id="trigger-simulation-btn"
                    onClick={handleSynapticSimulation}
                    disabled={isSimulating}
                    className="btn-primary w-full py-3 rounded-lg text-[#101415] font-bold text-xs bg-[#d4af37] hover:bg-[#e5c04c] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Simulating Path...</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" />
                        <span>Initiate Synaptic Simulation</span>
                      </>
                    )}
                  </button>

                  {/* Dynamic simulator visual log terminal */}
                  <div className="space-y-1.5 flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7] flex justify-between items-center">
                      <span>Simulation Output Terminal</span>
                      {isSimulating && <span className="text-[8px] text-[#d4af37] animate-pulse">● TRANSDUCING ACTIVE</span>}
                    </div>
                    <div className="bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-[10px] text-[#cbc3d7] h-[130px] overflow-y-auto space-y-1">
                      {simulationLogs.length === 0 ? (
                        <div className="text-[#958ea0] italic text-center pt-8">Terminal idling. Initiate a synaptic simulation to inspect neural telemetry logs...</div>
                      ) : (
                        simulationLogs.map((log, i) => (
                          <div key={i} className={log.includes('🎉') ? 'text-[#d4af37] font-bold' : ''}>{log}</div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {simStatus && !isSimulating && (
                  <div className="mt-2 bg-green-500/10 border border-green-500/20 rounded-lg p-2 flex items-center gap-2 text-[10px] text-green-400">
                    <CheckCircle2 size={12} />
                    <span>{simStatus}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI TWIN ADVISOR (GEMINI CHAT) */}
          {activeTab === 'ai' && (
            <div id="ai-advisor-workspace" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15 flex flex-col h-[600px] justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#d4af37]" /> Gemini-Powered AI Twin Brain
                </h3>
                <p className="text-[11px] text-[#cbc3d7]/60">
                  Direct cognitive neural chat with your Twin's LLM core. Ask for tailored curricula or career gap analysis.
                </p>
              </div>

              {/* Chat log */}
              <div className="flex-grow my-4 bg-black/40 border border-white/5 rounded-xl p-4 overflow-y-auto max-h-[380px] space-y-4">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div className={`text-[9px] font-semibold mb-1 uppercase tracking-wider ${msg.role === 'user' ? 'text-[#cbc3d7]/60' : 'text-[#d4af37]'}`}>
                      {msg.role === 'user' ? 'Alex (Student)' : 'AI Twin Mentor'}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-[#d4af37] text-black font-medium rounded-tr-none' : 'bg-white/5 text-[#e0e3e5] border border-white/5 rounded-tl-none'}`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className="text-[8px] text-[#cbc3d7]/30 mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex flex-col max-w-[80%] mr-auto items-start">
                    <div className="text-[9px] font-semibold mb-1 uppercase tracking-wider text-[#d4af37]">
                      AI Twin Mentor
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 text-xs text-[#cbc3d7]">
                      <RefreshCw size={14} className="animate-spin text-[#d4af37]" />
                      <span>Synthesizing cognitive response...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Preset prompt helper chips */}
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendMessage(undefined, "Conduct a detailed skills gap analysis for my target career as a " + user.targetCareer)}
                  className="text-[10px] bg-[#d4af37]/5 border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/15 rounded-full px-3 py-1 cursor-pointer transition-colors"
                >
                  🔍 Gap Analysis
                </button>
                <button
                  onClick={() => handleSendMessage(undefined, "Give me a custom 3-step study roadmap focusing on my weakest skill: " + [...user.skills].sort((a,b)=>a.level-b.level)[0].name)}
                  className="text-[10px] bg-[#dbb8ff]/5 border border-[#dbb8ff]/20 text-[#dbb8ff] hover:bg-[#dbb8ff]/15 rounded-full px-3 py-1 cursor-pointer transition-colors"
                >
                  🗺️ Weakest Skill Plan
                </button>
                <button
                  onClick={() => handleSendMessage(undefined, "Generate a quick 3-question student quiz regarding my field of study: " + user.fieldOfStudy)}
                  className="text-[10px] bg-sky-500/5 border border-sky-500/20 text-sky-300 hover:bg-sky-500/15 rounded-full px-3 py-1 cursor-pointer transition-colors"
                >
                  📝 Mock Quiz
                </button>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  id="chat-message-input"
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="glass-input flex-grow rounded-lg py-2.5 px-4 text-white bg-black/60 border border-white/10 text-xs outline-none placeholder-[#494454] focus:border-[#d4af37]"
                  placeholder="Ask your Digital Twin Brain for personalized learning paths or exercises..."
                />
                <button
                  id="chat-send-btn"
                  type="submit"
                  className="p-2.5 rounded-lg bg-[#d4af37] hover:bg-[#e5c04c] text-black transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SIMULATION LAB (PREDICTORS) */}
          {activeTab === 'sim' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Exam Predictor Widget */}
                <div id="exam-predictor-card" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15">
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BarChart2 size={18} className="text-[#d4af37]" /> Grades & Score Predictor
                    </h3>
                    <p className="text-[11px] text-[#cbc3d7]/60">
                      Simulate exam grade projection by toggling supplementary study hours.
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-6 bg-black/40 border border-white/5 rounded-xl mb-4">
                    <div className="text-center">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]/50">Predicted Exam Score</div>
                      <div className="text-5xl font-extrabold text-[#d4af37] font-mono my-2">{calculatePredictedExamScore()}%</div>
                      <span className="text-[10px] text-[#cbc3d7]/70 font-semibold bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                        Status: {calculatePredictedExamScore() >= 90 ? '🌟 High Distinction (A+)' : calculatePredictedExamScore() >= 80 ? 'Distinction (A)' : 'Satisfactory (B)'}
                      </span>
                    </div>
                  </div>

                  {/* Simulator Control Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#cbc3d7]">Hypothetical Extra Study</span>
                      <strong className="text-white">+{simulatedExtraStudy} Hours</strong>
                    </div>
                    <input
                      id="predicted-hours-slider"
                      type="range"
                      min="0"
                      max="40"
                      value={simulatedExtraStudy}
                      onChange={(e) => setSimulatedExtraStudy(parseInt(e.target.value))}
                      className="w-full accent-[#d4af37] h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <div className="text-[10px] text-[#cbc3d7]/40 leading-relaxed pt-2">
                      💡 <strong>Algorithm Insight:</strong> This prediction calculates your underlying Mathematics skill level combined with practical and study hours to simulate academic success coefficients.
                    </div>
                  </div>
                </div>

                {/* Career Readiness Radar Gauge */}
                <div id="career-readiness-card" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase size={18} className="text-[#dbb8ff]" /> Target Career Alignment
                    </h3>
                    <p className="text-[11px] text-[#cbc3d7]/60">
                      Evaluating compatibility matrix with target career role: <strong>{user.targetCareer}</strong>.
                    </p>
                  </div>

                  <div className="py-6 flex flex-col items-center justify-center">
                    {/* Visual Radial Gauge */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="10" />
                        <circle 
                          cx="64" 
                          cy="64" 
                          r="50" 
                          fill="transparent" 
                          stroke="#dbb8ff" 
                          strokeWidth="10" 
                          strokeDasharray={`${2 * Math.PI * 50}`}
                          strokeDashoffset={`${2 * Math.PI * 50 * (1 - calculateCareerReadiness() / 100)}`}
                        />
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-2xl font-bold text-white font-mono">{calculateCareerReadiness()}%</div>
                        <div className="text-[8px] text-[#cbc3d7]/50 uppercase tracking-widest font-bold">Readiness</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#cbc3d7] text-center max-w-xs mt-4">
                      Your skill values match **{Math.round(calculateCareerReadiness() * 1.05)}%** of requirements for **{user.targetCareer}**. Pro-tip: Train your analytical skills to maximize alignment parameters.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex gap-2 items-start text-[10px] text-[#cbc3d7]">
                    <AlertCircle size={14} className="text-[#dbb8ff] shrink-0 mt-0.5" />
                    <span>Focus on raising your analytical and practical categories to unlock full certification simulations for this industry.</span>
                  </div>
                </div>

              </div>

              {/* Career Skills Gap Matrix Bar Display */}
              <div id="skills-gap-card" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Synaptic Skill Gap Evaluator</h4>
                <div className="space-y-3">
                  {user.skills.map(s => {
                    // Career required value simulated at 75% for junior roles
                    const targetVal = 75;
                    const diff = s.level - targetVal;
                    return (
                      <div key={s.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#cbc3d7]">{s.name}</span>
                          <span className={`font-mono text-[10px] ${diff >= 0 ? 'text-green-400' : 'text-[#d4af37]'}`}>
                            {diff >= 0 ? `Met Goal (+${diff}%)` : `Skills Gap (${diff}%)`}
                          </span>
                        </div>
                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                          {/* target indicator */}
                          <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-[#dbb8ff] z-10" title="Industry Target: 75%"></div>
                          <div className={`h-full ${diff >= 0 ? 'bg-green-500' : 'bg-[#d4af37]'}`} style={{ width: `${s.level}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXTERNAL DATA SYNC TERMINAL */}
          {activeTab === 'sync' && (
            <div id="data-sync-workspace" className="glass-card rounded-2xl p-6 bg-[#131314]/60 border border-[#d4af37]/15 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <RefreshCw size={18} className="text-[#d4af37]" /> Sync Source Integrations
                </h3>
                <p className="text-[11px] text-[#cbc3d7]/60">
                  Connect your real active portfolios to automatically inject and model skill competencies based on actual commits, problems solved, and grades.
                </p>
              </div>

              {/* Sources List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.syncSources.map((source) => (
                  <div 
                    key={source.id} 
                    className={`rounded-2xl p-5 border backdrop-blur-md flex flex-col justify-between h-[230px] transition-all ${source.connected ? 'bg-[#131314] border-[#d4af37]/20 shadow-[0_4px_20px_rgba(212,175,55,0.05)]' : 'bg-[#131314]/40 border-white/5 opacity-80'}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-xs bg-white/5 border border-white/5 text-white p-2 rounded-lg font-bold">
                          {source.id === 'github' ? '🐙' : source.id === 'leetcode' ? '💻' : '🎓'}
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider ${source.connected ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-white/5 text-[#cbc3d7]/40'}`}>
                          {source.connected ? 'CONNECTED' : 'DISCONNECTED'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{source.name}</h4>
                      
                      {/* Metric lines */}
                      <ul className="text-[10px] text-[#cbc3d7]/70 mt-2 space-y-1">
                        {source.metrics.map((m, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <ChevronRight size={10} className="text-[#d4af37]" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex gap-2">
                      <button
                        onClick={() => handleToggleConnect(source.id)}
                        className={`flex-grow text-[10px] py-2 rounded-lg font-bold transition-all cursor-pointer ${source.connected ? 'bg-white/5 text-[#cbc3d7] hover:bg-white/10' : 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black hover:opacity-90'}`}
                      >
                        {source.connected ? 'Disconnect' : 'Connect API'}
                      </button>

                      {source.connected && (
                        <button
                          onClick={() => handleSyncNow(source.id)}
                          disabled={syncingSourceId === source.id}
                          className="px-2.5 rounded-lg bg-[#dbb8ff]/10 hover:bg-[#dbb8ff]/20 text-[#dbb8ff] transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
                          title="Sync metrics now"
                        >
                          <RefreshCw size={12} className={syncingSourceId === source.id ? 'animate-spin' : ''} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Security notice regarding API credentials */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex gap-3 items-start text-xs text-[#cbc3d7] leading-relaxed">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <strong>🔐 High-Contrast Privacy Safeguard:</strong> All synchronization connections utilize sandboxed mock triggers inside your local student journey profile. In real production, this links securely with OAuth authorization variables listed in the secrets panel.
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
