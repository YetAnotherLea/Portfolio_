"use client";

import { useState } from "react";
import { GitHubRepo } from "@/app/lib/github";
import rncpData from "@/app/api/rncp.json";
import Watermark from "@/app/components/Watermark";

const blocs = [
  { code: "RNCP38436BC01", title: "Conception" },
  { code: "RNCP38436BC02", title: "Développement" },
  { code: "RNCP38436BC03", title: "Évolution" },
];

function FilterButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border border-foreground px-3 py-1.5 md:py-0.5 text-sm font-sans transition-colors ${
        active
          ? "bg-foreground text-background"
          : "bg-transparent text-foreground hover:bg-foreground/5"
      }`}
    >
      {children}
      <span className="ml-1 opacity-60">({count})</span>
    </button>
  );
}

/* Sur mobile : une seule ligne défilable horizontalement (avec fondu à droite).
   À partir de md : retour à la ligne classique. */
function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <span className="md:w-20 shrink-0 text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
        {label}
      </span>
      <div className="relative min-w-0 flex-1">
        <div className="flex gap-2 overflow-x-auto pr-8 md:pr-0 md:flex-wrap md:overflow-visible snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:snap-start">
          {children}
        </div>
        <div
          aria-hidden="true"
          className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </div>
  );
}

export default function SectionRncp({ projects }: { projects: GitHubRepo[] }) {
  const [activeBloc, setActiveBloc] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  const covers = (project: GitHubRepo, skillId: string) =>
    project.topics.includes(skillId.toLowerCase());

  const countCovered = (bloc: string | null, projectName: string | null) =>
    rncpData.skills.filter(
      (skill) =>
        (!bloc || skill.bloc === bloc) &&
        projects.some(
          (project) =>
            (!projectName || project.name === projectName) &&
            covers(project, skill.id),
        ),
    ).length;

  const rncpProjects = projects
    .filter((project) => countCovered(null, project.name) > 0)
    .sort((a, b) => countCovered(null, b.name) - countCovered(null, a.name));

  const projectsFor = (skillId: string) =>
    rncpProjects.filter((project) => covers(project, skillId));

  const skills = rncpData.skills.filter(
    (skill) =>
      (!activeBloc || skill.bloc === activeBloc) &&
      (!activeProject ||
        projectsFor(skill.id).some((project) => project.name === activeProject)),
  );

  return (
    <div className="relative w-full pt-2 overflow-hidden">
      <div className="relative z-10 mb-20">
        <div className="flex flex-col gap-4 pb-6">
          <a
            href="https://www.francecompetences.fr/recherche/rncp/38436/"
            target="_blank"
            className="self-start md:self-end text-[10px] bg-foreground/5 px-2 py-1 rounded-sm hover:bg-foreground/10 transition-colors font-sans uppercase tracking-widest"
          >
            Titre RNCP 38436
          </a>

          <FilterRow label="Bloc">
            <FilterButton
              active={!activeBloc}
              onClick={() => setActiveBloc(null)}
              count={countCovered(null, activeProject)}
            >
              Tous
            </FilterButton>
            {blocs.map((bloc, i) => (
              <FilterButton
                key={bloc.code}
                active={activeBloc === bloc.code}
                onClick={() => setActiveBloc(bloc.code)}
                count={countCovered(bloc.code, activeProject)}
              >
                <span className="font-mono text-[10px] mr-2 opacity-60">BC0{i + 1}</span>
                {bloc.title}
              </FilterButton>
            ))}
          </FilterRow>

          <FilterRow label="Projet">
            <FilterButton
              active={!activeProject}
              onClick={() => setActiveProject(null)}
              count={countCovered(activeBloc, null)}
            >
              Tous
            </FilterButton>
            {rncpProjects.map((project) => (
              <FilterButton
                key={project.id}
                active={activeProject === project.name}
                onClick={() => setActiveProject(project.name)}
                count={countCovered(activeBloc, project.name)}
              >
                {project.name}
              </FilterButton>
            ))}
          </FilterRow>
        </div>

        {skills.length > 0 ? (
          <ul
            key={`${activeBloc}-${activeProject}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-foreground/10 animate-in fade-in duration-500"
          >
            {skills.map((skill) => {
              const linkedProjects = projectsFor(skill.id);
              const isOpen = openSkill === skill.id;
              const panelId = `rncp-${skill.id}`;

              return (
                <li
                  key={skill.id}
                  className={`group flex flex-col justify-between md:gap-6 border-r border-b border-foreground/10 hover:bg-foreground/[0.03] transition-colors duration-300 ${
                    linkedProjects.length > 0 ? "" : "opacity-40 hover:opacity-100"
                  } ${isOpen ? "max-md:bg-foreground/[0.03] max-md:opacity-100" : ""}`}
                >
                  {/* En-tête : bouton accordéon sur mobile, simple bloc sur desktop */}
                  <button
                    type="button"
                    onClick={() => setOpenSkill(isOpen ? null : skill.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left p-4 md:p-6 md:pb-0 md:cursor-default space-y-2 md:space-y-3"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono font-bold opacity-60 group-hover:opacity-100 group-hover:text-primary transition-colors">
                        {skill.id}
                      </span>
                      <span className="md:hidden flex items-center gap-2 text-[10px] uppercase tracking-wider font-sans opacity-60">
                        {linkedProjects.length > 0
                          ? `${linkedProjects.length} projet${linkedProjects.length > 1 ? "s" : ""}`
                          : "—"}
                        <span
                          aria-hidden="true"
                          className={`text-base leading-none transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </span>
                    </span>
                    <span
                      className={`text-sm font-body text-foreground/80 leading-snug md:line-clamp-none ${
                        isOpen ? "block" : "line-clamp-2"
                      }`}
                    >
                      {skill.description_fr}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className={`${isOpen ? "flex" : "hidden"} md:flex gap-2 flex-wrap px-4 pb-4 md:px-6 md:pb-6`}
                  >
                    {linkedProjects.length > 0 ? (
                      linkedProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.html_url}
                          target="_blank"
                          className="text-[10px] border border-foreground/20 px-3 py-1.5 md:px-2 md:py-0.5 rounded-full uppercase tracking-wider font-sans hover:text-accent2 hover:border-accent2 transition-colors"
                        >
                          {project.name}
                        </a>
                      ))
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider font-sans opacity-60">
                        Aucun projet associé
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="py-20 text-center text-[10px] uppercase tracking-[0.2em] font-sans opacity-20 border-t border-foreground/10">
            Aucune compétence de ce bloc pour ce projet
          </p>
        )}
      </div>

      <Watermark
        text="RNCP"
        className="text-[25vw] lg:text-[18rem] h-[0.33em]"
      />
    </div>
  );
}
