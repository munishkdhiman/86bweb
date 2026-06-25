"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/lib/services-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/how-we-build", label: "How We Build" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-shadow">
            <Cpu className="w-4 h-4 text-white" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            86b<span className="text-blue-600">.ai</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                pathname.startsWith("/services") ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
              }`}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] bg-white rounded-2xl border border-slate-200/60 shadow-2xl shadow-slate-200/80 overflow-hidden"
                >
                  {/* Dropdown header */}
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      All Services
                    </span>
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      View all →
                    </Link>
                  </div>

                  {/* Services grid */}
                  <div className="grid grid-cols-2 gap-0.5 p-3">
                    {services.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors mt-0.5">
                          <span className="text-blue-600 text-[10px] font-bold">AI</span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                            {svc.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-light mt-0.5 leading-snug line-clamp-2">
                            {svc.tag}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other nav links */}
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                isActive(l.href) ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:border-slate-300 bg-white hover:bg-slate-50 transition-all"
          >
            Contact Sales
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:opacity-90"
          >
            Book AI Audit →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl max-h-[80vh] overflow-y-auto"
          >
            <div className="px-6 py-4 space-y-1">
              {/* Mobile Services */}
              <div className="py-2 border-b border-slate-100">
                <Link
                  href="/services"
                  className="block text-sm font-semibold text-slate-700 py-2 hover:text-blue-600"
                >
                  All Services
                </Link>
                <div className="grid grid-cols-1 gap-0.5 pl-4 mt-1">
                  {services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="text-sm text-slate-500 py-1.5 hover:text-blue-600 transition-colors"
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-base font-medium text-slate-700 py-3 border-b border-slate-100 hover:text-blue-600"
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-4 pb-2">
                <Link
                  href="/contact"
                  className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm"
                >
                  Book AI Audit →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
