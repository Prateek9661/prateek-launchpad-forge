import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Dashboard } from "@/components/site/Dashboard";
import { Contact, Footer } from "@/components/site/Contact";

const TITLE = "Prateek Kumar Singh — BCA Student & Aspiring Software Engineer";
const DESCRIPTION =
  "Portfolio of Prateek Kumar Singh: BCA student building C and Java projects, earning AI certifications, and preparing for a software engineering internship.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Prateek Kumar Singh",
          jobTitle: "BCA Student | Aspiring Software Engineer",
          address: { "@type": "PostalAddress", addressCountry: "India" },
          sameAs: [
            "https://github.com/Prateek9661",
            "https://www.linkedin.com/in/prateek-kumar-singh-6a7400383",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Dashboard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
