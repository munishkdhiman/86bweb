import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Services: [
      { href: "/services/ai-strategy", label: "AI-First Strategy" },
      { href: "/services/digital-humans", label: "Digital Human Agents" },
      { href: "/services/travel-planning", label: "AI Travel & Routing" },
      { href: "/services/revenue-tracking", label: "Revenue Auditing" },
      { href: "/services/data-organization", label: "Investor Readiness" },
      { href: "/services/german-training", label: "German Language AI" },
      { href: "/services/ai-testing", label: "AI Testing & QA" },
      { href: "/services/llm-orchestration", label: "LLM Orchestration" },
    ],
    Company: [
      { href: "/about", label: "About 86b.ai" },
      { href: "/how-we-build", label: "How We Build" },
      { href: "/contact", label: "Contact Sales" },
      { href: "/contact", label: "Book AI Audit" },
    ],
    Legal: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Security Architecture" },
      { href: "#", label: "NDA Template" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2 space-y-5">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Cpu className="w-4 h-4 text-white" />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              86b<span className="text-blue-400">.ai</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs">
            Applied Enterprise Artificial Intelligence. We build custom, secure AI capabilities that slot directly into your existing workflows.
          </p>
          <div className="flex items-center gap-2 pt-1">
            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all text-xs font-medium"
              >
                {s}
              </a>
            ))}
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["SOC2 Ready", "HIPAA Auditable", "Private VPC", "NDA Protected"].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-semibold text-blue-400 uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Links columns */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              {group}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors font-light"
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
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} 86b.ai. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Private VPC Deployment · SOC2 Compliant · Zero Data Exposure
          </p>
        </div>
      </div>
    </footer>
  );
}
