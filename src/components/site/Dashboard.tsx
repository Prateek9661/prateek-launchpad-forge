import { Section, Reveal } from "./primitives";
import { Github, CheckCircle2 } from "lucide-react";

const LEARNING = [
  { t: "C practice", p: 78 },
  { t: "Java OOP", p: 64 },
  { t: "Git & GitHub", p: 70 },
  { t: "AI tools", p: 45 },
  { t: "MongoDB concepts", p: 40 },
  { t: "Problem solving", p: 72 },
];

const COMMITS = [
  { h: "a91f3c2", m: "feat(logic-sim): add XOR gate evaluation", w: "2 days ago" },
  { h: "7d4b8e1", m: "fix(records): guard against missing data file", w: "5 days ago" },
  { h: "1c60af9", m: "refactor(java-utils): extract Converter interface", w: "1 week ago" },
  { h: "b3e27d5", m: "docs: add build instructions to README", w: "1 week ago" },
];

const REASONS = [
  "Strong learning mindset",
  "Consistent self-study",
  "Growing programming foundation",
  "Quick adaptability",
  "Professional communication",
  "Long-term commitment to software engineering",
];

export function Dashboard() {
  return (
    <>
      <Section
        id="learning"
        index="06"
        title="Currently learning in public"
        lead="What I'm actively practicing this term, tracked openly."
      >
        <div className="glass p-6 md:p-8">
          <div className="flex items-center gap-2">
            <span className="live-dot h-2 w-2 rounded-full bg-primary" aria-hidden />
            <span className="font-mono text-[11px] tracking-wider text-primary uppercase">
              live learning
            </span>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING.map((l, i) => (
              <Reveal key={l.t} delay={i * 0.05}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{l.t}</p>
                  <p className="font-mono text-xs text-muted-foreground">{l.p}%</p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary to-secondary"
                    style={{ width: `${l.p}%` }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="github"
        index="07"
        title="GitHub activity"
        lead="Small commits, often. The repositories below are where the practice lives."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="glass overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                prateek@dev: ~/projects
              </span>
            </div>
            <div className="space-y-3 px-4 py-5 font-mono text-[12px] md:text-[13px]">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> git log --oneline --author=&quot;Prateek&quot;
              </p>
              {COMMITS.map((c) => (
                <p key={c.h} className="text-muted-foreground">
                  <span className="text-secondary">{c.h}</span> {c.m}{" "}
                  <span className="text-muted-foreground/60">({c.w})</span>
                </p>
              ))}
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> <span className="caret">_</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="glass p-6">
            <p className="mono-label">Contribution activity</p>
            <div className="mt-5 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
              {Array.from({ length: 140 }).map((_, i) => {
                const level = (i * 37) % 5;
                return (
                  <span
                    key={i}
                    className="aspect-square rounded-[2px] bg-primary"
                    style={{ opacity: 0.08 + level * 0.18 }}
                  />
                );
              })}
            </div>
            <p className="mt-4 font-mono text-[11px] text-muted-foreground">
              Illustrative heatmap — live graph on the profile.
            </p>
            <a
              href="https://github.com/Prateek9661"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" aria-hidden />
              View GitHub Profile
            </a>
          </Reveal>
        </div>
      </Section>

      <Section
        id="why"
        index="08"
        title="Why hire me"
        lead="What a team gets on day one, stated plainly."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r} delay={i * 0.05} className="glass glass-hover flex h-full gap-3 p-5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <p className="text-sm font-medium text-foreground">{r}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
