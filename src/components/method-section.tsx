"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

const SAAS_ITEMS = [
  {
    label: "Cobrança Contínua",
    desc: "Você paga uma mensalidade recorrente. Se parar, perde o acesso. O software nunca é seu de fato.",
  },
  {
    label: "Estrutura Padronizada",
    desc: "Sua operação se adapta a uma ferramenta genérica, que não foi feita para as suas necessidades exclusivas.",
  },
  {
    label: "Dependência de Terceiros",
    desc: "A plataforma define o futuro do seu negócio. Aumentaram o preço? Mudaram as regras? Você se adapta.",
  },
];

const SWAS_ITEMS = [
  {
    label: "Propriedade Real e Ativo Digital",
    desc: "O código-fonte é seu. Um investimento que se torna patrimônio da sua empresa e valoriza com o tempo.",
  },
  {
    label: "Personalização Sem Limites",
    desc: "O sistema é construído sob medida para sua operação, resolvendo seus problemas reais, sem funcionalidades inúteis.",
  },
  {
    label: "Base Sólida para Crescer",
    desc: "Uma infraestrutura robusta, segura e totalmente sua, preparada para escalar conforme sua empresa cresce.",
  },
];

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" stroke="rgba(255,100,100,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path d="M2 7L7 12L16 2" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SaasRow({ item, index }: { item: typeof SAAS_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 py-5 border-b border-white/[0.04] last:border-0"
    >
      <div className="mt-1 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-900/20 border border-red-800/30">
        <XIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-lg text-neutral-500 line-through decoration-red-800/50">
          {item.label}
        </p>
        <p className="text-base mt-1.5 text-neutral-600">
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
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 py-5 border-b border-primary/10 last:border-0"
    >
      <div className="mt-1 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.1)]">
        <CheckIcon />
      </div>
      <div>
        <p className="font-heading font-bold text-lg text-neutral-100">
          {item.label}
        </p>
        <p className="text-base mt-1.5 text-neutral-400">
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
    <HeroHighlight containerClassName="py-20 sm:py-28 items-start">
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">
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
              style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)" }}>
              <Highlight>
                SWAS é patrimônio.
              </Highlight>
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-8 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={titleInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-8 flex flex-col gap-8 bg-neutral-900/50 border border-neutral-800 min-h-[620px]"
          >
            <div>
              <span className="text-xs tracking-widest uppercase font-heading text-neutral-500">O Aluguel</span>
              <h3 className="font-heading font-bold text-5xl text-neutral-700 mt-2 line-through decoration-neutral-800">
                SAAS
              </h3>
              <p className="text-sm font-heading tracking-wider uppercase text-neutral-600">Software as a Service</p>
            </div>
            <div className="flex flex-col">
              {SAAS_ITEMS.map((item, i) => <SaasRow key={i} item={item} index={i} />)}
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-col items-center justify-center self-stretch pt-32">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={titleInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-8 flex flex-col gap-8 relative overflow-hidden bg-neutral-900/30 border border-primary/30 min-h-[620px]"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="relative z-10">
              <span className="text-xs tracking-widest uppercase font-heading text-primary/80">A Propriedade</span>
              <h3 className="font-heading font-bold text-5xl text-neutral-50 mt-2">
                SWAS
              </h3>
              <p className="text-sm font-heading tracking-wider uppercase text-primary/60">Software with a Service</p>
            </div>
            
            <div className="relative z-10 flex flex-col">
              {SWAS_ITEMS.map((item, i) => <SwasRow key={i} item={item} index={i} />)}
            </div>

            <div className="relative z-10 mt-auto pt-6 border-t border-primary/10">
                <p className="font-heading font-bold text-center text-xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                  AUTONOMIA TOTAL. SEMPRE.
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </HeroHighlight>
  );
}
