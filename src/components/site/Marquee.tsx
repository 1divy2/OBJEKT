import { useReducedMotion } from "../../hooks/use-reduced-motion";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  const reducedMotion = useReducedMotion();
  return (
    <div className="overflow-hidden border-y border-foreground/20 bg-background py-6">
      <div className={`${reducedMotion ? "" : "marquee-track"} flex whitespace-nowrap`}>
        {row.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? "true" : undefined}
            className="text-display flex shrink-0 items-center pr-12 text-5xl md:text-7xl"
          >
            {t}
            <span className="ml-12 inline-block size-3 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
