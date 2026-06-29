'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight, Shield, Lock, Server, Globe,
  Brain, BarChart3, DollarSign, Layers, ArrowRight,
  CheckCircle2, Cpu, Database, Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioWaveDemo from '@/components/AudioWaveDemo';

// ── Hero Slides ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: '/hero_slide1.png',
    headline: 'Autonomous Workflows.\nAgents That Execute End to End.',
    subtext: 'We replace rigid rule-based automation with private AI agents that read documents, make decisions, and orchestrate multi-step processes across your ERP, CRM, and billing systems — with full audit trails.',
    cta: 'See Process Automation',
    href: '/services/intelligent-process-automation',
  },
  {
    image: '/hero_slide3.png',
    headline: 'Revenue Intelligence.\nSurface Leakage. Fast.',
    subtext: 'We connect your financial systems, contracts, and invoices to AI that surfaces billing discrepancies, forecasts revenue, and delivers investor-ready clarity.',
    cta: 'See Financial AI',
    href: '/services/financial-intelligence',
  },
  {
    image: '/hero_slide4.png',
    headline: 'Digital Human Agents.\nSub-Second Latency. 40+ Languages.',
    subtext: 'Enterprise AI avatars that handle customer queries, onboard employees, and deliver brand-consistent interactions at scale — with intelligent escalation routing to your human team when needed.',
    cta: 'Explore Digital Humans',
    href: '/services/digital-humans',
  },
  {
    image: '/hero_slide2.png',
    headline: 'Computer Vision That\nCatches What Eyes Miss.',
    subtext: 'Real-time AI trained on your production line, warehouse, or field environment — detecting defects, monitoring compliance, and flagging anomalies before they become incidents.',
    cta: 'Explore Computer Vision',
    href: '/services/computer-vision',
  },
  {
    image: '/meta_rayban_glasses.png',
    headline: 'AI in Your Field.\nWorn. Not Carried.',
    subtext: 'Meta Ray-Ban smart glasses as a lightweight enterprise AI tool — photograph equipment, ask live questions, get instant AI guidance. Hands free. No headset required.',
    cta: 'Explore Wearable AI',
    href: '/services/ai-smart-glasses',
  },
];


// ── Trust Badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: Shield, label: 'SOC 2-Ready Architecture' },
  { icon: Server, label: 'On-Premise & Cloud Deployments' },
  { icon: Lock, label: 'Private VPC Architecture' },
  { icon: Globe, label: 'Data Privacy by Design' },
];

// ── Tech Stack ────────────────────────────────────────────────────────────────
const techStack = [
  // Big company AI platforms
  'OpenAI GPT-4o', 'Anthropic Claude', 'Google Gemini', 'Meta Llama 3',
  'Azure OpenAI', 'AWS Bedrock', 'GCP Vertex AI',
  // Frameworks
  'LangChain', 'LlamaIndex',
  // Vector & Infra
  'Pinecone', 'Kubernetes',
  // ML & Vision
  'PyTorch', 'Hugging Face', 'OpenCV',
];

// ── 4 Core Bento Pillars ──────────────────────────────────────────────────────
const pillars = [
  {
    id: 'genai',
    title: 'Enterprise Generative AI & RAG',
    tagline: 'LLMs trained on your knowledge — deployed within your chosen security boundary.',
    description: 'Custom LLM fine-tuning and secure orchestration against your proprietary document archives — on-premise, private VPC, or enterprise cloud.',
    longDescription:
      'We fine-tune and deploy large language models against your internal documentation, product data, and institutional knowledge — within your chosen deployment environment: fully private on-premise, private VPC, Azure OpenAI Service, AWS Bedrock, or GCP Vertex AI. Every deployment includes guardrails, hallucination scoring, and PII detection layers regardless of the infrastructure model.',

    image: '/bento_genai.png',
    category: 'Core AI',
    steps: [
      { title: 'Knowledge Ingestion', desc: 'All document sources connected inside your private network via secure connectors.' },
      { title: 'Embedding & Vector Indexing', desc: 'Content chunked, embedded, and stored in a private vector database.' },
      { title: 'RAG Pipeline', desc: 'Semantically relevant context retrieved at query time — LLM sees only what\'s needed.' },
      { title: 'Guardrail Layer', desc: 'Hallucination scoring, PII detection, and policy compliance before delivery.' },
      { title: 'Enterprise Integration', desc: 'Deployed via intranet, Slack, Teams, or custom UI with full audit logging.' },
    ],
    stack: ['GPT-4o / Llama 3 / Mistral', 'LangChain / LlamaIndex', 'Pinecone / Weaviate', 'FastAPI', 'Kubernetes'],
    metrics: [{ value: 'High', label: 'Resolution rate on indexed knowledge' }, { value: 'Flexible', label: 'On-premise to cloud deployment' }, { value: 'Zero', label: 'External data exposure (private deployments)' }],
    useCases: ['Enterprise Knowledge Assistants', 'Internal Copilots', 'Document Q&A', 'Compliance Bots'],
  },
  {
    id: 'data',
    title: 'Data Orchestration & Investor Readiness',
    tagline: 'Transform scattered corporate data into a VC-ready data room in weeks, not months.',
    description: 'Cleaning and structuring unlisted corporate data into investor-ready compliance data rooms.',
    longDescription:
      'We connect to your fragmented data sources — ERP, CRM, finance systems, contract repositories — clean and structure them, and build investor-ready data rooms that compress due diligence from months to days. The AI layer automatically validates data consistency, flags missing documentation, and generates standard VC-format reporting packages.',
    image: '/bento_data.png',
    category: 'Finance AI',
    steps: [
      { title: 'Source System Mapping', desc: 'Catalogue all data sources and assess completeness against VC checklist requirements.' },
      { title: 'Data Extraction', desc: 'Automated ETL pipelines pull from all connected systems.' },
      { title: 'AI Cleaning & Structuring', desc: 'LLM-powered normalization standardises terminology, units, and formats.' },
      { title: 'Gap Analysis', desc: 'AI flags missing documents, inconsistencies, and potential diligence red flags.' },
      { title: 'Data Room Assembly', desc: 'Investor-standard KPIs, cohort analysis, and documentation packaged.' },
    ],
    stack: ['Python / dbt', 'Snowflake', 'GPT-4o', 'Airflow', 'Notion API'],
    metrics: [{ value: '~30 days', label: 'Est. data room ready' }, { value: 'High', label: 'Data completeness vs VC checklist' }, { value: '~3Ã—', label: 'Est. faster than manual process' }],
    useCases: ['Series A/B/C Due Diligence', 'M&A Data Preparation', 'Board Reporting', 'Regulatory Submissions'],
  },
  {
    id: 'finance',
    title: 'Financial Intelligence & Revenue Auditing',
    tagline: 'AI that reads your MSAs and invoices to surface revenue leakage instantly.',
    description: 'Ingesting transactions, MSAs, and invoices to track and flag revenue leakages in real time.',
    longDescription:
      'Our financial intelligence systems connect to your transaction database, master service agreements, and invoice records to build a real-time map of your revenue flows. The AI cross-references contracted terms against actual invoicing to surface discrepancies, missed escalators, and billing gaps — delivering a living revenue audit dashboard your finance team can act on daily.',
    image: '/bento_finance.png',
    category: 'Finance AI',
    steps: [
      { title: 'Data Source Connection', desc: 'Ingests from ERP, billing systems, banking APIs, and document archives.' },
      { title: 'Contract Parsing', desc: 'AI reads MSAs and extracts pricing terms, escalators, and milestones.' },
      { title: 'Transaction Cross-referencing', desc: 'Every invoice matched against contracted terms at line-item level.' },
      { title: 'Anomaly Detection', desc: 'ML models flag under-billing, missed escalators, and duplicate charges.' },
      { title: 'Leakage Dashboard', desc: 'Real-time dashboard with flagged items, impact estimates, and recovery actions.' },
    ],
    stack: ['GPT-4o Vision', 'Unstructured.io', 'PostgreSQL', 'dbt', 'Power BI'],
    metrics: [{ value: 'Material', label: 'Billing discrepancies surfaced' }, { value: '~48h', label: 'Time to first insights' }, { value: 'Varies', label: 'Leakage found (project-dependent)' }],
    useCases: ['Revenue Leakage Recovery', 'Billing Accuracy Audits', 'MSA Compliance', 'Invoice Reconciliation'],
  },
  {
    id: 'spatial',
    title: 'Spatial Intelligence & Cognitive Digital Twins',
    tagline: 'Live 3D replicas of your physical systems powered by real-time predictive AI.',
    description: 'Building digital twins, spatial computing systems, and AR operations for physical infrastructure.',
    longDescription:
      'We build live digital twin environments that mirror your physical infrastructure in real time — factories, logistics networks, energy grids, or IT systems. These are active AI agents that ingest live sensor data, predict failures before they happen, and simulate operational changes. Extended with AR overlays compatible with all leading enterprise XR headsets including Meta Quest Pro, Microsoft HoloLens 2, Magic Leap 2, Vuzix Blade, and RealWear Navigator.',
    image: '/bento_spatial.png',
    category: 'Spatial Intelligence',
    steps: [
      { title: 'Physical System Mapping', desc: 'Survey of infrastructure, sensor networks, and data streams.' },
      { title: '3D Model Construction', desc: 'CAD, BIM, or photogrammetry data converted into a live 3D representation.' },
      { title: 'IoT Data Integration', desc: 'Real-time sensor telemetry streamed via MQTT or OPC-UA.' },
      { title: 'Predictive AI Layer', desc: 'Anomaly detection and failure prediction trained on historical sensor patterns.' },
      { title: 'AR Overlay (Optional)', desc: 'Contextual data overlaid onto enterprise XR headsets (Meta Quest Pro, HoloLens 2, Magic Leap 2) for field engineers.' },
    ],
    stack: ['Unity / Unreal Engine 5', 'AWS IoT Core', 'InfluxDB', 'Meta Quest SDK / HoloLens SDK', 'MQTT'],
    metrics: [{ value: 'Measurable', label: 'Downtime reduction via early prediction' }, { value: 'Early', label: 'Failure prediction window' }, { value: 'Real-time', label: 'Data sync' }],
    useCases: ['Factory Operations', 'Energy Grid Management', 'Supply Chain Simulation', 'Smart Buildings', 'AR Field Operations'],
  },
];

// ── Spatial Intelligence Cards ────────────────────────────────────────────────
const spatialCards = [
  {
    number: '01',
    title: 'Cognitive Digital Twins',
    description: 'Creating live, 3D digital replicas of physical facilities, supply chains, or data ecosystems powered by real-time predictive AI agents. Simulate operational changes before physical execution.',
    image: '/svc_digital_twins.png',
  },
  {
    number: '02',
    title: 'Spatial Computing & AR Operations',
    description: 'Overlaying contextual AI data and real-time instructions onto enterprise XR headsets — Meta Quest Pro, Microsoft HoloLens 2, Magic Leap 2, Vuzix Blade, and RealWear Navigator. Empowering field engineers and frontline staff with hands-free, AI-guided protocols.',
    image: '/svc_spatial_ar.png',
  },
  {
    number: '03',
    title: 'Immersive Simulation Environments',
    description: 'Building private, secure 3D simulation spaces where Digital Human Agents operate as interactive training and support staff. Scalable corporate training without geographic constraints.',
    image: '/svc_immersive.png',
  },
];

// ── Engagement Phases ─────────────────────────────────────────────────────────
const phases = [
  {
    number: '01',
    label: 'Est. Days 1—7',
    title: 'Technical Discovery',
    description: 'We map your data landscape, identify integration points, and scope the AI opportunity within your infrastructure.',
    deliverable: 'Technical opportunity brief + data readiness report',
  },
  {
    number: '02',
    label: 'Est. Days 8—30',
    title: 'Model Deployment & Integration',
    description: 'Your first AI system is built and deployed within your chosen infrastructure — private VPC, on-premise, or enterprise cloud. We configure the pipeline, connect data sources, and run the first round of evaluation testing with your team.',
    deliverable: 'Working AI system in staging environment',
  },
  {
    number: '03',
    label: 'Day 30—60 (Approx.)',
    title: 'Adversarial Testing & VPC Onboarding',
    description: 'Before production go-live, we red-team the system — prompt injection tests, edge-case evaluation, and performance benchmarking. Then we migrate to your production VPC with full handover documentation.',
    deliverable: 'Production-ready system + full documentation + team training',
  },
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

export default function HomePage() {

  const [activeSlide, setActiveSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const spatialRef = useRef<HTMLElement>(null);

  // Hero auto-advance
  useEffect(() => {
    const t = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  // Mouse parallax for spatial section
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePos({ x, y });
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background image slides */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Hero slide ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
              quality={100}
              unoptimized
            />
          </div>
        ))}

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

        {/* Text content — cross-fades with slide */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-300 mb-6">
                Applied Enterprise Artificial Intelligence
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.08] tracking-tight mb-6 whitespace-pre-line">
                {heroSlides[activeSlide].headline}
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
                {heroSlides[activeSlide].subtext}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={heroSlides[activeSlide].href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white text-sm font-semibold transition-colors shadow-lg"
                >
                  {heroSlides[activeSlide].cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/60 text-white text-sm font-semibold backdrop-blur-sm transition-all"
                >
                  Book Free Audit
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="absolute bottom-10 left-6 flex items-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? 'w-8 h-2 bg-[#29B6F6]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-zinc-500">
                <Icon className="w-4 h-4 text-[#29B6F6]" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 CORE CAPABILITIES BENTO ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4"
            >
              Core Capabilities
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight"
            >
              Four pillars. One engineering team.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-zinc-500 text-lg mt-4 max-w-2xl mx-auto"
            >
              We don&apos;t sell software licences. We embed engineers who build AI systems custom to your infrastructure.
            </motion.p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => {
              const icons = [Brain, Database, DollarSign, Layers];
              const Icon = icons[i];
              return (
                <Link key={pillar.id} href={`/services/${pillar.id}`} className="block">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white cursor-pointer card-hover h-full"
                  style={{ minHeight: i === 0 || i === 3 ? 340 : 280 }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-900/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm bg-black/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-white/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#29B6F6]/20 border border-[#29B6F6]/30 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#29B6F6]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium text-white mb-2 leading-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed mb-4">
                        {pillar.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#29B6F6] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>View details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                </Link>
              );
            })}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={5}
            className="text-center mt-10"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#29B6F6] hover:underline"
            >
            Show all services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

<section className="relative py-24 overflow-hidden bg-[#060d18]">

        {/* === ANIMATED BACKGROUND LAYERS === */}

        {/* 1. Neuron texture — at readable opacity */}
        <Image
          src="/neuron_hero.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.12] pointer-events-none select-none"
        />

        {/* 2. Floating animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Orb 1 — top-left blue */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(41,182,246,0.18) 0%, transparent 70%)',
              top: '-120px', left: '-80px',
              animation: 'orb-float-1 8s ease-in-out infinite',
            }}
          />
          {/* Orb 2 — bottom-right teal */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(14,32,46,0.9) 0%, rgba(41,182,246,0.12) 60%, transparent 100%)',
              bottom: '-80px', right: '-60px',
              animation: 'orb-float-2 10s ease-in-out infinite',
            }}
          />
          {/* Orb 3 — centre pulse */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(41,182,246,0.08) 0%, transparent 70%)',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              animation: 'orb-pulse 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* 3. Fine dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        {/* 4. Dark vignette edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18]/80 via-transparent to-[#060d18]/80 pointer-events-none" />

        {/* CSS keyframe definitions */}
        <style>{`
          @keyframes orb-float-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, 30px) scale(1.08); }
            66% { transform: translate(-20px, 50px) scale(0.95); }
          }
          @keyframes orb-float-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40% { transform: translate(-50px, -40px) scale(1.1); }
            70% { transform: translate(20px, -20px) scale(0.92); }
          }
          @keyframes orb-pulse {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
          }
        `}</style>

        {/* === CONTENT === */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' as const }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            {/* Left — Logo + tagline */}
            <div className="flex flex-col items-start gap-8">
              <Image
                src="/logos/86B_white.png"
                alt="86B.ai"
                width={200}
                height={72}
                className="object-contain"
              />
              <div className="flex flex-col gap-3">
                <p className="text-white text-2xl md:text-3xl font-extralight leading-[1.55] max-w-xs">
                  A philosophy,<br />
                  <span className="text-[#29B6F6]">not a benchmark.</span>
                </p>
                <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs">
                  Named after the 86 billion neurons in the human brain — the most efficient intelligence ever observed.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#29B6F6] text-xs uppercase tracking-widest font-medium hover:text-white transition-colors duration-300 group"
              >
                Our philosophy
                <span className="w-4 h-px bg-[#29B6F6] group-hover:w-8 transition-all duration-300" />
              </Link>
            </div>

            {/* Right — Three manifesto words */}
            <div className="flex flex-col">
              {[
                { word: 'Emergent.', sub: 'Not programmed. Shaped by data, context, and iteration.' },
                { word: 'Adaptive.', sub: 'Built for your organisation — not retrofitted from a template.' },
                { word: 'Contextual.', sub: 'Every response shaped by who you are, not just what you asked.' },
              ].map((item, i) => (
                <motion.div
                  key={item.word}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.13, ease: 'easeOut' as const }}
                  className="group flex items-start gap-5 py-6 border-b border-white/[0.08] last:border-0"
                >
                  {/* Glowing number badge */}
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#29B6F6]/15 border border-[#29B6F6]/30 flex items-center justify-center text-[#29B6F6] text-[10px] font-medium mt-1 group-hover:bg-[#29B6F6]/25 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="block text-white text-2xl md:text-3xl font-extralight tracking-tight group-hover:text-[#29B6F6] transition-colors duration-300">
                      {item.word}
                    </span>
                    <span className="block text-white/45 text-sm font-light mt-1 leading-relaxed">
                      {item.sub}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK CLOUD — moved here: supports the Deployment Spectrum above ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-14 bg-white border-t border-zinc-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            variants={fadeUp}
            className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-8"
          >
            Technology We Deploy
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={1}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-500 text-sm font-medium hover:border-[#29B6F6]/40 hover:text-zinc-700 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SPATIAL INTELLIGENCE ─────────────────────────────────────────────────────────────────── */}
      <section
        id="spatial"
        ref={spatialRef}
        onMouseMove={onMouseMove}
        className="relative py-16 md:py-20 bg-[#0E202E] overflow-hidden"
      >
        {/* Mesh grid bg */}
        <div className="absolute inset-0 mesh-grid opacity-100" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#29B6F6]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-10 md:mb-12"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4">
              Spatial Intelligence
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-white leading-tight">
              Where AI Meets the Physical World
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">
              For organisations running physical operations — factories, logistics networks, and field teams — where AI meets the real world through digital twins, AR guidance, and simulation.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spatialCards.map((card, i) => (
              <motion.div
                key={card.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i * 0.15}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.2 * (i - 1)}deg)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <Link href={`/services/${i === 0 ? 'cognitive-digital-twins' : i === 1 ? 'spatial-computing-ar' : 'immersive-environments'}`}>
                  <div className="glass-spatial rounded-2xl overflow-hidden h-full group cursor-pointer">
                    {/* Card image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                      <span className="absolute top-4 left-4 text-xs font-mono font-semibold text-[#29B6F6]">
                        {card.number}
                      </span>
                    </div>
                    {/* Card content */}
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-white mb-3 leading-tight">{card.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center gap-2 text-[#29B6F6] text-xs font-semibold opacity-40 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEARABLE AI ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-white border-t border-zinc-100 overflow-hidden">
        {/* Soft radial glow */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#29B6F6]/6 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#29B6F6] mb-5">
                <span className="w-6 h-px bg-[#29B6F6]/40" />
                Wearable AI
                <span className="w-6 h-px bg-[#29B6F6]/40" />
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-light text-[#0E202E] leading-tight mb-6">
                AI on your face.<br />Hands free. Field ready.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed mb-8 max-w-xl">
                Meta Ray-Ban smart glasses turn any field engineer into an AI-powered expert. Photograph equipment, scan barcodes, ask live questions — instant guidance without touching a screen.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="space-y-3 mb-10">
                {[
                  'Instant fault identification from a photo',
                  'Real-time manual & SOP retrieval',
                  'Hands-free work order logging',
                  'No headset. No friction. Just glasses.',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-zinc-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#29B6F6] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} custom={4}>
                <Link
                  href="/services/ai-smart-glasses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white text-sm font-semibold transition-colors shadow-lg"
                >
                  Explore Wearable AI
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Images */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/meta_rayban_field.png"
                  alt="Engineer using Meta Ray-Ban smart glasses in the field"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E202E]/60 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <p className="text-white text-sm font-semibold">Meta Ray-Ban Smart Glasses</p>
                  <p className="text-white/60 text-xs mt-0.5">No headset required. Works with standard eyewear frames.</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute -bottom-6 -right-4 w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl"
              >
                <Image
                  src="/meta_rayban_glasses.png"
                  alt="Meta Ray-Ban glasses close-up"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── DIGITAL HUMAN DEMO ─────────────────────────────────────────────────── */}
      <AudioWaveDemo />

      <section className="py-24 bg-[#0A1628] relative overflow-hidden border-y border-white/5">
        {/* Deep ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full bg-[#29B6F6]/10 blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-20">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#29B6F6] mb-5">
              <span className="w-6 h-px bg-[#29B6F6]/40" />
              Deployment Spectrum
              <span className="w-6 h-px bg-[#29B6F6]/40" />
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-light text-white leading-tight">
              Your infrastructure. Your choice.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg mt-5 max-w-2xl mx-auto leading-relaxed font-light">
              From fully air-gapped on-premise to Azure, AWS, and GCP managed endpoints — we deploy where your security, compliance, and budget requirements demand.
            </motion.p>
          </motion.div>

          {/* Cards grid + glowing track */}
          <div className="relative pt-6">
            {/* The continuous spectrum track line */}
            <div className="hidden lg:block absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-[#29B6F6]/80 to-purple-500/80 shadow-[0_0_15px_rgba(41,182,246,0.6)]" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
            >
              {[
                {
                  tier: '01',
                  title: 'On-Premise\nAir-Gapped',
                  sub: 'Maximum control',
                  desc: 'Fully self-hosted on your own hardware or data centre. No external network calls. Required for defence, government, and regulated finance.',
                  tags: ['Llama 3', 'Mistral', 'vLLM', 'Kubernetes'],
                },
                {
                  tier: '02',
                  title: 'Private VPC',
                  sub: 'Balanced security',
                  desc: 'Deployed inside your own cloud account (AWS, Azure, GCP). You own the compute, we handle the engineering. Data never leaves your perimeter.',
                  tags: ['AWS VPC', 'Azure VNET', 'GCP Private', 'Kubernetes'],
                },
                {
                  tier: '03',
                  title: 'Enterprise\nCloud APIs',
                  sub: 'Fast to deploy',
                  desc: 'Azure OpenAI Service, AWS Bedrock, or GCP Vertex AI with private endpoints. Ideal if you already hold Microsoft EA or AWS EDP credits.',
                  tags: ['Azure OpenAI', 'AWS Bedrock', 'GCP Vertex', 'Private Link'],
                },
                {
                  tier: '04',
                  title: 'Managed\nAPI Tier',
                  sub: 'Lowest upfront cost',
                  desc: 'OpenAI Enterprise, Anthropic Claude, or Cohere — via your own API keys with DPAs in place. Best for non-sensitive use cases where speed matters.',
                  tags: ['OpenAI Enterprise', 'Anthropic Claude', 'Cohere', 'DPA in place'],
                },
              ].map((d, i) => (
                <motion.div
                  key={d.tier}
                  variants={fadeUp}
                  custom={i * 0.12}
                  className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 flex flex-col gap-6 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 hover:border-white/20 group"
                >
                  {/* Subtle top indicator connecting to the track (mobile visible, desktop just accent) */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-white/20 group-hover:bg-[#29B6F6]/50 transition-colors duration-500" />
                  
                  {/* Node dot (only visible on desktop to connect to the top line) */}
                  <div className="hidden lg:block absolute -top-[25px] left-8 w-3 h-3 rounded-full bg-[#0A1628] border-2 border-white/40 group-hover:border-white group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all z-10" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-white/70 border border-white/10 group-hover:border-[#29B6F6]/40 group-hover:text-[#29B6F6] transition-colors">
                      {d.sub}
                    </span>
                    <span className="text-xl font-light text-white/20">{d.tier}</span>
                  </div>

                  <h3 className="font-light text-white text-2xl leading-tight whitespace-pre-line">{d.title}</h3>

                  <p className="text-white/50 text-sm leading-relaxed font-light flex-1">{d.desc}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {d.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded bg-black/30 border border-white/5 text-[10px] font-medium text-white/40 group-hover:text-white/60 transition-colors">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6}
            className="text-center text-xs text-zinc-400 mt-8"
          >
            We advise on the right model for your situation. You decide. Our engineers build and run it.
          </motion.p>
        </div>
      </section>

      {/* ── ENGAGEMENT PHILOSOPHY ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB] border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-3xl mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4">
              How We Engage
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-[#0E202E] leading-tight mb-4">
              Solution engineers,<br />not software licences.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed">
              We don&apos;t sell you a SaaS subscription and disappear. We embed our engineers inside your delivery team, build to your specifications, and leave you with full ownership — backed by optional post-launch Service Level Agreements (SLAs) for ongoing maintenance.
            </motion.p>
          </motion.div>

          {/* Phase timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-zinc-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="relative"
                >
                  {/* Step number circle */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0E202E] text-white font-normal text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-zinc-900/15">
                      {phase.number}
                    </div>
                    <span className="text-xs font-semibold text-[#5A6A7A] bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full">
                      {phase.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-[#0E202E] mb-3">{phase.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{phase.description}</p>

                  <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#29B6F6] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-600">{phase.deliverable}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── BOTTOM CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0E202E] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
              Start with a free AI audit.<br />No sales pitch. Just engineers.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
              No commitment. No public data sharing. Just an honest conversation about where AI can move the needle in your organisation.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0E202E] text-sm font-normal hover:bg-zinc-100 transition-colors shadow-lg"
              >
                Book Free AI Audit
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-we-build"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:border-white/60 transition-colors"
              >
                How We Build
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>



      <Footer />
    </div>
  );
}


