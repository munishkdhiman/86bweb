import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

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
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">

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
            {/* Contact details */}
            <div className="flex flex-col gap-1.5 mt-5">
              <a
                href="mailto:Info@86b.ai"
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="text-[#29B6F6] text-xs">&#9993;</span> Info@86b.ai
              </a>
              <span className="text-xs text-zinc-500 flex items-center gap-2">
                <span className="text-[#29B6F6] text-xs">&#9679;</span> Gurugram, India
              </span>
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
              © {new Date().getFullYear()} 86b.ai. All rights reserved. All client engagements are protected under strict confidentiality.
            </p>
            <p className="text-xs text-zinc-500">
              Built with precision by Solution Engineers.
            </p>
          </div>
          <div className="border-t border-zinc-700 pt-4">
            <p className="text-xs text-zinc-400 italic leading-relaxed">
              <span className="text-zinc-300 not-italic font-normal">Disclaimer: </span>
              All performance figures, timelines and capability metrics shown on this site are indicative estimates only.
              Actual outcomes are confirmed following a detailed requirement analysis conducted under strict confidentiality.
            </p>
          </div>
        </div>


      </div>
    </footer>
  );
}
