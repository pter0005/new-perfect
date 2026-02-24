"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, LayoutTemplate, CheckCircle2, Code2, ShieldCheck, Rocket, LifeBuoy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap";
const HEADING_FONT = "'Barlow Condensed', sans-serif";

const STEPS = [
  { icon: ClipboardList, title: "Briefing",       desc: "Entendemos suas necessidades, objetivos e contexto de negócio.",          color: "hsl(var(--primary))" },
  { icon: LayoutTemplate, title: "Protótipo",     desc: "Criamos um design visual e funcional para validar o caminho.",             color: "hsl(var(--primary))" },
  { icon: CheckCircle2,  title: "Aprovação",       desc: "Refinamos o protótipo com base no seu feedback — nada sem sua aprovação.", color: "hsl(var(--primary))" },
  { icon: Code2,         title: "Desenvolvimento", desc: "Codificamos com tecnologia de ponta: Next.js, TypeScript, Firebase.",      color: "hsl(var(--primary))" },
  { icon: ShieldCheck,   title: "Testes",          desc: "Garantimos qualidade, performance e segurança em cada detalhe.",           color: "hsl(var(--primary))" },
  { icon: Rocket,        title: "Entrega",         desc: "Lançamos e entregamos todos os acessos — o projeto é seu.",                color: "hsl(var(--primary))" },
  { icon: LifeBuoy,      title: "Suporte",         desc: "Estamos ao lado do seu crescimento com suporte contínuo e real.",          color: "hsl(var(--primary))" },
];

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

function StepCard({ step, index, inView, isMobile }: {
  step: typeof STEPS[0]; index: number; inView: boolean; isMobile: boolean;
}) {
  const Icon = step.icon;
  const isLast = index === STEPS.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 24 : 36, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.06 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="group relative flex flex-col"
    >
      {/* Card */}
      <div
        className="relative flex flex-col gap-4 p-5 sm:p-6 rounded-2xl h-full transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Hover top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] w-0 group-hover:w-full rounded-t-2xl transition-all duration-500"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)" }}
        />
        {/* Hover bg glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.08) 0%, transparent 70%)" }}
        />

        {/* Number + Icon */}
        <div className="flex items-start justify-between relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: "hsl(var(--primary)/0.1)",
              border: "1px solid hsl(var(--primary)/0.28)",
            }}
          >
            <Icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} strokeWidth={1.8} />
          </div>
          <span
            className="font-bold text-[2rem] leading-none select-none"
            style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.06)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5 flex-1 relative z-10">
          <h3
            className="font-bold text-lg sm:text-xl leading-tight group-hover:text-white transition-colors duration-300"
            style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.88)" }}
          >
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            {step.desc}
          </p>
        </div>
      </div>

      {/* Conector → entre cards (horizontal, desktop) */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.18 + index * 0.07 }}
          className="absolute top-[42px] -right-[14px] w-[14px] h-[1px] hidden xl:block"
          style={{ background: "hsl(var(--primary)/0.3)", transformOrigin: "left" }}
        />
      )}
    </motion.div>
  );
}

export default function WorkProcessSection() {
  const isMobile = useIsMobile();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: isMobile ? "-20px" : "-60px" });

  return (
    <section id="work-process" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <style>{`@import url('${FONT_URL}');`}</style>
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
          width: "1000px", height: "500px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.06) 0%, transparent 60%)",
          filter: "blur(100px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div ref={titleRef} className="mb-14 sm:mb-18">
          <LineReveal inView={titleInView} delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span className="text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: HEADING_FONT, color: "hsl(var(--primary)/0.65)" }}>
                Como Trabalhamos
              </span>
            </div>
          </LineReveal>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div className="font-bold tracking-tight leading-[0.92]" style={{ fontFamily: HEADING_FONT, fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              <LineReveal inView={titleInView} delay={0.08}>
                <span style={{ color: "rgba(255,255,255,0.97)" }}>DO BRIEFING</span>
              </LineReveal>
              <LineReveal inView={titleInView} delay={0.17}>
                <span style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px hsl(var(--primary)/0.4)" }}>
                  AO LANÇAMENTO.
                </span>
              </LineReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.7, willChange: "transform, opacity" }}
              className="text-base sm:text-lg max-w-sm"
            >
              Processo transparente e colaborativo — você acompanha cada etapa.
            </motion.p>
          </div>
        </div>

        {/* Steps grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4"
        >
          {STEPS.map((step, i) => (
            <StepCard key={i} step={step} index={i} inView={gridInView} isMobile={!!isMobile} />
          ))}
        </div>

      </div>
    </section>
  );
}
