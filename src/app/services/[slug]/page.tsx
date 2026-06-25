import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical, Workflow, Cpu, TrendingUp, Search, Layers, Users, ShieldCheck, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { servicesBySlug, services } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const iconMap: Record<string, React.ElementType> = {
  Network, Bot, Globe, BarChart3, Briefcase, BookOpen, FlaskConical,
  Workflow, Cpu, TrendingUp, Search, Layers, Users, ShieldCheck, Activity,
};

interface PageProps { params: Promise<{ slug: string }>; }

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const svc = servicesBySlug[slug];
  if (!svc) notFound();

  const Icon = iconMap[svc.icon] || Workflow;
  const related = services.filter((s) => s.slug !== svc.slug && s.category === svc.category).slice(0, 3).concat(
    services.filter((s) => s.slug !== svc.slug && s.category !== svc.category).slice(0, 3 - services.filter((s2) => s2.slug !== svc.slug && s2.category === svc.category).slice(0, 3).length)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={svc.image} alt={svc.title} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{svc.title}</span>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-xs font-semibold tracking-wide mb-6">
              <Icon className="w-3.5 h-3.5" />
              {svc.tag} · {svc.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] mb-6">
              {svc.headline}
            </h1>
            <p className="text-base md:text-lg text-white/65 font-light leading-relaxed mb-10">
              {svc.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-700 text-sm font-bold shadow-xl hover:bg-blue-50 transition-all group">
                {svc.ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-all">
                ← All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-1 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {svc.metrics.map((m) => (
            <div key={m.label} className="text-center py-7 md:py-0 md:px-10">
              <div className="text-4xl md:text-5xl font-light text-blue-600 tracking-tight mb-1">{m.value}</div>
              <div className="text-sm font-semibold text-slate-800 mb-1">{m.label}</div>
              <div className="text-xs text-slate-400 font-light">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-semibold tracking-wide mb-6">
              The Problem We Solve
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-6 leading-snug">
              Why enterprises struggle{" "}
              <span className="font-semibold">without this</span>
            </h2>
            <p className="text-base text-slate-500 font-light leading-relaxed">{svc.problem}</p>
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-8 space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Without an AI Solution</h3>
            {[
              "Manual processes consuming 40%+ of team capacity",
              "Data locked in siloed, unstructured legacy systems",
              "No clear path from AI pilot to production deployment",
              "Compliance and security concerns blocking adoption",
            ].map((pain) => (
              <div key={pain} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-xs font-bold">!</span>
                </div>
                <span className="text-sm text-slate-600 font-light">{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-5">Process</div>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              How it{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {svc.steps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-4 relative">
                  <span className="text-sm font-bold text-blue-600">{String(i + 1).padStart(2, "0")}</span>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide mb-6">Capabilities</div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">What you get</h2>
              <p className="text-base text-slate-500 font-light leading-relaxed mb-10">
                Every {svc.title} engagement includes these capabilities, customized to your specific industry and infrastructure requirements.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all group">
                {svc.ctaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {svc.features.map((feat) => (
                <div key={feat.title} className="bg-white rounded-xl border border-slate-200/60 p-5 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <h4 className="text-sm font-semibold text-slate-900">{feat.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-light leading-relaxed pl-6">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-shrink-0">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Technology Stack</div>
            <div className="text-sm font-semibold text-slate-700">Tools deployed for this service</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {svc.techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-light text-slate-900">Related <span className="font-semibold">Services</span></h2>
              <Link href="/services" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => {
                const RelIcon = iconMap[rel.icon] || Workflow;
                return (
                  <Link key={rel.slug} href={`/services/${rel.slug}`} className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 text-[10px] font-semibold text-blue-700 uppercase">
                        <RelIcon className="w-3 h-3" />{rel.tag}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{rel.title}</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">{rel.summary}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTAStrip heading={`Ready to deploy ${svc.title}?`} primaryLabel={svc.ctaLabel} />
      <Footer />
    </div>
  );
}
