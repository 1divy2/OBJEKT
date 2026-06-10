import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type Service } from "@/lib/types";

const services: Service[] = [
  {
    n: "α",
    title: "Identity systems",
    body: "Wordmarks, type, motion, voice. We make brands that survive being printed small and worn often.",
    deliverables: ["Logo & wordmark", "Typeface direction", "Brand book (~80pp)", "Motion principles"],
  },
  {
    n: "β",
    title: "Interface & product",
    body: "Marketing sites, dashboards, the occasional native app. Built with React, written with care.",
    deliverables: ["Design system", "Marketing site", "Product UI", "Hand-off to engineering"],
  },
  {
    n: "γ",
    title: "Editorial & print",
    body: "Books, zines, newspapers, posters. We still spec papers and visit the printer.",
    deliverables: ["Art direction", "Typesetting", "Print supervision", "Distribution kit"],
  },
  {
    n: "δ",
    title: "Advisory",
    body: "For founders and in-house teams. Quarterly critique, hiring help, a second set of eyes.",
    deliverables: ["Monthly critique", "Hiring panel", "System audit", "On-call Slack"],
  },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-bone px-6 py-32 md:px-10">
      <header className="mb-12 flex items-end justify-between border-b border-foreground/30 pb-6">
        <p className="text-mono opacity-60">[ 004 — Capabilities ]</p>
        <p className="text-mono opacity-60">Pick two</p>
      </header>

      <ul className="divide-y divide-foreground/20 border-y border-foreground/20">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.n}>
              <button
                id={`service-trigger-${i}`}
                aria-controls={`service-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-12 items-center gap-4 py-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bone md:py-12"
                aria-expanded={isOpen}
              >
                <span className="text-display col-span-2 text-3xl italic md:col-span-1 md:text-5xl">
                  {s.n}
                </span>
                <span className="text-display col-span-8 text-3xl md:col-span-9 md:text-6xl">
                  {s.title}
                </span>
                <span
                  className={`col-span-2 justify-self-end text-2xl transition-transform duration-500 md:col-span-2 md:text-3xl ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`service-panel-${i}`}
                    role="region"
                    aria-labelledby={`service-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-6 pb-12 md:gap-8">
                      <p className="col-span-12 max-w-xl text-lg leading-relaxed md:col-span-6 md:col-start-2">
                        {s.body}
                      </p>
                      <ul className="col-span-12 space-y-2 md:col-span-4 md:col-start-9">
                        {s.deliverables.map((d) => (
                          <li key={d} className="text-mono flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-accent" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
