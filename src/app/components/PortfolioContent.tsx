"use client";

import SectionProjects from "@/app/components/SectionProjects";
import SectionSkills from "@/app/components/SectionSkills";
import SectionForm from "@/app/components/SectionForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function PortfolioContent() {
  return (
    <main>
      <section id="projects" className="scroll-mt-8 pt-20 relative">
        <SectionProjects />
      </section>
      <section id="skills" className="scroll-mt-8 pt-20 border-t border-foreground/10 relative">
        <SectionSkills />
      </section>
      <section id="contact" className="scroll-mt-8 pt-20 border-t border-foreground/10 relative">
        <GoogleReCaptchaProvider reCaptchaKey="6LcvPrUsAAAAAKyCZcL78SD5JiL6pSvfMtBLgs6e">
          <SectionForm />
        </GoogleReCaptchaProvider>
      </section>
    </main>
  );
}
