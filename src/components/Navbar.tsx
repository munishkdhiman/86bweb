'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Spatial Intelligence', href: '/#spatial' },
  { label: 'How We Build', href: '/how-we-build' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On homepage: transparent until scrolled. On other pages: always solid.
  const solidNav = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidNav
            ? 'bg-white/92 backdrop-blur-xl border-b border-zinc-200/70 shadow-sm'
            : 'bg-transparent border-b border-white/10'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — image swap based on nav state */}
          <Link href="/" className="flex items-center group">
            {solidNav ? (
              <Image
                src="/logos/86B.png"
                alt="86b.ai"
                width={80}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            ) : (
              <Image
                src="/logos/86B_white.png"
                alt="86b.ai"
                width={80}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            )}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-light tracking-wide transition-colors duration-200 hover:text-[#29B6F6] ${
                  solidNav ? 'text-zinc-500' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#29B6F6] text-white text-sm font-light tracking-wide hover:bg-[#039BE5] transition-colors duration-200 shadow-sm"
            >
              Book AI Audit
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                solidNav
                  ? 'text-zinc-700 hover:bg-zinc-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <Image
                  src="/logos/86B.png"
                  alt="86b.ai"
                  width={72}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-light text-zinc-600 hover:bg-zinc-50 hover:text-[#29B6F6] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-zinc-100">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#29B6F6] text-white text-sm font-light hover:bg-[#039BE5] transition-colors"
                >
                  Book AI Audit
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
