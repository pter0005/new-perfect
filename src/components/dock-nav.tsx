"use client";

import Link from 'next/link';
import { Home, User, Wrench, Briefcase, BotMessageSquare, MessageSquare, Info, Workflow } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const navItems = [
  { href: "#home", label: "Início", icon: <Home className="h-5 w-5" /> },
  { href: "#about", label: "Quem Somos", icon: <User className="h-5 w-5" /> },
  { href: "#method", label: "Método", icon: <Wrench className="h-5 w-5" /> },
  { href: "#services", label: "Serviços", icon: <BotMessageSquare className="h-5 w-5" /> },
  { href: "#work-process", label: "Como Trabalhamos", icon: <Workflow className="h-5 w-5" /> },
  { href: "#portfolio", label: "Portfólio", icon: <Briefcase className="h-5 w-5" /> },
  { href: "#faq", label: "FAQ", icon: <Info className="h-5 w-5" /> },
  { href: "#contact", label: "Contato", icon: <MessageSquare className="h-5 w-5" /> },
];

export default function DockNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end justify-center h-12 md:h-14 p-1 md:p-2 space-x-1 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href} className="group" aria-label={item.label}>
                  <div className="p-2 md:p-3 text-white/70 rounded-lg transition-all duration-300 hover:text-primary hover:scale-125 hover:-translate-y-2 hover:bg-white/10">
                    {item.icon}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
