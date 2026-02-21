"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, X, Gem, Repeat } from 'lucide-react';

export default function MethodSection() {
  return (
    <section id="method" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            SaaS é passado. O futuro é ser <span className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.5)]">dono</span>.
          </h2>
          <p className="mt-4 text-base md:text-lg text-foreground/70">
            Cansado de pagar aluguel por ferramentas que não são suas? Conheça o modelo SWAS (Software with a Service) e invista em um ativo digital que cresce com você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-stretch">

          {/* Card SaaS - O Aluguel */}
          <Card className="glassmorphism border-border/60 flex flex-col relative overflow-hidden group">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground/60 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/60 flex items-center justify-center">
                  <Repeat className="h-6 w-6 text-foreground/50" />
                </div>
                <span>Modelo SaaS</span>
              </CardTitle>
              <CardDescription className="text-foreground/50 !mt-1">
                O "Aluguel" — Software as a Service
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <ul className="space-y-5 text-sm sm:text-base text-foreground/60">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive/80 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/70">Mensalidade Eterna:</span> Você paga todo mês. Se parar de pagar, perde tudo. O software nunca é seu.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive/80 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/70">Sem Personalização:</span> Você usa o que todo mundo usa. Não dá para mudar a estrutura para o seu negócio.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive/80 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/70">Código Fechado:</span> Se a empresa do software falir ou aumentar o preço, você fica refém.
                  </div>
                </li>
              </ul>
            </CardContent>
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             <div className="absolute top-0 left-0 w-full h-full bg-black/30 pointer-events-none" />
          </Card>

          {/* Card SWAS - A Escolha Inteligente */}
          <Card className="bg-primary/5 border-2 border-primary/50 flex flex-col relative overflow-hidden group shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-slow" />
             <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-primary flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Gem className="h-6 w-6 text-primary" />
                </div>
                <span>Modelo SWAS</span>
              </CardTitle>
              <CardDescription className="!mt-1 text-primary/80">
                A Escolha Inteligente — Software with a Service
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <ul className="space-y-5 text-sm sm:text-base text-foreground/90">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-primary/90">É Seu (Ativo Digital):</span> Como construir uma casa. O código é seu. Você está investindo em patrimônio.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-primary/90">Liberdade Total:</span> Quer mudar um botão? Quer criar uma função nova? Nós fazemos. Sem limites.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-primary/90">Segurança e Escala:</span> Seu banco de dados, suas regras. Preparamos o sistema para crescer com você.
                  </div>
                </li>
              </ul>
              <div className="mt-8 text-center font-heading text-lg font-bold text-primary/90">
                Resultado: Você no controle.
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
