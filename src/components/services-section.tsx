"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, ShoppingCart, Settings, LayoutDashboard, Code, BrainCircuit } from 'lucide-react';
import Link from "next/link";

const services = [
  {
    icon: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Sites e Sistemas de Delivery",
    description: "Plataformas completas para restaurantes e lojas com cardápio digital, pedidos e pagamentos online.",
  },
  {
    icon: <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "E-commerces Personalizados",
    description: "Soluções de vendas online completas e seguras.",
  },
  {
    icon: <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Sistemas Web Sob Medida",
    description: "Desenvolvimento de sistemas para otimizar seus processos.",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Dashboards & Admins",
    description: "Painéis de controle intuitivos para visualização de dados.",
  },
  {
    icon: <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Integrações com APIs",
    description: "Conectamos seus sistemas a serviços de terceiros.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Soluções com IA",
    description: "Integramos inteligência artificial para automatizar tarefas.",
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Nossos Serviços</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-foreground/80">
            Soluções completas para transformar suas ideias em realidade digital.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Link key={index} href="#portfolio" className="group">
              <Card 
                className="glassmorphism p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.3)] flex flex-col cursor-pointer h-full"
              >
                <CardContent className="p-0 space-y-4 sm:space-y-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4">
                    {service.icon}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-sm text-foreground/70 min-h-[40px] flex-grow">{service.description}</p>
                  <div className="flex items-center text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors mt-auto">
                    Ver Portfólio
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
