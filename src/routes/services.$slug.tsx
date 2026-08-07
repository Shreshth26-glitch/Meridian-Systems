import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CardArt } from "@/components/site/card-art";
import { caseStudies, getService } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { name: service.name, tagline: service.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found — Meridian Systems" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.name} — Meridian Systems` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: `${loaderData.name} — Meridian Systems` },
        { property: "og:description", content: loaderData.tagline },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = getService(slug)!;
  const Icon = service.icon;

  return (
    <div className="shell py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-muted)" }}>
        <Link to="/" className="hover:text-sky">
          Home
        </Link>
        <ChevronRight size={13} />
        <Link to="/services" className="hover:text-sky">
          Services
        </Link>
        <ChevronRight size={13} />
        <span style={{ color: "var(--text-secondary)" }}>{service.name}</span>
      </nav>

      <header className="mt-10 flex flex-wrap items-start gap-5 border-b border-border pb-12">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-navy"
          style={{ background: "rgba(56,189,248,0.14)" }}
        >
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <h1 className="text-[clamp(2.25rem,4vw,3rem)]">{service.name}</h1>
          <p className="mt-3 text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
            {service.tagline}
          </p>
        </div>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[60fr_40fr]">
        <div>
          <h2 className="text-[26px]">Overview</h2>
          <p className="mt-4 text-[16px]" style={{ color: "var(--text-secondary)" }}>
            {service.overview}
          </p>
          <p className="mt-4 text-[16px]" style={{ color: "var(--text-secondary)" }}>
            {service.description}
          </p>

          <h3 className="mt-12">Capabilities</h3>
          <ul className="mt-5">
            {service.capabilities.map((c) => (
              <li key={c} className="hairline flex items-start gap-3 py-4 text-[15px]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--sky)" }} />
                <span style={{ color: "var(--text-secondary)" }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-xl border border-border p-7">
          <p className="text-[12.5px] font-semibold uppercase tracking-[1.2px]">Quick facts</p>
          <dl className="mt-5">
            {[
              ["Typical timeline", service.facts.timeline],
              ["Industries served", service.facts.industries],
              ["Team size", service.facts.team],
              ["Tech stack", service.facts.stack],
            ].map(([label, value]) => (
              <div key={label} className="hairline py-4">
                <dt className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                  {label}
                </dt>
                <dd className="mt-1 text-[15px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <Link to="/contact" className="btn-base btn-primary with-arrow mt-6 w-full">
            Book a scoping call
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </aside>
      </div>

      <section className="mt-24 border-t border-border pt-12">
        <h2>Related work</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {caseStudies.map((study, i) => (
            <article key={study.slug} className="overflow-hidden rounded-xl border border-border">
              <div className="aspect-[16/10]">
                <CardArt variant={i + 1} className="h-full w-full" />
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
      </section>
    </div>
  );
}
