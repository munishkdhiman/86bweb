import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  'Product': [
    { label: 'The 86b SDK', href: '/#product' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Research: Intelligence per Watt', href: '/#research' },
    { label: 'Join Early Access', href: '/#early-access' },
  ],
  'Services': [
    { label: 'Enterprise AI Services', href: '/services' },
    { label: 'Enterprise GenAI & RAG', href: '/services/generative-ai' },
    { label: 'Digital Human Agents', href: '/services/digital-humans' },
    { label: 'Spatial Intelligence', href: '/services#spatial' },
    { label: 'How We Build', href: '/how-we-build' },
    { label: 'All Services', href: '/services#catalog' },
  ],
  'Company': [
    { label: 'About 86b.ai', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security Architecture', href: '/security' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-zinc-400">

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
              Brain-inspired AI that keeps learning on the device and runs on a fraction of the energy. Built in India.
            </p>
            {/* Contact details */}
            <div className="flex flex-col gap-1.5 mt-5">
              <a
                href="mailto:hello@86b.ai"
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="text-[#111111] text-xs">&#9993;</span> hello@86b.ai
              </a>
              <span className="text-xs text-zinc-500 flex items-center gap-2">
                <span className="text-[#111111] text-xs">&#9679;</span> Gurugram, India
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
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} 86b.ai. All rights reserved.
          </p>
          <div className="border-t border-zinc-700 pt-4">
            <p className="text-xs text-zinc-400 italic leading-relaxed">
              <span className="text-zinc-300 not-italic font-normal">Disclaimer: </span>
              The 86b SDK is in development. Capabilities, figures and timelines on this site are design targets and will be updated as measured results are published.
            </p>
          </div>
        </div>


      </div>
    </footer>
  );
}
