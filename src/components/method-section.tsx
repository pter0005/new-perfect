"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

const SAAS_ITEMS = [
  { label: "Mensalidade eterna", desc: "Paga todo mês. Para de pagar, perde tudo." },
  { label: "Sem personalização", desc: "Você usa o que todo mundo usa. Sem identidade." },
  { label: "Código fechado", desc: "Refém do fornecedor. Preço sobe, você aceita." },
];

const SWAS_ITEMS = [
  { label: "É seu — ativo real", desc: "O código é seu. Patrimônio digital que valoriza." },
  { label: "Liberdade total", desc: "Qualquer mudança, qualquer função. Sem limites." },
  { label: "Segurança e escala", desc: "Seu banco, suas regras. Cresce com o negócio." },
];

function SaasRow({ item, index }: { item: typeof SAAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 py-4 border-b border-white/[0.05] last:border-0"
    >
      {/* X mark */}
      <div className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.25)" }}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1l6 6M7 1L1 7" stroke="rgba(255,80,80,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <p className="font-heading font-bold text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.12)" }}>
          {item.label}
        </p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

function SwasRow({ item, index }: { item: typeof SWAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 py-4 border-b last:border-0"
      style={{ borderColor: "hsl(var(--primary)/0.08)" }}
    >
      {/* Check mark */}
      <div className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.35)" }}>
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
          <path d="M1 3.5L3 5.5L7 1" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <p className="font-heading font-bold text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.9)" }}>
          {item.label}
        </p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
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
    <section id="method" className="relative overflow-hidden">
      <HeroHighlight containerClassName="py-20 sm:py-28 items-start">
        <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

          {/* ── Eyebrow + Heading ── */}
          <div ref={titleRef} className="mb-14 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span className="text-[9px] tracking-[0.45em] uppercase font-heading" style={{ color: "hsl(var(--primary)/0.65)" }}>
                O Modelo
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", color: "rgba(255,255,255,0.95)" }}
            >
              SaaS é{" "}
              <span style={{ color: "rgba(255,255,255,0.22)", textDecoration: "line-through", textDecorationThickness: "3px" }}>
                aluguel.
              </span>
              <br />
              SWAS é{" "}
              <Highlight>
                <span className="text-primary-foreground font-bold">
                  patrimônio.
                </span>
              </Highlight>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-base sm:text-lg max-w-xl"
              style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
            >
              Cansado de pagar por ferramentas que nunca são suas? O modelo SWAS entrega código próprio — um ativo digital que cresce com o seu negócio.
            </motion.p>
          </div>

          {/* ── VS Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-stretch">

            {/* SaaS — lado morto */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Header SaaS */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] tracking-[0.3em] uppercase font-heading px-2 py-0.5 rounded"
                    style={{ color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    Evitar
                  </span>
                </div>
                <h3 className="font-heading font-bold leading-none"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "rgba(255,255,255,0.28)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.12)" }}>
                  SAAS
                </h3>
                <p className="text-xs mt-1 font-heading tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.18)" }}>
                  Software as a Service
                </p>
              </div>

              {/* Preço simbólico */}
              <div className="mb-6 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,60,60,0.04)", border: "1px solid rgba(255,60,60,0.1)" }}>
                <p className="text-xs font-heading tracking-wider uppercase" style={{ color: "rgba(255,80,80,0.5)" }}>
                  Custo real
                </p>
                <p className="font-heading font-bold text-2xl mt-0.5" style={{ color: "rgba(255,80,80,0.4)" }}>
                  ∞<span className="text-sm font-normal ml-1" style={{ color: "rgba(255,80,80,0.3)" }}>/mês para sempre</span>
                </p>
              </div>

              <div>
                {SAAS_ITEMS.map((item, i) => <SaasRow key={i} item={item} index={i} />)}
              </div>
            </motion.div>

            {/* VS divider */}
            <div className="hidden lg:flex flex-col items-center justify-center px-6 gap-3">
              <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)" }} />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={titleInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-heading font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  letterSpacing: "0.05em",
                }}
              >
                vs
              </motion.div>
              <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 70%, transparent)" }} />
            </div>

            {/* SWAS — lado vivo */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, hsl(var(--primary)/0.1) 0%, rgba(255,255,255,0.03) 60%)",
                border: "1px solid hsl(var(--primary)/0.3)",
                boxShadow: "0 0 60px hsl(var(--primary)/0.06) inset",
              }}
            >
              {/* Linha animada no topo */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6) 40%, hsl(var(--primary)/0.6) 60%, transparent)" }} />

              {/* Glow canto */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)", filter: "blur(20px)" }} />

              {/* Header SWAS */}
              <div className="mb-6 relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] tracking-[0.3em] uppercase font-heading px-2 py-0.5 rounded"
                    style={{ color: "hsl(var(--primary)/0.9)", background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.25)" }}>
                    Recomendado
                  </span>
                </div>
                <h3 className="font-heading font-bold leading-none"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "hsl(var(--primary))", textShadow: "0 0 25px hsl(var(--primary)/0.4)" }}>
                  SWAS
                </h3>
                <p className="text-xs mt-1 font-heading tracking-widest uppercase"
                  style={{ color: "hsl(var(--primary)/0.55)" }}>
                  Software with a Service
                </p>
              </div>

              {/* Preço simbólico */}
              <div className="mb-6 px-4 py-3 rounded-xl relative z-10"
                style={{ background: "hsl(var(--primary)/0.07)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                <p className="text-xs font-heading tracking-wider uppercase" style={{ color: "hsl(var(--primary)/0.7)" }}>
                  Modelo
                </p>
                <p className="font-heading font-bold text-2xl mt-0.5" style={{ color: "hsl(var(--primary))" }}>
                  1×<span className="text-sm font-normal ml-1" style={{ color: "hsl(var(--primary)/0.65)" }}>investimento único</span>
                </p>
              </div>

              <div className="relative z-10">
                {SWAS_ITEMS.map((item, i) => <SwasRow key={i} item={item} index={i} />)}
              </div>

              {/* Bottom callout */}
              <div className="mt-6 pt-5 relative z-10"
                style={{ borderTop: "1px solid hsl(var(--primary)/0.12)" }}>
                <p className="font-heading font-bold text-center"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "hsl(var(--primary)/0.9)", letterSpacing: "0.04em" }}>
                  VOCÊ NO CONTROLE. SEMPRE.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}