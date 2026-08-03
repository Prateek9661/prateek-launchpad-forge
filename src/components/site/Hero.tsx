import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { EngineerEmblem } from "./EngineerEmblem";

const HEADLINE = "Building software foundations for tomorrow's technology.";

function useTyped(text: string, speed = 38) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [n, text.length, speed]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

const CODE = `const engineer = {
  name: "Prateek Kumar Singh",
  role: "BCA Student",
  stack: ["C", "Java", "GitHub"],
  learning: ["AI", "MongoDB", "Software Engineering"],
  mission: "Become a Software Engineer"
};`;

export function Hero() {
  const { shown, done } = useTyped(HEADLINE);

  return (
    <section id="top" className="hero-aura relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <div className="glass glow-ring relative mx-auto max-w-sm overflow-hidden p-3">
            <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-border/70 bg-linear-to-br from-secondary/25 via-background to-primary/15">
              <EngineerEmblem />
              <div className="absolute inset-x-0 bottom-0 border-t border-border/60 bg-background/70 px-4 py-3 backdrop-blur-md">
                <p className="font-mono text-[11px] text-muted-foreground">
                  <span className="text-primary">$</span> render --engineer --mode=3d
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-1 pb-1">
              <p className="font-mono text-xs text-muted-foreground">
                <MapPin className="mr-1 inline h-3 w-3 text-primary" aria-hidden />
                India
              </p>
              <div className="flex gap-2">
                <a
                  aria-label="GitHub"
                  href="https://github.com/Prateek9661"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/in/prateek-kumar-singh-6a7400383"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  aria-label="Send an enquiry"
                  href="#contact"
                  className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/8 px-3 py-1.5">
            <span className="live-dot h-2 w-2 rounded-full bg-primary" aria-hidden />
            <span className="font-mono text-[11px] tracking-wide text-primary">
              Available for internships and learning opportunities
            </span>
          </div>

          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold text-foreground md:text-6xl">
            {shown}
            {!done ? <span className="caret text-primary">|</span> : null}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            I'm Prateek Kumar Singh, a BCA student focused on programming fundamentals, software
            development, and continuous learning. I'm building projects, exploring modern
            technologies, and preparing for a career in software engineering.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/prateek-kumar-singh-resume.txt"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
            >
              Contact Me
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="glass mt-10 overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">engineer.ts</span>
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">
              <code>{CODE}</code>
            </pre>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-6xl px-5 md:px-8">
        <a
          href="#about"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          scroll to explore
        </a>
      </div>
    </section>
  );
}
