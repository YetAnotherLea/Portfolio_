"use client";

import { useEffect, useState } from "react";
import { GitHubRepo } from "@/app/lib/github";
import rncpData from "@/app/api/rncp.json";

export default function SectionProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(
    null,
  );
  const [hoveredProject, setHoveredProject] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const displayProject = selectedProject || hoveredProject;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="animate-pulse font-sans tracking-widest uppercase text-xs">
          Initialisation de la base de données...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 min-h-[600px] mb-20 items-start">
      {/* COLONNE GAUCHE */}
      <div className="hidden md:block md:col-span-7 sticky top-32 h-[400px] z-10">
        <div className="w-full h-[350px] border border-foreground/10 bg-foreground/[0.02] overflow-hidden rounded-sm transition-all duration-500">
          {displayProject ? (
            <img
              key={displayProject.id}
              src={`https://raw.githubusercontent.com/YetAnotherLea/${displayProject.name}/main/preview.webp`}
              alt={`Aperçu de ${displayProject.name}`}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x450/4e4a40/FFFDFA?text=Aperçu+indisponible";
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-foreground/20 text-[10px] uppercase tracking-[0.2em] font-sans px-10 text-center">
              Sélectionnez un projet pour voir les détails
            </div>
          )}
        </div>
      </div>

      {/* COLONNE DROITE */}
      <div className="md:col-span-5 flex flex-col pt-2">
        {selectedProject ? (
          /* VUE DÉTAIL DU PROJET */
          <div className="animate-in slide-in-from-right-4 fade-in duration-500 space-y-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-[10px] font-sans uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all opacity-60 hover:opacity-100 mb-8"
            >
              ← Retour à la liste
            </button>

            {/* IMAGE UNIQUEMENT SUR MOBILE */}
            <div className="md:hidden w-full aspect-video border border-foreground/10 bg-foreground/[0.02] rounded-sm overflow-hidden mb-8">
              <img
                src={`https://raw.githubusercontent.com/YetAnotherLea/${selectedProject.name}/main/preview.webp`}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x400/4e4a40/FFFDFA?text=Aperçu+indisponible";
                }}
              />
            </div>

            {/* Infos du projet */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter uppercase leading-none">
                {selectedProject.name}
              </h2>

              {/* TAGS CLASSIQUES (Technos, hors RNCP) */}
              <div className="flex gap-2 flex-wrap">
                {selectedProject.topics
                  .filter((topic) => !topic.startsWith("rncp"))
                  .map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] border border-foreground/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans"
                    >
                      #{topic}
                    </span>
                  ))}
              </div>

              <p className="text-xl leading-relaxed font-body text-foreground/90 max-w-xl">
                {selectedProject.description ||
                  "Ce projet GitHub ne contient pas encore de description détaillée."}
              </p>

              {/* LIENS DU PROJET */}
              <div className="flex gap-10 pt-8 border-t border-foreground/10">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase opacity-40 font-sans tracking-widest">
                    Accès au projet
                  </span>
                  <a
                    href={selectedProject.html_url}
                    target="_blank"
                    className="font-sans text-sm font-bold underline underline-offset-4 hover:text-accent2 transition-colors"
                  >
                    SOURCE_CODE
                  </a>
                  {selectedProject.homepage && (
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      className="font-sans text-sm font-bold underline underline-offset-4 hover:text-accent1 transition-colors"
                    >
                      LIVE_DEMO
                    </a>
                  )}
                </div>
              </div>

              {/* BLOC RNCP DYNAMIQUE */}
              {selectedProject.topics.some((topic) =>
                topic.startsWith("rncp"),
              ) && (
                <div className="pt-8 border-t border-foreground/10 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[9px] uppercase opacity-40 font-sans tracking-widest">
                      Compétences validées
                    </span>
                    <a
                      href="https://www.francecompetences.fr/recherche/rncp/38436/"
                      target="_blank"
                      className="text-[10px] bg-foreground/5 px-2 py-1 rounded-sm hover:bg-foreground/10 transition-colors font-sans uppercase tracking-widest"
                    >
                      Titre RNCP
                    </a>
                  </div>

                  <ul className="space-y-3">
                    {selectedProject.topics
                      .filter((topic) => topic.startsWith("rncp"))
                      .map((rncpTag) => {
                        // On cherche l'ID en ignorant la casse (minuscules/majuscules)
                        const skill = rncpData.skills.find(
                          (s) => s.id.toLowerCase() === rncpTag.toLowerCase(),
                        );

                        if (!skill) return null; // Sécurité si le tag n'existe pas dans le JSON

                        return (
                          <li
                            key={skill.id}
                            className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 p-4 border border-foreground/5 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-colors rounded-sm"
                          >
                            <span className="text-xs font-mono font-bold text-primary whitespace-nowrap opacity-80">
                              {skill.id}
                            </span>
                            <p className="text-sm font-body text-foreground/80 leading-snug">
                              {skill.description_fr}
                            </p>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* VUE LISTE DES PROJETS */
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-4 px-2">
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
                Index des projets
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
                {projects.length} / Total
              </span>
            </div>

            <ul className="divide-y divide-foreground/10 border-t border-b border-foreground/10">
              {projects.map((project) => (
                <li
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer py-5 md:py-6 flex justify-between items-center hover:px-4 transition-all duration-300 ease-out"
                >
                  <h3 className="text-xl md:text-2xl font-sans font-medium tracking-tight group-hover:italic group-hover:translate-x-2 transition-transform duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-mono opacity-30 uppercase group-hover:opacity-100 transition-opacity">
                      {project.language || "Concept"}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-xl font-light">
                      →
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* FILIGRANE */}
      <div className="fixed z-0 left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 pointer-events-none z-0 select-none">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 pointer-events-none z-0 select-none">
          <h3 className="text-[20vw] lg:text-[14rem] font-body font-black uppercase leading-[0.7] opacity-[0.03] whitespace-nowrap">
            Projets
          </h3>
        </div>
      </div>
    </div>
  );
}
