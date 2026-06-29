'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { services, servicesByCategory } from '@/lib/services-data';

const categoryOrder = [
  'Core AI Capabilities',
  'Enterprise Infrastructure & Security',
  'Spatial Intelligence & Operations',
  'Domain-Specific Solutions',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function ServicesPage() {
  const [openCategories, setOpenCategories] = useState<string[]>(categoryOrder);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setOpenCategories([categoryOrder[0]]); // Collapse all but the first category on smaller screens
    }
  }, []);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* ── MINI HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#060d18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628]/90 to-[#060d18]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4 block">All Capabilities</span>
          <h1 className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl mb-4">AI capabilities across every frontier.<br /><span className="text-[#29B6F6] font-light">Built and owned by you.</span></h1>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">Custom-engineered AI systems across generative AI, finance intelligence, computer vision, spatial computing, and more — all deployed within your chosen infrastructure.</p>
        </div>
      </section>

      {/* ── STICKY NAV ────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[#F9FAFB]/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto flex items-center gap-8 py-4 hide-scrollbar">
          {categoryOrder.map((cat) => (
            <a 
              key={cat} 
              href={`#${cat.replace(/\s+/g, '-').toLowerCase()}`}
              className="whitespace-nowrap text-sm font-medium text-zinc-600 hover:text-[#0E202E] transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>

      {/* Services by category */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        {categoryOrder.map((cat) => {
          const categoryServices = servicesByCategory[cat];
          if (!categoryServices) return null;
          const isOpen = openCategories.includes(cat);

          return (
            <div key={cat} id={cat.replace(/\s+/g, '-').toLowerCase()} className="border border-zinc-200 rounded-2xl bg-white overflow-hidden scroll-mt-24">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-8 py-6 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-medium text-[#0E202E]">{cat}</h2>
                  <span className="text-xs text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                    {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Service cards */}
              {isOpen && (
                <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryServices.map((svc, i) => (
                    <Link key={svc.slug} href={`/services/${svc.slug}`} className="block">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={i}
                      className="group relative rounded-xl border border-zinc-200 bg-white overflow-hidden cursor-pointer hover:border-zinc-300 hover:shadow-md transition-all duration-200"
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden bg-zinc-100">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-400"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-semibold text-[#0E202E] text-sm mb-1 leading-tight">{svc.title}</h3>
                        <p className="text-zinc-700 text-xs leading-relaxed mb-3">{svc.tagline}</p>
                        <div className="flex items-center gap-1.5 text-[#29B6F6] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}


