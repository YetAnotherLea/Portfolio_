"use client";

import SectionProjects from "@/app/components/SectionProjects";
import SectionSkills from "@/app/components/SectionSkills";
import SectionForm from "@/app/components/SectionForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function PortfolioContent() {
  return (
    <main>
      <section id="projects" className="scroll-mt-8">
        <SectionProjects />
      </section>
      <section id="skills" className="scroll-mt-8">
        <SectionSkills />
      </section>
      <section id="contact" className="scroll-mt-8">
        <GoogleReCaptchaProvider reCaptchaKey="6LcvPrUsAAAAAKyCZcL78SD5JiL6pSvfMtBLgs6e">
          <SectionForm />
        </GoogleReCaptchaProvider>
      </section>
    </main>
  );
}
