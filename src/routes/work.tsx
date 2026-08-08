import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CardArt } from "@/components/site/card-art";
import { caseStudies } from "@/lib/services";
import { Reveal } from "@/components/ui/reveal";

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
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const industries = ["All", "Finance", "Healthcare", "Logistics", "Retail", "Energy"];

  const filteredCaseStudies =
    selectedIndustry === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.industry === selectedIndustry);

  return (
    <div className="shell py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Client work</p>
        <h1 className="mt-6">Programmes that changed how the business runs</h1>
        <p className="mt-5 text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
          A sample of engagements, each measured against the service level agreed at kickoff.
        </p>
      </div>

      {/* Filter pills */}
      <div className="mt-10 flex flex-wrap gap-2">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/50 ${
              selectedIndustry === ind
                ? "bg-navy text-navy-foreground border-navy"
                : "bg-surface/50 text-foreground border-border hover:border-sky/50"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {filteredCaseStudies.length > 0 ? (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80} className="flex h-full w-full">
              <Link
                to="/work/$slug"
                params={{ slug: study.slug }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-sky/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/50 focus-visible:border-sky/50 w-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                  <CardArt variant={i + 1} className="h-full w-full" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <CardArt variant={i + 1} intense className="h-full w-full" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className="text-[12px] font-semibold uppercase tracking-[1.2px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {study.industry}
                  </span>
                  <h2 className="mt-2 text-[18px] font-semibold transition-colors group-hover:text-foreground">
                    {study.client}
                  </h2>
                  <p
                    className="mt-2.5 flex-1 text-[14px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {study.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-text">
                    View case study
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-14 flex flex-col items-center justify-center text-center py-16 px-4 border border-border bg-surface/10 rounded-xl">
          <p className="text-[16px] font-semibold text-foreground">
            No case studies yet for this industry
          </p>
          <p className="mt-2 text-[13.5px] max-w-sm" style={{ color: "var(--text-secondary)" }}>
            We have not yet indexed any client modernization briefings for the {selectedIndustry}{" "}
            sector.
          </p>
          <button
            onClick={() => setSelectedIndustry("All")}
            className="mt-6 btn-base btn-secondary text-[12.5px] py-1.5 px-4 cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
