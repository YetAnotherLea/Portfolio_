"use client";
import { useEffect, useState } from "react";

const navItems = [
  { id: "projects", label: "Projets" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

const socialLinks = [
  {
    key: "linkedin",
    href: "https://linkedin.com",
    label: "LinkedIn",
    accent: "hover:text-accent3 hover:decoration-accent3",
    Icon: LinkedInIcon,
  },
  {
    key: "github",
    href: "https://github.com/YetAnotherLea",
    label: "GitHub",
    accent: "hover:text-accent2 hover:decoration-accent2",
    Icon: GitHubIcon,
  },
  {
    key: "resume",
    href: "/resume.pdf",
    label: "Resume",
    accent: "hover:text-primary hover:decoration-primary",
    Icon: ResumeIcon,
  },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("projects");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-foreground/10 bg-background mb-10 transition-[padding] duration-300 ${
        isScrolled ? "py-3" : "py-11.5"
      }`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-12 transition-all duration-300 ${
          isScrolled ? "gap-3 items-center" : "gap-8 items-start"
        }`}
      >
        <nav
          className={`flex flex-row flex-wrap gap-2 transition-all duration-300 ${
            isScrolled ? "md:col-span-6" : "md:col-span-3 md:flex-col"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full border border-foreground transition-all font-sans text-center ${
                isScrolled ? "px-3 py-0.5 text-sm w-auto" : "px-4 py-1 text-l w-[100px]"
              } ${
                activeSection === item.id
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-foreground/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {!isScrolled && (
          <div className="md:col-span-6 font-sans text-xl md:text-1xl leading-tight">
            <p className="font-bold">Léa Ballester</p>
            <hr className="border-foreground/10 mt-1 mb-1.5" />
            <p>
              Développeuse web full stack en apprentissage à Epitech Marseille, ce
              portfolio est un aperçu de mon travail et de mon évolution dans le
              développement web.
            </p>
          </div>
        )}

        <div
          className={`font-sans text-sm md:text-right transition-all duration-300 ${
            isScrolled ? "md:col-span-6" : "md:col-span-3 space-y-2"
          }`}
        >
          {!isScrolled && (
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
                Réseaux
              </p>
            </div>
          )}

          <div
            className={`flex decoration-foreground/20 transition-all duration-300 ${
              isScrolled
                ? "flex-row items-center justify-end gap-4"
                : "flex-col md:items-end gap-1"
            }`}
          >
            {socialLinks.map(({ key, href, label, accent, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-colors ${accent} ${
                  isScrolled
                    ? "text-foreground"
                    : "text-xl underline underline-offset-4"
                }`}
              >
                {isScrolled ? <Icon className="w-5 h-5" /> : label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
