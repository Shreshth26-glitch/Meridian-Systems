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
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px", // triggers just before section comes fully into view
      },
    );

    // Track which elements we are currently observing to avoid duplicate work
    const observedElements = new Set<Element>();

    const observeNewElements = () => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.visible)");
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    // Run initial scan
    observeNewElements();

    // Setup MutationObserver to watch for asynchronously mounted elements
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      observedElements.clear();
    };
  }, [location.pathname]); // re-run setup whenever pathname changes
}

