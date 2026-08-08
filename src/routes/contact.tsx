import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meridian Systems" },
      {
        name: "description",
        content:
          "Connect with a principal engineer at Meridian Systems to modernization cloud foundations, data platforms or AI.",
      },
      { property: "og:title", content: "Contact — Meridian Systems" },
      {
        property: "og:description",
        content:
          "Book a strategy call or send a constraint brief. Stockholm, London and New York offices.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    projectType: "cloud",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) error = "Name is required.";
    } else if (field === "email") {
      if (!value.trim()) {
        error = "Email is required.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          error = "Invalid email format.";
        }
      }
    } else if (field === "message") {
      if (!value.trim()) error = "Message is required.";
    }
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToValidate = ["name", "email", "message"];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.org,
          project_type: formData.projectType,
          message: formData.message,
          source: "contact_page",
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit request.");
      }

      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shell py-20">
      <div className="grid gap-16 lg:grid-cols-[40fr_60fr]">
        {/* Left Column: Office info & Interactive map */}
        <div>
          <p className="eyebrow">Offices</p>
          <h1 className="mt-6">Global reach</h1>
          <p
            className="mt-5 text-[16px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            We work with distributed systems running on AWS, Azure, and private cloud arrays. We
            connect to customer networks securely via isolated transit hubs.
          </p>

          {/* Mini Interactive map vector */}
          <div className="mt-10 aspect-[360/180] w-full rounded-xl border border-border bg-surface/20 p-4 relative overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 340 180"
              className="w-full h-full text-border opacity-85"
              fill="currentColor"
            >
              {/* Abstract layout curves representing network connections */}
              <path
                d="M 20 130 C 50 120, 80 140, 110 115"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <path
                d="M 110 115 C 140 110, 170 120, 210 90"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <path
                d="M 210 90 C 220 85, 230 80, 235 75"
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
                className="marker-scale-in"
                style={{ animationDelay: "600ms" }}
              />

              {/* New York Hub */}
              <g className="marker-scale-in" style={{ animationDelay: "150ms" }}>
                <circle
                  cx="110"
                  cy="115"
                  r="9"
                  fill="var(--sky)"
                  fillOpacity="0.18"
                  className="animate-pulse"
                />
                <circle cx="110" cy="115" r="3.5" fill="var(--sky)" />
                <text
                  x="110"
                  y="133"
                  textAnchor="middle"
                  className="text-[10px] font-semibold font-display fill-foreground"
                >
                  New York
                </text>
              </g>

              {/* London Hub */}
              <g className="marker-scale-in" style={{ animationDelay: "300ms" }}>
                <circle
                  cx="210"
                  cy="90"
                  r="9"
                  fill="var(--sky)"
                  fillOpacity="0.18"
                  className="animate-pulse"
                />
                <circle cx="210" cy="90" r="3.5" fill="var(--sky)" />
                <text
                  x="210"
                  y="108"
                  textAnchor="middle"
                  className="text-[10px] font-semibold font-display fill-foreground"
                >
                  London
                </text>
              </g>

              {/* Stockholm Hub */}
              <g className="marker-scale-in" style={{ animationDelay: "450ms" }}>
                <circle
                  cx="235"
                  cy="75"
                  r="9"
                  fill="var(--sky)"
                  fillOpacity="0.18"
                  className="animate-pulse"
                />
                <circle cx="235" cy="75" r="3.5" fill="var(--sky)" />
                <text
                  x="235"
                  y="60"
                  textAnchor="middle"
                  className="text-[10px] font-semibold font-display fill-foreground"
                >
                  Stockholm
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-8 space-y-6">
            <Reveal delay={200}>
              <div className="rounded-xl border border-border p-5">
                <p
                  className="text-[12px] font-semibold uppercase tracking-[1.2px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Stockholm (HQ)
                </p>
                <p className="mt-1 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                  Regeringsgatan 29, 111 53 Stockholm, Sweden
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="rounded-xl border border-border p-5">
                <p
                  className="text-[12px] font-semibold uppercase tracking-[1.2px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  London
                </p>
                <p className="mt-1 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                  30 Crown Place, London EC2A 4EB, United Kingdom
                </p>
              </div>
            </Reveal>
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
                <p className="text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
                  Skip the queue and select a time directly.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-base btn-primary text-[13px] py-1.5 px-4 cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </div>

          {submitSuccess ? (
            <div className="mt-8 py-10 px-5 text-center border border-sky/30 bg-sky/5 rounded-xl animate-fade-in">
              <span className="text-[13px] font-bold text-sky uppercase tracking-widest block">
                Success
              </span>
              <p className="mt-3 text-[15.5px] font-medium text-foreground">
                Thanks — we'll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <Reveal delay={0}>
                <label htmlFor="name" className="text-[13px] font-medium block">
                  Full name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Alex Moreau"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`mt-2 h-[42px] w-full rounded-md border bg-background px-3 text-[14px] outline-none transition-colors focus-visible:border-sky ${
                    touched["name"] && errors["name"]
                      ? "border-destructive focus-visible:border-destructive"
                      : "border-border"
                  }`}
                />
                {touched["name"] && errors["name"] && (
                  <p className="mt-1.5 text-[11.5px] text-destructive font-semibold">
                    {errors["name"]}
                  </p>
                )}
              </Reveal>

              <Reveal delay={80}>
                <label htmlFor="email" className="text-[13px] font-medium block">
                  Work email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={`mt-2 h-[42px] w-full rounded-md border bg-background px-3 text-[14px] outline-none transition-colors focus-visible:border-sky ${
                    touched["email"] && errors["email"]
                      ? "border-destructive focus-visible:border-destructive"
                      : "border-border"
                  }`}
                />
                {touched["email"] && errors["email"] && (
                  <p className="mt-1.5 text-[11.5px] text-destructive font-semibold">
                    {errors["email"]}
                  </p>
                )}
              </Reveal>

              <Reveal delay={160}>
                <label htmlFor="org" className="text-[13px] font-medium block">
                  Company / Organisation
                </label>
                <input
                  id="org"
                  type="text"
                  placeholder="Company Ltd"
                  value={formData.org}
                  onChange={(e) => handleChange("org", e.target.value)}
                  className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky"
                />
              </Reveal>

              <Reveal delay={240}>
                <label htmlFor="projectType" className="text-[13px] font-medium block">
                  Project Type
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => handleChange("projectType", e.target.value)}
                  className="mt-2 h-[42px] w-full rounded-md border border-border bg-background px-3 text-[14px] outline-none focus-visible:border-sky text-foreground"
                >
                  <option value="cloud">Cloud Modernization</option>
                  <option value="data">Data Platform Engineering</option>
                  <option value="ai">Applied AI Systems</option>
                  <option value="other">Other modernization</option>
                </select>
              </Reveal>

              <Reveal delay={320} className="sm:col-span-2">
                <label htmlFor="message" className="text-[13px] font-medium block">
                  Message / constraint brief *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="A short description of the systems constraint you are targeting..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`mt-2 w-full rounded-md border bg-background p-3 text-[14px] outline-none transition-colors focus-visible:border-sky ${
                    touched["message"] && errors["message"]
                      ? "border-destructive focus-visible:border-destructive"
                      : "border-border"
                  }`}
                />
                {touched["message"] && errors["message"] && (
                  <p className="mt-1.5 text-[11.5px] text-destructive font-semibold">
                    {errors["message"]}
                  </p>
                )}
              </Reveal>

              {submitError && (
                <div className="sm:col-span-2 text-[13px] text-destructive font-semibold">
                  {submitError}
                </div>
              )}

              <Reveal delay={400} className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-base btn-primary with-arrow w-full sm:w-fit justify-center cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send request
                      <ArrowRight size={14} className="btn-arrow" />
                    </>
                  )}
                </button>
              </Reveal>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
