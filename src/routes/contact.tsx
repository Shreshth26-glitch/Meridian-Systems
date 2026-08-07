import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

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
      <div className="grid gap-14 lg:grid-cols-[45fr_55fr] items-start">
        {/* Left Column: World Map Visual & Hub Locations */}
        <div>
          <p className="eyebrow">Locations</p>
          <h2 className="mt-5">Our engineering hubs</h2>
          <p className="mt-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
            We work as embedded teams globally, operated from our primary regional hubs.
          </p>

          <div className="mt-8">
            <svg
              viewBox="0 0 400 240"
              className="w-full h-auto border border-border rounded-xl bg-surface/30"
              aria-hidden="true"
            >
              <defs>
                <pattern id="map-dots" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="var(--border)" fillOpacity="0.85" />
                </pattern>
              </defs>
              
              {/* Background dot pattern */}
              <rect width="100%" height="100%" fill="url(#map-dots)" />
              
              {/* Simplified abstract landmass shapes as blueprint paths */}
              <path
                d="M 20 80 Q 50 70 80 80 T 110 110 T 80 150 T 40 120 Z"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <path
                d="M 180 60 Q 220 50 250 70 T 260 110 T 210 130 Z"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              
              {/* Dotted network lines connecting hubs */}
              <path
                d="M 110 115 Q 160 85 210 90 Q 222.5 82.5 235 75"
                fill="none"
                stroke="var(--sky)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.75"
              />
              
              {/* New York Hub */}
              <g>
                <circle cx="110" cy="115" r="9" fill="var(--sky)" fillOpacity="0.18" className="animate-pulse" />
                <circle cx="110" cy="115" r="3.5" fill="var(--sky)" />
                <text x="110" y="133" textAnchor="middle" className="text-[10px] font-semibold font-display fill-foreground">New York</text>
              </g>

              {/* London Hub */}
              <g>
                <circle cx="210" cy="90" r="9" fill="var(--sky)" fillOpacity="0.18" className="animate-pulse" />
                <circle cx="210" cy="90" r="3.5" fill="var(--sky)" />
                <text x="210" y="108" textAnchor="middle" className="text-[10px] font-semibold font-display fill-foreground">London</text>
              </g>

              {/* Stockholm Hub */}
              <g>
                <circle cx="235" cy="75" r="9" fill="var(--sky)" fillOpacity="0.18" className="animate-pulse" />
                <circle cx="235" cy="75" r="3.5" fill="var(--sky)" />
                <text x="235" y="60" textAnchor="middle" className="text-[10px] font-semibold font-display fill-foreground">Stockholm</text>
              </g>
            </svg>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-border p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[1.2px]" style={{ color: "var(--text-muted)" }}>
                Stockholm (HQ)
              </p>
              <p className="mt-1 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                Regeringsgatan 29, 111 53 Stockholm, Sweden
              </p>
            </div>
            <div className="rounded-xl border border-border p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[1.2px]" style={{ color: "var(--text-muted)" }}>
                London
              </p>
              <p className="mt-1 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                30 Crown Place, London EC2A 4EB, United Kingdom
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form & Booking options */}
        <div className="rounded-xl border border-border p-8 bg-surface/30">
          <p className="eyebrow">Consultation</p>
          <h2 className="mt-4">Connect with our team</h2>
          <p className="mt-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
            Fill out the form below or book an immediate strategy call with a principal engineer.
          </p>

          {/* Book Strategy Call Trigger */}
          <div className="mt-6 p-4 rounded-lg border border-sky/35 bg-sky/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Phone className="text-sky shrink-0" size={18} />
              <div>
                <p className="text-[14px] font-semibold">Immediate Strategy Call</p>
                <p className="text-[12.5px]" style={{ color: "var(--text-secondary)" }}>Skip the queue and select a time directly.</p>
              </div>
            </div>
            <button type="button" className="btn-base btn-primary text-[13px] py-1.5 px-4">
              Book a Strategy Call
            </button>
          </div>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="text-[13px] font-medium">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Alex Moreau"
                className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-[13px] font-medium">
                Work email
              </label>
              <input
                id="email"
                type="email"
                placeholder="alex@company.com"
                className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky"
              />
            </div>

            <div>
              <label htmlFor="org" className="text-[13px] font-medium">
                Company / Organisation
              </label>
              <input
                id="org"
                type="text"
                placeholder="Company Ltd"
                className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="text-[13px] font-medium">
                Project Type
              </label>
              <select
                id="projectType"
                className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky text-foreground"
              >
                <option value="cloud">Cloud Modernization</option>
                <option value="data">Data Platform Engineering</option>
                <option value="ai">Applied AI Systems</option>
                <option value="other">Other modernization</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-[13px] font-medium">
                Message / constraint brief
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="A short description of the systems constraint you are targeting..."
                className="mt-2 w-full rounded-md border border-border bg-background p-3 text-[14px] outline-none focus-visible:border-sky"
              />
            </div>

            <div className="sm:col-span-2 mt-2">
              <button type="submit" className="btn-base btn-primary with-arrow w-full sm:w-fit justify-center">
                Send request
                <ArrowRight size={14} className="btn-arrow" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
