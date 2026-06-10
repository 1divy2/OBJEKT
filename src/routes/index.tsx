import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WorkGrid } from "@/components/site/WorkGrid";
import { Manifesto } from "@/components/site/Manifesto";
import { Services } from "@/components/site/Services";
import { IndexLedger } from "@/components/site/Index";
import { Press } from "@/components/site/Press";
import { Splash } from "@/components/site/Splash";
import { Cursor } from "@/components/site/Cursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OBJEKT — Identity, interface, and the spaces in between" },
      { name: "description", content: "Identity, interface and editorial. An independent studio of two, taking four briefs a year." },
      { property: "og:title", content: "OBJEKT — Independent design studio" },
      { property: "og:description", content: "Identity, interface and editorial. Four briefs a year." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain bg-background text-foreground">
      <Splash />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main-content">
        <section aria-label="Hero">
          <Hero />
        </section>
        <section id="work" aria-label="Selected Work">
          <WorkGrid />
        </section>
        <section aria-label="Manifesto">
          <Manifesto />
        </section>
        <section aria-label="Services">
          <Services />
        </section>
        <section aria-label="Press">
          <Press />
        </section>
        <section aria-label="Index">
          <IndexLedger />
        </section>
      </main>
      <Footer />
    </div>
  );
}
