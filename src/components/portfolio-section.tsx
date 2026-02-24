"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

type Project = typeof projects[number];

// ─────────────────────────────────────────
// CURSOR MAGNÉTICO — segue o mouse pela seção
// ─────────────────────────────────────────
function MagneticCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("VER →");

  const springCfg = { stiffness: 280, damping: 28, mass: 0.5 };
  const sx = useSpring(cursorX, springCfg);
  const sy = useSpring(cursorY, springCfg);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left - 32);
      cursorY.set(e.clientY - rect.top - 32);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, cursorX, cursorY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            left: 0, top: 0,
            x: sx, y: sy,
            width: 64, height: 64,
            borderRadius: "9999px",
            background: "hsl(var(--primary))",
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
            zIndex: 100,
            boxShadow: "0 0 20px hsl(var(--primary)/0.5)",
          }}
        >
          <span style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "#000",
            fontWeight: 800,
          }}>{label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────
// MARQUEE STRIP
// ─────────────────────────────────────────
function MarqueeStrip() {
  const items = ["SELECTED WORKS", "2024", "NEW DIGITAL", "SWAS", "CASOS DE SUCESSO", "PORTFÓLIO"];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "0.6rem 0",
      marginBottom: "3.5rem",
    }}>
      <motion.div
        animate={{ x: ["0%", "-25%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", willChange: "transform" }}
      >
        {repeated.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}>
            <span style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              color: i % 2 === 0 ? "rgba(255,255,255,0.18)" : "hsl(var(--primary)/0.35)",
              textTransform: "uppercase",
            }}>{item}</span>
            <span style={{
              display: "inline-block", width: "4px", height: "4px",
              borderRadius: "9999px",
              background: "hsl(var(--primary)/0.3)",
            }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// CARD HERO — primeiro projeto, posição dominante
// ─────────────────────────────────────────
function HeroCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
      animate={inView ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "clip-path, opacity" }}
    >
      <Link href={`/portfolio/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            borderRadius: "0.75rem",
            overflow: "hidden",
            height: "clamp(320px, 42vw, 520px)",
            cursor: "none", // usa cursor magnético
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Imagem */}
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0, willChange: "transform" }}
          >
            {project.image ? (
              <img src={project.image} alt={project.name} style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: hovered ? "brightness(0.45) saturate(1.1)" : "brightness(0.28) saturate(0.7)",
                transition: "filter 0.55s ease",
              }} />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: "linear-gradient(135deg, hsl(var(--primary)/0.25) 0%, #050505 70%)",
              }} />
            )}
          </motion.div>

          {/* Grain texture */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
          }} />

          {/* Orange border reveal no hover */}
          <motion.div
            animate={{
              boxShadow: hovered
                ? "inset 0 0 0 2px hsl(var(--primary)/0.7)"
                : "inset 0 0 0 0px hsl(var(--primary)/0)",
            }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, borderRadius: "0.75rem", pointerEvents: "none", zIndex: 5 }}
          />

          {/* Gradiente overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 45%, transparent 75%)",
          }} />

          {/* Top bar — número + ano */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 3,
            padding: "1.25rem 1.5rem",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          }}>
            <span style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "0.62rem", letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
            }}>
              Case {num}
            </span>
            <span style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "0.62rem", letterSpacing: "0.2em",
              color: "hsl(var(--primary)/0.55)",
              padding: "0.15rem 0.55rem",
              border: "1px solid hsl(var(--primary)/0.2)",
              borderRadius: "9999px",
            }}>
              {(project as any).year ?? "2024"}
            </span>
          </div>

          {/* Bottom content */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
            padding: "2rem 1.75rem",
          }}>
            {/* Category */}
            <motion.div
              animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: "0.5rem" }}
            >
              <span style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "0.6rem", letterSpacing: "0.2em",
                color: "hsl(var(--primary))",
                textTransform: "uppercase",
              }}>
                {project.type ?? "Projeto Digital"}
              </span>
            </motion.div>

            <h3 className="font-heading" style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              fontWeight: 700, lineHeight: 1.0,
              color: "rgba(255,255,255,0.97)",
              letterSpacing: "-0.01em",
              marginBottom: "0.6rem",
            }}>
              {project.name}
            </h3>

            {project.description && (
              <motion.p
                animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.55,
                  maxWidth: "52ch",
                }}
              >
                {project.description}
              </motion.p>
            )}

            {/* Bottom rule + CTA */}
            <motion.div
              animate={{ scaleX: hovered ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "1px", marginTop: "1.25rem", marginBottom: "1.25rem",
                background: "hsl(var(--primary)/0.4)",
                transformOrigin: "left",
              }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// CARD PADRÃO — grid de 3
// ─────────────────────────────────────────
function CaseCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index - 1) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      <Link href={`/portfolio/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative", borderRadius: "0.75rem", overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.065)",
            cursor: "none",
            transition: "border-color 0.3s",
          }}
        >
          {/* Image container */}
          <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
            <motion.div
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", height: "100%", willChange: "transform" }}
            >
              {project.image ? (
                <img src={project.image} alt={project.name} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: hovered ? "brightness(0.6) saturate(1.05)" : "brightness(0.35) saturate(0.5)",
                  transition: "filter 0.5s ease",
                }} />
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  background: `linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, #060606 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-bebas-neue), sans-serif",
                    fontSize: "3.5rem", color: "hsl(var(--primary)/0.2)", letterSpacing: "0.1em",
                  }}>NEW</span>
                </div>
              )}
            </motion.div>

            {/* Grain */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "150px",
            }} />

            {/* Orange inset border on hover */}
            <motion.div
              animate={{
                boxShadow: hovered ? "inset 0 0 0 2px hsl(var(--primary)/0.65)" : "inset 0 0 0 0px transparent",
              }}
              transition={{ duration: 0.25 }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4 }}
            />

            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
              zIndex: 2,
            }} />

            {/* Top meta */}
            <div style={{
              position: "absolute", top: "0.75rem", left: "0.875rem", right: "0.875rem",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              zIndex: 3,
            }}>
              <span style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.22)",
              }}>Case {num}</span>
              <span style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.15em",
                color: "hsl(var(--primary)/0.6)",
                padding: "0.12rem 0.45rem",
                border: "1px solid hsl(var(--primary)/0.2)",
                borderRadius: "9999px",
              }}>{(project as any).year ?? "2024"}</span>
            </div>
          </div>

          {/* Bottom info */}
          <div style={{ padding: "1rem 1.15rem 1.15rem" }}>
            {/* Orange reveal line */}
            <motion.div
              animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
              initial={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "1px", marginBottom: "0.75rem",
                background: "linear-gradient(90deg, hsl(var(--primary)/0.7), transparent)",
                transformOrigin: "left",
              }}
            />

            {/* Type */}
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.2em",
              color: "hsl(var(--primary)/0.6)",
              textTransform: "uppercase",
              marginBottom: "0.3rem",
            }}>{project.type ?? "Projeto"}</span>

            <h3 className="font-heading" style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
              fontWeight: 700,
              color: hovered ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.82)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              transition: "color 0.2s",
            }}>{project.name}</h3>

            {project.description && (
              <motion.p
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
                initial={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.28 }}
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.32)",
                  marginTop: "0.4rem",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >{project.description}</motion.p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// CARD WIDE — aparece no meio, span 2 cols
// ─────────────────────────────────────────
function WideCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="sm:col-span-2"
    >
      <Link href={`/portfolio/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative", borderRadius: "0.75rem", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.065)",
            background: "rgba(255,255,255,0.02)",
            cursor: "none",
            display: "flex", height: "200px",
          }}
        >
          {/* Image left */}
          <div style={{ position: "relative", width: "40%", overflow: "hidden", flexShrink: 0 }}>
            <motion.div
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.65 }}
              style={{ width: "100%", height: "100%", willChange: "transform" }}
            >
              {project.image ? (
                <img src={project.image} alt={project.name} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: hovered ? "brightness(0.65)" : "brightness(0.4)",
                  transition: "filter 0.45s",
                }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "hsl(var(--primary)/0.12)" }} />
              )}
            </motion.div>
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "60px",
              background: "linear-gradient(to right, transparent, rgba(0,0,0,0.95))",
            }} />
          </div>

          {/* Orange line left */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute", left: "40%", top: "15%", bottom: "15%",
              width: "2px",
              background: "linear-gradient(to bottom, transparent, hsl(var(--primary)/0.8), transparent)",
              zIndex: 5,
            }}
          />

          {/* Right content */}
          <div style={{
            flex: 1, padding: "1.25rem 1.5rem",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.2)",
              }}>Case {num}</span>
              <span style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.15em",
                color: "hsl(var(--primary)/0.55)",
                padding: "0.1rem 0.4rem",
                border: "1px solid hsl(var(--primary)/0.2)",
                borderRadius: "9999px",
              }}>{(project as any).year ?? "2024"}</span>
            </div>

            <span style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.2em",
              color: "hsl(var(--primary)/0.65)",
              display: "block", marginBottom: "0.3rem",
            }}>{project.type ?? "Projeto"}</span>

            <h3 className="font-heading" style={{
              fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.1, letterSpacing: "-0.01em",
              marginBottom: "0.45rem",
            }}>{project.name}</h3>

            {project.description && (
              <p style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{project.description}</p>
            )}

            <motion.div
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                marginTop: "0.75rem",
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.15em",
                color: "hsl(var(--primary)/0.8)",
              }}
            >
              VER CASE →
            </motion.div>
          </div>

          {/* Border hover */}
          <motion.div
            animate={{ boxShadow: hovered ? "inset 0 0 0 1px hsl(var(--primary)/0.5)" : "inset 0 0 0 1px transparent" }}
            transition={{ duration: 0.25 }}
            style={{ position: "absolute", inset: 0, borderRadius: "0.75rem", pointerEvents: "none", zIndex: 4 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// SECTION PRINCIPAL
// ─────────────────────────────────────────
export default function PortfolioSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef(null);
  const gridRef     = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const gridInView  = useInView(gridRef,  { once: true, margin: "-40px" });

  const hero = projects[0];
  const rest = projects.slice(1);

  // Layout: hero → grid 3 cols (primeiros 3) → wide + 1 (próximo par) → grid 3 cols (resto)
  const firstRow   = rest.slice(0, 3);   // cards normais
  const wideCard   = rest[3];            // wide (span 2)
  const sideCard   = rest[4];            // ao lado do wide
  const remaining  = rest.slice(5);      // resto

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-20 sm:py-28 overflow-hidden bg-background"
      style={{ cursor: "none" }}
    >
      {/* Cursor magnético */}
      <MagneticCursor containerRef={sectionRef as React.RefObject<HTMLElement>} />

      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)",
          width: "1100px", height: "700px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.05) 0%, transparent 60%)",
          filter: "blur(100px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div ref={titleRef} className="mb-8 sm:mb-10">

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div style={{ height: "1px", width: "2rem", background: "hsl(var(--primary)/0.7)" }} />
            <span className="font-heading" style={{
              fontSize: "0.6rem", letterSpacing: "0.45em",
              color: "hsl(var(--primary)/0.65)", textTransform: "uppercase",
            }}>Portfólio</span>
          </motion.div>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div style={{ overflow: "hidden", paddingTop: "0.2em", marginTop: "-0.2em" }}>
              <motion.h2
                initial={{ y: "105%", opacity: 0 }}
                animate={titleInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", willChange: "transform" }}
              >
                <span style={{ color: "rgba(255,255,255,0.95)" }}>PROJETOS QUE JÁ</span>
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>TRANSFORMAMOS.</span>
              </motion.h2>
            </div>

            {/* Counter tipo editorial magazine */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end",
                paddingBottom: "0.5rem", flexShrink: 0,
                gap: "0.15rem",
              }}
            >
              <span className="font-heading" style={{
                fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.06)",
                lineHeight: 1, letterSpacing: "-0.03em",
              }}>
                {String(projects.length).padStart(2, "0")}
              </span>
              <span style={{
                fontSize: "0.55rem", letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "var(--font-bebas-neue), sans-serif",
                textTransform: "uppercase",
              }}>cases</span>
            </motion.div>
          </div>

          {/* Divider animado */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "1px", marginTop: "2rem",
              background: "linear-gradient(90deg, hsl(var(--primary)/0.55) 0%, rgba(255,255,255,0.05) 45%, transparent 100%)",
              transformOrigin: "left", willChange: "transform",
            }}
          />
        </div>

        {/* ── Marquee ── */}
        <MarqueeStrip />

        {/* ── Grid ── */}
        <div ref={gridRef} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Hero — full width */}
          {hero && <HeroCard project={hero} index={0} inView={gridInView} />}

          {/* Linha 1: 3 cards normais */}
          {firstRow.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {firstRow.map((p, i) => (
                <CaseCard key={p.slug} project={p} index={i + 1} inView={gridInView} />
              ))}
            </div>
          )}

          {/* Linha 2: wide (2 cols) + side (1 col) */}
          {wideCard && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <WideCard project={wideCard} index={4} inView={gridInView} />
              {sideCard && (
                <CaseCard project={sideCard} index={5} inView={gridInView} />
              )}
            </div>
          )}

          {/* Resto em 3 colunas */}
          {remaining.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {remaining.map((p, i) => (
                <CaseCard key={p.slug} project={p} index={i + 6} inView={gridInView} />
              ))}
            </div>
          )}
        </div>

        {/* ── CTA bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-center gap-6 mt-16"
        >
          {/* Linha */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              height: "1px", flex: 1, maxWidth: "120px",
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08))",
              transformOrigin: "right",
            }}
          />

          <Link
            href="/portfolio"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              padding: "0.8rem 2rem", borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "0.72rem", letterSpacing: "0.25em",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "hsl(var(--primary)/0.45)";
              el.style.color = "rgba(255,255,255,0.88)";
              el.style.background = "hsl(var(--primary)/0.06)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.09)";
              el.style.color = "rgba(255,255,255,0.5)";
              el.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            VER TODOS OS PROJETOS →
          </Link>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              height: "1px", flex: 1, maxWidth: "120px",
              background: "linear-gradient(to left, transparent, rgba(255,255,255,0.08))",
              transformOrigin: "left",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}