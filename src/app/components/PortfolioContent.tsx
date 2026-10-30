"use client";

import { useEffect, useState } from "react";
import { GitHubRepo } from "@/app/lib/github";
import SectionProjects from "@/app/components/SectionProjects";
import SectionSkills from "@/app/components/SectionSkills";
import SectionRncp from "@/app/components/SectionRncp";
import SectionForm from "@/app/components/SectionForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function PortfolioContent() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
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

  return (
    <main>
      <section id="projects" className="scroll-mt-24 pt-20 relative">
        <SectionProjects projects={projects} loading={loading} />
      </section>
      <section id="skills" className="scroll-mt-24 pt-20 border-t border-foreground/10 relative">
        <SectionSkills />
      </section>
      <section id="rncp" className="scroll-mt-24 pt-20 border-t border-foreground/10 relative">
        <SectionRncp projects={projects} />
      </section>
      <section id="contact" className="scroll-mt-24 pt-20 border-t border-foreground/10 relative">
        <GoogleReCaptchaProvider reCaptchaKey="6LcvPrUsAAAAAKyCZcL78SD5JiL6pSvfMtBLgs6e">
          <SectionForm />
        </GoogleReCaptchaProvider>
      </section>
    </main>
  );
}
