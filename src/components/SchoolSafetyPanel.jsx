import React, { useState } from 'react';
import { GRAP_STAGES } from '../data/stations';
import { broadcastSchoolEmergency } from '../services/awsService';
import { School, AlertTriangle, Send, BellRing, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export default function SchoolSafetyPanel({ lang, stations, onOpenBedrock }) {
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("Delhi Technological University (DTU) Campus / Delhi Public School Rohini");
  const [customDirective, setCustomDirective] = useState("Suspend outdoor morning assembly. Mandate N95 masks. Run HEPA air purifiers in all classrooms.");

  const handleBroadcast = async () => {
    setBroadcasting(true);
    const res = await broadcastSchoolEmergency({
      schoolName: selectedSchool,
      aqi: 442,
      grapStage: "Stage IV (Severe+)",
      actionRequired: customDirective
    });
    setBroadcastResult(res);
    setBroadcasting(false);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <School className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              {lang === 'hi' ? 'स्कूल व कॉलेज वायु सुरक्षा ग्रिड' : 'School & Campus Morning Safety Grid'}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 font-mono border border-rose-700">
              GRAP IV Trigger
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 max-w-2xl">
            {lang === 'hi'
              ? 'सुबह 6:00 बजे स्वचालित इन्वर्जन चेतावनी। प्राचार्यों और अभिभावकों को अमेज़न SNS के माध्यम से रियल-टाइम एसएमएस व नोटिफिकेशन प्रसारित करता है।'
              : 'Automated 06:00 AM Dawn Inversion Trigger. Broadcasts instant emergency protocol directives to school principals, staff, and parents via Amazon SNS.'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* SNS Broadcast Simulator */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 mb-4">
            <BellRing className="w-4 h-4 text-amber-400" />
            <span>Emergency Multi-Channel SNS Broadcast</span>
          </h3>

          <div className="space-y-3 text-xs mb-4">
            <div>
              <label className="text-slate-400 block mb-1">Target Educational Institution:</label>
              <input
                type="text"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Automated Directive (GRAP Stage IV Mandate):</label>
              <textarea
                rows={3}
                value={customDirective}
                onChange={(e) => setCustomDirective(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            onClick={handleBroadcast}
            disabled={broadcasting}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 disabled:opacity-50"
          >
            {broadcasting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Transmitting via Amazon SNS...
              </span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Trigger Instant SNS Broadcast (340 Recipients)</span>
              </>
            )}
          </button>

          {broadcastResult && (
            <div className="mt-4 p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs text-rose-200 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-rose-300 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Broadcast Dispatched Successfully!</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">Message ID: {broadcastResult.messageId}</div>
              <div className="text-[11px] font-mono text-slate-400">Source: {broadcastResult.source}</div>
              <div className="mt-2 text-[11px] text-slate-300">
                ✅ Delivered to 340 parent SMS numbers & principal portal via DLT-approved emergency gateway.
              </div>
            </div>
          )}
        </div>

        {/* GRAP Stages Reference */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Graded Response Action Plan (GRAP) Guidelines</span>
          </h3>
          {GRAP_STAGES.map((g, idx) => (
            <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="font-bold flex items-center gap-2 mb-1" style={{ color: g.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }}></span>
                <span>{g.stage}</span>
              </div>
              <ul className="text-slate-400 space-y-1 pl-4 list-disc text-[11px]">
                {g.actions.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
