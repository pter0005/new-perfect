"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const NewLogo3D = dynamic(() => import("@/components/new-logo-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-heading text-5xl tracking-widest animate-pulse" style={{ color: "hsl(var(--primary)/0.3)" }}>
        NEW
      </span>
    </div>
  ),
});

const CARDS = [
  {
    number: "01",
    title: "Sites que vendem",
    body: "Next.js, TypeScript, Firebase. Tecnologia de ponta com propósito — performance real, não promessa.",
    tag: "Tech",
    accent: false,
  },
  {
    number: "02",
    title: "Você é dono",
    body: "Zero mensalidades. Zero modelos engessados. Cada projeto único, construído sob medida, com liberdade total.",
    tag: "Modelo",
    accent: true,
  },
  {
    number: "03",
    title: "1:1 sem frescura",
    body: "Sem intermediários. Fala direto com quem faz. Suporte real em cada etapa — do briefing ao lançamento.",
    tag: "Pessoas",
    accent: false,
  },
];

const STATS = [
  { v: "100%", l: "No prazo" },
  { v: "0",    l: "Mensalidades" },
  { v: "1:1",  l: "Direto" },
  { v: "∞",    l: "Suporte" },
];

function Card({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        background: card.accent
          ? "linear-gradient(145deg, hsl(var(--primary)/0.13) 0%, rgba(255,255,255,0.03) 100%)"
          : "rgba(255,255,255,0.04)",
        border: card.accent
          ? "1px solid hsl(var(--primary)/0.38)"
          : "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{
          background: card.accent
            ? "linear-gradient(90deg, hsl(var(--primary)), transparent)"
            : "linear-gradient(90deg, rgba(255,255,255,0.35), transparent)",
        }}
      />
      <div className="flex flex-col gap-4 p-6 sm:p-7 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-heading text-[2.5rem] font-bold leading-none"
            style={{ color: card.accent ? "hsl(var(--primary)/0.5)" : "rgba(255,255,255,0.09)" }}>
            {card.number}
          </span>
          <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full font-heading"
            style={{
              color: card.accent ? "hsl(var(--primary)/0.9)" : "rgba(255,255,255,0.45)",
              background: card.accent ? "hsl(var(--primary)/0.1)" : "rgba(255,255,255,0.05)",
              border: card.accent ? "1px solid hsl(var(--primary)/0.28)" : "1px solid rgba(255,255,255,0.08)",
            }}>
            {card.tag}
          </span>
        </div>
        <h3 className="font-heading font-bold text-xl sm:text-2xl leading-tight"
          style={{ color: card.accent ? "hsl(var(--primary))" : "rgba(255,255,255,0.92)" }}>
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.52)" }}>
          {card.body}
        </p>
      </div>
      <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: card.accent ? "radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 70%)" : "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          filter: "blur(10px)",
        }} />
    </motion.div>
  );
}

function Stat({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center gap-1.5 py-5 px-3 rounded-xl"
      style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" }}
    >
      <span className="font-heading font-bold text-3xl sm:text-4xl leading-none"
        style={{ color: "hsl(var(--primary))", textShadow: "0 0 18px hsl(var(--primary)/0.4)" }}>
        {stat.v}
      </span>
      <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>
        {stat.l}
      </span>
    </motion.div>
  );
}

export default function AboutSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const logoRef = useRef(null);
  const logoInView = useInView(logoRef, { once: true, margin: "-40px" });

  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: "#0d0d0d",
      }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="about-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="3" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
              <feBlend in="SourceGraphic" in2="gray" mode="overlay" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          background: "#0d0d0d",
          filter: "url(#about-grain)",
          opacity: 0.5,
        }} />
        <div style={{
          position: "absolute",
          top: "-80px", left: "50%", transform: "translateX(-50%)",
          width: "1000px", height: "600px",
          background: "radial-gradient(ellipse at 50% 15%, hsl(var(--primary)/0.09) 0%, hsl(var(--primary)/0.04) 35%, transparent 65%)",
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute",
          top: "5%", left: "-5%",
          width: "500px", height: "400px",
          background: "radial-gradient(ellipse at 30% 40%, hsl(var(--primary)/0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.3) 30%, hsl(var(--primary)/0.3) 70%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,106,0,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,106,0,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "skewY(-2deg)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 50%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 50%)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 10 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
          <span className="text-[9px] tracking-[0.45em] uppercase font-heading" style={{ color: "hsl(var(--primary)/0.65)" }}>
            Sobre a Agência
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, x: -20 }}
            animate={logoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
            style={{ isolation: "isolate" }}
          >
            <div aria-hidden style={{
              position: "absolute", inset: "-10%", zIndex: 0,
              background: "radial-gradient(ellipse at 50% 55%, hsl(var(--primary)/0.2) 0%, hsl(var(--primary)/0.06) 50%, transparent 70%)",
              filter: "blur(45px)", pointerEvents: "none",
            }} />
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                zIndex: 1,
                height: "clamp(240px, 40vw, 420px)",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid hsl(var(--primary)/0.15)",
                boxShadow: "0 0 40px rgba(0,0,0,0.4) inset",
              }}
            >
              <NewLogo3D />
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ fontSize: "8px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
                ↔ ARRASTE PARA GIRAR
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5 order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, x: 18 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold tracking-tight leading-[0.93]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.2rem)", color: "rgba(255,255,255,0.97)" }}
            >
              NASCEMOS PARA<br />
              <span className="subtle-gradient-text" style={{ textShadow: "0 0 28px hsl(var(--primary)/0.38)" }}>
                TRANSFORMAR.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: 18 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: "rgba(255,255,255,0.62)", maxWidth: "460px", lineHeight: 1.7 }}
              className="text-[15px] sm:text-base"
            >
              Agência digital que une inovação, performance e design para criar o ativo digital perfeito para o seu negócio.
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, x: 18 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderLeft: "2px solid hsl(var(--primary)/0.55)", paddingLeft: "1rem" }}
            >
              <p className="font-heading font-bold italic text-base sm:text-lg"
                style={{ color: "hsl(var(--primary)/0.82)", textShadow: "0 0 16px hsl(var(--primary)/0.2)" }}>
                "Você não aluga uma ideia. Você é dono do seu futuro digital."
              </p>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-7 mt-1 flex-wrap"
            >
              {[["100%", "no prazo"], ["0", "mensalidades"], ["1:1", "suporte"]].map(([v, l]) => (
                <div key={v} className="flex flex-col gap-0.5">
                  <span className="font-heading font-bold text-2xl sm:text-3xl leading-none"
                    style={{ color: "hsl(var(--primary))" }}>
                    {v}
                  </span>
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.32)" }}>
                    {l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="h-px w-full mb-9 sm:mb-11"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-9 sm:mb-11">
          {CARDS.map((card, i) => <Card key={card.number} card={card} index={i} />)}
        </div>
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s, i) => <Stat key={s.v} stat={s} index={i} />)}
        </div>

      </div>
    </section>
  );
}
