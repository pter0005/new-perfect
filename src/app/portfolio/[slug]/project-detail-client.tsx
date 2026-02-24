"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import {
  motion, useScroll, useTransform,
  useSpring, useInView,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { type Project } from '@/lib/projects';
import { useIsMobile } from '@/hooks/use-mobile';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const HF  = "var(--font-barlow-condensed), sans-serif";
const OR  = "hsl(var(--primary))";
const OR4 = "hsl(var(--primary)/0.4)";
const OR1 = "hsl(var(--primary)/0.12)";

/* ═══════════════════════════════════════════════════════════════
   GRID BLUEPRINT BACKGROUND
═══════════════════════════════════════════════════════════════ */
function BlueprintGrid() {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(255,120,0,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,120,0,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "64px 64px",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "2px",
      zIndex: 999, background: OR, scaleX: s, transformOrigin: "0%",
      boxShadow: `0 0 12px ${OR4}`,
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOGO
═══════════════════════════════════════════════════════════════ */
function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", fontFamily:HF, fontWeight:700, fontSize:"1.05rem", color:OR, filter:`drop-shadow(0 0 6px ${OR4})` }}>
      <span>N</span>
      <div style={{ display:"flex", flexDirection:"column", margin:"0 3px", gap:"2.5px" }}>
        {[0,1,2].map(i => <div key={i} style={{ width:"5px", height:"5px", background:OR, borderRadius:"99px" }} />)}
      </div>
      <span>W</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION LABEL — "01 // VISÃO GERAL"
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <p style={{
      display: "flex", alignItems: "center", gap: "0.55rem",
      marginBottom: "1.5rem",
      fontFamily: HF, fontSize: "0.65rem", letterSpacing: "0.3em",
    }}>
      <span style={{ color: OR }}>{n}</span>
      <span style={{ color: "rgba(255,255,255,0.18)" }}>//</span>
      <span style={{ color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>{label}</span>
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DOCKET TAG  — caixa com borda laranja no topo do hero
═══════════════════════════════════════════════════════════════ */
function DocketTag({ code }: { code: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      style={{
        display: "inline-flex", alignItems: "center",
        border: `1px solid ${OR4}`,
        padding: "0.35rem 0.9rem",
        marginBottom: "2rem",
      }}
    >
      <span style={{ fontFamily: HF, fontSize: "0.58rem", letterSpacing: "0.35em", color: OR4 }}>
        DOCKET NO: {code}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IMAGE FRAME — moldura técnica com cantos, coordenadas e stamp
═══════════════════════════════════════════════════════════════ */
function Frame({ src, alt, coords, stamp }: {
  src: string; alt: string; coords: string; stamp: string;
}) {
  const ref  = useRef(null);
  const show = useInView(ref, { once: true, margin: "-60px" });

  // cantos: [top, right, bottom, left] flags
  const corners = [
    { t:true,  r:false, b:false, l:true  },
    { t:true,  r:true,  b:false, l:false },
    { t:false, r:false, b:true,  l:true  },
    { t:false, r:true,  b:true,  l:false },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={show ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* coord label */}
      <p style={{
        position: "absolute", top: -22, left: 0,
        fontFamily: HF, fontSize: "0.58rem", letterSpacing: "0.18em", color: OR4,
        zIndex: 2,
      }}>{coords}</p>

      {/* outer border */}
      <div style={{
        position: "relative",
        border: `1px solid ${OR4}`,
        borderRadius: "3px",
        overflow: "visible",
        boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}>
        {/* corner accents */}
        {corners.map((c, i) => (
          <div key={i} style={{
            position: "absolute", zIndex: 3,
            top:    c.t ? -1 : "auto",
            bottom: c.b ? -1 : "auto",
            left:   c.l ? -1 : "auto",
            right:  c.r ? -1 : "auto",
            width: 14, height: 14,
            borderTop:    c.t ? `2px solid ${OR}` : "none",
            borderBottom: c.b ? `2px solid ${OR}` : "none",
            borderLeft:   c.l ? `2px solid ${OR}` : "none",
            borderRight:  c.r ? `2px solid ${OR}` : "none",
          }} />
        ))}

        {/* image */}
        <div style={{ overflow: "hidden", borderRadius: "2px" }}>
          <Image
            src={src} alt={alt}
            width={800} height={500}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>

        {/* shimmer overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "2px", pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 55%)",
        }} />
      </div>

      {/* stamp */}
      <p style={{
        position: "absolute", bottom: -20, right: 0,
        fontFamily: HF, fontSize: "0.52rem", letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.13)",
      }}>STAMP: {stamp}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DETAIL ROW — texto + imagem alternados (par=texto esq, ímpar=img esq)
═══════════════════════════════════════════════════════════════ */
const SECTION_LABELS = [
  "VISÃO GERAL", "MAPEAMENTO DE INTERFACE", "ARQUITETURA DO SISTEMA",
  "ENTREGA & DEPLOY", "FLUXO DE DADOS",
];
const COORDS = [
  "X: 0.175 / Y: 0.048", "X: 0.367 / Y: 0.577",
  "X: 0.750 / Y: 0.230", "X: 0.142 / Y: 0.812",
  "X: 0.620 / Y: 0.395",
];
const STAMPS = [
  "BUILD_VERIFIED", "INTERFACE_OK", "DEPLOY_READY", "STACK_LOCKED", "PROD_BUILD",
];

function DetailRow({ detail, index, image }: {
  detail: Project["details"][0]; index: number; image: string;
}) {
  const ref  = useRef(null);
  const show = useInView(ref, { once: true, margin: "-80px" });
  const even = index % 2 === 0; // par = texto à esquerda
  const isMobile = useIsMobile();

  const textBlock = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: even ? -28 : 28 }}
      animate={show ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.25rem" }}
    >
      <SectionLabel n={String(index + 1).padStart(2,"0")} label={SECTION_LABELS[index % SECTION_LABELS.length]} />

      {/* number */}
      <div style={{ marginBottom: "-0.25rem" }}>
        <span style={{
          fontFamily: HF, fontWeight: 700,
          fontSize: "clamp(3.5rem, 7vw, 6rem)",
          lineHeight: 1, color: OR,
          textShadow: `0 0 30px ${OR4}`,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* title */}
      <h2 style={{
        fontFamily: HF, fontWeight: 700,
        fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
        lineHeight: 1.0, letterSpacing: "-0.01em", color: "#fff",
        marginTop: "-0.5rem",
      }}>
        {detail.title.toUpperCase()}
      </h2>

      {/* bar */}
      <div style={{ width: 40, height: 2, background: OR, boxShadow: `0 0 8px ${OR4}` }} />

      {/* points */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: "0.25rem" }}>
        {detail.points.map((pt, pi) => (
          <motion.div
            key={pi}
            initial={{ opacity: 0, x: even ? -16 : 16 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 + pi * 0.07 }}
            style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}
          >
            <span style={{ color: OR, fontSize: "0.8rem", marginTop: "0.3rem", flexShrink: 0 }}>›</span>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.52)" }}>
              {pt.includes(":") ? (
                <>
                  <span style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600 }}>
                    {pt.split(":")[0]}:
                  </span>
                  {pt.slice(pt.indexOf(":") + 1)}
                </>
              ) : pt}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const imgBlock = (
    <Frame
      src={image}
      alt={detail.title}
      coords={COORDS[index % COORDS.length]}
      stamp={`${STAMPS[index % STAMPS.length]}_${String(index + 1).padStart(2,"0")}`}
    />
  );

  return (
    <section style={{
      padding: "clamp(4rem, 7vw, 6rem) 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "clamp(3rem, 6vw, 6rem)",
        alignItems: "center",
      }}>
        {isMobile || even ? <>{textBlock}{imgBlock}</> : <>{imgBlock}{textBlock}</>}
      </div>

      {/* giant ghost number bg */}
      <span aria-hidden style={{
        position: "absolute", top: "0.5rem", right: 0,
        fontFamily: HF, fontWeight: 700,
        fontSize: "clamp(8rem, 18vw, 16rem)",
        lineHeight: 1, color: "rgba(255,255,255,0.025)",
        userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.03em",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH COMPONENT BOX — "SPEC-A-043 / COMPONENTES DO SISTEMA"
═══════════════════════════════════════════════════════════════ */
function SpecBox({ technologies }: { technologies: string[] }) {
  const ref  = useRef(null);
  const show = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        border: `1px solid ${OR4}`,
        borderRadius: "4px",
        padding: "1.5rem 1.75rem",
        background: OR1,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${OR4} 40%, ${OR} 55%, transparent)`,
      }} />

      <p style={{
        fontFamily: HF, fontSize: "0.58rem", letterSpacing: "0.3em",
        color: OR4, marginBottom: "1.1rem", textTransform: "uppercase",
      }}>
        SPEC-A-043 / COMPONENTES DO SISTEMA
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {technologies.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={show ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            style={{
              padding: "0.3rem 0.85rem", borderRadius: "3px",
              fontFamily: HF, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.07em",
              color: OR, background: "rgba(255,255,255,0.04)",
              border: `1px solid ${OR4}`,
            }}
          >{t}</motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   METRICS  "IMPACTO GERADO"
═══════════════════════════════════════════════════════════════ */
function MetricsSection({ n }: { n: number }) {
  const ref  = useRef(null);
  const show = useInView(ref, { once: true, margin: "-60px" });

  const metrics = [
    { val: "98/100", tag: "LIGHTHOUSE SCORE",    sub: "Performance excepcional em Core Web Vitals." },
    { val: "+45%",   tag: "TAXA DE CONVERSÃO",   sub: "Melhoria direta após o redesign da UX." },
    { val: "0.4s",   tag: "TEMPO DE RESPOSTA",   sub: "Média de carregamento entre páginas." },
    { val: "60fps",  tag: "ANIMAÇÕES",            sub: "Framer Motion com aceleração por GPU." },
  ];

  return (
    <section style={{
      padding: "clamp(4rem, 7vw, 6rem) 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
    }}>
      <SectionLabel n={String(n).padStart(2,"0")} label="MÉTRICAS E RESULTADOS" />

      <div style={{ overflow:"hidden", paddingTop:"0.1em", marginTop:"-0.1em", marginBottom:"3rem" }}>
        <motion.h2
          ref={ref}
          initial={{ y:"110%" }}
          animate={show ? { y:"0%" } : {}}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
          style={{
            fontFamily:HF, fontWeight:700,
            fontSize:"clamp(2.5rem, 6vw, 5rem)",
            lineHeight:1, color:"#fff", letterSpacing:"-0.01em",
          }}
        >
          IMPACTO GERADO
        </motion.h2>
      </div>

      {/* metric cards */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",
        gap:"1px",
        background:"rgba(255,255,255,0.06)",
        border:"1px solid rgba(255,255,255,0.06)",
        borderRadius:"6px",
        overflow:"hidden",
      }}>
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:24 }}
            animate={show ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.55, delay:i*0.1 }}
            style={{
              padding:"2rem 1.75rem",
              background:"#0c0c0e",
              position:"relative", overflow:"hidden",
            }}
          >
            {/* top glow line */}
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:"1px",
              background:`linear-gradient(90deg, transparent, ${OR4} 40%, ${OR} 60%, transparent)`,
            }} />
            {/* left accent */}
            <div style={{
              position:"absolute", top:0, left:0, bottom:0, width:"2px",
              background:`linear-gradient(to bottom, ${OR}, transparent)`,
            }} />

            <div style={{
              fontFamily:HF, fontWeight:700,
              fontSize:"clamp(2rem, 5vw, 3.5rem)",
              lineHeight:1, color:OR,
              textShadow:`0 0 24px ${OR4}`,
              marginBottom:"0.4rem",
            }}>{m.val}</div>

            <p style={{
              fontFamily:HF, fontSize:"0.6rem", letterSpacing:"0.25em",
              color:OR, marginBottom:"0.4rem",
            }}>{m.tag}</p>

            <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.32)", lineHeight:1.55 }}>{m.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA  "PRONTO PARA TIRAR SUA IDEIA DO PAPEL?"
═══════════════════════════════════════════════════════════════ */
function CtaSection() {
  const ref  = useRef(null);
  const show = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section
      ref={ref}
      style={{
        position:"relative",
        padding:"clamp(5rem, 12vw, 9rem) 0",
        textAlign:"center",
        overflow:"hidden",
      }}
    >
      <BlueprintGrid />

      {/* top line */}
      <motion.div
        initial={{ scaleX:0 }}
        animate={show ? { scaleX:1 } : {}}
        transition={{ duration:1.2, ease:[0.22,1,0.36,1] }}
        style={{
          height:"1px", maxWidth:"200px", margin:"0 auto 3rem",
          background:`linear-gradient(90deg, transparent, ${OR}, transparent)`,
          transformOrigin:"center",
        }}
      />

      <motion.div
        initial={{ opacity:0, y:36 }}
        animate={show ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
      >
        <p style={{
          fontFamily:HF, fontSize:"0.6rem", letterSpacing:"0.42em",
          color:OR, marginBottom:"1.25rem",
        }}>
          INICIE SUA CONSTRUÇÃO
        </p>

        <h2 style={{
          fontFamily:HF, fontWeight:700,
          fontSize:"clamp(2.8rem, 9vw, 8rem)",
          lineHeight:0.9, letterSpacing:"-0.02em",
          color:"#fff", marginBottom:"0.75rem",
        }}>
          PRONTO PARA<br />TIRAR SUA IDEIA<br />
          <span style={{ color:OR }}>DO PAPEL?</span>
        </h2>

        <p style={{
          fontFamily:HF, fontSize:"0.65rem", letterSpacing:"0.35em",
          color:"rgba(255,255,255,0.22)", margin:"1.75rem 0 2.75rem",
        }}>
          DISPONÍVEL PARA NOVOS PROJETOS
        </p>

        <Link
          href="/#contact"
          style={{
            display:"inline-flex", alignItems:"center", gap:"0.6rem",
            padding:"1rem 2.75rem", borderRadius:"4px",
            background:OR, color:"#000", textDecoration:"none",
            fontFamily:HF, fontWeight:700, fontSize:"0.9rem", letterSpacing:"0.1em",
            boxShadow:`0 0 48px ${OR4}`,
            transition:"filter 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.filter="brightness(1.12)";
            (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.filter="brightness(1)";
            (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";
          }}
        >
          QUERO UM SOFTWARE ASSIM
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════════ */
export default function ProjectDetailClient({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // gera docket code a partir do slug
  const docketNum = String((project.slug.length * 13 + 5) % 900 + 100);
  const docketTag = `GL-${docketNum} / ${project.slug.replace(/-/g,"_").toUpperCase().slice(0,8)}`;

  return (
    <div style={{ background:"#090909", minHeight:"100vh", color:"#fff", overflowX:"hidden" }}>

      {mounted && <ScrollBar />}

      {/* ── HEADER ───────────────────────────────────── */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        height:"60px", padding:"0 2rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background:"rgba(9,9,9,0.88)", backdropFilter:"blur(12px)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        <Link
          href="/#portfolio"
          style={{
            display:"flex", alignItems:"center", gap:"0.45rem",
            textDecoration:"none", fontFamily:HF,
            fontSize:"0.65rem", letterSpacing:"0.2em",
            color:"rgba(255,255,255,0.35)", transition:"color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#fff"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.35)"}
        >
          <ArrowLeft size={13} strokeWidth={2} />
          PORTFÓLIO
        </Link>
        <Logo />
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"flex-start", overflow:"hidden" }}
      >
        <BlueprintGrid />

        {/* large project image — right side ghost */}
        <motion.div
          style={{ opacity: heroOp, willChange:"opacity" }}
          aria-hidden
        >
          <div style={{
            position:"absolute", top:0, right:0, bottom:0, width:"55%",
            overflow:"hidden",
          }}>
            <Image
              src={project.image} alt=""
              fill style={{ objectFit:"cover", objectPosition:"center", opacity:0.22 }}
            />
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(to right, #090909 0%, rgba(9,9,9,0.2) 60%, rgba(9,9,9,0.5) 100%)",
            }} />
          </div>
        </motion.div>

        {/* content */}
        <div style={{
          position:"relative", zIndex:1,
          padding:"120px 2rem 5rem",
          maxWidth:"900px",
        }}>
          <DocketTag code={docketTag} />

          {/* big title */}
          <div style={{ overflow:"hidden", paddingTop:"0.1em", marginTop:"-0.1em" }}>
            <motion.h1
              initial={{ y:"105%" }}
              animate={{ y:"0%" }}
              transition={{ duration:0.95, delay:0.05, ease:[0.16,1,0.3,1] }}
              style={{
                fontFamily:HF, fontWeight:700,
                fontSize:"clamp(4.5rem, 14vw, 14rem)",
                lineHeight:0.88, letterSpacing:"-0.02em",
                color:"#fff",
              }}
            >
              {project.name.toUpperCase()}
            </motion.h1>
          </div>

          {/* description */}
          <motion.p
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.45, duration:0.65 }}
            style={{
              fontSize:"clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight:1.75,
              color:"rgba(255,255,255,0.48)", maxWidth:"52ch",
              marginTop:"1.75rem",
            }}
          >
            {project.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.6, duration:0.55 }}
            style={{ display:"flex", alignItems:"center", gap:"1.5rem", marginTop:"2.5rem", flexWrap:"wrap" }}
          >
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:"0.5rem",
                padding:"0.85rem 1.75rem", borderRadius:"4px",
                background:OR, color:"#000", textDecoration:"none",
                fontFamily:HF, fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.1em",
                boxShadow:`0 0 32px ${OR4}`,
                transition:"filter 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.filter="brightness(1.12)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.filter="brightness(1)"}
            >
              ACESSAR PROJETO <ExternalLink size={13} />
            </Link>

            <Link
              href="/#portfolio"
              style={{
                fontFamily:HF, fontSize:"0.78rem", letterSpacing:"0.18em",
                color:"rgba(255,255,255,0.4)", textDecoration:"none", transition:"color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#fff"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.4)"}
            >
              Voltar ao Portfólio
            </Link>
          </motion.div>
        </div>

        {/* bottom fade */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"200px",
          background:"linear-gradient(to bottom, transparent, #090909)",
          pointerEvents:"none", zIndex:2,
        }} />
      </div>

      {/* ── BODY ─────────────────────────────────────── */}
      <main>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 2rem" }}>

          {/* section header label */}
          <div style={{
            padding:"2rem 0 0",
            borderBottom:"1px solid rgba(255,255,255,0.05)",
            marginBottom:"0",
          }}>
            <motion.p
              initial={{ opacity:0, x:-16 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5 }}
              style={{
                fontFamily:HF, fontSize:"0.6rem", letterSpacing:"0.38em",
                color:"rgba(255,255,255,0.18)", paddingBottom:"1.5rem",
              }}
            >
              02 // MAPEAMENTO DE INTERFACE
            </motion.p>
          </div>

          {/* detail rows */}
          {project.details.map((d, i) => (
            <DetailRow key={i} detail={d} index={i} image={project.image} />
          ))}

          {/* metrics */}
          <MetricsSection n={project.details.length + 1} />

          {/* spec box */}
          <section style={{ padding:"3.5rem 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            <SpecBox technologies={project.technologies} />
          </section>

          {/* cta */}
          <CtaSection />
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,0.05)",
        padding:"2rem 2rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:"1rem",
        background:"rgba(0,0,0,0.35)",
      }}>
        <Logo />
        <span style={{ fontFamily:HF, fontSize:"0.58rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.12)" }}>
          © 2025 NEW – Construindo o futuro digital.
        </span>
        <Link href="/#portfolio" style={{
          fontFamily:HF, fontSize:"0.62rem", letterSpacing:"0.18em",
          color:"rgba(255,255,255,0.2)", textDecoration:"none", transition:"color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#fff"}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.2)"}
        >
          VER TODOS OS PROJETOS →
        </Link>
      </footer>
    </div>
  );
}