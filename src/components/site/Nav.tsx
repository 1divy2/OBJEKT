import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { useUiSounds } from "@/hooks/use-ui-sounds";

const links = [
  { to: "/", label: "Index" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [time, setTime] = useState("");
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { playHover } = useUiSounds();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (!mobileMenuOpen) {
      setHidden(y > 120 && y > prev);
    }
  });

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      >
        <div className="flex items-center justify-between px-6 py-5 text-paper md:px-10">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-background focus:text-foreground">Skip to content</a>
          <Link to="/" className="text-mono" onClick={() => setMobileMenuOpen(false)}>
            OBJEKT<span className="opacity-60">®</span>
          </Link>
          <nav aria-label="Primary" className="hidden gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={playHover}
                className="hover-underline text-mono opacity-80 transition-opacity hover:opacity-100"
                activeProps={{ className: "text-mono opacity-100" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden text-mono tabular-nums opacity-80 md:block">UDR · {time}</div>
          <button
            className="text-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-foreground px-6 text-background md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-display text-5xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  activeProps={{ className: "italic text-accent" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-12 text-mono tabular-nums opacity-60">UDR · {time}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
