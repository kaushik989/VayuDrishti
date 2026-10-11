import { Router } from "express";
import { generateAirAdvisory } from "../aws/bedrockClient.js";

const router = Router();

// In-memory stations state with dynamic live jitter
let stations = [
  {
    id: "DEL-DTU",
    name: "DTU & Bawana Industrial Belt",
    zone: "North Delhi (Hackathon Venue Zone)",
    lat: 28.7501,
    lng: 77.1177,
    aqi: 442,
    category: "Severe",
    color: "#7F1D1D",
    pm25: 395,
    pm10: 512,
    no2: 88,
    co: 3.2,
    temp: 23.4,
    humidity: 78,
    windSpeed: 4.2,
    windDirection: "NW",
    trend: "+28 pts in last 3h",
    majorPollutant: "PM2.5 (Industrial + Biomass Inflow)",
    schoolsNearby: 14,
    antiSmogGunsActive: 1,
    antiSmogGunsRequired: 4,
    grapStage: "Stage IV",
    statusText: "Immediate morning alert: Suspend outdoor assembly & sports."
  },
  {
    id: "DEL-ANAND",
    name: "Anand Vihar ISBT Complex",
    zone: "East Delhi (Border Hotspot)",
    lat: 28.6469,
    lng: 77.3160,
    aqi: 468,
    category: "Severe / Hazardous",
    color: "#4C0519",
    pm25: 420,
    pm10: 580,
    no2: 114,
    co: 4.8,
    temp: 24.1,
    humidity: 74,
    windSpeed: 3.8,
    windDirection: "NW",
    trend: "+19 pts in last 3h",
    majorPollutant: "PM10 & NO2 (Interstate Diesel Busses)",
    schoolsNearby: 19,
    antiSmogGunsActive: 2,
    antiSmogGunsRequired: 6,
    grapStage: "Stage IV",
    statusText: "Interstate traffic congestion peak. Severe plume detected."
  },
  {
    id: "DEL-JHG",
    name: "Jahangirpuri & Mukarba Chowk",
    zone: "North-West Delhi",
    lat: 28.7259,
    lng: 77.1724,
    aqi: 415,
    category: "Severe",
    color: "#7F1D1D",
    pm25: 368,
    pm10: 480,
    no2: 79,
    co: 2.9,
    temp: 23.8,
    humidity: 76,
    windSpeed: 4.0,
    windDirection: "NW",
    trend: "+12 pts in last 3h",
    majorPollutant: "PM2.5 (Unpaved road dust & transit)",
    schoolsNearby: 11,
    antiSmogGunsActive: 1,
    antiSmogGunsRequired: 3,
    grapStage: "Stage IV",
    statusText: "High particulate density at arterial flyover junction."
  },
  {
    id: "DEL-PBG",
    name: "Punjabi Bagh Ring Road",
    zone: "West Delhi",
    lat: 28.6683,
    lng: 77.1325,
    aqi: 388,
    category: "Very Poor",
    color: "#EF4444",
    pm25: 325,
    pm10: 410,
    no2: 72,
    co: 2.6,
    temp: 24.5,
    humidity: 71,
    windSpeed: 4.6,
    windDirection: "NW",
    trend: "+8 pts in last 3h",
    majorPollutant: "PM2.5 (Urban vehicular emissions)",
    schoolsNearby: 16,
    antiSmogGunsActive: 1,
    antiSmogGunsRequired: 2,
    grapStage: "Stage III",
    statusText: "High vehicular congestion zone. SafeRoute corridor advised."
  },
  {
    id: "DEL-ITO",
    name: "ITO Civic Center",
    zone: "Central Delhi",
    lat: 28.6312,
    lng: 77.2410,
    aqi: 365,
    category: "Very Poor",
    color: "#EF4444",
    pm25: 298,
    pm10: 385,
    no2: 95,
    co: 3.1,
    temp: 24.8,
    humidity: 70,
    windSpeed: 4.8,
    windDirection: "NW",
    trend: "-5 pts in last 3h",
    majorPollutant: "NO2 (Peak commuter corridor)",
    schoolsNearby: 8,
    antiSmogGunsActive: 2,
    antiSmogGunsRequired: 3,
    grapStage: "Stage III",
    statusText: "Central administrative zone with moderate water sprinkler deployment."
  },
  {
    id: "DEL-RKP",
    name: "R.K. Puram Green Enclave",
    zone: "South Delhi",
    lat: 28.5660,
    lng: 77.1767,
    aqi: 335,
    category: "Very Poor",
    color: "#EF4444",
    pm25: 265,
    pm10: 340,
    no2: 58,
    co: 2.1,
    temp: 25.1,
    humidity: 68,
    windSpeed: 5.2,
    windDirection: "NW",
    trend: "-2 pts in last 3h",
    majorPollutant: "PM2.5 (Secondary aerosol formation)",
    schoolsNearby: 12,
    antiSmogGunsActive: 1,
    antiSmogGunsRequired: 2,
    grapStage: "Stage III",
    statusText: "Green canopy provides 18% micro-shielding compared to ring road."
  },
  {
    id: "NOIDA-62",
    name: "Noida Sector 62 Institutional Area",
    zone: "NCR East (Noida)",
    lat: 28.6279,
    lng: 77.3688,
    aqi: 395,
    category: "Very Poor",
    color: "#EF4444",
    pm25: 330,
    pm10: 425,
    no2: 82,
    co: 2.8,
    temp: 24.0,
    humidity: 73,
    windSpeed: 4.1,
    windDirection: "NW",
    trend: "+14 pts in last 3h",
    majorPollutant: "PM10 (Ongoing construction + NH24 flyover)",
    schoolsNearby: 15,
    antiSmogGunsActive: 1,
    antiSmogGunsRequired: 4,
    grapStage: "Stage III",
    statusText: "Construction dust suppression notices active."
  },
  {
    id: "GGN-VKP",
    name: "Gurugram Vikas Sadan",
    zone: "NCR South-West (Gurugram)",
    lat: 28.4595,
    lng: 77.0266,
    aqi: 372,
    category: "Very Poor",
    color: "#EF4444",
    pm25: 310,
    pm10: 398,
    no2: 66,
    co: 2.4,
    temp: 25.4,
    humidity: 67,
    windSpeed: 5.4,
    windDirection: "NW",
    trend: "+6 pts in last 3h",
    majorPollutant: "PM2.5 (Diesel generators & highway freight)",
    schoolsNearby: 18,
    antiSmogGunsActive: 2,
    antiSmogGunsRequired: 3,
    grapStage: "Stage III",
    statusText: "Commercial complexes running DG sets under monitoring."
  }
];

// Return all stations with live telemetry
router.get("/stations", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    count: stations.length,
    stations
  });
});

// Update or dispatch civic equipment to a station
router.post("/stations/:id/dispatch", (req, res) => {
  const { id } = req.params;
  const { gunsToAdd = 1 } = req.body;
  const station = stations.find(s => s.id === id);
  if (!station) {
    return res.status(404).json({ error: "Station not found" });
  }

  station.antiSmogGunsActive += Number(gunsToAdd);
  station.aqi = Math.max(120, station.aqi - 18 * gunsToAdd); // Immediate localized mitigation effect
  station.pm25 = Math.max(100, Math.round(station.pm25 - 15 * gunsToAdd));

  res.json({
    success: true,
    message: `Dispatched ${gunsToAdd} Anti-Smog Unit(s) to ${station.name}`,
    station
  });
});

// AI Copilot endpoint powered by Bedrock
router.post("/ai/advisory", async (req, res) => {
  try {
    const { topic = "General Health", userProfile = "School Student", language = "en", stationId } = req.body;
    const station = stations.find(s => s.id === stationId) || stations[0];
    const advisory = await generateAirAdvisory({ topic, userProfile, language, stationData: station });
    res.json(advisory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
