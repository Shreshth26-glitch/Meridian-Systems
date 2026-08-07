import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Meridian Systems" },
      {
        name: "description",
        content:
          "Book a ninety-minute scoping conversation with two Meridian Systems principal engineers and leave with a written assessment.",
      },
      { property: "og:title", content: "Book a Consultation — Meridian Systems" },
      {
        property: "og:description",
        content: "Ninety minutes with two principal engineers, and a written assessment afterwards.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="shell py-20">
      <div className="grid gap-14 lg:grid-cols-[58fr_42fr]">
        <div>
          <p className="eyebrow">Consultation</p>
          <h1 className="mt-6">Book a scoping conversation</h1>
          <p className="mt-5 max-w-[38rem] text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
            Tell us where the estate hurts. Two principal engineers will spend ninety minutes on it
            and send back a written assessment of the highest-leverage move.
          </p>

          <form className="mt-10 grid max-w-xl gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            {[
              ["Full name", "name", "text", "Alex Moreau"],
              ["Work email", "email", "email", "alex@company.com"],
              ["Organisation", "org", "text", "Company Ltd"],
              ["Role", "role", "text", "VP Engineering"],
            ].map(([label, id, type, ph]) => (
              <div key={id}>
                <label htmlFor={id} className="text-[13px] font-medium">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={ph}
                  className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="brief" className="text-[13px] font-medium">
                What are you trying to change?
              </label>
              <textarea
                id="brief"
                rows={5}
                placeholder="A short description of the estate and the constraint."
                className="mt-2 w-full rounded-md border border-border bg-background p-3 text-[14px] outline-none focus-visible:border-sky"
              />
            </div>
            <button type="submit" className="btn-base btn-primary with-arrow w-fit">
              Request consultation
              <ArrowRight size={14} className="btn-arrow" />
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-xl border border-border p-7">
          <p className="text-[12.5px] font-semibold uppercase tracking-[1.2px]">What to expect</p>
          <ul className="mt-5">
            {[
              ["Within 2 days", "A principal engineer replies to schedule."],
              ["90 minutes", "Working session, no sales deck."],
              ["Within a week", "Written assessment and sequencing options."],
              ["No obligation", "The assessment is yours either way."],
            ].map(([k, v]) => (
              <li key={k} className="hairline py-4">
                <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                  {k}
                </p>
                <p className="mt-1 text-[15px] font-medium">{v}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
