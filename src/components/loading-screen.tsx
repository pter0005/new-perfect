"use client";

import { useEffect, useState } from "react";

const HEADING_FONT = "var(--font-barlow-condensed), sans-serif";

// ── Cookie helpers ────────────────────────────────────────────
const COOKIE_KEY = "new_loaded";
const COOKIE_DAYS = 1; // mostra a cada 1 dia

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/`;
}

// ── Letras N-E-W ──────────────────────────────────────────────
const LETTERS = ["N", "E", "W"];

// Linha do tempo (ms): letras entram até ~750; aos 900 o site é liberado e o
// overlay começa o fade (CSS, classe .ld-overlay em globals.css); aos 1400 sai do DOM.
const RELEASE_MS = 900;
const UNMOUNT_MS = 1400;

/**
 * Flash de marca de ~1,3 s. Vem no HTML do servidor e é animado por CSS puro:
 * - não existe "conteúdo → preto → conteúdo" enquanto o JS não hidrata;
 * - o fade de saída acontece mesmo com JS lento ou com "reduzir movimento"
 *   ligado no aparelho (o exit do framer-motion não completava nesse caso e o
 *   overlay preto ficava na tela pra sempre);
 * - quem já viu hoje (cookie) tem o overlay removido assim que o JS chega.
 */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (getCookie(COOKIE_KEY)) {
      setGone(true);
      onDone();
      return;
    }
    const release = setTimeout(() => {
      setCookie(COOKIE_KEY, "1", COOKIE_DAYS);
      onDone();
    }, RELEASE_MS);
    const unmount = setTimeout(() => setGone(true), UNMOUNT_MS);
    return () => {
      clearTimeout(release);
      clearTimeout(unmount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      className="ld-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Glow de fundo */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -60%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, hsl(var(--primary)/0.12) 0%, transparent 65%)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      {/* Grid sutil */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,106,0,0.03) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,106,0,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* N E W — letras entram em sequência (CSS) */}
      <div style={{ display: "flex", gap: "0.15em", marginBottom: "2.5rem" }}>
        {LETTERS.map((letter, i) => (
          <span
            key={letter}
            className="ld-in"
            style={{
              animationDelay: `${0.1 + i * 0.09}s`,
              fontFamily: HEADING_FONT,
              fontSize: "clamp(5rem, 18vw, 9rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "0.04em",
              // Ember gradient inline
              background: i === 1
                ? "radial-gradient(ellipse at 50% 30%, #fffde7 0%, #ffcc02 15%, #ff8c00 40%, #ff3300 70%, #7a0000 100%)"
                : "rgba(255,255,255,0.92)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              ...(i === 1 && {
                filter: "drop-shadow(0 0 6px rgba(255,150,0,0.4)) drop-shadow(0 0 20px rgba(255,60,0,0.25))",
              }),
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <p
        className="ld-in"
        style={{
          animationDelay: "0.4s",
          fontFamily: HEADING_FONT,
          fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
          letterSpacing: "0.45em",
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
        }}
      >
        Tudo é Possível.
      </p>
    </div>
  );
}
