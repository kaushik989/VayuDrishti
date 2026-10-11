import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import AQIMap from './components/AQIMap';
import SafeRoutePlanner from './components/SafeRoutePlanner';
import SchoolSafetyPanel from './components/SchoolSafetyPanel';
import MunicipalActions from './components/MunicipalActions';
import BedrockAgentModal from './components/BedrockAgentModal';
import CitizenReportModal from './components/CitizenReportModal';
import ArchitectureDrawer from './components/ArchitectureDrawer';
import { fetchStations, dispatchAntiSmogGun, fetchHealth } from './services/awsService';
import { DELHI_STATIONS } from './data/stations';
import { AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'routes', 'schools', 'civic'
  
  const [stations, setStations] = useState(DELHI_STATIONS);
  const [selectedStation, setSelectedStation] = useState(DELHI_STATIONS[0]);
  const [systemHealth, setSystemHealth] = useState(null);

  // Modals
  const [bedrockOpen, setBedrockOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Check backend health & fetch stations
    fetchHealth().then(setSystemHealth);
    fetchStations().then((data) => {
      if (data?.stations?.length) {
        setStations(data.stations);
        setSelectedStation(data.stations[0]);
      }
    });
  }, []);

  const handleDispatchGun = async (stationId) => {
    const res = await dispatchAntiSmogGun(stationId, 1);
    // Optimistically update station in state
    setStations(prev => prev.map(s => {
      if (s.id === stationId) {
        return {
          ...s,
          antiSmogGunsActive: s.antiSmogGunsActive + 1,
          aqi: Math.max(120, s.aqi - 18),
          pm25: Math.max(100, s.pm25 - 15)
        };
      }
      return s;
    }));

    if (selectedStation?.id === stationId) {
      setSelectedStation(prev => ({
        ...prev,
        antiSmogGunsActive: prev.antiSmogGunsActive + 1,
        aqi: Math.max(120, prev.aqi - 18),
        pm25: Math.max(100, prev.pm25 - 15)
      }));
    }

    setToastMessage(`Dispatched 1 Anti-Smog Unit to ${selectedStation?.name || "Target Zone"}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[700] px-4 py-2.5 rounded-xl bg-sky-600 text-white font-medium text-xs flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-sky-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenBedrock={() => setBedrockOpen(true)}
        onOpenReport={() => setReportOpen(true)}
        onOpenArch={() => setArchOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* Banner Alert for GRAP IV Emergency */}
        <div className="mb-6 p-3 rounded-xl bg-red-950/40 border border-red-800/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
            <span>
              <b>CRITICAL WINTER ADVISORY:</b> GRAP Stage IV emergency in effect across Delhi NCR. Severe stubble burning plume inflow from Sangrur/Patiala. All educational institutions advised on immediate indoor protocols.
            </span>
          </div>
          <button
            onClick={() => setBedrockOpen(true)}
            className="whitespace-nowrap px-3 py-1 rounded-lg bg-red-800/60 hover:bg-red-800 text-red-200 font-medium transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Consult VayuAI</span>
          </button>
        </div>

        {/* Real-time Telemetry Overview Cards */}
        <StatsOverview
          lang={lang}
          stations={stations}
          onOpenBedrock={() => setBedrockOpen(true)}
        />

        {/* Tab Content Display */}
        {activeTab === 'map' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <AQIMap
              stations={stations}
              onDispatchGun={handleDispatchGun}
              onSelectStation={setSelectedStation}
              selectedStation={selectedStation}
              lang={lang}
            />

            {/* Quick SafeRoute Preview below Map */}
            <div className="mt-6">
              <SafeRoutePlanner lang={lang} onOpenBedrock={() => setBedrockOpen(true)} />
            </div>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="animate-in fade-in duration-300">
            <SafeRoutePlanner lang={lang} onOpenBedrock={() => setBedrockOpen(true)} />
          </div>
        )}

        {activeTab === 'schools' && (
          <div className="animate-in fade-in duration-300">
            <SchoolSafetyPanel
              lang={lang}
              stations={stations}
              onOpenBedrock={() => setBedrockOpen(true)}
            />
          </div>
        )}

        {activeTab === 'civic' && (
          <div className="animate-in fade-in duration-300">
            <MunicipalActions
              stations={stations}
              onDispatchGun={handleDispatchGun}
              lang={lang}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0F172A]/70 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            <b>VayuDrishti (वायुदृष्टि)</b> — Hyperlocal Clean-Air Intelligence & Early Warning Network for Bharat.
          </p>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>WeMakeDevs × AWS Environmental Hacks</span>
            <span>•</span>
            <span>Track 01: Air</span>
            <span>•</span>
            <button onClick={() => setArchOpen(true)} className="hover:text-amber-400 underline">
              AWS Architecture
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BedrockAgentModal
        isOpen={bedrockOpen}
        onClose={() => setBedrockOpen(false)}
        lang={lang}
        selectedStation={selectedStation}
      />

      <CitizenReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        lang={lang}
      />

      <ArchitectureDrawer
        isOpen={archOpen}
        onClose={() => setArchOpen(false)}
      />

    </div>
  );
}
