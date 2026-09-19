"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" faz o framer-motion respeitar o "reduzir movimento"
// do sistema em TODA animação declarativa, sem precisar tratar caso a caso.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
