import {
  Boxes,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Globe,
  LayoutGrid,
  LineChart,
  Lock,
  Network,
  Radar,
  Settings2,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  signature?: boolean;
  overview: string;
  capabilities: string[];
  facts: { timeline: string; industries: string; team: string; stack: string };
};

const base = {
  overview:
    "We embed multidisciplinary engineering teams alongside your own, mapping the current estate before a single line of code is written. Delivery runs in eight-week increments with measurable service-level outcomes at every checkpoint.",
  capabilities: [
    "Current-state assessment and dependency mapping",
    "Target architecture and migration sequencing",
    "Incremental delivery with production guardrails",
    "Runbooks, observability and team enablement",
  ],
};

export const services: Service[] = [
  {
    slug: "cloud-modernization",
    name: "Cloud Modernization",
    tagline: "Move core workloads without pausing the business",
    description:
      "Replatform legacy estates onto resilient cloud foundations with zero-downtime cutover planning.",
    icon: Cloud,
    signature: true,
    ...base,
    facts: {
      timeline: "16–32 weeks",
      industries: "Banking, Insurance, Logistics",
      team: "8–14 engineers",
      stack: "AWS, Azure, Terraform, Kubernetes",
    },
  },
  {
    slug: "data-platform-engineering",
    name: "Data Platform Engineering",
    tagline: "One governed source of truth across the enterprise",
    description:
      "Lakehouse architectures, streaming pipelines and contracts that make enterprise data dependable.",
    icon: Database,
    signature: true,
    ...base,
    facts: {
      timeline: "12–24 weeks",
      industries: "Retail, Healthcare, Energy",
      team: "6–12 engineers",
      stack: "Snowflake, dbt, Kafka, Airflow",
    },
  },
  {
    slug: "applied-ai-systems",
    name: "Applied AI Systems",
    tagline: "Models that survive contact with production",
    description:
      "Evaluation-first AI delivery — retrieval, agents and inference infrastructure with auditable behaviour.",
    icon: Cpu,
    signature: true,
    ...base,
    facts: {
      timeline: "10–20 weeks",
      industries: "Financial services, Telecom",
      team: "5–9 engineers",
      stack: "Python, vLLM, LangGraph, Postgres",
    },
  },
  {
    slug: "enterprise-security",
    name: "Enterprise Security",
    tagline: "Zero-trust posture, evidenced continuously",
    description:
      "Identity, segmentation and control automation engineered against your regulatory perimeter.",
    icon: ShieldCheck,
    signature: true,
    ...base,
    facts: {
      timeline: "12–28 weeks",
      industries: "Banking, Public sector",
      team: "6–10 engineers",
      stack: "Okta, HashiCorp Vault, Wiz, OPA",
    },
  },
  {
    slug: "platform-reliability",
    name: "Platform Reliability",
    tagline: "Uptime as an engineering discipline",
    description:
      "SRE practice design, error budgets and observability that shorten incidents from hours to minutes.",
    icon: Radar,
    signature: true,
    ...base,
    facts: {
      timeline: "8–18 weeks",
      industries: "Payments, SaaS, Travel",
      team: "4–8 engineers",
      stack: "Datadog, OpenTelemetry, PagerDuty",
    },
  },
  {
    slug: "process-automation",
    name: "Process Automation",
    tagline: "Remove the manual seams between systems",
    description:
      "Workflow orchestration across ERP, CRM and bespoke systems, with humans kept in the right loops.",
    icon: Workflow,
    signature: true,
    ...base,
    facts: {
      timeline: "8–16 weeks",
      industries: "Manufacturing, Insurance",
      team: "4–8 engineers",
      stack: "Temporal, Camunda, SAP, ServiceNow",
    },
  },
  {
    slug: "digital-product-engineering",
    name: "Digital Product Engineering",
    tagline: "Customer-facing products built to enterprise standards",
    description: "Full-lifecycle product teams for regulated, high-traffic digital surfaces.",
    icon: LayoutGrid,
    ...base,
    facts: {
      timeline: "12–36 weeks",
      industries: "Retail, Telecom, Healthcare",
      team: "6–14 engineers",
      stack: "React, TypeScript, Go, Postgres",
    },
  },
  {
    slug: "legacy-decommissioning",
    name: "Legacy Decommissioning",
    tagline: "Retire the systems nobody wants to touch",
    description: "Strangler-pattern migrations that retire mainframe and monolith dependencies safely.",
    icon: GitBranch,
    ...base,
    facts: {
      timeline: "20–40 weeks",
      industries: "Banking, Government",
      team: "8–16 engineers",
      stack: "Java, COBOL bridges, Kafka",
    },
  },
  {
    slug: "integration-architecture",
    name: "Integration Architecture",
    tagline: "APIs and events that hold under load",
    description: "Event backbones, API governance and contract testing across the estate.",
    icon: Network,
    ...base,
    facts: {
      timeline: "10–22 weeks",
      industries: "Logistics, Insurance",
      team: "5–10 engineers",
      stack: "Kong, Kafka, GraphQL, AsyncAPI",
    },
  },
  {
    slug: "devex-and-delivery",
    name: "DevEx & Delivery",
    tagline: "Shorten the path from commit to production",
    description: "Internal developer platforms, golden paths and pipeline consolidation.",
    icon: Zap,
    ...base,
    facts: {
      timeline: "8–20 weeks",
      industries: "SaaS, Financial services",
      team: "4–9 engineers",
      stack: "Backstage, GitHub Actions, ArgoCD",
    },
  },
  {
    slug: "analytics-and-decisioning",
    name: "Analytics & Decisioning",
    tagline: "Metrics leadership can act on",
    description: "Semantic layers, executive reporting and decision instrumentation.",
    icon: LineChart,
    ...base,
    facts: {
      timeline: "8–16 weeks",
      industries: "Retail, Energy",
      team: "4–8 analysts & engineers",
      stack: "dbt, Looker, DuckDB",
    },
  },
  {
    slug: "identity-and-access",
    name: "Identity & Access",
    tagline: "One identity fabric for staff, partners and customers",
    description: "Consolidated IAM and CIAM programmes with staged migration of legacy directories.",
    icon: Lock,
    ...base,
    facts: {
      timeline: "12–26 weeks",
      industries: "Banking, Healthcare",
      team: "5–9 engineers",
      stack: "Entra ID, Auth0, SCIM, OIDC",
    },
  },
  {
    slug: "edge-and-network",
    name: "Edge & Network",
    tagline: "Global delivery with predictable latency",
    description: "Edge compute, traffic strategy and network modernisation for distributed operations.",
    icon: Globe,
    ...base,
    facts: {
      timeline: "10–20 weeks",
      industries: "Media, Retail, Travel",
      team: "4–8 engineers",
      stack: "Cloudflare, Fastly, Envoy",
    },
  },
  {
    slug: "enterprise-architecture",
    name: "Enterprise Architecture",
    tagline: "A roadmap the board and the engineers both trust",
    description: "Capability modelling, investment sequencing and architecture governance.",
    icon: Boxes,
    ...base,
    facts: {
      timeline: "6–14 weeks",
      industries: "All sectors",
      team: "3–6 architects",
      stack: "ArchiMate, C4, LeanIX",
    },
  },
  {
    slug: "managed-operations",
    name: "Managed Operations",
    tagline: "Sustained ownership after the programme ends",
    description: "Follow-the-sun operation of the platforms we build, with agreed service levels.",
    icon: Settings2,
    ...base,
    facts: {
      timeline: "Rolling 12 months",
      industries: "All sectors",
      team: "6–20 specialists",
      stack: "Terraform, Datadog, ServiceNow",
    },
  },
];

export const signatureServices = services.filter((s) => s.signature);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const caseStudies = [
  {
    slug: "nordic-clearing",
    title: "Clearing house cuts settlement latency by 71%",
    tag: "Capital markets · Platform reliability",
  },
  {
    slug: "atlas-health",
    title: "Unified patient data across 40 hospital systems",
    tag: "Healthcare · Data platform",
  },
  {
    slug: "meridian-freight",
    title: "Freight network automates 2.4M annual exceptions",
    tag: "Logistics · Process automation",
  },
];
