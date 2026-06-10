import { Marquee } from "./Marquee";

const rows = [
  { y: "2026", t: "Maison Aurélie — Identity", d: "Paris" },
  { y: "2026", t: "Nox Audio — Product UI", d: "Berlin" },
  { y: "2025", t: "Index Press — Quarterly", d: "Lisbon" },
  { y: "2025", t: "Edifício Norte — Wayfinding", d: "Porto" },
  { y: "2025", t: "Câmara — Visual system", d: "Madrid" },
  { y: "2024", t: "Slow Coffee Co. — Packaging", d: "Oslo" },
];

export function IndexLedger() {
  return (
    <section className="bg-foreground text-background">
      <Marquee
        items={[
          "Available Q3 2026",
          "Two briefs only",
          "No retainers",
          "Open source where possible",
        ]}
      />
      <div className="px-6 py-24 md:px-10">
        <header className="mb-10 flex items-end justify-between border-b border-background/20 pb-6">
          <p className="text-mono opacity-60">[ 005 — The ledger ]</p>
          <p className="text-mono opacity-60">Last 24 months</p>
        </header>
        <ol className="divide-y divide-background/15">
          {rows.map((r, i) => (
            <li
              key={i}
              className="group grid grid-cols-12 items-center gap-4 py-5 transition-colors hover:bg-accent hover:text-paper md:py-7"
            >
              <span className="text-mono col-span-2 opacity-60 group-hover:opacity-100 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-mono col-span-3 opacity-60 group-hover:opacity-100 md:col-span-2">
                {r.y}
              </span>
              <span className="text-display col-span-7 text-2xl md:col-span-7 md:text-4xl">
                {r.t}
              </span>
              <span className="text-mono col-span-12 text-right opacity-60 group-hover:opacity-100 md:col-span-2">
                {r.d}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
