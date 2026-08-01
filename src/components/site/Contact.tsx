import { Section, Reveal } from "./primitives";
import { Github, Linkedin, Mail } from "lucide-react";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "ukprateek9661@gmail.com",
    href: "mailto:ukprateek9661@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "prateek-kumar-singh",
    href: "https://www.linkedin.com/in/prateek-kumar-singh-6a7400383",
  },
  { icon: Github, label: "GitHub", value: "Prateek9661", href: "https://github.com/Prateek9661" },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="09"
      title="Get in touch"
      lead="Recruiters, mentors and fellow students are all welcome. If you have an internship, a code review, or a project that needs an extra pair of hands, I'll reply quickly."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass glass-hover block h-full p-6"
            >
              <c.icon className="h-5 w-5 text-primary" aria-hidden />
              <p className="mono-label mt-4">{c.label}</p>
              <p className="mt-2 text-sm break-words text-foreground">{c.value}</p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="glass glow-ring mt-8 bg-linear-to-r from-primary/12 via-transparent to-secondary/12 p-8 text-center md:p-12">
          <h3 className="text-2xl font-semibold text-gradient md:text-3xl">
            Let&apos;s build something meaningful together
          </h3>
          <a
            href="mailto:ukprateek9661@gmail.com"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="glass overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">bash</span>
          </div>
          <div className="px-4 py-5 font-mono text-[12px] leading-relaxed md:text-[13px]">
            <p className="text-muted-foreground">
              <span className="text-primary">&gt;</span> whoami
            </p>
            <p className="mt-2 text-foreground">Prateek Kumar Singh</p>
            <p className="text-muted-foreground">BCA Student | Aspiring Software Engineer</p>
            <p className="text-muted-foreground">
              Building the future, one line of code at a time.
            </p>
            <p className="mt-3 text-muted-foreground">
              <span className="text-primary">&gt;</span> <span className="caret">_</span>
            </p>
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
          © 2026 Prateek Kumar Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
