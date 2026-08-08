import React, { ElementType, useEffect, useRef, useState } from "react";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: number; // delay in ms
  as?: ElementType; // HTML tag to render (e.g. "div", "tr", "li")
}

export function Reveal({
  children,
  delay = 0,
  as: Component = "div",
  className = "",
  style = {},
  ...props
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    // Check for prefers-reduced-motion setting
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px", // trigger reveal slightly before item fully enters viewport
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const combinedClassName =
    `reveal-element ${isVisible ? "reveal-active" : ""} ${className}`.trim();

  // Inject transition delay if staggering is specified
  const combinedStyle = {
    ...style,
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
  };

  return (
    <Component ref={ref} className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </Component>
  );
}
export default Reveal;
