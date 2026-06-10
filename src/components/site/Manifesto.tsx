import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

const lines = [
  ["We believe", "in slow software."],
  ["We design", "for the second look."],
  ["We charge", "for taste, not hours."],
  ["We sleep", "on every decision."],
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["10%", "-10%"]);
  // Tuning animation by capping the movement at center so it slows down when visible
  // Though `x` is perfectly linear. Wait, we can keep it simple as ["15%", "-15%"] to make it more noticeable without being crazy.

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 md:px-10">
      <header className="mb-16 flex items-end justify-between border-b border-foreground/20 pb-6">
        <p className="text-mono opacity-60">[ 003 — Manifesto ]</p>
        <p className="text-mono opacity-60">4 articles</p>
      </header>

      <motion.div style={{ x, willChange: reducedMotion ? "auto" : "transform" }} className="space-y-2 md:space-y-4">
        {lines.map(([a, b], i) => (
          <div
            key={i}
            className="text-display flex flex-wrap items-baseline gap-x-6 text-5xl md:text-[8rem]"
          >
            <span className="text-mono align-top text-base opacity-50" aria-hidden="true">
              0{i + 1}
            </span>
            <span>{a}</span>
            <span className="italic text-accent">{b}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
