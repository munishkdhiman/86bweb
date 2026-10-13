'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight, ArrowRight, ArrowDown, Zap, Brain, Cpu, Lock, Battery,
  Smartphone, RefreshCw, Globe, Mic, CheckCircle2, FileText,
  Download, Gauge, ShieldCheck, Activity, Languages, Users, Mail, Phone,
  Cloud, Package, Layers, Radio, Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import { withBasePath } from '@/lib/base-path';

// ── Problem ─────────────────────────────────────────────────────────────────
const problems = [
  { icon: Zap, title: 'Scaling hits limits', desc: 'Frontier AI needs GPU clusters, power and capital that few can afford.' },
  { icon: Smartphone, title: 'Edge is underserved', desc: 'Phones and wearables have little power or memory. Big models don’t fit.' },
  { icon: RefreshCw, title: 'Models stop learning', desc: 'Deployed models can’t adapt to each user, and naive updates erase old skills.' },
  { icon: Globe, title: 'The majority is ignored', desc: 'On-device AI is tuned for flagship phones and a handful of languages.' },
];

// ── Product capabilities ────────────────────────────────────────────────────
const capabilities = [
  { icon: Gauge, title: 'Adapts in minutes', desc: 'To a new user, device or setting from a handful of examples.' },
  { icon: Brain, title: 'Remembers', desc: 'Earlier skills stay intact while new ones are learned, like memory consolidation in the brain.' },
  { icon: Battery, title: 'Computes sparsely', desc: 'Activates only the parts each input needs, cutting energy and latency.' },
  { icon: Lock, title: 'Stays private', desc: 'Data and learning never leave the phone.' },
];

// ── How it works: two rows of the framework diagram ─────────────────────────
const inferencePath = [
  { title: 'Input stream', desc: 'Audio and sensor data on the device' },
  { title: 'Predictive encoder', desc: 'Learns from unlabelled input' },
  { title: 'Slow learner', desc: 'Sparse experts, few active per input' },
  { title: 'Prediction', desc: 'Output plus a confidence score' },
];
// Listed in flow order (right to left in the diagram).
const adaptationLoop = [
  { title: 'Uncertainty gate', desc: 'Adapts only when the signal is reliable' },
  { title: 'Fast learner', desc: 'Small adapter that updates per user', highlight: true },
  { title: 'Episodic memory', desc: 'Compact buffer of recent examples' },
  { title: 'Consolidation', desc: 'Replay when idle or charging' },
];

const mechanisms = [
  { n: '01', title: 'Complementary fast and slow learners', desc: 'A slow learner holds general knowledge and changes rarely. A small, low-rank fast adapter updates online from each user. Day-to-day learning touches only the adapter, so shared knowledge is protected from catastrophic forgetting.' },
  { n: '02', title: 'Sparse conditional computation', desc: 'The slow learner is a set of compact experts with a lightweight router that activates only a few per input, cutting compute per inference and limiting what each update can disturb.' },
  { n: '03', title: 'Predictive self-supervised encoding', desc: 'Inspired by predictive coding, the encoder learns to predict masked or future segments of its input, so the device learns structure from unlabelled audio and sensor streams.' },
  { n: '04', title: 'Uncertainty-gated adaptation', desc: 'Every prediction carries a calibrated confidence score. The fast learner updates only on reliable signals, such as a user confirming or correcting a result, so it never learns its own mistakes.' },
  { n: '05', title: 'Episodic memory and consolidation', desc: 'A bounded on-device buffer replays recent examples while the phone is idle or charging, moving stable improvements into the slow learner, much like memory consolidation during rest.' },
];

// ── System architecture ─────────────────────────────────────────────────────
const sdkModules = [
  { title: 'Slow learner', desc: 'Sparse experts' },
  { title: 'Fast adapter', desc: 'Per-user updates', highlight: true },
  { title: 'Uncertainty gate', desc: 'Decides when to learn' },
  { title: 'Episodic memory', desc: 'Bounded, on-device' },
  { title: 'Consolidation', desc: 'When idle or charging' },
  { title: 'Energy monitor', desc: 'mJ, latency, memory' },
];
const cloudServices = [
  { title: 'Pre-training pipeline', desc: 'Base models from public data' },
  { title: 'Model registry and OTA', desc: 'Signed releases to devices' },
  { title: 'Developer dashboard', desc: 'Aggregate metrics only' },
  { title: 'Federated learning', desc: 'Opt-in, later phase' },
];

// ── Technology: brain principles ────────────────────────────────────────────
const principles = [
  { principle: 'Memory consolidation', build: 'On-device adaptation without forgetting', measure: 'Forgetting score' },
  { principle: 'Sparse firing', build: 'Each input routed to a few compact experts', measure: 'Energy per inference (mJ)' },
  { principle: 'Predictive coding', build: 'Learning from unlabelled data', measure: 'Examples needed to adapt' },
  { principle: 'Spiking neurons', build: 'Event-driven models for always-on sensors', measure: 'Energy on edge hardware' },
  { principle: 'Knowing when unsure', build: 'Updates gated by calibrated confidence', measure: 'Calibration error' },
];

// ── Built in India ──────────────────────────────────────────────────────────
const indiaPoints = [
  { title: 'India’s constraints are the world’s', desc: 'Budget phones, patchy networks, noise and many languages.' },
  { title: 'Frugal engineering', desc: 'The discipline behind the Mars Orbiter Mission and UPI, applied to AI.' },
  { title: 'Diversity as test bed', desc: '20+ major languages, countless accents, thousands of phone models.' },
  { title: 'Export path built in', desc: 'South and Southeast Asia, Africa and Latin America share these conditions.' },
];

// ── Who it's for ────────────────────────────────────────────────────────────
const customers = [
  { icon: Activity, who: 'Health and wellness apps', need: 'Private, personalised readings on budget phones' },
  { icon: Radio, who: 'Wearable and IoT makers', need: 'AI within tight battery and memory limits' },
  { icon: Cpu, who: 'Phone makers and chip vendors', need: 'Assistants that learn the user locally' },
  { icon: ShieldCheck, who: 'Enterprise and fintech apps', need: 'Personalisation without sending data to the cloud' },
  { icon: Layers, who: 'Industrial and agritech edge', need: 'Models that adapt to new sites and sensors' },
];

// ── Research ────────────────────────────────────────────────────────────────
const hypotheses = [
  { id: 'H1', name: 'Forgetting', desc: 'The fast and slow design forgets less than naive fine-tuning and elastic weight consolidation at equal size and memory.' },
  { id: 'H2', name: 'Energy', desc: 'Sparse computation cuts measured energy per inference and per update on low-cost phones, without losing accuracy.' },
  { id: 'H3', name: 'Data efficiency', desc: 'Predictive self-supervised pre-training reduces the labelled examples needed to reach a target accuracy.' },
  { id: 'H4', name: 'Equity', desc: 'On-device personalisation narrows the gap between best- and worst-served speakers, languages and device tiers.' },
  { id: 'H5', name: 'Reliability', desc: 'Uncertainty-gated updates cause fewer accuracy regressions than ungated adaptation.' },
];
const metrics = ['Adapted accuracy', 'Forgetting', 'Energy per inference (mJ)', 'Energy per update (mJ)', 'Latency (ms)', 'Peak memory (MB)', 'Data efficiency', 'Calibration'];
const benchmarkDims = [
  { icon: Languages, dim: 'Language', desc: 'Multiple Indian languages, lower-resource ones and code-mixed speech' },
  { icon: Users, dim: 'Speaker', desc: 'Regional accents, age groups, gender balance' },
  { icon: Mic, dim: 'Environment', desc: 'Quiet rooms, street noise, households, markets, vehicles' },
  { icon: Smartphone, dim: 'Device tier', desc: 'Low-cost, mid-range and flagship phones across chipsets' },
];

// ── Roadmap ─────────────────────────────────────────────────────────────────
const roadmap = [
  { when: 'Year 1 · Months 0–12', title: 'Research and prototyping', desc: 'Continual-learning model on budget phones; research report; patent filing.', gate: 'Beats baselines on forgetting and energy on 3+ phones' },
  { when: 'Year 2 · Months 12–18', title: 'Pilots', desc: 'Voice demo live; 2–3 design partners; SDK alpha.', gate: 'Partners confirm accuracy gains' },
  { when: 'Year 2 · Months 18–24', title: 'SDK launch', desc: 'Android SDK and developer dashboard; voice and wearable use cases.', gate: 'Licence customers in production' },
  { when: 'Year 3 · Months 24–36', title: 'Scale', desc: 'Hardware co-design; spiking models; Southeast Asia and Africa; fintech and industrial edge.', gate: null },
];

// ── Partners ────────────────────────────────────────────────────────────────
const partnerTypes = [
  { icon: Package, title: 'Design partners', desc: 'Apps that need on-device personalisation for Indian users.' },
  { icon: FileText, title: 'Researchers', desc: 'Continual learning, efficient AI and computational neuroscience.' },
  { icon: Cpu, title: 'Hardware partners', desc: 'Edge and neuromorphic chip makers.' },
];

// ── Fade-up animation variant ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.span
      variants={fadeUp}
      className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest mb-5 ${dark ? 'text-[#29B6F6]' : 'text-[#0288D1]'}`}
    >
      <span className="w-6 h-px bg-[#29B6F6]/50" />
      {children}
    </motion.span>
  );
}

function DiagramNode({ title, desc, highlight = false }: { title: string; desc: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3.5 text-center h-full flex flex-col justify-center transition-colors ${
        highlight
          ? 'border-[#29B6F6] bg-[#29B6F6]/10 shadow-[0_0_24px_rgba(41,182,246,0.18)]'
          : 'border-zinc-200 bg-white'
      }`}
    >
      <p className="text-sm font-medium text-[#0E202E] leading-tight">{title}</p>
      <p className="text-xs text-zinc-500 mt-1 leading-snug">{desc}</p>
    </div>
  );
}

// Animated phone mock-up for the voice demo: the model adapts to a speaker over a few uses.
function VoiceDemo() {
  const [step, setStep] = useState(0);
  const [wave, setWave] = useState([4, 8, 12, 6, 10, 14, 7, 11, 5, 9, 13, 6, 8, 12, 4, 10, 7]);
  const uses = [
    { phrase: '“Papa ko call karo”', confidence: 61, learned: false },
    { phrase: '“Papa ko call karo”', confidence: 78, learned: true },
    { phrase: '“Alarm subah chhe baje”', confidence: 88, learned: true },
    { phrase: '“Papa ko call karo”', confidence: 97, learned: true },
  ];

  useEffect(() => {
    const w = setInterval(() => setWave((v) => v.map(() => Math.floor(Math.random() * 16) + 3)), 160);
    const s = setInterval(() => setStep((p) => (p + 1) % uses.length), 2800);
    return () => { clearInterval(w); clearInterval(s); };
  }, [uses.length]);

  const u = uses[step];
  return (
    <div className="relative mx-auto w-[280px] rounded-[2.5rem] border-[10px] border-[#0E202E] bg-[#060d18] shadow-2xl overflow-hidden">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#0E202E] z-10" />
      <div className="px-5 pt-10 pb-7 min-h-[500px] flex flex-col">
        <div className="flex items-center justify-between text-[10px] text-white/40 mb-8">
          <span className="font-mono">86b SDK · on-device</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> offline</span>
        </div>

        <p className="text-[11px] uppercase tracking-widest text-[#29B6F6] mb-2">Use {step + 1}</p>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-white text-xl font-light leading-snug mb-8 min-h-[56px]"
        >
          {u.phrase}
        </motion.p>

        <div className="flex items-center justify-center gap-[3px] h-16 mb-8">
          {wave.map((h, i) => (
            <div key={i} className="w-[5px] rounded-full bg-[#29B6F6] transition-all duration-150" style={{ height: `${h * 3}px`, opacity: 0.5 + (h / 40) }} />
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-white/50">Confidence</span>
          <span className="text-white font-mono">{u.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
          <motion.div
            className="h-full bg-[#29B6F6] rounded-full"
            animate={{ width: `${u.confidence}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <CheckCircle2 className={`w-3.5 h-3.5 ${u.learned ? 'text-[#29B6F6]' : 'text-white/20'}`} />
            Adapter updated for this speaker
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#29B6F6]" />
            Earlier commands retained
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#29B6F6]" />
            No audio leaves the device
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060d18]">
        <Image
          src="/neuron_hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50 md:opacity-70 md:object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d18] via-[#060d18]/85 to-[#060d18]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d18] via-transparent to-[#060d18]/40" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#29B6F6]/10 border border-[#29B6F6]/30 text-[11px] font-semibold uppercase tracking-widest text-[#29B6F6]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#29B6F6] animate-pulse-ring" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#29B6F6]" />
                </span>
                In development · Early access open
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Brain-inspired AI · Built in India
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-tight mb-7">
              Intelligence,<br />
              <span className="text-[#29B6F6] font-light">the way nature built it.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
              We’re building AI that keeps learning on the device and runs on a fraction of the energy: one base model, personalised on every phone. Join the early preview of the 86b SDK.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <a
                href="#early-access"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white text-sm font-semibold transition-colors shadow-lg"
              >
                Join early access
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#product"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/60 text-white text-sm font-semibold backdrop-blur-sm transition-all"
              >
                Explore the 86b SDK
              </a>
            </motion.div>
          </motion.div>
        </div>

        <a href="#benchmark" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white transition-colors">
          <ArrowDown className="w-5 h-5 animate-float" />
        </a>
      </section>

      {/* ── THE BENCHMARK ────────────────────────────────────────────────────── */}
      <section id="benchmark" className="bg-white border-b border-zinc-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-14">
            <Eyebrow>The benchmark</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-light text-[#0E202E] leading-tight">
              The brain runs general intelligence on 20 watts.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 rounded-2xl overflow-hidden border border-zinc-200">
            {[
              { value: '86B', label: 'neurons in the human brain', accent: true },
              { value: '~20 W', label: 'to power all of it, less than a light bulb', accent: true },
              { value: 'MW', label: 'megawatt data centres to train and serve today’s frontier AI', accent: false },
            ].map((s, i) => (
              <motion.div
                key={s.value}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white p-10 text-center"
              >
                <p className={`text-6xl md:text-7xl font-extralight tracking-tight mb-3 ${s.accent ? 'text-accent-gradient' : 'text-zinc-400'}`}>{s.value}</p>
                <p className="text-zinc-500 text-sm max-w-[220px] mx-auto leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="text-center text-lg text-[#0E202E] font-light mt-10"
          >
            And unlike the brain, today’s models <span className="text-[#0288D1]">stop learning the moment they ship.</span>
          </motion.p>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
            <Eyebrow>The problem</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight">
              AI scales up.<br />It doesn’t scale down.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.5}
                className="rounded-2xl border border-zinc-200 bg-white p-7 card-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-[#29B6F6]/10 border border-[#29B6F6]/25 flex items-center justify-center mb-6">
                  <p.icon className="w-5 h-5 text-[#0288D1]" />
                </div>
                <h3 className="text-lg font-medium text-[#0E202E] mb-2">{p.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT: 86b SDK ─────────────────────────────────────────────────── */}
      <section id="product" className="relative py-24 overflow-hidden bg-[#060d18] scroll-mt-20">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#29B6F6]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow dark>Coming soon · The 86b SDK</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-6">
                One engine that<br /><span className="text-[#29B6F6]">keeps learning on the device.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
                The 86b SDK, now in development, will ship one compact base model to Android apps and edge devices, then personalise it on every device. It is designed to learn each user locally, keep what it already knew, and do it within a budget phone’s power and memory limits.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((c, i) => (
                  <motion.div
                    key={c.title}
                    variants={fadeUp} custom={3 + i * 0.5}
                    className="glass-spatial rounded-2xl p-5"
                  >
                    <c.icon className="w-5 h-5 text-[#29B6F6] mb-3" />
                    <h3 className="text-white text-base font-medium mb-1">{c.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={5} className="mt-8">
                <a href="#early-access" className="inline-flex items-center gap-2 text-[#29B6F6] text-sm font-semibold hover:text-white transition-colors">
                  Get notified when the preview opens
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-square border border-white/10 shadow-2xl">
                <Image src="/images/enterprise-ai-abstract.png" alt="Sparse neural network routing input through a few active experts" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d18]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <p className="text-[#29B6F6] text-[11px] uppercase tracking-widest font-semibold mb-1.5">Designed for</p>
                  <p className="text-white text-lg font-light">₹8,000–15,000 Android phones</p>
                  <p className="text-white/60 text-xs mt-1">Targeting CPU, GPU and NPU via LiteRT, ExecuTorch and ONNX Runtime. Neuromorphic chips later.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
            <Eyebrow>How it works</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight mb-5">
              Fast per-user learning, consolidated into a sparse slow learner.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed">
              The engine we’re building separates what a model knows from how it adapts, so each device can learn quickly without overwriting shared knowledge.
            </motion.p>
          </motion.div>

          {/* Diagram — desktop */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="hidden lg:block rounded-3xl border border-zinc-200 bg-[#F9FAFB] p-10"
          >
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold mb-4">Inference path</p>
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-stretch">
              {inferencePath.map((n, i) => (
                <div key={n.title} className="contents">
                  <DiagramNode {...n} />
                  {i < inferencePath.length - 1 && (
                    <div className="flex items-center justify-center"><ArrowRight className="w-4 h-4 text-zinc-300" /></div>
                  )}
                </div>
              ))}
            </div>

            {/* Connectors between rows — one cell per diagram column */}
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] h-20 text-[11px] text-zinc-400">
              {/* Consolidation rises up and runs right */}
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 bottom-0 w-px bg-zinc-300" />
                <div className="absolute left-1/2 right-0 top-1/2 h-px bg-zinc-300" />
              </div>
              <div className="relative"><div className="absolute inset-x-0 top-1/2 h-px bg-zinc-300" /></div>
              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-300" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[150%] whitespace-nowrap">consolidate into slow weights</span>
              </div>
              <div className="relative"><div className="absolute inset-x-0 top-1/2 h-px bg-zinc-300" /></div>
              {/* Into the slow learner: consolidation (left) and adapter (right) */}
              <div className="relative">
                <div className="absolute left-0 w-[30%] top-1/2 h-px bg-zinc-300" />
                <div className="absolute left-[30%] top-0 h-1/2 w-px bg-zinc-300" />
                <span className="arrow-up absolute left-[30%] top-0 border-b-zinc-300" />
                <div className="absolute left-[70%] top-0 bottom-0 w-px bg-[#29B6F6]" />
                <span className="arrow-up absolute left-[70%] top-0 border-b-[#29B6F6]" />
                <span className="absolute left-[70%] top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap text-[#0288D1]">adapter applied</span>
              </div>
              <div />
              {/* Prediction feeds the uncertainty gate */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300" />
                <span className="arrow-down absolute left-1/2 bottom-0 border-t-zinc-300" />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-stretch">
              {[...adaptationLoop].reverse().map((n, i, arr) => (
                <div key={n.title} className="contents">
                  <DiagramNode {...n} />
                  {i < arr.length - 1 && (
                    <div className="flex items-center justify-center"><ArrowRight className="w-4 h-4 text-zinc-300 rotate-180" /></div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold mt-4">Adaptation loop</p>
          </motion.div>

          {/* Diagram — mobile / tablet */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Inference path', nodes: inferencePath },
              { label: 'Adaptation loop', nodes: adaptationLoop },
            ].map((col) => (
              <div key={col.label} className="rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-5">
                <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold mb-4">{col.label}</p>
                <div className="flex flex-col items-stretch">
                  {col.nodes.map((n, i) => (
                    <div key={n.title} className="flex flex-col items-center">
                      <div className="w-full"><DiagramNode {...n} /></div>
                      {i < col.nodes.length - 1 && <ArrowDown className="w-4 h-4 text-zinc-300 my-1.5" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mechanisms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mt-16">
            {mechanisms.map((m, i) => (
              <motion.div
                key={m.n}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.4}
                className="border-t border-zinc-200 pt-6"
              >
                <span className="text-xs font-mono font-semibold text-[#0288D1]">{m.n}</span>
                <h3 className="text-lg font-medium text-[#0E202E] mt-2 mb-2">{m.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE ──────────────────────────────────────────────── */}
      <section className="relative py-24 bg-[#0E202E] overflow-hidden">
        <div className="absolute inset-0 mesh-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#29B6F6]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-14">
            <Eyebrow dark>Planned system architecture</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-white leading-tight">
              Learning stays on the phone.<br />The cloud only ships models.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
            {/* On the device */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-white">
                <Smartphone className="w-4 h-4 text-[#29B6F6]" />
                <span className="text-sm font-medium">On the device</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-center text-sm text-white/70">
                Partner app: voice, wearable, health, fintech
              </div>
              <div className="rounded-2xl border border-[#29B6F6]/40 p-4">
                <p className="text-xs font-semibold text-[#29B6F6] mb-3">86b SDK</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sdkModules.map((m) => (
                    <div
                      key={m.title}
                      className={`rounded-xl px-3 py-3 text-center border ${
                        m.highlight ? 'bg-[#29B6F6]/15 border-[#29B6F6]/50' : 'bg-white/[0.04] border-white/10'
                      }`}
                    >
                      <p className="text-white text-sm font-medium leading-tight">{m.title}</p>
                      <p className="text-white/45 text-xs mt-0.5">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-center">
                <p className="text-sm text-white/80">Runtimes: LiteRT · ExecuTorch · ONNX Runtime</p>
                <p className="text-xs text-white/45 mt-0.5">CPU, GPU and NPU today; neuromorphic chips later</p>
              </div>
            </motion.div>

            {/* Cloud */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="rounded-3xl border border-white/10 bg-[#060d18]/70 p-6 md:p-8 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 text-white mb-1">
                <Cloud className="w-4 h-4 text-[#29B6F6]" />
                <span className="text-sm font-medium">86b cloud</span>
              </div>
              {cloudServices.map((c) => (
                <div key={c.title} className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3">
                  <p className="text-white text-sm font-medium">{c.title}</p>
                  <p className="text-white/45 text-xs mt-0.5">{c.desc}</p>
                </div>
              ))}
              <p className="mt-auto pt-3 text-sm text-[#29B6F6] font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" /> Raw data never leaves the device
              </p>
            </motion.div>
          </div>

          <p className="text-center text-xs text-white/40 mt-8">
            Base models and signed updates flow down to devices. Only anonymous, aggregate performance metrics flow up. Architecture is tentative and will evolve through the pilots.
          </p>
        </div>
      </section>

      {/* ── TECHNOLOGY: BRAIN PRINCIPLES ─────────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-12">
            <Eyebrow>The technology</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight">
              Five brain principles,<br />each measured on real phones.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="rounded-2xl border border-zinc-200 bg-white overflow-hidden"
          >
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr] px-8 py-4 bg-zinc-50 border-b border-zinc-200 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              <span>Brain principle</span>
              <span>What we build</span>
              <span>Measured by</span>
            </div>
            {principles.map((p) => (
              <div key={p.principle} className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-1 md:gap-0 px-6 md:px-8 py-5 border-b border-zinc-100 last:border-0 hover:bg-[#29B6F6]/[0.04] transition-colors">
                <span className="text-[#0E202E] font-medium flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#29B6F6]" />{p.principle}</span>
                <span className="text-zinc-600 text-sm md:text-base">{p.build}</span>
                <span className="text-sm font-mono text-[#0288D1] md:text-zinc-500">{p.measure}</span>
              </div>
            ))}
          </motion.div>
          <p className="text-sm text-zinc-500 mt-6">
            Every result we publish will be reported alongside its cost: accuracy together with forgetting, energy, latency and memory, measured with an external power monitor on low-cost hardware.
          </p>
        </div>
      </section>

      {/* ── FLAGSHIP DEMO ────────────────────────────────────────────────────── */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#29B6F6]/6 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Eyebrow>Flagship demo · In development</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight mb-6">
                Voice commands that<br />learn each speaker.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-xl">
                Voice recognition fails most on regional accents, code-mixed speech and noisy rooms: the everyday reality for Indian users. Our first testbed is designed to fix that on the phone itself.
              </motion.p>
              <div className="space-y-5 mb-10">
                {[
                  'Starts from one compact base model',
                  'Adapts to each speaker over a few uses, on the phone',
                  'Keeps every earlier command; no audio leaves the device',
                ].map((t, i) => (
                  <motion.div key={t} variants={fadeUp} custom={3 + i * 0.5} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0E202E] text-white text-sm flex items-center justify-center">{i + 1}</span>
                    <p className="text-[#0E202E] pt-1">{t}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} custom={5} className="text-sm text-zinc-500 border-l-2 border-[#29B6F6] pl-4">
                One demo to prove every claim: on-device learning, no forgetting, low energy, budget phones. Design partners will see it first.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <VoiceDemo />
              <p className="text-center text-xs text-zinc-400 mt-4">Concept illustration of the planned demo</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BUILT IN INDIA + WHO IT'S FOR ────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-[#060d18]">
        <Image src="/neuron_hero.png" alt="" fill className="object-cover object-center opacity-[0.10] pointer-events-none select-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18]/80 via-transparent to-[#060d18]/80 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow dark>An innovation from India</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-10">
                Built in India,<br /><span className="text-[#29B6F6]">for the world’s majority.</span>
              </motion.h2>
              <div className="flex flex-col">
                {indiaPoints.map((p, i) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp} custom={2 + i * 0.4}
                    className="group flex items-start gap-5 py-5 border-b border-white/[0.08] last:border-0"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#29B6F6]/15 border border-[#29B6F6]/30 flex items-center justify-center text-[#29B6F6] text-[10px] font-medium mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="block text-white text-xl font-light group-hover:text-[#29B6F6] transition-colors">{p.title}</span>
                      <span className="block text-white/50 text-sm mt-1 leading-relaxed">{p.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow dark>Who it’s for</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-10">
                Every device maker needs smaller, personal AI.
              </motion.h2>
              <div className="flex flex-col gap-3">
                {customers.map((c, i) => (
                  <motion.div
                    key={c.who}
                    variants={fadeUp} custom={2 + i * 0.4}
                    className="glass-spatial rounded-2xl px-5 py-4 flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#29B6F6]/15 border border-[#29B6F6]/30 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-[#29B6F6]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{c.who}</p>
                      <p className="text-white/50 text-sm">{c.need}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} custom={5} className="text-white/50 text-sm mt-6">
                We’ll start with consumer apps in India whose voice and sensor features must work for every user.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────────────────── */}
      <section id="research" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
            <Eyebrow>Research</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight mb-5">
              Intelligence per watt.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed">
              Our perspective paper defines the problem, the approach and the evaluation standard we will report results against: falsifiable hypotheses, an open protocol that makes energy and forgetting first-class metrics, and a benchmark grounded in Indian conditions.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
            {/* Paper card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-3xl bg-[#0E202E] p-8 md:p-10 text-white relative overflow-hidden lg:sticky lg:top-28"
            >
              <div className="absolute inset-0 mesh-grid" />
              <div className="relative">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-[#29B6F6] border border-[#29B6F6]/30 mb-6">
                  Perspective · October 2026
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-white leading-snug mb-4">
                  Intelligence per Watt: A Brain-Inspired Framework for Continual On-Device Learning on Low-Cost Hardware
                </h3>
                <p className="text-white/50 text-sm mb-6">Munish Dhiman · 86b.ai, India</p>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  The brain supports general intelligence with roughly 86 billion neurons on about 20 watts. We argue the next gains in practical AI will come from systems that learn continually, compute sparsely and adapt to individual users on the devices they already own.
                </p>
                <a
                  href={withBasePath('/papers/intelligence-per-watt.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Read the paper (PDF)
                </a>
              </div>
            </motion.div>

            {/* Hypotheses + protocol */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Hypotheses we will test</p>
                <div className="flex flex-col">
                  {hypotheses.map((h, i) => (
                    <motion.div
                      key={h.id}
                      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                      className="flex gap-5 py-4 border-b border-zinc-100 last:border-0"
                    >
                      <span className="text-sm font-mono font-semibold text-[#0288D1] w-8 flex-shrink-0 pt-0.5">{h.id}</span>
                      <div>
                        <p className="text-[#0E202E] font-medium">{h.name}</p>
                        <p className="text-zinc-500 text-sm leading-relaxed mt-0.5">{h.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Evaluation protocol</p>
                <div className="flex flex-wrap gap-2">
                  {metrics.map((m) => (
                    <span key={m} className="px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-600 text-sm">{m}</span>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                  Measured on at least three low-cost Android phones across chipset families, reported per device and per user subgroup so no population is hidden in an average.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">An Indian-context benchmark</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benchmarkDims.map((b) => (
                    <div key={b.dim} className="rounded-xl border border-zinc-200 bg-[#F9FAFB] p-4 flex gap-3">
                      <b.icon className="w-4 h-4 text-[#0288D1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0E202E] text-sm font-medium">{b.dim}</p>
                        <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                  Collected with informed consent, ethics committee approval and fair compensation, in line with India’s Digital Personal Data Protection Act, 2023.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB] border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-16">
            <Eyebrow>Roadmap</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight">
              From prototype to global scale in three years.
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[27px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#29B6F6] via-[#29B6F6]/50 to-zinc-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {roadmap.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.4}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative ${i === 0 ? 'bg-[#29B6F6] shadow-[#29B6F6]/30' : 'bg-[#0E202E] shadow-zinc-900/15'}`}>
                    <span className="text-white text-lg font-light">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#5A6A7A] mb-2">
                    {r.when}
                    {i === 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-[#29B6F6]/10 text-[#0288D1] text-[10px] uppercase tracking-widest">We are here</span>}
                  </p>
                  <h3 className="text-lg font-medium text-[#0E202E] mb-2">{r.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{r.desc}</p>
                  {r.gate && (
                    <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-[#29B6F6] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-600"><span className="text-zinc-400">Gate:</span> {r.gate}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
            <Eyebrow>The team</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight">
              Twenty years of building with emerging tech.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Munish Dhiman', role: 'Co-founder · CEO', initials: 'MD', bio: '20 years of technology research, product development, sales and delivery. An award-winning career with recognition from government and industry.' },
              { name: 'Aarti Dhiman', role: 'Co-founder · CTO', initials: 'AD', bio: '12 years of AI research and emerging-tech engineering, from computer vision and gesture recognition to virtual, augmented and mixed reality.' },
            ].map((f, i) => (
              <motion.div
                key={f.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.4}
                className="rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-8 flex gap-6 items-start card-hover"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0E202E] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#29B6F6] text-lg font-light">{f.initials}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#0E202E]">{f.name}</h3>
                  <p className="text-sm text-[#0288D1] mb-3">{f.role}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {[
              'NITI Aayog Champions of Change, 2017',
              'Top 15, IBM SmartCamp Delhi',
              'TechSparks winner',
              'Featured in the Sunday Times of India',
            ].map((r) => (
              <span key={r} className="px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-500 text-sm">{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS ─────────────────────────────────────────────────────── */}
      <section id="early-access" className="relative bg-[#0E202E] py-24 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 mesh-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full bg-[#29B6F6]/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p variants={fadeUp} className="text-[#29B6F6] text-sm font-mono mb-5">86 billion neurons. 20 watts. Our benchmark.</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-white leading-tight mb-5">
                Sign up for the<br /><span className="text-[#29B6F6]">early preview.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                The 86b SDK isn’t available yet. Join the list to hear first about the preview, pilot programme and research results. We’re especially keen to hear from:
              </motion.p>

              <div className="flex flex-col gap-3 mb-10">
                {partnerTypes.map((p, i) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp} custom={3 + i * 0.4}
                    className="glass-spatial rounded-2xl px-5 py-4 flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#29B6F6]/15 border border-[#29B6F6]/30 flex items-center justify-center flex-shrink-0">
                      <p.icon className="w-4 h-4 text-[#29B6F6]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{p.title}</p>
                      <p className="text-white/50 text-sm">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={5} className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="mailto:hello@86b.ai" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#29B6F6]" /> hello@86b.ai
                </a>
                <a href="tel:+919990322337" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#29B6F6]" /> +91 99903 22337
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <EarlyAccessForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES (secondary) ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0">
              <Layers className="w-4 h-4 text-zinc-500" />
            </div>
            <div>
              <p className="text-[#0E202E] font-medium">Also from 86b.ai: enterprise AI services</p>
              <p className="text-zinc-500 text-sm">Our engineers build private GenAI, process automation, computer vision, digital twins and more for enterprises.</p>
            </div>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0288D1] hover:text-[#0E202E] transition-colors whitespace-nowrap"
          >
            Explore services
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
