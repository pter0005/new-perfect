"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap";
const HEADING_FONT = "'Barlow Condensed', sans-serif";

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

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  color: "rgba(255,255,255,0.88)",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.45rem",
  fontSize: "0.78rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.38)",
  fontFamily: HEADING_FONT,
  fontWeight: 600,
};

function Field({ label, id, name, type = "text", placeholder, required, disabled, rows }: {
  label: string; id: string; name: string; type?: string; placeholder: string;
  required?: boolean; disabled?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const focusStyle: React.CSSProperties = focused ? {
    borderColor: "hsl(var(--primary)/0.5)",
    boxShadow: "0 0 0 3px hsl(var(--primary)/0.08)",
  } : {};

  const Tag = rows ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <Tag
        id={id} name={name} type={rows ? undefined : type}
        placeholder={placeholder} required={required} disabled={disabled}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...fieldStyle, ...focusStyle,
          resize: rows ? "none" : undefined,
          minHeight: rows ? `${rows * 1.6}rem` : undefined,
          opacity: disabled ? 0.5 : 1,
        }}
      />
    </div>
  );
}

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: isMobile ? "-20px" : "-60px" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);
    try {
      const res = await fetch("https://formsubmit.co/ajax/b27ba263210b726a6b1c57b00645ca7d", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Mensagem Enviada!", description: "Retornamos em breve." });
      (e.target as HTMLFormElement).reset();
    } catch {
      toast({ variant: "destructive", title: "Erro ao Enviar", description: "Tente novamente mais tarde." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <style>{`@import url('${FONT_URL}');`}</style>
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "600px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.09) 0%, transparent 55%)",
          filter: "blur(90px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.2) 30%, hsl(var(--primary)/0.2) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div ref={titleRef} className="mb-14">
          <LineReveal inView={titleInView} delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(var(--primary)/0.7)" }} />
              <span className="text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: HEADING_FONT, color: "hsl(var(--primary)/0.65)" }}>
                Fale com a NEW
              </span>
            </div>
          </LineReveal>
          <div className="font-bold tracking-tight leading-[0.92]" style={{ fontFamily: HEADING_FONT, fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
            <LineReveal inView={titleInView} delay={0.08}>
              <span style={{ color: "rgba(255,255,255,0.97)" }}>VAMOS CONSTRUIR</span>
            </LineReveal>
            <LineReveal inView={titleInView} delay={0.17}>
              <span style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px hsl(var(--primary)/0.4)" }}>
                SEU FUTURO.
              </span>
            </LineReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: "460px", willChange: "transform, opacity" }}
            className="mt-5 text-base sm:text-lg"
          >
            Conta sua ideia. A gente pega e faz virar realidade — com código que é seu.
          </motion.p>
        </div>

        {/* Layout 2 colunas: form + canal direto */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">

          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={formInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1.25rem",
              padding: "2rem 2rem",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Glow canto */}
              <div aria-hidden style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)",
              }} />

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <input type="text" name="_honey" style={{ display: "none" }} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://new-tec.netlify.app/" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nome" id="name" name="name" placeholder="Seu nome" required disabled={isSubmitting} />
                  <Field label="E-mail" id="email" name="email" type="email" placeholder="seu@email.com" required disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="WhatsApp (opcional)" id="whatsapp" name="whatsapp" placeholder="(XX) XXXXX-XXXX" disabled={isSubmitting} />
                  <Field label="Empresa (opcional)" id="company" name="company" placeholder="Nome da empresa" disabled={isSubmitting} />
                </div>
                <Field label="Descreva seu projeto" id="message" name="message" placeholder="Conta sua ideia, objetivos e qualquer detalhe..." required disabled={isSubmitting} rows={5} />

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1.5rem",
                    borderRadius: "0.75rem",
                    border: "none",
                    background: "hsl(var(--primary))",
                    color: "#000",
                    fontFamily: HEADING_FONT,
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 0 28px hsl(var(--primary)/0.4), 0 0 60px hsl(var(--primary)/0.15)",
                    transition: "box-shadow 0.3s, opacity 0.2s",
                  }}
                >
                  <Send style={{ width: "1rem", height: "1rem" }} strokeWidth={2.5} />
                  {isSubmitting ? "Enviando..." : "Solicitar Proposta"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Coluna direita: canais + info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col gap-4"
          >
            {/* WhatsApp */}
            <Link
              href="https://wa.me/5511943157277?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20NEW."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(37,211,102,0.04)",
                border: "1px solid rgba(37,211,102,0.18)",
                textDecoration: "none",
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)" }}>
                <MessageCircle className="w-6 h-6" style={{ color: "#25D366" }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-bold text-base" style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.9)" }}>WhatsApp</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>Resposta rápida garantida</p>
              </div>
              <div className="ml-auto text-lg transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#25D366" }}>
                →
              </div>
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/new.c0de/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "hsl(var(--primary)/0.04)",
                border: "1px solid hsl(var(--primary)/0.18)",
                textDecoration: "none",
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.3)" }}>
                <Instagram className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-bold text-base" style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.9)" }}>Instagram</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>@new.c0de</p>
              </div>
              <div className="ml-auto text-lg transition-transform duration-300 group-hover:translate-x-1" style={{ color: "hsl(var(--primary))" }}>
                →
              </div>
            </Link>

            {/* Promessa */}
            <div className="mt-2 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-bold text-sm mb-3" style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Nossa Promessa
              </p>
              {[
                "Resposta em até 24h",
                "Orçamento sem compromisso",
                "Código 100% seu ao final",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))", boxShadow: "0 0 6px hsl(var(--primary)/0.6)" }} />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
