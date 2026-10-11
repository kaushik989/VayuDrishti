import React from 'react';
import { Flame, Wind, ShieldCheck, School, Activity, Droplets } from 'lucide-react';

export default function StatsOverview({ lang, stations, onOpenBedrock }) {
  // Compute dynamic stats
  const avgAqi = Math.round(stations.reduce((acc, s) => acc + s.aqi, 0) / stations.length);
  const worstStation = [...stations].sort((a, b) => b.aqi - a.aqi)[0];
  const totalSchoolsGuarded = stations.reduce((acc, s) => acc + s.schoolsNearby, 0);
  const activeGuns = stations.reduce((acc, s) => acc + s.antiSmogGunsActive, 0);
  const requiredGuns = stations.reduce((acc, s) => acc + s.antiSmogGunsRequired, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
      
      {/* 1. Regional Mean AQI */}
      <div className="glass-card p-3.5 rounded-xl border-l-4 border-l-red-600">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-medium flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-red-500" />
            {lang === 'hi' ? 'एनसीआर औसत AQI' : 'Delhi NCR Mean AQI'}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-400 font-mono border border-red-800">
            SEVERE
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-red-400 font-mono tracking-tight">
            {avgAqi}
          </span>
          <span className="text-xs text-slate-400">
            {lang === 'hi' ? 'खतरनाक स्थिति' : 'Hazardous'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          {lang === 'hi' ? 'शीर्ष हॉटस्पॉट: ' : 'Peak: '}
          <span className="text-amber-300 font-medium">{worstStation?.name?.split(' ')[0]} ({worstStation?.aqi})</span>
        </p>
      </div>

      {/* 2. NASA FIRMS Satellite Stubble Fires */}
      <div className="glass-card p-3.5 rounded-xl border-l-4 border-l-orange-500">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-medium flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            {lang === 'hi' ? 'नासा उपग्रह पराली आग' : 'NASA Stubble Fires'}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-950 text-orange-400 font-mono border border-orange-800">
            LIVE FIRMS
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-orange-400 font-mono tracking-tight">
            477
          </span>
          <span className="text-xs text-orange-300/80">
            {lang === 'hi' ? 'सक्रिय बिंदु' : 'Thermal Hotspots'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          {lang === 'hi' ? 'उत्तर-पश्चिम हवा 18 km/h' : 'Plume vector: NW at 18 km/h'}
        </p>
      </div>

      {/* 3. Swachh Marg (SafeRoute) Particulate Reduction */}
      <div className="glass-card p-3.5 rounded-xl border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {lang === 'hi' ? 'स्वच्छ मार्ग विष कटौती' : 'SafeRoute Toxicity Cut'}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-800">
            -43.7%
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
            107 µg
          </span>
          <span className="text-xs text-slate-400">
            {lang === 'hi' ? 'कम PM2.5 सेवन' : 'less inhaled/trip'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          {lang === 'hi' ? 'हरित बफर व पार्कों से मार्ग' : 'Via Bio-Canopy Corridor'}
        </p>
      </div>

      {/* 4. Schools Guarded & GRAP Alerts */}
      <div className="glass-card p-3.5 rounded-xl border-l-4 border-l-rose-500">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-medium flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-rose-400" />
            {lang === 'hi' ? 'सुरक्षित विद्यालय' : 'Schools Guarded'}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono border border-rose-800">
            SNS ACTIVE
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-rose-400 font-mono tracking-tight">
            {totalSchoolsGuarded}
          </span>
          <span className="text-xs text-slate-400">
            {lang === 'hi' ? 'संस्थान सतर्क' : 'Campuses Notified'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          {lang === 'hi' ? 'प्रातःकालीन सभाएं स्थगित' : 'Morning assemblies suspended'}
        </p>
      </div>

      {/* 5. Civic Anti-Smog Guns Active */}
      <div className="glass-card p-3.5 rounded-xl border-l-4 border-l-sky-500 col-span-2 md:col-span-4 lg:col-span-1">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-medium flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            {lang === 'hi' ? 'एंटी-स्मॉग तोपें' : 'Anti-Smog Units'}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 font-mono border border-sky-800">
            MCD FLEET
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-sky-400 font-mono tracking-tight">
            {activeGuns} / {requiredGuns}
          </span>
          <span className="text-xs text-slate-400">
            {lang === 'hi' ? 'सक्रिय' : 'Active'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          {lang === 'hi' ? 'मांग: +19 अतिरिक्त तोपें' : 'Deficit: 19 units queued'}
        </p>
      </div>

    </div>
  );
}
