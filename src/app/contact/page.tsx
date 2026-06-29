"use client";

import { useState } from "react";
import { Lock, MessageSquare, FileSearch, Rocket, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const servicesList = [
  "Enterprise Generative AI", "Digital Human Agents", "Intelligent Process Automation",
  "Revenue Tracking & Auditing", "Predictive Analytics & Forecasting", "Data Organization & Investor Readiness",
  "NLP & Document Intelligence", "Computer Vision Solutions", "AI German Language Training",
  "HR & Talent AI", "AI Governance & Compliance", "AI App Testing & Red-Teaming",
  "LLM Orchestration & RAG Infrastructure", "MLOps & AI Lifecycle Management", "Travel & Logistics AI",
  "Other / Multiple Services",
];

const budgets = ["< $25K", "$25K – $100K", "$100K – $500K", "$500K+", "Prefer not to say"];

const nextSteps = [
  { icon: Lock, title: "NDA Signed Within 24h", desc: "We send a mutual NDA within 24 business hours — signed before any technical discussion." },
  { icon: MessageSquare, title: "Discovery Call", desc: "30-minute call with our solution engineers to map your use case and infrastructure constraints." },
  { icon: FileSearch, title: "Technical Proposal", desc: "Detailed proposal covering architecture, timeline, and pricing delivered within 5 business days." },
  { icon: Rocket, title: "Kickoff", desc: "Once approved, we embed our team within 2 weeks and begin the process audit." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", role: "", service: "", budget: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          company: form.company,
          role: form.role,
          service: form.service,
          budget: form.budget,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError('Network error. Please email us directly at munish@gestureresearch.com');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      <section className="relative pt-36 pb-16 bg-white border-b border-slate-200/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-normal uppercase tracking-widest text-[#5A6A7A] mb-4">
              <Lock className="inline w-3.5 h-3.5 mr-1" />NDA Protected · No Commitment Required
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-[#0E202E] mb-5 leading-tight">
              Start your{" "}
              <span className="italic text-[#1F3249]">AI journey.</span>
            </h1>
            <p className="text-base text-zinc-500 leading-relaxed">
              Tell us about your challenge. We&apos;ll review it, sign an NDA, and give you an honest technical assessment — no sales pitch, no commitment required.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-light text-[#0E202E] mb-3">Message received</h2>
                <p className="text-base text-zinc-500 leading-relaxed max-w-sm mx-auto">We&apos;ll review your request and send an NDA within 24 business hours. Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-xl font-medium text-[#0E202E] mb-1">Tell us about your project</h2>

                </div>
                <div className="p-8 space-y-5">
                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    {[{ name: "firstName", label: "First Name" }, { name: "lastName", label: "Last Name" }].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                        <input type="text" name={f.name} required value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.label} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
                      </div>
                    ))}
                  </div>
                  {/* Email + Company + Role */}
                  {[
                    { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com" },
                    { name: "company", label: "Company Name", type: "text", placeholder: "Your company" },
                    { name: "role", label: "Your Role", type: "text", placeholder: "e.g. CTO, VP Engineering, Head of Data" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                      <input type={f.type} name={f.name} required={f.name !== "role"} value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
                    </div>
                  ))}
                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Service of Interest</label>
                    <select name="service" value={form.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:bg-white transition-all">
                      <option value="">Select a service...</option>
                      {servicesList.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Estimated Budget Range</label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button key={b} type="button" onClick={() => setForm((p) => ({ ...p, budget: b }))} className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${form.budget === b ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Describe Your Challenge</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about the workflow, data source, or problem you want AI to solve..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none" />
                  </div>
                </div>
                <div className="px-8 pb-8">
                  {submitError && (
                    <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-[#29B6F6] hover:bg-[#039BE5] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg transition-all"
                  >
                    {submitting ? 'Sending…' : 'Send Enquiry — NDA Sent Within 24h'}
                  </button>
                  <p className="text-center text-xs text-slate-400 font-light mt-4">
                    <Lock className="inline w-3 h-3 mr-1" />
                    Your information is never shared. All data treated under NDA.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-medium text-[#0E202E] mb-6">What happens next</h3>
              <div className="space-y-5">
                {nextSteps.map((step, i) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      {i < nextSteps.length - 1 && <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-5 bg-slate-200 mt-1" />}
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-semibold text-[#0E202E] mb-0.5">{step.title}</div>
                      <div className="text-xs text-zinc-500 leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0E202E] rounded-2xl p-7 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Our Guarantees</div>
              {[
                "NDA signed before any technical discussion",
                "No unsolicited follow-up or marketing emails",
                "Your data is never shared or used to train models",
                "Honest assessment — we'll tell you if AI won't help",
                "Response within 24 business hours, always",
              ].map((g) => (
                <div key={g} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-400">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
