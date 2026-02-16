import type { Metadata } from "next";
import { Sora, Kantumruy_Pro } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const kantumruy = Kantumruy_Pro({
  subsets: ["latin"],
  variable: "--font-kantumruy",
});

export const metadata: Metadata = {
  title: "Léa Ballester | Portfolio",
  description:
    "Développeuse full stack en formation à la WebAcadémie, ce portfolio est un aperçu de mon travail et de mon évolution dans le développement web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${kantumruy.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8">{children}</div>
      </body>
    </html>
  );
}
