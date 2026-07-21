"use client";

/**
 * FICHA DE PROJETO — banner explicativo de 1 página.
 * Estética editorial/impresso: hairlines, mono técnico, canto reto,
 * sem ícones, sem glass, sem glow. Cobaia: Pizza Nova.
 */

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap";
const DISPLAY = "'Barlow Condensed', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

const HAIR = "1px solid rgba(255,255,255,0.14)";
const HAIR_SOFT = "1px solid rgba(255,255,255,0.08)";

const PROJECT = {
  nameA: "PIZZA",
  nameB: "NOVA",
  ficha: "Nº 006",
  rev: "REV 07.2026",
  pitch: "O pedido sai da mesa e cai direto na cozinha. Sem app, sem comissão.",
  image: "/projects/pizza-nova.webp",
  caption: "FIG. 01 · CARDÁPIO ABERTO DIRETO DO QR DA MESA",
  meta: [
    ["TIPO", "Cardápio digital e pedidos"],
    ["SEGMENTO", "Pizzaria e restaurante"],
    ["ENTREGA", "Site, painel e tela da cozinha"],
    ["STACK", "Next.js · Firebase tempo real"],
  ] as [string, string][],
  features: [
    { title: "QR na mesa",         desc: "O cliente escaneia e o cardápio abre na hora. Sem baixar nada." },
    { title: "Direto pra cozinha", desc: "O pedido aparece na tela da cozinha em tempo real." },
    { title: "Status ao vivo",     desc: "Em preparo, pronto. O cliente acompanha pelo celular." },
    { title: "Painel do dono",     desc: "Edita o cardápio a qualquer momento, sem depender de ninguém." },
    { title: "Sem comissão",       desc: "Pedido no seu sistema, sem marketplace mordendo o lucro." },
  ],
  wins: ["0 APPS PRA BAIXAR", "0% DE COMISSÃO", "100% CÓDIGO DO DONO"],
};

const EASE = [0.22, 1, 0.36, 1] as const;
/* initial idêntico no servidor e no cliente (hidratação); MotionConfig
   reducedMotion="user" corta o transform pra quem pede menos movimento */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* Marca de corte de impressão (canto de figura) */
function CropMark({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const s: React.CSSProperties = { position: "absolute", width: 12, height: 12, pointerEvents: "none" };
  const line = "1px solid hsl(var(--primary)/0.8)";
  if (pos === "tl") Object.assign(s, { top: -7, left: -7, borderTop: line, borderLeft: line });
  if (pos === "tr") Object.assign(s, { top: -7, right: -7, borderTop: line, borderRight: line });
  if (pos === "bl") Object.assign(s, { bottom: -7, left: -7, borderBottom: line, borderLeft: line });
  if (pos === "br") Object.assign(s, { bottom: -7, right: -7, borderBottom: line, borderRight: line });
  return <span aria-hidden style={s} />;
}

export default function ApresentacaoClient() {
  return (
    <MotionConfig reducedMotion="user">
    <main className="min-h-screen bg-background text-foreground">
      <style>{`@import url('${FONT_URL}');`}</style>

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 pt-5 pb-8 lg:min-h-screen lg:flex lg:flex-col">

        {/* Régua superior: navegação + carimbo da ficha */}
        <motion.div {...rise(0)}
          className="flex items-center justify-between pb-3"
          style={{ borderBottom: HAIR }}>
          <Link href="/" className="text-[11px] uppercase tracking-wider"
            style={{ fontFamily: MONO, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
            ← Voltar
          </Link>
          <span className="text-[11px] uppercase tracking-wider hidden sm:block"
            style={{ fontFamily: MONO, color: "rgba(255,255,255,0.35)" }}>
            FICHA DE PROJETO — {PROJECT.ficha}
          </span>
          <span className="text-[11px] uppercase tracking-wider"
            style={{ fontFamily: MONO, color: "hsl(var(--primary))" }}>
            {PROJECT.rev}
          </span>
        </motion.div>

        {/* Cabeçalho: nome gigante + tabela de meta */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-12 items-end pt-6 pb-7">
          <motion.h1 {...rise(0.08)}
            className="font-bold select-none"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(4rem, 11.5vw, 10rem)", lineHeight: 0.85, letterSpacing: "-0.01em" }}>
            <span style={{ color: "rgba(255,255,255,0.96)" }}>{PROJECT.nameA} </span>
            <span style={{
              color: "transparent",
              WebkitTextStroke: "2px hsl(var(--primary))",
            }}>{PROJECT.nameB}</span>
            <span style={{ color: "hsl(var(--primary))" }}>.</span>
          </motion.h1>

          <motion.dl {...rise(0.16)} className="mt-6 lg:mt-0">
            {PROJECT.meta.map(([k, v], i) => (
              <div key={k} className="flex items-baseline justify-between gap-6 py-[7px]"
                style={{ borderTop: i === 0 ? HAIR : HAIR_SOFT }}>
                <dt className="text-[10px] uppercase tracking-[0.14em] flex-shrink-0"
                  style={{ fontFamily: MONO, color: "rgba(255,255,255,0.38)" }}>{k}</dt>
                <dd className="text-[13px] text-right" style={{ color: "rgba(255,255,255,0.75)" }}>{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Corpo: figura à esquerda, índice de funcionalidades à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 flex-1 items-start pt-2"
          style={{ borderTop: HAIR }}>

          {/* Figura de revista */}
          <motion.figure {...rise(0.24)} className="relative mt-6 mb-2 lg:mb-0">
            <div className="relative" style={{ border: HAIR }}>
              <CropMark pos="tl" /><CropMark pos="tr" /><CropMark pos="bl" /><CropMark pos="br" />
              <img src={PROJECT.image} alt="Tela do projeto Pizza Nova"
                className="block w-full" style={{ aspectRatio: "16/10", objectFit: "cover" }} />
            </div>
            <figcaption className="flex items-center justify-between gap-4 pt-2.5">
              <span className="text-[10px] tracking-[0.12em]"
                style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)" }}>
                {PROJECT.caption}
              </span>
              <span className="text-[10px] flex-shrink-0" style={{ fontFamily: MONO, color: "hsl(var(--primary)/0.8)" }}>
                1:1
              </span>
            </figcaption>
            <p className="mt-5 text-[15px] sm:text-base max-w-md" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
              {PROJECT.pitch}
            </p>
          </motion.figure>

          {/* Índice de funcionalidades: tabela editorial, sem ícone */}
          <div className="lg:mt-6">
            <motion.p {...rise(0.28)}
              className="text-[10px] uppercase tracking-[0.2em] pb-3"
              style={{ fontFamily: MONO, color: "rgba(255,255,255,0.38)" }}>
              O QUE ESTE PROJETO FAZ
            </motion.p>
            {PROJECT.features.map((f, i) => (
              <motion.div key={i} {...rise(0.32 + i * 0.07)}
                className="grid grid-cols-[44px_1fr] gap-x-4 py-[13px]"
                style={{ borderTop: i === 0 ? HAIR : HAIR_SOFT }}>
                <span className="font-bold text-right"
                  style={{ fontFamily: DISPLAY, fontSize: "1.7rem", lineHeight: 1, color: "hsl(var(--primary))" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-lg leading-none"
                    style={{ fontFamily: DISPLAY, color: "rgba(255,255,255,0.93)" }}>
                    {f.title}
                  </p>
                  <p className="text-[13px] mt-1.5" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rodapé: números + CTA sólido, canto reto */}
        <motion.div {...rise(0.75)}
          className="mt-10 lg:mt-8 pt-5 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          style={{ borderTop: HAIR }}>
          <p className="flex-1 text-[11px] tracking-[0.08em] leading-relaxed"
            style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)" }}>
            {PROJECT.wins.map((w, i) => (
              <span key={w}>
                {w}
                {i < PROJECT.wins.length - 1 && (
                  <span style={{ color: "hsl(var(--primary))", padding: "0 0.7em" }}>/</span>
                )}
              </span>
            ))}
          </p>
          <Link href="/#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-base flex-shrink-0 transition-colors duration-200"
            style={{
              fontFamily: DISPLAY,
              background: "hsl(var(--primary))",
              color: "#0a0a0a",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--primary))";
            }}>
            QUERO UM ASSIM NO MEU NEGÓCIO <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </main>
    </MotionConfig>
  );
}
