'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

// Product-first navigation; services sit after a divider as a quieter secondary link.
const navLinks = [
  { label: 'Product', href: '/#product' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Research', href: '/#research' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];
const secondaryLink = { label: 'Services', href: '/services' };

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === '/' || pathname === '/services';
  const inServices = pathname.startsWith('/services') || pathname === '/how-we-build';
  const cta = inServices
    ? { label: 'Book AI Audit', href: '/contact' }
    : { label: 'Get Early Access', href: '/#early-access' };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solidNav = !isHome || scrolled;
  // The home hero is light, so the transparent nav uses dark text there.
  const darkText = solidNav || pathname === '/';
  const linkClass = darkText
    ? 'text-[#2D3748] hover:text-[#16181D]'
    : 'text-white/90 hover:text-white';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidNav
            ? 'bg-white border-b border-zinc-200 shadow-sm'
            : `bg-transparent border-b ${darkText ? 'border-[#16181D]/10' : 'border-white/10'}`
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '84px' }}>

          {/* Logo — 78px tall */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src={darkText ? '/logos/86B.png' : '/logos/86B_white.png'}
              alt="86b.ai"
              width={265}
              height={94}
              style={{ height: '94px', width: 'auto' }}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — plain links, no dropdown */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-normal tracking-wide transition-colors duration-200 ${linkClass}`}
              >
                {link.label}
              </Link>
            ))}
            <span className={`h-4 w-px ${darkText ? 'bg-zinc-200' : 'bg-white/20'}`} />
            <Link
              href={secondaryLink.href}
              className={`text-sm font-normal tracking-wide transition-colors duration-200 ${
                inServices
                  ? (darkText ? 'text-[#16181D]' : 'text-white')
                  : (darkText ? 'text-zinc-400 hover:text-[#16181D]' : 'text-white/55 hover:text-white')
              }`}
            >
              {secondaryLink.label}
            </Link>
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={cta.href}
              className={`hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-normal tracking-wide transition-all duration-200 ${
                darkText
                  ? 'bg-[#16181D] text-white hover:bg-[#2A2D35]'
                  : 'bg-white text-[#16181D] hover:bg-zinc-100'
              }`}
            >
              {cta.label}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkText ? 'text-[#2D3748] hover:bg-zinc-100' : 'text-white hover:bg-white/10'
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-zinc-100">
                <Image
                  src="/logos/86B.png" alt="86b.ai" width={130} height={48}
                  style={{ height: '48px', width: 'auto' }} className="object-contain"
                />
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-5 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-normal text-[#2D3748] hover:bg-zinc-50 hover:text-[#16181D] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-3 h-px bg-zinc-100" />
                <Link href={secondaryLink.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-normal text-zinc-500 hover:bg-zinc-50 hover:text-[#16181D] transition-colors"
                >
                  Enterprise AI {secondaryLink.label}
                </Link>
              </nav>

              <div className="p-5 border-t border-zinc-100">
                <Link href={cta.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#16181D] text-white text-sm font-normal hover:bg-[#2A2D35] transition-colors"
                >
                  {cta.label} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
