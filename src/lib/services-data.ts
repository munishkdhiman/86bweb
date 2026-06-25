// Central data store for all 86b.ai services
// Used by: home page, services hub, dynamic service detail pages

export interface ServiceStep {
  title: string;
  desc: string;
}

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceMetric {
  value: string;
  label: string;
  sub: string;
}

export interface Service {
  slug: string;
  tag: string;
  category: string;
  icon: string; // lucide icon name string
  image: string; // /public path
  title: string;
  headline: string;
  summary: string; // short — used on cards
  description: string; // longer — used on detail page hero
  problem: string;
  steps: ServiceStep[];
  features: ServiceFeature[];
  metrics: ServiceMetric[];
  techStack: string[];
  ctaLabel: string;
}

export const services: Service[] = [
  {
    slug: "ai-strategy",
    tag: "AI Transformation",
    category: "Strategy",
    icon: "Network",
    image: "/svc_ai_strategy.png",
    title: "AI-First Business Strategy",
    headline: "Turn your enterprise into an AI-native operation in 90 days.",
    summary:
      "We diagnose legacy workflow bottlenecks and build a precision AI roadmap that delivers measurable outcomes within 90 days.",
    description:
      "86b.ai embeds solution engineers inside your teams to map every manual process, data silo, and decision bottleneck. We then design a phased AI transformation roadmap tailored to your industry, tech stack, and compliance requirements — and we stay with you through execution.",
    problem:
      "Most enterprises know they need AI but don't know where to start. Generic AI tools get bolted onto broken processes, producing no measurable ROI. Leaders need a structured, vendor-neutral plan that identifies the highest-impact opportunities first.",
    steps: [
      { title: "Process Audit", desc: "We document every manual workflow, data pipeline, and decision-making bottleneck across your teams." },
      { title: "Opportunity Mapping", desc: "We score each process for AI automation potential, ROI impact, and implementation feasibility." },
      { title: "Roadmap Design", desc: "We deliver a phased 90-day AI transformation roadmap with defined milestones and KPIs." },
      { title: "Execution Support", desc: "Our engineers stay engaged through delivery — not just advisory. We build, deploy, and measure." },
    ],
    features: [
      { title: "Vendor-neutral architecture", desc: "We design for your needs, not for a specific AI vendor's product stack." },
      { title: "90-day outcome guarantee", desc: "Defined measurable results within the first 90 days or we revisit the plan at no cost." },
      { title: "MLOps pipeline design", desc: "Full model operations planning from data ingestion to production monitoring." },
      { title: "Compliance-first approach", desc: "Every recommendation accounts for GDPR, SOC2, HIPAA, and industry regulations." },
      { title: "Legacy system integration", desc: "AI layers designed to work with your existing ERP, CRM, and database infrastructure." },
      { title: "Team capability building", desc: "We train your internal team to own and extend AI systems after delivery." },
    ],
    metrics: [
      { value: "90", label: "Days", sub: "To first measurable AI outcome" },
      { value: "3×", label: "ROI", sub: "Average return on AI investment" },
      { value: "100%", label: "Custom", sub: "No off-the-shelf templates" },
    ],
    techStack: ["LangChain", "OpenAI", "Llama 3", "Pinecone", "Apache Airflow", "dbt"],
    ctaLabel: "Start Your AI Strategy",
  },
  {
    slug: "digital-humans",
    tag: "Conversational AI",
    category: "Conversational AI",
    icon: "Bot",
    image: "/svc_digital_human.png",
    title: "Digital Human Agents",
    headline: "Deploy lifelike AI avatars that represent your brand 24/7.",
    summary:
      "Conversational digital humans programmed with your brand voice, product knowledge, and support workflows — available 24/7 with 0.3s response latency.",
    description:
      "We build photorealistic or stylized digital human agents that speak, listen, and respond with human-like fluency. Each agent is programmed with your company's brand guidelines, product documentation, and support procedures — giving customers a premium, always-available interaction experience.",
    problem:
      "Enterprise support teams are overwhelmed with repetitive first-line queries. Chatbots feel robotic and damage brand perception. Customers expect instant, intelligent, empathetic responses — at any hour, in any language.",
    steps: [
      { title: "Brand Voice Profiling", desc: "We extract your brand tone, vocabulary, and personality guidelines to program the agent's conversational style." },
      { title: "Knowledge Base Ingestion", desc: "Product docs, FAQs, support history, and internal wikis are ingested into a secure RAG pipeline." },
      { title: "Avatar Build & Integration", desc: "The digital human is rendered and integrated into your website, app, or kiosk via WebRTC." },
      { title: "Continuous Improvement", desc: "Conversation logs are anonymously analyzed to improve response quality over time." },
    ],
    features: [
      { title: "0.32s average response latency", desc: "Near-real-time voice and text responses that feel genuinely conversational." },
      { title: "Multilingual support", desc: "Deploy agents in English, German, French, Arabic, Hindi, and 40+ other languages." },
      { title: "Secure knowledge containment", desc: "Your documents never leave your infrastructure — all RAG queries run on-premise or in private VPC." },
      { title: "Emotion & intent detection", desc: "The agent reads sentiment and adapts tone — becoming more empathetic for frustrated customers." },
      { title: "CRM & ticketing integration", desc: "Seamlessly hands off unresolved queries to human agents with full context preserved." },
      { title: "Custom avatar design", desc: "Photorealistic human or branded 3D character — designed to match your company identity." },
    ],
    metrics: [
      { value: "94%", label: "Resolution Rate", sub: "Direct customer issue resolution" },
      { value: "0.3s", label: "Latency", sub: "Average response time" },
      { value: "90%", label: "Cost Saving", sub: "Reduction in first-line support cost" },
    ],
    techStack: ["WebRTC", "ElevenLabs", "GPT-4o", "Pinecone", "LangChain", "React"],
    ctaLabel: "Deploy Your Digital Human",
  },
  {
    slug: "travel-planning",
    tag: "Logistics AI",
    category: "Logistics",
    icon: "Globe",
    image: "/svc_travel_routing.png",
    title: "AI Travel & Route Planning",
    headline: "Autonomous route optimization that cuts delays and costs in real time.",
    summary:
      "Dynamic AI-powered travel and logistics planning that cross-references port schedules, tariff exclusions, and tax codes in real time to cut transit delays by 30%.",
    description:
      "Our AI logistics engine ingests live data from shipping ports, customs databases, carrier schedules, and tax authority feeds to continuously optimize your routing decisions. Whether you're managing corporate travel or international cargo, the system finds the fastest, cheapest, and most compliant path automatically.",
    problem:
      "Logistics planning teams spend hours manually cross-referencing schedules, tariff codes, and port availability. Errors lead to costly delays, customs holds, and missed delivery windows that damage client relationships.",
    steps: [
      { title: "Data Source Integration", desc: "We connect to your existing logistics systems, port APIs, carrier feeds, and customs databases." },
      { title: "Route Intelligence Engine", desc: "Our AI builds a real-time optimization model covering routes, costs, tariffs, and transit times." },
      { title: "Automated Decision Layer", desc: "The system generates optimized routing decisions and flags exceptions for human review." },
      { title: "ERP Sync & Reporting", desc: "All decisions are logged and synced back into your SAP, Oracle, or custom ERP system." },
    ],
    features: [
      { title: "Live port & carrier data", desc: "Real-time feeds from major global ports, airlines, and logistics carriers." },
      { title: "Customs tariff matching", desc: "Automatic HTS code matching and tax-exemption identification for international cargo." },
      { title: "Multi-modal routing", desc: "Optimizes across air, sea, rail, and road for cost and time efficiency." },
      { title: "Delay prediction", desc: "ML models predict likely delays based on historical port congestion and weather data." },
      { title: "Compliance automation", desc: "Auto-generates customs declarations, manifests, and regulatory documentation." },
      { title: "SAP / Oracle integration", desc: "Bidirectional sync with major ERP systems for seamless operations." },
    ],
    metrics: [
      { value: "30%", label: "Fewer Delays", sub: "Reduction in port and transit delays" },
      { value: "14%", label: "Cost Cut", sub: "Average customs tax savings" },
      { value: "12s", label: "Decision Speed", sub: "Full route optimization time" },
    ],
    techStack: ["Python", "OpenAI", "Apache Kafka", "PostgreSQL", "SAP API", "Custom ML Models"],
    ctaLabel: "Optimize Your Logistics",
  },
  {
    slug: "revenue-tracking",
    tag: "Financial Intelligence",
    category: "Finance",
    icon: "BarChart3",
    image: "/svc_revenue_audit.png",
    title: "Revenue Tracking & Auditing",
    headline: "Recover lost revenue automatically by auditing every invoice, contract, and billing line.",
    summary:
      "AI that ingests invoices, POs, and master service agreements at scale — flagging billing discrepancies, MSA covenant breaches, and revenue leakage in seconds, not weeks.",
    description:
      "Our revenue intelligence platform ingests thousands of financial documents simultaneously, extracts structured data from unstructured PDFs, and cross-references every billing line against your master agreements and pricing schedules. Revenue leakage is flagged instantly, with full audit trails for your finance team.",
    problem:
      "Enterprise finance teams audit invoices manually, leaving significant revenue leakage undetected. Billing errors, contract covenant breaches, and pricing discrepancies cost large organizations hundreds of thousands annually — often unnoticed for quarters.",
    steps: [
      { title: "Document Ingestion", desc: "Invoices, purchase orders, and MSAs are ingested at scale — PDFs, scans, and digital formats all supported." },
      { title: "Intelligent Extraction", desc: "Our AI extracts line-item data, pricing terms, payment schedules, and contract covenants automatically." },
      { title: "Cross-Reference Audit", desc: "Every billing line is matched against your master agreements and approved pricing schedules." },
      { title: "Leakage Reports", desc: "Flagged discrepancies are surfaced in a structured audit report with recovery recommendations." },
    ],
    features: [
      { title: "1,000+ docs/minute processing", desc: "Ingest entire invoice archives in minutes, not weeks." },
      { title: "MSA covenant matching", desc: "Automatically identifies when billing terms deviate from your signed master agreements." },
      { title: "ERP reconciliation", desc: "Syncs findings directly back to your SAP, NetSuite, or QuickBooks ledger." },
      { title: "Audit trail generation", desc: "Every decision is logged with evidence for your CFO and external auditors." },
      { title: "Duplicate & overpayment detection", desc: "Flags duplicate invoices and overpayments with high confidence scoring." },
      { title: "Escalation workflows", desc: "Automatically routes high-value discrepancies to the right finance team member." },
    ],
    metrics: [
      { value: "$42K+", label: "Avg. Recovery", sub: "Annual revenue leakage recovered" },
      { value: "90%", label: "Time Saved", sub: "Reduction in manual audit hours" },
      { value: "99.9%", label: "Accuracy", sub: "Extraction accuracy on financial docs" },
    ],
    techStack: ["GPT-4o", "Unstructured.io", "LangChain", "PostgreSQL", "SAP API", "Python"],
    ctaLabel: "Start Revenue Auditing",
  },
  {
    slug: "data-organization",
    tag: "Investor Readiness",
    category: "Finance",
    icon: "Briefcase",
    image: "/svc_investor_data.png",
    title: "Data Organization & Investor Readiness",
    headline: "Transform scattered corporate data into VC-ready structures in days.",
    summary:
      "Organize unlisted cap tables, scattered contracts, and operational data into clean, investor-ready packages. Compress due diligence from months to days.",
    description:
      "We deploy AI to ingest and structure your scattered corporate documentation — cap tables, shareholder agreements, operational reports, financial statements, and compliance records — into clean, standardized data packages that match the due diligence requirements of PE firms and VCs.",
    problem:
      "Companies seeking funding lose deals because their data is scattered across drives, emails, and legacy systems. Investors lose confidence when due diligence takes weeks and uncovers disorganized records. Founders waste months preparing data rooms manually.",
    steps: [
      { title: "Data Audit & Collection", desc: "We identify and ingest all scattered data sources — drives, emails, legacy DBs, and paper records." },
      { title: "AI Structuring", desc: "Documents are classified, extracted, and mapped into standardized legal and financial schemas." },
      { title: "Data Room Construction", desc: "A clean, navigable investor data room is built with all documents properly labeled and indexed." },
      { title: "Investor Matching", desc: "Company metrics are cross-referenced against LP investment mandates to identify the best-fit investors." },
    ],
    features: [
      { title: "4,500+ document processing", desc: "Handles large document volumes across multiple formats and source systems." },
      { title: "SOC2 compliance structuring", desc: "Organizes data to meet SOC2 audit requirements as a byproduct of investor preparation." },
      { title: "Cap table normalization", desc: "Converts messy spreadsheet cap tables into legally formatted, investor-ready structures." },
      { title: "Investor mandate matching", desc: "AI matches your company profile against databases of PE/VC investment criteria." },
      { title: "NDA-protected processing", desc: "All document processing occurs under strict NDA with zero data sharing." },
      { title: "Ongoing data governance", desc: "Sets up ongoing document management workflows to keep your data room current." },
    ],
    metrics: [
      { value: "10×", label: "Faster", sub: "Due diligence preparation time" },
      { value: "4,500+", label: "Documents", sub: "Avg. files processed per engagement" },
      { value: "94.8%", label: "Match Score", sub: "Investor alignment accuracy" },
    ],
    techStack: ["GPT-4o", "Unstructured.io", "LangChain", "Pinecone", "PostgreSQL", "Python"],
    ctaLabel: "Prepare for Funding",
  },
  {
    slug: "german-training",
    tag: "Workforce AI",
    category: "Workforce",
    icon: "BookOpen",
    image: "/svc_german_tutor.png",
    title: "AI German Language Training",
    headline: "Prepare your workforce for German placements with AI-powered language coaching.",
    summary:
      "Personalized AI language coaching for aspirants targeting German careers. Simulates native interviews, tracks CEFR progress, and connects candidates with real recruiters in Berlin and Munich.",
    description:
      "Our AI German training engine is purpose-built for professionals seeking employment in Germany. It extracts role-specific vocabulary from real German job postings, conducts simulated native-speaker technical interviews, scores pronunciation and grammar in real time, and maps candidate progress to CEFR standards — connecting high performers directly with German recruiters.",
    problem:
      "Indian and international professionals struggle to reach German B2/C1 language standards needed for employment. Generic language apps don't teach business German or simulate the interview pressure of German corporate culture. Candidates spend years in self-study with no structured pathway to placement.",
    steps: [
      { title: "Role & Industry Profiling", desc: "We extract German vocabulary and communication patterns from real job postings matching the candidate's target role." },
      { title: "Adaptive Learning Path", desc: "A personalized curriculum is built based on current CEFR level, target industry, and timeline." },
      { title: "Native Interview Simulation", desc: "The AI simulates realistic German business interviews, scoring grammar, vocabulary, and pronunciation in real time." },
      { title: "Recruiter Matching", desc: "Top performers are connected directly with our network of German employers in Berlin, Munich, and Hamburg." },
    ],
    features: [
      { title: "CEFR-aligned curriculum", desc: "Structured learning tracks from A2 to C1 with automated level assessment." },
      { title: "98% pronunciation accuracy scoring", desc: "Real-time phoneme analysis compared against native German speech patterns." },
      { title: "Industry-specific vocabulary", desc: "Engineering, IT, healthcare, finance — vocabulary modules built per sector." },
      { title: "Mock interview sessions", desc: "Unlimited AI-conducted mock interviews with detailed feedback reports." },
      { title: "Progress analytics dashboard", desc: "Exportable progress reports for candidates, employers, and training coordinators." },
      { title: "Direct recruiter network", desc: "Access to 86b.ai's verified German employer network for high-performing candidates." },
    ],
    metrics: [
      { value: "85%", label: "Pass Rate", sub: "Interview success rate for trained candidates" },
      { value: "98%", label: "Pronunciation", sub: "Accuracy scoring vs. native speakers" },
      { value: "B2/C1", label: "CEFR Target", sub: "Standard reached within 6 months" },
    ],
    techStack: ["Whisper AI", "GPT-4o", "ElevenLabs", "FastAPI", "PostgreSQL", "React"],
    ctaLabel: "Start Language Training",
  },
  {
    slug: "ai-testing",
    tag: "QA & Governance",
    category: "Infrastructure",
    icon: "FlaskConical",
    image: "/svc_ai_testing.png",
    title: "AI App Testing & QA",
    headline: "Red-team your AI applications before your users find the flaws.",
    summary:
      "Automated adversarial testing with 10,000+ stress inputs, hallucination detection, bias measurement, and SOC2/HIPAA compliance reporting for enterprise AI applications.",
    description:
      "Before your AI application goes live, it needs to be stress-tested against adversarial inputs, checked for hallucinations, evaluated for bias, and validated for compliance. Our QA engine does all of this automatically — giving you a compliance-ready audit report that your security team and regulators will accept.",
    problem:
      "Enterprise AI applications that haven't been adversarially tested are a liability. A single hallucinated response, biased output, or data leak can cost organizations millions in reputational damage and regulatory fines. Most teams lack the tooling and expertise to test AI properly.",
    steps: [
      { title: "Application Profiling", desc: "We analyze your AI app's inputs, outputs, system prompts, and data access patterns." },
      { title: "Adversarial Testing", desc: "10,000+ crafted adversarial prompts are injected to probe hallucination, jailbreak, and data leak vulnerabilities." },
      { title: "Bias & Fairness Evaluation", desc: "Outputs are analyzed across demographic, linguistic, and cultural dimensions for bias patterns." },
      { title: "Compliance Reporting", desc: "A full audit report is generated covering SOC2, HIPAA, GDPR, and EU AI Act requirements." },
    ],
    features: [
      { title: "10,000+ adversarial test cases", desc: "Comprehensive stress testing covering jailbreaks, prompt injections, and boundary probing." },
      { title: "Hallucination rate measurement", desc: "Quantified hallucination rate with evidence samples for review." },
      { title: "Bias detection across dimensions", desc: "Evaluates outputs for gender, racial, cultural, and linguistic bias patterns." },
      { title: "Model drift monitoring", desc: "Ongoing monitoring to detect when model behavior degrades after deployment." },
      { title: "SOC2 & HIPAA audit reports", desc: "Compliance-ready documentation acceptable to regulators and enterprise security teams." },
      { title: "Remediation recommendations", desc: "Actionable fixes for every identified vulnerability, ranked by severity." },
    ],
    metrics: [
      { value: "0.02%", label: "Target Rate", sub: "Hallucination boundary we target" },
      { value: "10K+", label: "Test Cases", sub: "Adversarial inputs per evaluation" },
      { value: "SOC2", label: "Compliant", sub: "Audit-ready reporting standard" },
    ],
    techStack: ["Giskard", "DeepEval", "LangChain", "Python", "OpenAI Evals", "Custom Red-Team Agents"],
    ctaLabel: "Test Your AI Application",
  },
  {
    slug: "llm-orchestration",
    tag: "AI Infrastructure",
    category: "Infrastructure",
    icon: "Workflow",
    image: "/svc_data_orchestration.png",
    title: "LLM Orchestration & RAG",
    headline: "Private, secure AI pipelines that connect your LLMs to your enterprise data.",
    summary:
      "End-to-end AI infrastructure: local or hosted LLMs, vector search pipelines, RAG architecture, API orchestration, and self-healing data sync — all inside your own environment.",
    description:
      "We design and deploy the full AI infrastructure stack your enterprise needs — from model selection and deployment (local Llama, hosted GPT, or custom fine-tuned models) to vector databases, RAG pipelines, orchestration layers, and production monitoring. Your data never leaves your environment.",
    problem:
      "Enterprises want to use AI but can't send sensitive data to public APIs. Building private AI infrastructure requires deep expertise in model deployment, vector databases, prompt engineering, and MLOps — skills most internal teams don't have yet.",
    steps: [
      { title: "Architecture Design", desc: "We design the full AI stack: model choice, embedding strategy, vector store, orchestration, and API layer." },
      { title: "Model Deployment", desc: "Deploy Llama, Mistral, or custom fine-tuned models on-premise or in your private VPC." },
      { title: "RAG Pipeline Build", desc: "Documents are chunked, embedded, and stored in a vector database for semantic retrieval." },
      { title: "Orchestration & Monitoring", desc: "LangChain or custom orchestration with full observability, alerting, and self-healing." },
    ],
    features: [
      { title: "Local & hosted model support", desc: "Deploy Llama 3, Mistral, Gemma, GPT-4, or custom fine-tuned models." },
      { title: "Private vector databases", desc: "Pinecone, Weaviate, Chroma, or pgvector — deployed inside your infrastructure." },
      { title: "Multi-source RAG", desc: "Ingest PDFs, databases, APIs, wikis, and email archives into a unified retrieval layer." },
      { title: "Agent orchestration", desc: "Multi-step AI agents that can query databases, call APIs, and take actions autonomously." },
      { title: "Self-healing pipelines", desc: "Automated health checks and fallback logic keep your AI stack running 24/7." },
      { title: "Zero public API exposure", desc: "All processing occurs inside your network — no data transmitted to third-party APIs." },
    ],
    metrics: [
      { value: "100%", label: "Private", sub: "Zero data exposure to public APIs" },
      { value: "<2s", label: "Retrieval", sub: "Average RAG query response time" },
      { value: "99.9%", label: "Uptime", sub: "Self-healing pipeline availability" },
    ],
    techStack: ["Llama 3", "Mistral", "LangChain", "Pinecone", "Weaviate", "FastAPI", "Docker", "Kubernetes"],
    ctaLabel: "Build Your AI Infrastructure",
  },
];

export const servicesBySlug: Record<string, Service> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

export const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];
