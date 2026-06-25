"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Server,
  Workflow,
  Activity,
  Menu,
  X,
  Globe,
  BookOpen,
  Layers,
  Search,
  Briefcase,
  ChevronDown,
  BarChart3,
  Network,
  Bot,
  FlaskConical,
  Zap,
} from "lucide-react";

// ─── Floating Orb Backdrop ───────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-100/60 to-indigo-50/30 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-violet-100/40 to-blue-50/20 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky-100/50 to-transparent blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
    </div>
  );
}

// ─── Subtle Grid Mesh ─────────────────────────────────────────────────────────
function GridMesh() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </div>
  );
}

// ─── Service Card Data ────────────────────────────────────────────────────────
interface ServiceCard {
  id: string;
  icon: React.ElementType;
  tag: string;
  image: string;
  title: string;
  body: string;
  metric: string;
  metricLabel: string;
}

const services: ServiceCard[] = [
  {
    id: "strategy",
    icon: Network,
    tag: "AI Transformation",
    image: "/svc_ai_strategy.png",
    title: "AI-First Business Strategy",
    body: "We map your legacy workflows, identify automation opportunities, and deliver a precision 90-day AI re-engineering roadmap backed by MLOps architecture.",
    metric: "90-Day",
    metricLabel: "Results Guaranteed",
  },
  {
    id: "digital-human",
    icon: Bot,
    tag: "Conversational AI",
    image: "/svc_digital_human.png",
    title: "Digital Human Agents",
    body: "Deploy lifelike conversational avatars programmed with your brand voice, product knowledge, and support workflows. Available 24/7 with 0.3s response latency.",
    metric: "94%",
    metricLabel: "Resolution Rate",
  },
  {
    id: "travel",
    icon: Globe,
    tag: "Logistics AI",
    image: "/svc_travel_routing.png",
    title: "AI Travel & Route Planning",
    body: "Autonomous travel planning and logistics manifest matching. Cross-references port schedules, tariff exclusions, and tax codes in real time to cut transit delays.",
    metric: "30%",
    metricLabel: "Fewer Delays",
  },
  {
    id: "revenue",
    icon: BarChart3,
    tag: "Financial Intelligence",
    image: "/svc_revenue_audit.png",
    title: "Revenue Tracking & Auditing",
    body: "Ingest invoices, POs, and master agreements at scale. Our AI flags billing discrepancies, MSA covenant breaches, and revenue leakage in seconds—not weeks.",
    metric: "$42K+",
    metricLabel: "Avg. Leakage Recovered",
  },
  {
    id: "investor",
    icon: Briefcase,
    tag: "Investor Readiness",
    image: "/svc_investor_data.png",
    title: "Data Organization & Funding",
    body: "Transform scattered cap tables, contracts, and operational data into clean, VC-ready structures. Compress due diligence timelines from months to days.",
    metric: "10×",
    metricLabel: "Faster Due Diligence",
  },
  {
    id: "german",
    icon: BookOpen,
    tag: "Workforce AI",
    image: "/svc_german_tutor.png",
    title: "AI German Language Training",
    body: "Personalized language coaching for aspirants targeting German careers. The engine simulates native interviews, tracks CEFR progress, and connects with real recruiters.",
    metric: "85%",
    metricLabel: "Interview Pass Rate",
  },
  {
    id: "testing",
    icon: FlaskConical,
    tag: "QA & Governance",
    image: "/svc_ai_testing.png",
    title: "AI App Testing & QA",
    body: "We red-team your AI applications with 10,000+ adversarial prompts, measure hallucination rates, detect model drift, and deliver compliance-ready SOC2 reports.",
    metric: "0.02%",
    metricLabel: "Hallucination Boundary",
  },
  {
    id: "orchestration",
    icon: Workflow,
    tag: "AI Infrastructure",
    image: "/svc_data_orchestration.png",
    title: "LLM Orchestration & RAG",
    body: "End-to-end AI infrastructure design: local or hosted LLMs, vector search pipelines, RAG architecture, API orchestration, and self-healing data sync layers.",
    metric: "100%",
    metricLabel: "Private & Secure",
  },
];

// ─── Orchestration Pipeline Steps ────────────────────────────────────────────
const pipelineSteps = [
  { icon: Database, label: "Data Ingestion", desc: "Raw enterprise data is ingested from structured & unstructured sources" },
  { icon: Search, label: "Vector Embedding", desc: "Documents chunked and embedded into high-dimensional vector space" },
  { icon: Layers, label: "RAG Retrieval", desc: "Semantic search retrieves the most relevant context in real time" },
  { icon: Cpu, label: "LLM Reasoning", desc: "Local or hosted model generates grounded, verifiable answers" },
  { icon: ShieldCheck, label: "Guardrail Check", desc: "Hallucination, bias, and drift detectors validate the output" },
  { icon: Zap, label: "Action Sync", desc: "Final output triggers ERP, CRM, or custom enterprise endpoints" },
];

// ─── Capability Pillars ───────────────────────────────────────────────────────
const pillars = [
  {
    icon: Server,
    title: "Model Deployment",
    body: "Deploy Llama, Mistral, or GPT architectures on-premise or inside your private VPC. Zero data exposure to public APIs.",
  },
  {
    icon: Workflow,
    title: "Orchestration & RAG",
    body: "RAG pipelines that expose LLMs to your private documents safely via high-dimensional vector search with low-latency retrieval.",
  },
  {
    icon: Activity,
    title: "MLOps & Monitoring",
    body: "Self-healing pipelines with automated regression checks, model drift alerts, and continuous output quality assurance.",
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    body: "SOC2-ready, HIPAA-auditable architectures. Strict context containers ensure no training on customer data—ever.",
  },
];

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate pipeline tabs
  useEffect(() => {
    const t = setInterval(() => setActiveTab((p) => (p + 1) % pipelineSteps.length), 2800);
    return () => clearInterval(t);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#pipeline", label: "How We Build" },
    { href: "#capabilities", label: "Capabilities" },
    { href: "#audit", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-x-hidden">

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <Cpu className="w-4 h-4 text-white" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              86b<span className="text-blue-600">.ai</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#audit"
              className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:border-slate-300 bg-white hover:bg-slate-50 transition-all"
            >
              Contact Sales
            </a>
            <a
              href="#audit"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:opacity-90"
            >
              Book AI Audit →
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="md:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl px-6 py-6 space-y-4"
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-slate-700 py-2 border-b border-slate-100 hover:text-blue-600"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#audit"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold mt-4"
              >
                Book AI Audit
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Full-bleed hero background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/hero_neural_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Light overlay to keep text readable without hiding the image */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#f8fafc]/80" />

        <GridMesh />
        <AmbientOrbs />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Applied Enterprise AI · Built for Fortune-500 Scale
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.06]">
                We build AI that{" "}
                <br className="hidden md:block" />
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  works inside
                </span>
                <br className="hidden md:block" />
                your enterprise.
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                From digital human chatbots and revenue auditing to LLM orchestration
                and investor-ready data structures—we deploy precision AI that drives
                measurable outcomes.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:opacity-95 group"
                >
                  Explore AI Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#audit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-semibold hover:border-slate-400 hover:bg-white transition-all"
                >
                  Book Enterprise Audit
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: Lock, text: "On-premise deployments" },
                  { icon: ShieldCheck, text: "SOC2 compliant" },
                  { icon: Server, text: "No public API exposure" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <item.icon className="w-3.5 h-3.5 text-blue-500" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Live AI Processor Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl" />

              <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl shadow-slate-200/80 overflow-hidden">

                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                    <span className="text-xs font-semibold text-slate-600 font-mono tracking-wider uppercase">AI Orchestration Engine · Live</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  </div>
                </div>

                {/* Pipeline visualization */}
                <div className="p-5 space-y-3">
                  {pipelineSteps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      onClick={() => setActiveTab(i)}
                      animate={{
                        backgroundColor: activeTab === i ? "rgba(37, 99, 235, 0.06)" : "rgba(248, 250, 252, 0.8)",
                        borderColor: activeTab === i ? "rgba(37, 99, 235, 0.25)" : "rgba(226, 232, 240, 0.6)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          activeTab === i
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs font-semibold transition-colors duration-300 ${
                            activeTab === i ? "text-blue-700" : "text-slate-600"
                          }`}
                        >
                          {step.label}
                        </div>
                        <AnimatePresence mode="wait">
                          {activeTab === i && (
                            <motion.div
                              key={step.label}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="text-[10px] text-slate-500 font-light leading-tight mt-0.5 overflow-hidden"
                            >
                              {step.desc}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {activeTab === i && (
                        <motion.div
                          layoutId="activePipelineDot"
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Bottom metric strip */}
                <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-100 font-mono">ENTERPRISE DEPLOYMENT READY</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    All Systems Operational
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 z-10"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── IMPACT STATS STRIP ───────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 90, suffix: "%", label: "Manual audit elimination" },
            { value: 42, suffix: "K+", label: "Avg. revenue leakage recovered" },
            { value: 10, suffix: "×", label: "Faster due diligence" },
            { value: 99, suffix: ".9%", label: "Model extraction accuracy" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-light text-blue-600 tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-medium text-slate-500 mt-2 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES SECTION ─────────────────────────────────────────────────── */}
      <section id="services" className="relative py-32 z-10">
        <AmbientOrbs />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              <Workflow className="w-3.5 h-3.5" />
              AI-First Enterprise Services
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-5">
              What we{" "}
              <span
                className="font-semibold"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                build for you
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              We don't sell software licences. We engineer custom AI capabilities that slot directly into your existing workflows, databases, and compliance frameworks.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
              >
                {/* Service image */}
                <div className="relative h-44 overflow-hidden bg-slate-50">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />

                  {/* Tag on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                    <svc.icon className="w-3 h-3" />
                    {svc.tag}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">{svc.title}</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{svc.body}</p>
                </div>

                {/* Metric footer */}
                <div className="px-5 pb-5 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-blue-600 tracking-tight leading-none">{svc.metric}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mt-0.5">{svc.metricLabel}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY: GERMAN AI ─────────────────────────────────────────────── */}
      <section className="relative py-28 z-10 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-200/60 shadow-xl shadow-slate-200/50">

            {/* Left: visual */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-10 md:p-14 flex flex-col justify-between min-h-[420px]">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "url('/svc_german_tutor.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  mixBlendMode: "luminosity",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 to-indigo-800/90" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-wide border border-white/20 mb-8">
                  <BookOpen className="w-3.5 h-3.5" />
                  Case Study · Workforce AI
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white leading-snug">
                  AI German Language Training for{" "}
                  <span className="font-semibold text-blue-200">Job Placement</span>
                </h2>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 mt-10">
                {[
                  { value: "85%", label: "Interview pass rate" },
                  { value: "98%", label: "Pronunciation accuracy" },
                  { value: "B2/C1", label: "CEFR target standard" },
                  { value: "Munich", label: "Top placement city" },
                ].map((m) => (
                  <div key={m.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15">
                    <div className="text-xl font-semibold text-white">{m.value}</div>
                    <div className="text-[10px] text-blue-200 font-medium uppercase tracking-wider mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: content */}
            <div className="bg-white p-10 md:p-14 flex flex-col justify-center space-y-7">
              <h3 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug">
                We built a personalized AI engine that{" "}
                <span className="font-semibold text-blue-600">prepares candidates for German interviews</span>
                —in weeks, not years.
              </h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                The engine extracts role-specific German vocabulary from real job postings, simulates native technical interviews with pronunciation scoring, and tracks CEFR-level progress automatically. Candidates are matched directly with German recruiters in Berlin and Munich.
              </p>
              <div className="space-y-3">
                {[
                  "Personalized CEFR grammar & pronunciation feedback",
                  "Simulated native-speaker business interview scenarios",
                  "Direct recruiter matching for Berlin & Munich placements",
                  "Progress analytics exported to hiring managers",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 font-light">{point}</span>
                  </div>
                ))}
              </div>
              <a
                href="#audit"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group mt-2"
              >
                Discuss a similar project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILD (PIPELINE) ───────────────────────────────────────────── */}
      <section id="pipeline" className="relative py-32 z-10">
        <GridMesh />
        <AmbientOrbs />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              <Cpu className="w-3.5 h-3.5" />
              Enterprise AI Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-5">
              How we{" "}
              <span
                className="font-semibold"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                architect AI
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Every deployment follows a secure, model-agnostic pipeline that keeps your data private and your outputs reliable.
            </p>
          </div>

          {/* Pipeline Steps: horizontal chain */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Connector line (except last) */}
                  {i < pipelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+28px)] right-[-28px] h-px bg-gradient-to-r from-blue-300 to-slate-200 z-0" />
                  )}

                  {/* Step icon */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/15 transition-all duration-300 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-blue-500" />
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mb-1">{step.label}</h4>
                  <p className="text-[10px] text-slate-500 font-light leading-snug">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Capabilities Pillars */}
          <div id="capabilities" className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:border-blue-300 transition-colors">
                  <p.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ────────────────────────────────────────────────────── */}
      <section className="relative py-20 z-10 bg-slate-900 overflow-hidden">
        {/* Subtle tech grid on dark bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-8">
            <Lock className="w-3.5 h-3.5" />
            Security & Compliance
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-5">
            Your data never leaves{" "}
            <span
              className="font-semibold"
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              your walls.
            </span>
          </h2>
          <p className="text-base text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mb-16">
            Every 86b.ai deployment operates within strict data containment boundaries. We use on-premise or private VPC environments with zero training on your proprietary data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: "On-Premise & Private VPC",
                desc: "Models run inside your infrastructure—your servers, your cloud account, your keys. No third-party data transmission.",
              },
              {
                icon: ShieldCheck,
                title: "SOC2 & HIPAA Ready",
                desc: "Architecture designed for regulated industries. Audit-ready logging, access controls, and encryption at rest and in transit.",
              },
              {
                icon: Lock,
                title: "Strict Context Isolation",
                desc: "LLMs access only what they need, when they need it. Vector search pipelines keep your documents from ever being memorized.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-7 text-left hover:bg-white/8 hover:border-white/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/25 transition-colors">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / AUDIT FORM ─────────────────────────────────────────────── */}
      <section id="audit" className="relative py-32 z-10 bg-[#f8fafc]">
        <AmbientOrbs />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Copy */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
                  <Activity className="w-3.5 h-3.5" />
                  Start Your Engagement
                </div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-snug mb-5">
                  Schedule a free{" "}
                  <span
                    className="font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    AI Audit
                  </span>
                </h2>
                <p className="text-base text-slate-500 font-light leading-relaxed">
                  Our solution engineers will analyze your workflow bottlenecks, data readiness, and automation potential—then hand you a concrete AI roadmap under a signed NDA.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Server, text: "On-premise deploy or dedicated AWS VPC isolation" },
                  { icon: Workflow, text: "Zero model training using your proprietary data" },
                  { icon: CheckCircle2, text: "90-day measurable outcomes or we revisit the plan" },
                  { icon: Lock, text: "Strict NDA signed before any technical discussion" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-sm text-slate-600 font-light">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-8 md:p-10">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Request a Consultation</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Alex"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Johnson"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Corporate Email</label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Primary AI Challenge</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all">
                    <option value="">Select your biggest bottleneck...</option>
                    <option value="strategy">AI-First Re-engineering & Strategy</option>
                    <option value="digital-human">Digital Human Chatbots & Avatars</option>
                    <option value="revenue">Revenue Leakage & Invoice Auditing</option>
                    <option value="investor">Data Organization & Investor Readiness</option>
                    <option value="german">German Language Training & Job Placement</option>
                    <option value="testing">AI App Testing & QA Evaluation</option>
                    <option value="orchestration">LLM Orchestration & RAG Infrastructure</option>
                    <option value="travel">Travel Planning & Logistics AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Brief Description (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current workflow and what you'd like to automate or improve..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:opacity-95 cursor-pointer"
                >
                  Request Free AI Audit →
                </button>

                <p className="text-center text-xs text-slate-400 font-light">
                  NDA signed before any technical discussion. No spam—ever.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 bg-white border-t border-slate-200/60 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="font-semibold text-slate-900 text-base">86b.ai</span>
            <span className="text-xs text-slate-400 font-mono">// Applied Enterprise Intelligence</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
            {["Privacy Policy", "Security Architecture", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="hover:text-blue-600 transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all text-xs font-medium"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-mono">
          © {new Date().getFullYear()} 86b.ai. All rights reserved. · Private VPC Deployment Certified · SOC2 Compliant Architecture
        </div>
      </footer>

    </div>
  );
}
