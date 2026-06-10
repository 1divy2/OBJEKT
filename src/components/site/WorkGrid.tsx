import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { type Project } from "@/lib/types";
import { slugify } from "@/lib/utils";
import work01 from "@/assets/work-01.jpg";
import work02 from "@/assets/work-02.jpg";
import work03 from "@/assets/work-03.jpg";
import work04 from "@/assets/work-04.jpg";

export const projects: Project[] = [
  {
    index: "01",
    title: "A second skin for silk",
    client: "Maison Aurélie",
    year: "2026",
    discipline: "Identity · Art direction",
    image: work01,
    alt: "Maison Aurélie identity showing silk texture",
    span: "md:col-span-7 md:row-span-2",
    content: [
      "Maison Aurélie came to us seeking more than just a monogram. They needed a visual language capable of translating the tactile weight of heavy silk into digital spaces.",
      "We spent three weeks researching historical French textile archives and experimenting with variable font weight axes that mimic the draping of fabric.",
      "The result is an identity system that breathes. It responds to interaction with a fluidity that feels distinctly analog, proving that luxury on the web doesn't have to be rigid."
    ],
  },
  {
    index: "02",
    title: "Concrete, but warm",
    client: "Edifício Norte",
    year: "2025",
    discipline: "Wayfinding",
    image: work02,
    alt: "Concrete brutalist architecture with warm lighting for Edifício Norte",
    span: "md:col-span-5",
    content: [
      "Edifício Norte is a brutalist cultural center in Porto. Its architecture is imposing and heavy, cast entirely in exposed concrete. The wayfinding system needed to guide visitors without shouting over the architecture.",
      "Our approach was rooted in high-contrast subtraction. Instead of applying signs to the walls, we designed a system of recessed typography and warmly lit brass panels that feel native to the building's original blueprints.",
      "The final execution acts as a silent concierge, providing clarity only when sought."
    ],
  },
  {
    index: "03",
    title: "A folded manifesto",
    client: "Index Press",
    year: "2025",
    discipline: "Editorial · Print",
    image: work03,
    alt: "Editorial layout with folded manifesto paper",
    span: "md:col-span-5",
    content: [
      "Index Press approaches publishing as an act of curation. For their inaugural manifesto, they wanted a printed artifact that felt less like a book and more like an object to be unfolded and discovered.",
      "We engineered a complex concertina fold that allows the text to be read linearly as a pamphlet or opened entirely into a cohesive A1 poster.",
      "Set exclusively in a sharp, workhorse sans-serif, the typographic grid holds tension across the folds, making the physical act of reading part of the editorial narrative."
    ],
  },
  {
    index: "04",
    title: "Heavy water",
    client: "Nox Audio",
    year: "2026",
    discipline: "Interface · Brand",
    image: work04,
    alt: "Sleek dark interface design for Nox Audio",
    span: "md:col-span-12",
    content: [
      "Nox Audio develops high-fidelity, industrial-grade synthesis hardware. Their digital presence, however, was noisy and fragmented. They asked us for a platform that reflected the precision of their instruments.",
      "We stripped the interface down to its raw mechanics. Using a strict monochromatic palette and monospaced data tables, we built an ecosystem that prioritizes technical specs and raw audio samples over marketing copy.",
      "Every interaction is snappy and deliberate, heavily utilizing reduced motion principles and deep contrast to mirror the physical tactility of turning a machined aluminum dial."
    ],
  },
];

export function WorkGrid() {
  return (
    <section className="px-6 py-24 md:px-10">
      <header className="mb-12 flex items-end justify-between border-b border-foreground/20 pb-6">
        <p className="text-mono opacity-60">[ 002 — Selected work ]</p>
        <p className="text-mono opacity-60">2024 → 2026</p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.index}
            className={`group relative overflow-hidden bg-bone ${p.span}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
          >
            <Link to="/work/$slug" params={{ slug: slugify(p.client) }} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bone">
              <div className="flex-1 overflow-hidden min-h-[400px]">
                <img
                  src={p.image}
                  alt={p.alt}
                  width={1280}
                  height={1600}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex shrink-0 items-end justify-between gap-6 p-5">
                <div>
                  <p className="text-mono opacity-60">
                    {p.index} / {p.discipline}
                  </p>
                  <h3 className="text-display mt-3 text-3xl md:text-4xl">
                    {p.title}
                  </h3>
                </div>
                <div className="text-right text-mono opacity-60">
                  <p>{p.client}</p>
                  <p>{p.year}</p>
                </div>
              </div>
            </Link>
            <span className="pointer-events-none absolute right-4 top-4 inline-flex translate-y-2 items-center gap-1 rounded-full bg-foreground px-3 py-1 text-mono text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Open ↗
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
