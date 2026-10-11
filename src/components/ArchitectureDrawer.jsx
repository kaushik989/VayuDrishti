import React from 'react';
import { X, Cpu, Database, Bell, Radio, Cloud, Shield, CheckCircle } from 'lucide-react';

export default function ArchitectureDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const stackComponents = [
    {
      title: "AWS Bedrock (Claude 3.5 Sonnet)",
      role: "Agentic Intelligence & Action Directives",
      desc: "Analyzes hyperlocal PM2.5, wind vectors, and GRAP emergency triggers to formulate school protocols and civic orders.",
      icon: Cpu,
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10"
    },
    {
      title: "Amazon DynamoDB",
      role: "Ultra-Low Latency Telemetry & Incident Store",
      desc: "Stores millisecond telemetry from 8+ Delhi NCR sensor stations, NASA FIRMS active stubble fire anomalies, and crowdsourced citizen violation reports.",
      icon: Database,
      color: "text-sky-400 border-sky-500/40 bg-sky-500/10"
    },
    {
      title: "Amazon SNS & EventBridge",
      role: "Multi-Channel Emergency School Broadcast",
      desc: "Automated 6:00 AM EventBridge cron rule evaluates nocturnal inversion traps and fires Amazon SNS to 340+ school principals & parents.",
      icon: Bell,
      color: "text-rose-400 border-rose-500/40 bg-rose-500/10"
    },
    {
      title: "AWS Lambda & OpenSearch (Vector/Spatial)",
      role: "Serverless NASA FIRMS Ingestion & SafeRoute Calculation",
      desc: "Fetches satellite thermal anomalies across Punjab/Haryana, calculates plume dispersion vectors, and computes Swachh Marg lowest-inhalation corridors.",
      icon: Radio,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
    },
    {
      title: "AWS SAM & LocalStack Ready",
      role: "Zero-Cost Local Emulation & 1-Click Cloud Deployment",
      desc: "Complete template.yaml infrastructure as code. Runs 100% locally with zero cloud bill or deploys directly to AWS with 'sam deploy'.",
      icon: Cloud,
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10"
    }
  ];

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                VayuDrishti Native AWS Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Built for WeMakeDevs Environmental Hacks (Track 01: Air)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Architecture Flow */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 font-mono text-xs text-slate-300">
          <div className="text-amber-400 font-bold mb-2">// AWS End-to-End Execution Pipeline</div>
          <div className="space-y-1.5 text-slate-400">
            <div>[NASA FIRMS + CPCB Sensors] ➡️ <span className="text-sky-400">AWS Lambda / EventBridge Cron</span></div>
            <div>&nbsp;&nbsp;↳ Writes to: <span className="text-emerald-400">Amazon DynamoDB</span> (SensorStateTable)</div>
            <div>&nbsp;&nbsp;↳ Evaluates: <span className="text-amber-400">AWS Bedrock (Claude 3.5 Sonnet)</span> for GRAP Triggers</div>
            <div>&nbsp;&nbsp;↳ Dispatches: <span className="text-rose-400">Amazon SNS</span> (School Emergency Broadcast)</div>
            <div>&nbsp;&nbsp;↳ Delivers: <span className="text-purple-400">React + Vite + Leaflet Web Dashboard</span> via S3 & CloudFront</div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {stackComponents.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div key={idx} className="p-3.5 rounded-xl border bg-slate-900/60 border-slate-800 flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl border shrink-0 ${c.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-200 text-sm">{c.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {c.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Close Architecture View
          </button>
        </div>

      </div>
    </div>
  );
}
