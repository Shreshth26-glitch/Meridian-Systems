import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { signatureServices } from "@/lib/services";
import { CardArt } from "./card-art";

export function SignatureSolutions() {
  return (
    <section className="shell py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">Signature solutions</p>
        <h2 className="mt-5">Six practices that carry most of the transformation load</h2>
        <p className="mt-4 text-[16px]" style={{ color: "var(--text-secondary)" }}>
          A curated view of where our teams do their deepest work. The full directory of fifteen
          services sits on the services page.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {signatureServices.map((service, i) => (
          <Link
            key={service.slug}
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="signature-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background focus-visible:outline-none"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <CardArt variant={i} className="h-full w-full" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-[380ms] group-hover:opacity-100 group-focus-visible:opacity-100">
                <CardArt variant={i} intense className="h-full w-full" />
              </div>
            </div>
            <div className="flex flex-1 flex-col border-t border-border bg-background p-6">
              <h3 className="text-[18px] font-semibold">{service.name}</h3>
              <p className="mt-2.5 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                {service.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy">
                <span className="learn-underline">Learn more</span>
                <ArrowRight size={13} className="btn-arrow" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
