import { Section, Reveal } from "./primitives";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    name: "Digital Logic Simulator",
    tag: "Systems / Education",
    problem:
      "Logic gates are taught on paper, so students rarely see how an input change ripples through a circuit.",
    features: [
      "Logic gate simulation (AND, OR, NOT, XOR, NAND)",
      "Automatic truth table generation",
      "Step-by-step educational visualization",
    ],
    tech: ["C", "Logic Design"],
    learned:
      "Modelling a circuit as a data structure forced me to separate evaluation logic from output formatting — my first real taste of architecture.",
    next: "Add sequential circuits (flip-flops) and export truth tables to CSV.",
  },
  {
    name: "Student Record Management System",
    tag: "Data / CRUD",
    problem:
      "Small institutions still track student records in loose spreadsheets that are easy to corrupt and hard to search.",
    features: [
      "Add, search, update and delete records",
      "Persistent storage using file handling",
      "Validation and duplicate-roll-number checks",
    ],
    tech: ["C", "File Handling"],
    learned:
      "Handling partial writes and missing files taught me to design for failure paths before the happy path.",
    next: "Move storage to a binary index for faster lookups and add role-based access.",
  },
  {
    name: "Java Utility Suite",
    tag: "OOP / Tooling",
    problem:
      "Everyday conversions and number checks were scattered across throwaway scripts with duplicated logic.",
    features: [
      "Scientific calculator module",
      "Unit and number-system converter",
      "Number utilities (primes, factors, series)",
    ],
    tech: ["Java", "OOP"],
    learned:
      "Refactoring three scripts into one class hierarchy showed me the practical value of interfaces and reuse.",
    next: "Wrap the suite in a JavaFX interface and add unit tests with JUnit.",
  },
];

const TIMELINE = [
  { t: "Started BCA", d: "Began formal computer applications coursework." },
  { t: "Learned C Fundamentals", d: "Syntax, memory, control flow, and file handling." },
  { t: "Practiced Problem Solving", d: "Daily logic and data-structure practice." },
  { t: "Learned Java & OOP", d: "Classes, inheritance, interfaces, and clean structure." },
  { t: "Earned AI Certifications", d: "MongoDB AI track, Google and NSDC digital skills." },
  { t: "Building Real Projects", d: "Shipping small, complete tools end to end." },
  { t: "Exploring Modern Technologies", d: "AI agents, databases, and developer tooling." },
  { t: "Target: Software Engineer Internship", d: "Ready to contribute on a real team.", now: true },
];

export function Projects() {
  return (
    <>
      <Section
        id="projects"
        index="04"
        title="Featured projects"
        lead="Three builds documented the way I'd document them at work: the problem, the decisions, and what I'd change next."
      >
        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="glass glass-hover p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="mono-label">{p.tag}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
                    {p.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                  <p className="mono-label">Problem</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.problem}</p>
                </div>
                <div>
                  <p className="mono-label">Key features</p>
                  <ul className="mt-2 space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="mono-label">What I learned</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.learned}
                    </p>
                  </div>
                  <div>
                    <p className="mono-label">Next iteration</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.next}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Prateek9661"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-shadow hover:glow-ring"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Live demo — coming soon
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="journey"
        index="05"
        title="Learning journey"
        lead="The path so far, in the order it actually happened."
      >
        <ol className="relative ml-3 space-y-8 border-l border-border pl-8">
          {TIMELINE.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <li className="relative">
                <span
                  className={`absolute top-1.5 -left-[41px] h-3.5 w-3.5 rounded-full border-2 ${
                    s.now
                      ? "live-dot border-primary bg-primary"
                      : "border-primary/60 bg-background"
                  }`}
                  aria-hidden
                />
                <h3 className="text-base font-semibold text-foreground">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
