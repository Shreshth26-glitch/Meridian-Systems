import { createFileRoute } from "@tanstack/react-router";

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

const principles = [
  ["Engineers decide", "Every engagement is led by a practising principal engineer, not an account manager."],
  ["Evidence over opinion", "We instrument before we recommend. Assessments arrive with measurements attached."],
  ["Leave it owned", "Runbooks, enablement and handover are scoped from week one, not bolted on at the end."],
  ["Small senior teams", "Median team size is eight. We do not staff pyramids."],
];

function Company() {
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

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border sm:grid-cols-2">
        {principles.map(([title, body]) => (
          <div key={title} className="border-b border-r border-border bg-background p-8">
            <h2 className="text-[20px]">{title}</h2>
            <p className="mt-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-4">
        {[
          ["2008", "Founded"],
          ["340", "Engineers"],
          ["9", "Countries"],
          ["94%", "Client retention"],
        ].map(([v, l]) => (
          <div key={l}>
            <dt className="font-display text-[28px] font-semibold">{v}</dt>
            <dd className="mt-1 text-[13px]" style={{ color: "var(--text-muted)" }}>
              {l}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
