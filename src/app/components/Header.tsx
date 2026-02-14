"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "projects";

  const navItems = [
    { id: "projects", label: "Projets" },
    { id: "skills", label: "Compétences" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="w-full border-b border-foreground/10 py-12 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* COLONNE 1 : Navigation (Verticale sur PC, Horizontale sur Mobile) */}
        <nav className="md:col-span-3 flex flex-row md:flex-col flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`?view=${item.id}`}
              className={`px-4 py-1 rounded-full border border-foreground transition-all text-sm font-sans w-fit ${
                currentView === item.id
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-foreground/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* COLONNE 2 : Présentation (Milieu) */}
        <div className="md:col-span-5 font-sans text-xl md:text-1xl leading-tight">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
            recusandae assumenda vitae labore perferendis nulla optio nam
            consequuntur totam fuga nesciunt harum, provident illum.
          </p>
        </div>

        {/* COLONNE 3 : Liens & Contact (Droite) */}
        <div className="md:col-span-4 font-sans text-sm md:text-right space-y-2">
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-tighter text-xs opacity-50">
              Plateformes
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-1 underline underline-offset-4 decoration-foreground/30">
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-accent2 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/YetAnotherLea"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/YetAnotherLea"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              Medium
            </a>
            <a
              href="https://github.com/YetAnotherLea"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
