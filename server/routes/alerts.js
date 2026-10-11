import { Router } from "express";
import { broadcastSchoolAlert } from "../aws/snsClient.js";
import { saveCitizenReport, getCitizenReports } from "../aws/dynamoClient.js";

const router = Router();

// Dispatch school morning emergency alert
router.post("/schools/broadcast", async (req, res) => {
  try {
    const { schoolName = "Delhi Public School (Rohini)", aqi = 442, grapStage = "Stage IV", actionRequired } = req.body;
    const defaultAction = actionRequired || "Suspend outdoor morning assembly. Shift physical classes to hybrid/online. Run HEPA air purifiers.";
    
    const result = await broadcastSchoolAlert({
      schoolName,
      aqi,
      grapStage,
      actionRequired: defaultAction,
      recipients: 340 // 340 parents & teachers
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a citizen crowdsourced report
router.post("/reports", async (req, res) => {
  try {
    const { category, location, lat, lng, severity, description, photoUrl } = req.body;
    const reportData = {
      category: category || "Biomass / Trash Burning",
      location: location || "Unspecified Location",
      lat: lat || 28.7500,
      lng: lng || 77.1180,
      severity: severity || "High",
      description: description || "Thick black smoke observed near colony boundary wall.",
      photoUrl: photoUrl || "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400"
    };

    const saved = await saveCitizenReport(reportData);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all citizen reports
router.get("/reports", async (req, res) => {
  try {
    const data = await getCitizenReports();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
