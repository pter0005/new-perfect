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
import ScrollAnimator from "@/components/scroll-animator";
import TechLogos from "@/components/tech-logos";
import LoadingScreen from "@/components/loading-screen";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

function FadeCurtain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "sticky",
        top: 0,
        height: 0,
        overflow: "visible",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "22vh",
        background:
          "linear-gradient(to bottom," +
          "#000000 0%," +
          "rgba(0,0,0,0.85) 15%," +
          "rgba(0,0,0,0.5) 40%," +
          "rgba(0,0,0,0.15) 65%," +
          "transparent 100%)",
      }} />
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "8vh",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
      }} />
    </div>
  );
}

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
        Conteúdo fica invisível (opacity 0, pointer-events none) até o loading terminar.
        Isso garante que tudo já está montado no DOM quando a animação sai,
        evitando o "tranco" de renderizar tudo de uma vez.
      */}
      <main
        className="flex flex-col"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: ready ? "auto" : "none",
        }}
      >
        <HeroSection />

        <div className="relative z-10 bg-background">
          <GridContinuation />
          <FadeCurtain />

          <div className="relative z-[1]">
            <TechLogos />
            <DockNav />
            <ScrollAnimator>
              <AboutSection />
            </ScrollAnimator>
            <ScrollAnimator>
              <MethodSection />
            </ScrollAnimator>
            <ScrollAnimator>
              <ServicesSection />
            </ScrollAnimator>
            <ScrollAnimator>
              <WorkProcessSection />
            </ScrollAnimator>
            <ScrollAnimator>
              <PortfolioSection />
            </ScrollAnimator>
            <ScrollAnimator>
              <FaqSection />
            </ScrollAnimator>
            <ScrollAnimator>
              <ContactSection />
            </ScrollAnimator>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
