const quotes = [
  { q: "A studio with the rare courage to leave space.", who: "It's Nice That", year: "2025" },
  { q: "Quietly setting the bar for European brand work.", who: "Eye Magazine", year: "2025" },
  { q: "The kind of identity work you want to frame.", who: "Brand New", year: "2024" },
];

const wall = ["AIGA Pick", "Type Directors '25", "FWA of the Day", "ADC*E Silver", "Site Inspire", "Brand New"];

export function Press() {
  return (
    <section className="border-y border-foreground/15 bg-background px-6 py-24 md:px-10">
      <header className="mb-12 flex items-end justify-between border-b border-foreground/20 pb-6">
        <p className="text-mono opacity-60">[ 006 — Said about us ]</p>
        <p className="text-mono opacity-60">Press · Awards</p>
      </header>
      <ul className="grid gap-10 md:grid-cols-3">
        {quotes.map((q) => (
          <li key={q.who} className="border-l border-accent pl-5">
            <blockquote className="text-display text-2xl md:text-3xl">"{q.q}"</blockquote>
            <p className="text-mono mt-4 opacity-60">
              — <cite className="not-italic">{q.who}</cite>, {q.year}
            </p>
          </li>
        ))}
      </ul>
      <ul className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-foreground/20 pt-8">
        {wall.map((w) => (
          <li key={w} className="text-display text-2xl opacity-50 transition-opacity hover:opacity-100 md:text-3xl">
            {w}
          </li>
        ))}
      </ul>
    </section>
  );
}