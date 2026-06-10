import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="grid grid-cols-2 gap-8 px-6 py-16 md:grid-cols-12 md:px-10">
        <div className="col-span-2 md:col-span-6">
          <p className="text-mono opacity-60">[ Currently ]</p>
          <h2 className="text-display mt-4 text-5xl md:text-8xl">
            Open for
            <br />
            <span className="italic text-accent">freelance</span>.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-3">
          <p className="text-mono opacity-60">[ Studio ]</p>
          <address className="mt-4 not-italic leading-relaxed">
            Shobhagpura
            <br />
            Udaipur
            <br />
            Rajasthan
          </address>
        </div>
        <div className="col-span-1 md:col-span-3">
          <p className="text-mono opacity-60">[ Elsewhere ]</p>
          <ul className="mt-6 flex flex-wrap gap-4">
            <li key="github">
              <a
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-background/20 bg-background/5 transition-all hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href="https://github.com/1divy2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
            <li key="x">
              <a
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-background/20 bg-background/5 transition-all hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href="https://x.com/1divy2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit X profile"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </li>
            <li key="linkedin">
              <a
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-background/20 bg-background/5 transition-all hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href="https://www.linkedin.com/in/divy-dadheech-211050290/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-background/15 px-6 py-6 text-mono opacity-60 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Divy Dadheech. All work © respective clients.</p>
        <p>Made on a slow afternoon</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ↑ Top
        </button>
      </div>
    </footer>
  );
}
