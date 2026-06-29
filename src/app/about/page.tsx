'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

const principles = [
  {
    number: '01',
    title: 'We build, you own.',
    description:
      'Every line of code, every model weight, every pipeline — handed to you at the end of the engagement. No subscription required to keep the lights on. No vendor dependency. Just software your team controls.',
  },
  {
    number: '02',
    title: 'Privacy is not a feature. It is the foundation.',
    description:
      'We design every AI system with data privacy as a foundational requirement — not an afterthought. Where your compliance requirements demand it, we build fully air-gapped on-premise deployments. Where your existing cloud agreements allow it, we deploy within private VPCs on Azure, AWS, or GCP with private endpoints and data residency controls.',
  },
  {
    number: '03',
    title: 'Strict confidentiality.',
    description:
      'Before any technical conversation, a strict confidentiality agreement is established. Your business model, your data landscape, and your strategic priorities are protected the moment you engage with us.',
  },
  {
    number: '04',
    title: 'Engineers embedded, not outsourced.',
    description:
      'We work inside your delivery team. Our engineers attend your standups, use your project management tools, and collaborate directly with your product and data teams. We are not a black box.',
  },
  {
    number: '05',
    title: 'Measurable outcomes, not vague roadmaps.',
    description:
      'Every engagement has defined success metrics agreed before work begins. We know what "done" looks like. Our contracts include milestone-based billing tied to delivered functionality, not billable hours.',
  },
];

const stats = [
  { value: 'Weeks*', unit: '', label: 'Typical first deployment timeline' },
  { value: '4', unit: '', label: 'Deployment models (on-prem to cloud)' },
  { value: '19', unit: '', label: 'AI capabilities across 8 practice areas' },
  { value: '100%', unit: '', label: 'Client-owned code and model weights' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* ── INSPIRATION HEADER ───────────────────────────────────────────────── */}
      <section className="relative bg-[#060d18] overflow-hidden">
        {/* Neuron image — very faint */}
        <Image
          src="/neuron_hero.png"
          alt=""
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18]/80 via-[#060d18]/70 to-[#060d18]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-44 pb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-5">

            <motion.p variants={fadeUp} className="text-[#29B6F6] text-[11px] uppercase tracking-[0.3em] font-medium">
              The inspiration behind 86b.ai
            </motion.p>

            <motion.h1 variants={fadeUp} custom={1}
              className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl"
            >
              Named after <span className="text-[#29B6F6] font-light">86 billion neurons</span> — intelligence that has always been specific to one person, one context, one lifetime.
            </motion.h1>

            <motion.blockquote
              variants={fadeUp}
              custom={2}
              className="border-l-2 border-[#29B6F6]/40 pl-6 mt-2 max-w-2xl"
            >
              <p className="text-white/80 text-lg md:text-xl font-light leading-[1.75] italic">
                "86b.ai carries that number as a name because we carry it as a philosophy. Not a target to hit, not a benchmark to beat — but a reminder of what intelligence truly is. Emergent. Adaptive. Deeply contextual. Born not from raw power, but from the slow, patient accumulation of experience."
              </p>
            </motion.blockquote>

            <motion.p variants={fadeUp} custom={3} className="text-white/35 text-base font-light leading-relaxed max-w-xl">
              Every AI system we build carries the same standard: specific to your organisation, adaptive to your context, and owned by you entirely.
            </motion.p>

          </motion.div>
        </div>
      </section>



      {/* ── MISSION ──────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block text-xs font-normal uppercase tracking-widest text-[#5A6A7A] mb-4">
            About 86b.ai
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#0E202E] mb-6 leading-[1.06] max-w-3xl">
            Solution Engineers,<br />
            <span className="text-[#1F3249] italic font-normal">Not Software Licences.</span>
          </h2>
          <p className="text-zinc-500 text-xl leading-relaxed max-w-2xl mb-12">
            We are an applied AI engineering firm. We build custom AI systems that integrate with your existing infrastructure — deployed within your chosen environment, from on-premise to enterprise cloud — and hand them over with full source code, documentation, and team training.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="text-3xl font-light text-[#0E202E]">
                  {s.value}
                  <span className="text-[#5A6A7A] text-xl ml-0.5">{s.unit}</span>
                </div>
                <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="stats-disclaimer mt-4">
            * Estimated based on prior similar engagements. Actual timelines, scope and outcomes vary by project complexity and are confirmed only after a detailed requirement analysis under mutual NDA. Nothing on this page constitutes a guarantee.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-normal uppercase tracking-widest text-[#5A6A7A] mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl font-light text-[#0E202E] mb-6 leading-tight">
                A small team with deep expertise in enterprise AI delivery.
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  86b.ai was founded by engineers who spent years building AI systems inside large enterprises — and grew frustrated watching companies pay millions for software subscriptions that didn&apos;t solve the actual problem.
                </p>
                <p>
                  The problem is never a lack of AI tools. The problem is always the same: scattered, low-quality data; security architectures that make cloud AI impossible; and AI solutions built for generic use cases that don&apos;t understand your business.
                </p>
                <p>
                  We exist to solve that problem. One engagement at a time. With engineers who write the code themselves, understand the regulatory constraints, and stay until the system is genuinely working in production.
                </p>
              </div>
            </div>

            <div className="bg-[#0E202E] rounded-2xl p-8 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                The Alternative to:
              </span>
              <ul className="mt-6 space-y-4">
                {[
                  'A SaaS company that charges per seat',
                  'A systems integrator who outsources delivery',
                  'A consulting firm that produces slide decks',
                  "A startup selling AI you don't control",
                  'An offshore development shop with no AI depth',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-zinc-800 mt-8 pt-6 text-sm text-zinc-400">
                We are engineers who build AI systems inside your infrastructure and hand them over.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERATIONAL PRINCIPLES ───────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block text-xs font-normal uppercase tracking-widest text-[#5A6A7A] mb-4">
            Operational Principles
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#0E202E] mb-16 max-w-2xl leading-tight">
            The beliefs that shape every engagement we take on.
          </h2>

          <div className="space-y-6">
            {principles.map((p) => (
              <div
                key={p.number}
                className="grid md:grid-cols-[80px_1fr] gap-6 p-8 rounded-2xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="text-4xl font-light text-zinc-200">{p.number}</div>
                <div>
                  <h3 className="text-lg font-medium text-[#0E202E] mb-2">{p.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0E202E] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Ready to work with engineers who build?
          </h2>
          <p className="text-white/75 mb-8 text-lg">
            Start with a free AI audit. Under mutual NDA. No commitment required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#29B6F6] text-white font-normal hover:bg-[#039BE5] transition-colors"
            >
              Book Free AI Audit
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-white/60 transition-colors"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
