'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { services, type Service } from '@/lib/services-data';

interface Props { svc: Service; }

export default function ServiceDetailClient({ svc }: Props) {
  const related = services
    .filter((s) => s.slug !== svc.slug && s.category === svc.category)
    .slice(0, 3)
    .concat(
      services
        .filter((s) => s.slug !== svc.slug && s.category !== svc.category)
        .slice(0, Math.max(0, 3 - services.filter((s2) => s2.slug !== svc.slug && s2.category === svc.category).slice(0, 3).length))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 min-h-[480px] lg:min-h-[520px] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={svc.image} alt={svc.title} fill className="object-cover" priority sizes="100vw" />
          {/* Dark overlay to ensure text is ALWAYS readable, regardless of the image */}
          <div className="absolute inset-0 bg-[#0E202E]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-32 lg:pb-48 w-full">
          <div className="flex items-center gap-2 text-xs font-medium text-[#29B6F6] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-white/30">/</span>
            <span className="text-white">{svc.title}</span>
          </div>

          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-medium uppercase tracking-widest text-[#0E202E] bg-[#29B6F6] px-3 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(41,182,246,0.5)]">
              {svc.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6 drop-shadow-lg">{svc.title}</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">{svc.tagline}</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 lg:-mt-40 relative z-20 pb-24">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-16">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100">
              <h2 className="text-2xl font-light text-[#0E202E] mb-5">Overview</h2>
              <p className="text-zinc-600 leading-relaxed text-lg">{svc.longDescription}</p>
            </div>

            {svc.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {svc.metrics.map((m) => (
                  <div key={m.label} className="relative p-8 rounded-3xl bg-white text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#29B6F6] to-[#039BE5] opacity-80" />
                    <div className="text-4xl font-light text-[#0E202E] mb-3 tracking-tight">{m.value}</div>
                    <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Digital Human live demo visual (only for digital-humans) ── */}
            {svc.slug === 'digital-humans' && <DigitalHumanLivePanel />}

            <div>
              <h2 className="text-2xl font-light text-[#0E202E] mb-10 pl-2">Implementation Pipeline</h2>
              <div className="relative pl-4 md:pl-2">
                {/* Vertical Timeline Line */}
                <div className="absolute left-9 md:left-[27px] top-6 bottom-6 w-[2px] bg-zinc-200 group-hover:bg-[#29B6F6]/30 transition-colors" />
                <div className="space-y-8 relative z-10">
                  {svc.steps.map((step, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group">
                      {/* Timeline Node */}
                      <div className="flex-shrink-0 bg-zinc-50 py-2 relative z-10 mt-0 md:mt-2">
                        <div className="w-10 h-10 rounded-full bg-[#29B6F6] text-white text-sm font-medium flex items-center justify-center shadow-[0_0_15px_rgba(41,182,246,0.4)] ring-4 ring-zinc-50">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      </div>
                      {/* Timeline Card */}
                      <div className="flex-1 p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:ring-zinc-200 w-full relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-100 group-hover:bg-[#29B6F6] transition-colors duration-300" />
                        <p className="font-medium text-[#0E202E] text-xl mb-3">{step.title}</p>
                        <p className="text-zinc-500 text-base leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100">
              <h2 className="text-2xl font-light text-[#0E202E] mb-8">Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {svc.useCases.map((uc) => (
                  <div key={uc} className="group flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-transparent hover:border-zinc-200 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="bg-white p-2 rounded-full shadow-sm ring-1 ring-zinc-100 group-hover:ring-[#29B6F6]/30 group-hover:bg-[#29B6F6]/5 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-[#29B6F6]" />
                    </div>
                    <span className="text-[15px] text-zinc-700 font-medium leading-relaxed mt-1.5">{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0E202E] rounded-3xl p-8 lg:p-10 text-white sticky top-24 shadow-2xl shadow-zinc-900/20 border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#29B6F6]/20 blur-[80px] pointer-events-none" />
              <h3 className="font-light text-2xl mb-4 text-white">Start Your Project</h3>
              <p className="text-white/70 text-base mb-10 leading-relaxed">
                Share your requirements and we&apos;ll put together a tailored deployment plan.
              </p>
              <Link
                href="/contact"
                className="w-full py-4 rounded-2xl bg-[#29B6F6] hover:bg-[#039BE5] text-white font-medium transition-all text-sm text-center block shadow-[0_0_30px_rgba(41,182,246,0.25)] hover:shadow-[0_0_40px_rgba(41,182,246,0.4)] hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
              <div className="mt-8 space-y-4">
                {['No commitment required', 'Prompt response'].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-white/60 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#29B6F6] shadow-[0_0_8px_rgba(41,182,246,0.8)]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100">
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 mb-6">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {svc.stack.map((t) => (
                  <span key={t} className="px-4 py-2 bg-zinc-50 text-zinc-700 text-sm font-semibold rounded-full ring-1 ring-zinc-200 hover:ring-[#29B6F6]/50 hover:bg-[#29B6F6]/5 hover:text-[#0E202E] transition-all cursor-default shadow-sm">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-zinc-50 border-t border-zinc-100 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#29B6F6] mb-5">
              <span className="w-6 h-px bg-[#29B6F6]/40" />
              Keep Exploring
            </div>
            <h2 className="text-3xl font-light text-[#0E202E] mb-10">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group block rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden hover:border-zinc-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-zinc-100">
                    <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <div className="p-6 relative">
                    <span className="inline-block px-2.5 py-1 bg-zinc-50 border border-zinc-100 rounded text-[10px] font-semibold text-zinc-500 mb-3">{rel.category}</span>
                    <h3 className="font-medium text-[#0E202E] text-lg mb-2 leading-tight">{rel.title}</h3>
                    <div className="flex items-center gap-1.5 text-[#29B6F6] text-sm font-semibold mt-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Explore detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
/* ── Digital Human Live Demo Panel ───────────────────────────── */
function DigitalHumanLivePanel() {
  const [wave, setWave] = useState([3,6,9,12,8,5,10,7,4,11,6,9,3,8,5]);
  const [msgVisible, setMsgVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setWave(w => w.map(() => Math.floor(Math.random() * 14) + 2));
    }, 180);
    const mv = setInterval(() => setMsgVisible(v => !v), 3200);
    return () => { clearInterval(iv); clearInterval(mv); };
  }, []);

  const langs = ['EN','DE','HI','AR','ZH','+36'];

  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-[#0A1628] relative mb-10 shadow-xl">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0D1F35] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-zinc-500 font-mono">86B · agent live</span>
      </div>

      {/* Main visual area */}
      <div className="relative w-full aspect-video">
        {/* Background — photorealistic digital human face */}
        <Image
          src="/svc_digital_human.png"
          alt="Digital Human Agent"
          fill
          className="object-cover object-center"
          unoptimized
          priority
        />
        {/* Dark overlay for readability of overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent" />

        {/* Connected badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white font-mono">Connected · 0.3s · EN</span>
        </div>

        {/* Latency badge */}
        <div className="absolute top-4 right-4 bg-[#29B6F6]/20 border border-[#29B6F6]/40 px-3 py-1 rounded-full">
          <span className="text-xs text-[#29B6F6] font-medium font-mono">~0.3s latency</span>
        </div>

        {/* Waveform */}
        <div className="absolute bottom-24 left-0 right-0 flex items-end justify-center gap-0.5 px-8 h-12">
          {wave.map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-[#29B6F6]/80 transition-all duration-150"
              style={{ height: `${h * 3}px` }}
            />
          ))}
        </div>

        {/* Chat bubble */}
        <div
          className={`absolute bottom-16 left-4 right-4 transition-opacity duration-700 ${
            msgVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-[#29B6F6]/20 border border-[#29B6F6]/30 backdrop-blur-sm rounded-xl px-4 py-2.5 max-w-xs">
            <p className="text-xs text-white/90 leading-relaxed">
              <span className="text-[#29B6F6] font-semibold">Agent: </span>
              &ldquo;Namaste, I can help you with your account query — which product are you referring to?&rdquo;
            </p>
          </div>
        </div>

        {/* Language chips */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
          {langs.map((l) => (
            <span key={l} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 border border-white/20 text-white/80">{l}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 bg-[#0D1F35] border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-zinc-500 font-mono">Real-time conversational AI · Private VPC deployment</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
}
