import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Magnetic } from "./Magnetic";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

const WORDS = ["Form", "Feeling", "Function", "Friction"];

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0H0V80" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <div className="relative grid min-h-screen grid-cols-12 gap-6 px-6 pb-12 pt-32 md:gap-8 md:px-10 md:pt-40">
        <div className="col-span-12 flex items-center justify-between">
          <p className="text-mono opacity-60">[ 001 — A studio of two ]</p>
          <p className="text-mono opacity-60">Est. MMXXVI</p>
        </div>

        <h1 className="text-display col-span-12 mt-12 text-[18vw] leading-[0.88] md:mt-20 md:text-[14vw]">
          <span className="block overflow-hidden">
            <motion.span
              style={{ willChange: reducedMotion ? "auto" : "transform" }}
              initial={reducedMotion ? { y: 0 } : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="block"
            >
              Designed
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              style={{ willChange: reducedMotion ? "auto" : "transform" }}
              initial={reducedMotion ? { y: 0 } : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0.2 : 0.28 }}
              className="block pl-[8vw] italic"
            >
              for the
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-4">
            <motion.span
              style={{ willChange: reducedMotion ? "auto" : "transform" }}
              initial={reducedMotion ? { y: 0 } : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0.2 : 0.36 }}
              className="block text-accent"
            >
              slow web.
            </motion.span>
          </span>
        </h1>

        <div className="col-span-12 mt-auto grid grid-cols-12 gap-6 border-t border-background/20 pt-6 md:gap-8">
          <p className="col-span-12 max-w-xl text-base leading-relaxed text-background/80 md:col-span-5 md:col-start-1">
            OBJEKT is an independent studio working at the seam of identity,
            interface and editorial. We take on four projects a year. We answer
            our own emails.
          </p>
          <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:col-start-7 md:grid-cols-4">
            {WORDS.map((w, i) => (
              <motion.div
                key={w}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.6 + i * 0.08 }}
                className="border border-background/30 px-3 py-2 text-mono"
              >
                · {w}
              </motion.div>
            ))}
          </div>
          <div className="col-span-12 flex items-end justify-end md:col-span-3">
            <Magnetic>
              <Link
                to="/work"
                className="text-mono inline-flex items-center gap-2 border-b border-background/40 pb-1 transition-colors hover:text-accent hover:border-accent"
              >
                <span>See the work</span>
                <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
