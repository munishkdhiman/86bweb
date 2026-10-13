'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowDown, Zap, Brain, Cpu, Lock, Battery,
  Smartphone, RefreshCw, Globe, Mic, Check, CheckCircle2, FileText,
  Download, Gauge, ShieldCheck, Activity, Languages, Users, Mail,
  Cloud, Package, Layers, Radio,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import NeuralField from '@/components/NeuralField';
import BrainGlow from '@/components/BrainGlow';

// ── Problem ─────────────────────────────────────────────────────────────────
const problems = [
  { icon: Zap, title: 'Scaling hits limits', desc: 'Frontier AI needs GPU clusters, power and capital that few can afford.' },
  { icon: Smartphone, title: 'Edge is underserved', desc: 'Phones and wearables have little power or memory. Big models don’t fit.' },
  { icon: RefreshCw, title: 'Models stop learning', desc: 'Deployed models can’t adapt to each user, and naive updates erase old skills.' },
  { icon: Globe, title: 'Most phones are left out', desc: 'On-device AI is tuned for flagship phones and a handful of languages.' },
];

// ── Product capabilities ────────────────────────────────────────────────────
const capabilities = [
  { icon: Gauge, title: 'Adapts in minutes', desc: 'To a new user, device or setting from a handful of examples.' },
  { icon: Brain, title: 'Remembers', desc: 'Earlier skills stay intact while new ones are learned, like memory consolidation in the brain.' },
  { icon: Battery, title: 'Computes sparsely', desc: 'Activates only the parts each input needs, cutting energy and latency.' },
  { icon: Lock, title: 'Stays private', desc: 'Data and learning never leave the phone.' },
];

// ── Why this is different ───────────────────────────────────────────────────
const comparisons = [
  { icon: RefreshCw, title: 'vs. fine-tuning on device', desc: 'Naive updates overwrite what the model knew. A separate fast adapter learns the user while the slow learner keeps shared knowledge intact.' },
  { icon: Cloud, title: 'vs. cloud personalisation', desc: 'Sending audio and sensor data to a server costs energy, bandwidth and trust. Here the data and the learning never leave the phone; only aggregate metrics do.' },
  { icon: Smartphone, title: 'vs. flagship-only on-device AI', desc: 'Most on-device assistants target high-end chips and a few languages. The 86b SDK is sized for ₹10,000 phones and tested on Indian languages, accents and noise first.' },
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

// ── Development status (status strip) ──────────────────────────────────────
const roadmap: { title: string; desc: string; state: 'done' | 'current' | 'later' }[] = [
  { title: 'Research', desc: 'Perspective paper published, Oct 2026', state: 'done' },
  { title: 'Prototype', desc: 'Voice-command testbed on budget phones', state: 'current' },
  // TODO(team): confirm the developer preview date before publishing; "2027" is a placeholder.
  { title: 'Developer preview', desc: 'First design partners, 2027', state: 'later' },
  { title: 'Pilots', desc: 'Measured results published per device and per user group', state: 'later' },
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
  { fg: '#555555', bg: '#F2F2EE', ring: '#E6E6E0' }, // coral
  { fg: '#444444', bg: '#EFEFEA', ring: '#E0E0DA' }, // magenta
  { fg: '#000000', bg: '#F0F0EC', ring: '#DADAD4' }, // violet
  { fg: '#0B8F58', bg: '#E6F8EF', ring: '#C8EFDA' }, // teal
  { fg: '#555555', bg: '#F2F2EE', ring: '#DADAD4' }, // amber
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

function Eyebrow({ children, color = '#000000' }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.span data-motion
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
        highlight ? 'border-spectrum shadow-[0_10px_30px_-10px_rgba(17,17,17,0.45)]' : 'border border-[#E4E4DF] bg-white'
      }`}
    >
      <p className={`text-sm font-medium leading-tight ${highlight ? 'text-spectrum' : 'text-[#111111]'}`}>{title}</p>
      <p className="text-xs text-[#6B6B6B] mt-1 leading-snug">{desc}</p>
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
  const barColors = ['#777777', '#555555', '#111111', '#12B76A'];

  useEffect(() => {
    const w = setInterval(() => setWave((v) => v.map(() => Math.floor(Math.random() * 16) + 3)), 160);
    const s = setInterval(() => setStep((p) => (p + 1) % uses.length), 2800);
    return () => { clearInterval(w); clearInterval(s); };
  }, [uses.length]);

  const u = uses[step];
  return (
    <div className="relative mx-auto w-[280px] rounded-[2.75rem] border-[10px] border-[#111111] bg-white shadow-[0_40px_80px_-30px_rgba(17,17,17,0.45)] overflow-hidden">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#111111] z-10" />
      <div className="px-5 pt-10 pb-7 min-h-[500px] flex flex-col wash-violet">
        <div className="flex items-center justify-between text-[10px] text-[#6B6B6B] mb-8">
          <span className="font-mono">86b SDK · on-device</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> offline</span>
        </div>

        <p className="text-[11px] uppercase tracking-widest text-[#000000] mb-2">Use {step + 1}</p>
        <motion.p data-motion
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-light text-[#111111] text-[28px] leading-tight mb-8 min-h-[70px]"
        >
          {u.phrase}
        </motion.p>

        <div className="flex items-center justify-center gap-[3px] h-16 mb-8">
          {wave.map((h, i) => (
            <div key={i} className="w-[5px] rounded-full transition-all duration-150" style={{ height: `${h * 3}px`, background: barColors[Math.floor((i / wave.length) * barColors.length)] }} />
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-[#6B6B6B]">Confidence</span>
          <span className="text-[#111111] font-mono">{u.confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#111111]/10 overflow-hidden mb-6">
          <motion.div data-motion
            className="h-full bg-spectrum rounded-full"
            animate={{ width: `${u.confidence}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-auto space-y-2">
          {[
            { label: 'Adapter updated for this speaker', on: u.learned, color: '#555555' },
            { label: 'Earlier commands retained', on: true, color: '#111111' },
            { label: 'No audio leaves the device', on: true, color: '#12B76A' },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 text-xs text-[#3A3A3A]">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: row.on ? row.color : '#CBCBCB' }} />
              {row.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // With reduced motion, skip the hidden start state so nothing waits on an
  // observer to become visible. globals.css adds a CSS fallback for [data-motion].
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';

  return (
    <div className="min-h-screen bg-[#F7F7F4]">
      {/* Without JavaScript, reveal content that would otherwise start hidden */}
      <noscript>
        <style>{'[data-motion]{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #121212 45%, #161616 70%, #0C0C0C 100%)' }}>
        <div className="aurora aurora-dark" aria-hidden="true">
          <span className="a1" /><span className="a2" /><span className="a3" /><span className="a4" />
        </div>
        <NeuralField dark className="absolute inset-0 w-full h-full opacity-40" />
        <BrainGlow className="absolute inset-0 w-full h-full opacity-45 lg:opacity-100" />
        {/* Keep the copy legible over the field */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 48% 42% at 30% 52%, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full pointer-events-none">
          <motion.div data-motion initial={initial} animate="visible" className="max-w-4xl pointer-events-auto">
            <motion.div data-motion variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-8">
              <a href="#status" className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:border-white/40 transition-colors text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#555555] animate-pulse-ring" />
                  <span className="relative w-2 h-2 rounded-full bg-spectrum" />
                </span>
                Early access open · SDK preview in development
              </a>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Brain-inspired on-device AI · Built in India
              </span>
            </motion.div>
            <motion.h1 data-motion variants={fadeUp} custom={1} className="text-[3.25rem] md:text-7xl lg:text-[5.25rem] font-extralight text-white leading-[1.02] tracking-tight mb-8 text-balance [text-shadow:0_2px_18px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.6)]">
              Intelligence,<br />
              <span className="text-signal font-normal">the way nature built&nbsp;it.</span>
            </motion.h1>
            <motion.p data-motion variants={fadeUp} custom={2} className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Big intelligence on Tiny power. An AI Engine inspired by the brain, Switches on only what each task needs.
            </motion.p>
            <motion.div data-motion variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="group btn btn-light"
              >
                Join early access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="btn btn-ghost"
              >
                See how it works
              </a>
            </motion.div>
          </motion.div>
        </div>

        <a href="#benchmark" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors">
          <ArrowDown className="w-5 h-5 animate-float" />
        </a>
      </section>

      {/* ── STATUS STRIP: the one place that states development status ───── */}
      <section id="status" className="bg-white border-y border-[#E4E4DF] py-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <ol className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadmap.map((r, i) => (
              <li key={r.title} className="flex items-start gap-3">
                {r.state === 'done' && (
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: hues[3].bg }}>
                    <Check className="w-4 h-4" style={{ color: hues[3].fg }} />
                  </span>
                )}
                {r.state === 'current' && (
                  <span className="flex-shrink-0 w-8 h-8 rounded-full p-[2px] bg-spectrum">
                    <span className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-semibold text-[#111111]">{i + 1}</span>
                  </span>
                )}
                {r.state === 'later' && (
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[#E4E4DF] bg-[#F7F7F4] flex items-center justify-center text-xs text-[#9A9A9A]">{i + 1}</span>
                )}
                <div>
                  <p className={`text-sm font-medium flex items-center gap-2 ${r.state === 'later' ? 'text-[#6B6B6B]' : 'text-[#111111]'}`}>
                    {r.title}
                    {r.state === 'current' && <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest" style={{ background: hues[2].bg, color: hues[2].fg }}>Now</span>}
                  </p>
                  <p className={`text-xs leading-relaxed mt-0.5 ${r.state === 'later' ? 'text-[#9A9A9A]' : 'text-[#6B6B6B]'}`}>{r.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href="#early-access" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#000000] hover:text-[#111111] transition-colors whitespace-nowrap">
            Get notified when the preview opens
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── THE BENCHMARK ────────────────────────────────────────────────────── */}
      <section id="benchmark" className="bg-white scroll-mt-20 border-y border-[#E4E4DF]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="text-center mb-14">
            <Eyebrow color="#555555">The benchmark</Eyebrow>
            <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-tight tracking-tight">
              The brain runs general intelligence <span className="text-[#8A8A8A]">on 20 watts.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: '86B', label: 'neurons in the human brain', hue: hues[0] },
              { value: '~20 W', label: 'to power all of it, less than a light bulb', hue: hues[3] },
              { value: '50,000×', label: 'the brain’s power budget, for every megawatt a data centre draws to serve frontier AI', hue: null },
            ].map((s, i) => (
              <motion.div data-motion
                key={s.value}
                initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-3xl p-10 text-center"
                style={{ background: s.hue ? s.hue.bg : '#F1F1EE' }}
              >
                <p className="font-extralight tracking-tight text-6xl md:text-5xl lg:text-7xl leading-none mb-4 whitespace-nowrap" style={{ color: s.hue ? s.hue.fg : '#9A9A9A' }}>{s.value}</p>
                <p className="text-[#3A3A3A] text-sm max-w-[230px] mx-auto leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.p data-motion
            initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="text-center text-xl md:text-2xl text-[#111111] font-light mt-12"
          >
            And unlike the brain, today’s models <span className="text-spectrum font-normal">stop learning the moment they ship.</span>
          </motion.p>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-24 wash-peach">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="max-w-3xl mb-14">
            <Eyebrow color="#444444">The problem</Eyebrow>
            <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight">
              AI scales up.<br /><span className="text-[#8A8A8A]">It doesn’t scale down.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problems.map((p, i) => (
              <motion.div data-motion
                key={p.title}
                initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} variants={fadeUp} custom={i * 0.5}
                className="rounded-3xl bg-white/90 backdrop-blur border border-[#E4E4DF] p-7 card-hover"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6" style={{ background: hues[i].bg }}>
                  <p.icon className="w-5 h-5" style={{ color: hues[i].fg }} />
                </div>
                <h3 className="text-lg font-medium text-[#111111] mb-2">{p.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT: 86b SDK ─────────────────────────────────────────────────── */}
      <section id="product" className="relative py-24 overflow-hidden wash-violet scroll-mt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }}>
              <Eyebrow>The 86b SDK</Eyebrow>
              <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight mb-6">
                One engine that <span className="text-spectrum font-normal">keeps learning</span> on the device.
              </motion.h2>
              <motion.p data-motion variants={fadeUp} custom={2} className="text-[#3A3A3A] text-lg leading-relaxed mb-10 max-w-xl">
                The 86b SDK ships one compact base model to Android apps and edge devices, then personalises it on every phone. It is designed to learn each user locally, keep what it already knew, and stay inside a budget phone’s power and memory limits.
              </motion.p>

              <Eyebrow color="#6B6B6B">Designed to</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((c, i) => (
                  <motion.div data-motion
                    key={c.title}
                    variants={fadeUp} custom={3 + i * 0.5}
                    className="rounded-2xl bg-white border border-[#E4E4DF] p-5 card-hover"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: hues[i].bg }}>
                      <c.icon style={{ color: hues[i].fg, width: 18, height: 18 }} />
                    </div>
                    <h3 className="text-[#111111] text-base font-medium mb-1">{c.title}</h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">{c.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div data-motion variants={fadeUp} custom={5} className="mt-8">
                <a href="#early-access" className="inline-flex items-center gap-2 text-[#000000] text-sm font-semibold hover:text-[#111111] transition-colors">
                  Get notified when the preview opens
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div data-motion
              initial={reduce ? false : { opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-spectrum opacity-20 blur-2xl" />
              <div className="relative rounded-[2rem] p-[3px] bg-spectrum">
                <div className="relative rounded-[1.85rem] overflow-hidden aspect-square">
                  <Image src="/images/enterprise-ai-abstract.png" alt="Sparse neural network routing input through a few active experts" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md border border-white rounded-2xl p-5 shadow-lg">
                    <p className="text-[#000000] text-[11px] uppercase tracking-widest font-semibold mb-1.5">Designed for</p>
                    <p className="text-[#111111] text-lg font-medium">₹8,000–15,000 (about $100–180) Android phones</p>
                    <p className="text-[#6B6B6B] text-xs mt-1">Targeting CPU, GPU and NPU via LiteRT, ExecuTorch and ONNX Runtime. Neuromorphic chips later.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS IS DIFFERENT ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#F7F7F4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="max-w-3xl mb-14">
            <Eyebrow color="#444444">Why this is different</Eyebrow>
            <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight">
              Why not just fine-tune <span className="text-[#8A8A8A]">on the phone?</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {comparisons.map((c, i) => (
              <motion.div data-motion
                key={c.title}
                initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} variants={fadeUp} custom={i * 0.5}
                className="rounded-3xl bg-white border border-[#E4E4DF] p-7 card-hover"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6" style={{ background: hues[i + 1].bg }}>
                  <c.icon className="w-5 h-5" style={{ color: hues[i + 1].fg }} />
                </div>
                <h3 className="text-lg font-medium text-[#111111] mb-2">{c.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="max-w-3xl mb-14">
            <Eyebrow color="#0B8F58">How it works</Eyebrow>
            <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight mb-5">
              Learn fast from each user. <span className="text-[#8A8A8A]">Consolidate slowly into shared knowledge.</span>
            </motion.h2>
            <motion.p data-motion variants={fadeUp} custom={2} className="text-[#6B6B6B] text-lg leading-relaxed">
              The engine we’re building separates what a model knows from how it adapts, so each device can learn quickly without overwriting shared knowledge.
            </motion.p>
          </motion.div>

          {/* Diagram — desktop */}
          <motion.div data-motion
            initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} variants={fadeUp}
            className="hidden lg:block rounded-[2rem] border border-[#E4E4DF] bg-[#F7F7F4] dot-paper p-10"
          >
            <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mb-4">Inference path</p>
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-stretch">
              {inferencePath.map((n, i) => (
                <div key={n.title} className="contents">
                  <DiagramNode {...n} />
                  {i < inferencePath.length - 1 && (
                    <div className="flex items-center justify-center"><ArrowRight className="w-4 h-4 text-[#BBBBBB]" /></div>
                  )}
                </div>
              ))}
            </div>

            {/* Connectors between rows — one cell per diagram column */}
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] h-20 text-[11px] text-[#6B6B6B]">
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 bottom-0 w-px bg-[#12B76A]" />
                <div className="absolute left-1/2 right-0 top-1/2 h-px bg-[#12B76A]" />
              </div>
              <div className="relative"><div className="absolute inset-x-0 top-1/2 h-px bg-[#12B76A]" /></div>
              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#12B76A]" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[150%] whitespace-nowrap text-[#0B8F58]">consolidate into slow weights</span>
              </div>
              <div className="relative"><div className="absolute inset-x-0 top-1/2 h-px bg-[#12B76A]" /></div>
              <div className="relative">
                <div className="absolute left-0 w-[30%] top-1/2 h-px bg-[#12B76A]" />
                <div className="absolute left-[30%] top-0 h-1/2 w-px bg-[#12B76A]" />
                <span className="arrow-up absolute left-[30%] top-0 border-b-[#12B76A]" />
                <div className="absolute left-[70%] top-0 bottom-0 w-px bg-[#555555]" />
                <span className="arrow-up absolute left-[70%] top-0 border-b-[#555555]" />
                <span className="absolute left-[70%] top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap text-[#444444]">adapter applied</span>
              </div>
              <div />
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#BBBBBB]" />
                <span className="arrow-down absolute left-1/2 bottom-0 border-t-[#BBBBBB]" />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-stretch">
              {[...adaptationLoop].reverse().map((n, i, arr) => (
                <div key={n.title} className="contents">
                  <DiagramNode {...n} />
                  {i < arr.length - 1 && (
                    <div className="flex items-center justify-center"><ArrowRight className="w-4 h-4 text-[#BBBBBB] rotate-180" /></div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mt-4">Adaptation loop</p>
          </motion.div>

          {/* Diagram — mobile / tablet */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Inference path', nodes: inferencePath },
              { label: 'Adaptation loop', nodes: adaptationLoop },
            ].map((col) => (
              <div key={col.label} className="rounded-3xl border border-[#E4E4DF] bg-[#F7F7F4] p-5">
                <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mb-4">{col.label}</p>
                <div className="flex flex-col items-stretch">
                  {col.nodes.map((n, i) => (
                    <div key={n.title} className="flex flex-col items-center">
                      <div className="w-full"><DiagramNode {...n} /></div>
                      {i < col.nodes.length - 1 && <ArrowDown className="w-4 h-4 text-[#BBBBBB] my-1.5" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mechanisms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {mechanisms.map((m, i) => (
              <motion.div data-motion
                key={m.n}
                initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} variants={fadeUp} custom={i * 0.4}
                className="rounded-3xl p-7"
                style={{ background: hues[i].bg }}
              >
                <span className="font-extralight tracking-tight text-4xl leading-none" style={{ color: hues[i].fg }}>{m.n}</span>
                <h3 className="text-lg font-medium text-[#111111] mt-3 mb-2">{m.title}</h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Brain principles, each tied to a metric */}
          <motion.h3 data-motion
            initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} variants={fadeUp}
            className="text-2xl md:text-4xl font-light text-[#111111] leading-tight tracking-tight mt-20 mb-8 max-w-3xl"
          >
            Five brain principles, <span className="text-[#8A8A8A]">each tied to a metric we will measure on real phones.</span>
          </motion.h3>
          <motion.div data-motion
            initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="rounded-[2rem] border border-[#E4E4DF] bg-white overflow-hidden"
          >
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr] px-8 py-4 bg-[#F7F7F4] border-b border-[#E4E4DF] text-xs font-semibold uppercase tracking-widest text-[#6B6B6B]">
              <span>Brain principle</span>
              <span>What we build</span>
              <span>Measured by</span>
            </div>
            {principles.map((p, i) => (
              <div key={p.principle} className="group grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-1 md:gap-0 px-6 md:px-8 py-5 border-b border-[#EFEFEB] last:border-0 transition-colors hover:bg-[#F7F7F4]">
                <span className="text-[#111111] font-medium flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: hues[i].fg, boxShadow: `0 0 0 4px ${hues[i].bg}` }} />
                  {p.principle}
                </span>
                <span className="text-[#3A3A3A] text-sm md:text-base">{p.build}</span>
                <span className="text-sm font-mono" style={{ color: hues[i].fg }}>{p.measure}</span>
              </div>
            ))}
          </motion.div>
          <p className="text-sm text-[#6B6B6B] mt-6">
            Every result we publish will be reported alongside its cost: accuracy together with forgetting, energy, latency and memory, measured with an external power monitor on low-cost hardware.
          </p>
        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE ──────────────────────────────────────────────── */}
      <section className="relative py-24 wash-mint overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="text-center mb-14">
            <Eyebrow color="#0B8F58">System architecture</Eyebrow>
            <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight">
              Learning stays on the phone.<br /><span className="text-[#8A8A8A]">The cloud only ships models.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
            {/* On the device */}
            <motion.div data-motion
              initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-[2rem] border border-[#E4E4DF] bg-white shadow-sm p-6 md:p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-[#111111]">
                <Smartphone className="w-4 h-4 text-[#0B8F58]" />
                <span className="text-sm font-medium">On the device</span>
              </div>
              <div className="rounded-xl bg-[#F7F7F4] border border-[#E4E4DF] px-4 py-3 text-center text-sm text-[#3A3A3A]">
                Partner app: voice, wearable, health, fintech
              </div>
              <div className="rounded-2xl p-4 bg-[#F0F0EC]/60 border border-[#DADAD4]">
                <p className="text-xs font-semibold text-[#000000] mb-3">86b SDK</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sdkModules.map((m) => (
                    <div
                      key={m.title}
                      className={`rounded-xl px-3 py-3 text-center ${m.highlight ? 'border-spectrum' : 'bg-white border border-[#E4E4DF]'}`}
                    >
                      <p className={`text-sm font-medium leading-tight ${m.highlight ? 'text-spectrum' : 'text-[#111111]'}`}>{m.title}</p>
                      <p className="text-[#6B6B6B] text-xs mt-0.5">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-[#F7F7F4] border border-[#E4E4DF] px-4 py-3 text-center">
                <p className="text-sm text-[#111111]">Runtimes: LiteRT · ExecuTorch · ONNX Runtime</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5">CPU, GPU and NPU today; neuromorphic chips later</p>
              </div>
            </motion.div>

            {/* Cloud */}
            <motion.div data-motion
              initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="rounded-[2rem] p-6 md:p-8 flex flex-col gap-3 text-white"
              style={{ background: 'linear-gradient(160deg, #1A1A1A 0%, #0A0A0A 100%)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="w-4 h-4" />
                <span className="text-sm font-medium">86b cloud</span>
              </div>
              {cloudServices.map((c) => (
                <div key={c.title} className="rounded-xl bg-white/15 border border-white/20 backdrop-blur px-4 py-3">
                  <p className="text-sm font-medium text-white">{c.title}</p>
                  <p className="text-white/80 text-xs mt-0.5">{c.desc}</p>
                </div>
              ))}
              <p className="mt-auto pt-3 text-sm font-medium text-white flex items-center gap-2">
                <Lock className="w-4 h-4" /> Raw data never leaves the device
              </p>
            </motion.div>
          </div>

          <p className="text-center text-xs text-[#6B6B6B] mt-8">
            Base models and signed updates flow down to devices. Only anonymous, aggregate performance metrics flow up. Architecture is tentative and will evolve through the pilots.
          </p>
        </div>
      </section>

      {/* ── FLAGSHIP DEMO ────────────────────────────────────────────────────── */}
      <section className="relative py-24 wash-peach overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true }}>
              <Eyebrow color="#555555">Flagship demo</Eyebrow>
              <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight mb-6">
                Voice commands that <span className="text-spectrum font-normal">learn each speaker.</span>
              </motion.h2>
              <motion.p data-motion variants={fadeUp} custom={2} className="text-[#3A3A3A] text-lg leading-relaxed mb-10 max-w-xl">
                Voice recognition fails most on regional accents, code-mixed speech and noisy rooms: the everyday reality for Indian users. Our first testbed is designed to fix that on the phone itself.
              </motion.p>
              <div className="space-y-4 mb-10">
                {[
                  'Starts from one compact base model',
                  'Adapts to each speaker over a few uses, on the phone',
                  'Keeps every earlier command; no audio leaves the device',
                ].map((t, i) => (
                  <motion.div data-motion key={t} variants={fadeUp} custom={3 + i * 0.5} className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full font-extralight tracking-tight text-lg flex items-center justify-center" style={{ background: hues[i].bg, color: hues[i].fg }}>{i + 1}</span>
                    <p className="text-[#111111]">{t}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p data-motion variants={fadeUp} custom={5} className="text-sm text-[#3A3A3A] pl-4 border-l-2 border-[#555555]">
                One demo to prove every claim: on-device learning, no forgetting, low energy, budget phones. Design partners will see it first.
              </motion.p>
            </motion.div>

            <motion.div data-motion
              initial={reduce ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <VoiceDemo />
              <p className="text-center text-xs text-[#6B6B6B] mt-4">Concept illustration of the planned demo</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BUILT IN INDIA + WHO IT'S FOR ────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden wash-mint">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="mb-12">
            <Eyebrow color="#555555">Built in India, for the world’s majority.</Eyebrow>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }}>
              <motion.h3 data-motion variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-light text-[#111111] leading-[1.05] tracking-tight mb-8">
                Tested where <span className="text-[#8A8A8A]">conditions are hardest.</span>
              </motion.h3>
              <div className="flex flex-col">
                {indiaPoints.map((p, i) => (
                  <motion.div data-motion
                    key={p.title}
                    variants={fadeUp} custom={2 + i * 0.4}
                    className="group flex items-start gap-5 py-5 border-b border-[#EFEFEB] last:border-0"
                  >
                    <span className="flex-shrink-0 font-extralight tracking-tight text-3xl leading-none w-10" style={{ color: hues[(i + 4) % 5].fg }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="block text-[#111111] text-xl font-light">{p.title}</span>
                      <span className="block text-[#6B6B6B] text-sm mt-1 leading-relaxed">{p.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }}>
              <motion.h3 data-motion variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-light text-[#111111] leading-[1.05] tracking-tight mb-8">
                Where on-device learning <span className="text-[#8A8A8A]">pays off first.</span>
              </motion.h3>
              <div className="flex flex-col gap-3">
                {customers.map((c, i) => (
                  <motion.div data-motion
                    key={c.who}
                    variants={fadeUp} custom={2 + i * 0.4}
                    className="rounded-2xl px-5 py-4 flex items-center gap-4 border border-[#E4E4DF] bg-white card-hover"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hues[i].bg }}>
                      <c.icon className="w-4 h-4" style={{ color: hues[i].fg }} />
                    </div>
                    <div>
                      <p className="text-[#111111] text-sm font-medium">{c.who}</p>
                      <p className="text-[#6B6B6B] text-sm">{c.need}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.a data-motion
                href="#early-access"
                variants={fadeUp} custom={5}
                className="group inline-flex items-start gap-1.5 text-[#000000] hover:text-[#111111] text-sm font-medium mt-6 transition-colors"
              >
                If your app’s voice or sensor features need to work for every user, on every phone, we’d like to hear from you.
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────────────────── */}
      <section id="research" className="py-24 wash-violet scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true, margin: '0px' }} className="max-w-3xl mb-14">
            <Eyebrow>Research</Eyebrow>
            <motion.h2 data-motion variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-light text-[#111111] leading-[1.05] tracking-tight mb-5">
              <span className="text-spectrum font-normal">Intelligence per watt.</span>
            </motion.h2>
            <motion.p data-motion variants={fadeUp} custom={2} className="text-[#3A3A3A] text-lg leading-relaxed">
              Our perspective paper defines the problem, the approach and the evaluation standard we will report results against: falsifiable hypotheses, an open protocol that makes energy and forgetting first-class metrics, and a benchmark grounded in Indian conditions.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
            {/* Paper card + author credit */}
            <div className="lg:sticky lg:top-28">
            <motion.div data-motion
              initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-[0_30px_70px_-30px_rgba(17,17,17,0.6)]"
              style={{ background: 'radial-gradient(70% 55% at 0% 0%, rgba(43,217,138,0.28) 0%, rgba(43,217,138,0) 60%), linear-gradient(150deg, #1A1A1A 0%, #0A0A0A 100%)' }}
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
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="/papers/intelligence-per-watt.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light"
                  >
                    <Download className="w-4 h-4" />
                    Read the paper (PDF)
                  </a>
                  {/* TODO(team): add an arXiv or DOI link here once the paper has one. */}
                </div>
              </div>
            </motion.div>
            <p className="text-sm text-[#6B6B6B] mt-5 px-2">
              Written by Munish Dhiman, founder of 86b.ai.{' '}
              <Link href="/about" className="text-[#000000] hover:text-[#111111] font-medium transition-colors whitespace-nowrap">About the team →</Link>
            </p>
            </div>

            {/* Hypotheses + protocol */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B] mb-4">Hypotheses we will test</p>
                <div className="flex flex-col gap-3">
                  {hypotheses.map((h, i) => (
                    <motion.div data-motion
                      key={h.id}
                      initial={initial} whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                      className="flex gap-5 p-5 rounded-2xl bg-white border border-[#E4E4DF]"
                    >
                      <span className="font-extralight tracking-tight text-2xl w-10 flex-shrink-0 leading-none pt-0.5" style={{ color: hues[i].fg }}>{h.id}</span>
                      <div>
                        <p className="text-[#111111] font-medium">{h.name}</p>
                        <p className="text-[#6B6B6B] text-sm leading-relaxed mt-0.5">{h.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B] mb-4">Evaluation protocol</p>
                <div className="flex flex-wrap gap-2">
                  {metrics.map((m, i) => (
                    <span key={m} className="px-3.5 py-1.5 rounded-full text-sm" style={{ background: hues[i % 5].bg, color: hues[i % 5].fg }}>{m}</span>
                  ))}
                </div>
                <p className="text-[#6B6B6B] text-sm mt-4 leading-relaxed">
                  Measured on at least three low-cost Android phones across chipset families, reported per device and per user subgroup so no population is hidden in an average.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B] mb-4">An Indian-context benchmark</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benchmarkDims.map((b, i) => (
                    <div key={b.dim} className="rounded-2xl border border-[#E4E4DF] bg-white p-4 flex gap-3">
                      <b.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: hues[i].fg }} />
                      <div>
                        <p className="text-[#111111] text-sm font-medium">{b.dim}</p>
                        <p className="text-[#6B6B6B] text-xs leading-relaxed mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#6B6B6B] text-sm mt-4 leading-relaxed">
                  Collected with informed consent, ethics committee approval and fair compensation, in line with India’s Digital Personal Data Protection Act, 2023.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS ─────────────────────────────────────────────────────── */}
      <section id="early-access" className="relative py-24 overflow-hidden scroll-mt-20 bg-[#F7F7F4]">
        <div className="aurora" aria-hidden="true">
          <span className="a1" /><span className="a2" /><span className="a3" /><span className="a4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div data-motion initial={initial} whileInView="visible" viewport={{ once: true }}>
              <motion.p data-motion variants={fadeUp} className="text-[#000000] text-sm font-mono mb-5">86 billion neurons. 20 watts. Our benchmark.</motion.p>
              <motion.h2 data-motion variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-light text-[#111111] leading-[1] tracking-tight mb-6">
                Sign up for the <span className="text-spectrum font-normal">early preview.</span>
              </motion.h2>
              <motion.p data-motion variants={fadeUp} custom={2} className="text-[#3A3A3A] text-lg leading-relaxed mb-10 max-w-lg">
                The 86b SDK isn’t available yet. Early access means you hear first when the developer preview opens, can apply to the pilot programme, and get the measured results as we publish them. We’re especially keen to hear from:
              </motion.p>

              <div className="flex flex-col gap-3 mb-10">
                {partnerTypes.map((p, i) => (
                  <motion.div data-motion
                    key={p.title}
                    variants={fadeUp} custom={3 + i * 0.4}
                    className="rounded-2xl px-5 py-4 flex items-center gap-4 bg-white/80 backdrop-blur border border-[#E4E4DF]"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hues[i + 1].bg }}>
                      <p.icon className="w-4 h-4" style={{ color: hues[i + 1].fg }} />
                    </div>
                    <div>
                      <p className="text-[#111111] text-sm font-medium">{p.title}</p>
                      <p className="text-[#6B6B6B] text-sm">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div data-motion variants={fadeUp} custom={5} className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="mailto:hello@86b.ai" className="inline-flex items-center gap-2 text-[#3A3A3A] hover:text-[#111111] transition-colors">
                  <Mail className="w-4 h-4 text-[#555555]" /> hello@86b.ai
                </a>
              </motion.div>
            </motion.div>

            <motion.div data-motion
              initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <EarlyAccessForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES (secondary) ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#E4E4DF]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-[#6B6B6B] text-sm">Also from 86b.ai: enterprise AI services for private GenAI, automation, vision and digital twins.</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#000000] hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            Explore services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
