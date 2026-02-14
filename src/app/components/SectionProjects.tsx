"use client";

import { useEffect, useState } from "react";
import { GitHubRepo } from "@/app/lib/github";

export default function SectionProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section>
        <p>Chargement des projets depuis GitHub...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>Impossible de charger les projets.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Mes Projets ({projects.length})</h2>

      {projects.length === 0 ? (
        <p>Aucun projet trouvé avec le topic portfolio.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <article key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description || "Pas de description disponible"}</p>

              <ul>
                {project.topics.map((topic) => (
                  <li key={topic}>#{topic}</li>
                ))}
              </ul>

              <div>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir le code source
                </a>

                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Démo en ligne
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
