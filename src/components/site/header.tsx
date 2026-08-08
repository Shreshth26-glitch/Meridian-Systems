import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { AskAIDrawer } from "./ask-ai-drawer";

const nav = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Company", to: "/company" },
  { label: "Insights", to: "/insights" },
] as const;

export function Header() {
  const { theme, toggle, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const [askAIOpen, setAskAIOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const node = drawerRef.current;
    node?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = node.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="shell">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full border border-border bg-background/95 px-4 py-2.5 backdrop-blur-[2px] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:px-5">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-semibold text-navy-foreground">
              M
            </span>
            <span className="truncate font-display text-[15px] font-semibold tracking-tight">
              Meridian Systems
            </span>
          </Link>

          <nav className="hidden items-center gap-1 justify-self-center rounded-full border border-border bg-surface px-1.5 py-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-foreground bg-background" }}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium text-secondary-foreground transition-colors hover:text-foreground after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-[1px] after:bg-sky after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              className="relative grid h-9 w-9 place-items-center rounded-full border border-border text-secondary-foreground transition-colors hover:text-foreground overflow-hidden"
            >
              <span
                className={`absolute transition-all duration-300 ${mounted && theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-90"}`}
              >
                <Sun size={15} />
              </span>
              <span
                className={`absolute transition-all duration-300 ${!mounted || theme === "light" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"}`}
              >
                <Moon size={15} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAskAIOpen(true)}
              className="btn-base btn-primary relative"
              aria-label="Ask AI"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Ask AI</span>
              {/* Pulsing indicator dot */}
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky"></span>
              </span>
            </button>

            <Link to="/contact" className="btn-base btn-secondary hidden lg:inline-flex">
              Book Consultation
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/20"
            tabIndex={-1}
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="animate-slide-in-right absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-border bg-background p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-border"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="mt-8 flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="hairline py-5 font-display text-2xl font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-base btn-primary mt-8 w-full"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}

      <AskAIDrawer open={askAIOpen} onClose={() => setAskAIOpen(false)} />
    </header>
  );
}
