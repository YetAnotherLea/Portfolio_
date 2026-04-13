import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";

const kantumruy = Kantumruy_Pro({
  subsets: ["latin"],
  variable: "--font-kantumruy",
});

export const metadata: Metadata = {
  title: "Léa Ballester | Portfolio",
  description:
    "Développeuse full stack en formation à la WebAcadémie, ce portfolio est un aperçu de mon travail et de mon évolution dans le développement web.",
  openGraph: {
    title: "Léa Ballester | Portfolio",
    description:
      "Développeuse full stack en formation à la WebAcadémie, ce portfolio est un aperçu de mon travail et de mon évolution dans le développement web.",
    url: "https://lea-ballester-portfolio.vercel.app",
    siteName: "Léa Ballester | Portfolio",
    images: [
      {
        url: "https://leaballester.com/og-image.png",
        width: 200,
        height: 200,
        alt: "Léa Ballester Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${kantumruy.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8">{children}</div>
      </body>
    </html>
  );
}
