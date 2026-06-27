import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

export const metadata = { title: 'Privacy Policy | 86b.ai', description: 'How 86b.ai handles your personal data and project information.' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <Navbar />
      <section className="relative bg-[#060d18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628]/90 to-[#060d18]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl mb-4">Privacy Policy</h1>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">How we handle your personal data and project information. Last updated: June 2025.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {[
            { h: '1. Who We Are', p: '86b.ai is an applied enterprise AI engineering firm. We build custom AI systems for enterprise clients. This policy explains how we handle information collected via this website and during client engagements.' },
            { h: '2. What We Collect', p: 'When you submit the contact form, we collect: your name, business email address, company name, role, and the message you provide. We do not collect payment information through this website.' },
            { h: '3. How We Use Your Information', p: 'Contact form submissions are used solely to respond to your enquiry. We do not send marketing emails unless you explicitly opt in. We do not sell, rent, or share your information with third parties for marketing purposes.' },
            { h: '4. Client Data', p: 'All client project data is handled under the terms of a mutual Non-Disclosure Agreement (NDA) signed prior to any technical engagement. Client data is never used to train models or shared with other clients.' },
            { h: '5. Data Retention', p: 'Contact form data is retained for a maximum of 12 months. Client engagement data is retained in accordance with the terms agreed in the relevant contract and NDA.' },
            { h: '6. Cookies', p: 'This website uses essential cookies only. We do not use tracking or advertising cookies.' },
            { h: '7. Your Rights', p: 'You have the right to request access to, correction of, or deletion of any personal data we hold about you. Contact us at privacy@86b.ai.' },
            { h: '8. Contact', p: 'For privacy-related queries, contact: privacy@86b.ai' },
          ].map(({ h, p }) => (
            <div key={h}>
              <h2 className="text-lg font-bold text-[#0E202E] mb-2">{h}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
