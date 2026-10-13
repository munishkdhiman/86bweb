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
import NeuralField from '@/components/NeuralField';

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
  { title: 'Ready for the wider world', desc: 'Built to work wherever phones are affordable, networks are patchy and languages are many.' },
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

// ── Partners ────────────────────────────────────────────────────────────────
const partnerTypes = [
  { icon: Package, title: 'Design partners', desc: 'Apps that need on-device personalisation for Indian users.' },
  { icon: FileText, title: 'Researchers', desc: 'Continual learning, efficient AI and computational neuroscience.' },
  { icon: Cpu, title: 'Hardware partners', desc: 'Edge and neuromorphic chip makers.' },
];

// ── Fade-up animation variant ─────────────────────────────────────────────────
// ── Spectrum hues, cycled across cards and rows ──────────────────────────────
const hues = [
  { fg: '#E8553A', bg: '#FFEDE7', ring: '#FFD3C4' }, // coral
  { fg: '#C7378A', bg: '#FCE7F2', ring: '#F8C9E2' }, // magenta
  { fg: '#6347F0', bg: '#EFEBFF', ring: '#D9CFFF' }, // violet
  { fg: '#0E9488', bg: '#E2F7F3', ring: '#BDEDE4' }, // teal
  { fg: '#C77700', bg: '#FFF3DC', ring: '#FBE0A9' }, // amber
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

function Eyebrow({ children, color = '#6347F0' }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
      style={{ color }}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      {children}
    </motion.span>
  );
}

function DiagramNode({ title, desc, highlight = false }: { title: string; desc: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3.5 text-center h-full flex flex-col justify-center ${
        highlight ? 'border-spectrum shadow-[0_10px_30px_-10px_rgba(123,97,255,0.45)]' : 'border border-[#ECE6DD] bg-white'
      }`}
    >
      <p className={`text-sm font-medium leading-tight ${highlight ? 'text-spectrum' : 'text-[#16181D]'}`}>{title}</p>
      <p className="text-xs text-[#6B7079] mt-1 leading-snug">{desc}</p>
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
  const barColors = ['#FF6B4A', '#E14FA0', '#7B61FF', '#14B8A6'];

  useEffect(() => {
    const w = setInterval(() => setWave((v) => v.map(() => Math.floor(Math.random() * 16) + 3)), 160);
    const s = setInterval(() => setStep((p) => (p + 1) % uses.length), 2800);
    return () => { clearInterval(w); clearInterval(s); };
  }, [uses.length]);

  const u = uses[step];
  return (
    <div className="relative mx-auto w-[280px] rounded-[2.75rem] border-[10px] border-[#16181D] bg-white shadow-[0_40px_80px_-30px_rgba(22,24,29,0.45)] overflow-hidden">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#16181D] z-10" />
      <div className="px-5 pt-10 pb-7 min-h-[500px] flex flex-col wash-violet">
        <div className="flex items-center justify-between text-[10px] text-[#6B7079] mb-8">
          <span className="font-mono">86b SDK · on-device</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> offline</span>
        </div>

        <p className="text-[11px] uppercase tracking-widest text-[#6347F0] mb-2">Use {step + 1}</p>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-light text-[#16181D] text-[28px] leading-tight mb-8 min-h-[70px]"
        >
          {u.phrase}
        </motion.p>

        <div className="flex items-center justify-center gap-[3px] h-16 mb-8">
          {wave.map((h, i) => (
            <div key={i} className="w-[5px] rounded-full transition-all duration-150" style={{ height: `${h * 3}px`, background: barColors[Math.floor((i / wave.length) * barColors.length)] }} />
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-[#6B7079]">Confidence</span>
          <span className="text-[#16181D] font-mono">{u.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#16181D]/10 overflow-hidden mb-6">
          <motion.div
            className="h-full bg-spectrum rounded-full"
            animate={{ width: `${u.confidence}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-auto space-y-2">
          {[
            { label: 'Adapter updated for this speaker', on: u.learned, color: '#E14FA0' },
            { label: 'Earlier commands retained', on: true, color: '#7B61FF' },
            { label: 'No audio leaves the device', on: true, color: '#14B8A6' },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 text-xs text-[#3B3F47]">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: row.on ? row.color : '#C9CCD2' }} />
              {row.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F0C2A 0%, #170F36 30%, #24123A 58%, #1E1232 72%, #0A2129 100%)' }}>
        <div className="aurora aurora-dark" aria-hidden="true">
          <span className="a1" /><span className="a2" /><span className="a3" /><span className="a4" />
        </div>
        <NeuralField dark className="absolute inset-0 w-full h-full" />
        {/* Keep the copy legible over the field */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 48% 42% at 30% 52%, rgba(16,12,42,0.8) 0%, rgba(16,12,42,0.55) 45%, rgba(16,12,42,0) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full pointer-events-none">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl pointer-events-auto">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#E14FA0] animate-pulse-ring" />
                  <span className="relative w-2 h-2 rounded-full bg-spectrum" />
                </span>
                In development · Early access open
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Brain-inspired AI · Built in India
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-[3.25rem] md:text-7xl lg:text-[5.25rem] font-extralight text-white leading-[1.02] tracking-tight mb-8">
              Intelligence,<br />
              <span className="text-spectrum font-normal">the way nature built it.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              We’re building AI that keeps learning on the device and runs on a fraction of the energy: one base model, personalised on every phone.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="group btn btn-light"
              >
                Join early access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#product"
                className="btn btn-ghost"
              >
                Explore the 86b SDK
              </a>
            </motion.div>
            <motion.p variants={fadeUp} custom={4} className="mt-10 text-xs text-white/55 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C4B5FF]" />
              Like the brain, only a few neurons fire at once, passing signals along their connections. Move your cursor to excite them.
            </motion.p>
          </motion.div>
        </div>

        <a href="#benchmark" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors">
          <ArrowDown className="w-5 h-5 animate-float" />
        </a>
      </section>

      {/* ── THE BENCHMARK ────────────────────────────────────────────────────── */}
      <section id="benchmark" className="bg-white scroll-mt-20 border-y border-[#ECE6DD]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-14">
            <Eyebrow color="#E8553A">The benchmark</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-tight tracking-tight">
              The brain runs general intelligence <span className="text-[#8A8F98]">on 20 watts.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: '86B', label: 'neurons in the human brain', hue: hues[0] },
              { value: '~20 W', label: 'to power all of it, less than a light bulb', hue: hues[3] },
              { value: 'MW', label: 'megawatt data centres to train and serve today’s frontier AI', hue: null },
            ].map((s, i) => (
              <motion.div
                key={s.value}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-3xl p-10 text-center"
                style={{ background: s.hue ? s.hue.bg : '#F3F1EE' }}
              >
                <p className="font-extralight tracking-tight text-7xl md:text-8xl leading-none mb-4" style={{ color: s.hue ? s.hue.fg : '#9A9DA4' }}>{s.value}</p>
                <p className="text-[#3B3F47] text-sm max-w-[230px] mx-auto leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="text-center text-xl md:text-2xl text-[#16181D] font-light mt-12"
          >
            And unlike the brain, today’s models <span className="text-spectrum font-normal">stop learning the moment they ship.</span>
          </motion.p>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-24 wash-peach">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
            <Eyebrow color="#C7378A">The problem</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight">
              AI scales up.<br /><span className="text-[#8A8F98]">It doesn’t scale down.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.5}
                className="rounded-3xl bg-white/90 backdrop-blur border border-[#ECE6DD] p-7 card-hover"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6" style={{ background: hues[i].bg }}>
                  <p.icon className="w-5 h-5" style={{ color: hues[i].fg }} />
                </div>
                <h3 className="text-lg font-medium text-[#16181D] mb-2">{p.title}</h3>
                <p className="text-[#6B7079] text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT: 86b SDK ─────────────────────────────────────────────────── */}
      <section id="product" className="relative py-24 overflow-hidden wash-violet scroll-mt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow>Coming soon · The 86b SDK</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight mb-6">
                One engine that <span className="text-spectrum font-normal">keeps learning</span> on the device.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#3B3F47] text-lg leading-relaxed mb-10 max-w-xl">
                The 86b SDK, now in development, will ship one compact base model to Android apps and edge devices, then personalise it on every device. It is designed to learn each user locally, keep what it already knew, and do it within a budget phone’s power and memory limits.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((c, i) => (
                  <motion.div
                    key={c.title}
                    variants={fadeUp} custom={3 + i * 0.5}
                    className="rounded-2xl bg-white border border-[#ECE6DD] p-5 card-hover"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: hues[i].bg }}>
                      <c.icon style={{ color: hues[i].fg, width: 18, height: 18 }} />
                    </div>
                    <h3 className="text-[#16181D] text-base font-medium mb-1">{c.title}</h3>
                    <p className="text-[#6B7079] text-sm leading-relaxed">{c.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={5} className="mt-8">
                <a href="#early-access" className="inline-flex items-center gap-2 text-[#6347F0] text-sm font-semibold hover:text-[#16181D] transition-colors">
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
              <div className="absolute -inset-6 rounded-[2.5rem] bg-spectrum opacity-20 blur-2xl" />
              <div className="relative rounded-[2rem] p-[3px] bg-spectrum">
                <div className="relative rounded-[1.85rem] overflow-hidden aspect-square">
                  <Image src="/images/enterprise-ai-abstract.png" alt="Sparse neural network routing input through a few active experts" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md border border-white rounded-2xl p-5 shadow-lg">
                    <p className="text-[#6347F0] text-[11px] uppercase tracking-widest font-semibold mb-1.5">Designed for</p>
                    <p className="text-[#16181D] text-lg font-medium">₹8,000–15,000 Android phones</p>
                    <p className="text-[#6B7079] text-xs mt-1">Targeting CPU, GPU and NPU via LiteRT, ExecuTorch and ONNX Runtime. Neuromorphic chips later.</p>
                  </div>
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
            <Eyebrow color="#0E9488">How it works</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight mb-5">
              Fast per-user learning, <span className="text-[#8A8F98]">consolidated into a sparse slow learner.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#6B7079] text-lg leading-relaxed">
              The engine we’re building separates what a model knows from how it adapts, so each device can learn quickly without overwriting shared knowledge.
            </motion.p>
          </motion.div>

          {/* Diagram — desktop */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="hidden lg:block rounded-[2rem] border border-[#ECE6DD] bg-[#FBF8F4] dot-paper p-10"
          >
            <p className="text-[11px] uppercase tracking-widest text-[#6B7079] font-semibold mb-4">Inference path</p>
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-stretch">
              {inferencePath.map((n, i) => (
                <div key={n.title} className="contents">
                  <DiagramNode {...n} />
                  {i < inferencePath.length - 1 && (
                    <div className="flex items-center justify-center"><ArrowRight className="w-4 h-4 text-[#B9BCC2]" /></div>
                  )}
                </div>
              ))}
            </div>

            {/* Connectors between rows — one cell per diagram column */}
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] h-20 text-[11px] text-[#6B7079]">
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 bottom-0 w-px bg-[#14B8A6]" />
                <div className="absolute left-1/2 right-0 top-1/2 h-px bg-[#14B8A6]" />
              </div>
              <div className="relative"><div className="absolute inset-x-0 top-1/2 h-px bg-[#14B8A6]" /></div>
              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#14B8A6]" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[150%] whitespace-nowrap text-[#0E9488]">consolidate into slow weights</span>
              </div>
              <div className="relative"><div className="absolute inset-x-0 top-1/2 h-px bg-[#14B8A6]" /></div>
              <div className="relative">
                <div className="absolute left-0 w-[30%] top-1/2 h-px bg-[#14B8A6]" />
                <div className="absolute left-[30%] top-0 h-1/2 w-px bg-[#14B8A6]" />
                <span className="arrow-up absolute left-[30%] top-0 border-b-[#14B8A6]" />
                <div className="absolute left-[70%] top-0 bottom-0 w-px bg-[#E14FA0]" />
                <span className="arrow-up absolute left-[70%] top-0 border-b-[#E14FA0]" />
                <span className="absolute left-[70%] top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap text-[#C7378A]">adapter applied</span>
              </div>
              <div />
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#B9BCC2]" />
                <span className="arrow-down absolute left-1/2 bottom-0 border-t-[#B9BCC2]" />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-stretch">
              {[...adaptationLoop].reverse().map((n, i, arr) => (
                <div key={n.title} className="contents">
                  <DiagramNode {...n} />
                  {i < arr.length - 1 && (
                    <div className="flex items-center justify-center"><ArrowRight className="w-4 h-4 text-[#B9BCC2] rotate-180" /></div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#6B7079] font-semibold mt-4">Adaptation loop</p>
          </motion.div>

          {/* Diagram — mobile / tablet */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Inference path', nodes: inferencePath },
              { label: 'Adaptation loop', nodes: adaptationLoop },
            ].map((col) => (
              <div key={col.label} className="rounded-3xl border border-[#ECE6DD] bg-[#FBF8F4] p-5">
                <p className="text-[11px] uppercase tracking-widest text-[#6B7079] font-semibold mb-4">{col.label}</p>
                <div className="flex flex-col items-stretch">
                  {col.nodes.map((n, i) => (
                    <div key={n.title} className="flex flex-col items-center">
                      <div className="w-full"><DiagramNode {...n} /></div>
                      {i < col.nodes.length - 1 && <ArrowDown className="w-4 h-4 text-[#B9BCC2] my-1.5" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mechanisms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {mechanisms.map((m, i) => (
              <motion.div
                key={m.n}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.4}
                className="rounded-3xl p-7"
                style={{ background: hues[i].bg }}
              >
                <span className="font-extralight tracking-tight text-4xl leading-none" style={{ color: hues[i].fg }}>{m.n}</span>
                <h3 className="text-lg font-medium text-[#16181D] mt-3 mb-2">{m.title}</h3>
                <p className="text-[#3B3F47] text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE ──────────────────────────────────────────────── */}
      <section className="relative py-24 wash-mint overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-14">
            <Eyebrow color="#0E9488">Planned system architecture</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight">
              Learning stays on the phone.<br /><span className="text-[#8A8F98]">The cloud only ships models.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
            {/* On the device */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-[2rem] border border-[#ECE6DD] bg-white shadow-sm p-6 md:p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-[#16181D]">
                <Smartphone className="w-4 h-4 text-[#0E9488]" />
                <span className="text-sm font-medium">On the device</span>
              </div>
              <div className="rounded-xl bg-[#FBF8F4] border border-[#ECE6DD] px-4 py-3 text-center text-sm text-[#3B3F47]">
                Partner app: voice, wearable, health, fintech
              </div>
              <div className="rounded-2xl p-4 bg-[#EFEBFF]/60 border border-[#D9CFFF]">
                <p className="text-xs font-semibold text-[#6347F0] mb-3">86b SDK</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sdkModules.map((m) => (
                    <div
                      key={m.title}
                      className={`rounded-xl px-3 py-3 text-center ${m.highlight ? 'border-spectrum' : 'bg-white border border-[#ECE6DD]'}`}
                    >
                      <p className={`text-sm font-medium leading-tight ${m.highlight ? 'text-spectrum' : 'text-[#16181D]'}`}>{m.title}</p>
                      <p className="text-[#6B7079] text-xs mt-0.5">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-[#FBF8F4] border border-[#ECE6DD] px-4 py-3 text-center">
                <p className="text-sm text-[#16181D]">Runtimes: LiteRT · ExecuTorch · ONNX Runtime</p>
                <p className="text-xs text-[#6B7079] mt-0.5">CPU, GPU and NPU today; neuromorphic chips later</p>
              </div>
            </motion.div>

            {/* Cloud */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="rounded-[2rem] p-6 md:p-8 flex flex-col gap-3 text-white"
              style={{ background: 'linear-gradient(160deg, #7B61FF 0%, #5B45E0 45%, #C7378A 100%)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="w-4 h-4" />
                <span className="text-sm font-medium">86b cloud</span>
              </div>
              {cloudServices.map((c) => (
                <div key={c.title} className="rounded-xl bg-white/15 border border-white/20 backdrop-blur px-4 py-3">
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-white/75 text-xs mt-0.5">{c.desc}</p>
                </div>
              ))}
              <p className="mt-auto pt-3 text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" /> Raw data never leaves the device
              </p>
            </motion.div>
          </div>

          <p className="text-center text-xs text-[#6B7079] mt-8">
            Base models and signed updates flow down to devices. Only anonymous, aggregate performance metrics flow up. Architecture is tentative and will evolve through the pilots.
          </p>
        </div>
      </section>

      {/* ── TECHNOLOGY: BRAIN PRINCIPLES ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-12">
            <Eyebrow color="#C77700">The technology</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight">
              Five brain principles, <span className="text-[#8A8F98]">each measured on real phones.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="rounded-[2rem] border border-[#ECE6DD] bg-white overflow-hidden"
          >
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr] px-8 py-4 bg-[#FBF8F4] border-b border-[#ECE6DD] text-xs font-semibold uppercase tracking-widest text-[#6B7079]">
              <span>Brain principle</span>
              <span>What we build</span>
              <span>Measured by</span>
            </div>
            {principles.map((p, i) => (
              <div key={p.principle} className="group grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-1 md:gap-0 px-6 md:px-8 py-5 border-b border-[#F1ECE4] last:border-0 transition-colors hover:bg-[#FBF8F4]">
                <span className="text-[#16181D] font-medium flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: hues[i].fg, boxShadow: `0 0 0 4px ${hues[i].bg}` }} />
                  {p.principle}
                </span>
                <span className="text-[#3B3F47] text-sm md:text-base">{p.build}</span>
                <span className="text-sm font-mono" style={{ color: hues[i].fg }}>{p.measure}</span>
              </div>
            ))}
          </motion.div>
          <p className="text-sm text-[#6B7079] mt-6">
            Every result we publish will be reported alongside its cost: accuracy together with forgetting, energy, latency and memory, measured with an external power monitor on low-cost hardware.
          </p>
        </div>
      </section>

      {/* ── FLAGSHIP DEMO ────────────────────────────────────────────────────── */}
      <section className="relative py-24 wash-peach overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Eyebrow color="#E8553A">Flagship demo · In development</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight mb-6">
                Voice commands that <span className="text-spectrum font-normal">learn each speaker.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#3B3F47] text-lg leading-relaxed mb-10 max-w-xl">
                Voice recognition fails most on regional accents, code-mixed speech and noisy rooms: the everyday reality for Indian users. Our first testbed is designed to fix that on the phone itself.
              </motion.p>
              <div className="space-y-4 mb-10">
                {[
                  'Starts from one compact base model',
                  'Adapts to each speaker over a few uses, on the phone',
                  'Keeps every earlier command; no audio leaves the device',
                ].map((t, i) => (
                  <motion.div key={t} variants={fadeUp} custom={3 + i * 0.5} className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full font-extralight tracking-tight text-lg flex items-center justify-center" style={{ background: hues[i].bg, color: hues[i].fg }}>{i + 1}</span>
                    <p className="text-[#16181D]">{t}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} custom={5} className="text-sm text-[#3B3F47] pl-4 border-l-2 border-[#E14FA0]">
                One demo to prove every claim: on-device learning, no forgetting, low energy, budget phones. Design partners will see it first.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <VoiceDemo />
              <p className="text-center text-xs text-[#6B7079] mt-4">Concept illustration of the planned demo</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BUILT IN INDIA + WHO IT'S FOR ────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow color="#C77700">An innovation from India</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight mb-10">
                Built in India, <span className="text-[#8A8F98]">for the world’s majority.</span>
              </motion.h2>
              <div className="flex flex-col">
                {indiaPoints.map((p, i) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp} custom={2 + i * 0.4}
                    className="group flex items-start gap-5 py-5 border-b border-[#F1ECE4] last:border-0"
                  >
                    <span className="flex-shrink-0 font-extralight tracking-tight text-3xl leading-none w-10" style={{ color: hues[(i + 4) % 5].fg }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="block text-[#16181D] text-xl font-light">{p.title}</span>
                      <span className="block text-[#6B7079] text-sm mt-1 leading-relaxed">{p.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Eyebrow color="#C7378A">Who it’s for</Eyebrow>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight mb-10">
                Every device maker needs <span className="text-[#8A8F98]">smaller, personal AI.</span>
              </motion.h2>
              <div className="flex flex-col gap-3">
                {customers.map((c, i) => (
                  <motion.div
                    key={c.who}
                    variants={fadeUp} custom={2 + i * 0.4}
                    className="rounded-2xl px-5 py-4 flex items-center gap-4 border border-[#ECE6DD] bg-white card-hover"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hues[i].bg }}>
                      <c.icon className="w-4 h-4" style={{ color: hues[i].fg }} />
                    </div>
                    <div>
                      <p className="text-[#16181D] text-sm font-medium">{c.who}</p>
                      <p className="text-[#6B7079] text-sm">{c.need}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} custom={5} className="text-[#6B7079] text-sm mt-6">
                If your app’s voice or sensor features need to work for every user, on every phone, we’d like to hear from you.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────────────────── */}
      <section id="research" className="py-24 wash-violet scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="max-w-3xl mb-14">
            <Eyebrow>Research</Eyebrow>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#16181D] leading-[1.05] tracking-tight mb-5">
              <span className="text-spectrum font-normal">Intelligence per watt.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#3B3F47] text-lg leading-relaxed">
              Our perspective paper defines the problem, the approach and the evaluation standard we will report results against: falsifiable hypotheses, an open protocol that makes energy and forgetting first-class metrics, and a benchmark grounded in Indian conditions.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
            {/* Paper card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden lg:sticky lg:top-28 shadow-[0_30px_70px_-30px_rgba(91,69,224,0.6)]"
              style={{ background: 'linear-gradient(150deg, #FF6B4A 0%, #E14FA0 30%, #7B61FF 70%, #5B45E0 100%)' }}
            >
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
              <div className="absolute -right-4 top-24 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/15 border border-white/30 mb-6">
                  Perspective · October 2026
                </span>
                <h3 className="font-extralight tracking-tight text-3xl md:text-4xl text-white leading-[1.1] mb-4">
                  Intelligence per Watt: A Brain-Inspired Framework for Continual On-Device Learning on Low-Cost Hardware
                </h3>
                <p className="text-white/80 text-sm mb-6">Munish Dhiman · 86b.ai, India</p>
                <p className="text-white/90 text-sm leading-relaxed mb-8">
                  The brain supports general intelligence with roughly 86 billion neurons on about 20 watts. We argue the next gains in practical AI will come from systems that learn continually, compute sparsely and adapt to individual users on the devices they already own.
                </p>
                <a
                  href="/papers/intelligence-per-watt.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  <Download className="w-4 h-4" />
                  Read the paper (PDF)
                </a>
              </div>
            </motion.div>

            {/* Hypotheses + protocol */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7079] mb-4">Hypotheses we will test</p>
                <div className="flex flex-col gap-3">
                  {hypotheses.map((h, i) => (
                    <motion.div
                      key={h.id}
                      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                      className="flex gap-5 p-5 rounded-2xl bg-white border border-[#ECE6DD]"
                    >
                      <span className="font-extralight tracking-tight text-2xl w-10 flex-shrink-0 leading-none pt-0.5" style={{ color: hues[i].fg }}>{h.id}</span>
                      <div>
                        <p className="text-[#16181D] font-medium">{h.name}</p>
                        <p className="text-[#6B7079] text-sm leading-relaxed mt-0.5">{h.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7079] mb-4">Evaluation protocol</p>
                <div className="flex flex-wrap gap-2">
                  {metrics.map((m, i) => (
                    <span key={m} className="px-3.5 py-1.5 rounded-full text-sm" style={{ background: hues[i % 5].bg, color: hues[i % 5].fg }}>{m}</span>
                  ))}
                </div>
                <p className="text-[#6B7079] text-sm mt-4 leading-relaxed">
                  Measured on at least three low-cost Android phones across chipset families, reported per device and per user subgroup so no population is hidden in an average.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7079] mb-4">An Indian-context benchmark</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benchmarkDims.map((b, i) => (
                    <div key={b.dim} className="rounded-2xl border border-[#ECE6DD] bg-white p-4 flex gap-3">
                      <b.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: hues[i].fg }} />
                      <div>
                        <p className="text-[#16181D] text-sm font-medium">{b.dim}</p>
                        <p className="text-[#6B7079] text-xs leading-relaxed mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#6B7079] text-sm mt-4 leading-relaxed">
                  Collected with informed consent, ethics committee approval and fair compensation, in line with India’s Digital Personal Data Protection Act, 2023.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS ─────────────────────────────────────────────────────── */}
      <section id="early-access" className="relative py-24 overflow-hidden scroll-mt-20 bg-[#FBF8F4]">
        <div className="aurora" aria-hidden="true">
          <span className="a1" /><span className="a2" /><span className="a3" /><span className="a4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p variants={fadeUp} className="text-[#6347F0] text-sm font-mono mb-5">86 billion neurons. 20 watts. Our benchmark.</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-light text-[#16181D] leading-[1] tracking-tight mb-6">
                Sign up for the <span className="text-spectrum font-normal">early preview.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#3B3F47] text-lg leading-relaxed mb-10 max-w-lg">
                The 86b SDK isn’t available yet. Join the list to hear first about the preview, pilot programme and research results. We’re especially keen to hear from:
              </motion.p>

              <div className="flex flex-col gap-3 mb-10">
                {partnerTypes.map((p, i) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp} custom={3 + i * 0.4}
                    className="rounded-2xl px-5 py-4 flex items-center gap-4 bg-white/80 backdrop-blur border border-[#ECE6DD]"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hues[i + 1].bg }}>
                      <p.icon className="w-4 h-4" style={{ color: hues[i + 1].fg }} />
                    </div>
                    <div>
                      <p className="text-[#16181D] text-sm font-medium">{p.title}</p>
                      <p className="text-[#6B7079] text-sm">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={5} className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="mailto:hello@86b.ai" className="inline-flex items-center gap-2 text-[#3B3F47] hover:text-[#16181D] transition-colors">
                  <Mail className="w-4 h-4 text-[#E14FA0]" /> hello@86b.ai
                </a>
                <a href="tel:+919990322337" className="inline-flex items-center gap-2 text-[#3B3F47] hover:text-[#16181D] transition-colors">
                  <Phone className="w-4 h-4 text-[#14B8A6]" /> +91 99903 22337
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
      <section className="bg-white border-t border-[#ECE6DD]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F3F1EE] flex items-center justify-center flex-shrink-0">
              <Layers className="w-4 h-4 text-[#6B7079]" />
            </div>
            <div>
              <p className="text-[#16181D] font-medium">Also from 86b.ai: enterprise AI services</p>
              <p className="text-[#6B7079] text-sm">Our engineers build private GenAI, process automation, computer vision, digital twins and more for enterprises.</p>
            </div>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6347F0] hover:text-[#16181D] transition-colors whitespace-nowrap"
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
