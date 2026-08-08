import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

function NotFoundComponent() {
  return (
    <div className="shell flex flex-col items-center justify-center text-center py-24 md:py-36">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight">
        Unresolved Route
      </h1>
      <p
        className="mt-6 max-w-md text-[16px] leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        The requested system endpoint could not be resolved. This directory path does not exist or
        has been decommissioned.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-base btn-primary">
          Return to home
        </Link>
        <Link to="/services" className="btn-base btn-secondary">
          Browse services
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Meridian Systems — Enterprise Digital Transformation" },
      {
        name: "description",
        content:
          "Meridian Systems engineers cloud, data and applied AI modernisation for large enterprises.",
      },
      { name: "author", content: "Meridian Systems" },
      { property: "og:title", content: "Meridian Systems" },
      {
        property: "og:description",
        content: "Enterprise digital transformation engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  // Run global scroll reveal observer
  useScrollReveal();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Keyed container triggers fade-in animation on every route change */}
          <div key={location.pathname} className="animate-page-fade">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
