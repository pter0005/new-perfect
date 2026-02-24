"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

type Project = typeof projects[number];

// ── Dot indicator ──
function Dots({ total, active }: { total: number; active: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? "20px" : "6px",
            height: "6px",
            borderRadius: "9999px",
            background: i === active ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      ))}
    </div>
  );
}

// ── Card individual ──
function Card({
  project,
  index,
  active,
  total,
  onDragEnd,
}: {
  project: Project;
  index: number;
  active: number;
  total: number;
  onDragEnd: (dir: "left" | "right") => void;
}) {
  const offset = index - active; // -1, 0, 1, 2...

  // Só renderiza cards próximos ao ativo
  if (Math.abs(offset) > 3) return null;

  const isActive = offset === 0;

  // Posicionamento e escala baseados na posição relativa
  const x      = offset * 72;          // px horizontal offset
  const scale  = isActive ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.07);
  const zIndex = total - Math.abs(offset);
  const opacity = Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.55 - Math.abs(offset) * 0.1;
  const rotateY = offset * -4;         // leve perspectiva 3D

  return (
    <motion.div
      key={project.slug}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={(_e, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 60) {
          onDragEnd(info.offset.x < 0 ? "left" : "right");
        }
      }}
      animate={{
        x,
        scale,
        opacity,
        rotateY,
        zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.8,
      }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        marginLeft: "-160px", // metade da largura do card
        width: "320px",
        willChange: "transform",
        cursor: isActive ? "grab" : "default",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        userSelect: "none",
      }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        onClick={(e) => { if (isActive) e.preventDefault(); }}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "#111",
            border: isActive
              ? "1px solid hsl(var(--primary)/0.45)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: isActive
              ? "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px hsl(var(--primary)/0.15)"
              : "0 12px 32px rgba(0,0,0,0.35)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Imagem — limpa, sem filtros pesados */}
          <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: "linear-gradient(135deg, hsl(var(--primary)/0.18) 0%, #0a0a0a 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "4rem", letterSpacing: "0.1em",
                  color: "hsl(var(--primary)/0.25)",
                }}>NEW</span>
              </div>
            )}

            {/* Gradiente sutil só na parte de baixo para legibilidade do texto */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />

            {/* Número do card */}
            <span style={{
              position: "absolute", top: "14px", left: "16px",
              fontFamily: "var(--font-heading)",
              fontSize: "0.65rem", letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.5)",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(8px)",
              padding: "3px 8px", borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Info */}
          <div style={{ padding: "1.25rem 1.25rem 1.4rem" }}>
            {project.type && (
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-heading)",
                fontSize: "0.6rem", letterSpacing: "0.2em",
                color: "hsl(var(--primary)/0.75)",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
              }}>
                {project.type}
              </span>
            )}

            <h3
              className="font-heading"
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: project.description ? "0.4rem" : 0,
              }}
            >
              {project.name}
            </h3>

            {project.description && (
              <p style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.55,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "1rem",
              }}>
                {project.description}
              </p>
            )}

            {/* Ver projeto — só aparece no ativo */}
            {isActive && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.65rem", letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                }}>ARRASTE PARA NAVEGAR</span>
                <Link
                  href={`/portfolio/${project.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.7rem", letterSpacing: "0.15em",
                    color: "hsl(var(--primary))",
                    textDecoration: "none",
                    padding: "4px 12px",
                    border: "1px solid hsl(var(--primary)/0.35)",
                    borderRadius: "9999px",
                  }}
                >
                  VER →
                </Link>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Botões de navegação ──
function NavButton({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "44px", height: "44px",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
        color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.2s",
        fontSize: "1rem",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--primary)/0.5)";
          (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--primary))";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
        (e.currentTarget as HTMLButtonElement).style.color = disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)";
      }}
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}

// ── Seção principal ──
export default function PortfolioSection() {
  const [active, setActive] = useState(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const total = projects.length;

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(total - 1, a + 1));

  const handleDrag = (dir: "left" | "right") => {
    if (dir === "left")  next();
    if (dir === "right") prev();
  };

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 overflow-hidden bg-background">

      {/* Ambient sutil */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div ref={titleRef} className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div style={{ height: "1px", width: "2rem", background: "hsl(var(--primary)/0.7)" }} />
            <span className="font-heading" style={{
              fontSize: "0.6rem", letterSpacing: "0.45em",
              color: "hsl(var(--primary)/0.65)", textTransform: "uppercase",
            }}>Portfólio</span>
          </motion.div>

          <div style={{ overflow: "hidden", paddingTop: "0.2em", marginTop: "-0.2em" }}>
            <motion.h2
              initial={{ y: "105%", opacity: 0 }}
              animate={titleInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              <span style={{ color: "rgba(255,255,255,0.95)" }}>PROJETOS QUE JÁ</span>
              <br />
              <span style={{ color: "hsl(var(--primary))" }}>TRANSFORMAMOS.</span>
            </motion.h2>
          </div>
        </div>

        {/* ── Carrossel ── */}
        <div style={{ position: "relative" }}>

          {/* Stage — área dos cards empilhados */}
          <div
            style={{
              position: "relative",
              height: "560px",        // altura do card (380 img + 180 info)
              perspective: "1200px",
            }}
          >
            {projects.map((project, i) => (
              <Card
                key={project.slug}
                project={project}
                index={i}
                active={active}
                total={total}
                onDragEnd={handleDrag}
              />
            ))}
          </div>

          {/* Controles abaixo do stack */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "2.5rem",
          }}>
            <NavButton dir="prev" onClick={prev} disabled={active === 0} />
            <Dots total={total} active={active} />
            <NavButton dir="next" onClick={next} disabled={active === total - 1} />
          </div>
        </div>

      </div>
    </section>
  );
}
