import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface CTAStripProps {
  heading?: string;
  sub?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTAStrip({
  heading = "Ready to deploy AI in your enterprise?",
  sub = "Our solution engineers will map your workflow bottlenecks and deliver a concrete AI roadmap — under NDA, at no cost.",
  primaryLabel = "Book a Free AI Audit",
  primaryHref = "/contact",
  secondaryLabel = "Explore Services",
  secondaryHref = "/services",
}: CTAStripProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-indigo-900/30 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-wide mb-6">
          <Lock className="w-3.5 h-3.5" />
          NDA Signed Before Any Technical Discussion
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight mb-5 leading-snug">
          {heading}
        </h2>
        <p className="text-base text-blue-100 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          {sub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 text-sm font-bold shadow-xl hover:bg-blue-50 transition-all group"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-all"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
