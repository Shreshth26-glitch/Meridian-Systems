import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Hero } from "@/components/site/hero";
import { SignatureSolutions } from "@/components/site/signature-solutions";
import { CardArt } from "@/components/site/card-art";
import { caseStudies } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Systems — Enterprise Digital Transformation Engineering" },
      {
        name: "description",
        content:
          "Meridian Systems modernises enterprise cloud, data and AI platforms with embedded engineering teams and measurable service outcomes.",
      },
      { property: "og:title", content: "Meridian Systems — Enterprise Transformation Engineering" },
      {
        property: "og:description",
        content:
          "Cloud, data and applied AI modernisation for large organisations, delivered by embedded engineering teams.",
      },
    ],
  }),
  component: Index,
});

// Process steps data
const processSteps = [
  { step: "01", name: "Discover", desc: "Map the system constraint and establish clear service level objectives." },
  { step: "02", name: "Research", desc: "Deploy telemetry and conduct empirical dependencies assessments." },
  { step: "03", name: "Architecture", desc: "Design target state blueprint and risk-managed migration sequences." },
  { step: "04", name: "Development", desc: "Embed engineering squads to build core codebase integration paths." },
  { step: "05", name: "Testing", desc: "Execute automated contract, load, and performance verification." },
  { step: "06", name: "Deployment", desc: "Execute zero-downtime strangler cuts with phased canary rollouts." },
  { step: "07", name: "Growth", desc: "Provide follow-the-sun managed platform operations and optimization." }
];

// Comparisons data
const comparisons = [
  {
    point: "System Architecture",
    traditional: "Relies on generic templates, boilerplates, and locked-in vendor software.",
    meridian: "Custom-engineered architectures tailored specifically to your constraint."
  },
  {
    point: "Team Seniority",
    traditional: "Junior-heavy pyramid staffing structures requiring high management overhead.",
    meridian: "Led by practicing principal engineers embedded directly in your squads."
  },
  {
    point: "Delivery Cadence",
    traditional: "Long, opaque development cycles culminating in high-risk, big-bang integrations.",
    meridian: "8-week incremental release sprints backed by strict production validation."
  },
  {
    point: "Observability",
    traditional: "Black-box operations, waiting for client reports or outages to trigger fixes.",
    meridian: "Telemetry-first instrumentation from day one with absolute performance visibility."
  },
  {
    point: "Code Handover",
    traditional: "Undocumented systems resulting in vendor dependency and architectural decay.",
    meridian: "Complete runbooks, operational training, and seamless system handovers."
  }
];

// Industries data
const industries = [
  { name: "Healthcare", desc: "Secure clinical data platform routing and EMR system consolidation." },
  { name: "Finance", desc: "High-throughput settlement engines and strangler integrations." },
  { name: "Manufacturing", desc: "Orchestrated supply-chain logistics and ERP event workflows." },
  { name: "Retail", desc: "High-concurrency transactional storefronts and unified pipelines." },
  { name: "Education", desc: "Reliable distributed identity systems and unified portals." },
  { name: "Government", desc: "Regulated infrastructure modernization and secure edge compute." },
  { name: "Logistics", desc: "Automated exception routing and real-time package tracking." },
  { name: "Hospitality", desc: "High-traffic reservation systems and partner integrations." }
];

// Testimonials data
const testimonials = [
  {
    quote: "Meridian did not arrive with slide decks. They embedded five senior engineers in our clearing team, mapped our database locks, and moved settlement onto Kafka. Our latency targets were met four weeks ahead of schedule.",
    author: "Elena Rostova",
    role: "VP Platform Engineering",
    company: "Nordic Clearing House",
    initials: "ER"
  },
  {
    quote: "Most agencies stack their squads with juniors and require constant oversight. Meridian's principal engineers integrated directly, established clear service level agreements, and automated 2.4 million manual loops cleanly.",
    author: "Marcus Vance",
    role: "Director of Operations",
    company: "Meridian Freight",
    initials: "MV"
  },
  {
    quote: "Consolidating clinical histories across 40 disparate hospital EMR estates seemed insurmountable. Meridian mapped data contracts, built real-time streams, and now we sync patient data instantly under security audits.",
    author: "Dr. Sarah Chen",
    role: "Chief Medical Information Officer",
    company: "Atlas Healthcare",
    initials: "SC"
  }
];

function Index() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Background gradient offsets for industries
  const glowCoords = [
    { cx1: "20%", cy1: "30%", cx2: "80%", cy2: "70%" },
    { cx1: "70%", cy1: "20%", cx2: "30%", cy2: "80%" },
    { cx1: "40%", cy1: "60%", cx2: "60%", cy2: "40%" },
    { cx1: "15%", cy1: "80%", cx2: "85%", cy2: "20%" },
    { cx1: "50%", cy1: "15%", cx2: "50%", cy2: "85%" },
    { cx1: "80%", cy1: "30%", cx2: "20%", cy2: "70%" },
    { cx1: "30%", cy1: "20%", cx2: "70%", cy2: "80%" },
    { cx1: "60%", cy1: "40%", cx2: "40%", cy2: "60%" }
  ];

  const currentCoords = (hoveredIndustry !== null && glowCoords[hoveredIndustry]) || { cx1: "50%", cy1: "50%", cx2: "50%", cy2: "50%" };

  return (
    <>
      <Hero />
      <SignatureSolutions />

      {/* Process Section (Roadmap) */}
      <section className="shell py-24 border-t border-border">
        <div className="max-w-2xl">
          <p className="eyebrow">Methodology</p>
          <h2 className="mt-5">Our engineering roadmaps</h2>
          <p className="mt-4 text-[16px]" style={{ color: "var(--text-secondary)" }}>
            Hover or tap each phase of our 7-step roadmap to explore our execution process.
          </p>
        </div>

        {/* Roadmap Roadmap Nodes */}
        <div className="mt-16 relative">
          {/* Connection Line */}
          <div className="absolute top-[14px] left-0 right-0 h-[1.5px] bg-border hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-4 relative z-10">
            {processSteps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={s.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="flex md:flex-col gap-4 md:gap-0 group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-7 w-7 rounded-full border-2 bg-background flex items-center justify-center transition-all duration-300 ${
                        isActive ? "border-sky scale-110" : "border-border group-hover:border-sky/50"
                      }`}
                    >
                      <div
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          isActive ? "bg-sky" : "bg-transparent group-hover:bg-sky/30"
                        }`}
                      />
                    </div>
                    {/* Mobile connection line */}
                    <div className="w-[1.5px] bg-border flex-1 md:hidden mt-2 min-h-[35px]" />
                  </div>
                  
                  <div className="md:mt-5">
                    <span className="text-[12.5px] font-semibold text-sky uppercase">{s.step}</span>
                    <h3 className={`text-[16px] font-semibold mt-1 transition-colors ${isActive ? "text-foreground" : "text-secondary-foreground"}`}>
                      {s.name}
                    </h3>
                    <p className={`mt-2 text-[13.5px] transition-opacity duration-300 md:line-clamp-3 ${isActive ? "opacity-100" : "opacity-60 md:opacity-0 group-hover:opacity-60"}`} style={{ color: "var(--text-secondary)" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="shell py-24 border-t border-border">
        <div className="max-w-2xl">
          <p className="eyebrow">Comparison</p>
          <h2 className="mt-5">Why clients choose our engineering process</h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface/30">
                <th className="p-5 font-semibold text-[14px] w-[20%]">Point of Focus</th>
                <th className="p-5 font-semibold text-[14px] w-[40%] text-secondary-foreground">Traditional Agencies</th>
                <th className="p-5 font-semibold text-[14px] w-[40%] text-foreground flex items-center gap-1.5">
                  <Sparkles size={14} className="text-sky" />
                  Our Process
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c, i) => (
                <tr
                  key={c.point}
                  className="border-b border-border last:border-none transition-colors hover:bg-surface/10 group"
                >
                  <td className="p-5 font-semibold text-[14.5px] align-top">{c.point}</td>
                  <td className="p-5 text-[14px] align-top" style={{ color: "var(--text-secondary)" }}>{c.traditional}</td>
                  <td className="p-5 text-[14px] align-top font-medium" style={{ color: "var(--text-secondary)" }}>
                    <span className="text-sky font-semibold block sm:inline-block sm:mr-1 transition-transform group-hover:translate-x-0.5">✔</span>
                    {c.meridian}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative overflow-hidden py-24 border-t border-border">
        {/* Shifting radial glow background illustration */}
        <svg className="absolute inset-0 w-full h-full -z-10 transition-all duration-[600ms] pointer-events-none" aria-hidden="true">
          <defs>
            <radialGradient id="ind-glow-a" cx={currentCoords.cx1} cy={currentCoords.cy1} r="40%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ind-glow-b" cx={currentCoords.cx2} cy={currentCoords.cy2} r="40%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="var(--background)" />
          <rect width="100%" height="100%" fill="url(#ind-glow-a)" />
          <rect width="100%" height="100%" fill="url(#ind-glow-b)" />
        </svg>

        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Expertise</p>
            <h2 className="mt-5">Industries we serve</h2>
            <p className="mt-4 text-[16px]" style={{ color: "var(--text-secondary)" }}>
              Hover over an industry card to interactively shift the background alignment grid.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, idx) => (
              <div
                key={ind.name}
                onMouseEnter={() => setHoveredIndustry(idx)}
                onMouseLeave={() => setHoveredIndustry(null)}
                className="group p-6 rounded-xl border border-border bg-background/50 hover:bg-background/90 hover:border-sky/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <h3 className="text-[17px] font-semibold">{ind.name}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {ind.desc}
                  </p>
                </div>
                <span className="mt-4 text-[12.5px] font-semibold text-sky uppercase tracking-[1.1px] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Work Grid (Homepage) */}
      <section className="shell py-24 border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] items-center">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-5">Programmes measured in outcomes, not deliverables</h2>
            <Link to="/work" className="btn-base btn-secondary with-arrow mt-7">
              View all work
              <ArrowRight size={13} className="btn-arrow" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {caseStudies.map((study, i) => (
              <Link
                key={study.slug}
                to="/work/$slug"
                params={{ slug: study.slug }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-sky/35"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CardArt variant={i + 3} className="h-full w-full" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <CardArt variant={i + 3} intense className="h-full w-full" />
                  </div>
                </div>
                <div className="border-t border-border p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11.5px] font-semibold uppercase tracking-[1px]" style={{ color: "var(--text-muted)" }}>
                      {study.industry}
                    </span>
                    <h3 className="mt-2 text-[15px] font-semibold leading-snug group-hover:text-sky transition-colors">{study.client}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Magazine Section */}
      <section className="shell py-24 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow">Endorsements</p>
          <h2 className="mt-5">What our clients say</h2>
        </div>

        {/* Carousel Quotes */}
        <div className="mt-14 max-w-4xl mx-auto relative rounded-xl border border-border p-8 md:p-12 bg-surface/20">
          <div className="min-h-[160px]">
            <p className="text-[20px] md:text-[22px] font-display italic leading-relaxed text-foreground">
              “{testimonials[activeTestimonial]?.quote}”
            </p>
          </div>
          
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Illustrated initials avatar instead of photo */}
              <div className="h-11 w-11 rounded-full border border-sky/35 bg-sky/5 font-display text-sky flex items-center justify-center font-bold text-[14px]">
                {testimonials[activeTestimonial]?.initials}
              </div>
              <div className="text-left">
                <p className="text-[15px] font-semibold">{testimonials[activeTestimonial]?.author}</p>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  {testimonials[activeTestimonial]?.role}, <span className="font-semibold text-foreground">{testimonials[activeTestimonial]?.company}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                aria-label="Previous quote"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-sky/50 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                aria-label="Next quote"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-sky/50 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Brand/Company Wordmark logos row below */}
        <div className="mt-12 border-t border-border pt-10">
          <p className="text-[11.5px] font-semibold text-center uppercase tracking-[1.5px]" style={{ color: "var(--text-muted)" }}>
            Engineered systems running in production at
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            {["Nordic Clearing Group", "Atlas Healthcare", "Meridian Freight Ltd", "Svea Bank", "Vind Group"].map((l) => (
              <span key={l} className="font-display font-bold tracking-tight text-[15px] whitespace-nowrap">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="shell pb-12">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-border p-10">
          <div className="max-w-xl">
            <h2>Start with a scoping conversation</h2>
            <p className="mt-3 text-[16px]" style={{ color: "var(--text-secondary)" }}>
              Ninety minutes with two principal engineers. You leave with a written assessment of
              the highest-leverage move, whether or not you work with us.
            </p>
          </div>
          <Link to="/contact" className="btn-base btn-primary with-arrow">
            Book a consultation
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
