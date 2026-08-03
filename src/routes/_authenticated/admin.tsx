import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, Loader2, LogOut, Mail, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Enquiry Dashboard — Prateek Kumar Singh" },
      { name: "description", content: "Private dashboard for reviewing portfolio enquiries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Enquiry Dashboard — Prateek Kumar Singh" },
      {
        property: "og:description",
        content: "Private dashboard for reviewing portfolio enquiries.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const enquiries = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("id, name, email, message, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="grid-bg min-h-screen px-5 py-16 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-label">// private</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Enquiry dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Messages submitted through the contact form, newest first.
            </p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {enquiries.isPending ? (
            <div className="glass flex items-center gap-3 p-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading enquiries...
            </div>
          ) : enquiries.isError ? (
            <div className="glass p-6">
              <ShieldAlert className="h-5 w-5 text-destructive" aria-hidden />
              <p className="mt-3 text-sm text-foreground">
                This account doesn't have admin access yet.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Grant the admin role to your account in the backend (user_roles table), then
                refresh.
              </p>
            </div>
          ) : enquiries.data.length === 0 ? (
            <div className="glass p-8 text-center">
              <Inbox className="mx-auto h-6 w-6 text-primary" aria-hidden />
              <p className="mt-3 text-sm text-muted-foreground">No enquiries yet.</p>
            </div>
          ) : (
            enquiries.data.map((e) => (
              <article key={e.id} className="glass glass-hover p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-foreground">{e.name}</h2>
                  <time className="font-mono text-[11px] text-muted-foreground">
                    {new Date(e.created_at).toLocaleString()}
                  </time>
                </div>
                <a
                  href={`mailto:${e.email}`}
                  className="mt-1 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {e.email}
                </a>
                <p className="mt-3 text-sm whitespace-pre-wrap text-muted-foreground">
                  {e.message}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}