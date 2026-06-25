import Link from "next/link";
import { Database, Search, Layers, Cpu, ShieldCheck, Zap, Server, Lock, Activity, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";

const pipeline = [
  { icon: Database, num: "01", title: "Data Ingestion", desc: "We connect to every structured and unstructured data source your business runs on — PDFs, databases, ERPs, emails, SharePoint, and legacy flat files. All ingestion happens inside your private infrastructure.", detail: ["Support for 40+ file formats", "Live database connectors (SQL, NoSQL, SAP)", "Document parsing with layout preservation", "Incremental sync keeps data current"] },
  { icon: Search, num: "02", title: "Chunking & Embedding", desc: "Documents are intelligently split into semantic chunks and encoded into high-dimensional vector embeddings using state-of-the-art embedding models deployed on your infrastructure.", detail: ["Semantic-aware chunking preserves context", "Multiple embedding model options (BGE, Ada, E5)", "Metadata tagging for filtered retrieval", "Batch and streaming pipeline support"] },
  { icon: Layers, num: "03", title: "Vector Store & Retrieval", desc: "Embeddings are stored in a private vector database that enables millisecond semantic search across millions of document chunks — returning only the most relevant context for each query.", detail: ["Pinecone, Weaviate, Chroma, or pgvector", "Hybrid search (semantic + keyword)", "Access control per document or team", "Sub-100ms retrieval at scale"] },
  { icon: Cpu, num: "04", title: "LLM Reasoning", desc: "Your chosen language model — local Llama/Mistral or hosted GPT/Gemini — receives only the retrieved context, never your full dataset. It generates grounded, verifiable answers tied to source documents.", detail: ["Local: Llama 3, Mistral, Gemma, Phi-3", "Hosted: GPT-4o, Claude, Gemini Pro", "Custom fine-tuned models available", "Source citation with every response"] },
  { icon: ShieldCheck, num: "05", title: "Guardrail Validation", desc: "Every output passes through automated quality gates that check for hallucinations, factual grounding, PII exposure, policy compliance, and output format conformance before delivery.", detail: ["Hallucination detection using reference docs", "PII redaction before output delivery", "Custom policy enforcement rules", "Confidence scoring and fallback triggers"] },
  { icon: Zap, num: "06", title: "Action & Integration", desc: "Validated outputs trigger downstream actions — updating your ERP, firing webhooks, populating dashboards, sending notifications, or returning structured JSON to your application layer.", detail: ["Bidirectional ERP/CRM sync", "Webhook and API endpoint triggers", "Structured JSON output formatting", "Audit log for every decision made"] },
];

const deploymentOptions = [
  { icon: Server, title: "On-Premise", desc: "Full stack deployed inside your data center. Your servers, your network, your keys. Zero cloud dependency.", tags: ["Air-gapped available", "Custom hardware sizing", "IT team handover"] },
  { icon: Lock, title: "Private VPC", desc: "Isolated cloud environment in your own AWS, GCP, or Azure account. Managed by us, owned by you.", tags: ["Single-tenant", "Managed updates", "Auto-scaling"] },
  { icon: Activity, title: "Hybrid", desc: "Sensitive data stays on-premise. Less sensitive workloads use cloud burst capacity for cost efficiency.", tags: ["Flexible architecture", "Cost optimized", "Best of both"] },
];

const techStack = [
  { category: "Language Models", items: ["GPT-4o", "Llama 3", "Mistral 7B", "Gemma", "Claude 3"] },
  { category: "Orchestration", items: ["LangChain", "LlamaIndex", "CrewAI", "Haystack", "Custom"] },
  { category: "Vector Databases", items: ["Pinecone", "Weaviate", "Chroma", "pgvector", "Qdrant"] },
  { category: "Infrastructure", items: ["Docker", "Kubernetes", "FastAPI", "Redis", "PostgreSQL"] },
  { category: "Monitoring", items: ["LangSmith", "Prometheus", "Grafana", "OpenTelemetry", "Custom"] },
  { category: "Security", items: ["Vault", "OAuth2", "mTLS", "RBAC", "Audit Logs"] },
];

export default function HowWeBuildPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-6">
              <Cpu className="w-3.5 h-3.5" />
              Technical Architecture
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-6 leading-tight">
              How we{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                architect AI
              </span>
            </h1>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Every 86b.ai deployment follows a secure, model-agnostic pipeline that keeps your data private, your outputs reliable, and your infrastructure in your control.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6-STEP PIPELINE ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">
              The 86b.ai{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                AI Pipeline
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-2xl mx-auto">Every project we build runs through this six-stage pipeline, customized to your data sources and use case.</p>
          </div>

          <div className="space-y-6">
            {pipeline.map((step, i) => (
              <div key={step.num} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Left: step info */}
                  <div className="lg:border-r border-slate-100 p-8 flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase mb-1">{step.num}</div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-0.5">{step.title}</h3>
                    </div>
                  </div>

                  {/* Middle: description */}
                  <div className="lg:border-r border-slate-100 p-8">
                    <p className="text-sm text-slate-600 font-light leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Right: detail bullets */}
                  <div className="p-8">
                    <div className="space-y-2">
                      {step.detail.map((d) => (
                        <div key={d} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-500 font-light">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT OPTIONS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">
              Deployment{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Options
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-xl mx-auto">
              Every deployment keeps your data inside your defined security boundary.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deploymentOptions.map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl border border-slate-200/60 p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:border-blue-300 transition-colors">
                  <opt.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{opt.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-5">{opt.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {opt.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight mb-4">
              Technology{" "}
              <span className="font-semibold" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Stack
              </span>
            </h2>
            <p className="text-base text-slate-500 font-light max-w-xl mx-auto">
              We are model-agnostic and vendor-neutral — we choose the right tool for your specific use case.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((group) => (
              <div key={group.category} className="bg-white rounded-2xl border border-slate-200/60 p-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip heading="Ready to build your AI architecture?" sub="Our engineers will design a custom pipeline for your infrastructure — under NDA, at no initial cost." />
      <Footer />
    </div>
  );
}
