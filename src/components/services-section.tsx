"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, ShoppingCart, Settings, LayoutDashboard, Code, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Smartphone,
    title: "Sites & Delivery",
    description: "Plataformas completas para restaurantes e lojas com cardápio digital, pedidos e pagamentos online.",
    tag: "01",
    // voa da esquerda-cima
    initial: { opacity: 0, x: -80, y: -40, rotate: -6 },
  },
  {
    icon: ShoppingCart,
    title: "E-commerces",
    description: "Soluções de vendas online completas, seguras e prontas para escalar com o seu negócio.",
    tag: "02",
    // voa de cima
    initial: { opacity: 0, x: 0, y: -100, rotate: 3 },
  },
  {
    icon: Settings,
    title: "Sistemas Sob Medida",
    description: "Desenvolvimento de sistemas para otimizar processos internos e aumentar produtividade.",
    tag: "03",
    // voa da direita-cima
    initial: { opacity: 0, x: 80, y: -40, rotate: 6 },
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & Admins",
    description: "Painéis de controle intuitivos para visualizar dados e tomar decisões em tempo real.",
    tag: "04",
    // voa da esquerda-baixo
    initial: { opacity: 0, x: -80, y: 40, rotate: 6 },
  },
  {
    icon: Code,
    title: "Integrações com APIs",
    description: "Conectamos seus sistemas a qualquer serviço de terceiros com segurança e eficiência.",
    tag: "05",
    // voa de baixo
    initial: { opacity: 0, x: 0, y: 100, rotate: -3 },
  },
  {
    icon: BrainCircuit,
    title: "Soluções com IA",
    description: "Integramos inteligência artificial para automatizar tarefas e acelerar sua operação.",
    tag: "06",
    // voa da direita-baixo
    initial: { opacity: 0, x: 80, y: 40, rotate: -6 },
  },
];

function ServiceCard({ service, index, inView }: {
  service: typeof SERVICES[0];
  index: number;
  inView: boolean;
}) {
  const Icon = service.icon;
  const delay = index * 0.08;

  return (
    <motion.div
      initial={service.initial}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : service.initial}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <Link href="#portfolio" className="block h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden flex flex-col gap-5 p-6 sm:p-7 cursor-pointer transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.12) 0%, transparent 70%)",
            }}
          />

          {/* Top line on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)" }}
          />

          {/* Tag + Icon */}
          <div className="flex items-start justify-between relative z-10">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: "hsl(var(--primary)/0.1)",
                border: "1px solid hsl(var(--primary)/0.25)",
                boxShadow: "0 0 0 0 hsl(var(--primary)/0.3)",
              }}
            >
              <Icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} strokeWidth={1.8} />
            </div>
            <span
              className="font-heading font-bold text-[2.2rem] leading-none select-none"
              style={{ color: "rgba(255,255,255,0.05)" }}
            >
              {service.tag}
            </span>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2 flex-1 relative z-10">
            <h3
              className="font-heading font-bold text-lg sm:text-xl leading-tight transition-colors duration-300 group-hover:text-white"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {service.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {service.description}
            </p>
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-1.5 text-sm font-heading font-bold tracking-wide relative z-10 mt-auto"
            style={{ color: "hsl(var(--primary)/0.65)" }}
          >
            <motion.span
              className="group-hover:text-[hsl(var(--primary))] transition-colors duration-300"
              style={{ color: "inherit" }}
            >
              Ver portfólio
            </motion.span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden bg-background"
    >
      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "600px",
          background: "radial-gradient(ellipse, hsl(var(--primary)/0.06) 0%, transparent 65%)",
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
            <span className="text-[9px] tracking-[0.45em] uppercase font-heading" style={{ color: "hsl(var(--primary)/0.65)" }}>
              O Que Fazemos
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold tracking-tight leading-[0.92]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", color: "rgba(255,255,255,0.97)" }}
            >
              NOSSOS<br />
              <span style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px hsl(var(--primary)/0.4)" }}>
                SERVIÇOS.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg max-w-sm"
              style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}
            >
              Soluções completas para transformar suas ideias em realidade digital.
            </motion.p>
          </div>
        </div>

        {/* Grid — os 6 cards voam de direções opostas e se encaixam */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} inView={gridInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
