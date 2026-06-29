'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Clock, Shield, Zap, CheckCircle2, FileText, Server, FlaskConical, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const phases = [
  {
    number: '01',
    timeframe: 'Phase 1',
    title: 'Discovery & Audit',
    color: 'bg-[#0E202E]',
    icon: FileText,
    description:
      'Before a single technical detail is shared, our lead engineers conduct a comprehensive data landscape audit — mapping all data sources, identifying integration touchpoints, assessing data quality, and scoping the AI opportunity within your existing infrastructure.',
    deliverables: [
      'Data source inventory and quality assessment',
      'AI opportunity brief with prioritised use cases',
      'Technical feasibility report',
      'Preliminary architecture sketch',
    ],
    team: 'Lead Solutions Architect + Data Engineer',
  },
  {
    number: '02',
    timeframe: 'Phase 2',
    title: 'Staging Environment & Integration',
    color: 'bg-[#0E202E]',
    icon: Server,
    description:
      'Your first AI system is built and deployed within a secure staging environment. We configure the RAG pipeline, connect all approved data sources, deploy or connect the AI model, and run the first round of evaluation testing alongside your internal subject matter experts.',
    deliverables: [
      'Working AI system in your staging environment',
      'RAG pipeline fully configured and tested',
      'All data source connectors live',
      'User acceptance testing session with your team',
      'Performance baseline benchmarks',
    ],
    team: 'ML Engineer + Backend Engineer + QA Specialist',
  },
  {
    number: '03',
    timeframe: 'Phase 3',
    title: 'Secure VPC Migration & Go-Live',
    color: 'bg-[#0E202E]',
    icon: FlaskConical,
    description:
      'Before production go-live, our red-team conducts systematic adversarial testing. Once the system passes our quality gates, we execute the secure migration into your production VPC, cloud account, or on-premise servers. We then hand over complete documentation, source code, and training for your internal team, backed by optional ongoing Service Level Agreements (SLAs) for maintenance and upgrades.',
    deliverables: [
      'Red-team adversarial testing report',
      'Production VPC/Cloud deployment',
      'Complete source code handover',
      'Operational runbooks and documentation',
      'Internal team training sessions',
      'Ongoing SLA & Managed Support Agreements',
    ],
    team: 'Security Engineer + ML Engineer + Lead Architect',
  },
];

const principles = [
  { icon: Shield, title: 'Security First, Always', desc: 'Every engagement begins with strict confidentiality. Your data, architecture, and business context are never shared beyond the active project team.' },
  { icon: Zap, title: 'Engineers, Not Consultants', desc: 'We build. You own the output. No recurring licence fees, no vendor lock-in — just production-ready AI systems with full source code.' },
  { icon: CheckCircle2, title: 'Your Infrastructure', desc: 'We deploy inside your VPC, your cloud account, or your own servers — on-premise, Azure, AWS, or GCP. You own the system, the data, and the models.' },
];

export default function HowWeBuildPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* ── MINI HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#060d18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628]/90 to-[#060d18]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4 block">Our Engineering Process</span>
          <h1 className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl mb-4">
            Audit to production AI.<br />
            <span className="text-[#29B6F6] font-light">Scoped, built, delivered, and supported.</span>
          </h1>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">
            A disciplined, three-phase engagement model designed for enterprise security requirements, regulatory compliance, and measurable delivery milestones.
          </p>
        </div>
      </section>

      {/* Principles strip */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap gap-6">
          {principles.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 max-w-xs">
              <div className="w-9 h-9 rounded-xl bg-[#0E202E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#0E202E]" />
              </div>
              <div>
                <p className="font-semibold text-[#0E202E] text-sm">{title}</p>
                <p className="text-zinc-700 text-xs leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase timeline */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <div key={phase.number} className="relative">
              {/* Connector */}
              {i < phases.length - 1 && (
                <div className="absolute left-7 top-[72px] bottom-[-32px] w-px bg-zinc-200 z-0" />
              )}

              <div className="relative z-10 flex gap-8">
                {/* Number */}
                <div className={`w-14 h-14 rounded-2xl ${phase.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                  {/* Card header */}
                  <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono font-semibold text-zinc-400">{phase.number}</span>
                        <span className="text-xs font-normal text-[#5A6A7A] bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {phase.timeframe}
                        </span>
                      </div>
                      <h2 className="text-xl font-medium text-[#0E202E]">{phase.title}</h2>
                    </div>
                    <span className="text-xs text-zinc-400 hidden md:block">{phase.team}</span>
                  </div>

                  {/* Card body */}
                  <div className="p-8 grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-zinc-700 leading-relaxed text-sm">{phase.description}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
                        Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {phase.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-zinc-700">
                            <CheckCircle2 className="w-4 h-4 text-[#0E202E] flex-shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <section className="bg-[#0E202E] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Ready to start your Phase 1 audit?
          </h2>
          <p className="text-zinc-400 mb-8">
            No commitment. All conversations are strictly confidential before we discuss any technical details.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white font-semibold transition-colors"
          >
            Book Free AI Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}


