import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroBackdrop, NetworkVisual } from "./visuals";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackdrop className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--overlay-wash)" }} />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[58fr_42fr] lg:gap-10">
          <div className="max-w-[46rem]">
            <p className="eyebrow">Digital transformation engineering</p>

            <h1 className="mt-6">
              Enterprise systems engineered for{" "}
              <span style={{ color: "var(--sky)" }}>excellence</span>
            </h1>

            <p
              className="mt-6 max-w-[38rem] text-[17px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              We modernise the platforms large organisations depend on — cloud foundations, data
              estates and applied AI — delivered by embedded engineering teams against measurable
              service outcomes.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-base btn-primary with-arrow">
                Book a consultation
                <ArrowRight size={14} className="btn-arrow" />
              </Link>
              <Link to="/services" className="btn-base btn-secondary">
                Explore services
              </Link>
            </div>

            <dl className="mt-14 grid max-w-[34rem] grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["18 yrs", "Enterprise delivery"],
                ["340+", "Programmes shipped"],
                ["99.98%", "Platform availability"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-[22px] font-semibold">{value}</dt>
                  <dd className="mt-1 text-[13px]" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <NetworkVisual className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
