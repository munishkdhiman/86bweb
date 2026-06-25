"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Search, Layers, Cpu, ShieldCheck, Zap, Server, Lock, Activity, CheckCircle2, ArrowRight, Bot, Eye, Workflow, Users, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";

// ─── Use-case specific architectures ─────────────────────────────────────────
const architectures = [
  {
    id: "genai",
    label: "Generative AI & RAG",
    icon: Cpu,
    color: "blue",
    description: "Private LLMs connected to your enterprise knowledge — secure, grounded, and verifiable.",
    useCases: ["Enterprise Knowledge Assistants", "Document Q&A Systems", "Policy & Compliance Chatbots", "Internal Copilots"],
    steps: [
      { icon: Database, title: "Knowledge Ingestion", desc: "Documents, databases, and internal wikis are ingested from all source systems. PDFs, SharePoint, emails, SQL — everything is connected inside your private network." },
      { icon: Search, title: "Embedding & Indexing", desc: "Content is semantically chunked and embedded into a private vector database. Metadata tagging enables filtered, access-controlled retrieval by department or clearance level." },
      { icon: Layers, title: "Retrieval-Augmented Generation", desc: "At query time, the system semantically retrieves only the most relevant context — the LLM never sees your full data set, only what's needed for the current question." },
      { icon: Cpu, title: "Private LLM Reasoning", desc: "A locally deployed or hosted model (Llama 3, Mistral, GPT-4o) generates responses strictly grounded in your retrieved documents — with source citations included." },
      { icon: ShieldCheck, title: "Guardrail & Quality Layer", desc: "Every output is evaluated for hallucination rate, PII exposure, and policy compliance before delivery. Uncertain responses are flagged for human review." },
      { icon: Zap, title: "Application Integration", desc: "The AI assistant surfaces via your intranet, Slack, Teams, or custom UI — integrating into the tools your teams already use, with full audit logging." },
    ],
    stack: ["LangChain / LlamaIndex", "Pinecone / Weaviate / pgvector", "GPT-4o / Llama 3 / Mistral", "FastAPI", "Docker / Kubernetes"],
    metrics: [{ v: "85%", l: "Query resolution without escalation" }, { v: "10×", l: "Faster knowledge retrieval" }, { v: "100%", l: "Private — zero public API exposure" }],
  },
  {
    id: "automation",
    label: "Intelligent Automation",
    icon: Workflow,
    color: "violet",
    description: "AI that understands unstructured documents and drives end-to-end workflow execution without human intervention.",
    useCases: ["Invoice & AP Automation", "Contract Processing", "HR Document Workflows", "Compliance Monitoring"],
    steps: [
      { icon: Database, title: "Document Capture & Routing", desc: "Incoming documents (invoices, contracts, forms) are captured from email, portals, or scanners and automatically classified by type before any processing begins." },
      { icon: Search, title: "Intelligent Document Processing", desc: "AI extracts structured data — line items, dates, parties, amounts — from any format: printed PDFs, handwritten forms, spreadsheets, or email attachments." },
      { icon: Layers, title: "Business Rule Validation", desc: "Extracted data is cross-referenced against your master agreements, vendor lists, pricing schedules, and approval matrices. Deviations are flagged immediately." },
      { icon: Cpu, title: "Automated Decision Engine", desc: "High-confidence documents flow straight through to execution. Edge cases and low-confidence extractions are escalated to the right human reviewer with full context." },
      { icon: ShieldCheck, title: "Compliance & Audit Trail", desc: "Every automated decision is logged with the evidence used to make it — producing a complete audit trail for internal and external compliance review." },
      { icon: Zap, title: "ERP / System Sync", desc: "Approved outputs trigger actions in SAP, NetSuite, Oracle, Salesforce, or custom internal systems — closing the loop without manual re-entry." },
    ],
    stack: ["GPT-4o Vision", "Unstructured.io", "UiPath / Custom RPA", "LangChain", "PostgreSQL", "SAP / Oracle APIs"],
    metrics: [{ v: "80%", l: "Manual processing time eliminated" }, { v: "<2s", l: "Per-document extraction time" }, { v: "99.9%", l: "Automated pipeline uptime" }],
  },
  {
    id: "vision",
    label: "Computer Vision",
    icon: Eye,
    color: "emerald",
    description: "Real-time visual AI for quality inspection, anomaly detection, and medical imaging across any camera or edge device.",
    useCases: ["Manufacturing QC Lines", "Medical Image Pre-screening", "Retail Shelf Analytics", "Security & Surveillance"],
    steps: [
      { icon: Database, title: "Visual Data Collection & Labeling", desc: "We work with your existing cameras, imaging systems, or historical image archives. For new deployments, we define the data collection protocol and labeling schema." },
      { icon: Search, title: "Domain-Specific Model Training", desc: "Custom vision models are trained on your labeled image data — tuned specifically for your defect types, product variations, or anatomical targets. Not generic off-the-shelf models." },
      { icon: Layers, title: "Validation & Threshold Calibration", desc: "Models are validated against held-out test sets. Detection thresholds are calibrated against your specific false-positive vs false-negative tolerance — not a default setting." },
      { icon: Cpu, title: "Edge or Cloud Deployment", desc: "For manufacturing or field use: models are optimized and deployed directly on cameras or edge devices (NVIDIA Jetson, Raspberry Pi). For cloud use cases: containerized API deployment." },
      { icon: ShieldCheck, title: "Real-Time Inference & Alerting", desc: "The deployed model processes frames or images in real time, triggering instant alerts, quality flags, or pass/fail decisions within your defined SLA." },
      { icon: Zap, title: "MES / ERP / PACS Integration", desc: "Inspection results feed directly into your Manufacturing Execution System, ERP, or medical PACS — closing the loop from detection to action automatically." },
    ],
    stack: ["PyTorch / YOLO / EfficientDet", "OpenCV", "NVIDIA TensorRT / Triton", "Docker / Kubernetes", "MQTT / REST APIs"],
    metrics: [{ v: "99.2%", l: "Defect detection accuracy" }, { v: "30ms", l: "Per-frame inference time" }, { v: "60%", l: "Reduction in defect escape rate" }],
  },
  {
    id: "analytics",
    label: "Predictive Analytics",
    icon: BarChart3,
    color: "amber",
    description: "ML models trained on your historical data to forecast revenue, demand, risk, and maintenance needs — weeks ahead.",
    useCases: ["Revenue & Cash Flow Forecasting", "Demand & Inventory Planning", "Predictive Maintenance", "Financial Risk Modeling"],
    steps: [
      { icon: Database, title: "Data Source Integration", desc: "We connect to your ERP, CRM, production systems, market feeds, and external data providers. Historical data is extracted, cleaned, and structured for modeling." },
      { icon: Search, title: "Feature Engineering", desc: "Domain experts and data scientists work together to identify the signals that actually predict your target — beyond obvious trends to leading indicators specific to your industry." },
      { icon: Layers, title: "Model Development & Selection", desc: "Multiple model architectures are evaluated (XGBoost, Prophet, LSTM, ensemble methods). The best-performing model for your forecast horizon and data volume is selected." },
      { icon: Cpu, title: "Forecast Engine Deployment", desc: "The model is deployed as a scheduled or real-time inference service inside your environment — generating forecasts on your cadence and feeding them into your planning tools." },
      { icon: ShieldCheck, title: "Accuracy Monitoring & Drift Detection", desc: "Forecast accuracy is tracked continuously against actuals. When accuracy drops below threshold — due to market shifts or data changes — retraining is triggered automatically." },
      { icon: Zap, title: "BI & Planning Tool Integration", desc: "Forecast outputs flow into your existing BI dashboards (Power BI, Tableau, Looker) and planning systems — no new interfaces required." },
    ],
    stack: ["Python / XGBoost / Prophet", "TensorFlow / PyTorch", "Databricks / Snowflake", "Apache Airflow", "Power BI / Tableau APIs"],
    metrics: [{ v: "92%", l: "Average forecast accuracy" }, { v: "3×", l: "Faster planning cycles" }, { v: "30%", l: "Reduction in inventory costs" }],
  },
  {
    id: "hr",
    label: "HR & Talent AI",
    icon: Users,
    color: "pink",
    description: "AI across the full HR lifecycle — from CV screening and bias reduction to flight risk prediction and onboarding.",
    useCases: ["CV Screening at Scale", "Employee Retention Analytics", "Skill Gap Mapping", "Smart Onboarding Copilots"],
    steps: [
      { icon: Database, title: "HRIS & ATS Integration", desc: "We connect to your Workday, SuccessFactors, Greenhouse, or custom ATS to access applicant data, employee records, performance history, and survey data." },
      { icon: Search, title: "NLP-Powered Talent Matching", desc: "Advanced NLP models evaluate CVs against role requirements — scoring candidates on skill match, experience relevance, and cultural fit signals, while removing demographic bias from the ranking." },
      { icon: Layers, title: "Sentiment & Engagement Monitoring", desc: "Anonymized analysis of internal survey responses, feedback, and communication patterns surfaces early signs of low engagement and flight risk — before employees begin actively searching." },
      { icon: Cpu, title: "Retention Prediction Model", desc: "ML models trained on your historical turnover data predict which employees are at risk of leaving 60–90 days before resignation — giving HR time to intervene effectively." },
      { icon: ShieldCheck, title: "Bias Audit & Compliance", desc: "Every AI decision in the talent pipeline is evaluated for demographic bias before deployment. Screening criteria are tested against EEOC and local employment law requirements." },
      { icon: Zap, title: "HR System & Communication Integration", desc: "AI insights surface in your HRIS, and the onboarding copilot deploys via Slack, Microsoft Teams, or a custom web interface for seamless new-hire support." },
    ],
    stack: ["spaCy / Hugging Face", "GPT-4o", "Workday / Greenhouse APIs", "PostgreSQL", "Slack / Teams Bots"],
    metrics: [{ v: "60%", l: "Faster time-to-hire" }, { v: "40%", l: "Reduction in turnover" }, { v: "90%", l: "HR time saved on CV screening" }],
  },
  {
    id: "governance",
    label: "AI Governance",
    icon: ShieldCheck,
    color: "red",
    description: "Bias auditing, explainable AI dashboards, and automated regulatory compliance before — not after — deployment.",
    useCases: ["EU AI Act Compliance", "Bias & Fairness Auditing", "Model Lineage Tracking", "Red-Team Testing"],
    steps: [
      { icon: Database, title: "AI System Inventory", desc: "We catalogue every AI system in production: what data it uses, what decisions it influences, who it affects, and which regulatory framework applies to it." },
      { icon: Search, title: "Bias & Fairness Scanning", desc: "Models and training data are scanned for demographic, linguistic, and systemic bias across protected characteristics. Findings are quantified and ranked by severity." },
      { icon: Layers, title: "Explainability Layer", desc: "XAI dashboards are built on top of your existing models — translating black-box decisions into human-readable explanations for compliance teams, regulators, and affected individuals." },
      { icon: Cpu, title: "Regulatory Mapping", desc: "Your AI systems are mapped against applicable regulations: EU AI Act risk tiers, GDPR data minimization requirements, HIPAA constraints, and sector-specific guidance." },
      { icon: ShieldCheck, title: "Red-Team Adversarial Testing", desc: "AI applications are stress-tested with thousands of adversarial inputs to measure hallucination rates, jailbreak vulnerability, PII leakage, and output bias at scale." },
      { icon: Zap, title: "Ongoing Monitoring & Alerts", desc: "Continuous monitoring tracks model drift, regulatory changes, and new risk signals — automatically flagging when systems need review or remediation." },
    ],
    stack: ["Giskard / DeepEval", "IBM OpenScale / Alibi", "MLflow", "Python", "Custom XAI Dashboards", "OpenAI Evals"],
    metrics: [{ v: "100%", l: "AI systems inventoried & governed" }, { v: "10K+", l: "Adversarial test cases per audit" }, { v: "EU AI Act", l: "Full risk-tier compliance" }],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; dot: string }> = {
  blue:    { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-600",   dot: "bg-blue-500" },
  violet:  { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-600", dot: "bg-violet-500" },
  emerald: { bg: "bg-emerald-50",border: "border-emerald-200",text: "text-emerald-700",badge: "bg-emerald-600",dot: "bg-emerald-500" },
  amber:   { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700",  badge: "bg-amber-600",  dot: "bg-amber-500" },
  pink:    { bg: "bg-pink-50",   border: "border-pink-200",   text: "text-pink-700",   badge: "bg-pink-600",   dot: "bg-pink-500" },
  red:     { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-700",    badge: "bg-red-600",    dot: "bg-red-500" },
};

const deploymentOptions = [
  { icon: Server, title: "On-Premise", desc: "Full stack inside your data center. Your servers, your network, your keys. Zero cloud dependency.", tags: ["Air-gapped available", "Custom sizing", "IT handover"] },
  { icon: Lock, title: "Private VPC", desc: "Isolated cloud in your own AWS, GCP, or Azure account. Managed by us, owned by you.", tags: ["Single-tenant", "Managed updates", "Auto-scaling"] },
  { icon: Activity, title: "Hybrid", desc: "Sensitive data on-premise, less-sensitive workloads on cloud burst capacity for cost efficiency.", tags: ["Flexible", "Cost optimized", "Best of both"] },
];

export default function HowWeBuildPage() {
  const [activeArch, setActiveArch] = useState("genai");
  const arch = architectures.find((a) => a.id === activeArch)!;
  const colors = colorMap[arch.color];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-6">
              <Cpu className="w-3.5 h-3.5" />
              Technical Architecture
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-6 leading-tight">
              Architecture varies{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                by use case.
              </span>
            </h1>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              There is no one-size-fits-all AI pipeline. A generative AI assistant, a vision quality system, and a predictive analytics engine each require fundamentally different architectures. Select your use case below to see how we build it.
            </p>
          </div>
        </div>
      </section>

      {/* ── USE-CASE TABS ─────────────────────────────────────────────────── */}
      <section className="sticky top-[64px] z-40 bg-white border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-hide">
            {architectures.map((a) => {
              const c = colorMap[a.color];
              const isActive = a.id === activeArch;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveArch(a.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? `${c.badge} text-white shadow-md`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <a.icon className="w-3.5 h-3.5" />
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE CONTENT ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeArch}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview */}
          <section className="py-16 bg-white border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-semibold tracking-wide mb-5`}>
                    <arch.icon className="w-3.5 h-3.5" />
                    {arch.label}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4 leading-snug">
                    {arch.description}
                  </h2>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Common Use Cases</div>
                  <div className="space-y-2">
                    {arch.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
                        <span className="text-sm text-slate-600 font-light">{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics */}
          <section className="bg-slate-50 border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {arch.metrics.map((m) => (
                <div key={m.l} className="text-center py-6 md:py-0 md:px-10">
                  <div className={`text-4xl font-light tracking-tight mb-1 ${colors.text}`}>{m.v}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{m.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pipeline steps */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-3">
                  How we build{" "}
                  <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {arch.label}
                  </span>
                </h2>
                <p className="text-sm text-slate-500 font-light max-w-xl mx-auto">Six stages, customized to your data sources, compliance constraints, and infrastructure.</p>
              </div>

              <div className="space-y-4">
                {arch.steps.map((step, i) => (
                  <div key={step.title} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 transition-all">
                    <div className="grid grid-cols-1 lg:grid-cols-[72px_1fr_2fr] gap-0">
                      {/* Step number */}
                      <div className={`${colors.bg} border-r ${colors.border} flex items-center justify-center p-6`}>
                        <div className="text-center">
                          <div className={`text-2xl font-light ${colors.text} leading-none`}>
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>
                      {/* Icon + title */}
                      <div className="border-r border-slate-100 p-6 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                          <step.icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="pt-0.5">
                          <h3 className="text-sm font-semibold text-slate-900 leading-snug">{step.title}</h3>
                        </div>
                      </div>
                      {/* Description */}
                      <div className="p-6">
                        <p className="text-sm text-slate-500 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tech stack for this use case */}
          <section className="py-12 bg-white border-y border-slate-200/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Technology Stack</div>
                <div className="text-sm font-semibold text-slate-700">Tools for {arch.label}</div>
              </div>
              <div className="flex flex-wrap gap-3">
                {arch.stack.map((tech) => (
                  <span key={tech} className={`px-4 py-2 rounded-full ${colors.bg} border ${colors.border} text-sm font-semibold ${colors.text}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* ── DEPLOYMENT OPTIONS (universal) ────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">
              Deployment{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Options
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-xl mx-auto">
              Regardless of use case — every deployment keeps your data inside your defined security boundary.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deploymentOptions.map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl border border-slate-200/60 p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:border-blue-300 transition-colors">
                  <opt.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{opt.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-5">{opt.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {opt.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES (universal) ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 tracking-tight mb-3">What never changes</h2>
            <p className="text-sm text-slate-500 font-light max-w-lg mx-auto">Regardless of architecture, these principles apply to every 86b.ai deployment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Lock, title: "Zero Public API Exposure", desc: "Your data never transits a public AI endpoint. All processing stays inside your defined security boundary." },
              { icon: ShieldCheck, title: "Compliance-First Design", desc: "Architecture decisions are reviewed for GDPR, HIPAA, SOC2, and EU AI Act compliance before build begins." },
              { icon: CheckCircle2, title: "90-Day Outcome Commitment", desc: "We define measurable KPIs before starting. 90 days to first quantifiable results — or we revisit at no cost." },
              { icon: Activity, title: "Production-Grade Reliability", desc: "Self-healing pipelines, drift monitoring, and automated retraining keep your AI accurate long after launch." },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-4">
                  <p.icon className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip heading="Want us to architect your specific use case?" sub="Tell us your challenge. We'll design a tailored architecture and deliver a technical proposal — under NDA, within 5 days." primaryLabel="Request a Technical Design" />
      <Footer />
    </div>
  );
}
