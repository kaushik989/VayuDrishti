import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aqiRouter from "./routes/aqi.js";
import routesRouter from "./routes/routes.js";
import alertsRouter from "./routes/alerts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/aqi", aqiRouter);
app.use("/api/routes", routesRouter);
app.use("/api/alerts", alertsRouter);

// System health endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "VayuDrishti Air Intelligence Core",
    version: "1.0.0",
    awsServices: {
      bedrock: process.env.AWS_ACCESS_KEY_ID ? "Connected (Live)" : "Emulated (Zero-Cost Local Mode)",
      dynamoDb: process.env.AWS_ACCESS_KEY_ID ? "Connected (Live)" : "Emulated (In-Memory Fallback)",
      sns: process.env.AWS_ACCESS_KEY_ID ? "Connected (Live)" : "Emulated (Broadcast Engine)"
    },
    event: "WeMakeDevs Bharat Builds Tour - Environmental Hacks",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VayuDrishti Air Intelligence Backend running on http://localhost:${PORT}`);
});
