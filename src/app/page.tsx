"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, ShieldCheck, Lock, Server, Cpu,
  Workflow, Activity, Database, Search, Layers, Zap, CheckCircle2,
  Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { services } from "@/lib/services-data";

// ─── Ambient Orbs ─────────────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-100/60 to-indigo-50/30 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-violet-100/40 to-blue-50/20 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky-100/50 to-transparent blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const started = React.useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <div ref={ref} className="tabular-nums">{count}{suffix}</div>;
}

// ─── Pipeline steps ───────────────────────────────────────────────────────────
const pipelineSteps = [
  { icon: Database, label: "Data Ingestion", desc: "Raw enterprise data ingested from structured & unstructured sources" },
  { icon: Search, label: "Vector Embedding", desc: "Documents chunked and embedded into high-dimensional vector space" },
  { icon: Layers, label: "RAG Retrieval", desc: "Semantic search retrieves the most relevant context in real time" },
  { icon: Cpu, label: "LLM Reasoning", desc: "Local or hosted model generates grounded, verifiable answers" },
  { icon: ShieldCheck, label: "Guardrail Check", desc: "Hallucination, bias, and drift detectors validate the output" },
  { icon: Zap, label: "Action Sync", desc: "Output triggers ERP, CRM, or custom enterprise endpoints" },
];

// ─── Icon map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical, Workflow,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTab((p) => (p + 1) % pipelineSteps.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/hero_neural_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/92 via-white/70 to-white/25" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#f8fafc]/80" />
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <AmbientOrbs />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Applied Enterprise AI · Built for Fortune-500 Scale
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.06]">
                We build AI that{" "}
                <br className="hidden md:block" />
                <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  works inside
                </span>
                <br className="hidden md:block" />
                your enterprise.
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                From digital human chatbots and revenue auditing to LLM orchestration and investor-ready data structures — we deploy precision AI that drives measurable outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:opacity-95 group">
                  Explore AI Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-semibold hover:border-slate-400 hover:bg-white transition-all">
                  Book Enterprise Audit
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[{ icon: Lock, text: "On-premise deployments" }, { icon: ShieldCheck, text: "SOC2 compliant" }, { icon: Server, text: "No public API exposure" }].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <item.icon className="w-3.5 h-3.5 text-blue-500" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Pipeline card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl shadow-slate-200/80 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                    <span className="text-xs font-semibold text-slate-600 font-mono tracking-wider uppercase">AI Orchestration Engine · Live</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-slate-200" />)}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {pipelineSteps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      onClick={() => setActiveTab(i)}
                      animate={{ backgroundColor: activeTab === i ? "rgba(37, 99, 235, 0.06)" : "rgba(248, 250, 252, 0.8)", borderColor: activeTab === i ? "rgba(37, 99, 235, 0.25)" : "rgba(226, 232, 240, 0.6)" }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${activeTab === i ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30" : "bg-slate-100 text-slate-400"}`}>
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold transition-colors duration-300 ${activeTab === i ? "text-blue-700" : "text-slate-600"}`}>{step.label}</div>
                        <AnimatePresence mode="wait">
                          {activeTab === i && (
                            <motion.div key={step.label} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="text-[10px] text-slate-500 font-light leading-tight mt-0.5 overflow-hidden">
                              {step.desc}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {activeTab === i && <motion.div layoutId="activePipelineDot" className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                    </motion.div>
                  ))}
                </div>
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
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 z-10">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 90, suffix: "%", label: "Manual audit elimination" },
            { value: 42, suffix: "K+", label: "Avg. revenue leakage recovered" },
            { value: 10, suffix: "×", label: "Faster due diligence" },
            { value: 99, suffix: ".9%", label: "Model extraction accuracy" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl md:text-5xl font-light text-blue-600 tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-medium text-slate-500 mt-2 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────────────────────── */}
      <section className="relative py-32 z-10">
        <AmbientOrbs />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              <Workflow className="w-3.5 h-3.5" />
              AI-First Enterprise Services
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-5">
              What we{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                build for you
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Custom AI capabilities engineered to slot directly into your existing workflows, databases, and compliance frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Workflow;
              return (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-50">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                      <Icon className="w-3 h-3" />
                      {svc.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">{svc.title}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{svc.summary}</p>
                  </div>
                  <div className="px-5 pb-5 flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-blue-600 tracking-tight leading-none">{svc.metrics[0].value}</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mt-0.5">{svc.metrics[0].label}</div>
                    </div>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-all group">
              View All Services in Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY 86B ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 z-10 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
                <Activity className="w-3.5 h-3.5" />
                Why 86b.ai
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6 leading-snug">
                We don&apos;t sell{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  software licences.
                </span>
              </h2>
              <p className="text-base text-slate-500 font-light leading-relaxed mb-8">
                We embed solution engineers inside your teams, map every workflow bottleneck, and build AI that actually integrates with your legacy systems, databases, and compliance requirements.
              </p>
              <div className="space-y-4">
                {[
                  "Vendor-neutral — we choose the best model for your use case",
                  "On-premise or private VPC — your data never leaves your walls",
                  "90-day measurable outcomes — or we revisit the plan at no cost",
                  "Full NDA coverage before any technical discussion",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 font-light">{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700 group">
                Learn more about how we work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* How we build teaser */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden">
              <div className="p-8 space-y-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">How Every Project Is Built</div>
                {[
                  { num: "01", title: "Process Audit", desc: "We map your workflows, data silos, and manual bottlenecks." },
                  { num: "02", title: "Architecture Design", desc: "Custom AI stack designed around your compliance & infrastructure." },
                  { num: "03", title: "Build & Deploy", desc: "Engineers stay through delivery — not just advisory." },
                  { num: "04", title: "Monitor & Improve", desc: "Self-healing pipelines with ongoing quality assurance." },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
                    <span className="text-xs font-bold text-blue-400 font-mono w-6 flex-shrink-0 mt-0.5">{step.num}</span>
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{step.title}</div>
                      <div className="text-xs text-slate-400 font-light leading-snug">{step.desc}</div>
                    </div>
                  </div>
                ))}
                <Link href="/how-we-build" className="flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 mt-2 group">
                  See full technical architecture →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <CTAStrip />

      <Footer />
    </div>
  );
}
