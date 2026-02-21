import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "O site será realmente meu?",
    answer: "Sim! Diferente de outras plataformas, aqui você tem posse total do seu ativo digital. Após a entrega, você recebe todos os arquivos e acessos, sem nenhuma mensalidade ou taxa de manutenção."
  },
  {
    question: "Quanto tempo leva para meu projeto ficar pronto?",
    answer: "O prazo varia conforme a complexidade do projeto. Landing pages simples podem ser entregues em poucos dias, enquanto sistemas mais complexos podem levar algumas semanas. Sempre definimos um cronograma claro no início."
  },
  {
    question: "E se eu precisar de alterações no futuro?",
    answer: "Seu projeto é totalmente flexível. Oferecemos pacotes de horas ou orçamentos pontuais para adicionar novas funcionalidades, alterar o design ou realizar qualquer ajuste que seu negócio precise no futuro."
  },
  {
    question: "Vocês oferecem hospedagem e domínio?",
    answer: "Podemos auxiliar em todo o processo de contratação e configuração da hospedagem e do domínio, recomendando os melhores serviços de acordo com a sua necessidade. Os custos desses serviços são pagos diretamente ao provedor."
  }
]

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Perguntas Frequentes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-foreground/80">
            Tirando suas dúvidas para que possamos começar a construir o futuro juntos.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glassmorphism mb-4 rounded-lg px-4 md:px-6">
                <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
