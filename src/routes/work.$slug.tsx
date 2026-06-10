import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { projects } from "@/components/site/WorkGrid";
import { slugify } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = projects.find((x) => slugify(x.client) === params.slug);
    if (!p) throw notFound();
    return { project: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.client} — OBJEKT` },
      { name: "description", content: `${loaderData?.project.title} · ${loaderData?.project.discipline}` },
      { property: "og:title", content: `${loaderData?.project.client} — OBJEKT` },
      { property: "og:description", content: loaderData?.project.title ?? "" },
      { property: "og:image", content: loaderData?.project.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <div className="px-6 pt-48 md:px-10">
        <p className="text-mono opacity-60">404</p>
        <h1 className="text-display mt-4 text-7xl">No such project.</h1>
        <Link to="/work" className="text-mono mt-8 inline-block underline">Back to work →</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="px-6 pt-48 md:px-10">
      <h1 className="text-display text-5xl">Something broke.</h1>
      <button onClick={reset} className="text-mono mt-4 underline">Try again</button>
    </div>
  ),
  component: CasePage,
});

function CasePage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.client === project.client);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <article>
        <nav aria-label="Breadcrumb" className="px-6 pb-4 pt-40 md:px-10 md:pt-48">
          <ol className="flex items-center gap-2 text-mono opacity-60">
            <li>
              <Link to="/work" className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Work</Link>
            </li>
            <li>/</li>
            <li aria-current="page" className="opacity-100">{project.client}</li>
          </ol>
        </nav>
        <header className="px-6 pb-12 pt-8 md:px-10 md:pt-8">
          <div className="flex items-end justify-between text-mono opacity-60">
            <span>[ Case {project.index} ]</span>
            <span>{project.year}</span>
          </div>
          <h1 className="text-display mt-8 text-[12vw] leading-[0.92] md:text-[8vw]">
            {project.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="italic text-accent">{project.title.split(" ").slice(-1)}</span>
          </h1>
          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-foreground/20 pt-8 md:grid-cols-4">
            {[
              ["Client", project.client],
              ["Discipline", project.discipline],
              ["Year", project.year],
              ["Studio", "OBJEKT, Lisbon"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-mono opacity-60">{k}</dt>
                <dd className="mt-2 text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <figure className="px-6 md:px-10">
          <img
            src={project.image}
            alt={project.alt}
            className="aspect-[4/5] w-full object-cover md:aspect-[16/9]"
          />
        </figure>

        <section className="grid grid-cols-12 gap-6 px-6 py-24 md:gap-8 md:px-10">
          <p className="text-mono col-span-12 opacity-60 md:col-span-3">[ The brief ]</p>
          <div className="col-span-12 space-y-6 text-xl leading-relaxed md:col-span-8 md:text-2xl">
            {project.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-12 gap-2 px-6 pb-24 md:gap-4 md:px-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative col-span-6 overflow-hidden aspect-[4/5] bg-bone md:col-span-3"
            >
              <img
                src={project.image}
                alt=""
                role="presentation"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  objectPosition: `${i * 22}% ${i * 17}%`,
                  filter: i % 2 ? "grayscale(1)" : undefined,
                }}
              />
            </div>
          ))}
        </section>

        <Link
          to="/work/$slug"
          params={{ slug: slugify(next.client) }}
          aria-label={`Next project: ${next.title} for ${next.client}`}
          className="group block border-t border-foreground/20 bg-foreground px-6 py-16 text-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent md:px-10"
        >
          <p className="text-mono opacity-60">Next ↓</p>
          <p className="text-display mt-4 text-5xl md:text-8xl">
            {next.client} <span className="italic opacity-60">{next.title}</span>
          </p>
        </Link>
        </article>
      </main>
      <Footer />
    </div>
  );
}