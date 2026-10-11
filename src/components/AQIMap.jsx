import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SATELLITE_FIRE_CLUSTERS, SATELLITE_SUMMARY } from '../data/stubbleFires';
import { Layers, Flame, Wind, Droplets, AlertTriangle, Sparkles, Navigation } from 'lucide-react';

export default function AQIMap({ stations, onDispatchGun, onSelectStation, selectedStation, lang }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const firesLayerRef = useRef(null);
  const windLayerRef = useRef(null);

  const [showFires, setShowFires] = useState(true);
  const [showWindVector, setShowWindVector] = useState(true);
  const [mapFocus, setMapFocus] = useState('delhi'); // 'delhi' or 'satellite'

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Delhi initially
    const map = L.map(mapContainerRef.current, {
      center: [28.65, 77.15],
      zoom: 11,
      minZoom: 6,
      maxZoom: 18,
      zoomControl: false,
    });

    // Add Dark Mode CartoDB Positron/Dark tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB &copy; OpenStreetMap contributors | VayuDrishti AWS Grid',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Create Layer Groups
    markersLayerRef.current = L.layerGroup().addTo(map);
    firesLayerRef.current = L.layerGroup().addTo(map);
    windLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Stations Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    stations.forEach((st) => {
      const isSelected = selectedStation?.id === st.id;
      const isDtuVenue = st.id === "DEL-DTU";

      // Custom HTML Marker for AQI Sensor
      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${st.aqi >= 400 ? `<div class="absolute w-10 h-10 rounded-full animate-ping opacity-60" style="background-color: ${st.color}"></div>` : ''}
          <div class="relative flex items-center justify-center px-2 py-1 rounded-full text-white font-mono font-bold text-xs shadow-xl border-2 transition-transform duration-200 ${isSelected ? 'scale-125 ring-4 ring-amber-400 border-white' : 'border-slate-800'}" style="background-color: ${st.color}">
            ${isDtuVenue ? '📍 ' : ''}${st.aqi}
          </div>
          <div class="absolute -bottom-5 whitespace-nowrap text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded bg-slate-900/90 text-slate-200 border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            ${st.name.split(' ')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'aqi-station-marker',
        html: markerHtml,
        iconSize: [42, 30],
        iconAnchor: [21, 15]
      });

      const marker = L.marker([st.lat, st.lng], { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-900 text-xs font-sans min-w-[220px]';
      popupContent.innerHTML = `
        <div class="font-bold text-sm text-slate-900 flex items-center justify-between border-b pb-1.5 mb-1.5">
          <span>${st.name}</span>
          <span class="px-2 py-0.5 rounded text-white font-mono font-bold" style="background-color: ${st.color}">AQI ${st.aqi}</span>
        </div>
        <div class="text-[11px] text-slate-600 mb-2 font-medium">${st.zone}</div>
        <div class="grid grid-cols-2 gap-1.5 bg-slate-100 p-2 rounded mb-2">
          <div><span class="text-slate-500">PM2.5:</span> <b>${st.pm25} µg/m³</b></div>
          <div><span class="text-slate-500">PM10:</span> <b>${st.pm10} µg/m³</b></div>
          <div><span class="text-slate-500">NO2:</span> <b>${st.no2} ppb</b></div>
          <div><span class="text-slate-500">GRAP:</span> <b class="text-red-700">${st.grapStage}</b></div>
        </div>
        <div class="text-[11px] text-slate-700 mb-2 italic">"${st.statusText}"</div>
        <div class="flex items-center justify-between pt-1 border-t">
          <span class="text-[11px] text-slate-600">Anti-Smog Units: <b>${st.antiSmogGunsActive} / ${st.antiSmogGunsRequired}</b></span>
          <button id="dispatch-btn-${st.id}" class="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium text-[11px] flex items-center gap-1">
            + Dispatch Gun
          </button>
        </div>
      `;

      // Handle popup button click
      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`dispatch-btn-${st.id}`);
        if (btn) {
          btn.onclick = () => {
            onDispatchGun(st.id);
            marker.closePopup();
          };
        }
      });

      marker.on('click', () => {
        onSelectStation(st);
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [stations, selectedStation]);

  // Update Satellite Fires Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !firesLayerRef.current) return;

    firesLayerRef.current.clearLayers();

    if (showFires) {
      SATELLITE_FIRE_CLUSTERS.forEach((f) => {
        const fireHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute w-8 h-8 rounded-full bg-red-600/40 animate-ping"></div>
            <div class="relative w-7 h-7 rounded-full bg-gradient-to-tr from-red-600 to-orange-400 border border-white flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
              🔥
            </div>
            <div class="absolute -bottom-5 whitespace-nowrap text-[9px] font-mono bg-slate-950/90 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              ${f.district.split(',')[0]} (${f.fireCount})
            </div>
          </div>
        `;

        const fireIcon = L.divIcon({
          className: 'fire-cluster-marker',
          html: fireHtml,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const fireMarker = L.marker([f.lat, f.lng], { icon: fireIcon });

        fireMarker.bindPopup(`
          <div class="p-1 font-sans text-xs">
            <div class="font-bold text-red-600 flex items-center gap-1 border-b pb-1">
              <span>🛰️ NASA FIRMS Thermal Anomaly</span>
            </div>
            <div class="mt-1"><b>District:</b> ${f.district}</div>
            <div><b>Active Fires:</b> ${f.fireCount} clusters</div>
            <div><b>Fire Radiative Power:</b> ${f.frp} MW</div>
            <div><b>Confidence:</b> ${f.confidence}</div>
            <div class="mt-1 p-1 bg-red-50 text-red-700 rounded font-medium">
              ⚠️ Plume Arrival: <b>${f.downwindPlumeETA}</b>
            </div>
          </div>
        `);

        firesLayerRef.current.addLayer(fireMarker);
      });
    }
  }, [showFires]);

  // Update Wind Vector Trajectory Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !windLayerRef.current) return;

    windLayerRef.current.clearLayers();

    if (showWindVector) {
      // Draw wind trajectory polyline from Punjab (Sangrur) to Delhi (DTU)
      const plumeTrajectory = [
        [30.2458, 75.8421], // Sangrur, Punjab
        [29.8015, 76.3996], // Kaithal, Haryana
        [29.2000, 76.8500], // Panipat corridor
        [28.7501, 77.1177]  // DTU / North Delhi
      ];

      const polyline = L.polyline(plumeTrajectory, {
        color: '#F97316',
        weight: 3,
        dashArray: '8, 8',
        opacity: 0.8
      });

      polyline.bindTooltip("💨 North-Westerly Stubble Smoke Transport Vector (18 km/h)", {
        permanent: false,
        direction: 'center',
        className: 'bg-slate-900 text-orange-400 font-mono text-xs px-2 py-1 rounded border border-orange-500'
      });

      windLayerRef.current.addLayer(polyline);
    }
  }, [showWindVector]);

  // Toggle map focus view
  const switchFocus = (focus) => {
    setMapFocus(focus);
    if (!mapInstanceRef.current) return;
    if (focus === 'delhi') {
      mapInstanceRef.current.flyTo([28.65, 77.15], 11, { duration: 1.5 });
    } else {
      // Zoom out to show Punjab, Haryana and Delhi together
      mapInstanceRef.current.flyTo([29.80, 76.40], 8, { duration: 1.8 });
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl glass-panel">
      {/* Map Layer Controls floating toolbar */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 text-xs">
        
        {/* View Focus switcher */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => switchFocus('delhi')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              mapFocus === 'delhi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Navigation className="w-3 h-3" />
            <span>Delhi NCR</span>
          </button>
          <button
            onClick={() => switchFocus('satellite')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              mapFocus === 'satellite' ? 'bg-orange-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Punjab Satellite Fires</span>
          </button>
        </div>

        {/* Layer Toggles */}
        <button
          onClick={() => setShowFires(!showFires)}
          className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
            showFires
              ? 'bg-red-950/80 border-red-700 text-red-300 font-semibold'
              : 'bg-slate-800/80 border-slate-700 text-slate-400'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>NASA Stubble Fires</span>
        </button>

        <button
          onClick={() => setShowWindVector(!showWindVector)}
          className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
            showWindVector
              ? 'bg-orange-950/80 border-orange-700 text-orange-300 font-semibold'
              : 'bg-slate-800/80 border-slate-700 text-slate-400'
          }`}
        >
          <Wind className="w-3.5 h-3.5 text-orange-400" />
          <span>Wind Vector</span>
        </button>
      </div>

      {/* Selected Station Quick Summary Card (Top Right) */}
      {selectedStation && (
        <div className="absolute top-4 right-4 z-[400] max-w-sm glass-panel p-4 rounded-xl border border-slate-700/90 text-xs shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                <span>{selectedStation.name}</span>
                {selectedStation.id === 'DEL-DTU' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50">
                    DTU Venue
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-[11px]">{selectedStation.zone}</p>
            </div>
            <div
              className="px-2.5 py-1 rounded-lg font-mono font-bold text-sm text-white shadow-md"
              style={{ backgroundColor: selectedStation.color }}
            >
              AQI {selectedStation.aqi}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 mb-2.5">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">PM2.5</div>
              <div className="text-sm font-bold text-slate-200">{selectedStation.pm25} µg</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">PM10</div>
              <div className="text-sm font-bold text-slate-200">{selectedStation.pm10} µg</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">GRAP</div>
              <div className="text-sm font-bold text-red-400">{selectedStation.grapStage}</div>
            </div>
          </div>

          <p className="text-slate-300 text-[11px] mb-3 leading-relaxed">
            {selectedStation.statusText}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDispatchGun(selectedStation.id)}
              className="flex-1 py-1.5 px-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-sky-600/20"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Dispatch Anti-Smog Gun</span>
            </button>
          </div>
        </div>
      )}

      {/* Legend Card (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[400] glass-panel px-3.5 py-2.5 rounded-xl border border-slate-700/80 text-[11px] shadow-xl">
        <div className="font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>CPCB & Delhi AQI Scale</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 0-50</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 51-100</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> 101-200</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> 201-300</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-700"></span> 301-400</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-950 border border-red-500"></span> 401+ Severe</span>
        </div>
      </div>

      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
}
