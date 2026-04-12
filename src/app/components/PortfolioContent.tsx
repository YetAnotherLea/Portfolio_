"use client";

import { useSearchParams } from "next/navigation";
import SectionProjects from "@/app/components/SectionProjects";
import SectionSkills from "@/app/components/SectionSkills";
import SectionForm from "@/app/components/SectionForm";

export default function PortfolioContent() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "projects";

  return (
    <main>
      <section>
        {currentView === "projects" && <SectionProjects />}
        {currentView === "skills" && <SectionSkills />}
        {currentView === "contact" && <SectionForm />}
      </section>
    </main>
  );
}