import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: stop observing once revealed
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px", // triggers just before section comes fully into view
      }
    );

    // Find and observe all scroll-reveal elements
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => {
        try {
          observer.unobserve(el);
        } catch {
          // ignore if element is already unmounted
        }
      });
      observer.disconnect();
    };
  }, [location.pathname]); // re-run setup whenever pathname changes
}
