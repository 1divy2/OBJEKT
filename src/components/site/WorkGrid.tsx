import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
    title: "The path of Asura",
    client: "Zoro",
    year: "2026",
    discipline: "Identity · Art direction",
    image: work01,
    alt: "Zoro's three-sword style abstract representation",
    span: "md:col-span-7 md:row-span-2",
    content: [
      "Zoro came to us seeking more than just a crest. He needed a visual language capable of translating the immense weight of his three-sword style into digital spaces.",
      "We spent three weeks researching historical samurai disciplines and experimenting with variable font weight axes that mimic the precision of a masterful slash.",
      "The result is an identity system that bleeds aura. It responds to interaction with a fluidity that feels distinctly lethal, proving that sheer willpower on the web doesn't have to be rigid."
    ],
  },
  {
    index: "02",
    title: "Culinary heat",
    client: "Sanji",
    year: "2025",
    discipline: "Wayfinding",
    image: work02,
    alt: "Warm, fiery abstract for Sanji's culinary style",
    span: "md:col-span-5",
    content: [
      "Sanji's culinary mastery is rooted in precision and extreme heat. His digital presence, much like the Baratie, needed to guide visitors without shouting over the food.",
      "Our approach was rooted in high-contrast subtraction. Instead of applying chaotic elements, we designed a system of recessed typography and warmly lit panels that feel native to a high-end kitchen.",
      "The final execution acts as a silent concierge, providing clarity only when sought, much like a perfect maître d'."
    ],
  },
  {
    index: "03",
    title: "Navigating the Grand Line",
    client: "Nami",
    year: "2025",
    discipline: "Editorial · Print",
    image: work03,
    alt: "Cartography layout representing Nami's navigation skills",
    span: "md:col-span-5",
    content: [
      "Nami approaches cartography as an act of absolute precision. For her definitive map of the Grand Line, she wanted a digital artifact that felt less like a simple image and more like an object to be uncovered.",
      "We engineered a complex interactive fold that allows the data points to be read linearly as a logbook or opened entirely into a cohesive, weather-reactive poster.",
      "Set exclusively in a sharp, workhorse sans-serif, the typographic grid holds tension across the storm lines, making the physical act of exploring the map part of the narrative."
    ],
  },
  {
    index: "04",
    title: "Gear Fifth",
    client: "Luffy",
    year: "2026",
    discipline: "Interface · Brand",
    image: work04,
    alt: "Joyboy thematic interface design for Luffy",
    span: "md:col-span-12",
    content: [
      "Monkey D. Luffy represents pure, unadulterated freedom. His digital presence, however, was chaotic and fragmented. He asked us for a platform that reflected the boundlessness of the Sun God Nika.",
      "We stripped the interface down to its most joyous mechanics. Using a dynamic, hyper-elastic layout and bouncing data tables, we built an ecosystem that prioritizes freedom of movement over rigid structures.",
      "Every interaction is snappy and deliberate, heavily utilizing exaggerated motion principles and deep contrast to mirror the physical tactility of absolute liberation."
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
          <ProjectCard key={p.index} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index: i }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.article
      ref={ref}
      className={`group relative overflow-hidden bg-bone ${p.span}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
    >
      <Link to="/work/$slug" params={{ slug: slugify(p.client) }} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bone">
        <div className="flex-1 overflow-hidden min-h-[400px]">
          <motion.img
            style={{ y, scale: 1.15 }}
            src={p.image}
            alt={p.alt}
            width={1280}
            height={1600}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.2]"
          />
        </div>
        <div className="flex shrink-0 items-end justify-between gap-6 p-5 relative z-10 bg-bone">
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
      <span className="pointer-events-none absolute right-4 top-4 z-20 inline-flex translate-y-2 items-center gap-1 rounded-full bg-foreground px-3 py-1 text-mono text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        Open ↗
      </span>
    </motion.article>
  );
}
