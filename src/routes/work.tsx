import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WorkGrid } from "@/components/site/WorkGrid";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — OBJEKT" },
      { name: "description", content: "Selected work, 2024–2026. Identity, interface, editorial." },
      { property: "og:title", content: "Work — OBJEKT" },
      { property: "og:description", content: "Selected work, 2024–2026." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <header className="px-6 pb-16 pt-40 md:px-10 md:pt-48">
          <p className="text-mono opacity-60">[ Index of work ]</p>
          <h1 className="text-display mt-6 text-[14vw] leading-[0.9] md:text-[10vw]">
            Four briefs <span className="italic text-accent">a year</span>,
            <br />a few decades deep.
          </h1>
        </header>
        <WorkGrid />
      </main>
      <Footer />
    </div>
  );
}
