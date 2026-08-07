import { createFileRoute } from "@tanstack/react-router";
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
  const all = [...caseStudies, ...caseStudies.map((c) => ({ ...c, slug: `${c.slug}-2` }))];
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
        {all.map((study, i) => (
          <article key={study.slug} className="overflow-hidden rounded-xl border border-border">
            <div className="aspect-[16/10]">
              <CardArt variant={i} className="h-full w-full" />
            </div>
            <div className="border-t border-border p-6">
              <p className="text-[12.5px] uppercase tracking-[1.1px]" style={{ color: "var(--text-muted)" }}>
                {study.tag}
              </p>
              <h2 className="mt-2 text-[18px]">{study.title}</h2>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
