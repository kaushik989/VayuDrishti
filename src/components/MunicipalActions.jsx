import React from 'react';
import { Droplets, Truck, Wrench, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';

export default function MunicipalActions({ stations, onDispatchGun, lang }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <Droplets className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              {lang === 'hi' ? 'नगर निगम स्मॉग-रोधी नियंत्रण कक्ष' : 'Civic Anti-Smog & Water Sprinkler Dispatch'}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 font-mono border border-sky-700">
              MCD Command
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 max-w-2xl">
            {lang === 'hi'
              ? 'हॉटस्पॉट-वार मोबाइल एंटी-स्मॉग गन, वाटर स्प्रिंकलर और मैकेनाइज्ड रोड स्वीपर की तैनाती की निगरानी और सक्रियण।'
              : 'Ward-by-ward mobile anti-smog artillery, water mist cannons, and mechanized road sweeper fleet tracking and dispatch.'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((st) => (
          <div key={st.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-slate-200 text-sm">{st.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold text-white" style={{ backgroundColor: st.color }}>
                  AQI {st.aqi}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mb-3">{st.zone}</div>

              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-xs font-mono mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Guns:</span>
                  <span className="text-sky-400 font-bold">{st.antiSmogGunsActive} / {st.antiSmogGunsRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deficit:</span>
                  <span className={st.antiSmogGunsActive < st.antiSmogGunsRequired ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                    {Math.max(0, st.antiSmogGunsRequired - st.antiSmogGunsActive)} Units Needed
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onDispatchGun(st.id)}
              className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>+ Dispatch 1 Water Cannon</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
