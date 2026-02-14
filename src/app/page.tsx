"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import SectionProjects from "@/app/components/SectionProjects";
import SectionSkills from "@/app/components/SectionSkills";
import SectionForm from "@/app/components/SectionForm";

function PortfolioContent() {
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

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="text-white">Chargement...</div>}>
        <PortfolioContent />
      </Suspense>
    </>
  );
}
