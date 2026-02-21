"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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

function EmberCoreText({ className }: { className?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <style>{`
        .ember-text {
          display: inline-block;
          background: radial-gradient(ellipse at 50% 40%, #fffde7 0%, #ffcc02 14%, #ff8c00 38%, #ff3300 68%, #7a0000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter:
            drop-shadow(0 0 5px rgba(255,200,0,0.45))
            drop-shadow(0 0 16px rgba(255,80,0,0.35))
            drop-shadow(0 0 36px rgba(200,0,0,0.18));
        }
        @media (max-width: 767px) {
          .ember-text {
            filter:
              drop-shadow(0 0 3px rgba(255,200,0,0.28))
              drop-shadow(0 0 9px rgba(255,80,0,0.20))
              drop-shadow(0 0 20px rgba(200,0,0,0.10));
          }
        }
      `}</style>
      <span className={cn("ember-text", className)}>
        TUDO É POSSIVEL.
      </span>
    </span>
  );
}

function ScrollRow({ tokens, fontSize, duration, direction = 1 }: {
  tokens: Token[]; fontSize: number; duration: number; direction?: 1 | -1;
}) {
  const tripled = [...tokens, ...tokens, ...tokens];
  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
      <motion.div
        animate={{ x: direction === 1 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", alignItems: "center", fontSize, lineHeight: 1, flexShrink: 0 }}
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

function BatonCode({ width, height, rowSet }: { width: number; height: number; rowSet: Token[][][] }) {
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
          <ScrollRow tokens={tokens} fontSize={fontSize} duration={speeds[i % speeds.length]} direction={dirs[i % dirs.length]} />
        </div>
      ))}
    </div>
  );
}

function ElegantShape({
  className, width = 400, height = 100, rotate = 0, rowSetIndex = 0,
  enterFromX = 0, enterFromY = 0, scrollProgress,
  scrollStart = 0.02, scrollEnd = 0.22,
}: {
  className?: string; width?: number; height?: number; rotate?: number; rowSetIndex?: number;
  enterFromX?: number; enterFromY?: number; scrollProgress: any;
  scrollStart?: number; scrollEnd?: number;
}) {
  const x = useTransform(scrollProgress, [scrollStart, scrollEnd], [enterFromX, 0]);
  const y = useTransform(scrollProgress, [scrollStart, scrollEnd], [enterFromY, 0]);
  const opacity = useTransform(scrollProgress, [scrollStart, scrollEnd], [0, 1]);
  const sx = useSpring(x, { stiffness: 70, damping: 18 });
  const sy = useSpring(y, { stiffness: 70, damping: 18 });

  return (
    <motion.div style={{ x: sx, y: sy, opacity, rotate, position: "absolute" }} className={className}>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <style>{`
          .baton-shell {
            position: absolute; inset: 0; border-radius: 9999px;
            background: linear-gradient(to right, hsl(var(--primary)/0.2), hsl(var(--primary)/0.1));
            backdrop-filter: blur(2px);
            border: 2px solid hsl(var(--primary)/0.4);
            box-shadow:
              0 0 250px hsl(var(--primary)/0.40),
              0 0 350px hsl(var(--primary)/0.20),
              0 0 450px hsl(var(--primary)/0.10);
          }
          .baton-shell::after {
            content: '';
            position: absolute; inset: 0; border-radius: 9999px;
            background: radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.6), transparent 50%);
          }
          @media (max-width: 767px) {
            .baton-shell {
              box-shadow:
                0 0 80px hsl(var(--primary)/0.18),
                0 0 140px hsl(var(--primary)/0.09),
                0 0 200px hsl(var(--primary)/0.05);
            }
            .baton-shell::after {
              background: radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.25), transparent 50%);
            }
          }
        `}</style>
        <div className="baton-shell" />
        <BatonCode width={width} height={height} rowSet={ROWS[rowSetIndex % ROWS.length]} />
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
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
  const heroOpacity     = useTransform(p, [0.83, 0.97], [1, 0]);
  const hintOpacity     = useTransform(p, [0, 0.05],   [1, 0]);

  return (
    // 380vh = 5% menos que 400vh
    <section ref={sectionRef} id="home" className="relative w-full" style={{ height: "380vh" }}>
      <motion.div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }} />
        <motion.div className="absolute inset-0 bg-background" style={{ opacity: bgOpacity, zIndex: 1 }} />

        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 z-[2]">
          <AnimatedGridPattern
            numSquares={50} maxOpacity={0.1} duration={3} repeatDelay={1}
            className={cn("fill-foreground/10 stroke-foreground/10", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12")}
          />
        </motion.div>

        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 3 }}>
          <ElegantShape
            width={600} height={140} rotate={12} className="left-[-5%] top-[20%]"
            rowSetIndex={0} scrollProgress={p}
            enterFromX={-700} enterFromY={-80} scrollStart={0.02} scrollEnd={0.2}
          />
          <ElegantShape
            width={500} height={120} rotate={-15} className="right-[0%] top-[75%]"
            rowSetIndex={1} scrollProgress={p}
            enterFromX={600} enterFromY={80} scrollStart={0.04} scrollEnd={0.22}
          />
          <ElegantShape
            width={300} height={80} rotate={-8} className="left-[10%] bottom-[10%]"
            rowSetIndex={2} scrollProgress={p}
            enterFromX={-200} enterFromY={300} scrollStart={0.06} scrollEnd={0.26}
          />
          <ElegantShape
            width={200} height={60} rotate={20} className="right-[20%] top-[15%]"
            rowSetIndex={3} scrollProgress={p}
            enterFromX={150} enterFromY={-300} scrollStart={0.03} scrollEnd={0.21}
          />
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 flex flex-col items-center text-center">
          <motion.div style={{ scale: titleScale, y: titleY }}>
            <h1 className="font-heading font-bold tracking-tight leading-none text-[clamp(3rem,14vw,9rem)]">
              <span className="block text-white/90">com a NEW</span>
              <EmberCoreText className="font-heading font-bold tracking-tight leading-none text-[clamp(3rem,14vw,9rem)]" />
            </h1>
          </motion.div>

          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/45 max-w-xs sm:max-w-sm md:max-w-xl leading-relaxed"
          >
            Criamos o ativo digital perfeito para o seu negócio. Conheça nosso modelo SWAS.
          </motion.p>

          <motion.div
            style={{ y: ctaY, opacity: ctaOpacity }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto items-center"
          >
            <HoverBorderGradient
              as={Link} href="#contact" containerClassName="rounded-md w-full sm:w-auto"
              className="bg-primary text-primary-foreground font-bold px-8 py-3 w-full sm:w-auto text-center"
            >
              <span>Fale com a NEW</span>
            </HoverBorderGradient>
            <HoverBorderGradient
              as={Link} href="#portfolio" containerClassName="rounded-md w-full sm:w-auto"
              className="bg-transparent text-primary font-bold px-8 py-3 w-full sm:w-auto text-center"
            >
              <span>Ver projetos →</span>
            </HoverBorderGradient>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] sm:text-[10px] text-white/25 tracking-[0.3em] font-heading">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "24px", background: "linear-gradient(to bottom, hsl(var(--primary)/0.5), transparent)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}