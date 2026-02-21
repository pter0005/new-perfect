"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SAAS_ITEMS = [
  {
    label: "Cobrança Contínua",
    desc: "Você paga todo mês. Se parar, perde o acesso. Nunca é seu.",
  },
  {
    label: "Estrutura Padronizada",
    desc: "Você entra no formato pronto. Nada realmente exclusivo.",
  },
  {
    label: "Dependência de Terceiros",
    desc: "Mudaram as regras? Você se adapta.",
  },
];

const SWAS_ITEMS = [
  {
    label: "Propriedade Real",
    desc: "É seu. Código, estrutura e controle — patrimônio digital que valoriza.",
  },
  {
    label: "Personalização Sem Limite",
    desc: "Criado para sua operação, não para o mercado inteiro.",
  },
  {
    label: "Base Sólida para Crescer",
    desc: "Infraestrutura preparada para escalar com você.",
  },
];

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2l10 10M12 2L2 12" stroke="rgba(255,80,80,0.8)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
      <path d="M1.5 6L5.5 10L12.5 1.5" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
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
      className="flex items-start gap-4"
    >
      {/* Icon — bigger, more visible */}
      <div className="mt-1 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{
          background: "rgba(255,60,60,0.08)",
          border: "1px solid rgba(255,60,60,0.2)",
        }}>
        <XIcon />
      </div>
      <div className="flex-1 pb-5 border-b border-white/[0.05] last:border-0">
        <p className="font-heading font-bold text-base sm:text-lg leading-tight"
          style={{
            color: "rgba(255,255,255,0.32)",
            textDecoration: "line-through",
            textDecorationColor: "rgba(255,255,255,0.1)",
          }}>
          {item.label}
        </p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.18)" }}>
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
      className="flex items-start gap-4"
    >
      {/* Icon — bigger, more visible */}
      <div className="mt-1 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{
          background: "hsl(var(--primary)/0.12)",
          border: "1px solid hsl(var(--primary)/0.4)",
          boxShadow: "0 0 12px hsl(var(--primary)/0.12)",
        }}>
        <CheckIcon />
      </div>
      <div className="flex-1 pb-5 border-b last:border-0"
        style={{ borderColor: "hsl(var(--primary)/0.07)" }}>
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

export default function MethodSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="method" className="relative py-20 sm:py-28 overflow-hidden bg-background">

      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "5%", left: "60%", transform: "translateX(-30%)",
          width: "700px", height: "700px",
          background: "radial-gradient(ellipse, hsl(var(--primary)/0.06) 0%, transparent 65%)",
          filter: "blur(90px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Heading enorme ── */}
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

          {/* Big statement — isso é o que importa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading font-bold leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)", color: "rgba(255,255,255,0.95)" }}>
              SaaS é{" "}
              <span style={{
                color: "rgba(255,255,255,0.2)",
                textDecoration: "line-through",
                textDecorationThickness: "4px",
                textDecorationColor: "rgba(255,255,255,0.15)",
              }}>
                aluguel.
              </span>
            </h2>
            <h2 className="font-heading font-bold leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)", color: "rgba(255,255,255,0.95)" }}>
              SWAS é{" "}
              <span style={{
                color: "hsl(var(--primary))",
                textShadow: "0 0 40px hsl(var(--primary)/0.45), 0 0 80px hsl(var(--primary)/0.2)",
              }}>
                patrimônio.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base sm:text-lg max-w-lg"
            style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}
          >
            Cansado de pagar por ferramentas que nunca são suas? O modelo SWAS entrega código próprio — um ativo digital que cresce com o seu negócio.
          </motion.p>
        </div>

        {/* ── Cards VS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr] gap-4 lg:gap-0 items-stretch">

          {/* ─── SaaS card ─── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7 sm:p-9 flex flex-col gap-7"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Header */}
            <div>
              <span className="inline-block text-[9px] tracking-[0.3em] uppercase font-heading px-2.5 py-1 rounded mb-4"
                style={{ color: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                Evitar
              </span>
              <div className="flex items-end gap-4">
                <h3 className="font-heading font-bold leading-none"
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                    color: "rgba(255,255,255,0.22)",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255,255,255,0.1)",
                    textDecorationThickness: "3px",
                  }}>
                  SAAS
                </h3>
                <p className="text-xs pb-1 font-heading tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.15)" }}>
                  Plataforma Compartilhada
                </p>
              </div>
            </div>

            {/* Cost badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,50,50,0.05)", border: "1px solid rgba(255,50,50,0.12)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,50,50,0.08)", border: "1px solid rgba(255,50,50,0.18)" }}>
                <XIcon />
              </div>
              <div>
                <p className="text-[10px] font-heading tracking-wider uppercase" style={{ color: "rgba(255,80,80,0.45)" }}>Custo real</p>
                <p className="font-heading font-bold text-xl" style={{ color: "rgba(255,70,70,0.38)" }}>
                  ∞ <span className="text-sm font-normal">/mês para sempre</span>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-5">
              {SAAS_ITEMS.map((item, i) => <SaasRow key={i} item={item} index={i} />)}
            </div>
          </motion.div>

          {/* ─── VS divider ─── */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3">
            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)" }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="font-heading font-bold text-sm w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                color: "rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              vs
            </motion.div>
            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.07) 60%, transparent)" }} />
          </div>

          {/* ─── SWAS card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7 sm:p-9 flex flex-col gap-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsl(var(--primary)/0.11) 0%, rgba(255,255,255,0.02) 55%)",
              border: "1px solid hsl(var(--primary)/0.32)",
            }}
          >
            {/* Linha laranja no topo */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.7) 35%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.7) 65%, transparent 100%)" }} />

            {/* Fundo laranja degradê — estilo que o usuário pediu */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
              background:
                "radial-gradient(ellipse at 85% 0%, hsl(var(--primary)/0.18) 0%, hsl(var(--primary)/0.05) 40%, transparent 70%)",
            }} />

            {/* Header */}
            <div className="relative z-10">
              <span className="inline-block text-[9px] tracking-[0.3em] uppercase font-heading px-2.5 py-1 rounded mb-4"
                style={{ color: "hsl(var(--primary)/0.9)", background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.28)" }}>
                Recomendado
              </span>
              <div className="flex items-end gap-4">
                <h3 className="font-heading font-bold leading-none"
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                    color: "hsl(var(--primary))",
                    textShadow: "0 0 30px hsl(var(--primary)/0.45)",
                  }}>
                  SWAS
                </h3>
                <p className="text-xs pb-1 font-heading tracking-widest uppercase"
                  style={{ color: "hsl(var(--primary)/0.5)" }}>
                  Sistema Proprietário
                </p>
              </div>
            </div>

            {/* Cost badge */}
            <div className="relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.22)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "hsl(var(--primary)/0.14)",
                  border: "1px solid hsl(var(--primary)/0.4)",
                  boxShadow: "0 0 10px hsl(var(--primary)/0.15)",
                }}>
                <CheckIcon />
              </div>
              <div>
                <p className="text-[10px] font-heading tracking-wider uppercase" style={{ color: "hsl(var(--primary)/0.65)" }}>Modelo</p>
                <p className="font-heading font-bold text-xl" style={{ color: "hsl(var(--primary))" }}>
                  1× <span className="text-sm font-normal" style={{ color: "hsl(var(--primary)/0.65)" }}>investimento único</span>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="relative z-10 flex flex-col gap-5">
              {SWAS_ITEMS.map((item, i) => <SwasRow key={i} item={item} index={i} />)}
            </div>

            {/* Bottom callout */}
            <div className="relative z-10 mt-auto pt-6"
              style={{ borderTop: "1px solid hsl(var(--primary)/0.14)" }}>
              <p className="font-heading font-bold text-center tracking-wider"
                style={{
                  fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                  color: "hsl(var(--primary))",
                  textShadow: "0 0 20px hsl(var(--primary)/0.4)",
                }}>
                AUTONOMIA TOTAL. SEMPRE.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
