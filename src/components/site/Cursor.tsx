import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setEnabled(mql.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let activeMagnet: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      if (activeMagnet) {
        const r = activeMagnet.getBoundingClientRect();
        const centerX = r.left + r.width / 2;
        const centerY = r.top + r.height / 2;
        x.set(centerX + (e.clientX - centerX) * 0.2);
        y.set(centerY + (e.clientY - centerY) * 0.2);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
    };
    
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const magnet = t?.closest("a, button, [data-magnet]") as HTMLElement | null;
      setActive(!!magnet);
      activeMagnet = magnet;
    };
    
    const leave = () => {
      setActive(false);
      activeMagnet = null;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mouseout", leave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", leave);
    };
  }, [enabled, x, y]);

  if (reducedMotion || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
    >
      <motion.div
        animate={{ scale: active ? 2.4 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="-ml-1.5 -mt-1.5 size-3 rounded-full bg-white"
      />
    </motion.div>
  );
}