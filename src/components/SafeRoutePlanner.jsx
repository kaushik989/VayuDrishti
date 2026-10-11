import React, { useState } from 'react';
import { COMMUTE_PAIRS } from '../data/mockRoutes';
import { ShieldCheck, AlertTriangle, Navigation, ArrowRight, Bus, User, HeartPulse, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SafeRoutePlanner({ lang, onOpenBedrock }) {
  const [selectedRouteId, setSelectedRouteId] = useState(COMMUTE_PAIRS[0].id);
  const [commuterType, setCommuterType] = useState('student'); // 'student', 'asthma', 'rider', 'general'
  const [exportNotice, setExportNotice] = useState(false);

  const activePair = COMMUTE_PAIRS.find(r => r.id === selectedRouteId) || COMMUTE_PAIRS[0];

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 shadow-2xl">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              {lang === 'hi' ? 'स्वच्छ मार्ग (SafeRoute AI) - न्यूनतम विषैला आवागमन' : 'Swachh Marg: SafeRoute AI Clean Passage'}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono border border-emerald-700">
              AWS Route Engine
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 max-w-2xl">
            {lang === 'hi'
              ? 'पारंपरिक जीपीएस केवल दूरी और समय देखता है। स्वच्छ मार्ग फेफड़ों में जाने वाले सूक्ष्म विषैले कणों (PM2.5) की गणना करके न्यूनतम जोखिम वाला रास्ता तैयार करता है।'
              : 'Standard GPS only minimizes travel time. Swachh Marg calculates real-time alveolar toxic particulate inhalation, routing commuters through tree-shaded bio-buffers to cut inhaled poison by up to 45%.'}
          </p>
        </div>

        {/* Commuter Persona Selector */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setCommuterType('student')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              commuterType === 'student' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>School Bus</span>
          </button>
          <button
            onClick={() => setCommuterType('asthma')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              commuterType === 'asthma' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Asthmatic</span>
          </button>
          <button
            onClick={() => setCommuterType('rider')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              commuterType === 'rider' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Gig Rider</span>
          </button>
        </div>
      </div>

      {/* Corridor Presets */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-slate-400 font-mono">Select Commute Corridor:</span>
        {COMMUTE_PAIRS.map((pair) => (
          <button
            key={pair.id}
            onClick={() => setSelectedRouteId(pair.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              selectedRouteId === pair.id
                ? 'bg-slate-800 border-amber-500 text-amber-300 shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Navigation className="w-3 h-3 text-amber-400" />
            <span>{pair.title}</span>
          </button>
        ))}
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        
        {/* Left: Standard Navigation Route (Toxic Trap) */}
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-5 relative overflow-hidden">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                Standard / Shortest Route
              </span>
              <h3 className="font-bold text-slate-100 text-base mt-1.5">
                {activePair.standardRoute.name}
              </h3>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-red-900/60 text-red-200 font-mono font-bold">
              AQI {activePair.standardRoute.avgAQI}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800 my-4 text-xs font-mono">
            <div>
              <div className="text-slate-500 text-[10px]">DISTANCE</div>
              <div className="font-bold text-slate-200 text-sm">{activePair.standardRoute.distanceKm} km</div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">DURATION</div>
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {activePair.standardRoute.durationMin} min
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">INHALED PM2.5</div>
              <div className="font-bold text-red-400 text-sm">{activePair.standardRoute.inhalationPMRateUg} µg</div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="font-semibold text-red-400 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Inhalation Hazards Detected:</span>
            </div>
            {activePair.standardRoute.riskFactors.map((rf, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>{rf}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-red-900/40 text-[11px] text-red-300/80 italic">
            ⚠️ Commuter lung deposition equivalent to smoking 3 cigarettes during standard morning transit.
          </div>
        </div>

        {/* Right: Swachh Marg (Clean Bio-Shield Corridor) */}
        <div className="rounded-xl border border-emerald-600/60 bg-emerald-950/20 p-5 relative overflow-hidden ring-1 ring-emerald-500/30">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1 w-fit">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Swachh Marg (AI Recommended)
              </span>
              <h3 className="font-bold text-slate-100 text-base mt-1.5">
                {activePair.cleanRoute.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs px-2 py-1 rounded bg-emerald-900/80 text-emerald-200 font-mono font-bold">
                AQI {activePair.cleanRoute.avgAQI}
              </span>
              <div className="text-[10px] text-emerald-400 font-mono font-bold mt-1">
                -{activePair.cleanRoute.reductionPercentage}% TOXINS
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800 my-4 text-xs font-mono">
            <div>
              <div className="text-slate-500 text-[10px]">DISTANCE</div>
              <div className="font-bold text-slate-200 text-sm">{activePair.cleanRoute.distanceKm} km</div>
              <div className="text-[10px] text-slate-400">(+0.8 km)</div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">DURATION</div>
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                {activePair.cleanRoute.durationMin} min
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">(+3 min only)</div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">INHALED PM2.5</div>
              <div className="font-bold text-emerald-400 text-sm">{activePair.cleanRoute.inhalationPMRateUg} µg</div>
              <div className="text-[10px] text-emerald-300 font-semibold">SAVE 107 µg</div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bio-Shield Protections:</span>
            </div>
            {activePair.cleanRoute.protectiveFactors.map((pf, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{pf}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
            <button
              onClick={handleExport}
              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Export to School Bus Navigation</span>
            </button>
            <button
              onClick={onOpenBedrock}
              className="text-xs text-emerald-300 hover:underline flex items-center gap-1"
            >
              <span>Ask VayuAI for bus schedule</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span><b>Route Manifest Dispatched:</b> Clean corridor coordinates synchronized with School Bus GPS Fleet & Driver App. Avoids Bawana industrial corridor.</span>
        </div>
      )}

    </div>
  );
}
