"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap";
const HEADING_FONT = "'Barlow Condensed', sans-serif";

const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "Sobre",      href: "#about" },
  { label: "Modelo",     href: "#method" },
  { label: "Serviços",   href: "#services" },
  { label: "Portfólio",  href: "#portfolio" },
  { label: "Processo",   href: "#work-process" },
  { label: "FAQ",        href: "#faq" },
  { label: "Contato",    href: "#contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="relative overflow-hidden" style={{ background: "rgba(0,0,0,0.6)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <style>{`@import url('${FONT_URL}');`}</style>
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "200px",
        background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div ref={ref} className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16">

        {/* Top: logo + tagline + social */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src="https://i.imgur.com/SyXBFG5.png"
              alt="NEW - Construindo o futuro digital"
              width={201}
              height={66}
              className="h-auto"
              style={{ width: 160 }}
            />
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="flex items-center gap-3"
          >
            <Link
              href="https://wa.me/5511943157277"
              target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}
            >
              <MessageCircle className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_#25D366]" style={{ color: "#25D366" }} strokeWidth={1.8} />
            </Link>
            <Link
              href="https://www.instagram.com/new.c0de/"
              target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.2)" }}
            >
              <Instagram className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" style={{ color: "hsl(var(--primary))" }} strokeWidth={1.8} />
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left", willChange: "transform, opacity", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)", marginBottom: "2.5rem" }}
        />

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ fontFamily: HEADING_FONT, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Bottom: copyright + tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025 NEW. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
            Código que é seu. Sempre.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
