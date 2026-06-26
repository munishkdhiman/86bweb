'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceModal, { type ModalService } from '@/components/ServiceModal';
import { services, servicesByCategory } from '@/lib/services-data';

const categoryOrder = [
  'Core AI',
  'Finance AI',
  'Advanced AI',
  'Workforce AI',
  'AI Governance',
  'MLOps & Infrastructure',
  'Industry Solutions',
  'Spatial Intelligence',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ModalService | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>(categoryOrder);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4"
          >
            All Capabilities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-2xl"
          >
            {services.length} enterprise AI capabilities across 8 practice areas. Click any service to see the full implementation blueprint and request a technical audit under NDA.
          </motion.p>
        </div>
      </section>

      {/* Services by category */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        {categoryOrder.map((cat) => {
          const categoryServices = servicesByCategory[cat];
          if (!categoryServices) return null;
          const isOpen = openCategories.includes(cat);

          return (
            <div key={cat} className="border border-zinc-200 rounded-2xl bg-white overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-8 py-6 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-zinc-900">{cat}</h2>
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
                    <motion.div
                      key={svc.slug}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={i}
                      onClick={() => setSelectedService({ ...svc, id: svc.slug })}
                      className="group relative rounded-xl border border-zinc-200 bg-white overflow-hidden cursor-pointer hover:border-[#29B6F6]/30 hover:shadow-md transition-all duration-200"
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
                        <h3 className="font-semibold text-zinc-900 text-sm mb-1 leading-tight">{svc.title}</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed mb-3">{svc.tagline}</p>
                        <div className="flex items-center gap-1.5 text-[#29B6F6] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
}

