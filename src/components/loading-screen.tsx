"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ── Letras N-E-W animadas ─────────────────────────────────────
const LETTERS = ["N", "E", "W"];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Se já carregou hoje, pula direto
    if (getCookie(COOKIE_KEY)) {
      onDone();
      return;
    }
    setShow(true);

    // Simula progresso de carregamento
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        // Dá tempo da barra encher, depois sai
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => {
            setCookie(COOKIE_KEY, "1", COOKIE_DAYS);
            onDone();
          }, 700);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            filter: "blur(80px)",
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

          {/* N E W — letras animadas em sequência */}
          <div style={{ display: "flex", gap: "0.15em", marginBottom: "2.5rem" }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontFamily: "var(--font-heading, 'Bebas Neue', sans-serif)",
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
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-heading, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
              letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: "3rem",
            }}
          >
            Tudo é Possível.
          </motion.p>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{
              width: "min(240px, 60vw)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {/* Track */}
            <div style={{
              width: "100%",
              height: "2px",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}>
              {/* Fill */}
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, hsl(var(--primary)/0.6), hsl(var(--primary)))",
                  boxShadow: "0 0 8px hsl(var(--primary)/0.6)",
                  originX: 0,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.15 }}
              />
            </div>

            {/* Percentual */}
            <span style={{
              fontFamily: "monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.15em",
            }}>
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
