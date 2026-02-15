"use client";

import { useState } from "react";

export default function SectionSkills() {
  const [activeTab, setActiveTab] = useState(0);

  const skillGroups = [
    {
      title: "Core Development",
      role: "Architecte Frontend & Backend",
      tech: [
        "HTML / CSS",
        "Sass",
        "Tailwind CSS",
        "Javascript",
        "React",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "Node.js",
        "PHP",
        "Symphony",
      ],
      description:
        "Conception d'applications web scalables privilégiant la performance et l'expérience utilisateur.",
    },
    {
      title: "Cloud & Ops",
      role: "Infrastructure & Securité",
      tech: ["Docker", "VPS OVH", "Plesk", "Hostinger", "Cloudflare", "SMTP"],
      description:
        "Maîtrise du cycle de déploiement, de la sécurisation des serveurs et de l'optimisation des flux de données.",
    },
    {
      title: "CMS Specialist",
      role: "WordPress & Low-Code",
      tech: ["Custom Themes", "Elementor", "ACF Pro", "Plugins", "Headless"],
      description:
        "Transformation de WordPress en un véritable outil métier sur-mesure, avec une sécurité renforcée.",
    },
    {
      title: "Engineering Tools",
      role: "Workflow & Qualité",
      tech: [
        "Git",
        "Fork",
        "Postman",
        "Jira",
        "Asana",
        "Notion",
        "Figma",
        "Ubuntu",
        "MacOS",
        "Windows",
      ],
      description:
        "Utilisation rigoureuse des standards de l'industrie pour un code documenté, testé et un travail d'équipe fluide.",
    },
  ];

  return (
    <section className="relative w-full pt-2 min-h-[calc(100vh-270px)] flex flex-col justify-between overflow-hidden">
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* COLONNE GAUCHE */}
        <div className="lg:col-span-6 space-y-4">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveTab(i)}
              className="group cursor-pointer border-b border-foreground/5 pb-6 transition-all"
            >
              <div className="flex items-baseline gap-6">
                <span
                  className={`text-xs font-sans transition-all duration-500 ${activeTab === i ? "opacity-100 text-primary" : "opacity-20"}`}
                >
                  (0{i + 1})
                </span>
                <h3
                  className={`text-2xl md:text-4xl font-sans font-black uppercase tracking-tighter transition-all duration-500 ${activeTab === i ? "translate-x-4 italic" : "opacity-40 group-hover:opacity-100"}`}
                >
                  {group.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* COLONNE DROITE */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="min-h-[300px] flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 key={activeTab}">
            <div>
              <p className="text-primary font-sans text-xs uppercase tracking-widest mb-2 font-bold">
                {skillGroups[activeTab].role}
              </p>
              <p className="text-xl md:text-2xl font-body leading-tight opacity-80">
                {skillGroups[activeTab].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {skillGroups[activeTab].tech.map((t) => (
                <span
                  key={t}
                  className="text-sm font-sans px-4 py-2 border border-foreground/10 bg-foreground/[0.02] uppercase tracking-tighter font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FILIGRANE */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 pointer-events-none z-0 select-none">
        <h3 className="text-[22vw] lg:text-[18rem] font-sans font-black uppercase leading-[0.7] opacity-[0.03] whitespace-nowrap">
          Skills
        </h3>
      </div>
    </section>
  );
}
