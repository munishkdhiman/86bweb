export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  steps: { title: string; desc: string }[];
  stack: string[];
  metrics: { value: string; label: string }[];
  useCases: string[];
}

export const services: Service[] = [
  // ── Core AI ─────────────────────────────────────────────────────────────────
  {
    slug: 'generative-ai',
    title: 'Enterprise Generative AI & RAG',
    tagline: 'Private LLMs trained on your knowledge — deployed inside your security boundary.',
    description: 'Custom private LLM fine-tuning and secure orchestration against your proprietary document archives.',
    longDescription:
      'We fine-tune and deploy private large language models against your company\'s internal documentation, product data, and institutional knowledge. Your AI assistant knows your business inside out, stays within your security boundary, and never exposes sensitive data to public APIs. Every deployment includes guardrails, hallucination scoring, and PII detection layers.',
    category: 'Core AI',
    image: '/svc_genai.png',
    steps: [
      { title: 'Knowledge Ingestion', desc: 'Documents, databases, wikis, and emails connected inside your private network via secure connectors.' },
      { title: 'Embedding & Vector Indexing', desc: 'Content chunked, embedded, and stored in a private vector database with access-controlled retrieval.' },
      { title: 'RAG Pipeline Construction', desc: 'Semantically relevant context retrieved at query time — the LLM sees only what\'s needed.' },
      { title: 'Private LLM Deployment', desc: 'Locally deployed or hosted model generates grounded responses with source citations.' },
      { title: 'Guardrail Layer', desc: 'Hallucination scoring, PII detection, and policy compliance evaluated before delivery.' },
      { title: 'Enterprise Integration', desc: 'Deployed via intranet, Slack, Teams, or custom UI with full audit logging.' },
    ],
    stack: ['GPT-4o / Llama 3 / Mistral', 'LangChain / LlamaIndex', 'Pinecone / Weaviate', 'FastAPI', 'Docker / Kubernetes'],
    metrics: [{ value: '85%', label: 'Query resolution' }, { value: '10×', label: 'Faster retrieval' }, { value: '100%', label: 'Private deployment' }],
    useCases: ['Enterprise Knowledge Assistants', 'Internal Copilots', 'Document Q&A Systems', 'Policy Compliance Bots', 'Product Support Automation'],
  },
  {
    slug: 'digital-humans',
    title: 'Digital Human Agents',
    tagline: '0.3s latency conversational AI avatars across 40+ languages.',
    description: 'AI-powered conversational avatars delivering real-time multilingual interactions at enterprise scale.',
    longDescription:
      'Our Digital Human Agents are AI-powered conversational avatars trained on your brand voice, product knowledge, and compliance requirements. They deliver sub-second response latency across 40+ languages, integrated into your existing support infrastructure without any public data exposure.',
    category: 'Core AI',
    image: '/svc_digital_human.png',
    steps: [
      { title: 'Brand Voice Training', desc: 'Avatar trained on your tone, terminology, and customer-facing content.' },
      { title: 'Knowledge Base Integration', desc: 'Connected to your product documentation, FAQs, and CRM system.' },
      { title: 'Multi-modal Deployment', desc: 'Deployed via web widget, mobile SDK, kiosk, or enterprise portal.' },
      { title: 'Latency Optimisation', desc: 'Edge caching and streaming response architecture deliver sub-0.3s latency.' },
      { title: 'Escalation Routing', desc: 'Intelligent handoff to human agents with full conversation context.' },
    ],
    stack: ['GPT-4o / Claude 3.5', 'ElevenLabs / Azure TTS', 'WebRTC', 'Custom Avatar SDK', 'Private VPC'],
    metrics: [{ value: '0.3s', label: 'Response latency' }, { value: '40+', label: 'Languages' }, { value: '24/7', label: 'Availability' }],
    useCases: ['Customer Support Automation', 'Multilingual Sales Agents', 'Employee Onboarding', 'Virtual Training Instructors', 'Kiosk Assistants'],
  },
  {
    slug: 'intelligent-process-automation',
    title: 'Intelligent Process Automation',
    tagline: 'AI that reads, routes, and processes documents at human-level accuracy.',
    description: 'End-to-end automation of document-heavy workflows using computer vision and NLP.',
    longDescription:
      'We automate complex document-heavy business workflows that traditionally require human judgment — invoices, contracts, compliance forms, and approval chains. Our systems achieve human-level accuracy with complete audit trails and exception handling, deployed entirely within your infrastructure.',
    category: 'Core AI',
    image: '/svc_automation.png',
    steps: [
      { title: 'Workflow Mapping', desc: 'Document the existing manual process — triggers, exceptions, approval chains.' },
      { title: 'Document Ingestion', desc: 'Connect all document sources — email, SharePoint, ERP, scanners.' },
      { title: 'AI Extraction Layer', desc: 'Computer vision and NLP extract structured data from unstructured documents.' },
      { title: 'Rules Engine', desc: 'Configurable business rules handle approvals, routing, and exception flagging.' },
      { title: 'Human-in-the-Loop', desc: 'Low-confidence decisions escalated for human review with full context.' },
      { title: 'Audit Trail', desc: 'Every action logged — immutable audit trail for compliance and review.' },
    ],
    stack: ['Unstructured.io', 'GPT-4o Vision', 'Temporal', 'Apache Airflow', 'PostgreSQL'],
    metrics: [{ value: '94%', label: 'Extraction accuracy' }, { value: '80%', label: 'Time saved' }, { value: '100%', label: 'Audit coverage' }],
    useCases: ['Invoice Processing', 'Contract Review', 'Compliance Screening', 'Approval Workflows', 'Claims Processing'],
  },

  // ── Finance AI ───────────────────────────────────────────────────────────────
  {
    slug: 'financial-intelligence',
    title: 'Financial Intelligence & Revenue Auditing',
    tagline: 'AI that reads your MSAs, invoices, and transactions to instantly surface revenue leakage.',
    description: 'Ingesting transaction structures, MSAs, and invoices to track and flag revenue leakages.',
    longDescription:
      'Our financial intelligence systems connect to your transaction database, master service agreements, and invoice records to build a real-time map of your revenue flows. The AI cross-references contracted terms against actual invoicing to surface discrepancies, missed escalators, and billing gaps — delivering a living revenue audit dashboard your finance team can act on daily.',
    category: 'Finance AI',
    image: '/svc_revenue.png',
    steps: [
      { title: 'Data Source Connection', desc: 'Ingests from ERP, billing systems, banking APIs, and document archives.' },
      { title: 'Contract Parsing', desc: 'AI reads MSAs and extracts pricing terms, escalators, and milestone conditions.' },
      { title: 'Transaction Cross-referencing', desc: 'Every invoice matched against contracted terms at line-item level.' },
      { title: 'Anomaly Detection', desc: 'ML models flag under-billing, missed escalators, and duplicate charges.' },
      { title: 'Leakage Dashboard', desc: 'Real-time dashboard showing flagged items, estimated impact, and recovery actions.' },
    ],
    stack: ['GPT-4o Vision', 'Unstructured.io', 'PostgreSQL', 'dbt', 'Power BI / Metabase'],
    metrics: [{ value: '12%', label: 'Avg revenue recovered' }, { value: '48h', label: 'To first insights' }, { value: '$2M+', label: 'Avg leakage found' }],
    useCases: ['Revenue Leakage Recovery', 'Billing Accuracy Audits', 'MSA Compliance Monitoring', 'Invoice Reconciliation', 'Finance Team Augmentation'],
  },
  {
    slug: 'predictive-analytics',
    title: 'Predictive Analytics & Forecasting',
    tagline: 'Forward-looking intelligence from your historical data patterns.',
    description: 'ML models that forecast demand, churn, revenue, and operational KPIs from your proprietary data.',
    longDescription:
      'We build and deploy custom predictive models trained exclusively on your historical data. Unlike off-the-shelf analytics tools, our models understand your specific business dynamics — seasonality, product mix, customer segments — and deliver forecasts with confidence intervals your leadership team can act on.',
    category: 'Finance AI',
    image: '/svc_predictive.png',
    steps: [
      { title: 'Data Audit', desc: 'Assess data quality, completeness, and historical depth across all source systems.' },
      { title: 'Feature Engineering', desc: 'Domain experts and data scientists collaboratively define predictive features.' },
      { title: 'Model Training', desc: 'Ensemble models (XGBoost, LightGBM, Temporal Fusion Transformers) trained on your data.' },
      { title: 'Validation', desc: 'Walk-forward validation on holdout periods with business-meaningful error metrics.' },
      { title: 'Production Deployment', desc: 'Models served via API integrated with your BI tools and dashboards.' },
    ],
    stack: ['Python / scikit-learn', 'XGBoost / LightGBM', 'PyTorch Forecasting', 'MLflow', 'Snowflake / BigQuery'],
    metrics: [{ value: '91%', label: 'Forecast accuracy' }, { value: '30d', label: 'Forecast horizon' }, { value: 'Real-time', label: 'Model updates' }],
    useCases: ['Revenue Forecasting', 'Demand Planning', 'Churn Prediction', 'Inventory Optimisation', 'Capacity Planning'],
  },
  {
    slug: 'investor-readiness',
    title: 'Data Structuring & Investor Readiness',
    tagline: 'Transform scattered corporate data into a VC-ready data room in days.',
    description: 'Cleaning and structuring unlisted corporate data into investor-ready compliance data rooms.',
    longDescription:
      'We connect to your fragmented data sources — ERP, CRM, finance systems, contract repositories — and build a structured, investor-ready data room that compresses due diligence from months to days. The AI layer automatically validates data consistency, flags missing documentation, and generates standard VC-format reporting packages.',
    category: 'Finance AI',
    image: '/svc_investor.png',
    steps: [
      { title: 'Source System Mapping', desc: 'Catalogue all data sources and assess completeness against VC checklist requirements.' },
      { title: 'Data Extraction', desc: 'Automated ETL pipelines pull data from all connected systems.' },
      { title: 'AI Cleaning & Structuring', desc: 'LLM-powered normalization standardizes terminology, units, and formats.' },
      { title: 'Gap Analysis', desc: 'AI flags missing documents, inconsistencies, and potential diligence red flags.' },
      { title: 'Data Room Assembly', desc: 'Structured data room with investor-standard KPIs, cohort analysis, and documentation.' },
    ],
    stack: ['Python / Pandas', 'dbt', 'Snowflake', 'GPT-4o', 'Notion / Confluence API'],
    metrics: [{ value: '30d', label: 'Data room ready' }, { value: '95%', label: 'Data completeness' }, { value: '3×', label: 'Faster diligence' }],
    useCases: ['Series A/B/C Due Diligence', 'M&A Data Preparation', 'Board Reporting', 'Regulatory Submissions', 'Strategic VC Matching'],
  },

  // ── Advanced AI ───────────────────────────────────────────────────────────────
  {
    slug: 'nlp-document-intelligence',
    title: 'NLP & Document Intelligence',
    tagline: 'AI that reads contracts, reports, and regulatory filings at enterprise speed.',
    description: 'Structured data extraction and semantic understanding from any text-heavy business document.',
    longDescription:
      'Our NLP systems read, classify, and extract structured data from any business document — contracts, compliance filings, insurance policies, research reports, or legal briefs. We build bespoke extraction models trained on your document taxonomy, achieving accuracy levels that outperform generic solutions.',
    category: 'Advanced AI',
    image: '/svc_nlp.png',
    steps: [
      { title: 'Document Classification', desc: 'Models trained to classify and route documents by type and urgency.' },
      { title: 'Named Entity Recognition', desc: 'Custom NER models extract parties, dates, obligations, and key terms.' },
      { title: 'Semantic Chunking', desc: 'Hierarchical document structure preserved for accurate contextual extraction.' },
      { title: 'Structured Output', desc: 'Extracted data delivered as JSON, CSV, or direct database writes.' },
      { title: 'Confidence Scoring', desc: 'Each extracted field carries a confidence score and source reference.' },
    ],
    stack: ['spaCy', 'Hugging Face Transformers', 'GPT-4o', 'Apache Tika', 'Elasticsearch'],
    metrics: [{ value: '96%', label: 'Extraction accuracy' }, { value: '1000+', label: 'Docs/hour' }, { value: '40+', label: 'Languages' }],
    useCases: ['Contract Analysis', 'Regulatory Compliance', 'Insurance Claims', 'Legal Discovery', 'Research Synthesis'],
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision & Visual AI',
    tagline: 'AI eyes on your operations — quality control, inspection, and spatial mapping.',
    description: 'Custom vision models for defect detection, quality inspection, and real-time operational monitoring.',
    longDescription:
      'We build and deploy custom computer vision systems for industrial quality control, medical imaging analysis, facility monitoring, and product inspection. Our models are trained on your specific visual domain — not generic internet images — achieving accuracy levels required for enterprise production environments.',
    category: 'Advanced AI',
    image: '/svc_vision.png',
    steps: [
      { title: 'Data Collection & Labelling', desc: 'Domain-specific image collection and expert labelling at scale.' },
      { title: 'Model Architecture Selection', desc: 'Task-optimised architectures: YOLO, ResNet, Vision Transformers, SAM.' },
      { title: 'Training & Validation', desc: 'Models trained on labelled dataset with precision/recall targets agreed upfront.' },
      { title: 'Edge Deployment', desc: 'Optimised models deployed on-device (NVIDIA Jetson, Raspberry Pi, or server).' },
      { title: 'Real-time Monitoring', desc: 'Live inference pipeline with alert routing and defect logging dashboard.' },
    ],
    stack: ['PyTorch', 'YOLO v10', 'OpenCV', 'NVIDIA TensorRT', 'NVIDIA Jetson', 'AWS Rekognition'],
    metrics: [{ value: '99.1%', label: 'Defect detection' }, { value: '<20ms', label: 'Inference time' }, { value: '24/7', label: 'Live monitoring' }],
    useCases: ['Quality Control', 'Defect Detection', 'Facility Monitoring', 'Medical Image Analysis', 'Construction Safety'],
  },

  // ── Workforce AI ─────────────────────────────────────────────────────────────
  {
    slug: 'hr-talent-ai',
    title: 'HR & Talent AI',
    tagline: 'AI that screens, scores, and surfaces the right candidates — without bias.',
    description: 'Intelligent CV screening, candidate scoring, and HR workflow automation.',
    longDescription:
      'Our HR AI systems integrate with your existing ATS and HR systems to automate CV screening, candidate scoring, and interview scheduling. We build explainable models that surface the most relevant candidates based on your specific hiring criteria — with fairness auditing built in to detect and mitigate selection bias.',
    category: 'Workforce AI',
    image: '/svc_hr.png',
    steps: [
      { title: 'Job Description Parsing', desc: 'AI extracts explicit and implicit requirements from your JDs.' },
      { title: 'CV Ingestion', desc: 'Structured extraction from CVs in any format across 40+ languages.' },
      { title: 'Scoring Model', desc: 'Customised scoring weights aligned with your specific hiring criteria.' },
      { title: 'Bias Auditing', desc: 'Fairness metrics monitored across demographic attributes to prevent unlawful discrimination.' },
      { title: 'ATS Integration', desc: 'Ranked shortlist surfaced directly inside your existing ATS workflow.' },
    ],
    stack: ['Python', 'GPT-4o', 'Fairlearn', 'Workday / Greenhouse API', 'PostgreSQL'],
    metrics: [{ value: '70%', label: 'Screening time saved' }, { value: '40%', label: 'Better quality hires' }, { value: '100%', label: 'Bias-audited' }],
    useCases: ['High-Volume Hiring', 'Technical Screening', 'Campus Recruitment', 'Executive Search', 'Internal Mobility'],
  },
  {
    slug: 'ai-language-training',
    title: 'AI Language & Communication Training',
    tagline: 'Personalised AI tutors for enterprise language learning programmes.',
    description: 'Custom AI tutors for corporate language training — German, English, and 40+ languages.',
    longDescription:
      'We build bespoke AI language tutors for enterprise clients with multilingual workforce requirements. Each tutor adapts to the learner\'s proficiency level, industry vocabulary, and preferred learning style — delivering measurably better outcomes than traditional classroom programmes at a fraction of the cost.',
    category: 'Workforce AI',
    image: '/svc_german.png',
    steps: [
      { title: 'Curriculum Mapping', desc: 'Align programme to business-specific communication requirements and CEFR targets.' },
      { title: 'Tutor Configuration', desc: 'AI tutor trained on industry vocabulary, common scenarios, and error patterns.' },
      { title: 'Adaptive Practice', desc: 'Spaced repetition and adaptive difficulty calibrated per learner.' },
      { title: 'Speaking Practice', desc: 'Real-time speech recognition and pronunciation coaching.' },
      { title: 'Progress Reporting', desc: 'Manager dashboards showing cohort progress, CEFR level changes, and engagement.' },
    ],
    stack: ['GPT-4o', 'Whisper ASR', 'Azure TTS', 'React Native', 'PostgreSQL'],
    metrics: [{ value: '2×', label: 'Faster proficiency gain' }, { value: '90%', label: 'Learner satisfaction' }, { value: '40+', label: 'Languages' }],
    useCases: ['German Language for Indian IT Companies', 'English for International Teams', 'Technical Communication', 'Customer-Facing Language Training'],
  },

  // ── AI Governance ────────────────────────────────────────────────────────────
  {
    slug: 'ai-governance',
    title: 'AI Governance & Compliance',
    tagline: 'Enterprise AI governance frameworks aligned to EU AI Act, ISO 42001, and GDPR.',
    description: 'Building responsible AI infrastructure with audit trails, explainability, and regulatory compliance.',
    longDescription:
      'As AI regulations tighten globally, we help enterprises build governance frameworks that satisfy regulators, satisfy boards, and satisfy users. We implement explainability layers, bias monitoring, data lineage tracking, and model risk management policies — aligned to EU AI Act, ISO/IEC 42001, GDPR, and sector-specific requirements.',
    category: 'AI Governance',
    image: '/svc_governance.png',
    steps: [
      { title: 'AI Risk Assessment', desc: 'Catalogue all AI systems and classify by regulatory risk tier.' },
      { title: 'Policy Framework', desc: 'Draft AI usage policies, accountability matrices, and incident response plans.' },
      { title: 'Explainability Implementation', desc: 'SHAP/LIME explanations added to all decision-critical models.' },
      { title: 'Monitoring Infrastructure', desc: 'Continuous monitoring for model drift, bias emergence, and performance degradation.' },
      { title: 'Audit Trail', desc: 'Immutable logs of all model inputs, outputs, and decisions for regulatory reporting.' },
    ],
    stack: ['SHAP / LIME', 'MLflow', 'Great Expectations', 'Azure Purview', 'Custom Audit Framework'],
    metrics: [{ value: '100%', label: 'Audit coverage' }, { value: 'EU AI Act', label: 'Compliant' }, { value: 'ISO 42001', label: 'Aligned' }],
    useCases: ['Regulatory Compliance', 'AI Risk Management', 'GDPR Alignment', 'Board-Level AI Reporting', 'Ethical AI Programmes'],
  },
  {
    slug: 'ai-testing-red-teaming',
    title: 'AI Testing & Red-Teaming',
    tagline: 'Adversarial testing to find what your AI does when the inputs get hostile.',
    description: 'Systematic adversarial testing, jailbreak detection, and safety evaluation for production AI systems.',
    longDescription:
      'Before deploying AI systems at enterprise scale, we conduct systematic adversarial testing — prompt injection attacks, jailbreak attempts, edge-case data poisoning, and hallucination stress tests. Our red-team reports give you a clear picture of failure modes before your AI system encounters them in production.',
    category: 'AI Governance',
    image: '/svc_testing.png',
    steps: [
      { title: 'Attack Surface Mapping', desc: 'Identify all input vectors and potential adversarial entry points.' },
      { title: 'Automated Fuzzing', desc: 'Automated generation of adversarial inputs across common attack categories.' },
      { title: 'Manual Red-Teaming', desc: 'Expert human testers probe for nuanced reasoning failures and brand risk.' },
      { title: 'Hallucination Stress Test', desc: 'Systematic tests for confabulation on topics outside the knowledge base.' },
      { title: 'Remediation Report', desc: 'Prioritised vulnerability report with specific remediation recommendations.' },
    ],
    stack: ['Garak', 'LangChain Red-Team', 'Custom Prompt Libraries', 'Python', 'Grafana'],
    metrics: [{ value: '200+', label: 'Attack vectors tested' }, { value: '48h', label: 'Standard turnaround' }, { value: 'Zero', label: 'Production incidents post-audit' }],
    useCases: ['Pre-deployment Safety Audits', 'Ongoing Red-Team Retainers', 'Regulatory Compliance Testing', 'Brand Risk Assessment', 'Third-party AI Audits'],
  },

  // ── MLOps & Infrastructure ────────────────────────────────────────────────────
  {
    slug: 'llm-infrastructure',
    title: 'LLM Orchestration & Private Infrastructure',
    tagline: 'End-to-end private LLM hosting — from GPU selection to API gateway.',
    description: 'Private cloud and on-premise LLM hosting with secure API gateways and cost optimisation.',
    longDescription:
      'We design and deploy the complete private infrastructure stack for self-hosted large language models — from GPU cluster selection and model quantization through API gateway configuration, authentication, rate limiting, and cost monitoring. All inside your VPC. No external API calls.',
    category: 'MLOps & Infrastructure',
    image: '/svc_llm_infra.png',
    steps: [
      { title: 'Model Selection', desc: 'Select optimal open-source model for your use case — Llama 3, Mistral, Phi-3, Gemma 2.' },
      { title: 'Infrastructure Design', desc: 'GPU cluster architecture scoped to your throughput requirements and budget.' },
      { title: 'Model Optimisation', desc: 'Quantization (GGUF, AWQ, GPTQ) to maximise performance/cost ratio.' },
      { title: 'Serving Layer', desc: 'vLLM or TGI serving with batching, caching, and load balancing.' },
      { title: 'API Gateway', desc: 'Authenticated REST API with rate limiting, usage tracking, and logging.' },
    ],
    stack: ['vLLM / TGI', 'NVIDIA CUDA', 'Kubernetes', 'Traefik', 'Prometheus / Grafana'],
    metrics: [{ value: '100%', label: 'Private infrastructure' }, { value: '3×', label: 'Cost vs public API' }, { value: '99.9%', label: 'Uptime SLA' }],
    useCases: ['Private LLM Hosting', 'API Gateway for AI Services', 'GPU Cluster Management', 'Cost Optimisation', 'Air-Gapped Deployments'],
  },
  {
    slug: 'mlops',
    title: 'MLOps & Model Lifecycle Management',
    tagline: 'Production-grade ML engineering — training pipelines, monitoring, and continuous retraining.',
    description: 'End-to-end MLOps infrastructure for model development, deployment, and ongoing management.',
    longDescription:
      'We build the engineering infrastructure that keeps your ML models accurate and operational long after the initial deployment. This includes automated retraining pipelines, model versioning, A/B testing frameworks, drift monitoring, and rollback mechanisms — the full production ML stack.',
    category: 'MLOps & Infrastructure',
    image: '/svc_mlops.png',
    steps: [
      { title: 'Pipeline Architecture', desc: 'Automated data → train → evaluate → deploy pipelines using Airflow or Prefect.' },
      { title: 'Experiment Tracking', desc: 'MLflow or W&B configured for full reproducibility and comparison.' },
      { title: 'Model Registry', desc: 'Versioned model registry with promotion gates and approval workflows.' },
      { title: 'Monitoring', desc: 'Data drift, prediction drift, and feature importance monitoring via Evidently.' },
      { title: 'Automated Retraining', desc: 'Triggered retraining when drift thresholds breached or on scheduled cadence.' },
    ],
    stack: ['MLflow', 'Apache Airflow', 'Docker / Kubernetes', 'Evidently AI', 'Weights & Biases'],
    metrics: [{ value: '90%', label: 'Less manual ML ops' }, { value: 'Auto', label: 'Drift detection' }, { value: '1-click', label: 'Model rollback' }],
    useCases: ['ML Model Maintenance', 'Continuous Training', 'Model Performance Monitoring', 'A/B Model Testing', 'Feature Store Management'],
  },

  // ── Industry Solutions ────────────────────────────────────────────────────────
  {
    slug: 'ai-route-planning',
    title: 'AI Route & Logistics Optimisation',
    tagline: 'Dynamic routing AI that reduces fleet costs and delivery times simultaneously.',
    description: 'Machine learning-powered route optimisation for delivery fleets, field service, and supply chains.',
    longDescription:
      'We build AI-powered logistics optimisation systems that reduce fleet operating costs by 15–30% while improving delivery reliability. Our systems ingest real-time traffic data, weather, vehicle constraints, and customer time windows to dynamically compute and update optimal routes throughout the day.',
    category: 'Industry Solutions',
    image: '/svc_travel.png',
    steps: [
      { title: 'Network Modelling', desc: 'Model your fleet, depots, customer locations, and service constraints.' },
      { title: 'Solver Selection', desc: 'OR-Tools, Google Fleet Routing, or custom ML solver based on problem scale.' },
      { title: 'Real-time Data Integration', desc: 'Connect traffic APIs, weather feeds, and IoT vehicle telemetry.' },
      { title: 'Dynamic Re-routing', desc: 'Continuous re-optimisation as conditions change throughout the day.' },
      { title: 'Driver App Integration', desc: 'Optimised routes pushed to driver mobile apps with turn-by-turn navigation.' },
    ],
    stack: ['Google OR-Tools', 'Python', 'HERE Maps API', 'Kafka', 'React Native'],
    metrics: [{ value: '22%', label: 'Cost reduction' }, { value: '18%', label: 'Faster delivery' }, { value: 'Real-time', label: 'Route updates' }],
    useCases: ['Last-Mile Delivery', 'Field Service Scheduling', 'Supply Chain Optimisation', 'Waste Collection Routing', 'Emergency Response'],
  },

  // ── Spatial Intelligence ─────────────────────────────────────────────────────
  {
    slug: 'cognitive-digital-twins',
    title: 'Cognitive Digital Twins',
    tagline: 'Live 3D replicas of your physical systems powered by predictive AI agents.',
    description: 'Creating real-time 3D digital replicas of facilities, supply chains, and data ecosystems driven by predictive AI.',
    longDescription:
      'We build live digital twin environments that mirror your physical infrastructure in real time — factories, logistics networks, energy grids, or IT systems. These aren\'t static 3D models; they\'re active AI agents that ingest live sensor data, predict failures before they happen, and simulate the impact of operational changes before you make them.',
    category: 'Spatial Intelligence',
    image: '/svc_digital_twins.png',
    steps: [
      { title: 'Physical System Mapping', desc: 'Comprehensive survey of physical infrastructure, sensor networks, and data streams.' },
      { title: '3D Model Construction', desc: 'Photogrammetry, BIM data, or CAD files converted into a live 3D digital representation.' },
      { title: 'IoT Data Integration', desc: 'Real-time sensor telemetry streamed into the digital twin via MQTT or OPC-UA.' },
      { title: 'Predictive AI Layer', desc: 'Anomaly detection and failure prediction models trained on historical sensor patterns.' },
      { title: 'Simulation Engine', desc: 'What-if simulation capabilities to model operational changes before physical execution.' },
      { title: 'Operations Dashboard', desc: 'Real-time 3D command interface with alert routing and performance KPIs.' },
    ],
    stack: ['Unity / Unreal Engine', 'AWS IoT Core', 'InfluxDB', 'MQTT', 'Python / TensorFlow'],
    metrics: [{ value: '35%', label: 'Downtime reduction' }, { value: 'Real-time', label: 'Data sync' }, { value: '72h', label: 'Failure prediction horizon' }],
    useCases: ['Factory Operations Monitoring', 'Energy Grid Management', 'Supply Chain Simulation', 'Smart Building Management', 'Predictive Maintenance'],
  },
  {
    slug: 'spatial-computing-ar',
    title: 'Spatial Computing & AR Operations',
    tagline: 'Hands-free AI guidance for field engineers via Apple Vision Pro and Meta Quest.',
    description: 'Overlaying contextual AI data and real-time instructions onto AR/VR hardware for field operations.',
    longDescription:
      'We build spatial computing applications that empower field engineers and technical operators with hands-free, AI-guided maintenance and assembly protocols. Operating on Apple Vision Pro, Meta Quest, and Microsoft HoloLens, our systems overlay real-time AI instructions, equipment diagnostics, and remote expert guidance directly into the operator\'s field of view.',
    category: 'Spatial Intelligence',
    image: '/svc_spatial_ar.png',
    steps: [
      { title: 'Use Case Definition', desc: 'Map specific field operations that benefit from spatial augmentation.' },
      { title: 'Content Authoring', desc: 'Step-by-step AR instruction overlays authored and tested in simulation.' },
      { title: 'Computer Vision Integration', desc: 'Object recognition trained to identify equipment, components, and spatial anchors.' },
      { title: 'AI Guidance Layer', desc: 'Real-time AI recommendations based on equipment state and operator context.' },
      { title: 'Remote Expert Connect', desc: 'Bidirectional video with remote expert able to annotate the operator\'s AR view.' },
      { title: 'Hardware Deployment', desc: 'Fleet management and content update infrastructure for AR devices.' },
    ],
    stack: ['Apple Vision Pro SDK', 'Meta Presence Platform', 'ARKit / ARCore', 'Unity', 'WebRTC', 'AWS IoT'],
    metrics: [{ value: '40%', label: 'Faster field repairs' }, { value: '60%', label: 'Training time saved' }, { value: '95%', label: 'First-time fix rate' }],
    useCases: ['Industrial Maintenance', 'Assembly Guidance', 'Remote Expert Support', 'Safety Training', 'Quality Inspection'],
  },
  {
    slug: 'immersive-environments',
    title: 'Immersive Simulation Environments',
    tagline: 'Private 3D virtual workspaces where Digital Human Agents train and support at scale.',
    description: 'Building secure virtual environments with AI Digital Human Agents for training and support.',
    longDescription:
      'We build private, photorealistic 3D simulation spaces where AI Digital Human Agents operate as interactive training instructors, onboarding guides, or customer support staff. These environments enable highly immersive corporate training, product demonstrations, and virtual customer experiences — without the travel costs, scheduling constraints, or geographic limitations of in-person programmes.',
    category: 'Spatial Intelligence',
    image: '/svc_immersive.png',
    steps: [
      { title: 'Environment Design', desc: 'Photorealistic 3D environment designed to match your brand and use case.' },
      { title: 'Digital Human Integration', desc: 'Conversational AI avatars trained on your specific content and brand voice.' },
      { title: 'Scenario Scripting', desc: 'Interactive training scenarios and branching narratives authored and tested.' },
      { title: 'Multi-user Support', desc: 'Simultaneous multi-participant sessions with shared virtual spaces.' },
      { title: 'Analytics Integration', desc: 'Learner engagement, completion, and knowledge retention tracked per participant.' },
    ],
    stack: ['Unreal Engine 5', 'MetaHuman', 'GPT-4o', 'Azure Spatial Anchors', 'WebXR'],
    metrics: [{ value: '75%', label: 'Training cost reduction' }, { value: '85%', label: 'Retention improvement' }, { value: 'Unlimited', label: 'Concurrent users' }],
    useCases: ['Corporate Onboarding', 'Product Demonstration', 'Safety Training', 'Customer Virtual Showrooms', 'Remote Collaboration'],
  },
];

export const servicesByCategory = services.reduce<Record<string, Service[]>>((acc, svc) => {
  if (!acc[svc.category]) acc[svc.category] = [];
  acc[svc.category].push(svc);
  return acc;
}, {});

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
