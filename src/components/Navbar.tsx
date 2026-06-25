"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { services, categories } from "@/lib/services-data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only the home page has a dark hero — all other pages start with white bg
  const isHomePage = pathname === "/";
  // Transparent + white text only on home when not scrolled
  const transparent = isHomePage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const menuGroups = categories.slice(1, 5).map((cat) => ({
    label: cat,
    items: services.filter((s) => s.category === cat).slice(0, 3),
  }));

  const navLinks = [
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/how-we-build", label: "How We Build" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Cpu className="w-4 h-4 text-white" />
            </span>
            <span className={`text-xl font-semibold tracking-tight transition-colors ${transparent ? "text-white" : "text-slate-900"}`}>
              86b<span className="text-blue-500">.ai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
                  <button className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}>
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-200/60 overflow-hidden"
                        onMouseEnter={openServices}
                        onMouseLeave={closeServices}
                      >
                        <div className="p-6 grid grid-cols-4 gap-4">
                          {menuGroups.map((group) => (
                            <div key={group.label}>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-2">{group.label}</div>
                              <div className="space-y-1">
                                {group.items.map((svc) => (
                                  <Link
                                    key={svc.slug}
                                    href={`/services/${svc.slug}`}
                                    onClick={() => setServicesOpen(false)}
                                    className="block px-2 py-2 rounded-lg hover:bg-blue-50 group/item transition-colors"
                                  >
                                    <div className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-700 leading-snug">{svc.title}</div>
                                    <div className="text-[10px] text-slate-400 font-light leading-tight mt-0.5 line-clamp-1">{svc.tag}</div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 px-6 py-3 bg-slate-50 flex items-center justify-between">
                          <span className="text-xs text-slate-500">Explore all {services.length} AI services</span>
                          <Link href="/services" onClick={() => setServicesOpen(false)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            View all services <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all"
            >
              Book AI Audit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${transparent ? "text-white" : "text-slate-700"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block mt-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold text-center"
              >
                Book Free AI Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
