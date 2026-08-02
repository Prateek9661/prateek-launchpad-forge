import { useState } from "react";
import { Section, Reveal } from "./primitives";
import { Github, Linkedin, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CHANNELS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "prateek-kumar-singh",
    href: "https://www.linkedin.com/in/prateek-kumar-singh-6a7400383",
  },
  { icon: Github, label: "GitHub", value: "Prateek9661", href: "https://github.com/Prateek9661" },
];

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(2000, "Message is too long"),
});

const FIELD_CLASS =
  "mt-2 w-full rounded-lg border border-border/70 bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70";

function EnquiryForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof values) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    const { error } = await supabase.from("enquiries").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("Could not send your enquiry. Please try again.");
      return;
    }
    toast.success("Thanks! Your enquiry has been sent.");
    setValues({ name: "", email: "", message: "" });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass glow-ring p-6 md:p-8">
      <p className="mono-label">// send an enquiry</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="enq-name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            maxLength={100}
            placeholder="Your full name"
            className={FIELD_CLASS}
          />
          {errors["name"] ? (
            <p className="mt-1.5 text-xs text-destructive">{errors["name"]}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="enq-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="enq-email"
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            maxLength={255}
            placeholder="you@company.com"
            className={FIELD_CLASS}
          />
          {errors["email"] ? (
            <p className="mt-1.5 text-xs text-destructive">{errors["email"]}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="enq-message" className="text-sm font-medium text-foreground">
          Enquiry
        </label>
        <textarea
          id="enq-message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          maxLength={2000}
          placeholder="Tell me about the role, project or question you have in mind."
          className={`${FIELD_CLASS} resize-y`}
        />
        {errors["message"] ? (
          <p className="mt-1.5 text-xs text-destructive">{errors["message"]}</p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="h-4 w-4" aria-hidden />
        )}
        {loading ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      index="09"
      title="Get in touch"
      lead="Recruiters, mentors and fellow students are all welcome. If you have an internship, a code review, or a project that needs an extra pair of hands, I'll reply quickly."
    >
      <div className="grid gap-5 sm:grid-cols-2">
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
        <div className="mt-8">
          <EnquiryForm />
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
