import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Manifesto } from "@/components/site/Manifesto";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — OBJEKT" },
      { name: "description", content: "A studio of two. Lisbon-based. What we believe and how we work." },
      { property: "og:title", content: "Studio — OBJEKT" },
      { property: "og:description", content: "A studio of two. Lisbon-based." },
    ],
  }),
  component: StudioPage,
});

const team = [
  { name: "Inês Coutinho", role: "Partner / Type & systems", since: "since 2019" },
  { name: "Tomás Almeida", role: "Partner / Interface & motion", since: "since 2019" },
  { name: "Margarida Pires", role: "Producer", since: "since 2023" },
];

function StudioPage() {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <article>
          <header className="px-6 pb-20 pt-40 md:px-10 md:pt-48">
            <p className="text-mono opacity-60">[ The studio ]</p>
            <h1 className="text-display mt-6 text-[12vw] leading-[0.9] md:text-[8vw]">
              A small room <span className="italic">above a bakery</span>,
              <br />a long view of the <span className="text-accent">Tagus</span>.
            </h1>
            <div className="mt-16 grid grid-cols-12 gap-6 md:gap-8">
              <p className="col-span-12 max-w-2xl text-lg leading-relaxed md:col-span-7">
                OBJEKT was founded in 2019 by Inês Coutinho and Tomás Almeida after a
                decade of working inside agencies that never quite let them finish a
                sentence. The studio runs on coffee, deadlines we set ourselves, and a
                firm belief that the best brief is a long lunch.
              </p>
              <section aria-label="Our team" className="col-span-12 md:col-span-4 md:col-start-9">
                <ul className="space-y-6">
                  {team.map((m) => (
                    <li key={m.name} className="border-t border-foreground/20 pt-3">
                      <p className="text-display text-2xl">{m.name}</p>
                      <p className="text-mono opacity-60">{m.role}</p>
                      <p className="text-mono opacity-40">{m.since}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </header>
          <Manifesto />
          <Services />
        </article>
      </main>
      <Footer />
    </div>
  );
}
