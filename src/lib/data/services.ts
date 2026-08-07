export type RawService = {
  slug: string;
  name: string;
  icon: string;
  oneLiner: string;
  overview: string;
  capabilities: string[];
  timeline: string;
  industriesServed: string[];
  teamSize: string;
  techStack: string[];
  isSignature: boolean;
  relatedCaseStudies: string[];
};

export const services: RawService[] = [
  {
    slug: "enterprise-erp",
    name: "Enterprise ERP Solutions",
    icon: "building-factory-2",
    oneLiner: "A unified core connecting finance, supply chain and workforce data.",
    overview: "Most enterprises run finance, operations, and HR on disconnected systems that don't talk to each other. We design and deploy a single ERP core built around your actual workflows, not a generic template — covering requirements mapping, module configuration, and legacy data migration.",
    capabilities: ["Requirements and process mapping", "Custom module configuration", "Legacy data migration", "Integration with existing tools"],
    timeline: "12–20 weeks",
    industriesServed: ["Manufacturing", "Retail", "Logistics"],
    teamSize: "4–8 engineers",
    techStack: ["SAP", "Odoo", "custom REST APIs", "PostgreSQL"],
    isSignature: true,
    relatedCaseStudies: []
  },
  {
    slug: "custom-website-development",
    name: "Custom Website Development",
    icon: "code",
    oneLiner: "Enterprise-grade web platforms built for scale, not templates.",
    overview: "We build production websites engineered for performance, SEO, and long-term maintainability — not assembled from page builders. Every site is architected around your content model and traffic patterns from day one.",
    capabilities: ["Custom design-to-code implementation", "CMS integration", "Performance and Core Web Vitals optimization", "Ongoing maintainability"],
    timeline: "6–12 weeks",
    industriesServed: ["Retail", "Hospitality", "Education"],
    teamSize: "2–5 engineers",
    techStack: ["Next.js", "React", "Tailwind CSS", "headless CMS"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "web-applications",
    name: "Web Applications",
    icon: "apps",
    oneLiner: "Full-stack applications built for real business workflows.",
    overview: "From internal tools to customer-facing platforms, we build web applications that handle real operational complexity — authentication, permissions, data pipelines — not just static pages.",
    capabilities: ["Full-stack architecture", "Role-based access control", "Real-time data features", "Third-party integrations"],
    timeline: "10–18 weeks",
    industriesServed: ["Finance", "Healthcare", "Logistics"],
    teamSize: "4–7 engineers",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "android-app-development",
    name: "Android App Development",
    icon: "brand-android",
    oneLiner: "Native Android applications engineered for reliability at scale.",
    overview: "We build native Android applications for enterprises that need performance and platform-specific polish, integrated tightly with your existing backend systems.",
    capabilities: ["Native Kotlin development", "Offline-first architecture", "Play Store deployment and compliance", "Backend integration"],
    timeline: "10–16 weeks",
    industriesServed: ["Retail", "Logistics", "Hospitality"],
    teamSize: "2–4 engineers",
    techStack: ["Kotlin", "Jetpack Compose", "Firebase"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "ios-app-development",
    name: "iOS App Development",
    icon: "brand-apple",
    oneLiner: "Native iOS applications built to Apple's platform standards.",
    overview: "We build native iOS applications with the performance and design polish enterprise users expect, from initial App Store submission through long-term version support.",
    capabilities: ["Native Swift development", "App Store submission and compliance", "Push notifications and background sync", "Backend integration"],
    timeline: "10–16 weeks",
    industriesServed: ["Retail", "Hospitality", "Finance"],
    teamSize: "2–4 engineers",
    techStack: ["Swift", "SwiftUI", "Firebase"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "cross-platform-apps",
    name: "Cross-Platform Apps",
    icon: "devices",
    oneLiner: "One codebase, native performance on both iOS and Android.",
    overview: "For teams that need to ship to both platforms without doubling engineering cost, we build cross-platform applications that don't compromise on performance or platform-native feel.",
    capabilities: ["Shared codebase architecture", "Platform-specific UI adaptation", "CI/CD for dual-platform releases", "Backend integration"],
    timeline: "10–18 weeks",
    industriesServed: ["Retail", "Education", "Logistics"],
    teamSize: "3–5 engineers",
    techStack: ["React Native", "Expo", "Firebase"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: "speakerphone",
    oneLiner: "Data-driven content and campaign strategy across platforms.",
    overview: "We build and execute social strategy grounded in measurable outcomes — audience growth, engagement, and pipeline contribution — not vanity metrics.",
    capabilities: ["Content strategy and calendar management", "Paid campaign management", "Analytics and reporting", "Platform-specific creative"],
    timeline: "Ongoing, monthly retainer",
    industriesServed: ["Retail", "Hospitality", "Education"],
    teamSize: "2–3 specialists",
    techStack: ["Meta Business Suite", "Hootsuite", "Google Analytics"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "seo",
    name: "Search Engine Optimization (SEO)",
    icon: "search",
    oneLiner: "Technical and content SEO built for sustainable organic growth.",
    overview: "We combine technical site audits, content strategy, and structured data implementation to improve organic visibility in ways that compound over time rather than chase short-term ranking tricks.",
    capabilities: ["Technical SEO audits", "Structured data and schema markup", "Content strategy", "Ongoing performance tracking"],
    timeline: "Ongoing, 3-month minimum engagement",
    industriesServed: ["Retail", "Finance", "Education"],
    teamSize: "1–3 specialists",
    techStack: ["Google Search Console", "Ahrefs", "Screaming Frog"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "database-architecture",
    name: "Database Architecture & Management",
    icon: "database",
    oneLiner: "Data infrastructure engineered for integrity and scale.",
    overview: "We design database architectures that hold up under real production load — proper indexing, replication strategy, and disaster recovery — plus ongoing management for enterprises that need reliable data operations.",
    capabilities: ["Schema design and normalization", "Query performance optimization", "Backup and disaster recovery planning", "Migration from legacy systems"],
    timeline: "8–14 weeks initial, ongoing management available",
    industriesServed: ["Finance", "Healthcare", "Manufacturing"],
    teamSize: "2–4 engineers",
    techStack: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
    isSignature: true,
    relatedCaseStudies: []
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud Infrastructure & DevOps",
    icon: "cloud",
    oneLiner: "Resilient, self-healing infrastructure engineered for enterprise scale.",
    overview: "We design and manage cloud infrastructure built for reliability — automated deployments, monitoring, and incident response — so your systems stay up under real-world load, not just in testing.",
    capabilities: ["Infrastructure as code", "CI/CD pipeline design", "Monitoring and alerting", "Cost optimization"],
    timeline: "8–16 weeks initial setup, ongoing management available",
    industriesServed: ["Finance", "Healthcare", "Manufacturing", "Retail"],
    teamSize: "3–6 engineers",
    techStack: ["AWS", "Terraform", "Kubernetes", "Docker", "Datadog"],
    isSignature: true,
    relatedCaseStudies: []
  },
  {
    slug: "api-development",
    name: "API Development & System Integration",
    icon: "plug",
    oneLiner: "Clean, documented APIs that connect your systems reliably.",
    overview: "We design and build APIs that make your systems talk to each other correctly — proper versioning, authentication, and documentation — plus integration work connecting third-party platforms into your stack.",
    capabilities: ["REST and GraphQL API design", "Third-party platform integration", "API documentation and versioning", "Rate limiting and security"],
    timeline: "6–12 weeks",
    industriesServed: ["Finance", "Retail", "Logistics"],
    teamSize: "2–4 engineers",
    techStack: ["Node.js", "GraphQL", "REST", "OpenAPI"],
    isSignature: false,
    relatedCaseStudies: []
  },
  {
    slug: "ai-automation",
    name: "AI Automation & Intelligent Workflows",
    icon: "brain",
    oneLiner: "Intelligent workflows that reduce manual effort at scale.",
    overview: "We identify where manual processes are costing your team time and replace them with AI-driven automation — document processing, intelligent routing, and workflow orchestration built around your actual operations.",
    capabilities: ["Process automation design", "LLM-powered workflow tools", "Document and data extraction", "Integration with existing business systems"],
    timeline: "8–14 weeks",
    industriesServed: ["Finance", "Healthcare", "Logistics"],
    teamSize: "3–5 engineers",
    techStack: ["Claude API", "Python", "LangChain", "n8n"],
    isSignature: true,
    relatedCaseStudies: []
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design & Product Strategy",
    icon: "layout",
    oneLiner: "Product design grounded in research, not just visual polish.",
    overview: "We design digital products starting from user research and business goals, not aesthetics alone — producing interfaces that are both distinctive and genuinely usable at enterprise scale.",
    capabilities: ["User research and testing", "Product strategy and information architecture", "UI design systems", "Prototyping and validation"],
    timeline: "6–10 weeks",
    industriesServed: ["Retail", "Finance", "Education"],
    teamSize: "2–4 designers",
    techStack: ["Figma", "Framer", "design tokens/systems"],
    isSignature: true,
    relatedCaseStudies: []
  },
  {
    slug: "cybersecurity-consulting",
    name: "Cybersecurity Consulting",
    icon: "shield-lock",
    oneLiner: "Enterprise-grade protection built into every layer of delivery.",
    overview: "We assess and harden systems against real threats — vulnerability audits, compliance alignment, and security built into the development process itself, not bolted on afterward.",
    capabilities: ["Security audits and penetration testing", "Compliance alignment (SOC 2, HIPAA, GDPR)", "Secure architecture review", "Incident response planning"],
    timeline: "6–12 weeks initial audit, ongoing available",
    industriesServed: ["Finance", "Healthcare", "Government"],
    teamSize: "2–4 specialists",
    techStack: ["OWASP tooling", "Snyk", "HashiCorp Vault"],
    isSignature: true,
    relatedCaseStudies: []
  },
  {
    slug: "it-consulting",
    name: "IT Consulting & Digital Transformation",
    icon: "presentation",
    oneLiner: "Strategic technical guidance for organizations navigating change.",
    overview: "We work with leadership teams to map technology strategy against real business goals — system modernization roadmaps, vendor evaluation, and organizational readiness for large-scale digital change.",
    capabilities: ["Technology roadmap and strategy", "Legacy system modernization planning", "Vendor and tooling evaluation", "Change management support"],
    timeline: "4–8 weeks strategy engagement",
    industriesServed: ["Manufacturing", "Government", "Finance"],
    teamSize: "1–3 consultants",
    techStack: [],
    isSignature: false,
    relatedCaseStudies: []
  }
];
