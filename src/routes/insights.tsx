import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Meridian Systems" },
      {
        name: "description",
        content:
          "Engineering field notes on cloud migration, data governance and running applied AI in regulated enterprises.",
      },
      { property: "og:title", content: "Insights — Meridian Systems" },
      {
        property: "og:description",
        content: "Field notes from Meridian Systems engineers on enterprise modernisation.",
      },
    ],
  }),
  component: Insights,
});

const posts = [
  ["The migration nobody schedules", "Cloud", "Why cutover windows fail and what to instrument first.", "8 min"],
  ["Data contracts in practice", "Data", "A working pattern for producer accountability at scale.", "11 min"],
  ["Evaluating AI before shipping it", "AI", "Evaluation harnesses that catch drift before customers do.", "9 min"],
  ["Error budgets that survive politics", "Reliability", "Making SLOs stick when release pressure arrives.", "7 min"],
  ["Retiring the mainframe, quietly", "Legacy", "Strangler migrations without a big-bang weekend.", "13 min"],
  ["Identity as a migration problem", "Security", "Sequencing IAM consolidation across acquired estates.", "10 min"],
];

function Insights() {
  return (
    <div className="shell py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Insights</p>
        <h1 className="mt-6">Field notes from active programmes</h1>
        <p className="mt-5 text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
          Written by the engineers doing the work, published when there is something worth saying.
        </p>
      </div>

      <div className="mt-14 border-t border-border">
        {posts.map(([title, tag, summary, read]) => (
          <article
            key={title}
            className="grid gap-4 border-b border-border py-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
          >
            <span className="text-[12.5px] uppercase tracking-[1.1px] text-sky md:w-28">{tag}</span>
            <div className="min-w-0">
              <h2 className="text-[20px]">{title}</h2>
              <p className="mt-2 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                {summary}
              </p>
            </div>
            <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              {read}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
