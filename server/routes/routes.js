import { Router } from "express";

const router = Router();

const COMMUTE_ROUTES = [
  {
    id: "route-dtu",
    title: "Rohini Sec-16 to DTU (Delhi Tech University)",
    context: "Hackathon Venue & North Delhi School Belt",
    origin: { name: "Rohini Sector 16", lat: 28.7290, lng: 77.1265 },
    destination: { name: "DTU Main Campus, Bawana Rd", lat: 28.7501, lng: 77.1177 },
    standardRoute: {
      name: "Standard via Bawana Truck Arterial (NH-44 Bypass)",
      distanceKm: 4.8,
      durationMin: 14,
      avgAQI: 452,
      inhalationPMRateUg: 245,
      toxicExposureScore: "Severe Hazard",
      riskFactors: ["Heavy BS-IV diesel trucks", "Road dust from unpaved median", "Bawana industrial chimney downwind"],
      color: "#EF4444"
    },
    cleanRoute: {
      name: "Swachh Marg via Sector Greenways & Parkway",
      distanceKm: 5.6,
      durationMin: 17,
      avgAQI: 268,
      inhalationPMRateUg: 138,
      reductionPercentage: 43.7,
      toxicExposureScore: "Moderate-Tolerable",
      protectiveFactors: ["Dense tree canopy buffer", "Restricted heavy truck entry", "MCD sprinkler-wetted street"],
      color: "#10B981"
    }
  },
  {
    id: "route-cp",
    title: "Anand Vihar to Connaught Place",
    context: "East Delhi to Central Core Commute",
    origin: { name: "Anand Vihar ISBT", lat: 28.6469, lng: 77.3160 },
    destination: { name: "Connaught Place Central", lat: 28.6315, lng: 77.2167 },
    standardRoute: {
      name: "Standard via Vikas Marg Expressway",
      distanceKm: 11.2,
      durationMin: 28,
      avgAQI: 435,
      inhalationPMRateUg: 495,
      toxicExposureScore: "Extreme Hazard",
      riskFactors: ["Peak ITO intersection bottleneck", "Ghazipur landfill secondary plume", "Exhaust traps under flyovers"],
      color: "#EF4444"
    },
    cleanRoute: {
      name: "Swachh Marg via Rajghat Green Corridor",
      distanceKm: 12.8,
      durationMin: 34,
      avgAQI: 275,
      inhalationPMRateUg: 288,
      reductionPercentage: 41.8,
      toxicExposureScore: "Safe Corridor",
      protectiveFactors: ["Yamuna riverfront vegetative barrier", "Tree-shaded service lanes", "Avoids stop-and-go diesel bottleneck"],
      color: "#10B981"
    }
  }
];

// List available routes
router.get("/commute", (req, res) => {
  res.json({ routes: COMMUTE_ROUTES });
});

// Calculate route with custom pollution weighting
router.post("/calculate", (req, res) => {
  const { origin, destination, vehicleType = "pedestrian_or_cycle", sensitivity = "high" } = req.body;
  
  // Custom exposure algorithm
  const baseExposure = sensitivity === "child_or_asthma" ? 1.4 : 1.0;
  const result = {
    origin: origin || "Selected Origin",
    destination: destination || "Selected Destination",
    vehicleType,
    standardRoute: {
      distanceKm: 6.2,
      durationMin: 18,
      inhalationToxicUg: Math.round(310 * baseExposure),
      avgAQI: 438,
      riskLevel: "CRITICAL EXPOSURE"
    },
    swachhMarg: {
      distanceKm: 7.1,
      durationMin: 21,
      inhalationToxicUg: Math.round(175 * baseExposure),
      avgAQI: 252,
      reductionPercent: 43.5,
      riskLevel: "SAFE SHELTERED CORRIDOR",
      recommendations: [
        "Take tree-covered arterial lanes",
        "Avoid idling at unpaved construction choke points",
        "Wear N95 even in personal vehicle with recycled air (HEPA cabin filter on)"
      ]
    }
  };

  res.json(result);
});

export default router;
