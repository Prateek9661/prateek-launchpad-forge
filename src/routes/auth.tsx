import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Prateek Kumar Singh" },
      { name: "description", content: "Private sign-in for the portfolio enquiry dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In — Prateek Kumar Singh" },
      {
        property: "og:description",
        content: "Private sign-in for the portfolio enquiry dashboard.",
      },
    ],
  }),
  component: AuthPage,
});

const FIELD =
  "mt-2 w-full rounded-lg border border-border/70 bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      navigate({ to: "/admin", replace: true });
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) navigate({ to: "/admin", replace: true });
    else toast.success("Check your email to confirm your account.");
  }

  return (
    <main className="grid-bg flex min-h-screen items-center justify-center px-5 py-20">
      <form onSubmit={onSubmit} className="glass glow-ring w-full max-w-md p-7 md:p-9">
        <LockKeyhole className="h-5 w-5 text-primary" aria-hidden />
        <p className="mono-label mt-4">// restricted area</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to review enquiries submitted through the contact form.
        </p>

        <div className="mt-6">
          <label htmlFor="auth-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className={FIELD}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="auth-password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="••••••••"
            className={FIELD}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center font-mono text-[11px] text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "> create the admin account" : "> back to sign in"}
        </button>
      </form>
    </main>
  );
}