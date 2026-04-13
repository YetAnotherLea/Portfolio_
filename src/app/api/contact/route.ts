import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message, captchaToken } = await request.json();

  // Vérification recaptcha
  const captchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    { method: "POST" }
  );
  const captchaData = await captchaRes.json();

  if (!captchaData.success || captchaData.score < 0.5) {
    return NextResponse.json({ error: "Captcha invalide" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Portfolio <contact@leaballester.com>",
      to: "lea.ballester@hotmail.com",
      subject: `Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}