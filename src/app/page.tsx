import { Suspense } from "react";
import Header from "@/app/components/Header";
import PortfolioContent from "@/app/components/PortfolioContent";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="text-white">Chargement...</div>}>
        <Header />
        <PortfolioContent />
      </Suspense>
    </>
  );
}
