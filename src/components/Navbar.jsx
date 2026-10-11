import React from 'react';
import { Wind, ShieldAlert, Cpu, Sparkles, AlertTriangle, Globe, Volume2, VolumeX, Flame } from 'lucide-react';

export default function Navbar({
  lang,
  setLang,
  soundEnabled,
  setSoundEnabled,
  onOpenBedrock,
  onOpenReport,
  onOpenArch,
  activeTab,
  setActiveTab
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-700/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Hackathon Info */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-lg shadow-amber-500/20">
            <Wind className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                VayuDrishti
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                वायुदृष्टि
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-700/60 flex items-center gap-1 font-semibold animate-pulse">
                <AlertTriangle className="w-2.5 h-2.5 text-red-400" /> GRAP Stage IV
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Bharat Builds Tour</span>
              <span className="text-slate-600">/</span>
              <span className="text-amber-400 font-medium">DTU Delhi Build Day</span>
              <span className="text-slate-600">/</span>
              <span className="text-sky-400 font-mono text-[11px]">AWS Powered</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'मानचित्र व प्रदूषण' : 'AQI & Stubble Map'}</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'routes'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'स्वच्छ मार्ग (SafeRoute)' : 'SafeRoute AI'}</span>
          </button>

          <button
            onClick={() => setActiveTab('schools')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'schools'
                ? 'bg-rose-500 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'स्कूल सुरक्षा व GRAP' : 'School Safety & GRAP'}</span>
          </button>

          <button
            onClick={() => setActiveTab('civic')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'civic'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'नगरपालिका नियंत्रण' : 'Civic Actions'}</span>
          </button>
        </div>

        {/* Action Controls & AWS Badges */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute Emergency Siren" : "Enable Emergency Alerts Siren"}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'en' ? 'हिंदी' : 'EN'}</span>
          </button>

          {/* Citizen Report Trigger */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-medium transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>{lang === 'hi' ? 'प्रदूषण रिपोर्ट करें' : 'Report Fire'}</span>
          </button>

          {/* AI Copilot Trigger */}
          <button
            onClick={onOpenBedrock}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-semibold shadow-md shadow-amber-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VayuAI Bedrock</span>
          </button>

          {/* Architecture Drawer Trigger */}
          <button
            onClick={onOpenArch}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-amber-400 transition-colors"
            title="View AWS System Architecture"
          >
            <Cpu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
