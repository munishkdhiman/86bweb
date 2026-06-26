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
import ServiceModal, { type ModalService } from '@/components/ServiceModal';

// ── Hero Slides ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: '/hero_slide1.png',
    headline: 'Unlocking Enterprise Potential\nThrough Applied AI',
    subtext: 'We embed solution engineers inside your teams and build custom, private AI that integrates with your existing infrastructure — not around it.',
    cta: 'Explore AI Solutions',
  },
  {
    image: '/hero_slide2.png',
    headline: 'Private AI Infrastructure.\nZero Public Exposure.',
    subtext: 'Your data never transits a public endpoint. On-premise LLMs, private VPCs, and air-gapped deployments — built and maintained by our engineers.',
    cta: 'View Our Infrastructure',
  },
  {
    image: '/hero_slide3.png',
    headline: 'From Raw Data to Revenue\nIntelligence in 90 Days.',
    subtext: 'We connect your financial systems, contracts, and invoices to AI that surfaces leakage, forecasts revenue, and delivers investor-ready clarity — fast.',
    cta: 'See Financial AI',
  },
  {
    image: '/hero_slide4.png',
    headline: 'Digital Human Agents.\n0.3s Latency. 40+ Languages.',
    subtext: 'Enterprise AI avatars that handle customer queries, onboard employees, and deliver brand-consistent interactions at scale — without human escalation.',
    cta: 'Explore Digital Humans',
  },
];

// ── Trust Badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: Shield, label: 'SOC 2 Compliant' },
  { icon: Server, label: 'On-Premise Deployments' },
  { icon: Lock, label: 'Private VPC Architecture' },
  { icon: Globe, label: 'Zero Public Data Leakage' },
];

// ── Tech Stack ────────────────────────────────────────────────────────────────
const techStack = [
  'GPT-4o', 'Claude 3.5', 'Llama 3', 'Mistral',
  'LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate',
  'Azure AI', 'AWS Bedrock', 'Kubernetes', 'PyTorch',
];

// ── 4 Core Bento Pillars ──────────────────────────────────────────────────────
const pillars: ModalService[] = [
  {
    id: 'genai',
    title: 'Enterprise Generative AI & RAG',
    tagline: 'Private LLMs trained on your knowledge — inside your security boundary.',
    description: 'Custom private LLM fine-tuning and secure orchestration against your proprietary document archives.',
    longDescription:
      'We fine-tune and deploy private large language models against your internal documentation, product data, and institutional knowledge. Your AI assistant knows your business inside out, stays within your security boundary, and never exposes sensitive data to public APIs. Every deployment includes guardrails, hallucination scoring, and PII detection.',
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
    metrics: [{ value: '85%', label: 'Query resolution' }, { value: '10×', label: 'Faster retrieval' }, { value: '100%', label: 'Private' }],
    useCases: ['Enterprise Knowledge Assistants', 'Internal Copilots', 'Document Q&A', 'Compliance Bots'],
  },
  {
    id: 'data',
    title: 'Data Orchestration & Investor Readiness',
    tagline: 'Transform scattered corporate data into a VC-ready data room in days.',
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
    metrics: [{ value: '30d', label: 'Data room ready' }, { value: '95%', label: 'Data completeness' }, { value: '3×', label: 'Faster diligence' }],
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
    metrics: [{ value: '12%', label: 'Avg revenue recovered' }, { value: '48h', label: 'First insights' }, { value: '$2M+', label: 'Avg leakage found' }],
    useCases: ['Revenue Leakage Recovery', 'Billing Accuracy Audits', 'MSA Compliance', 'Invoice Reconciliation'],
  },
  {
    id: 'spatial',
    title: 'Spatial Intelligence & Cognitive Digital Twins',
    tagline: 'Live 3D replicas of your physical systems powered by real-time predictive AI.',
    description: 'Building digital twins, spatial computing systems, and AR operations for physical infrastructure.',
    longDescription:
      'We build live digital twin environments that mirror your physical infrastructure in real time — factories, logistics networks, energy grids, or IT systems. These are active AI agents that ingest live sensor data, predict failures before they happen, and simulate operational changes. Extended with AR overlays for Apple Vision Pro and Meta Quest.',
    image: '/bento_spatial.png',
    category: 'Spatial Intelligence',
    steps: [
      { title: 'Physical System Mapping', desc: 'Survey of infrastructure, sensor networks, and data streams.' },
      { title: '3D Model Construction', desc: 'CAD, BIM, or photogrammetry data converted into a live 3D representation.' },
      { title: 'IoT Data Integration', desc: 'Real-time sensor telemetry streamed via MQTT or OPC-UA.' },
      { title: 'Predictive AI Layer', desc: 'Anomaly detection and failure prediction trained on historical sensor patterns.' },
      { title: 'AR Overlay (Optional)', desc: 'Contextual data overlaid onto Apple Vision Pro or Meta Quest for field engineers.' },
    ],
    stack: ['Unity / Unreal Engine 5', 'AWS IoT Core', 'InfluxDB', 'Apple Vision Pro SDK', 'MQTT'],
    metrics: [{ value: '35%', label: 'Downtime reduction' }, { value: '72h', label: 'Failure prediction' }, { value: 'Real-time', label: 'Data sync' }],
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
    description: 'Overlaying contextual AI data and real-time instructions onto AR/VR hardware (Apple Vision Pro, Meta Quest). Empowering field engineers with hands-free, AI-guided maintenance protocols.',
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
    label: 'Est. Days 1–7',
    title: 'Secure Data Audit & NDA',
    description: 'We sign a mutual NDA before any technical conversation begins. Our engineers map your data landscape, identify integration points, and scope the AI opportunity within your infrastructure.',
    deliverable: 'Technical opportunity brief + data readiness report',
  },
  {
    number: '02',
    label: 'Est. Days 8–30',
    title: 'Private RAG & Model Deployment',
    description: 'Your first AI system is built and deployed inside your security boundary. We configure the RAG pipeline, connect data sources, and run the first round of evaluation testing with your team.',
    deliverable: 'Working AI system in staging environment',
  },
  {
    number: '03',
    label: 'Day 30+ (Approx.)',
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
  const [selectedPillar, setSelectedPillar] = useState<ModalService | null>(null);
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6 whitespace-pre-line">
                {heroSlides[activeSlide].headline}
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
                {heroSlides[activeSlide].subtext}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
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

      {/* ── TECH STACK CLOUD ──────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-[#F9FAFB]"
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
                className="px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-500 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

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
              className="text-4xl md:text-5xl font-bold text-[#0E202E] leading-tight"
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
                <motion.div
                  key={pillar.id}
                  layoutId={`card-${pillar.id}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i * 0.15}
                  onClick={() => setSelectedPillar(pillar)}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white cursor-pointer card-hover"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E202E]/90 via-[#0E202E]/40 to-[#0E202E]/10" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-white/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#29B6F6]/20 border border-[#29B6F6]/30 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#29B6F6]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
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
              View all 16 services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SPATIAL INTELLIGENCE ──────────────────────────────────────────────── */}
      <section
        id="spatial"
        ref={spatialRef}
        onMouseMove={onMouseMove}
        className="relative py-28 bg-[#0E202E] overflow-hidden"
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
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4">
              New Pillar
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Spatial Intelligence
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">
              Enterprise immersive operations — where AI meets the physical world through digital twins, AR computing, and simulation environments.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  transition: 'transform 0.15s ease-out',
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
                      <h3 className="text-lg font-bold text-white mb-3 leading-tight">{card.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center gap-2 text-[#29B6F6] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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

      {/* ── DIGITAL HUMAN DEMO ─────────────────────────────────────────────────── */}
      <AudioWaveDemo />

      {/* ── ENGAGEMENT PHILOSOPHY ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB]">
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
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold text-[#0E202E] leading-tight mb-4">
              Solution engineers,<br />not software licences.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed">
              We don&apos;t sell you a SaaS subscription and disappear. We embed our engineers inside your delivery team, build to your specifications, and leave you with full ownership.
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

                  <h3 className="text-lg font-bold text-[#0E202E] mb-3">{phase.title}</h3>
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Start with a free AI audit.<br />Under strict mutual NDA.
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

      {/* ── SERVICE MODAL ─────────────────────────────────────────────────────── */}
      <ServiceModal service={selectedPillar} onClose={() => setSelectedPillar(null)} />
    </div>
  );
}


