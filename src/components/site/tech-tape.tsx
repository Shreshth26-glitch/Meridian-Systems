import { useEffect, useState } from "react";

const technologies = [
  { name: "React", url: "https://react.dev" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "Next.js", url: "https://nextjs.org" },
  { name: "Vite", url: "https://vite.dev" },
  { name: "Node.js", url: "https://nodejs.org" },
  { name: "PostgreSQL", url: "https://www.postgresql.org" },
  { name: "Kafka", url: "https://kafka.apache.org" },
  { name: "Docker", url: "https://www.docker.com" },
  { name: "Kubernetes", url: "https://kubernetes.io" },
  { name: "AWS", url: "https://aws.amazon.com" },
  { name: "Google Cloud", url: "https://cloud.google.com" },
  { name: "Python", url: "https://www.python.org" },
  { name: "Rust", url: "https://www.rust-lang.org" },
  { name: "Go", url: "https://go.dev" },
  { name: "GraphQL", url: "https://graphql.org" },
  { name: "Redis", url: "https://redis.io" },
  { name: "Terraform", url: "https://www.terraform.io" },
  { name: "GitHub Actions", url: "https://github.com/features/actions" },
  { name: "Prometheus", url: "https://prometheus.io" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" }
];

export function TechTape() {
  return (
    <div className="w-full py-4 border-y border-border bg-surface/40 backdrop-blur-xs select-none overflow-hidden relative flex group hover-pause">
      {/* Subtle fade overlay on edges for premium feeling */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex shrink-0 items-center animate-marquee whitespace-nowrap">
        {technologies.map((tech, idx) => (
          <div key={idx} className="inline-flex items-center gap-6 pr-16">
            <a
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block origin-center text-[13px] font-semibold uppercase tracking-widest text-secondary-foreground font-display transition-all duration-300 hover:text-sky hover:scale-108 active:scale-95 cursor-pointer"
            >
              {tech.name}
            </a>
            <span className="text-sky text-base font-bold select-none">•</span>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 items-center animate-marquee whitespace-nowrap" aria-hidden="true">
        {technologies.map((tech, idx) => (
          <div key={`dup-${idx}`} className="inline-flex items-center gap-6 pr-16">
            <a
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block origin-center text-[13px] font-semibold uppercase tracking-widest text-secondary-foreground font-display transition-all duration-300 hover:text-sky hover:scale-108 active:scale-95 cursor-pointer"
            >
              {tech.name}
            </a>
            <span className="text-sky text-base font-bold select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

