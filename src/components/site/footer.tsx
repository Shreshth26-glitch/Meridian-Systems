import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email format.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "newsletter",
          message: "Newsletter subscription request.",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Failed to subscribe. Please try again.");
      setStatus("idle");
    }
  };

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
            {status === "success" ? (
              <div className="mt-5 flex items-center gap-2 text-sky text-[13.5px] font-semibold animate-fade-in">
                <Check size={16} />
                Subscribed
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-1.5 max-w-sm">
                <form className="flex items-center gap-2" onSubmit={handleSubmit} noValidate>
                  <label htmlFor="newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={status === "sending"}
                    className={`h-[38px] w-full rounded-md border bg-background px-3 text-[13px] outline-none focus-visible:border-sky transition-colors ${
                      error
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-border"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-base btn-primary with-arrow shrink-0 text-[12.5px] py-2 h-[38px] cursor-pointer disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={12} className="animate-spin mr-1" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight size={13} className="btn-arrow" />
                      </>
                    )}
                  </button>
                </form>
                {error && <p className="text-[11.5px] text-destructive font-semibold">{error}</p>}
              </div>
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12.5px] font-semibold uppercase tracking-[1.2px]">
                  {col.title}
                </p>
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
