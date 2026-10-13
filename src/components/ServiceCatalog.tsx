'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { servicesByCategory } from '@/lib/services-data';

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

// Full, collapsible list of every service, grouped by category.
export default function ServiceCatalog() {
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
    <section id="catalog" className="py-24 bg-[#FBF8F4] border-t border-zinc-100 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#7B61FF] mb-4">
            All Services
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#16181D] leading-tight mb-4">
            The full catalogue.
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Every capability we engineer, grouped by area. Open any service for its delivery steps, stack and use cases.
          </p>
        </div>

        {/* Category jump links */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryOrder.map((cat) => (
            <a
              key={cat}
              href={`#${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setOpenCategories((prev) => (prev.includes(cat) ? prev : [...prev, cat]))}
              className="px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-600 text-sm hover:border-[#7B61FF]/40 hover:text-[#16181D] transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>

        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const categoryServices = servicesByCategory[cat];
            if (!categoryServices) return null;
            const isOpen = openCategories.includes(cat);

            return (
              <div key={cat} id={cat.replace(/\s+/g, '-').toLowerCase()} className="border border-zinc-200 rounded-2xl bg-white overflow-hidden scroll-mt-36">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between px-8 py-6 hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium text-[#16181D]">{cat}</h3>
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
                          <h4 className="font-semibold text-[#16181D] text-sm mb-1 leading-tight">{svc.title}</h4>
                          <p className="text-zinc-700 text-xs leading-relaxed mb-3">{svc.tagline}</p>
                          <div className="flex items-center gap-1.5 text-[#7B61FF] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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
      </div>
    </section>
  );
}
