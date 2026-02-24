"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const HEADING_FONT = "'Barlow Condensed', sans-serif";

const C: Record<string, string> = {
  kw: "hsl(var(--primary))", id: "rgba(255,255,255,0.75)",
  str: "#86efac", tag: "#7dd3fc", at: "#fbbf24",
  op: "rgba(255,255,255,0.32)", fn: "#c4b5fd",
  cm: "rgba(255,255,255,0.2)", nu: "#fb923c",
};
type Token = [string, string];

const ROWS: Token[][][][] = [
  [
    [["import ", "kw"], ["{ useState, useEffect } ", "id"], ["from ", "kw"], ['"react"  ', "str"], ["// Next.js 14  ", "cm"]],
    [["const ", "kw"], ["Hero ", "id"], ["= (", "op"], ["{ data }: ", "op"], ["Props", "id"], [") => {   ", "op"], ["// Server Component  ", "cm"]],
    [["  return ", "kw"], ["(", "op"], ["<section ", "tag"], ["className", "at"], ["=", "op"], ['"hero-section"', "str"], [">  ", "tag"]],
    [["  <motion.div ", "tag"], ["initial", "at"], ["={{ ", "op"], ["opacity", "id"], [": ", "op"], ["0 ", "nu"], ["}}  ", "op"], ["animate", "at"], ["={{ ", "op"], ["opacity", "id"], [": ", "op"], ["1 ", "nu"], ["}}  ", "op"]],
    [["    <h1 ", "tag"], ["className", "at"], ["=", "op"], ['"text-9xl font-bold"  ', "str"], ["TUDO É POSSÍVEL  ", "id"], ["</h1>  ", "tag"]],
    [["export default ", "kw"], ["Hero  ", "fn"], ["// pages/index.tsx  ", "cm"]],
  ],
  [
    [["@tailwind ", "kw"], ["base", "id"], [";  @tailwind ", "op"], ["components", "id"], [";  @tailwind ", "op"], ["utilities", "id"], [";  "]],
    [[".hero {  ", "op"], ["display", "at"], [": ", "op"], ["flex", "str"], [";  ", "op"], ["gap", "at"], [": ", "op"], ["1rem", "nu"], [";  ", "op"], ["background", "at"], [": ", "op"], ["#0a0a0a", "nu"], [";  ", "op"], ["}  "]],
    [["bg-black ", "id"], ["text-primary ", "id"], ["font-bold ", "id"], ["tracking-tight ", "id"], ["rounded-full ", "id"], ["border-2 ", "id"], ["border-primary/40 ", "id"], ["backdrop-blur-[2px]  ", "id"]],
    [["@apply ", "kw"], ["flex items-center justify-center ", "id"], ["min-h-screen ", "id"], ["overflow-hidden ", "id"], ["bg-background  ", "id"]],
    [["  shadow-[0_0_250px_hsl(var(--primary)/_0.4)]  ", "fn"], ["from-primary/20  ", "id"], ["to-primary/10  ", "id"]],
  ],
  [
    [["import ", "kw"], ["{ initializeApp }  ", "id"], ["from ", "kw"], ['"firebase/app"  ', "str"], ["// v10  ", "cm"]],
    [["const ", "kw"], ["db ", "id"], ["= ", "op"], ["getFirestore", "fn"], ["(app)  ", "op"], ["// Realtime  ", "cm"]],
    [["await ", "kw"], ["db.collection(", "op"], ['"users"', "str"], [").doc(", "op"], ["uid", "id"], [").set({ name, email })  ", "op"]],
    [["const ", "kw"], ["snap ", "id"], ["= ", "op"], ["await ", "kw"], ["getDocs", "fn"], ["(query(col, where(", "op"], ['"role"', "str"], [", ", "op"], ['"=="', "str"], [", ", "op"], ['"admin"', "str"], ["))  ", "op"]],
    [["onSnapshot", "fn"], ["(docRef, (", "op"], ["snap", "id"], [") => ", "op"], ["setData", "fn"], ["(snap.data()))  ", "op"]],
  ],
  [
    [["type ", "kw"], ["Props ", "id"], ["= { id: ", "op"], ["string", "kw"], [";  onClick?: () => ", "op"], ["void", "kw"], [" }  "]],
    [["interface ", "kw"], ["User ", "id"], ["{ name: ", "op"], ["string", "kw"], [";  role: ", "op"], ['"admin" | "user"', "str"], [" }  "]],
    [["const ", "kw"], ["fn ", "id"], ["= async", "kw"], ["<T extends ", "op"], ["Record", "fn"], ["<", "op"], ["string", "kw"], [", unknown>>(payload: T): ", "op"], ["Promise", "fn"], ["<T>  ", "op"]],
    [["export default ", "kw"], ["function ", "kw"], ["Page", "fn"], ["(): ", "op"], ["JSX.Element ", "id"], ["{ /* render */ }  ", "op"]],
  ],
];

function EmberCoreText({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <style>{`
        .ember-text {
          display: inline-block;
          background: radial-gradient(ellipse at 50% 40%, #fffde7 0%, #ffcc02 14%, #ff8c00 38%, #ff3300 68%, #7a0000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 5px rgba(255,200,0,0.45)) drop-shadow(0 0 16px rgba(255,80,0,0.35)) drop-shadow(0 0 36px rgba(200,0,0,0.18));
        }
        @media (max-width: 767px) {
          .ember-text {
            filter: drop-shadow(0 0 3px rgba(255,200,0,0.28)) drop-shadow(0 0 9px rgba(255,80,0,0.20)) drop-shadow(0 0 20px rgba(200,0,0,0.10));
          }
        }
      `}</style>
      <span className={cn("ember-text font-heading", className)} style={style}>TUDO É POSSIVEL</span>
    </span>
  );
}

function ScrollRow({ tokens, fontSize, duration, direction = 1, isMobile }: {
  tokens: Token[]; fontSize: number; duration: number; direction?: 1 | -1; isMobile: boolean;
}) {
  if (isMobile) {
    return (
      <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize, lineHeight: 1, flexShrink: 0 }}>
          {tokens.map((tk, i) => (
            <span key={i} style={{
              color: C[tk[1]] ?? C.id,
              fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
              fontWeight: tk[1] === "kw" || tk[1] === "fn" ? 600 : 400,
              whiteSpace: "pre",
            }}>{tk[0]}</span>
          ))}
        </div>
      </div>
    );
  }
  const tripled = [...tokens, ...tokens, ...tokens];
  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
      <motion.div
        animate={{ x: direction === 1 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", alignItems: "center", fontSize, lineHeight: 1, flexShrink: 0, willChange: "transform" }}
      >
        {tripled.map((tk, i) => (
          <span key={i} style={{
            color: C[tk[1]] ?? C.id,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            fontWeight: tk[1] === "kw" || tk[1] === "fn" ? 600 : 400,
            textShadow: tk[1] === "kw" ? "0 0 8px hsl(var(--primary)/0.7)" : "none",
            whiteSpace: "pre",
          }}>{tk[0]}</span>
        ))}
      </motion.div>
    </div>
  );
}

function BatonCode({ width, height, rowSet, isMobile }: {
  width: number; height: number; rowSet: Token[][][]; isMobile: boolean;
}) {
  const rowCount = rowSet.length;
  const vertPad = height * 0.12;
  const availH = height - vertPad * 2;
  const rowH = availH / rowCount;
  const fontSize = Math.max(9, Math.min(14, rowH * 0.72));
  const speeds = [20, 28, 16, 34, 22, 26];
  const dirs: (1 | -1)[] = [1, -1, 1, -1, 1, -1];
  return (
    <div style={{
      position: "absolute", inset: 0, borderRadius: "9999px", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "center",
      paddingTop: vertPad, paddingBottom: vertPad, zIndex: 2,
    }}>
      {rowSet.map((tokens, i) => (
        <div key={i} style={{ height: rowH, flexShrink: 0, overflow: "hidden" }}>
          <ScrollRow tokens={tokens} fontSize={fontSize} duration={speeds[i % speeds.length]} direction={dirs[i % dirs.length]} isMobile={isMobile} />
        </div>
      ))}
    </div>
  );
}

// ── Visual do bastão (shell + código + overlays) ──
function BatonVisual({ width, height, rowSetIndex, isMobile, floatDuration }: {
  width: number; height: number; rowSetIndex: number; isMobile: boolean; floatDuration: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, isMobile ? 8 : 15, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      style={{ width, height, willChange: "transform", contain: "layout style" }}
      className="relative"
    >
      <style>{`
        .baton-shell {
          position: absolute; inset: 0; border-radius: 9999px;
          background: linear-gradient(to right, hsl(var(--primary)/0.2), hsl(var(--primary)/0.1));
          backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
          border: 2px solid hsl(var(--primary)/0.4);
          box-shadow: 0 0 300px hsl(var(--primary)/0.40), 0 0 420px hsl(var(--primary)/0.20), 0 0 540px hsl(var(--primary)/0.10);
          will-change: transform; transform: translateZ(0);
        }
        .baton-shell::after {
          content: ''; position: absolute; inset: 0; border-radius: 9999px;
          background: radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.6), transparent 50%);
        }
        @media (max-width: 767px) {
          .baton-shell {
            box-shadow: 0 0 80px hsl(var(--primary)/0.18), 0 0 140px hsl(var(--primary)/0.09), 0 0 200px hsl(var(--primary)/0.05);
          }
          .baton-shell::after { background: radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.25), transparent 50%); }
        }
      `}</style>
      <div className="baton-shell" />
      <BatonCode width={width} height={height} rowSet={ROWS[rowSetIndex % ROWS.length]} isMobile={isMobile} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: "9999px",
        background: "linear-gradient(to right, hsl(var(--background)) 0%, rgba(0,0,0,0) 16%, rgba(0,0,0,0) 84%, hsl(var(--background)) 100%)",
        pointerEvents: "none", zIndex: 4,
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: "9999px",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
        pointerEvents: "none", zIndex: 5,
      }} />
    </motion.div>
  );
}

// ── Bastão scroll-driven unificado ──
// Desktop: spring physics + distâncias grandes
// Mobile: transform direto (sem spring = sem custo de física), distâncias menores + range mais curto
function BatonScroll({ className, width, height, rotate, rowSetIndex,
  enterFromX, enterFromY, scrollProgress, scrollStart, scrollEnd, isMobile }: {
  className?: string; width: number; height: number; rotate: number; rowSetIndex: number;
  enterFromX: number; enterFromY: number; scrollProgress: any;
  scrollStart: number; scrollEnd: number; isMobile: boolean;
}) {
  const x = useTransform(scrollProgress, [scrollStart, scrollEnd], [enterFromX, 0]);
  const y = useTransform(scrollProgress, [scrollStart, scrollEnd], [enterFromY, 0]);
  const opacity = useTransform(scrollProgress, [scrollStart, scrollEnd], [0, 1]);

  // Sempre chama os hooks — nunca condicional (regra do React)
  // Mobile: spring config rígido = comporta como transform direto (zero bounce)
  // Desktop: spring suave com física
  const springCfg = isMobile
    ? { stiffness: 300, damping: 40, mass: 0.4 }  // rígido = quase raw
    : { stiffness: 70,  damping: 18, mass: 1 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  return (
    <motion.div
      style={{ x: sx, y: sy, opacity, rotate, position: "absolute", willChange: "transform, opacity" }}
      className={className}
    >
      <BatonVisual width={width} height={height} rowSetIndex={rowSetIndex} isMobile={isMobile} floatDuration={isMobile ? 20 : 12} />
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });

  const bgOpacity       = useTransform(p, [0, 0.15],   [0, 1]);
  const gridOpacity     = useTransform(p, [0.06, 0.25], [0, 1]);
  const titleScale      = useTransform(p, [0, 0.14],   [1.1, 1]);
  const titleY          = useTransform(p, [0, 0.14],   [20, 0]);
  const subtitleOpacity = useTransform(p, [0.12, 0.28], [0, 1]);
  const subtitleY       = useTransform(p, [0.12, 0.28], [30, 0]);
  const ctaOpacity      = useTransform(p, [0.22, 0.38], [0, 1]);
  const ctaY            = useTransform(p, [0.22, 0.38], [24, 0]);
  const heroOpacity     = useTransform(p, [0.78, 0.95], [1, 0]);
  const hintOpacity     = useTransform(p, [0, 0.05],   [1, 0]);

  // Bastões unificados — mobile: distâncias e ranges menores, sem spring
  // Desktop: distâncias maiores, spring com física
  const batons = isMobile ? [
    { w: 340, h: 85,  rot: 12,  cls: "left-[-8%] top-[18%]",   ri: 0, ex: -220, ey: -40, ss: 0.01, se: 0.10 },
    { w: 280, h: 70,  rot: -15, cls: "right-[-6%] top-[68%]",  ri: 1, ex: 200,  ey: 40,  ss: 0.02, se: 0.11 },
    { w: 180, h: 52,  rot: -8,  cls: "left-[5%] bottom-[8%]",  ri: 2, ex: -140, ey: 80,  ss: 0.03, se: 0.13 },
    { w: 140, h: 44,  rot: 20,  cls: "right-[12%] top-[12%]",  ri: 3, ex: 130,  ey: -80, ss: 0.01, se: 0.10 },
  ] : [
    { w: 720, h: 168, rot: 12,  cls: "left-[-5%] top-[20%]",    ri: 0, ex: -700, ey: -80,  ss: 0.02, se: 0.20 },
    { w: 600, h: 144, rot: -15, cls: "right-[0%] top-[75%]",    ri: 1, ex: 600,  ey: 80,   ss: 0.04, se: 0.22 },
    { w: 360, h: 96,  rot: -8,  cls: "left-[10%] bottom-[10%]", ri: 2, ex: -200, ey: 300,  ss: 0.06, se: 0.26 },
    { w: 240, h: 72,  rot: 20,  cls: "right-[20%] top-[15%]",   ri: 3, ex: 150,  ey: -300, ss: 0.03, se: 0.21 },
  ];

  return (
    <section ref={sectionRef} id="home" className="relative w-full" style={{ height: "200vh" }}>
      <motion.div
        style={{ opacity: heroOpacity, willChange: "opacity" }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }} />
        <motion.div className="absolute inset-0 bg-background" style={{ opacity: bgOpacity, zIndex: 1, willChange: "opacity" }} />

        <motion.div style={{ opacity: gridOpacity, willChange: "opacity" }} className="absolute inset-0 z-[2]">
          <AnimatedGridPattern
            numSquares={isMobile ? 20 : 50}
            maxOpacity={isMobile ? 0.07 : 0.1}
            duration={isMobile ? 5 : 3}
            repeatDelay={1}
            className={cn("fill-foreground/10 stroke-foreground/10", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12")}
          />
        </motion.div>

        {/* Bastões: scroll-driven em todos os dispositivos — mobile sem spring, desktop com spring */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 3 }}>
          {batons.map((s, i) => (
            <BatonScroll key={i} className={s.cls} width={s.w} height={s.h} rotate={s.rot} rowSetIndex={s.ri}
              enterFromX={s.ex} enterFromY={s.ey} scrollProgress={p} scrollStart={s.ss} scrollEnd={s.se} isMobile={isMobile} />
          ))}
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 flex flex-col items-center text-center">
          <motion.div style={{ scale: titleScale, y: titleY, willChange: "transform" }}>
            <h1 className="font-heading font-bold tracking-tight leading-none text-[clamp(3rem,14vw,9rem)]">
              <span className="block text-white/90">com a NEW</span>
              <EmberCoreText className="font-heading font-bold tracking-tight leading-none text-[clamp(3rem,14vw,9rem)]" />
            </h1>
          </motion.div>

          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity, willChange: "transform, opacity" }}
            className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/45 max-w-xs sm:max-w-sm md:max-w-xl leading-relaxed"
          >
            Criamos o ativo digital perfeito para o seu negócio. Conheça nosso modelo SWAS.
          </motion.p>

          <motion.div
            style={{ y: ctaY, opacity: ctaOpacity, willChange: "transform, opacity" }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto items-center"
          >
            <HoverBorderGradient
              as={Link} href="#contact" containerClassName="rounded-md w-full sm:w-auto"
              className="bg-primary text-primary-foreground font-bold px-10 py-4 w-full sm:w-auto text-center text-base sm:text-lg tracking-wide"
            >
              <span>Fale com a NEW</span>
            </HoverBorderGradient>
            <HoverBorderGradient
              as={Link} href="#portfolio" containerClassName="rounded-md w-full sm:w-auto"
              className="bg-white/[0.06] text-white font-bold px-10 py-4 w-full sm:w-auto text-center text-base sm:text-lg tracking-wide border border-white/20"
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Ver projetos →</span>
            </HoverBorderGradient>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] sm:text-[10px] text-white/25 tracking-[0.3em] font-heading">SCROLL</span>
          <motion.div
            animate={isMobile ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "24px", background: "linear-gradient(to bottom, hsl(var(--primary)/0.5), transparent)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
