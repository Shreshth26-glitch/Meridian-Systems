import { createFileRoute, Link } from "@tanstack/react-router";
import { CardArt } from "@/components/site/card-art";
import { caseStudies } from "@/lib/services";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Client Work — Meridian Systems" },
      {
        name: "description",
        content:
          "Enterprise modernisation programmes delivered by Meridian Systems across banking, healthcare and logistics.",
      },
      { property: "og:title", content: "Client Work — Meridian Systems" },
      {
        property: "og:description",
        content: "Selected enterprise transformation programmes and their measured outcomes.",
      },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <div className="shell py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Client work</p>
        <h1 className="mt-6">Programmes that changed how the business runs</h1>
        <p className="mt-5 text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
          A sample of engagements, each measured against the service level agreed at kickoff.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <Link
            key={study.slug}
            to="/work/$slug"
            params={{ slug: study.slug }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-sky/40 focus-visible:outline-none"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
              <CardArt variant={i + 1} className="h-full w-full" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <CardArt variant={i + 1} intense className="h-full w-full" />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-[12px] font-semibold uppercase tracking-[1.2px]" style={{ color: "var(--text-muted)" }}>
                {study.industry}
              </span>
              <h2 className="mt-2 text-[18px] font-semibold transition-colors group-hover:text-foreground">
                {study.client}
              </h2>
              <p className="mt-2.5 flex-1 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                {study.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky">
                View case study
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

