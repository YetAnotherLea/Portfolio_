"use client";

import { useState } from "react";

export default function SectionForm() {
  // États du formulaire
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setStatus("SENDING");
    setErrorMessage("");

    // Récupération des données
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Vérification des champs remplis ou non
    if (!data.email || !data.message || data.name === "") {
      setErrorMessage("Tous les champs sont obligatoires.");
      setStatus("ERROR");
      return;
    }

    // Vérification format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      setStatus("ERROR");
      return;
    }

    // Envoi à formspree manuel (pour pas choper la page de remerciements)
    try {
      const response = await fetch("https://formspree.io/f/mreaqbge", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        (e.target as HTMLFormElement).reset(); // Vide
      } else {
        const resData = await response.json();
        setErrorMessage(resData.error || "Une erreur est survenue.");
        setStatus("ERROR");
      }
    } catch (error) {
      setErrorMessage("Impossible de contacter le serveur.");
      setStatus("ERROR");
    }
  };

  return (
    <section>
      <h2>Contact</h2>
      {status === "SUCCESS" && <p>Merci pour votre message !</p>}
      {status === "ERROR" && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          aria-label="Nom"
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          aria-label="Message"
          placeholder="Votre message"
          required
        ></textarea>

        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <button type="submit" disabled={status === "SENDING"}>
          {status === "SENDING" ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </section>
  );
}
