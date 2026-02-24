"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap";
const HEADING_FONT = "'Barlow Condensed', sans-serif";

const FAQS = [
  {
    q: "O site será realmente meu?",
    a: "Sim. Diferente de plataformas SaaS, aqui você recebe todos os arquivos e acessos ao final do projeto — sem mensalidade, sem dependência, sem taxa de manutenção. É patrimônio digital.",
  },
  {
    q: "Quanto tempo leva para meu projeto ficar pronto?",
    a: "Depende da complexidade. Landing pages simples ficam prontas em dias; sistemas mais robustos levam algumas semanas. Sempre definimos um cronograma claro antes de começar.",
  },
  {
    q: "E se eu precisar de alterações no futuro?",
    a: "Seu projeto é totalmente flexível. Oferecemos pacotes de horas ou orçamentos pontuais para novas funcionalidades, ajustes de design ou qualquer evolução que seu negócio precisar.",
  },
  {
    q: "Vocês cuidam da hospedagem e domínio?",
    a: "Auxiliamos em todo o processo de contratação e configuração — recomendando os melhores serviços para a sua necessidade. Os custos são pagos diretamente ao provedor, sem margem nossa.",
  },
  {
    q: "Quais tecnologias vocês usam?",
    a: "Next.js, TypeScript, Firebase, Tailwind CSS, Framer Motion e as melhores ferramentas do ecossistema moderno. Performance e escalabilidade por padrão.",
  },
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

function FaqItem({ item, index, inView }: { item: typeof FAQS[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: open ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
          border: open ? "1px solid hsl(var(--primary)/0.28)" : "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6"
          style={{ cursor: "pointer", background: "transparent", border: "none", outline: "none" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-bold text-[1.1rem] select-none flex-shrink-0"
              style={{ fontFamily: HEADING_FONT, color: open ? "hsl(var(--primary)/0.7)" : "rgba(255,255,255,0.1)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-bold text-base sm:text-lg leading-snug"
              style={{ fontFamily: HEADING_FONT, color: open ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.75)" }}>
              {item.q}
            </span>
          </div>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <Plus
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: open ? "hsl(var(--primary))" : "rgba(255,255,255,0.3)" }}
              strokeWidth={2}
            />
          </motion.div>
        </button>

        {/* Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.25rem]">
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const isMobile = useIsMobile();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: isMobile ? "-20px" : "-60px" });

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <style>{`@import url('${FONT_URL}');`}</style>
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "400px",
          background: "radial-gradient(ellipse at 50% 100%, hsl(var(--primary)/0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div ref={titleRef} className="mb-14">
          <LineReveal inView={titleInView} delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span className="text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: HEADING_FONT, color: "hsl(var(--primary)/0.65)" }}>
                Dúvidas Frequentes
              </span>
            </div>
          </LineReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div className="font-bold tracking-tight leading-[0.92]" style={{ fontFamily: HEADING_FONT, fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              <LineReveal inView={titleInView} delay={0.08}>
                <span style={{ color: "rgba(255,255,255,0.97)" }}>SUAS DÚVIDAS,</span>
              </LineReveal>
              <LineReveal inView={titleInView} delay={0.17}>
                <span style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px hsl(var(--primary)/0.4)" }}>
                  RESPONDIDAS.
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
              Clareza antes de começar. Transparência durante o processo.
            </motion.p>
          </div>
        </div>

        {/* FAQ list — max-width pra leitura confortável */}
        <div ref={listRef} className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FaqItem key={i} item={item} index={i} inView={listInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
