"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Workflow, Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { services, categories } from "@/lib/services-data";

const iconMap: Record<string, React.ElementType> = {
  Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical, Workflow,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 bg-white border-b border-slate-200/60 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-100/40 to-transparent blur-[140px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              <Workflow className="w-3.5 h-3.5" />
              All Services
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 mb-6 leading-tight">
              Enterprise AI{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Services
              </span>
            </h1>
            <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
              We engineer custom AI capabilities across eight specializations — each one designed to integrate directly with your existing infrastructure, not bolt on top of it.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────────────── */}
      <section className="sticky top-[60px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Workflow;
              return (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-50">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                      <Icon className="w-3 h-3" />
                      {svc.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{svc.title}</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed mb-5">{svc.summary}</p>

                    {/* 3 mini metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {svc.metrics.map((m) => (
                        <div key={m.label} className="text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="text-base font-semibold text-blue-600">{m.value}</div>
                          <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wide mt-0.5 leading-tight">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/services/${svc.slug}`}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 text-sm font-semibold transition-all group/btn"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </div>
  );
}
