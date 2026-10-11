import React, { useState } from 'react';
import { submitCitizenReport } from '../services/awsService';
import { Flame, X, Camera, Send, CheckCircle2, MapPin } from 'lucide-react';

export default function CitizenReportModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  const [category, setCategory] = useState('Open Biomass / Garbage Burning');
  const [location, setLocation] = useState('Shahbad Daulatpur, near DTU North Gate');
  const [severity, setSeverity] = useState('High');
  const [description, setDescription] = useState('Thick smoke plume rising from roadside waste dumping ground.');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitCitizenReport({
      category,
      location,
      severity,
      description,
      lat: 28.7510,
      lng: 77.1190
    });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl p-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">
                {lang === 'hi' ? 'नागरिक प्रदूषण रिपोर्ट (Nagarik Report)' : 'Citizen Air Violation Report'}
              </h3>
              <p className="text-[11px] text-slate-400">Saved to Amazon DynamoDB & Verified by Bedrock</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/50">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-slate-100 font-bold text-base">Report Queued to Civic Patrol!</h4>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Amazon DynamoDB record created. MCD Ward response unit dispatched to coordinates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-medium">Violation Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-red-500"
              >
                <option>Open Biomass / Garbage Burning</option>
                <option>Uncovered Construction Dust (GRAP III Violation)</option>
                <option>Illegal Diesel Generator (DG Set) Exhaust</option>
                <option>Industrial Smokestack Dark Emission</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-medium">Geo-Location / Landmark:</label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 pl-8 text-slate-100 focus:outline-none focus:border-red-500"
                />
                <MapPin className="w-4 h-4 text-red-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-medium">Description & Observations:</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400">
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Simulated Camera Sensor Attached (28.7510° N, 77.1190° E)</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              {submitting ? (
                <span>Logging to Amazon DynamoDB...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Incident Report to MCD</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
