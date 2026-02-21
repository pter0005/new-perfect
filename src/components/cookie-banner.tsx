"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "new_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(CONSENT_KEY)) {
      // Aparece 1.5s depois do load — não compete com a loading screen
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: "1.25rem",
            left: "1.25rem",
            zIndex: 9998,
            maxWidth: "320px",
            width: "calc(100vw - 2.5rem)",

            // ── Liquid Glass ──
            background: "rgba(255, 255, 255, 0.07)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow:
              // Reflexo de luz no topo (highlight)
              "inset 0 1px 0 rgba(255,255,255,0.22)," +
              // Sombra interna inferior sutil
              "inset 0 -1px 0 rgba(0,0,0,0.12)," +
              // Sombra externa suave
              "0 8px 32px rgba(0,0,0,0.35)," +
              "0 2px 8px rgba(0,0,0,0.2)",
            padding: "1.1rem 1.25rem 1rem",
          }}
        >
          {/* Highlight de vidro no topo */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.45) 60%, transparent)",
            borderRadius: "9999px",
          }} />

          {/* Emoji + texto */}
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", marginBottom: "0.85rem" }}>
            <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0, marginTop: "1px" }}>🍪</span>
            <div>
              <p style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.92)",
                marginBottom: "0.25rem",
                letterSpacing: "0.01em",
              }}>
                Ei, promessa de agência:
              </p>
              <p style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.55,
              }}>
                Nossos cookies são digitais — não vão estragar sua dieta. 🥗
                <br />Eles só nos ajudam a melhorar sua visita.
              </p>
            </div>
          </div>

          {/* Botões */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={accept}
              style={{
                flex: 1,
                padding: "0.45rem 0",
                borderRadius: "10px",
                border: "none",
                background: "hsl(var(--primary))",
                color: "#000",
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.04em",
                cursor: "pointer",
                textTransform: "uppercase",
                boxShadow: "0 0 12px hsl(var(--primary)/0.4)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Aceitar
            </button>
            <button
              onClick={decline}
              style={{
                flex: 1,
                padding: "0.45rem 0",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-heading, sans-serif)",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.04em",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Recusar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
