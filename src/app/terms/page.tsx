import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Terms of Service | 86b.ai', description: 'Terms governing use of the 86b.ai website.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <Navbar />
      <section className="relative bg-[#060d18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628]/90 to-[#060d18]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl mb-4">Terms of Service</h1>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">Terms governing use of the 86b.ai website and engagement with our services. Last updated: June 2025.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {[
            { h: '1. Use of This Website', p: 'This website is provided for informational purposes. By accessing it you agree not to use it for any unlawful purpose or in a way that infringes the rights of others.' },
            { h: '2. No Warranty', p: 'The information on this site is provided as-is. Performance figures, timelines, and capability metrics shown are indicative estimates only. Actual outcomes are confirmed following a detailed requirement analysis conducted under strict confidentiality.' },
            { h: '3. Client Engagements', p: 'All client engagements are governed by a separate Master Service Agreement (MSA) and confidentiality agreement. The terms of this website do not constitute a contract for services.' },
            { h: '4. Intellectual Property', p: 'All content on this website — including text, graphics, and code — is owned by 86b.ai. You may not reproduce, distribute, or create derivative works without written permission.' },
            { h: '5. Limitation of Liability', p: '86b.ai shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.' },
            { h: '6. Governing Law', p: 'These terms are governed by the laws of the jurisdiction in which 86b.ai is registered. Any disputes shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.' },
            { h: '7. Changes', p: 'We may update these terms at any time. Continued use of the website constitutes acceptance of the updated terms.' },
            { h: '8. Contact', p: 'For legal queries: legal@86b.ai' },
          ].map(({ h, p }) => (
            <div key={h}>
              <h2 className="text-lg font-medium text-[#0E202E] mb-2">{h}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
