import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Shield, Lock, Globe } from 'lucide-react';

const footerLinks = {
  'Solutions': [
    { label: 'Enterprise GenAI & RAG', href: '/services/generative-ai' },
    { label: 'Data Orchestration', href: '/services/data-orchestration' },
    { label: 'Financial Intelligence', href: '/services/financial-intelligence' },
    { label: 'Spatial Intelligence', href: '/#spatial' },
    { label: 'Digital Human Agents', href: '/services/digital-humans' },
    { label: 'View All Services', href: '/services' },
  ],
  'Company': [
    { label: 'About 86b.ai', href: '/about' },
    { label: 'How We Build', href: '/how-we-build' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'Legal & Security': [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security Architecture', href: '/security' },
    { label: 'Download NDA Template', href: '/nda-template' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      {/* CTA Strip */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
              Ready to integrate AI into your infrastructure?
            </h2>
            <p className="text-zinc-400 text-sm">
              No public data exposure. No software licenses. Just engineers who build.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#0E202E] text-sm font-normal tracking-wide hover:bg-zinc-100 transition-colors shadow-sm"
            >
              Book Free AI Audit
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 text-sm font-medium transition-colors"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logos/86B_white.png"
              alt="86b.ai"
              width={160}
              height={56}
              style={{ height: '56px', width: 'auto' }}
              className="object-contain"
            />
            <p className="text-sm mt-3 leading-relaxed text-zinc-500">
              Applied enterprise AI — built privately, deployed securely, operated by engineers.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              {[
                { icon: Shield, text: 'SOC 2 Compliant' },
                { icon: Lock, text: 'Private VPC Architecture' },
                { icon: Globe, text: 'On-Premise Deployments' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-zinc-600">
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-700 mt-16 pt-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-zinc-400">
              © {new Date().getFullYear()} 86b.ai. All rights reserved. All client engagements are protected under mutual NDA.
            </p>
            <p className="text-xs text-zinc-500">
              Built with precision by Solution Engineers.
            </p>
          </div>
          <div className="border-t border-zinc-700 pt-4">
            <p className="text-xs text-zinc-400 italic leading-relaxed">
              <span className="text-zinc-300 not-italic font-normal">Disclaimer: </span>
              All performance figures, timelines and capability metrics shown on this site are indicative estimates only.
              Actual outcomes are confirmed following a detailed requirement analysis conducted under mutual NDA.
            </p>
          </div>
        </div>


      </div>
    </footer>
  );
}
