"use client";

import { useSearchParams } from "next/navigation";
import SectionProjects from "@/app/components/SectionProjects";
import SectionSkills from "@/app/components/SectionSkills";
import SectionForm from "@/app/components/SectionForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function PortfolioContent() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "projects";

  return (
    <main>
      <section>
        {currentView === "projects" && <SectionProjects />}
        {currentView === "skills" && <SectionSkills />}
        <GoogleReCaptchaProvider reCaptchaKey="6LcvPrUsAAAAAKyCZcL78SD5JiL6pSvfMtBLgs6e">
          {currentView === "contact" && <SectionForm />}
        </GoogleReCaptchaProvider>
      </section>
    </main>
  );
}
