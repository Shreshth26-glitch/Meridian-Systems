import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { SignatureSolutions } from "@/components/site/signature-solutions";
import { CardArt } from "@/components/site/card-art";
import { caseStudies } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Systems — Enterprise Digital Transformation Engineering" },
      {
        name: "description",
        content:
          "Meridian Systems modernises enterprise cloud, data and AI platforms with embedded engineering teams and measurable service outcomes.",
      },
      { property: "og:title", content: "Meridian Systems — Enterprise Transformation Engineering" },
      {
        property: "og:description",
        content:
          "Cloud, data and applied AI modernisation for large organisations, delivered by embedded engineering teams.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <SignatureSolutions />

      <section className="shell py-20">
        <div className="grid gap-12 border-t border-border pt-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-5">Programmes measured in outcomes, not deliverables</h2>
            <Link to="/work" className="btn-base btn-secondary with-arrow mt-7">
              View all work
              <ArrowRight size={13} className="btn-arrow" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {caseStudies.map((study, i) => (
              <article key={study.slug} className="overflow-hidden rounded-xl border border-border">
                <div className="aspect-[4/3]">
                  <CardArt variant={i + 3} className="h-full w-full" />
                </div>
                <div className="border-t border-border p-5">
                  <p className="text-[12.5px] uppercase tracking-[1.1px]" style={{ color: "var(--text-muted)" }}>
                    {study.tag}
                  </p>
                  <h3 className="mt-2 text-[16px] font-semibold">{study.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-8">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-border p-10">
          <div className="max-w-xl">
            <h2>Start with a scoping conversation</h2>
            <p className="mt-3 text-[16px]" style={{ color: "var(--text-secondary)" }}>
              Ninety minutes with two principal engineers. You leave with a written assessment of
              the highest-leverage move, whether or not you work with us.
            </p>
          </div>
          <Link to="/contact" className="btn-base btn-primary with-arrow">
            Book a consultation
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
