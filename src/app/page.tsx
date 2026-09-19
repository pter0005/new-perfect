"use client";

import { useState } from "react";
import HeroSection from "@/app/hero-section";
import AboutSection from "@/components/about-section";
import MethodSection from "@/components/method-section";
import ServicesSection from "@/components/services-section";
import WorkProcessSection from "@/components/work-process-section";
import PortfolioSection from "@/components/portfolio-section";
import FaqSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import DockNav from "@/components/dock-nav";
import LoadingScreen from "@/components/loading-screen";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

function GridContinuation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "45vh",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        maskImage:
          "linear-gradient(to bottom," +
          "black 0%," +
          "rgba(0,0,0,0.6) 15%," +
          "rgba(0,0,0,0.2) 28%," +
          "transparent 40%)",
        WebkitMaskImage:
          "linear-gradient(to bottom," +
          "black 0%," +
          "rgba(0,0,0,0.6) 15%," +
          "rgba(0,0,0,0.2) 28%," +
          "transparent 40%)",
      }}
    >
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.07}
        duration={3}
        repeatDelay={1}
        className={cn(
          "fill-foreground/10 stroke-foreground/10",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* Loading screen — some automaticamente após carregar */}
      <LoadingScreen onDone={() => setReady(true)} />

      {/*
        O conteúdo já é pintado desde o início — quem esconde tudo é o overlay
        preto do loading (z-index 9999). Só os cliques ficam bloqueados até o
        loading terminar, pra ninguém clicar "através" da tela de carregamento.
      */}
      <main
        className="flex flex-col"
        style={{
          pointerEvents: ready ? "auto" : "none",
        }}
      >
        <HeroSection />

        <div className="relative z-10 bg-background">
          <GridContinuation />
          
          <div className="relative z-[1]">
            <DockNav />
            <AboutSection />
            <MethodSection />
            <ServicesSection />
            <WorkProcessSection />
            <PortfolioSection />
            <FaqSection />
            <ContactSection />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
