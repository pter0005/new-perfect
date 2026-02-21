"use client";

import CardStack, { type CardStackItem } from "@/components/ui/card-stack";
import { projects } from "@/lib/projects";
import { useMemo } from "react";

export default function PortfolioSection() {
  const cardItems: CardStackItem[] = useMemo(() => {
    return projects.map((project) => ({
      id: project.slug,
      title: project.name,
      description: project.type,
      src: project.image,
      alt: project.name,
      href: `/portfolio/${project.slug}`,
    }));
  }, []);

  return (
    <section id="portfolio" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-grotesk">
            Projetos que já <span className="hero-gradient-text">transformamos</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-foreground/80">
            Confira alguns dos projetos que tivemos o prazer de desenvolver.
          </p>
        </div>
        <div className="mx-auto w-full max-w-5xl pt-8 pb-4">
            <CardStack
              items={cardItems}
              cardWidth={580}
              cardHeight={360}
              initialIndex={0}
              autoAdvance
              loop
              intervalMs={3500}
              pauseOnHover
              showDots
            />
        </div>
      </div>
    </section>
  );
}
