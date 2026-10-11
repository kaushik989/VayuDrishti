export const COMMUTE_PAIRS = [
  {
    id: "route-dtu",
    title: "Rohini Sec-16 to DTU (Delhi Tech University)",
    context: "Hackathon Venue & North Delhi School Belt",
    origin: { name: "Rohini Sector 16", lat: 28.7290, lng: 77.1265 },
    destination: { name: "DTU Main Campus, Bawana Rd", lat: 28.7501, lng: 77.1177 },
    standardRoute: {
      name: "Fastest via Bawana Main Truck Corridor (NH-44 bypass)",
      distanceKm: 4.8,
      durationMin: 14,
      avgAQI: 452,
      inhalationPMRateUg: 245, // Micrograms PM2.5 inhaled during trip
      toxicExposureScore: "Extreme Danger (Hazardous)",
      riskFactors: ["Heavy BS-IV diesel truck transit", "Unpaved road dust", "Bawana industrial chimney exhaust"],
      coordinates: [
        [28.7290, 77.1265],
        [28.7350, 77.1250],
        [28.7420, 77.1210],
        [28.7480, 77.1190],
        [28.7501, 77.1177]
      ],
      color: "#EF4444"
    },
    cleanRoute: {
      name: "Swachh Marg via Sector Parkways & Bio-Shield Corridors",
      distanceKm: 5.6,
      durationMin: 17, // Just 3 mins more
      avgAQI: 268,
      inhalationPMRateUg: 138, // 43.7% reduction!
      reductionPercentage: 43.7,
      toxicExposureScore: "Moderate-Tolerable",
      protectiveFactors: ["Dense tree canopy buffer", "Low vehicular emission speed limit", "Sprinkler-dampened streetway"],
      coordinates: [
        [28.7290, 77.1265],
        [28.7310, 77.1320],
        [28.7390, 77.1305],
        [28.7460, 77.1260],
        [28.7495, 77.1210],
        [28.7501, 77.1177]
      ],
      color: "#10B981"
    }
  },
  {
    id: "route-cp",
    title: "Anand Vihar to Connaught Place",
    context: "East Delhi to Central Commercial Core",
    origin: { name: "Anand Vihar ISBT", lat: 28.6469, lng: 77.3160 },
    destination: { name: "Connaught Place Inner Circle", lat: 28.6315, lng: 77.2167 },
    standardRoute: {
      name: "Standard via Vikas Marg Expressway",
      distanceKm: 11.2,
      durationMin: 28,
      avgAQI: 435,
      inhalationPMRateUg: 495,
      toxicExposureScore: "Extreme Hazard",
      riskFactors: ["High idling at ITO intersection", "Ghazipur landfill secondary plume", "Exhaust traps under flyovers"],
      coordinates: [
        [28.6469, 77.3160],
        [28.6410, 77.2900],
        [28.6350, 77.2600],
        [28.6312, 77.2410],
        [28.6315, 77.2167]
      ],
      color: "#EF4444"
    },
    cleanRoute: {
      name: "Swachh Marg via Rajghat Green Belt & Barakhamba Boulevard",
      distanceKm: 12.8,
      durationMin: 34,
      avgAQI: 275,
      inhalationPMRateUg: 288,
      reductionPercentage: 41.8,
      toxicExposureScore: "Safe Corridor",
      protectiveFactors: ["Yamuna riverfront vegetative barrier", "Tree-shaded service lanes", "Avoids stop-and-go diesel bottleneck"],
      coordinates: [
        [28.6469, 77.3160],
        [28.6520, 77.2850],
        [28.6450, 77.2500],
        [28.6380, 77.2300],
        [28.6315, 77.2167]
      ],
      color: "#10B981"
    }
  }
];
