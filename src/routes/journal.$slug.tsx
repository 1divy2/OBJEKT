import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { entries } from "./journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const entry = entries.find((x) => x.slug === params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.entry.t} — OBJEKT Journal` },
      { name: "description", content: `Read ${loaderData?.entry.t} from the OBJEKT Journal.` },
    ],
  }),
  notFoundComponent: () => (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <div className="px-6 pt-48 md:px-10">
        <p className="text-mono opacity-60">404</p>
        <h1 className="text-display mt-4 text-7xl">No such entry.</h1>
        <Link to="/journal" className="text-mono mt-8 inline-block underline">Back to journal →</Link>
      </div>
    </div>
  ),
  component: EntryPage,
});

function EntryPage() {
  const { entry } = Route.useLoaderData();

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <article>
          <nav aria-label="Breadcrumb" className="px-6 pb-4 pt-40 md:px-10 md:pt-48">
            <ol className="flex items-center gap-2 text-mono opacity-60">
              <li>
                <Link to="/journal" className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Journal</Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="opacity-100">{entry.t}</li>
            </ol>
          </nav>
          
          <header className="px-6 pb-12 pt-8 border-b border-foreground/20 md:px-10 md:pt-8">
            <div className="flex items-end justify-between text-mono opacity-60">
              <span>[ {entry.n} ]</span>
              <span>{entry.d}</span>
            </div>
            <h1 className="text-display mt-8 text-[10vw] leading-[0.95] md:text-[6vw] max-w-5xl">
              {entry.t}
            </h1>
            <p className="text-mono mt-8 opacity-60">{entry.tag}</p>
          </header>

          <section className="px-6 py-16 md:py-24 md:px-10">
            <div 
              className="prose prose-invert prose-lg mx-auto max-w-3xl space-y-8 leading-relaxed md:text-xl [&>p]:mb-8 [&>h2]:text-3xl [&>h2]:text-display [&>h2]:mb-4"
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          </section>

          <div className="px-6 pb-24 md:px-10">
            <div className="mx-auto max-w-3xl">
              <Link to="/journal" className="text-mono group inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <span className="transition-transform group-hover:-translate-x-1">←</span> Back to journal
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
