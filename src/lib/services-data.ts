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
  // ── Core AI Capabilities ──────────────────────────────────────────────────
  {
    slug: 'generative-ai',
    title: 'Enterprise Generative AI & RAG',
    tagline: 'LLMs trained on your knowledge — deployed within your chosen security boundary.',
    description: 'Custom LLM fine-tuning and secure orchestration against your proprietary document archives — on-premise, private VPC, or enterprise cloud.',
    longDescription:
      'We fine-tune and deploy large language models against your internal documentation, product data, and institutional knowledge — within your chosen deployment model: fully private on-premise, private VPC, Azure OpenAI Service, AWS Bedrock, or GCP Vertex AI. Every deployment includes guardrails, hallucination scoring, and PII detection layers, regardless of the infrastructure model.',
    category: 'Core AI Capabilities',
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
    metrics: [{ value: 'High', label: 'Resolution rate on indexed knowledge' }, { value: 'Flexible', label: 'On-premise to cloud deployment' }, { value: 'Zero', label: 'External data exposure (private deployments)' }],
    useCases: ['Enterprise Knowledge Assistants', 'Internal Copilots', 'Document Q&A Systems', 'Policy Compliance Bots', 'Product Support Automation'],
  },
  {
    slug: 'digital-humans',
    title: 'Digital Human Agents',
    tagline: 'Sub-second latency conversational AI avatars across 40+ languages.',
    description: 'AI-powered conversational avatars delivering real-time multilingual interactions at enterprise scale.',
    longDescription:
      'Our Digital Human Agents are AI-powered conversational avatars trained on your brand voice, product knowledge, and compliance requirements. They deliver low-latency responses across 40+ languages, integrated into your existing support infrastructure. Deployment options include private VPC, Azure Cognitive Services, or on-premise — aligned to your data residency and compliance requirements.',
    category: 'Core AI Capabilities',
    image: '/svc_digital_human.png',
    steps: [
      { title: 'Brand Voice Training', desc: 'Avatar trained on your tone, terminology, and customer-facing content.' },
      { title: 'Knowledge Base Integration', desc: 'Connected to your product documentation, FAQs, and CRM system.' },
      { title: 'Multi-modal Deployment', desc: 'Deployed via web widget, mobile SDK, kiosk, or enterprise portal.' },
      { title: 'Latency Optimisation', desc: 'Edge caching and streaming response architecture deliver sub-0.3s latency.' },
      { title: 'Escalation Routing', desc: 'Intelligent handoff to human agents with full conversation context.' },
    ],
    stack: ['GPT-4o / Claude 3.5', 'ElevenLabs / Azure TTS', 'WebRTC', 'Custom Avatar SDK', 'Private VPC / Azure'],
    metrics: [{ value: '~0.3s', label: 'Target response latency (GPU infrastructure)' }, { value: '40+', label: 'Languages supported' }, { value: '24/7', label: 'Designed availability' }],
    useCases: ['Customer Support Automation', 'Multilingual Sales Agents', 'Employee Onboarding', 'Virtual Training Instructors', 'Kiosk Assistants'],
  },
  {
    slug: 'intelligent-process-automation',
    title: 'Intelligent Process Automation',
    tagline: 'AI that reads, routes, and processes documents with high accuracy and a full audit trail.',
    description: 'End-to-end automation of document-heavy workflows using computer vision and NLP.',
    longDescription:
      'We automate complex document-heavy business workflows that traditionally require human judgment — invoices, contracts, compliance forms, and approval chains. Our systems achieve high accuracy with complete audit trails and exception handling. Deployable within your own infrastructure or via enterprise cloud, with human-in-the-loop review for low-confidence decisions.',
    category: 'Core AI Capabilities',
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
    metrics: [{ value: '~94%', label: 'Accuracy on standard document types' }, { value: 'Significant', label: 'Reduction in manual processing time' }, { value: 'End-to-end', label: 'Audit trail coverage' }],
    useCases: ['Invoice Processing', 'Contract Review', 'Compliance Screening', 'Approval Workflows', 'Claims Processing'],
  },
  {
    slug: 'nlp-document-intelligence',
    title: 'NLP & Document Intelligence',
    tagline: 'AI that reads contracts, reports, and regulatory filings at enterprise speed.',
    description: 'Structured data extraction and semantic understanding from any text-heavy business document.',
    longDescription:
      'Our NLP systems read, classify, and extract structured data from any business document — contracts, compliance filings, insurance policies, research reports, or legal briefs. We build bespoke extraction models trained on your document taxonomy, achieving accuracy levels that outperform generic solutions.',
    category: 'Core AI Capabilities',
    image: '/svc_nlp.png',
    steps: [
      { title: 'Document Classification', desc: 'Models trained to classify and route documents by type and urgency.' },
      { title: 'Named Entity Recognition', desc: 'Custom NER models extract parties, dates, obligations, and key terms.' },
      { title: 'Semantic Chunking', desc: 'Hierarchical document structure preserved for accurate contextual extraction.' },
      { title: 'Structured Output', desc: 'Extracted data delivered as JSON, CSV, or direct database writes.' },
      { title: 'Confidence Scoring', desc: 'Each extracted field carries a confidence score and source reference.' },
    ],
    stack: ['spaCy', 'Hugging Face Transformers', 'GPT-4o', 'Apache Tika', 'Elasticsearch'],
    metrics: [{ value: '~96%', label: 'Accuracy on trained document types' }, { value: '1000+', label: 'Est. docs/hour throughput' }, { value: '40+', label: 'Languages supported' }],
    useCases: ['Contract Analysis', 'Regulatory Compliance', 'Insurance Claims', 'Legal Discovery', 'Research Synthesis'],
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision & Visual AI',
    tagline: 'AI eyes on your operations — quality control, inspection, and spatial mapping.',
    description: 'Custom vision models for defect detection, quality inspection, and real-time operational monitoring.',
    longDescription:
      'We build and deploy custom computer vision systems for industrial quality control, medical imaging analysis, facility monitoring, and product inspection. Our models are trained on your specific visual domain — not generic internet images — achieving accuracy levels required for enterprise production environments.',
    category: 'Core AI Capabilities',
    image: '/svc_vision.png',
    steps: [
      { title: 'Data Collection & Labelling', desc: 'Domain-specific image collection and expert labelling at scale.' },
      { title: 'Model Architecture Selection', desc: 'Task-optimised architectures: YOLO, ResNet, Vision Transformers, SAM.' },
      { title: 'Training & Validation', desc: 'Models trained on labelled dataset with precision/recall targets agreed upfront.' },
      { title: 'Edge Deployment', desc: 'Optimised models deployed on-device (NVIDIA Jetson, Raspberry Pi, or server).' },
      { title: 'Real-time Monitoring', desc: 'Live inference pipeline with alert routing and defect logging dashboard.' },
    ],
    stack: ['PyTorch', 'YOLO v10', 'OpenCV', 'NVIDIA TensorRT', 'NVIDIA Jetson', 'AWS Rekognition'],
    metrics: [{ value: '~99%', label: 'Accuracy on trained defect categories' }, { value: '<20ms', label: 'Target inference time' }, { value: '24/7', label: 'Live monitoring' }],
    useCases: ['Quality Control', 'Defect Detection', 'Facility Monitoring', 'Medical Image Analysis', 'Construction Safety'],
  },

  // ── Enterprise Infrastructure & Security ──────────────────────────────────
  {
    slug: 'llm-infrastructure',
    title: 'LLM Orchestration & Private Infrastructure',
    tagline: 'End-to-end LLM infrastructure — from GPU selection to API gateway, on your terms.',
    description: 'On-premise, private cloud, and enterprise managed LLM hosting with secure API gateways and cost optimisation.',
    longDescription:
      'We design and deploy the complete infrastructure stack for large language models — whether fully self-hosted on your own hardware, within a private VPC, or via Azure OpenAI Service and AWS Bedrock with private networking. We handle GPU cluster selection, model quantisation, API gateway configuration, authentication, rate limiting, and cost monitoring. The right architecture for your compliance and budget requirements.',
    category: 'Enterprise Infrastructure & Security',
    image: '/svc_llm_infra.png',
    steps: [
      { title: 'Model Selection', desc: 'Select optimal open-source model for your use case — Llama 3, Mistral, Phi-3, Gemma 2.' },
      { title: 'Infrastructure Design', desc: 'GPU cluster architecture scoped to your throughput requirements and budget.' },
      { title: 'Model Optimisation', desc: 'Quantization (GGUF, AWQ, GPTQ) to maximise performance/cost ratio.' },
      { title: 'Serving Layer', desc: 'vLLM or TGI serving with batching, caching, and load balancing.' },
      { title: 'API Gateway', desc: 'Authenticated REST API with rate limiting, usage tracking, and logging.' },
    ],
    stack: ['vLLM / TGI', 'NVIDIA CUDA', 'Kubernetes', 'Traefik', 'Prometheus / Grafana'],
    metrics: [{ value: 'Private-first', label: 'Infrastructure approach' }, { value: '~3×', label: 'Est. cost saving (high-volume deployments)' }, { value: '99.9%', label: 'Target uptime architecture' }],
    useCases: ['Private LLM Hosting', 'API Gateway for AI Services', 'GPU Cluster Management', 'Cost Optimisation', 'Air-Gapped Deployments'],
  },
  {
    slug: 'mlops',
    title: 'MLOps & Model Lifecycle Management',
    tagline: 'Production-grade ML engineering — training pipelines, monitoring, and continuous retraining.',
    description: 'End-to-end MLOps infrastructure for model development, deployment, and ongoing management.',
    longDescription:
      'We build the engineering infrastructure that keeps your ML models accurate and operational long after the initial deployment. This includes automated retraining pipelines, model versioning, A/B testing frameworks, drift monitoring, and rollback mechanisms — the full production ML stack.',
    category: 'Enterprise Infrastructure & Security',
    image: '/svc_mlops.png',
    steps: [
      { title: 'Pipeline Architecture', desc: 'Automated data → train → evaluate → deploy pipelines using Airflow or Prefect.' },
      { title: 'Experiment Tracking', desc: 'MLflow or W&B configured for full reproducibility and comparison.' },
      { title: 'Model Registry', desc: 'Versioned model registry with promotion gates and approval workflows.' },
      { title: 'Monitoring', desc: 'Data drift, prediction drift, and feature importance monitoring via Evidently.' },
      { title: 'Automated Retraining', desc: 'Triggered retraining when drift thresholds breached or on scheduled cadence.' },
    ],
    stack: ['MLflow', 'Apache Airflow', 'Docker / Kubernetes', 'Evidently AI', 'Weights & Biases'],
    metrics: [{ value: 'Automated', label: 'Training and deployment pipelines' }, { value: 'Auto', label: 'Drift detection' }, { value: '1-click', label: 'Model rollback' }],
    useCases: ['ML Model Maintenance', 'Continuous Training', 'Model Performance Monitoring', 'A/B Model Testing', 'Feature Store Management'],
  },
  {
    slug: 'ai-governance',
    title: 'AI Governance & Compliance',
    tagline: 'Enterprise AI governance frameworks aligned to EU AI Act, ISO 42001, and GDPR.',
    description: 'Building responsible AI infrastructure with audit trails, explainability, and regulatory compliance.',
    longDescription:
      'As AI regulations tighten globally, we help enterprises build governance frameworks that satisfy regulators, satisfy boards, and satisfy users. We implement explainability layers, bias monitoring, data lineage tracking, and model risk management policies — aligned to EU AI Act, ISO/IEC 42001, GDPR, and sector-specific requirements.',
    category: 'Enterprise Infrastructure & Security',
    image: '/svc_governance.png',
    steps: [
      { title: 'AI Risk Assessment', desc: 'Catalogue all AI systems and classify by regulatory risk tier.' },
      { title: 'Policy Framework', desc: 'Draft AI usage policies, accountability matrices, and incident response plans.' },
      { title: 'Explainability Implementation', desc: 'SHAP/LIME explanations added to all decision-critical models.' },
      { title: 'Monitoring Infrastructure', desc: 'Continuous monitoring for model drift, bias emergence, and performance degradation.' },
      { title: 'Audit Trail', desc: 'Immutable logs of all model inputs, outputs, and decisions for regulatory reporting.' },
    ],
    stack: ['SHAP / LIME', 'MLflow', 'Great Expectations', 'Azure Purview', 'Custom Audit Framework'],
    metrics: [{ value: 'End-to-end', label: 'Audit trail' }, { value: 'EU AI Act', label: 'Aligned' }, { value: 'ISO 42001', label: 'Aligned' }],
    useCases: ['Regulatory Compliance', 'AI Risk Management', 'GDPR Alignment', 'Board-Level AI Reporting', 'Ethical AI Programmes'],
  },
  {
    slug: 'ai-testing-red-teaming',
    title: 'AI Testing & Red-Teaming',
    tagline: 'Adversarial testing to find what your AI does when the inputs get hostile.',
    description: 'Systematic adversarial testing, jailbreak detection, and safety evaluation for production AI systems.',
    longDescription:
      'Before deploying AI systems at enterprise scale, we conduct systematic adversarial testing — prompt injection attacks, jailbreak attempts, edge-case data poisoning, and hallucination stress tests. Our red-team reports give you a clear picture of failure modes before your AI system encounters them in production.',
    category: 'Enterprise Infrastructure & Security',
    image: '/svc_testing.png',
    steps: [
      { title: 'Attack Surface Mapping', desc: 'Identify all input vectors and potential adversarial entry points.' },
      { title: 'Automated Fuzzing', desc: 'Automated generation of adversarial inputs across common attack categories.' },
      { title: 'Manual Red-Teaming', desc: 'Expert human testers probe for nuanced reasoning failures and brand risk.' },
      { title: 'Hallucination Stress Test', desc: 'Systematic tests for confabulation on topics outside the knowledge base.' },
      { title: 'Remediation Report', desc: 'Prioritised vulnerability report with specific remediation recommendations.' },
    ],
    stack: ['Garak', 'LangChain Red-Team', 'Custom Prompt Libraries', 'Python', 'Grafana'],
    metrics: [{ value: '200+', label: 'Attack vectors tested' }, { value: '~48h', label: 'Est. standard turnaround' }, { value: 'Reduced', label: 'Production incident risk post-audit' }],
    useCases: ['Pre-deployment Safety Audits', 'Ongoing Red-Team Retainers', 'Regulatory Compliance Testing', 'Brand Risk Assessment', 'Third-party AI Audits'],
  },

  // ── Spatial Intelligence & Operations ─────────────────────────────────────
  {
    slug: 'cognitive-digital-twins',
    title: 'Cognitive Digital Twins',
    tagline: 'Live 3D replicas of your physical systems powered by predictive AI agents.',
    description: 'Creating real-time 3D digital replicas of facilities, supply chains, and data ecosystems driven by predictive AI.',
    longDescription:
      'We build live digital twin environments that mirror your physical infrastructure in real time — factories, logistics networks, energy grids, or IT systems. These aren\'t static 3D models; they\'re active AI agents that ingest live sensor data, predict failures before they happen, and simulate the impact of operational changes before you make them.',
    category: 'Spatial Intelligence & Operations',
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
    metrics: [{ value: 'Measurable', label: 'Downtime reduction via early prediction' }, { value: 'Real-time', label: 'Data sync' }, { value: 'Hours+', label: 'Est. failure prediction window' }],
    useCases: ['Factory Operations Monitoring', 'Energy Grid Management', 'Supply Chain Simulation', 'Smart Building Management', 'Predictive Maintenance'],
  },
  {
    slug: 'spatial-computing-ar',
    title: 'Spatial Computing & AR Operations',
    tagline: 'Hands-free AI guidance for field engineers across all major XR headsets and smart glasses.',
    description: 'Overlaying contextual AI data and real-time instructions onto AR/VR hardware and smart glasses for field operations.',
    longDescription:
      'We build spatial computing applications that empower field engineers and technical operators with hands-free, AI-guided maintenance and assembly protocols. Compatible with all leading enterprise XR headsets — Meta Quest Pro, Microsoft HoloLens 2, Magic Leap 2, Vuzix Blade, RealWear Navigator — and Meta Ray-Ban smart glasses for lightweight, wearable AI in the field. Our systems overlay real-time AI instructions, equipment diagnostics, and remote expert guidance directly into the operator\'s field of view.',
    category: 'Spatial Intelligence & Operations',
    image: '/svc_spatial_ar.png',
    steps: [
      { title: 'Use Case Definition', desc: 'Map specific field operations that benefit from spatial augmentation.' },
      { title: 'Content Authoring', desc: 'Step-by-step AR instruction overlays authored and tested in simulation.' },
      { title: 'Computer Vision Integration', desc: 'Object recognition trained to identify equipment, components, and spatial anchors.' },
      { title: 'AI Guidance Layer', desc: 'Real-time AI recommendations based on equipment state and operator context.' },
      { title: 'Remote Expert Connect', desc: 'Bidirectional video with remote expert able to annotate the operator\'s AR view.' },
      { title: 'Hardware Deployment', desc: 'Fleet management and content update infrastructure for AR devices and smart glasses.' },
    ],
    stack: ['Meta Quest SDK', 'Microsoft HoloLens SDK', 'Meta Ray-Ban SDK', 'ARKit / ARCore', 'Unity / Unreal Engine 5', 'WebRTC', 'AWS IoT'],
    metrics: [{ value: 'Faster', label: 'Field repairs with guided protocols' }, { value: '~60%', label: 'Est. training time saved vs classroom' }, { value: 'Higher', label: 'First-time fix rates reported' }],
    useCases: ['Industrial Maintenance', 'Assembly Guidance', 'Remote Expert Support', 'Safety Training', 'Quality Inspection'],
  },
  {
    slug: 'ai-smart-glasses',
    title: 'AI-Powered Smart Glasses',
    tagline: 'Wearable AI for frontline workers — no headset, no screen, no friction.',
    description: 'Meta Ray-Ban smart glasses as a lightweight enterprise AI tool for field engineers, retail staff, and logistics teams.',
    longDescription:
      'Meta Ray-Ban smart glasses bring AI to the frontline without the bulk of a traditional AR headset. Engineers photograph equipment and ask questions out loud — the AI identifies faults, retrieves the relevant service manual, and logs the work order in real time. Retail staff scan product barcodes and instantly surface pricing, inventory levels, and upsell recommendations. Logistics teams photograph delivery labels and receive routing instructions hands-free. We build the AI layer that sits behind the glasses — connected to your internal knowledge base, ERP, or field service platform — and deploy it within your chosen security boundary.',
    category: 'Spatial Intelligence & Operations',
    image: '/meta_rayban_field.png',
    steps: [
      { title: 'Use Case Mapping', desc: 'Identify the highest-value frontline workflows where wearable AI reduces friction.' },
      { title: 'Knowledge Base Integration', desc: 'Connect to your internal documentation, ERP, or field service platform via secure API.' },
      { title: 'Computer Vision Pipeline', desc: 'Visual recognition trained to identify equipment, labels, products, or defects from the glasses camera.' },
      { title: 'Voice AI Layer', desc: 'Natural language Q&A so engineers can ask questions without touching a screen.' },
      { title: 'Real-time Action Logging', desc: 'Every scan, query, and action logged automatically into your work order or CRM system.' },
      { title: 'Fleet Deployment', desc: 'Device management, content updates, and monitoring infrastructure for your glasses fleet.' },
    ],
    stack: ['Meta Ray-Ban SDK', 'GPT-4o Vision', 'LangChain', 'FastAPI', 'AWS / Azure Private Endpoint'],
    metrics: [{ value: 'Hands-free', label: 'Field AI — no screen needed' }, { value: 'Real-time', label: 'Work order logging and fault ID' }, { value: 'Private', label: 'Deployed within your security boundary' }],
    useCases: ['Field Equipment Inspection', 'Retail Staff Assistance', 'Logistics & Warehouse', 'Quality Control Walkthroughs', 'Remote Expert Support'],
  },
  {
    slug: 'immersive-environments',
    title: 'Immersive Simulation Environments',
    tagline: 'Private 3D virtual workspaces where Digital Human Agents train and support at scale.',
    description: 'Building secure virtual environments with AI Digital Human Agents for training and support.',
    longDescription:
      'We build private, photorealistic 3D simulation spaces where AI Digital Human Agents operate as interactive training instructors, onboarding guides, or customer support staff. These environments enable highly immersive corporate training, product demonstrations, and virtual customer experiences — without the travel costs, scheduling constraints, or geographic limitations of in-person programmes.',
    category: 'Spatial Intelligence & Operations',
    image: '/svc_immersive.png',
    steps: [
      { title: 'Environment Design', desc: 'Photorealistic 3D environment designed to match your brand and use case.' },
      { title: 'Digital Human Integration', desc: 'Conversational AI avatars trained on your specific content and brand voice.' },
      { title: 'Scenario Scripting', desc: 'Interactive training scenarios and branching narratives authored and tested.' },
      { title: 'Multi-user Support', desc: 'Simultaneous multi-participant sessions with shared virtual spaces.' },
      { title: 'Analytics Integration', desc: 'Learner engagement, completion, and knowledge retention tracked per participant.' },
    ],
    stack: ['Unreal Engine 5', 'MetaHuman', 'GPT-4o', 'Azure Spatial Anchors', 'WebXR'],
    metrics: [{ value: 'Reduced', label: 'Per-head training cost vs in-person' }, { value: 'Improved', label: 'Knowledge retention vs classroom' }, { value: 'Scalable', label: 'Concurrent user architecture' }],
    useCases: ['Corporate Onboarding', 'Product Demonstration', 'Safety Training', 'Customer Virtual Showrooms', 'Remote Collaboration'],
  },
  {
    slug: 'ai-route-planning',
    title: 'AI Route & Logistics Optimisation',
    tagline: 'Dynamic routing AI that reduces fleet costs and delivery times simultaneously.',
    description: 'We build AI-powered logistics optimisation systems that can reduce fleet operating costs by 15–30% while improving delivery reliability — results vary based on existing route efficiency, fleet size, and data quality. Our systems ingest real-time traffic data, weather, vehicle constraints, and customer time windows to dynamically compute and update optimal routes throughout the day.',
    longDescription: 'Our AI logistics systems solve the Vehicle Routing Problem (VRP) at enterprise scale — combining constraint-based OR solvers with live data feeds to compute optimal routes continuously throughout the day. We model your full operational network: depot locations, vehicle capacities, driver schedules, customer time windows, and SLA constraints. The system integrates with traffic APIs, weather services, and vehicle telemetry to adapt routes in real time as conditions change. All routing decisions are explainable and auditable — operators can inspect, override, and approve suggestions before they reach drivers.',
    category: 'Spatial Intelligence & Operations',
    image: '/svc_travel.png',
    steps: [
      { title: 'Network Modelling', desc: 'Model your fleet, depots, customer locations, and service constraints.' },
      { title: 'Solver Selection', desc: 'OR-Tools, Google Fleet Routing, or custom ML solver based on problem scale.' },
      { title: 'Real-time Data Integration', desc: 'Connect traffic APIs, weather feeds, and IoT vehicle telemetry.' },
      { title: 'Dynamic Re-routing', desc: 'Continuous re-optimisation as conditions change throughout the day.' },
      { title: 'Driver App Integration', desc: 'Optimised routes pushed to driver mobile apps with turn-by-turn navigation.' },
    ],
    stack: ['Google OR-Tools', 'Python', 'HERE Maps API', 'Kafka', 'React Native'],
    metrics: [{ value: '~22%', label: 'Est. cost reduction (industry benchmark)' }, { value: '~18%', label: 'Est. faster delivery (industry benchmark)' }, { value: 'Real-time', label: 'Route updates' }],
    useCases: ['Last-Mile Delivery', 'Field Service Scheduling', 'Supply Chain Optimisation', 'Waste Collection Routing', 'Emergency Response'],
  },

  // ── Domain-Specific Solutions ─────────────────────────────────────────────
  {
    slug: 'financial-intelligence',
    title: 'Financial Intelligence & Revenue Auditing',
    tagline: 'AI that reads your MSAs, invoices, and transactions to instantly surface revenue leakage.',
    description: 'Ingesting transaction structures, MSAs, and invoices to track and flag revenue leakages.',
    longDescription:
      'Our financial intelligence systems connect to your transaction database, master service agreements, and invoice records to build a real-time map of your revenue flows. The AI cross-references contracted terms against actual invoicing to surface discrepancies, missed escalators, and billing gaps — delivering a living revenue audit dashboard your finance team can act on daily.',
    category: 'Domain-Specific Solutions',
    image: '/svc_revenue.png',
    steps: [
      { title: 'Data Source Connection', desc: 'Ingests from ERP, billing systems, banking APIs, and document archives.' },
      { title: 'Contract Parsing', desc: 'AI reads MSAs and extracts pricing terms, escalators, and milestone conditions.' },
      { title: 'Transaction Cross-referencing', desc: 'Every invoice matched against contracted terms at line-item level.' },
      { title: 'Anomaly Detection', desc: 'ML models flag under-billing, missed escalators, and duplicate charges.' },
      { title: 'Leakage Dashboard', desc: 'Real-time dashboard showing flagged items, estimated impact, and recovery actions.' },
    ],
    stack: ['GPT-4o Vision', 'Unstructured.io', 'PostgreSQL', 'dbt', 'Power BI / Metabase'],
    metrics: [{ value: 'Material', label: 'Billing discrepancies surfaced' }, { value: '~48h', label: 'Rough time to first insights' }, { value: 'Varies', label: 'Leakage found (project-dependent)' }],
    useCases: ['Revenue Leakage Recovery', 'Billing Accuracy Audits', 'MSA Compliance Monitoring', 'Invoice Reconciliation', 'Finance Team Augmentation'],
  },
  {
    slug: 'predictive-analytics',
    title: 'Predictive Analytics & Forecasting',
    tagline: 'Forward-looking intelligence from your historical data patterns.',
    description: 'ML models that forecast demand, churn, revenue, and operational KPIs from your proprietary data.',
    longDescription:
      'We build and deploy custom predictive models trained exclusively on your historical data. Unlike off-the-shelf analytics tools, our models understand your specific business dynamics — seasonality, product mix, customer segments — and deliver forecasts with confidence intervals your leadership team can act on.',
    category: 'Domain-Specific Solutions',
    image: '/svc_predictive.png',
    steps: [
      { title: 'Data Audit', desc: 'Assess data quality, completeness, and historical depth across all source systems.' },
      { title: 'Feature Engineering', desc: 'Domain experts and data scientists collaboratively define predictive features.' },
      { title: 'Model Training', desc: 'Ensemble models (XGBoost, LightGBM, Temporal Fusion Transformers) trained on your data.' },
      { title: 'Validation', desc: 'Walk-forward validation on holdout periods with business-meaningful error metrics.' },
      { title: 'Production Deployment', desc: 'Models served via API integrated with your BI tools and dashboards.' },
    ],
    stack: ['Python / scikit-learn', 'XGBoost / LightGBM', 'PyTorch Forecasting', 'MLflow', 'Snowflake / BigQuery'],
    metrics: [{ value: 'Validated', label: 'Against holdout periods per engagement' }, { value: '30+ days', label: 'Est. forecast horizon' }, { value: 'Real-time', label: 'Model updates' }],
    useCases: ['Revenue Forecasting', 'Demand Planning', 'Churn Prediction', 'Inventory Optimisation', 'Capacity Planning'],
  },
  {
    slug: 'investor-readiness',
    title: 'Data Structuring & Investor Readiness',
    tagline: 'Transform scattered corporate data into a VC-ready data room in weeks, not months.',
    description: 'Cleaning and structuring unlisted corporate data into investor-ready compliance data rooms.',
    longDescription:
      'We connect to your fragmented data sources — ERP, CRM, finance systems, contract repositories — and build a structured, investor-ready data room that compresses due diligence from months to days. The AI layer automatically validates data consistency, flags missing documentation, and generates standard VC-format reporting packages.',
    category: 'Domain-Specific Solutions',
    image: '/svc_investor.png',
    steps: [
      { title: 'Source System Mapping', desc: 'Catalogue all data sources and assess completeness against VC checklist requirements.' },
      { title: 'Data Extraction', desc: 'Automated ETL pipelines pull data from all connected systems.' },
      { title: 'AI Cleaning & Structuring', desc: 'LLM-powered normalization standardizes terminology, units, and formats.' },
      { title: 'Gap Analysis', desc: 'AI flags missing documents, inconsistencies, and potential diligence red flags.' },
      { title: 'Data Room Assembly', desc: 'Structured data room with investor-standard KPIs, cohort analysis, and documentation.' },
    ],
    stack: ['Python / Pandas', 'dbt', 'Snowflake', 'GPT-4o', 'Notion / Confluence API'],
    metrics: [{ value: 'Weeks', label: 'Typical data room ready time' }, { value: 'High', label: 'Data completeness vs VC checklist' }, { value: '~3×', label: 'Est. faster than manual process' }],
    useCases: ['Series A/B/C Due Diligence', 'M&A Data Preparation', 'Board Reporting', 'Regulatory Submissions', 'Strategic VC Matching'],
  },
  {
    slug: 'hr-talent-ai',
    title: 'HR & Talent AI',
    tagline: 'AI that screens, scores, and surfaces the right candidates — with fairness auditing built in.',
    description: 'Intelligent CV screening, candidate scoring, and HR workflow automation.',
    longDescription:
      'Our HR AI systems integrate with your existing ATS and HR systems to automate CV screening, candidate scoring, and interview scheduling. We build explainable models that surface the most relevant candidates based on your specific hiring criteria — with fairness auditing built in to continuously monitor and mitigate selection bias across demographic groups.',
    category: 'Domain-Specific Solutions',
    image: '/svc_hr.png',
    steps: [
      { title: 'Job Description Parsing', desc: 'AI extracts explicit and implicit requirements from your JDs.' },
      { title: 'CV Ingestion', desc: 'Structured extraction from CVs in any format across 40+ languages.' },
      { title: 'Scoring Model', desc: 'Customised scoring weights aligned with your specific hiring criteria.' },
      { title: 'Bias Auditing', desc: 'Fairness metrics monitored across demographic attributes to prevent unlawful discrimination.' },
      { title: 'ATS Integration', desc: 'Ranked shortlist surfaced directly inside your existing ATS workflow.' },
    ],
    stack: ['Python', 'GPT-4o', 'Fairlearn', 'Workday / Greenhouse API', 'PostgreSQL'],
    metrics: [{ value: '~70%', label: 'Est. screening time saved' }, { value: 'Full', label: 'Decision audit trail provided' }, { value: 'Continuous', label: 'Bias monitoring' }],
    useCases: ['High-Volume Hiring', 'Technical Screening', 'Campus Recruitment', 'Executive Search', 'Internal Mobility'],
  },
  {
    slug: 'ai-language-training',
    title: 'AI Language & Communication Training',
    tagline: 'Personalised AI tutors for enterprise language learning programmes.',
    description: 'Custom AI tutors for corporate language training — German, English, and 40+ languages.',
    longDescription:
      'We build bespoke AI language tutors for enterprise clients with multilingual workforce requirements. Each tutor adapts to the learner\'s proficiency level, industry vocabulary, and preferred learning style — delivering measurably better outcomes than traditional classroom programmes at a fraction of the cost.',
    category: 'Domain-Specific Solutions',
    image: '/svc_german.png',
    steps: [
      { title: 'Curriculum Mapping', desc: 'Align programme to business-specific communication requirements and CEFR targets.' },
      { title: 'Tutor Configuration', desc: 'AI tutor trained on industry vocabulary, common scenarios, and error patterns.' },
      { title: 'Adaptive Practice', desc: 'Spaced repetition and adaptive difficulty calibrated per learner.' },
      { title: 'Speaking Practice', desc: 'Real-time speech recognition and pronunciation coaching.' },
      { title: 'Progress Reporting', desc: 'Manager dashboards showing cohort progress, CEFR level changes, and engagement.' },
    ],
    stack: ['GPT-4o', 'Whisper ASR', 'Azure TTS', 'React Native', 'PostgreSQL'],
    metrics: [{ value: '~2×', label: 'Est. faster proficiency gain' }, { value: 'CEFR', label: 'Progress tracked per learner' }, { value: '40+', label: 'Languages' }],
    useCases: ['German Language for Indian IT Companies', 'English for International Teams', 'Technical Communication', 'Customer-Facing Language Training'],
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
