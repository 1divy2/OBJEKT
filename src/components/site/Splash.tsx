import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

export function Splash() {
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }
    const DURATION = 1400;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      setN(Math.floor(p * 100));
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 16);
    const fallback = setTimeout(() => {
      setDone(true);
    }, DURATION + 1200);
    return () => {
      clearInterval(id);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="splash"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-foreground p-6 text-background md:p-10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={n}
          aria-label="Loading OBJEKT"
        >
          <div className="flex items-center justify-between text-mono opacity-80">
            <span>OBJEKT®</span>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => {
                  setDone(true);
                }}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Skip
              </button>
              <span>Lisbon · MMXXVI</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-display text-[22vw] leading-[0.85] md:text-[14vw]">
              {String(n).padStart(3, "0")}
            </span>
            <span className="text-mono pb-4 opacity-80">Loading taste…</span>
          </div>
          <div className="relative h-px w-full bg-background/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${n}%` }}
              className="absolute inset-y-0 left-0 bg-accent"
            />
          </div>
        </motion.div>
      ) : (
        <div key="loaded" aria-live="polite" className="sr-only">
          Site loaded
        </div>
      )}
    </AnimatePresence>
  );
}