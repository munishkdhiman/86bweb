"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Lock, Server, CheckCircle2,
  Activity, Workflow, Play, Volume2, VolumeX, Pause,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import ScrollingBanner from "@/components/ScrollingBanner";
import { featuredServices } from "@/lib/services-data";

// ── Icon map ──────────────────────────────────────────────────────────────────
import {
  Network, Bot, Globe, BarChart3, Briefcase, BookOpen,
  FlaskConical, Cpu, TrendingUp, Search, Layers, Users, ShieldCheck as Shield, Activity as Act,
} from "lucide-react";
const iconMap: Record<string, React.ElementType> = {
  Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical,
  Workflow, Cpu, TrendingUp, Search, Layers, Users, ShieldCheck: Shield, Activity: Act,
};

// ── Animated counter ──────────────────────────────────────────────────────────
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
  return <div ref={ref}>{count}{suffix}</div>;
}

// ── Cycling hero images ───────────────────────────────────────────────────────
const heroBgs = [
  { src: "/hero_enterprise_bg.png", label: "Enterprise AI" },
  { src: "/svc_digital_human.png",  label: "Digital Humans" },
  { src: "/svc_llm_infra.png",      label: "AI Infrastructure" },
  { src: "/svc_vision.png",         label: "Computer Vision" },
];

// ── Video component with play/pause ──────────────────────────────────────────
function VideoCard({
  poster, title, subtitle, duration, tag, videoUrl, large = false,
}: {
  poster: string; title: string; subtitle: string; duration: string;
  tag: string; videoUrl?: string; large?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoUrl && videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false); }
      else { videoRef.current.play(); setPlaying(true); }
    } else {
      // No actual video yet — just show playing UI as a preview
      setPlaying((p) => !p);
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-slate-900 cursor-pointer ${large ? "aspect-video" : "aspect-video"}`} onClick={togglePlay}>
      {/* Poster image */}
      <img
        src={poster}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${playing ? "opacity-30 scale-105" : "opacity-80 group-hover:opacity-60 group-hover:scale-[1.02]"}`}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent" />

      {/* Tag */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <div className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
          {tag}
        </div>
        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/70 text-[10px] font-medium">
          {duration}
        </div>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            playing
              ? "bg-white/20 backdrop-blur-md border border-white/30"
              : "bg-white shadow-2xl shadow-black/40"
          }`}
        >
          {playing
            ? <Pause className="w-6 h-6 text-white" />
            : <Play className="w-6 h-6 text-blue-600 ml-1" />
          }
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-white font-semibold text-base leading-snug mb-1">{title}</div>
        <div className="text-white/55 text-sm font-light">{subtitle}</div>
      </div>

      {/* "Add your video" overlay hint */}
      {!videoUrl && playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="text-center px-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-white font-semibold mb-2">Video Coming Soon</div>
            <div className="text-white/50 text-sm font-light">Your explainer video will appear here</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveBg((p) => (p + 1) % heroBgs.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {heroBgs.map((img, i) => (
          <div key={img.src} className="absolute inset-0 transition-opacity duration-1200 ease-in-out" style={{ opacity: activeBg === i ? 1 : 0 }}>
            <img src={img.src} alt={img.label} className="w-full h-full object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Applied Enterprise Artificial Intelligence
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.06] mb-6">
                AI that works{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  inside
                </span>
                <br />your enterprise.
              </h1>
              <p className="text-lg text-white/65 font-light leading-relaxed mb-9 max-w-2xl">
                From generative AI and digital humans to revenue auditing, computer vision, and LLM orchestration — we build custom, private AI systems that integrate with your existing infrastructure, not around it.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/services" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-xl shadow-blue-900/30 hover:opacity-90 transition-all group">
                  Explore AI Services <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/20 transition-all">
                  Book Free AI Audit
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { icon: Lock, text: "On-premise deployments" },
                  { icon: ShieldCheck, text: "SOC2 compliant" },
                  { icon: Server, text: "Zero public API exposure" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5 text-xs font-medium text-white/50">
                    <item.icon className="w-3.5 h-3.5 text-blue-400" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          {/* Dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroBgs.map((img, i) => (
              <button key={i} onClick={() => setActiveBg(i)} className={`transition-all duration-300 rounded-full ${activeBg === i ? "w-6 h-2 bg-blue-400" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`} aria-label={img.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCROLLING BANNER ══════════════════════════════════════════════════ */}
      <ScrollingBanner />

      {/* ══ STATS STRIP ═══════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 15, suffix: "+", label: "AI Service Specializations" },
            { value: 90, suffix: "%", label: "Manual Process Elimination" },
            { value: 10, suffix: "×", label: "Faster Decision Cycles" },
            { value: 100, suffix: "%", label: "Private Deployments" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl md:text-5xl font-light text-blue-600 tracking-tight tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-medium text-slate-500 mt-2 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ VIDEO SECTION — PRIMARY ════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-6">
              <Play className="w-3.5 h-3.5" />
              See 86b.ai In Action
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              Watch how we{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                build enterprise AI
              </span>
            </h2>
            <p className="text-base text-slate-400 font-light max-w-xl mx-auto">
              Platform overview and real use case demonstrations — see how AI gets deployed inside enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main large video */}
            <div className="lg:col-span-2">
              <VideoCard
                large
                poster="/video_explainer.png"
                title="How 86b.ai Builds Enterprise AI"
                subtitle="Full platform overview — from AI audit to production deployment"
                duration="3:45"
                tag="Platform Overview"
              />
            </div>
            {/* Secondary video stack */}
            <div className="flex flex-col gap-6">
              <VideoCard
                poster="/video_demo.png"
                title="Digital Human Agent Demo"
                subtitle="Live demonstration of a 0.3s latency enterprise AI avatar"
                duration="2:12"
                tag="Product Demo"
              />
              {/* Coming soon card */}
              <div className="rounded-2xl border border-slate-700/60 border-dashed bg-white/[0.02] p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[160px]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Play className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-white/60">Customer Case Study</div>
                <div className="text-xs text-slate-500 font-light">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES GRID ═════════════════════════════════════════════════════ */}
      <section className="relative py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              <Workflow className="w-3.5 h-3.5" />
              Enterprise AI Services
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-5">
              What we{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                build for you
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-2xl mx-auto">
              Custom AI capabilities engineered around your infrastructure, compliance requirements, and business processes — not generic SaaS tools bolted on top.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Workflow;
              return (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 text-[10px] font-semibold text-blue-700 uppercase tracking-wide">
                      <Icon className="w-3 h-3" />{svc.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1.5 leading-snug">{svc.title}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">{svc.summary}</p>
                  </div>
                  <div className="px-5 pb-5 flex items-end justify-between">
                    <div>
                      <div className="text-xl font-semibold text-blue-600">{svc.metrics[0].value}</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{svc.metrics[0].label}</div>
                    </div>
                    <Link href={`/services/${svc.slug}`} className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-all group">
              View All 15+ Services <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY 86B ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
                <Activity className="w-3.5 h-3.5" />Why 86b.ai
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6 leading-snug">
                We don&apos;t sell{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  software licences.
                </span>
              </h2>
              <p className="text-base text-slate-500 font-light leading-relaxed mb-8">
                We embed solution engineers inside your teams, map every workflow bottleneck, and build AI that integrates with your legacy systems, databases, and compliance requirements.
              </p>
              <div className="space-y-3.5">
                {[
                  "Vendor-neutral — we select the best model for your use case",
                  "On-premise or private VPC — your data stays inside your walls",
                  "90-day measurable outcomes or we revisit the plan at no cost",
                  "Full NDA coverage before any technical discussion begins",
                  "Engineers stay through delivery — not just advisory",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 font-light">{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700 group">
                About how we work <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Image showcase */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/svc_genai.png", label: "Generative AI" },
                { src: "/svc_digital_human.png", label: "Digital Humans" },
                { src: "/svc_governance.png", label: "AI Governance" },
                { src: "/svc_automation.png", label: "Process Automation" },
              ].map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-xl group ${i === 0 ? "col-span-2 h-48" : "h-36"}`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-semibold text-white/80">{img.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VIDEO SECTION — SECONDARY (Use Case Demos) ════════════════════════ */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
                <Play className="w-3.5 h-3.5" />
                Use Case Demonstration
              </div>
              <h2 className="text-4xl font-light text-slate-900 tracking-tight mb-5 leading-snug">
                See a Digital Human{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  answer live
                </span>
              </h2>
              <p className="text-base text-slate-500 font-light leading-relaxed mb-6">
                Watch how an 86b.ai Digital Human agent handles real customer queries — with 0.3 second response latency, multilingual support, and full brand alignment — resolving 94% of queries without human escalation.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Responds in 0.3 seconds — feels genuinely conversational",
                  "Programmed with your product knowledge and brand voice",
                  "Handles 40+ languages without switching platforms",
                  "Hands off to human agents with full context preserved",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 font-light">{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/services/digital-humans" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all group">
                Explore Digital Human Service <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div>
              <VideoCard
                large
                poster="/svc_digital_human.png"
                title="Digital Human Agent Live Demo"
                subtitle="0.3s latency · 40+ languages · 94% resolution rate"
                duration="2:12"
                tag="Live Demo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ TECH STRIP ════════════════════════════════════════════════════════ */}
      <section className="py-14 overflow-hidden border-t border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-8">Technology We Deploy</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["GPT-4o", "Claude 3.5", "Llama 3", "Mistral", "Gemini Pro", "LangChain", "LlamaIndex", "Pinecone", "Weaviate", "PyTorch", "TensorFlow", "Hugging Face", "MLflow", "Kubernetes", "AWS Bedrock", "Azure AI", "Vertex AI", "Snowflake"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-700 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI AUDIT CTA ══════════════════════════════════════════════════════ */}
      <CTAStrip />

      <Footer />
    </div>
  );
}
