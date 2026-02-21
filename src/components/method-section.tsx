"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SAAS_ITEMS = [
  { label: "Cobrança Contínua", desc: "Você paga todo mês. Se parar, perde o acesso. Nunca é seu." },
  { label: "Estrutura Padronizada", desc: "Você entra no formato pronto. Nada realmente exclusivo." },
  { label: "Dependência de Terceiros", desc: "Mudaram as regras? Você se adapta." },
];

const SWAS_ITEMS = [
  { label: "Propriedade Real", desc: "É seu. Código, estrutura e controle — patrimônio digital que valoriza." },
  { label: "Personalização Sem Limite", desc: "Criado para sua operação, não para o mercado inteiro." },
  { label: "Base Sólida para Crescer", desc: "Infraestrutura preparada para escalar com você." },
];

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2l8 8M10 2L2 10" stroke="rgba(255,80,80,0.75)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
      <path d="M1.5 5.5L5 9L11.5 1.5" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SaasRow({ item, index }: { item: typeof SAAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 py-4 border-b border-white/[0.05] last:border-0"
    >
      <div className="mt-0.5 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{ background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)" }}>
        <XIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-base sm:text-lg leading-tight"
          style={{ color: "rgba(255,255,255,0.32)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.1)" }}>
          {item.label}
        </p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

function SwasRow({ item, index }: { item: typeof SWAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 py-4 border-b last:border-0"
      style={{ borderColor: "hsl(var(--primary)/0.08)" }}
    >
      <div className="mt-0.5 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{ background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.4)", boxShadow: "0 0 10px hsl(var(--primary)/0.12)" }}>
        <CheckIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-base sm:text-lg leading-tight"
          style={{ color: "rgba(255,255,255,0.92)" }}>
          {item.label}
        </p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── "PATRIMÔNIO." preenchido com laranja da esquerda pra direita ──
function PatrimonioAnimated({ inView }: { inView: boolean }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Texto base — cinza apagado */}
      <span
        style={{
          color: "rgba(255,255,255,0.15)",
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
          letterSpacing: "inherit",
          lineHeight: "inherit",
          display: "block",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        patrimônio.
      </span>

      {/* Texto laranja que se revela da esquerda pra direita via clip-path */}
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          color: "hsl(var(--primary))",
          textShadow: "0 0 40px hsl(var(--primary)/0.5), 0 0 80px hsl(var(--primary)/0.2)",
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
          letterSpacing: "inherit",
          lineHeight: "inherit",
          display: "block",
          whiteSpace: "nowrap",
        }}
      >
        patrimônio.
      </motion.span>
    </span>
  );
}

// ── "SWAS É" também recebe a cor laranja com pequeno delay ──
function SwasEAnimated({ inView }: { inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0.15, color: "rgba(255,255,255,0.15)" }}
      animate={inView ? { opacity: 1, color: "rgba(255,255,255,0.97)" } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      SWAS É{" "}
    </motion.span>
  );
}

export default function MethodSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="method" className="relative py-20 sm:py-28 overflow-hidden bg-background">

      {/* Ambient glow */}
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

        {/* ── Heading ── */}
        <div ref={titleRef} className="mb-16 sm:mb-20">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
            <span className="text-[9px] tracking-[0.45em] uppercase font-heading" style={{ color: "hsl(var(--primary)/0.65)" }}>
              O Modelo
            </span>
          </motion.div>

          {/* SAAS É ALUGUEL — estático, menor, riscado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "rgba(255,255,255,0.95)" }}
          >
            SAAS É{" "}
            <span style={{
              color: "rgba(255,255,255,0.2)",
              textDecoration: "line-through",
              textDecorationThickness: "4px",
              textDecorationColor: "rgba(255,255,255,0.15)",
            }}>
              aluguel.
            </span>
          </motion.div>

          {/* SWAS É PATRIMÔNIO — animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <SwasEAnimated inView={titleInView} />
            <PatrimonioAnimated inView={titleInView} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base sm:text-lg max-w-lg"
            style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}
          >
            Cansado de pagar por ferramentas que nunca são suas? O modelo SWAS entrega código próprio — um ativo digital que cresce com o seu negócio.
          </motion.p>
        </div>

        {/* ── Cards VS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr] gap-4 lg:gap-0 items-stretch">

          {/* SaaS */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7 sm:p-9 flex flex-col gap-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <h3 className="font-heading font-bold leading-none"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(255,255,255,0.1)",
                  textDecorationThickness: "2px",
                }}>
                SAAS
              </h3>
              <p className="text-xs mt-1 font-heading tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.14)" }}>
                Plataforma Compartilhada · Assinatura
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,50,50,0.05)", border: "1px solid rgba(255,50,50,0.12)" }}>
              <div>
                <p className="text-[10px] font-heading tracking-wider uppercase" style={{ color: "rgba(255,80,80,0.45)" }}>Custo real</p>
                <p className="font-heading font-bold text-2xl" style={{ color: "rgba(255,70,70,0.38)" }}>
                  ∞ <span className="text-sm font-normal">/mês para sempre</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {SAAS_ITEMS.map((item, i) => <SaasRow key={i} item={item} index={i} />)}
            </div>
          </motion.div>

          {/* VS */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3">
            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)" }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="font-heading font-bold text-sm w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              vs
            </motion.div>
            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.07) 60%, transparent)" }} />
          </div>

          {/* SWAS */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7 sm:p-9 flex flex-col gap-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsl(var(--primary)/0.11) 0%, rgba(255,255,255,0.02) 55%)",
              border: "1px solid hsl(var(--primary)/0.32)",
            }}
          >
            {/* Linha laranja topo */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.7) 35%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.7) 65%, transparent 100%)" }} />
            {/* Glow canto */}
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.13) 0%, transparent 70%)", filter: "blur(24px)" }} />
            {/* Fundo laranja degrade */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 90% 0%, hsl(var(--primary)/0.16) 0%, hsl(var(--primary)/0.04) 45%, transparent 70%)",
            }} />

            <div className="relative z-10">
              <h3 className="font-heading font-bold leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "hsl(var(--primary))", textShadow: "0 0 28px hsl(var(--primary)/0.45)" }}>
                SWAS
              </h3>
              <p className="text-xs mt-1 font-heading tracking-widest uppercase" style={{ color: "hsl(var(--primary)/0.5)" }}>
                Sistema Proprietário · Sob Medida
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.22)" }}>
              <div>
                <p className="text-[10px] font-heading tracking-wider uppercase" style={{ color: "hsl(var(--primary)/0.65)" }}>Modelo</p>
                <p className="font-heading font-bold text-2xl" style={{ color: "hsl(var(--primary))" }}>
                  1× <span className="text-sm font-normal" style={{ color: "hsl(var(--primary)/0.65)" }}>investimento único</span>
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col">
              {SWAS_ITEMS.map((item, i) => <SwasRow key={i} item={item} index={i} />)}
            </div>

            <div className="relative z-10 mt-auto pt-5" style={{ borderTop: "1px solid hsl(var(--primary)/0.14)" }}>
              <p className="font-heading font-bold text-center tracking-wider"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: "hsl(var(--primary))", textShadow: "0 0 20px hsl(var(--primary)/0.4)" }}>
                AUTONOMIA TOTAL. SEMPRE.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
    