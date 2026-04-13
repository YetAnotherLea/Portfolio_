"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "projects";

  const navItems = [
    { id: "projects", label: "Projets" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="w-full border-b border-foreground/10 py-11.5 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <nav className="md:col-span-3 flex flex-row md:flex-col flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`?view=${item.id}`}
              className={`px-4 py-1 rounded-full border border-foreground transition-all text-l font-sans text-center w-[100px] ${
                currentView === item.id
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-foreground/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:col-span-6 font-sans text-xl md:text-1xl leading-tight">
          <p className="font-bold">Léa Ballester | Hello World :)</p>
          <hr className="border-foreground/10 mt-1 mb-1.5" />
          <p>
            Développeuse web full stack en apprentissage à Epitech Marseille, ce
            portfolio est un aperçu de mon travail et de mon évolution dans le
            développement web.
          </p>
        </div>

        <div className="md:col-span-3 font-sans text-sm md:text-right space-y-2">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
              Réseaux
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-1 decoration-foreground/20">
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-accent3 transition-colors text-xl underline underline-offset-4 hover:decoration-accent3"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/YetAnotherLea"
              target="_blank"
              className="hover:text-accent2 transition-colors text-xl underline underline-offset-4 hover:decoration-accent2"
            >
              GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="hover:text-primary transition-colors text-xl underline underline-offset-4 hover:decoration-primary"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
