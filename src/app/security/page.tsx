import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lock, Shield, Server, Eye } from 'lucide-react';

export const metadata = { title: 'Security Architecture | 86b.ai', description: 'How 86b.ai designs private, secure AI deployments for enterprise clients.' };

const pillars = [
  { icon: Lock, title: 'Private VPC Deployment', desc: 'All AI systems can be deployed inside your own Virtual Private Cloud. No data transits through 86b.ai infrastructure in production.' },
  { icon: Shield, title: 'SOC 2-Ready Architecture', desc: 'Our deployment patterns follow SOC 2 Type II-aligned controls for security, availability, and confidentiality. Formal certification is pursued on a per-engagement basis.' },
  { icon: Server, title: 'On-Premise Options', desc: 'For clients with air-gapped or regulatory requirements, we support fully on-premise deployments with no external network dependency.' },
  { icon: Eye, title: 'NDA Before Hello', desc: 'No technical discussion begins without a signed mutual NDA. Your project details, data schemas, and architecture are never disclosed.' },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <Navbar />
      <section className="relative bg-[#060d18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628]/90 to-[#060d18]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4 block">Security</span>
          <h1 className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl mb-4">Security Architecture</h1>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">How we build AI systems that stay entirely inside your security boundary — from air-gapped on-premise to private VPC.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 rounded-2xl border border-zinc-200 bg-zinc-50">
              <div className="w-10 h-10 rounded-xl bg-[#0E202E] flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-[#29B6F6]" />
              </div>
              <h2 className="text-lg font-bold text-[#0E202E] mb-2">{title}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-12 p-8 rounded-2xl bg-[#0E202E] text-white">
          <h3 className="text-xl font-bold mb-3">Security questions?</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">For detailed security documentation, architecture diagrams, or penetration test reports, contact us. All materials shared under NDA.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0E202E] text-sm font-medium hover:bg-zinc-100 transition-colors">Request Security Documentation</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
