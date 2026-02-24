"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/use-mobile";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap";
const HEADING_FONT = "'Barlow Condensed', sans-serif";

const NewLogo3D = dynamic(() => import("@/components/new-logo-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-5xl tracking-widest animate-pulse" style={{ fontFamily: HEADING_FONT, color: "hsl(var(--primary)/0.3)" }}>
        NEW
      </span>
    </div>
  ),
});

const CARDS = [
  {
    number: "01", title: "Sites que vendem",
    body: "Next.js, TypeScript, Firebase. Tecnologia de ponta com propósito — performance real, não promessa.",
    tag: "Tech", accent: false,
    fromX: -50, fromRotate: -4,
  },
  {
    number: "02", title: "Você é dono",
    body: "Zero mensalidades. Zero modelos engessados. Cada projeto único, construído sob medida, com liberdade total.",
    tag: "Modelo", accent: true,
    fromX: 0, fromRotate: 0,
  },
  {
    number: "03", title: "1:1 sem frescura",
    body: "Sem intermediários. Fala direto com quem faz. Suporte real em cada etapa — do briefing ao lançamento.",
    tag: "Pessoas", accent: false,
    fromX: 50, fromRotate: 4,
  },
];

const STATS = [
  { v: "100%", l: "No prazo" },
  { v: "0",    l: "Mensalidades" },
  { v: "1:1",  l: "Direto" },
  { v: "∞",    l: "Suporte" },
];

// Clip reveal — texto sobe de baixo pra cima saindo do container
function LineReveal({ children, delay = 0, inView }: { children: React.ReactNode; delay?: number; inView: boolean }) {
  return (
    <div style={{ overflow: "hidden", display: "block" }}>
      <motion.div
        initial={{ y: "108%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Card({ card, index, inView, isMobile }: {
  card: typeof CARDS[0]; index: number; inView: boolean; isMobile: boolean;
}) {
  const x = isMobile ? 0 : card.fromX;
  const rot = isMobile ? 0 : card.fromRotate;

  return (
    <motion.div
      initial={{ opacity: 0, x, y: 40, rotate: rot, scale: 0.93 }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.08 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ willChange: "transform, opacity" }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
    >
      {/* Card inner — usa style inline direto pra não conflitar com motion */}
      <div style={{
        background: card.accent
          ? "linear-gradient(145deg, hsl(var(--primary)/0.13) 0%, rgba(255,255,255,0.03) 100%)"
          : "rgba(255,255,255,0.04)",
        border: card.accent ? "1px solid hsl(var(--primary)/0.38)" : "1px solid rgba(255,255,255,0.09)",
        borderRadius: "1rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        position: "relative",
      }}>
        {/* Top hover line */}
        <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{
          background: card.accent
            ? "linear-gradient(90deg, hsl(var(--primary)), transparent)"
            : "linear-gradient(90deg, rgba(255,255,255,0.35), transparent)",
        }} />
        {/* Hover glow bg */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
          background: card.accent
            ? "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.1) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 65%)",
        }} />
        <div className="flex flex-col gap-4 p-6 sm:p-7 flex-1 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[2.5rem] font-bold leading-none" style={{
              fontFamily: HEADING_FONT,
              color: card.accent ? "hsl(var(--primary)/0.5)" : "rgba(255,255,255,0.09)",
            }}>
              {card.number}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full" style={{
              fontFamily: HEADING_FONT,
              color: card.accent ? "hsl(var(--primary)/0.9)" : "rgba(255,255,255,0.45)",
              background: card.accent ? "hsl(var(--primary)/0.1)" : "rgba(255,255,255,0.05)",
              border: card.accent ? "1px solid hsl(var(--primary)/0.28)" : "1px solid rgba(255,255,255,0.08)",
            }}>
              {card.tag}
            </span>
          </div>
          <h3 className="font-bold text-2xl sm:text-3xl leading-tight" style={{
            fontFamily: HEADING_FONT,
            color: card.accent ? "hsl(var(--primary))" : "rgba(255,255,255,0.92)",
          }}>
            {card.title}
          </h3>
          <p className="text-base leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.55)" }}>
            {card.body}
          </p>
        </div>
        {/* Corner glow */}
        <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
          background: card.accent
            ? "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          filter: "blur(10px)",
        }} />
      </div>
    </motion.div>
  );
}

function StatItem({ stat, index, inView }: { stat: typeof STATS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: 0.05 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="flex flex-col items-center text-center gap-1.5 py-5 px-3 rounded-xl"
    >
      <div style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        borderRadius: "0.75rem",
        padding: "1.25rem 0.75rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.375rem",
      }}>
        <span className="font-bold text-4xl sm:text-5xl leading-none" style={{
          fontFamily: HEADING_FONT,
          color: "hsl(var(--primary))",
          textShadow: "0 0 18px hsl(var(--primary)/0.4)",
        }}>
          {stat.v}
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
          {stat.l}
        </span>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const isMobile = useIsMobile();

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-50px" });

  const logoRef = useRef(null);
  const logoInView = useInView(logoRef, { once: true, margin: "-40px" });

  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: isMobile ? "-20px" : "-60px" });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-20px" });

  const dividerRef = useRef(null);
  const dividerInView = useInView(dividerRef, { once: true, margin: "-20px" });

  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <style>{`@import url('${FONT_URL}');`}</style>
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "400px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.25) 30%, hsl(var(--primary)/0.25) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Logo + Copy ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">

          {/* Logo — escala do centro */}
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : -24 }}
            animate={logoInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity", isolation: "isolate" }}
            className="order-2 lg:order-1 relative flex flex-col items-center justify-center"
          >
            <div aria-hidden style={{
              position: "absolute", inset: "0%", zIndex: 0,
              background: "radial-gradient(ellipse at 50% 55%, hsl(var(--primary)/0.18) 0%, transparent 65%)",
              filter: "blur(50px)", pointerEvents: "none",
            }} />
            <div className="relative w-full" style={{ zIndex: 1, height: "clamp(310px, 49vw, 520px)" }}>
              <NewLogo3D />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={logoInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-4 text-center tracking-[0.2em] uppercase text-[13px]"
              style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.22)" }}
            >
              ↔ ARRASTE PARA GIRAR
            </motion.p>
          </motion.div>

          {/* Copy — linha a linha clip reveal */}
          <div ref={headingRef} className="flex flex-col gap-5 order-1 lg:order-2">

            {/* Eyebrow */}
            <LineReveal inView={headingInView} delay={0}>
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
                <span className="text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: HEADING_FONT, color: "hsl(var(--primary)/0.65)" }}>
                  Sobre a Agência
                </span>
              </div>
            </LineReveal>

            {/* H2 — cada linha um clip separado */}
            <div>
              <div className="font-bold tracking-tight leading-[0.93]" style={{ fontFamily: HEADING_FONT, fontSize: "clamp(2.8rem, 7vw, 5.2rem)" }}>
                <LineReveal inView={headingInView} delay={0.06}>
                  <span style={{ color: "rgba(255,255,255,0.97)" }}>NASCEMOS PARA</span>
                </LineReveal>
                <LineReveal inView={headingInView} delay={0.16}>
                  <span className="subtle-gradient-text" style={{ textShadow: "0 0 40px hsl(var(--primary)/0.6), 0 0 80px hsl(var(--primary)/0.3)" }}>
                    TRANSFORMAR.
                  </span>
                </LineReveal>
              </div>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "460px", lineHeight: 1.75, willChange: "transform, opacity" }}
              className="text-base sm:text-lg"
            >
              Agência digital que une inovação, performance e design para criar o ativo digital perfeito para o seu negócio.
            </motion.p>

            {/* Quote — entra da esquerda */}
            <motion.blockquote
              initial={{ opacity: 0, x: -18 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderLeft: "2px solid hsl(var(--primary)/0.55)", paddingLeft: "1rem", willChange: "transform, opacity" }}
            >
              <p className="font-bold italic text-lg sm:text-xl" style={{
                fontFamily: HEADING_FONT,
                color: "hsl(var(--primary)/0.85)",
                textShadow: "0 0 16px hsl(var(--primary)/0.2)",
              }}>
                "Você não aluga uma ideia. Você é dono do seu futuro digital."
              </p>
            </motion.blockquote>

            {/* Mini stats — sobem juntos com stagger */}
            <div className="flex gap-7 mt-1 flex-wrap">
              {[["100%", "no prazo"], ["0", "mensalidades"], ["1:1", "suporte"]].map(([v, l], i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 18 }}
                  animate={headingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.44 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ willChange: "transform, opacity" }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="font-bold text-3xl sm:text-4xl leading-none" style={{ fontFamily: HEADING_FONT, color: "hsl(var(--primary))" }}>
                    {v}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {l}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider — desenha da esquerda pra direita */}
        <div ref={dividerRef} className="mb-9 sm:mb-11">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={dividerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left", willChange: "transform, opacity", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)" }}
          />
        </div>

        {/* Cards — voam de direções opostas */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-9 sm:mb-11">
          {CARDS.map((card, i) => (
            <Card key={card.number} card={card} index={i} inView={cardsInView} isMobile={!!isMobile} />
          ))}
        </div>

        {/* Stats — escala e sobe com stagger */}
        <div ref={statsRef} className="grid grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <StatItem key={s.v} stat={s} index={i} inView={statsInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
