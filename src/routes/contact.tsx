import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Magnetic } from "@/components/site/Magnetic";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useUiSounds } from "@/hooks/use-ui-sounds";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OBJEKT" },
      { name: "description", content: "Tell us about a project. We answer within 48 hours." },
      { property: "og:title", content: "Contact — OBJEKT" },
      { property: "og:description", content: "Tell us about a project." },
    ],
  }),
  component: ContactPage,
});

const scopes = ["Identity", "Interface", "Editorial", "Advisory"];
const budgets = ["< 15k", "15–40k", "40–90k", "90k +"];

function ContactPage() {
  const [scope, setScope] = useState<string[]>(["Identity"]);
  const [budget, setBudget] = useState("15–40k");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const { playSuccess } = useUiSounds();

  useEffect(() => {
    if (sent) {
      setTimeout(() => successRef.current?.focus(), 100);
    }
  }, [sent]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "That email looks off.";
    if (brief.trim().length < 20) next.brief = "A little more detail, please.";
    if (scope.length === 0) next.scope = "Pick at least one scope.";
    setErrors(next);

    if (Object.keys(next).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "YOUR_ACCESS_KEY_HERE",
            name,
            email,
            brief,
            scope: scope.join(", "),
            budget,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSent(true);
          playSuccess();
          toast.success("Brief received.", { description: "We'll be in touch within 48 hours." });
        } else {
          setErrors({ form: result.message || "Something went wrong." });
          toast.error("Something went wrong.", { description: result.message });
        }
      } catch (err) {
        setErrors({ form: "Network error. Please try again." });
        toast.error("Network error.", { description: "Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleScope = (s: string) =>
    setScope((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
    );

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content" className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <p className="text-mono opacity-60">[ Start a conversation ]</p>
        <h1 className="text-display mt-6 text-[14vw] leading-[0.9] md:text-[9vw]">
          Tell us <span className="italic text-accent">everything</span>.
        </h1>

        <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 border-t border-foreground/20 pt-12"
          >
            <p className="text-mono opacity-60">[ Received ]</p>
            <h2 ref={successRef} tabIndex={-1} className="text-display mt-6 text-6xl outline-none md:text-8xl focus-visible:ring-2 focus-visible:ring-accent">
              Merci, {name.split(" ")[0] || "friend"}. <span className="italic text-accent">We'll write back.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg opacity-70">
              Inês reads every brief over morning coffee. Expect a real reply within 48 hours — never an autoresponder.
            </p>
          </motion.div>
        ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-20 grid grid-cols-12 gap-8 border-t border-foreground/20 pt-12"
        >
          <Field label="01 / Your name" col="md:col-span-6" htmlFor="contact-name">
            <input
              id="contact-name"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Camille Doré"
              className="w-full border-0 border-b border-foreground/30 bg-transparent pb-3 text-2xl outline-none transition-colors focus:border-accent md:text-3xl"
            />
            {errors.name && <p id="name-error" role="alert" className="text-mono mt-2 text-accent">{errors.name}</p>}
          </Field>
          <Field label="02 / Email" col="md:col-span-6" htmlFor="contact-email">
            <input
              id="contact-email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="camille@studio.fr"
              className="w-full border-0 border-b border-foreground/30 bg-transparent pb-3 text-2xl outline-none transition-colors focus:border-accent md:text-3xl"
            />
            {errors.email && <p id="email-error" role="alert" className="text-mono mt-2 text-accent">{errors.email}</p>}
          </Field>

          <Field label="03 / Scope (pick any)" col="md:col-span-7">
            <div role="group" aria-label="Scope" className="flex flex-wrap gap-2">
              {scopes.map((s) => {
                const on = scope.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleScope(s)}
                    className={`text-mono rounded-full border px-4 py-2 transition-all ${
                      on
                        ? "border-accent bg-accent text-paper"
                        : "border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    {on ? "● " : "○ "}
                    {s}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="04 / Budget (EUR)" col="md:col-span-5">
            <div role="group" aria-label="Budget" className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  aria-pressed={budget === b}
                  onClick={() => setBudget(b)}
                  className={`text-mono rounded-full border px-4 py-2 transition-all ${
                    budget === b
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/30"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </Field>

          <Field label="05 / The brief" col="md:col-span-12" htmlFor="contact-brief">
            <textarea
              id="contact-brief"
              required
              aria-required="true"
              aria-invalid={!!errors.brief}
              aria-describedby={errors.brief ? "brief-error" : undefined}
              rows={5}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="A few sentences. Links welcome."
              className="w-full resize-none border-0 border-b border-foreground/30 bg-transparent pb-3 text-2xl outline-none transition-colors focus:border-accent md:text-3xl"
            />
            {errors.brief && <p id="brief-error" role="alert" className="text-mono mt-2 text-accent">{errors.brief}</p>}
            {errors.form && <p role="alert" className="text-mono mt-4 text-accent">{errors.form}</p>}
          </Field>

          <div className="col-span-12 mt-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="text-mono opacity-60">
              We read everything within 48h. No autoresponders.
            </p>
            <Magnetic>
              <button
                type="submit"
                aria-busy={isSubmitting}
                className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 text-background transition-colors hover:bg-accent disabled:opacity-50"
                disabled={isSubmitting}
              >
                <span className="text-mono">{isSubmitting ? "Sending..." : "Send brief"}</span>
                <span className="text-display text-2xl italic transition-transform group-hover:translate-x-1">→</span>
              </button>
            </Magnetic>
          </div>
        </motion.form>
        )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  col,
  children,
  htmlFor,
}: {
  label: string;
  col: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className={`col-span-12 block ${col}`}>
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-mono block opacity-60">
          {label}
        </label>
      ) : (
        <span className="text-mono block opacity-60">
          {label}
        </span>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}
