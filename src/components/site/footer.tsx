import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Services",
    links: [
      ["Cloud Modernization", "/services"],
      ["Data Platform Engineering", "/services"],
      ["Applied AI Systems", "/services"],
      ["All services", "/services"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/company"],
      ["Careers", "/company"],
      ["Work", "/work"],
      ["Insights", "/insights"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Case studies", "/work"],
      ["Engineering notes", "/insights"],
      ["Contact", "/contact"],
      ["Legal", "/company"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border" style={{ background: "var(--surface)" }}>
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy font-display text-sm font-semibold text-navy-foreground">
                M
              </span>
              <span className="font-display text-[15px] font-semibold">Meridian Systems</span>
            </div>
            <p className="mt-5 text-[14px]" style={{ color: "var(--text-secondary)" }}>
              Quarterly field notes on enterprise modernisation. No marketing, engineering only.
            </p>
            <form
              className="mt-5 flex max-w-sm items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="name@company.com"
                className="h-[38px] w-full rounded-md border border-border bg-background px-3 text-[13px] outline-none focus-visible:border-sky"
              />
              <button type="submit" className="btn-base btn-primary with-arrow shrink-0">
                Subscribe
                <ArrowRight size={13} className="btn-arrow" />
              </button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12.5px] font-semibold uppercase tracking-[1.2px]">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([label, to], i) => (
                    <li key={`${label}-${i}`}>
                      <Link
                        to={to}
                        className="text-[14px] transition-colors hover:text-sky"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Meridian Systems. All rights reserved.
          </p>
          <div className="flex gap-5 text-[13px]">
            {["LinkedIn", "GitHub", "X"].map((s) => (
              <a key={s} href="#" className="text-sky">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
