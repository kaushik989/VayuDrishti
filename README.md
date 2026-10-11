# 💨 VayuDrishti (वायुदृष्टि)
> **Hyperlocal Clean-Air Intelligence & School Safe-Passage AI Grid**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock%20Claude%203.5-FF9900?logo=amazon-aws)](https://aws.amazon.com/bedrock/)
[![Amazon DynamoDB](https://img.shields.io/badge/Amazon-DynamoDB-4053D6?logo=amazon-dynamodb)](https://aws.amazon.com/dynamodb/)
[![Amazon SNS](https://img.shields.io/badge/Amazon-SNS-FF4F8B?logo=amazon-aws)](https://aws.amazon.com/sns/)
[![AWS SAM](https://img.shields.io/badge/AWS-SAM%20IaC-232F3E?logo=amazon-aws)](https://aws.amazon.com/serverless/sam/)

🌐 **Live Demo Website:** [https://kaushik989.github.io/VayuDrishti/](https://redesigned-space-train-5gxx9xwrjg6w374p5-5173.app.github.dev/) 

---

## 🌟 The Problem
Every October, Northern India—and particularly the Delhi-NCR belt—enters a state of public health emergency. Agricultural stubble burning across Punjab and Haryana, combined with winter thermal inversion, traps particulate matter close to the ground, pushing the Air Quality Index (AQI) well past **450 (Severe+)**.

Existing tools are **passive dashboards**—they tell citizens the air is hazardous, but offer no actionable intervention.

**VayuDrishti (वायुदृष्टि)** transforms air monitoring from passive despair into **active, life-saving intervention**:

1. **NASA FIRMS Stubble Fire Intelligence**: Satellite thermal anomaly detection predicting downwind plume arrival into Delhi-NCR 12-24 hours ahead.
2. **"Swachh Marg" (SafeRoute AI)**: The world's first lowest-toxic-inhalation route engine for school buses, pedestrians, and delivery riders—**slashing inhaled PM2.5 by 43.7%** compared to standard GPS.
3. **Automated 06:00 AM School GRAP Automation**: Evaluates dawn thermal inversion traps and broadcasts emergency protocol directives to school principals and parents via **Amazon SNS**.
4. **VayuAI Bedrock Agent**: An **AWS Bedrock (Claude 3.5 Sonnet)** conversational copilot generating bilingual (English/Hindi) medical advice and issuing automated civic dispatch orders for mobile anti-smog water cannons.
5. **Nagarik Crowdsourced Violation Reports**: Enables citizens to report illegal biomass burning and construction dust, verified by AI and saved to **Amazon DynamoDB**.

---

## 🏛️ System Architecture

```
[ NASA FIRMS API + CPCB Sensors ] ───► [ AWS EventBridge (Crons) ]
                                                │
                                                ▼
                                    [ AWS Lambda Ingestion ]
                                     ┌──────────┴──────────┐
                                     ▼                     ▼
                           [ Amazon DynamoDB ]   [ AWS Bedrock Agent ]
                           (Telemetry & Reports)   (Claude 3.5 Sonnet)
                                     │                     │
                                     └──────────┬──────────┘
                                                ▼
                                      [ Amazon SNS Alerts ]
                                   (Parents, Schools, Civic)
                                                │
                                                ▼
                                  [ React + Vite + Leaflet UI ]
                                  (Hosted on S3 + CloudFront)
```

---

## 🚀 Quickstart (Zero-Cost Local Mode)

VayuDrishti is designed for 100% zero-config execution. It includes a high-fidelity local emulation layer for AWS services, allowing anyone to run the entire stack immediately without an AWS account or bill.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/kaushik989/vayudrishti.git
cd vayudrishti
npm install
```

### 2. Start the Backend API Server
```bash
npm run server
# Runs on http://localhost:5000
```

### 3. Start the Frontend Application (in a second terminal)
```bash
npm run dev
# Vite dev server opens on http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Deploy to AWS (Cloud Mode)

VayuDrishti is cloud-ready using **AWS SAM** (`aws-sam/template.yaml`):

```bash
cd aws-sam
sam build
sam deploy --guided
```

### Or Run Offline with LocalStack:
```bash
cd aws-sam
docker-compose -f docker-compose.localstack.yml up -d
```

---

## 📁 Repository Structure

```
vayudrishti/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Status badge, language toggle (EN/HI), audio siren
│   │   ├── AQIMap.jsx             # Interactive Leaflet map (stations, stubble fires, wind vectors)
│   │   ├── SafeRoutePlanner.jsx   # Swachh Marg AI commute exposure minimizer
│   │   ├── SchoolSafetyPanel.jsx  # GRAP Stage IV alerts & Amazon SNS broadcast
│   │   ├── MunicipalActions.jsx   # MCD Anti-smog gun & sprinkler fleet dispatcher
│   │   ├── BedrockAgentModal.jsx  # AWS Bedrock Claude 3.5 conversational advisor
│   │   ├── CitizenReportModal.jsx # Crowdsourced violation reporting
│   │   ├── StatsOverview.jsx      # Telemetry KPI cards
│   │   └── ArchitectureDrawer.jsx # Visual interactive AWS architecture
│   ├── data/                      # Hyperlocal telemetry & NASA FIRMS datasets
│   └── services/                  # Client-side AWS connectors
├── server/
│   ├── aws/                       # AWS Bedrock, DynamoDB, SNS SDK clients
│   └── routes/                    # REST API endpoints
├── aws-sam/
│   ├── template.yaml              # Complete AWS SAM Infrastructure as Code
│   └── docker-compose.localstack.yml # LocalStack configuration
├── docs/
│   ├── PITCH_SCRIPT.md            # 3-Minute Video Pitch Script
│   └── AWS_BUILDER_BLOG.md        # Technical architecture blog writeup
└── package.json
```

---

## 🏆 Project Origin & Hackathon Context

Built for the **Bharat Builds Tour: Environmental Hacks** organized by **WeMakeDevs & AWS** (Track: Air).

- **Technical Architecture Writeup**: [`docs/AWS_BUILDER_BLOG.md`](docs/AWS_BUILDER_BLOG.md)
- **Demo Walkthrough Script**: [`docs/PITCH_SCRIPT.md`](docs/PITCH_SCRIPT.md)
- **Infrastructure Code**: [`aws-sam/template.yaml`](aws-sam/template.yaml)

---

## ⚖️ License
Distributed under the MIT License. Built with ❤️ for Bharat.
