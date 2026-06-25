import { Target, Users, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";

const values = [
  { icon: Target, title: "Outcome-Obsessed", desc: "We define measurable KPIs before starting any project. If we can't quantify the impact, we won't take the engagement." },
  { icon: Shield, title: "Security First", desc: "Every architecture decision is reviewed for data residency, access control, and compliance before a single line of code is written." },
  { icon: Users, title: "Embedded, Not Advisory", desc: "Our engineers work inside your teams — not from a distance. We understand your constraints because we live in them." },
  { icon: Zap, title: "Speed to Production", desc: "We move from scoping to working prototype in days, not months. Enterprise AI doesn't have to be slow." },
];

const industries = [
  "Financial Services & Insurance", "Healthcare & Life Sciences", "Logistics & Supply Chain",
  "Manufacturing & Industrial", "Legal & Compliance", "HR & Talent Management",
  "Retail & E-Commerce", "Government & Public Sector",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-white border-b border-slate-200/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-100/40 to-transparent blur-[140px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              About Us
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 mb-6 leading-tight">
              Applied AI for{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                real enterprise
              </span>{" "}
              problems.
            </h1>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              86b.ai was built on a simple observation: most enterprises want to use AI, but don&apos;t know where to start — or have tried and failed with off-the-shelf tools that don&apos;t fit their workflows.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-6 leading-snug">
              We exist to make AI work{" "}
              <span className="font-semibold">inside the enterprise</span>{" "}
              — not around it.
            </h2>
            <p className="text-base text-slate-500 font-light leading-relaxed mb-5">
              Generic AI tools are built for individual productivity. Enterprise workflows are different — they involve compliance requirements, legacy databases, multi-department approvals, and data that can never leave your network.
            </p>
            <p className="text-base text-slate-500 font-light leading-relaxed">
              We build the bridge. Custom AI pipelines, designed around your specific constraints, deployed inside your environment, and handed over to your team with full documentation and training.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-10 space-y-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">By the numbers</div>
            {[
              { value: "8", label: "AI service specializations", desc: "From digital humans to LLM orchestration" },
              { value: "90", label: "Days to first outcome", desc: "Guaranteed measurable results or we revisit" },
              { value: "100%", label: "Private deployments", desc: "Zero customer data sent to public APIs" },
              { value: "NDA", label: "Before every discussion", desc: "Signed before any technical conversation" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-5 p-4 rounded-xl bg-white/5 border border-white/8">
                <div className="text-3xl font-light text-blue-400 w-16 flex-shrink-0">{item.value}</div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
                  <div className="text-xs text-slate-500 font-light">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">
              How we{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                operate
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-slate-200/60 p-7 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:border-blue-300 transition-colors">
                  <v.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">
              Industries we{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                serve
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-xl mx-auto">
              We have built AI systems across regulated and complex industries where data security and compliance are non-negotiable.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map((ind) => (
              <span key={ind} className="px-5 py-3 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip heading="Want to know if we're the right fit?" sub="Schedule a 30-minute technical call. We'll tell you honestly whether AI will help your specific use case, and what it will take." primaryLabel="Schedule a Call" secondaryLabel="View Services" secondaryHref="/services" />
      <Footer />
    </div>
  );
}
