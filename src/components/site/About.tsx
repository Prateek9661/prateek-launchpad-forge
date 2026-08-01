import { Section, Reveal } from "./primitives";
import { Award, Braces, Cpu, Sparkles, Wrench } from "lucide-react";

const SKILLS = [
  { icon: Braces, title: "Programming", items: ["C", "Java"] },
  { icon: Wrench, title: "Tools & Platforms", items: ["GitHub", "VS Code", "Command Line Basics"] },
  {
    icon: Cpu,
    title: "Learning Areas",
    items: [
      "Artificial Intelligence",
      "MongoDB Ecosystem",
      "AI Agents",
      "Digital Skills",
      "Software Development Fundamentals",
    ],
  },
  {
    icon: Sparkles,
    title: "Core Strengths",
    items: ["Problem Solving", "Logical Thinking", "Consistent Learning", "Curiosity"],
  },
];

const CERTS = [
  {
    title: "AI and Innovation: How MongoDB Enables a Resilient AI Strategy",
    issuer: "MongoDB",
    detail: "Completed",
  },
  { title: "Building an App with Code Agents and MongoDB", issuer: "MongoDB", detail: "Completed" },
  { title: "Observability for AI Agents", issuer: "MongoDB", detail: "Completed" },
  { title: "Applied Digital Skills", issuer: "Grow with Google", detail: "Completed" },
  {
    title: "Digital Skills",
    issuer: "Skill India Digital Hub (NSDC)",
    detail: "Completed on 18 March 2025",
  },
];

export function About() {
  return (
    <>
      <Section id="about" index="01" title="A student engineer, building in the open">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal className="glass p-6 md:p-8">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                My BCA degree gave me a starting point, but most of what I know now came from
                sitting with a problem until the logic finally clicked. I started with C because I
                wanted to understand what actually happens underneath a program — memory, control
                flow, files — instead of only calling functions someone else wrote.
              </p>
              <p>
                From there I moved into Java and object-oriented design, which changed how I
                structure code: smaller pieces, clearer responsibilities, fewer surprises later. I
                practice consistently rather than in bursts, and I treat every bug as a reading
                assignment about the system I built.
              </p>
              <p>
                Outside coursework I take structured online programs — MongoDB's AI track, Google's
                Applied Digital Skills, NSDC's digital skills certification — to stay close to the
                tools teams actually use. The goal is specific: join a product-driven engineering
                team where I can contribute code, learn from review, and grow into a software
                engineer worth relying on.
              </p>
            </div>
            <blockquote className="mt-8 border-l-2 border-primary pl-5 font-display text-lg text-foreground md:text-xl">
              &ldquo;Learning today, engineering the future.&rdquo;
            </blockquote>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { k: "Degree", v: "BCA — in progress" },
              { k: "Focus", v: "Fundamentals + projects" },
              { k: "Certifications", v: "5 completed" },
              { k: "Looking for", v: "Internship / entry-level SWE" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06} className="glass glass-hover p-5">
                <p className="mono-label">{s.k}</p>
                <p className="mt-2 text-base font-medium text-foreground">{s.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="skills"
        index="02"
        title="Skill stack"
        lead="An honest map of what I use today, what I'm learning next, and the habits behind both."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.07} className="glass glass-hover h-full p-6">
              <g.icon className="h-5 w-5 text-primary" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-foreground">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="certifications"
        index="03"
        title="Certifications"
        lead="Structured programs completed alongside my degree — proof of self-directed learning beyond academics."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05} className="glass glass-hover h-full p-6">
              <div className="flex items-start gap-4">
                <span className="rounded-lg border border-primary/30 bg-primary/8 p-2.5">
                  <Award className="h-4 w-4 text-primary" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm leading-snug font-semibold text-foreground md:text-base">
                    {c.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    {c.issuer} · {c.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
