'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export interface ModalService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  steps: { title: string; desc: string }[];
  stack: string[];
  metrics: { value: string; label: string }[];
  useCases: string[];
  category?: string;
}

interface ServiceModalProps {
  service: ModalService | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [formOpen, setFormOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock scroll when open; reset formOpen on new service
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
      setFormOpen(false); // always start collapsed on mobile
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key={`modal-${service.id}`}
            layoutId={`card-${service.id}`}
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 md:inset-6 lg:inset-12 z-[61] bg-white md:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 hover:bg-white shadow-md text-zinc-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── LEFT: scrollable content ── */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">

              {/* Image hero */}
              <div className="relative w-full h-44 md:h-56 rounded-xl overflow-hidden mb-6 bg-zinc-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {service.category && (
                  <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-widest text-white/80 bg-black/30 px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0E202E] mb-3 leading-tight">
                {service.title}
              </h2>
              <p className="text-[#5A6A7A] font-normal mb-4 leading-relaxed">{service.tagline}</p>
              <p className="text-[#2D3748] leading-relaxed mb-8">{service.longDescription}</p>

              {/* ── Mobile: CTA button to open form (bottom sheet) ── */}
              <div className="md:hidden mb-6">
                <button
                  onClick={() => setFormOpen((v) => !v)}
                  className="w-full py-3.5 rounded-xl bg-[#0E202E] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:bg-[#1F3249]"
                >
                  {formOpen ? 'Hide Enquiry Form' : 'Request Technical Audit'}
                  {formOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Metrics */}
              {service.metrics.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                    {service.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-xl font-bold text-[#29B6F6]">{m.value}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="stats-disclaimer mt-2 px-1">
                    * Indicative figures only — actual outcomes are confirmed after detailed requirement analysis with your team.
                  </p>
                </div>
              )}

              {/* Steps */}
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                Implementation Pipeline
              </h3>
              <ol className="space-y-4 mb-8">
                {service.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#29B6F6]/10 text-[#29B6F6] text-xs font-bold flex items-center justify-center mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-semibold text-[#0E202E] text-sm">{step.title}</p>
                      <p className="text-zinc-500 text-sm mt-0.5">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>



              {/* Use Cases */}
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-3">
                Use Cases
              </h3>
              <ul className="space-y-1.5 pb-4">
                {service.useCases.map((uc) => (
                  <li key={uc} className="flex items-center gap-2 text-sm text-[#2D3748]">
                    <ArrowRight className="w-3.5 h-3.5 text-[#5A6A7A] flex-shrink-0" />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── RIGHT (desktop): always visible sidebar form ── */}
            <div className="hidden md:flex w-80 lg:w-96 bg-[#0E202E] p-10 flex-col gap-5 flex-shrink-0 overflow-y-auto">
              <FormContent service={service} />
            </div>

            {/* ── MOBILE: collapsible bottom sheet form ── */}
            <AnimatePresence>
              {formOpen && (
                <motion.div
                  key="mobile-form"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', damping: 32, stiffness: 280 }}
                  className="md:hidden bg-[#0E202E] overflow-hidden flex-shrink-0"
                >
                  {/* Drag handle */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-xs uppercase tracking-widest text-[#29B6F6] font-semibold">Request Audit</span>
                    <button
                      onClick={() => setFormOpen(false)}
                      className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="px-6 pb-6 overflow-y-auto max-h-[55vh]">
                    <FormContent service={service} compact />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Shared form content ─────────────────────────────────────── */
function FormContent({ service, compact = false }: { service: ModalService; compact?: boolean }) {
  const [form, setForm] = useState({ fullName: '', company: '', email: '', requirements: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const subject = encodeURIComponent(
        `Technical Audit Request — ${form.fullName} (${form.company})`
      );
      const body = encodeURIComponent(
        [
          `Name: ${form.fullName}`,
          `Company: ${form.company}`,
          `Email: ${form.email}`,
          `Service: ${service.title}`,
          '',
          'Requirements:',
          form.requirements || `Requesting a technical audit for: ${service.title}`,
        ].join('\n')
      );
      window.location.href = `mailto:munish@86b.ai?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      setError('Could not open email client. Please email us directly at munish@86b.ai');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[#29B6F6]/20 border border-[#29B6F6]/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-[#29B6F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold text-lg">Request received</p>
          <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
            We'll reach out to <span className="text-[#29B6F6]">{form.email}</span> within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!compact && (
        <div className="border-b border-white/10 pb-5">
          <span className="text-[10px] font-normal uppercase tracking-widest text-[#29B6F6]">Deploy Under NDA</span>
          <h3 className="text-xl font-normal text-white mt-2 leading-snug">
            Deploy {service.title} on your terms
          </h3>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-light">
            On-premise, private VPC, or enterprise cloud — we build it to your requirements. All conversations are covered by a mutual NDA.
          </p>
        </div>
      )}

      {compact && (
        <p className="text-zinc-400 text-xs mb-4 leading-relaxed">
          Speak with a lead engineer — all conversations covered by NDA.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-[11px] font-normal text-zinc-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
          <input
            type="text"
            placeholder="Jane Smith"
            required
            value={form.fullName}
            onChange={set('fullName')}
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:bg-white/15 focus:border-[#29B6F6]/60 transition-all"
          />
        </div>
        <div>
          <label className="block text-[11px] font-normal text-zinc-400 mb-1.5 uppercase tracking-wider">Company *</label>
          <input
            type="text"
            placeholder="Acme Corp"
            required
            value={form.company}
            onChange={set('company')}
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:bg-white/15 focus:border-[#29B6F6]/60 transition-all"
          />
        </div>
        <div>
          <label className="block text-[11px] font-normal text-zinc-400 mb-1.5 uppercase tracking-wider">Work Email *</label>
          <input
            type="email"
            placeholder="jane@company.com"
            required
            value={form.email}
            onChange={set('email')}
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:bg-white/15 focus:border-[#29B6F6]/60 transition-all"
          />
        </div>
        {!compact && (
          <div>
            <label className="block text-[11px] font-normal text-zinc-400 mb-1.5 uppercase tracking-wider">Your Requirements</label>
            <textarea
              placeholder={`Brief context on how ${service.title} fits your needs…`}
              rows={3}
              value={form.requirements}
              onChange={set('requirements')}
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:bg-white/15 focus:border-[#29B6F6]/60 transition-all resize-none"
            />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-xs leading-relaxed">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg bg-[#29B6F6] hover:bg-[#039BE5] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 mt-1"
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Request Technical Audit
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="border-t border-white/10 pt-4 space-y-2 mt-1">
        {['Under mutual NDA', 'No commitment required', 'Response within 24h'].map((t) => (
          <div key={t} className="flex items-center gap-2 text-xs text-zinc-400 font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29B6F6]/60 flex-shrink-0" />
            {t}
          </div>
        ))}
      </div>
    </>
  );
}
