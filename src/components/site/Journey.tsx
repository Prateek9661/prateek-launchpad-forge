import { Section, Reveal } from "./primitives";

const TIMELINE = [
  { t: "Started BCA", d: "Began formal computer science study and built a base in C." },
  { t: "Practiced Problem Solving", d: "Daily logic and data-structure practice." },
  { t: "Learned Java & OOP", d: "Classes, inheritance, interfaces, and clean structure." },
  { t: "Earned AI Certifications", d: "MongoDB AI track, Google and NSDC digital skills." },
  { t: "Exploring Modern Technologies", d: "AI agents, databases, and developer tooling." },
  { t: "Target: Software Engineer Internship", d: "Ready to contribute on a real team.", now: true },
];

export function Journey() {
  return (
    <Section
      id="journey"
      index="04"
      title="Learning journey"
      lead="The path so far, in the order it actually happened."
    >
      <ol className="relative ml-3 space-y-8 border-l border-border pl-8">
        {TIMELINE.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.05}>
            <li className="relative">
              <span
                className={`absolute top-1.5 -left-[41px] h-3.5 w-3.5 rounded-full border-2 ${
                  s.now ? "live-dot border-primary bg-primary" : "border-primary/60 bg-background"
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
  );
}
