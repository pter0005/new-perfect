"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import CardStack, { type CardStackItem } from "@/components/ui/card-stack";
import { projects } from "@/lib/projects";
import { useIsMobile } from "@/hooks/use-mobile";

function LineReveal({ children, delay = 0, inView }: { children: React.ReactNode; delay?: number; inView: boolean }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function PortfolioSection() {
  const isMobile = useIsMobile();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const stackRef = useRef(null);
  const stackInView = useInView(stackRef, { once: true, margin: isMobile ? "-20px" : "-60px" });

  const cardItems: CardStackItem[] = useMemo(() =>
    projects.map((p) => ({
      id: p.slug,
      src: p.image,
      alt: p.name,
      title: p.name,
      description: p.type,
      href: `/portfolio/${p.slug}`,
    })),
  []);

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 overflow-hidden bg-background">

      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div ref={titleRef} className="mb-12 sm:mb-16">
          <LineReveal inView={titleInView} delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span className="text-[9px] tracking-[0.45em] uppercase font-heading" style={{ color: "hsl(var(--primary)/0.65)" }}>
                Portfólio
              </span>
            </div>
          </LineReveal>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div className="font-heading font-bold tracking-tight leading-[0.92]" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              <LineReveal inView={titleInView} delay={0.08}>
                <span style={{ color: "rgba(255,255,255,0.97)" }}>PROJETOS QUE JÁ</span>
              </LineReveal>
              <LineReveal inView={titleInView} delay={0.17}>
                <span style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px hsl(var(--primary)/0.4)" }}>
                  TRANSFORMAMOS.
                </span>
              </LineReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26 }}
              style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: "340px", willChange: "transform, opacity" }}
              className="text-base sm:text-lg"
            >
              Cada projeto entregue é um patrimônio que fica com o cliente.
            </motion.p>
          </div>
        </div>

        {/* Card Stack */}
        <motion.div
          ref={stackRef}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={stackInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="mx-auto w-full max-w-4xl pt-4 pb-10"
        >
          <CardStack items={cardItems} />
        </motion.div>

      </div>
    </section>
  );
}
