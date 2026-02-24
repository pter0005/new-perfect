"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SAAS_ITEMS = [
  { label: "Cobrança Contínua",        desc: "Você paga todo mês. Se parar, perde o acesso. Nunca é seu." },
  { label: "Estrutura Padronizada",    desc: "Você entra no formato pronto. Nada realmente exclusivo." },
  { label: "Dependência de Terceiros", desc: "Mudaram as regras? Você se adapta." },
];

const SWAS_ITEMS = [
  { label: "Propriedade Real",          desc: "É seu. Código, estrutura e controle — patrimônio digital que valoriza." },
  { label: "Personalização Sem Limite", desc: "Criado para sua operação, não para o mercado inteiro." },
  { label: "Base Sólida para Crescer",  desc: "Infraestrutura preparada para escalar com você." },
];

// ─────────────────────────────────────────────────────────────────────────────
// FONTE: Barlow Condensed via <link> (não @import — link tem prioridade maior
// e não bloqueia o FOUC)
// Adicionamos também ao layout.tsx para garantir preload correto (ver instruções).
// ─────────────────────────────────────────────────────────────────────────────
const HF = "'Barlow Condensed', sans-serif"; // heading font

function FontLoader() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        // @ts-ignore
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=block"
      />
    </>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2l8 8M10 2L2 10" stroke="rgba(255,80,80,0.75)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
      <path d="M1.5 5.5L5 9L11.5 1.5" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINE REVEAL
// paddingTop + marginTop negativos para não cortar diacríticos no overflow
// ─────────────────────────────────────────────────────────────────────────────
function LineReveal({ children, delay = 0, inView }: {
  children: React.ReactNode; delay?: number; inView: boolean;
}) {
  return (
    <div style={{ overflow: "hidden", display: "block", paddingTop: "0.5em", marginTop: "-0.5em" }}>
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

// ─────────────────────────────────────────────────────────────────────────────
// PATRIMÔNIO animated — laranja revela da esquerda pra direita
//
// FIX DO Ô: o circumflexo (^) fica ACIMA do bounding box do elemento.
// Se a overlay usa `inset: 0`, o clipPath não cobre o acento.
// Solução: estender a overlay 0.25em pra cima (top: -0.25em)
// e compensar com paddingTop na base para manter o alinhamento visual.
// ─────────────────────────────────────────────────────────────────────────────
function PatrimonioAnimated({ inView }: { inView: boolean }) {
  const text = "PATRIMÔNIO.";

  const baseStyle: React.CSSProperties = {
    fontFamily: HF,
    fontWeight: 700,
    fontSize: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    whiteSpace: "nowrap",
  };

  return (
    // overflow visible aqui é crítico — deixa o circumflexo aparecer
    <span style={{ position: "relative", display: "inline-block", lineHeight: "inherit", overflow: "visible" }}>

      {/* Camada cinza — reserva o espaço do layout */}
      <span
        aria-hidden
        style={{ ...baseStyle, display: "block", color: "rgba(255,255,255,0.12)", userSelect: "none" }}
      >
        {text}
      </span>

      {/* Camada laranja: sobe 0.25em pra cobrir o circumflexo do Ô */}
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 2.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{
          ...baseStyle,
          display: "block",
          position: "absolute",
          // estende pra cima para cobrir diacríticos que saem do bounding box
          top: "-0.45em",      // sobe para cobrir o ^ do Ô que fica acima do bounding box
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: "0.45em",  // compensa top negativo — texto fica no lugar certo
          color: "hsl(var(--primary))",
          willChange: "clip-path",
          overflow: "visible",
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function SaasRow({ item, index }: { item: typeof SAAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity", display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      className="last-of-type:border-0"
    >
      <div style={{ marginTop: "2px", width: "28px", height: "28px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)" }}>
        <XIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-lg sm:text-xl leading-tight" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.1)" }}>
          {item.label}
        </p>
        <p className="text-base mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

function SwasRow({ item, index }: { item: typeof SWAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity", display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid hsl(var(--primary)/0.08)" }}
      className="last-of-type:border-0"
    >
      <div style={{ marginTop: "2px", width: "28px", height: "28px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.4)", boxShadow: "0 0 10px hsl(var(--primary)/0.12)" }}>
        <CheckIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-lg sm:text-xl leading-tight" style={{ color: "rgba(255,255,255,0.92)" }}>{item.label}</p>
        <p className="text-base mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function MethodSection() {
  const isMobile = useIsMobile();
  const titleRef      = useRef(null);
  const patrimonioRef = useRef(null);
  const cardsRef      = useRef(null);

  // margin negativa grande: só dispara quando o elemento está bem visível,
  // evita animar antes do usuário rolar até a seção
  const titleInView      = useInView(titleRef,      { once: true, margin: isMobile ? "-60px" : "-160px" });
  const patrimonioInView = useInView(patrimonioRef, { once: true, margin: isMobile ? "-40px" : "-120px" });
  const cardsInView      = useInView(cardsRef,      { once: true, margin: isMobile ? "-40px" : "-100px" });

  const slideX  = isMobile ? 22 : 50;
  const tiltDeg = isMobile ? 0  : 1.5;

  return (
    <section id="method" className="relative py-20 sm:py-28 overflow-hidden bg-background">

      {/* Carrega Barlow Condensed com prioridade alta */}
      <FontLoader />

      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "5%", left: "55%", transform: "translateX(-20%)", width: "700px", height: "700px", background: "radial-gradient(ellipse, hsl(var(--primary)/0.07) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Heading ── */}
        <div ref={titleRef} className="mb-16 sm:mb-20">

          <LineReveal inView={titleInView} delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span style={{ fontFamily: HF, fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "hsl(var(--primary)/0.65)" }}>
                O Modelo
              </span>
            </div>
          </LineReveal>

          {/* Bloco de títulos — tudo em Barlow Condensed, UPPERCASE */}
          <div style={{
            fontFamily: HF,
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "0.01em",
            fontSize: "clamp(4.5rem, 13vw, 11rem)",
          }}>

            {/* SAAS É ALUGUEL — "ALUGUEL" maiúsculo para manter proporção */}
            <LineReveal inView={titleInView} delay={0.08}>
              <span style={{ color: "rgba(255,255,255,0.95)" }}>
                SAAS É{" "}
                <span style={{
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "line-through",
                  textDecorationThickness: "4px",
                  textDecorationColor: "rgba(255,255,255,0.15)",
                }}>
                  ALUGUEL
                </span>
              </span>
            </LineReveal>

            {/* SWAS É PATRIMÔNIO */}
            <LineReveal inView={titleInView} delay={0.18}>
              <span style={{ display: "block" }}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={titleInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: "rgba(255,255,255,0.97)", willChange: "opacity" }}
                >
                  SWAS É{" "}
                </motion.span>
                <span ref={patrimonioRef} style={{ display: "inline" }}>
                  <PatrimonioAnimated inView={patrimonioInView} />
                </span>
              </span>
            </LineReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.75, willChange: "transform, opacity" }}
            className="mt-6 text-lg sm:text-xl max-w-lg"
          >
            Cansado de pagar por ferramentas que nunca são suas?<br />
            O modelo SWAS entrega código próprio — um ativo digital que cresce com o seu negócio.
          </motion.p>
        </div>

        {/* ── Cards VS ── */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr] gap-4 lg:gap-0 items-stretch">

          {/* SaaS */}
          <motion.div
            initial={{ opacity: 0, x: -slideX, rotate: -tiltDeg, scale: 0.96 }}
            animate={cardsInView ? { opacity: 1, x: 0, rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", padding: "1.75rem 2.25rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontFamily: HF, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, color: "rgba(255,255,255,0.22)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.1)", textDecorationThickness: "2px" }}>
                  SAAS
                </h3>
                <p style={{ fontFamily: HF, fontSize: "0.8rem", marginTop: "0.25rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.14)" }}>
                  Plataforma Compartilhada · Assinatura
                </p>
              </div>
              <div style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(255,50,50,0.05)", border: "1px solid rgba(255,50,50,0.12)" }}>
                <p style={{ fontFamily: HF, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,80,80,0.45)" }}>Custo real</p>
                <p style={{ fontFamily: HF, fontWeight: 700, fontSize: "1.875rem", color: "rgba(255,70,70,0.38)" }}>
                  ∞ <span style={{ fontSize: "1rem", fontWeight: 400 }}>/mês para sempre</span>
                </p>
              </div>
              <div className="flex flex-col">
                {SAAS_ITEMS.map((item, i) => <SaasRow key={i} item={item} index={i} />)}
              </div>
            </div>
          </motion.div>

          {/* VS */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3">
            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)" }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "transform, opacity", fontFamily: HF, fontWeight: 700, fontSize: "0.875rem", color: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "9999px", width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              vs
            </motion.div>
            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.07) 60%, transparent)" }} />
          </div>

          {/* SWAS */}
          <motion.div
            initial={{ opacity: 0, x: slideX, rotate: tiltDeg, scale: 0.96 }}
            animate={cardsInView ? { opacity: 1, x: 0, rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div style={{ background: "linear-gradient(145deg, hsl(var(--primary)/0.11) 0%, rgba(255,255,255,0.02) 55%)", border: "1px solid hsl(var(--primary)/0.32)", borderRadius: "1rem", padding: "1.75rem 2.25rem", display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.7) 35%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.7) 65%, transparent 100%)" }} />
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "176px", height: "176px", borderRadius: "9999px", pointerEvents: "none", background: "radial-gradient(circle, hsl(var(--primary)/0.13) 0%, transparent 70%)", filter: "blur(24px)" }} />
              <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 90% 0%, hsl(var(--primary)/0.16) 0%, hsl(var(--primary)/0.04) 45%, transparent 70%)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{ fontFamily: HF, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, color: "hsl(var(--primary))", textShadow: "0 0 28px hsl(var(--primary)/0.45)" }}>
                  SWAS
                </h3>
                <p style={{ fontFamily: HF, fontSize: "0.8rem", marginTop: "0.25rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--primary)/0.5)" }}>
                  Sistema Proprietário · Sob Medida
                </p>
              </div>

              <div style={{ position: "relative", zIndex: 1, padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.22)" }}>
                <p style={{ fontFamily: HF, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--primary)/0.65)" }}>Modelo</p>
                <p style={{ fontFamily: HF, fontWeight: 700, fontSize: "1.875rem", color: "hsl(var(--primary))" }}>
                  1× <span style={{ fontSize: "1rem", fontWeight: 400, color: "hsl(var(--primary)/0.65)" }}>investimento único</span>
                </p>
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                {SWAS_ITEMS.map((item, i) => <SwasRow key={i} item={item} index={i} />)}
              </div>

              <div style={{ position: "relative", zIndex: 1, paddingTop: "1.25rem", marginTop: "auto", borderTop: "1px solid hsl(var(--primary)/0.14)" }}>
                <p style={{ fontFamily: HF, fontWeight: 700, textAlign: "center", letterSpacing: "0.05em", fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: "hsl(var(--primary))", textShadow: "0 0 20px hsl(var(--primary)/0.4)" }}>
                  AUTONOMIA TOTAL. SEMPRE.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}