"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Send } from 'lucide-react';
import { WhatsAppIcon } from "@/components/icons";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);

    try {
      const response = await fetch("https://formsubmit.co/ajax/b27ba263210b726a6b1c57b00645ca7d", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formProps),
      });

      if (!response.ok) {
        throw new Error("Houve um problema ao enviar sua mensagem.");
      }

      toast({
        title: "Mensagem Enviada!",
        description: "Obrigado por entrar em contato. Responderemos em breve.",
      });
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao Enviar",
        description: "Houve um problema ao enviar sua mensagem. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Vamos Conversar?</h2>
          <p className="mt-4 text-base md:text-lg text-foreground/80">
            Conte-nos sua ideia. Estamos prontos para transformar seu projeto em realidade.
          </p>
        </div>
        
        <div className="mt-12 max-w-2xl mx-auto">
            <Card className="glassmorphism p-6 md:p-8">
                <CardContent className="p-0">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Honeypot */}
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        {/* Disable Captcha */}
                        <input type="hidden" name="_captcha" value="false" />
                        {/* Fallback redirect */}
                        <input type="hidden" name="_next" value="https://new-tec.netlify.app/" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground/80">Nome</label>
                                <Input id="name" placeholder="Seu nome" name="name" className="bg-secondary/40 border-border focus:border-primary focus:ring-primary" required disabled={isSubmitting} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground/80">E-mail</label>
                                <Input id="email" type="email" placeholder="seu@email.com" name="email" className="bg-secondary/40 border-border focus:border-primary focus:ring-primary" required disabled={isSubmitting} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="whatsapp" className="text-sm font-medium text-foreground/80">WhatsApp (Opcional)</label>
                                <Input id="whatsapp" placeholder="(XX) XXXXX-XXXX" name="whatsapp" className="bg-secondary/40 border-border focus:border-primary focus:ring-primary" disabled={isSubmitting} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium text-foreground/80">Empresa (Opcional)</label>
                                <Input id="company" placeholder="Nome da sua empresa" name="company" className="bg-secondary/40 border-border focus:border-primary focus:ring-primary" disabled={isSubmitting} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground/80">Descreva seu projeto</label>
                            <Textarea id="message" placeholder="Conte-nos mais sobre sua ideia, objetivos e qualquer detalhe importante..." name="message" rows={5} className="bg-secondary/40 border-border focus:border-primary focus:ring-primary" required disabled={isSubmitting} />
                        </div>
                        
                        <Button 
                            type="submit" 
                            size="lg" 
                            className="w-full bg-primary text-primary-foreground text-base md:text-lg font-bold transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:drop-shadow-[0_0_10px_hsl(var(--primary))]"
                            disabled={isSubmitting}
                        >
                            <Send className="mr-2 h-4 w-4" />
                            {isSubmitting ? 'Enviando...' : 'Solicitar Proposta'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>

        <div className="mt-12 text-center">
            <div className="relative flex justify-center items-center">
                <div className="absolute w-full max-w-sm h-px bg-border"></div>
                <h3 className="relative bg-background px-4 text-xl font-bold">Ou fale direto conosco!</h3>
            </div>
            <div className="mt-6 flex justify-center items-center space-x-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="https://wa.me/5511943157277?text=Ol%C3%A1%2C%20estou%20entrando%20em%20contato%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#25D366]/90 transition-transform duration-200 hover:scale-125">
                        <WhatsAppIcon className="h-10 w-10" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="https://www.instagram.com/new.c0de/" target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:text-primary transition-transform duration-200 hover:scale-125">
                        <Instagram className="h-10 w-10 hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        </div>
      </div>
    </section>
  );
}
