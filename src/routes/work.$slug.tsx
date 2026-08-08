import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Code2, LineChart, Award } from "lucide-react";
import { getCaseStudy } from "@/lib/services";
import { CardArt } from "@/components/site/card-art";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData: study }) => ({
    meta: [
      { title: `${study?.client ?? "Case Study"} — Meridian Systems` },
      { name: "description", content: study?.summary ?? "" },
      { property: "og:title", content: `${study?.client ?? "Case Study"} — Meridian Systems` },
      { property: "og:description", content: study?.summary ?? "" },
    ],
  }),
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const study = Route.useLoaderData();

  return (
    <div className="shell py-20">
      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-secondary-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to client work
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span
            className="text-[12px] font-semibold uppercase tracking-[1.2px]"
            style={{ color: "var(--text-muted)" }}
          >
            {study.industry}
          </span>
          <h1 className="mt-4">{study.client}</h1>
          <p className="mt-5 text-[18px] font-medium" style={{ color: "var(--text-secondary)" }}>
            {study.title}
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <div className="aspect-[21/9]">
              <CardArt variant={caseStudyIndex(study.slug)} intense className="h-full w-full" />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-[20px] font-semibold">The Approach</h2>
            <div
              className="mt-5 space-y-6 text-[15px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>{study.narrative}</p>
              <p>
                Following our standard delivery cadence, the project was mapped out in eight-week
                sprints, each tied to clear service-level agreements. We instrumented code paths
                prior to making any core changes, allowing us to make decisions backed strictly by
                empirical evidence.
              </p>
              <p>
                At the conclusion of the engagement, our engineers delivered complete operational
                runbooks and conducted direct hands-on enablement sessions with the client's
                internal engineering team to ensure complete self-sufficiency.
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-xl border border-border p-6 bg-surface/50">
            <h3
              className="text-[13px] font-semibold uppercase tracking-[1.2px]"
              style={{ color: "var(--text-muted)" }}
            >
              Programme Metadata
            </h3>

            <dl className="mt-5 space-y-6">
              <div className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-background">
                  <Clock size={16} className="text-sky-text" />
                </div>
                <div>
                  <dt className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    Timeline
                  </dt>
                  <dd className="mt-1 text-[15px] font-medium">{study.timeline}</dd>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-background">
                  <Code2 size={16} className="text-sky-text" />
                </div>
                <div>
                  <dt className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    Technologies Used
                  </dt>
                  <dd className="mt-1 text-[15px] font-medium">{study.stack}</dd>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-background">
                  <LineChart size={16} className="text-sky-text" />
                </div>
                <div>
                  <dt className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    Business Impact
                  </dt>
                  <dd className="mt-1 text-[15px] font-medium">{study.impact}</dd>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-background">
                  <Award size={16} className="text-sky-text" />
                </div>
                <div>
                  <dt className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    ROI Metric
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-foreground">{study.roi}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border p-6">
            <h4 className="text-[15px] font-semibold">Need similar outcomes?</h4>
            <p className="mt-2 text-[14px]" style={{ color: "var(--text-secondary)" }}>
              Every engagement starts with a ninety-minute scoping call with two principal
              engineers.
            </p>
            <Link to="/contact" className="btn-base btn-primary w-full mt-5">
              Book a scoping call
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function caseStudyIndex(slug: string) {
  if (slug === "nordic-clearing") return 1;
  if (slug === "atlas-health") return 2;
  return 3;
}
