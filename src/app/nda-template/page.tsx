import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Lock, ChevronRight } from 'lucide-react';

export const metadata = { title: 'Strict Confidentiality | 86b.ai', description: 'Start your engagement with a strict confidentiality agreement before any technical discussion.' };

export default function NdaTemplatePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <Navbar />
      <section className="relative bg-[#060d18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628]/90 to-[#060d18]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#29B6F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6] mb-4 block">Confidentiality First</span>
          <h1 className="text-4xl md:text-5xl font-extralight text-white leading-[1.15] max-w-2xl mb-4">Strict Confidentiality Before Hello</h1>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-xl">No technical discussion begins without a signed confidentiality agreement. Every agreement is tailored to the specific engagement and jurisdiction.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            We do not share our confidentiality agreement publicly — every agreement is tailored to the specific engagement and jurisdiction. When you submit a contact enquiry, we promptly send a confidentiality agreement for review and signature before any technical discussion begins.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0E202E] text-white text-sm font-medium hover:bg-[#1F3249] transition-colors"
          >
            <Lock className="w-4 h-4" />
            Submit Enquiry &mdash; Receive Confidentiality Agreement
            <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-zinc-400 mt-6">No commitment required. Confidentiality agreement sent promptly after your submission.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
