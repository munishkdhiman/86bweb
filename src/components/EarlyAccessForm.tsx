'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitForm } from '@/lib/forms';

const interests = [
  'Building an app (design partner)',
  'Device, wearable or chip maker',
  'Researcher',
  'Investor',
  'Just following along',
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-[#E4E4DF] bg-[#F7F7F4] text-sm text-[#111111] placeholder-[#9A9A9A] focus:outline-none focus:border-[#111111] focus:bg-white focus:ring-4 focus:ring-[#111111]/10 transition-all';

// Early-access signup for the 86b SDK, emailed via /api/contact.
export default function EarlyAccessForm() {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', interest: interests[0], useCase: '' });
  const [state, setState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      await submitForm(`86b SDK early access: ${form.name}`, {
        Name: form.name,
        Email: form.email,
        Organisation: form.organisation,
        Interest: form.interest,
        'Use case': form.useCase,
      }, form.email);
      setState('sent');
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="rounded-[2rem] border border-[#E4E4DF] bg-white shadow-[0_30px_70px_-30px_rgba(17,17,17,0.25)] p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-spectrum flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-3xl font-light text-[#111111] mb-2">You’re on the list.</h3>
        <p className="text-[#6B6B6B] text-sm max-w-sm mx-auto leading-relaxed">
          We’ll be in touch as the early preview opens, starting with design partners and researchers.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-[#E4E4DF] bg-white shadow-[0_30px_70px_-30px_rgba(17,17,17,0.25)] p-6 md:p-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ea-name" className="block text-xs text-[#6B6B6B] mb-1.5">Name</label>
          <input id="ea-name" name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ea-email" className="block text-xs text-[#6B6B6B] mb-1.5">Email</label>
          <input id="ea-email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@company.com" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ea-org" className="block text-xs text-[#6B6B6B] mb-1.5">Organisation <span className="text-[#9A9A9A]">(optional)</span></label>
          <input id="ea-org" name="organisation" value={form.organisation} onChange={onChange} placeholder="Company or lab" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ea-interest" className="block text-xs text-[#6B6B6B] mb-1.5">I’m interested as</label>
          <select id="ea-interest" name="interest" value={form.interest} onChange={onChange} className={`${inputClass} w-full`}>
            {interests.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="ea-use" className="block text-xs text-[#6B6B6B] mb-1.5">What would you build with it? <span className="text-[#9A9A9A]">(optional)</span></label>
        <textarea id="ea-use" name="useCase" rows={3} value={form.useCase} onChange={onChange} placeholder="e.g. voice commands in a Hindi–English health app on budget phones" className={`${inputClass} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full btn btn-primary py-4 min-h-12"
      >
        {state === 'submitting' ? 'Sending…' : 'Request early access'}
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
        No spam, no sharing. We’ll only contact you about the preview.
      </p>

      {state === 'error' && (
        <p className="text-xs text-red-600">Something went wrong. Please email hello@86b.ai instead.</p>
      )}
    </form>
  );
}
