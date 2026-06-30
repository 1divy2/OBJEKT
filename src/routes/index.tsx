import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WorkGrid } from "@/components/site/WorkGrid";
import { Manifesto } from "@/components/site/Manifesto";
import { Services } from "@/components/site/Services";
import { IndexLedger } from "@/components/site/Index";
import { Press } from "@/components/site/Press";
import { Splash } from "@/components/site/Splash";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Footer } from "@/components/site/Footer";
import { useInView } from "motion/react";
import { useRef, useEffect } from "react";

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
  const workRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const pressRef = useRef<HTMLElement>(null);

  const workInView = useInView(workRef, { margin: "-20% 0px -20% 0px" });
  const manifestoInView = useInView(manifestoRef, { margin: "-20% 0px -20% 0px" });
  const servicesInView = useInView(servicesRef, { margin: "-20% 0px -20% 0px" });
  const pressInView = useInView(pressRef, { margin: "-20% 0px -20% 0px" });

  const isLight = workInView || manifestoInView || servicesInView || pressInView;

  return (
    <div className={`grain transition-colors duration-1000 ${isLight ? "bg-background text-foreground" : "bg-foreground text-background"}`}>
      <Splash />
      <ScrollProgress />
      <Nav />
      <main id="main-content">
        <section aria-label="Hero">
          <Hero />
        </section>
        <section ref={workRef} id="work" aria-label="Selected Work">
          <WorkGrid />
        </section>
        <section ref={manifestoRef} aria-label="Manifesto">
          <Manifesto />
        </section>
        <section ref={servicesRef} aria-label="Services">
          <Services />
        </section>
        <section ref={pressRef} aria-label="Press">
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
