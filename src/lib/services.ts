import {
  Building2,
  Code,
  AppWindow,
  Smartphone,
  Apple,
  Megaphone,
  Search,
  Database,
  Cloud,
  Plug,
  Brain,
  Layout,
  Shield,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { services as rawServices, type RawService } from "./data/services";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  signature: boolean;
  overview: string;
  capabilities: string[];
  facts: { timeline: string; industries: string; team: string; stack: string };
  relatedCaseStudies: string[];
};

export const iconMap: Record<string, LucideIcon> = {
  "building-factory-2": Building2,
  code: Code,
  apps: AppWindow,
  "brand-android": Smartphone,
  "brand-apple": Apple,
  devices: Smartphone,
  speakerphone: Megaphone,
  search: Search,
  database: Database,
  cloud: Cloud,
  plug: Plug,
  brain: Brain,
  layout: Layout,
  "shield-lock": Shield,
  presentation: Presentation,
};

export const services: Service[] = rawServices.map((s) => ({
  slug: s.slug,
  name: s.name,
  tagline: s.oneLiner,
  description: s.oneLiner,
  icon: iconMap[s.icon] || Presentation,
  signature: s.isSignature,
  overview: s.overview,
  capabilities: s.capabilities,
  facts: {
    timeline: s.timeline,
    industries: s.industriesServed.join(", "),
    team: s.teamSize,
    stack: s.techStack.length > 0 ? s.techStack.join(", ") : "N/A",
  },
  relatedCaseStudies: s.relatedCaseStudies,
}));

export const signatureServices = services.filter((s) => s.signature);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export type CaseStudy = {
  slug: string;
  title: string;
  tag: string;
  client: string;
  summary: string;
  timeline: string;
  stack: string;
  impact: string;
  roi: string;
  narrative: string;
  industry: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nordic-clearing",
    title: "Clearing house cuts settlement latency by 71%",
    tag: "Capital markets · Platform reliability",
    client: "Nordic Clearing House",
    summary:
      "Modernizing a high-throughput transaction clearing estate for regional stock exchanges.",
    timeline: "24 weeks",
    stack: "Go, Apache Kafka, Kubernetes, Datadog",
    impact:
      "Settlement processing delays reduced from 80ms to 23ms under peak transaction volumes.",
    roi: "-71% Latency",
    narrative:
      "We embedded a team of SRE and backend engineers to map the clearing transaction paths. By decoupling database writes from the hot path using Kafka message streams and rewriting core processing segments in Go, we removed the serialization bottleneck without interrupting the live markets.",
    industry: "Finance",
  },
  {
    slug: "atlas-health",
    title: "Unified patient data across 40 hospital systems",
    tag: "Healthcare · Data platform",
    client: "Atlas Healthcare",
    summary: "Consolidating clinical histories into a single governed Lakehouse architecture.",
    timeline: "32 weeks",
    stack: "Snowflake, dbt, Apache Kafka, Apache Airflow",
    impact:
      "Synchronized clinical histories updated in near real-time, down from a 48-hour batch cycle.",
    roi: "Real-time sync",
    narrative:
      "Our team established clinical data contracts across Atlas's heterogeneous EMR systems. We built streaming ingestion pipelines that feeding a secure, HIPAA-compliant Snowflake data platform, governed by dbt tests. Hospital staff now access unified patient profiles in seconds.",
    industry: "Healthcare",
  },
  {
    slug: "meridian-freight",
    title: "Freight network automates 2.4M annual exceptions",
    tag: "Logistics · Process automation",
    client: "Meridian Freight",
    summary: "Orchestrating exception-handling across global supply-chain ERP systems.",
    timeline: "16 weeks",
    stack: "Temporal, camunda, SAP, ServiceNow",
    impact:
      "Automated routing and resolve loops for 2.4M exceptions annually, saving 42,000 labor hours.",
    roi: "2.4M loops automated",
    narrative:
      "We designed dynamic event workflows using Temporal to bridge the gap between legacy tracking systems and ERP interfaces. The system isolates exception cases, evaluates them against business logic rules, and automatically triggers routing and notification loops with human-in-the-loop fallback dashboards.",
    industry: "Logistics",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
