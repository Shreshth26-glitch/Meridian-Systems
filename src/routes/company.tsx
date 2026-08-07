import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";


export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — Meridian Systems" },
      {
        name: "description",
        content:
          "Meridian Systems is an enterprise engineering firm of 340 architects and engineers working across nine countries.",
      },
      { property: "og:title", content: "Company — Meridian Systems" },
      {
        property: "og:description",
        content: "How Meridian Systems is structured, staffed and governed.",
      },
    ],
  }),
  component: Company,
});

const milestones = [
  { year: "2008", title: "Founding", copy: "Stockholm founding. Focused on core cloud infrastructure and reliability." },
  { year: "2012", title: "Settlement Latency", copy: "Pioneered strangler-pattern migrations for Nordic clearing estates." },
  { year: "2017", title: "Enterprise Growth", copy: "London & NY offices opened. Scaled to serve tier-1 global institutions." },
  { year: "2022", title: "AI Practice", copy: "Established evaluation-first applied AI systems engineering practice." },
  { year: "Present", title: "Unified Modernization", copy: "Serving 9 countries with 340 practitioners modernizing core software." }
];

const principles = [
  ["Engineers decide", "Every engagement is led by a practising principal engineer, not an account manager."],
  ["Evidence over opinion", "We instrument before we recommend. Assessments arrive with measurements attached."],
  ["Leave it owned", "Runbooks, enablement and handover are scoped from week one, not bolted on at the end."],
  ["Small senior teams", "Median team size is eight. We do not staff pyramids."],
];

const techStack = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "TailwindCSS"] },
  { category: "Backend", items: ["Go", "Node.js", "Python", "Java"] },
  { category: "Cloud", items: ["AWS", "Azure", "GCP", "Cloudflare"] },
  { category: "AI", items: ["PyTorch", "vLLM", "LangGraph", "OpenAI"] },
  { category: "DevOps", items: ["Docker", "Kubernetes", "Terraform", "ArgoCD"] },
  { category: "Database", items: ["Postgres", "Snowflake", "Kafka", "Redis"] }
];

function Company() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Timeline drawing progress observer
  const [timelineVisible, setTimelineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !timelineRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimelineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="shell py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Company</p>
        <h1 className="mt-6">An engineering firm, structured like one</h1>
        <p className="mt-5 text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
          Founded in 2008, Meridian Systems now runs modernisation programmes for regulated
          enterprises across nine countries with 340 engineers and architects.
        </p>
      </div>


      {/* Timeline Section */}
      <section className="mt-20 border-t border-border pt-16 scroll-reveal">
        <div className="max-w-2xl">
          <p className="eyebrow">Milestones</p>
          <h2 className="mt-5">Our evolutionary timeline</h2>
        </div>
        
        <div ref={timelineRef} className="relative md:grid md:grid-cols-5 md:gap-8 gap-y-12 flex flex-col mt-16">
          {/* Horizontal line for desktop draws in on reveal */}
          <div className={`absolute top-[14px] left-0 right-0 h-[1.5px] bg-sky hidden md:block timeline-grow-horizontal ${timelineVisible ? "visible" : ""}`} />
          
          {milestones.map((m, idx) => (
            <Reveal
              key={m.year}
              delay={idx * 100}
              className="relative z-10 flex md:flex-col gap-5 md:gap-0"
            >
              {/* Node indicator */}
              <div className="flex flex-col items-center">
                <div className="h-7 w-7 rounded-full border-2 border-border bg-background flex items-center justify-center shrink-0">
                  <div className="h-3.5 w-3.5 rounded-full bg-sky" />
                </div>
                {/* Vertical line for mobile draws in on reveal */}
                <div className={`w-[1.5px] bg-sky flex-1 md:hidden mt-2 min-h-[50px] timeline-grow-vertical ${timelineVisible ? "visible" : ""}`} />
              </div>
              
              <div className="md:mt-5">
                <span className="font-display text-[15px] font-semibold text-sky">{m.year}</span>
                <h3 className="text-[17px] font-semibold mt-1">{m.title}</h3>
                <p className="mt-2 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                  {m.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      {/* Tech Stack Ecosystem Section */}
      <section className="mt-24 border-t border-border pt-16 scroll-reveal">
        <div className="max-w-2xl">
          <p className="eyebrow">Ecosystem</p>
          <h2 className="mt-5">Our core technology stack</h2>
          <p className="mt-4 text-[16px]" style={{ color: "var(--text-secondary)" }}>
            Hover over a group to highlight aligned technologies and show our capability domains.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {techStack.map((group, idx) => {
            const isDimmed = hoveredCategory !== null && hoveredCategory !== group.category;
            return (
              <Reveal key={group.category} delay={idx * 100} className="w-full">
                <div
                  onMouseEnter={() => setHoveredCategory(group.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`rounded-xl border border-border p-6 bg-surface/30 transition-all duration-300 h-full ${
                    isDimmed ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100 border-sky/20 bg-surface/60"
                  }`}
                >
                  <h3 className="text-[14px] font-semibold uppercase tracking-[1.2px] text-sky">
                    {group.category}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-[13px] font-medium text-foreground transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>


      {/* Principles Section */}
      <section className="mt-24 border-t border-border pt-16 scroll-reveal">
        <div className="max-w-2xl">
          <p className="eyebrow">Principles</p>
          <h2 className="mt-5">Engineering philosophy</h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border sm:grid-cols-2 bg-border">
          {principles.map(([title, body], idx) => (
            <Reveal key={title} delay={idx * 150} className="bg-background p-8 h-full">
              <h3 className="text-[19px] font-semibold">{title}</h3>
              <p className="mt-3 text-[14.5px]" style={{ color: "var(--text-secondary)" }}>
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>


      {/* Statistics Section */}
      <dl className="mt-20 grid gap-8 border-t border-border pt-12 sm:grid-cols-4 scroll-reveal">
        {[
          ["2008", "Founded"],
          ["340", "Engineers"],
          ["9", "Countries"],
          ["94%", "Client retention"],
        ].map(([v, l]) => (
          <div key={l}>
            <dt className="font-display text-[32px] font-bold">{v}</dt>
            <dd className="mt-1 text-[13px]" style={{ color: "var(--text-muted)" }}>
              {l}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
