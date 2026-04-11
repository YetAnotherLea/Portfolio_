"use client";

import { useState, FormEvent } from "react";

export default function SectionForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <h2 className="text-6xl font-sans font-bold tracking-tighter uppercase mb-4 text-foreground">
          Merci !
        </h2>
        <p className="font-body opacity-70 mb-8">
          Je vous recontacte dans les plus brefs délais.
        </p>
        <a
          href="?view=projects"
          className="underline font-sans text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    );
  }

  return (
    <section className="relative w-full pt-2 min-h-[calc(100vh-270px)] flex flex-col justify-between overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full">
        <div className="lg:col-span-7 space-y-12">
          <h2 className="hidden">Contact.</h2>

          <form onSubmit={handleSubmit} className="space-y-12 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {/* Nom */}
              <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-2">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder=" "
                  className="peer w-full bg-transparent outline-none font-body text-lg"
                />
                <label
                  className="absolute left-0 top-0 text-[10px] uppercase tracking-widest opacity-40 transition-all 
                  peer-placeholder-shown:top-0.5 peer-placeholder-shown:text-lg peer-placeholder-shown:opacity-20 
                  peer-focus:-top-4 peer-focus:text-[10px] peer-focus:opacity-40
                  peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:opacity-40
                  pointer-events-none"
                >
                  Nom complet
                </label>
              </div>

              {/* Email */}
              <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-2">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder=" "
                  className="peer w-full bg-transparent outline-none font-body text-lg"
                />
                <label
                  className="absolute left-0 top-0 text-[10px] uppercase tracking-widest opacity-40 transition-all 
                  peer-placeholder-shown:top-0.5 peer-placeholder-shown:text-lg peer-placeholder-shown:opacity-20 
                  peer-focus:-top-4 peer-focus:text-[10px] peer-focus:opacity-40
                  peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:opacity-40
                  pointer-events-none"
                >
                  Email
                </label>
              </div>
            </div>

            {/* Message */}
            <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-2">
              <textarea
                required
                name="message"
                rows={4}
                placeholder=" "
                className="peer w-full bg-transparent outline-none font-body text-lg resize-none"
              ></textarea>
              <label
                className="absolute left-0 top-0 text-[10px] uppercase tracking-widest opacity-40 transition-all 
                peer-placeholder-shown:top-0.5 peer-placeholder-shown:text-lg peer-placeholder-shown:opacity-20 
                peer-focus:-top-4 peer-focus:text-[10px] peer-focus:opacity-40
                peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:opacity-40
                pointer-events-none"
              >
                Message
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-4 font-sans uppercase text-sm tracking-[0.3em] font-bold"
            >
              {loading ? "Envoi..." : "Envoyer"}
              <span className="w-12 h-[1px] bg-foreground group-hover:w-20 transition-all duration-500"></span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col items-start md:items-center lg:items-end justify-start space-y-16 pt-10 lg:pt-2">
          <div className="w-full flex flex-col md:flex-row lg:flex-col justify-between items-start md:items-end lg:items-end gap-8 md:gap-0">
            {/* Localisation & Heure */}
            <div className="text-left md:text-left lg:text-right order-2 md:order-1 lg:order-2">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans mb-4 lg:hidden">
                Localisation
              </p>
              <p className="text-2xl font-sans font-medium">Marseille, FR</p>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-1">
                UTC+1 —{" "}
                {new Date().toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Status Disponibilité */}
            <div className="text-left md:text-right lg:text-right space-y-2 order-1 md:order-2 lg:order-1 lg:mb-15">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans hidden lg:block">
                Status & Localisation
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-sans lg:hidden">
                Status
              </p>
              <div className="flex items-center md:justify-end lg:justify-end gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <p className="text-xl font-sans uppercase font-black tracking-tighter">
                  Disponible
                </p>
              </div>
              <p className="text-sm font-body opacity-60 max-w-[200px] md:max-w-none">
                Recherche une alternance pour Novembre 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FILIGRANE */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 pointer-events-none z-0 select-none">
        <h3 className="text-[20vw] lg:text-[13rem] font-sans font-black uppercase leading-[0.7] opacity-[0.03] whitespace-nowrap">
          Contact
        </h3>
      </div>
    </section>
  );
}
