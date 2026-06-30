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

import appCss from "../styles.css?url";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { motion, AnimatePresence } from 'motion/react';
import { CommandMenu } from '@/components/site/CommandMenu';
import { Cursor } from "@/components/site/Cursor";

function NotFoundComponent() {
  return (
    <div className="grain flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md text-center"
      >
        <p className="text-mono opacity-60">[ Error 404 ]</p>
        <h1 className="text-display mt-6 text-[20vw] leading-[0.8] md:text-[15vw]">
          <span className="italic text-accent">Lost</span>.
        </h1>
        <p className="mt-8 text-lg opacity-70">
          You've drifted into the spaces in between.
        </p>
        <div className="mt-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 text-background transition-colors hover:bg-accent"
          >
            <span className="text-mono">Return to surface</span>
            <span className="text-display text-2xl italic transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
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
      { title: "OBJEKT — Independent design studio, est. 2026" },
      { name: "description", content: "OBJEKT is an independent studio designing identity, interface, and the spaces in between." },
      { name: "author", content: "OBJEKT" },
      { property: "og:title", content: "OBJEKT — Independent design studio" },
      { property: "og:description", content: "Identity, interface, and the spaces in between." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@OBJEKT" },
      { name: "theme-color", content: "#1a0f08" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "OBJEKT",
          description: "Independent design studio working at the seam of identity, interface and editorial.",
          url: "https://objekt.studio",
          foundingDate: "2026",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua das Flores 22",
            postalCode: "1200-194",
            addressLocality: "Lisboa",
            addressCountry: "PT",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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

import { ReactLenis } from 'lenis/react';
import { Toaster } from 'sonner';

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis root>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </ReactLenis>
      <Toaster 
        position="bottom-right" 
        theme="dark" 
        toastOptions={{ 
          className: 'font-mono text-base rounded-none border border-foreground/20 bg-background text-foreground' 
        }} 
      />
      <CommandMenu />
      <Cursor />
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
