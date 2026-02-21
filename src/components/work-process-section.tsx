"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  LayoutTemplate,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Rocket,
  LifeBuoy
} from 'lucide-react';

const processSteps = [
  {
    icon: <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Briefing",
    description: "Entendemos suas necessidades e objetivos."
  },
  {
    icon: <LayoutTemplate className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Protótipo",
    description: "Criamos um design visual e funcional."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Aprovação",
    description: "Ajustamos o protótipo com seu feedback."
  },
  {
    icon: <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Desenvolvimento",
    description: "Codificamos a solução com tecnologia de ponta."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Testes",
    description: "Garantimos a qualidade e performance do projeto."
  },
  {
    icon: <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Entrega",
    description: "Lançamos o projeto e entregamos os acessos."
  },
  {
    icon: <LifeBuoy className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Suporte",
    description: "Oferecemos suporte contínuo para o seu sucesso."
  }
];

export default function WorkProcessSection() {
  return (
    <section id="work-process" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Como Trabalhamos</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-foreground/80">
            Nosso processo é transparente e colaborativo, garantindo entregas de alta qualidade.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="relative group glassmorphism p-4 sm:p-6 pt-10 sm:pt-12 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/80 hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.3)] flex flex-col items-center">
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm sm:text-lg">
                {index + 1}
              </div>
              <CardHeader className="p-0">
                {step.icon}
              </CardHeader>
              <CardContent className="p-0 mt-4 space-y-2">
                <CardTitle className="text-base sm:text-lg font-bold text-foreground">{step.title}</CardTitle>
                <p className="text-xs sm:text-sm text-foreground/70">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
