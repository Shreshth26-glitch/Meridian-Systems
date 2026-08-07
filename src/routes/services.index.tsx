import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/services";
import { CardArt } from "@/components/site/card-art";
import { ArrowRight } from "lucide-react";

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

const variantMapping: Record<string, number> = {
  "enterprise-erp": 6,
  "custom-website-development": 7,
  "web-applications": 8,
  "android-app-development": 9,
  "ios-app-development": 10,
  "cross-platform-apps": 11,
  "social-media-marketing": 12,
  "seo": 13,
  "database-architecture": 14,
  "cloud-infrastructure": 0,
  "api-development": 1,
  "ai-automation": 2,
  "ui-ux-design": 3,
  "cybersecurity-consulting": 4,
  "it-consulting": 5,
};

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

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const artVariant = variantMapping[service.slug] ?? 0;
          return (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="signature-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background focus-visible:outline-none"
            >
              <div className="relative aspect-[16/11] overflow-hidden border-b border-border">
                <CardArt variant={artVariant} className="h-full w-full" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-[380ms] group-hover:opacity-100 group-focus-visible:opacity-100">
                  <CardArt variant={artVariant} intense className="h-full w-full" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[18px] font-semibold">{service.name}</h3>
                <p className="mt-2.5 text-[14px] flex-1" style={{ color: "var(--text-secondary)" }}>
                  {service.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy">
                  <span className="learn-underline">Learn more</span>
                  <ArrowRight size={13} className="btn-arrow" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
