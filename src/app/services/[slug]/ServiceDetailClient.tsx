'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceModal, { type ModalService } from '@/components/ServiceModal';
import { services, type Service } from '@/lib/services-data';

interface Props { svc: Service; }

export default function ServiceDetailClient({ svc }: Props) {
  const [showModal, setShowModal] = useState(false);

  const related = services
    .filter((s) => s.slug !== svc.slug && s.category === svc.category)
    .slice(0, 3)
    .concat(
      services
        .filter((s) => s.slug !== svc.slug && s.category !== svc.category)
        .slice(0, Math.max(0, 3 - services.filter((s2) => s2.slug !== svc.slug && s2.category === svc.category).slice(0, 3).length))
    )
    .slice(0, 3);

  const modalService: ModalService = { id: svc.slug, ...svc };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={svc.image} alt={svc.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/75 to-zinc-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-28">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{svc.title}</span>
          </div>

          <div className="max-w-2xl">
            <span className="inline-block text-xs font-normal uppercase tracking-widest text-[#5A6A7A] bg-zinc-100 px-3 py-1.5 rounded-full mb-6">
              {svc.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{svc.title}</h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{svc.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white font-semibold transition-colors shadow-lg"
              >
                Request Technical Audit
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/60 text-white font-semibold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-[#0E202E] mb-4">Overview</h2>
              <p className="text-zinc-600 leading-relaxed text-lg">{svc.longDescription}</p>
            </div>

            {svc.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {svc.metrics.map((m) => (
                  <div key={m.label} className="p-5 rounded-2xl bg-white border border-zinc-200 text-center">
                    <div className="text-3xl font-bold text-[#0E202E] mb-1">{m.value}</div>
                    <div className="text-sm text-zinc-500">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-[#0E202E] mb-6">Implementation Pipeline</h2>
              <ol className="space-y-5">
                {svc.steps.map((step, i) => (
                  <li key={i} className="flex gap-5 p-5 bg-white rounded-xl border border-zinc-200">
                    <span className="w-8 h-8 rounded-full bg-[#0E202E]/10 text-[#0E202E] text-sm font-normal flex items-center justify-center flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-semibold text-[#0E202E]">{step.title}</p>
                      <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0E202E] mb-6">Use Cases</h2>
              <div className="grid grid-cols-2 gap-3">
                {svc.useCases.map((uc) => (
                  <div key={uc} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#0E202E] flex-shrink-0" />
                    <span className="text-sm text-zinc-700 font-medium">{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0E202E] rounded-2xl p-6 text-white sticky top-24">
              <h3 className="font-bold text-lg mb-2">Deploy Under NDA</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Request a technical audit and deployment plan. All conversations covered by mutual NDA from the first call.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3.5 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] text-white font-semibold transition-colors text-sm"
              >
                Request Technical Audit
              </button>
              <div className="mt-4 space-y-2">
                {['Mutual NDA signed first', 'No commitment required', 'Response within 24h'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#29B6F6]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {svc.stack.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg border border-zinc-200">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-white border-t border-zinc-200 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#0E202E] mb-8">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group block rounded-xl border border-zinc-200 bg-white overflow-hidden hover:border-zinc-300 hover:shadow-md transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-zinc-100">
                    <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-zinc-400">{rel.category}</span>
                    <h3 className="font-semibold text-[#0E202E] text-sm mt-1 mb-1 leading-tight">{rel.title}</h3>
                    <div className="flex items-center gap-1 text-[#29B6F6] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <ServiceModal service={showModal ? modalService : null} onClose={() => setShowModal(false)} />
    </div>
  );
}
