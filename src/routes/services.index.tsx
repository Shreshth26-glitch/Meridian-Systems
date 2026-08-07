import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services Directory — Meridian Systems" },
      {
        name: "description",
        content:
          "Fifteen enterprise engineering services spanning cloud modernization, data platforms, applied AI, security and managed operations.",
      },
      { property: "og:title", content: "Services Directory — Meridian Systems" },
      {
        property: "og:description",
        content: "Explore all fifteen Meridian Systems enterprise engineering services.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="shell py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Services</p>
        <h1 className="mt-6">The full engineering directory</h1>
        <p className="mt-5 text-[17px] font-medium" style={{ color: "var(--text-secondary)" }}>
          Fifteen practices, one delivery model. Every engagement is staffed from the same bench of
          principal engineers and architects.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <Link
            key={service.slug}
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="directory-card group relative overflow-hidden rounded-lg border border-border p-5 outline-none"
          >
            <span className="directory-tint" aria-hidden="true" />
            <span className="directory-corner" aria-hidden="true" />
            <span className="relative block">
              <service.icon size={20} className="text-navy" />
              <span className="mt-4 block text-[15px] font-semibold">{service.name}</span>
              <span className="directory-desc block text-[13px]" style={{ color: "var(--text-secondary)" }}>
                {service.tagline}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
