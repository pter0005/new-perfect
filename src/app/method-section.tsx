"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SAAS_ITEMS = [
  { label: "Cobrança Contínua",       desc: "Você paga todo mês. Se parar, perde o acesso. Nunca é seu." },
  { label: "Estrutura Padronizada",   desc: "Você entra no formato pronto. Nada realmente exclusivo." },
  { label: "Dependência de Terceiros", desc: "Mudaram as regras? Você se adapta." },
];

const SWAS_ITEMS = [
  { label: "Propriedade Real",             desc: "É seu. Código, estrutura e controle — patrimônio digital que valoriza." },
  { label: "Personalização Sem Limite",    desc: "Criado para sua operação, não para o mercado inteiro." },
  { label: "Base Sólida para Crescer",     desc: "Infraestrutura preparada para escalar com você." },
];

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

// Linha individual com useInView próprio — aparece só quando entra na tela
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
      <div style={{
        marginTop: "2px", width: "28px", height: "28px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem",
        background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)",
      }}>
        <XIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-lg sm:text-xl leading-tight" style={{
          color: "rgba(255,255,255,0.32)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.1)",
        }}>
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
      style={{
        willChange: "transform, opacity", display: "flex", alignItems: "flex-start",
        gap: "1rem", padding: "1rem 0", borderBottom: "1px solid hsl(var(--primary)/0.08)",
      }}
      className="last-of-type:border-0"
    >
      <div style={{
        marginTop: "2px", width: "28px", height: "28px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem",
        background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.4)",
        boxShadow: "0 0 10px hsl(var(--primary)/0.12)",
      }}>
        <CheckIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-lg sm:text-xl leading-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
          {item.label}
        </p>
        <p className="text-base mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

// Bebas Neue não tem acentos (É, Ô, etc.)
// Impact é condensed+bold e suporta Latin Extended — visualmente compatível
function Accent({ char }: { char: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-bebas-neue), Impact, 'Arial Narrow Bold', 'Arial Narrow', Arial, sans-serif",
      fontWeight: "inherit",
    }}>
      {char}
    </span>
  );
}

// PATRIMÔNIO — laranja se revela da esquerda pra direita (clipPath)
// Acentos renderizados via <Accent> para garantir o glifo correto
function PatrimonioAnimated({ inView }: { inView: boolean }) {
  const text = (
    <>PATRIM<Accent char="Ô" />NIO.</>
  );
  return (
    <span style={{ position: "relative", display: "inline-block", lineHeight: "inherit" }}>
      {/* Base cinza — reserva espaço e mostra versão apagada */}
      <span
        aria-hidden
        style={{
          display: "block", whiteSpace: "nowrap", userSelect: "none",
          color: "rgba(255,255,255,0.12)",
          fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit",
          letterSpacing: "inherit", lineHeight: "inherit",
        }}
      >
        {text}
      </span>
      {/* Overlay laranja que preenche da esquerda pra direita */}
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 2.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", inset: 0, display: "block", whiteSpace: "nowrap",
          color: "hsl(var(--primary))",
          fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit",
          letterSpacing: "inherit", lineHeight: "inherit",
          willChange: "clip-path",
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// Clip reveal linha a linha
function LineReveal({ children, delay = 0, inView }: { children: React.ReactNode; delay?: number; inView: boolean }) {
  return (
    // paddingTop reserva espaço para diacríticos (É, Ô) que ficam acima da cap-height
    // marginTop negativo compensa pra não alterar o espaçamento visual
    <div style={{ overflow: "hidden", display: "block", paddingTop: "0.18em", marginTop: "-0.18em" }}>
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

export default function MethodSection() {
  const isMobile = useIsMobile();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: isMobile ? "0px" : "-60px" });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: isMobile ? "-20px" : "-80px" });

  const slideX = isMobile ? 22 : 50;
  const tiltDeg = isMobile ? 0 : 1.5;

  return (
    <section id="method" className="relative py-20 sm:py-28 overflow-hidden bg-background">

      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "5%", left: "55%", transform: "translateX(-20%)",
          width: "700px", height: "700px",
          background: "radial-gradient(ellipse, hsl(var(--primary)/0.07) 0%, transparent 65%)",
          filter: "blur(90px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Heading — clip reveal linha a linha ── */}
        <div ref={titleRef} className="mb-16 sm:mb-20">

          {/* Eyebrow */}
          <LineReveal inView={titleInView} delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span className="text-[9px] tracking-[0.45em] uppercase font-heading" style={{ color: "hsl(var(--primary)/0.65)" }}>
                O Modelo
              </span>
            </div>
          </LineReveal>

          {/* SAAS É ALUGUEL */}
          <div className="font-heading font-bold leading-[0.9] tracking-tight" style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}>
            <LineReveal inView={titleInView} delay={0.08}>
              <span style={{ color: "rgba(255,255,255,0.95)" }}>
                SAAS <Accent char="É" />{" "}
                <span style={{
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "line-through",
                  textDecorationThickness: "4px",
                  textDecorationColor: "rgba(255,255,255,0.15)",
                }}>
                  aluguel
                </span>
              </span>
            </LineReveal>

            {/* SWAS É PATRIMÔNIO — clip reveal + fill animado */}
            <LineReveal inView={titleInView} delay={0.18}>
              <span style={{ display: "block" }}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={titleInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: "rgba(255,255,255,0.97)", willChange: "opacity" }}
                >
                  SWAS <Accent char="É" />{" "}
                </motion.span>
                <PatrimonioAnimated inView={titleInView} />
              </span>
            </LineReveal>
          </div>

          {/* Subtítulo */}
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

        {/* ── Cards VS — entram de lados opostos, levemente inclinados ── */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr] gap-4 lg:gap-0 items-stretch">

          {/* SaaS — entra da esquerda com leve tilt */}
          <motion.div
            initial={{ opacity: 0, x: -slideX, rotate: -tiltDeg, scale: 0.96 }}
            animate={cardsInView ? { opacity: 1, x: 0, rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1rem",
              padding: "1.75rem 2.25rem",
              display: "flex", flexDirection: "column", gap: "1.5rem",
            }}>
              <div>
                <h3 className="font-heading font-bold leading-none" style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(255,255,255,0.1)",
                  textDecorationThickness: "2px",
                }}>
                  SAAS
                </h3>
                <p className="text-sm mt-1 font-heading tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.14)" }}>
                  Plataforma Compartilhada · Assinatura
                </p>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1rem", borderRadius: "0.75rem",
                background: "rgba(255,50,50,0.05)", border: "1px solid rgba(255,50,50,0.12)",
              }}>
                <div>
                  <p className="text-[10px] font-heading tracking-wider uppercase" style={{ color: "rgba(255,80,80,0.45)" }}>Custo real</p>
                  <p className="font-heading font-bold text-3xl" style={{ color: "rgba(255,70,70,0.38)" }}>
                    ∞ <span className="text-base font-normal">/mês para sempre</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                {SAAS_ITEMS.map((item, i) => <SaasRow key={i} item={item} index={i} />)}
              </div>
            </div>
          </motion.div>

          {/* VS — escala de 0 */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3">
            <div className="w-px flex-1" style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)",
            }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                willChange: "transform, opacity",
                color: "rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "9999px",
                width: "2.25rem", height: "2.25rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                fontFamily: "var(--font-heading)", fontWeight: "bold", fontSize: "0.875rem",
              }}
            >
              vs
            </motion.div>
            <div className="w-px flex-1" style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.07) 60%, transparent)",
            }} />
          </div>

          {/* SWAS — entra da direita, tilt oposto */}
          <motion.div
            initial={{ opacity: 0, x: slideX, rotate: tiltDeg, scale: 0.96 }}
            animate={cardsInView ? { opacity: 1, x: 0, rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div style={{
              background: "linear-gradient(145deg, hsl(var(--primary)/0.11) 0%, rgba(255,255,255,0.02) 55%)",
              border: "1px solid hsl(var(--primary)/0.32)",
              borderRadius: "1rem",
              padding: "1.75rem 2.25rem",
              display: "flex", flexDirection: "column", gap: "1.5rem",
              position: "relative", overflow: "hidden",
            }}>
              {/* Linha laranja topo */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.7) 35%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.7) 65%, transparent 100%)",
              }} />
              {/* Glow canto */}
              <div style={{
                position: "absolute", top: "-40px", right: "-40px",
                width: "176px", height: "176px", borderRadius: "9999px", pointerEvents: "none",
                background: "radial-gradient(circle, hsl(var(--primary)/0.13) 0%, transparent 70%)",
                filter: "blur(24px)",
              }} />
              {/* Ambient radial */}
              <div aria-hidden style={{
                position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 90% 0%, hsl(var(--primary)/0.16) 0%, hsl(var(--primary)/0.04) 45%, transparent 70%)",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 className="font-heading font-bold leading-none" style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "hsl(var(--primary))",
                  textShadow: "0 0 28px hsl(var(--primary)/0.45)",
                }}>
                  SWAS
                </h3>
                <p className="text-sm mt-1 font-heading tracking-widest uppercase" style={{ color: "hsl(var(--primary)/0.5)" }}>
                  Sistema Proprietário · Sob Medida
                </p>
              </div>

              <div style={{
                position: "relative", zIndex: 1,
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1rem", borderRadius: "0.75rem",
                background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.22)",
              }}>
                <div>
                  <p className="text-[10px] font-heading tracking-wider uppercase" style={{ color: "hsl(var(--primary)/0.65)" }}>Modelo</p>
                  <p className="font-heading font-bold text-3xl" style={{ color: "hsl(var(--primary))" }}>
                    1× <span className="text-base font-normal" style={{ color: "hsl(var(--primary)/0.65)" }}>investimento único</span>
                  </p>
                </div>
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                {SWAS_ITEMS.map((item, i) => <SwasRow key={i} item={item} index={i} />)}
              </div>

              <div style={{
                position: "relative", zIndex: 1,
                paddingTop: "1.25rem", marginTop: "auto",
                borderTop: "1px solid hsl(var(--primary)/0.14)",
              }}>
                <p className="font-heading font-bold text-center tracking-wider" style={{
                  fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                  color: "hsl(var(--primary))",
                  textShadow: "0 0 20px hsl(var(--primary)/0.4)",
                }}>
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
