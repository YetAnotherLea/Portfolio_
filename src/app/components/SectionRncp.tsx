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
      onClick={onClick}
      className={`rounded-full border border-foreground px-3 py-0.5 text-sm font-sans transition-colors ${
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

export default function SectionRncp({ projects }: { projects: GitHubRepo[] }) {
  const [activeBloc, setActiveBloc] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);

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
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
              Bloc
            </span>
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
            <a
              href="https://www.francecompetences.fr/recherche/rncp/38436/"
              target="_blank"
              className="ml-auto text-[10px] bg-foreground/5 px-2 py-1 rounded-sm hover:bg-foreground/10 transition-colors font-sans uppercase tracking-widest"
            >
              Titre RNCP 38436
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans">
              Projet
            </span>
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
          </div>
        </div>

        {skills.length > 0 ? (
          <ul
            key={`${activeBloc}-${activeProject}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-foreground/10 animate-in fade-in duration-500"
          >
            {skills.map((skill) => {
              const linkedProjects = projectsFor(skill.id);

              return (
                <li
                  key={skill.id}
                  className={`group flex flex-col justify-between gap-6 p-5 md:p-6 border-r border-b border-foreground/10 hover:bg-foreground/[0.03] transition-colors duration-300 ${
                    linkedProjects.length > 0 ? "" : "opacity-40 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="block text-xs font-mono font-bold opacity-60 group-hover:opacity-100 group-hover:text-primary transition-colors">
                      {skill.id}
                    </span>
                    <p className="text-sm font-body text-foreground/80 leading-snug">
                      {skill.description_fr}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {linkedProjects.length > 0 ? (
                      linkedProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.html_url}
                          target="_blank"
                          className="text-[10px] border border-foreground/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans hover:text-accent2 hover:border-accent2 transition-colors"
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
