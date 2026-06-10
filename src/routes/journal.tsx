import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { type JournalEntry } from "@/lib/types";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — OBJEKT" },
      { name: "description", content: "Occasional writing on type, identity, and the slow web." },
      { property: "og:title", content: "Journal — OBJEKT" },
      { property: "og:description", content: "Occasional writing from the studio." },
    ],
  }),
  component: JournalPage,
});

import { marked } from 'marked';
function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, content: markdown };
  
  const frontmatter = match[1];
  const content = match[2];
  
  const data: Record<string, string> = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    }
  });
  
  return { data, content: content.trim() };
}
import { format, parse } from 'date-fns';

function getReadingTime(text: string) {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
}

// Read all markdown files from the content directory
const mdFiles = import.meta.glob('../content/journal/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const entries = Object.entries(mdFiles).map(([path, rawContent]) => {
  const { data, content } = parseFrontmatter(rawContent);
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  
  let formattedDate = data.d || "Unknown";
  try {
    // If it's a string like "May 2026", format it nicely.
    const parsed = parse(formattedDate, 'MMM yyyy', new Date());
    formattedDate = format(parsed, 'MMM yyyy');
  } catch (e) {
    // leave as is
  }

  const readingTime = getReadingTime(content);

  return {
    n: data.n || "000",
    d: formattedDate,
    t: data.t || "Untitled",
    tag: data.tag || "Post",
    slug,
    content: content,
    html: marked.parse(content) as string,
    readingTime
  };
}).sort((a, b) => b.n.localeCompare(a.n));

function JournalPage() {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <header className="px-6 pb-16 pt-40 md:px-10 md:pt-48">
          <p className="text-mono opacity-60">[ The journal ]</p>
          <h1 className="text-display mt-6 text-[14vw] leading-[0.9] md:text-[10vw]">
            Notes from <span className="italic text-accent">the desk</span>.
          </h1>
        </header>
        <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
          {entries.map((e) => (
            <li key={e.n}>
              <Link to="/journal/$slug" params={{ slug: e.slug }} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-8 focus-visible:ring-offset-background">
                <article
                  className="group grid grid-cols-12 items-baseline gap-4 px-6 py-8 transition-colors hover:bg-foreground/5 md:px-10 md:py-12"
                >
                  <span className="text-mono col-span-2 opacity-60 md:col-span-1">{e.n}</span>
                  <div className="col-span-3 flex flex-col md:col-span-2">
                    <time className="text-mono opacity-60">{e.d}</time>
                    <span className="text-mono mt-1 text-xs opacity-40">{e.readingTime}</span>
                  </div>
                  <h2 className="text-display col-span-7 text-3xl transition-colors group-hover:text-accent md:col-span-7 md:text-5xl">
                    {e.t}
                  </h2>
                  <span className="text-mono col-span-12 text-right opacity-60 md:col-span-2">
                    {e.tag}
                  </span>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}