import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { HeroBackdrop } from "./visuals";

export function Hero() {
  const words = ["excellence", "reliability", "scale", "velocity", "precision"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex]!;

    if (!isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);

      if (currentText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(40);
        }, 1500);
      }
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);

      if (currentText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(120);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {prefersReducedMotion ? (
          <HeroBackdrop className="absolute inset-0 h-full w-full" />
        ) : (
          <video
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-background-technical.svg"
            aria-hidden="true"
            preload="metadata"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0" style={{ background: "var(--video-overlay)" }} />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[58fr_42fr] lg:gap-10">
          <div className="max-w-[46rem]">
            <p className="eyebrow">Digital transformation engineering</p>

            <h1 className="mt-6">
              Enterprise systems engineered for{" "}
              <span style={{ color: "var(--sky)" }} className="typewriter-cursor pr-1">
                {currentText}
              </span>
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
            {/* Background video is fully visible in this column */}
          </div>
        </div>
      </div>
    </section>
  );
}
