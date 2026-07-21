export const projects = [
  {
    slug: "music-art",
    name: "MusicArt",
    type: "Site para Escola de Música",
    image: "/projects/musicart.webp",
    hint: "music school",
    link: "#",
    description: "Site de uma página para a MusicArt, escola de música em Arujá. Bem leve, abre quase na hora e leva o visitante direto pra agendar a aula experimental gratuita. Tem hero em 3D, instrumentos, professores e as fotos do espaço, tudo num lugar só.",
    technologies: ["HTML", "CSS", "JavaScript", "Three.js"],
    details: [
      {
        title: "O que a página resolve",
        points: [
          "A primeira coisa que a pessoa vê é o botão de aula experimental gratuita, que é o que a escola mais quer.",
          "Tudo em uma página só: instrumentos, professores, fotos do espaço e contato direto no WhatsApp.",
          "Pensada primeiro pro celular, que é por onde a maioria chega."
        ]
      },
      {
        title: "Rápida e bem acabada",
        points: [
          "A página inteira pesa cerca de 800KB já com todas as fotos, então carrega rápido até no 4G.",
          "Fotos em WebP com versão de reserva e carregamento sob demanda conforme a pessoa rola a tela.",
          "Respeita quem prefere menos animação no aparelho, por acessibilidade."
        ]
      },
      {
        title: "Como foi feita",
        points: [
          "HTML, CSS e JavaScript puro, sem framework pesado, o que deixa fácil de manter e barato de hospedar.",
          "Abertura com um hero em 3D feito em Three.js.",
          "Dados de escola de música no código (schema.org) pra ajudar a aparecer na busca do Google da região."
        ]
      }
    ]
  },
  {
    slug: "nil-solucoes",
    name: "NIL Soluções",
    type: "Site para Construção e Reforma",
    image: "/projects/nil-solucoes.webp",
    hint: "construction renovation",
    link: "https://nilsolucoes.netlify.app/",
    description: "Site de uma página para a NIL Soluções, de construção, reforma e manutenção. Mostra os serviços, as obras já feitas e leva o visitante direto pro orçamento no WhatsApp.",
    technologies: ["HTML", "CSS", "JavaScript"],
    details: [
      {
        title: "O que a página resolve",
        points: [
          "Mostra na hora o que a NIL faz: piso, gesso, drywall, pintura e reforma em geral.",
          "Tem foto de obra pronta, depoimento de cliente e um caminho curto até o orçamento.",
          "Feita pensando no celular, que é por onde o cliente de obra costuma chegar."
        ]
      },
      {
        title: "Como foi feita",
        points: [
          "HTML, CSS e JavaScript puro, leve e fácil de manter.",
          "Identidade em preto, laranja e prata, com a cara de quem trabalha com obra.",
          "Botão de WhatsApp sempre à mão pra pedir orçamento sem complicação."
        ]
      }
    ]
  },
  {
    slug: "braum-barber",
    name: "Braum Barber",
    type: "Site Institucional",
    image: "/projects/braum-barber.webp",
    hint: "barber shop",
    link: "https://braumbarber.netlify.app/",
    description: "Um site institucional moderno para uma barbearia, construído com as tecnologias mais atuais para garantir performance e uma ótima experiência visual.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    details: [
        {
            title: "Estrutura e Tecnologias",
            points: [
                "Framework Principal: Next.js (versão 15) para sites rápidos e otimizados para SEO.",
                "Linguagem: Código robusto e com menos erros graças ao TypeScript.",
                "Estilização: Tema de cores centralizado e classes personalizadas em 'globals.css' para fácil customização."
            ]
        },
        {
            title: "Arquitetura de Componentes",
            points: [
                "Organização: O projeto é dividido em componentes reutilizáveis (layout, seções, UI) para fácil manutenção.",
                "Página Única: 'page.tsx' organiza a ordem das seções, criando uma experiência de navegação fluida.",
                "Molde Principal: 'layout.tsx' define a estrutura base do HTML, incluindo cabeçalho, rodapé e fontes."
            ]
        },
        {
            title: "Animações e Experiência",
            points: [
                "Animações de Scroll: Utiliza IntersectionObserver para detectar quando um elemento entra na tela e aplicar animações sutis.",
                "Performance: Foco em uma experiência de usuário fluida, com carregamento rápido e interações suaves."
            ]
        }
    ]
  },
  {
    slug: "mycupid",
    name: "MyCupid",
    type: "Plataforma para Criação de Páginas de Amor",
    image: "/projects/mycupid.webp",
    hint: "love page creator",
    link: "https://mycupid.com.br",
    description: "Uma plataforma para criar 'páginas de amor' digitais e personalizadas. Uma evolução moderna da carta de amor, em formato de página web interativa, onde usuários adicionam fotos, textos, músicas e jogos, compartilhando um presente emocionante por link ou QR Code.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase", "Firestore", "Genkit", "Tailwind CSS", "ShadCN/UI", "Framer Motion", "React Three Fiber", "Mercado Pago", "PayPal"],
    details: [
      {
        title: "Frontend: A Experiência do Usuário",
        points: [
          'Fundação (Next.js & React): Estrutura de rotas eficiente e carregamento rápido com Next.js, combinado com a criação de componentes reutilizáveis em React.',
          'A "Gramática" (TypeScript): Código mais seguro e robusto, evitando bugs comuns do JavaScript e garantindo a integridade do sistema.',
          'Pintura e Acabamento (Tailwind CSS & ShadCN/UI): Estilização prática com Tailwind e componentes de alta qualidade do ShadCN/UI para um visual profissional e consistente.',
          'O "Uau!" (Framer Motion & React Three Fiber): Animações fluidas na interface com Framer Motion e elementos 3D imersivos, como a linha do tempo, criados com React Three Fiber.'
        ]
      },
      {
        title: "Backend: A Inteligência por Trás da Magia",
        points: [
          'Arquitetura Serverless com Firebase: Plataforma robusta e escalável que elimina a necessidade de um servidor tradicional.',
          'Firebase Authentication: Sistema de login seguro com suporte a e-mail/senha e contas Google.',
          'Firestore: Banco de dados em tempo real para armazenar de forma organizada as "LovePages", dados de usuários e rascunhos de pagamento.',
          'Firebase Storage: Armazenamento seguro na nuvem para todas as fotos e áudios enviados pelos usuários.',
          'Inteligência Artificial (Genkit): Utiliza IA para a busca inteligente de músicas no YouTube, enriquecendo a experiência da página.',
          'Pagamentos (Mercado Pago & PayPal): Integração segura com gateways de pagamento líderes, sem armazenar dados sensíveis de cartão de crédito.'
        ]
      },
      {
        title: "O Fluxo da Criação à Entrega",
        points: [
          'Criação Intuitiva: Um "wizard" passo a passo guia o usuário na personalização da sua página de amor.',
          'Salvamento Automático: Todas as alterações são salvas em um rascunho no Firestore, com mídias guardadas temporariamente no Storage.',
          'Pagamento Seguro: O usuário é redirecionado para o ambiente seguro do Mercado Pago ou PayPal para finalizar a compra.',
          'Confirmação via Webhook: Um sinal automático do gateway de pagamento notifica o sistema sobre a aprovação da compra.',
          'Finalização Automatizada: O sistema converte o rascunho na "LovePage" final, movendo os arquivos para um local permanente.',
          'Entrega Imediata: A página se torna acessível por um link único e QR Code, pronta para ser compartilhada como surpresa.'
        ]
      }
    ]
  },
  {
    slug: "personal-trainer-dashboard",
    name: "Personal Trainer",
    type: "Dashboard Analítico de Performance",
    image: "/projects/personal-trainer.webp",
    hint: "data dashboard",
    link: "https://personal-example.netlify.app/",
    description: "Um painel de controle personalizado que transforma dados de alunos em insights visuais. Personal trainers podem acompanhar o progresso, ajustar treinos e visualizar o desempenho de seus clientes de forma clara e organizada.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    details: [
        {
            title: "Acompanhamento Inteligente de Alunos",
            points: [
                "Visualize a evolução de cada aluno através de gráficos interativos de peso, medidas e performance nos treinos.",
                "Filtre os dados por período para analisar o progresso semanal, mensal ou trimestral.",
                "Receba alertas automáticos quando um aluno atinge uma meta importante ou fica um período sem treinar."
            ]
        },
        {
            title: "Gestão Centralizada do Negócio",
            points: [
                "Acesse rapidamente a ficha de treino de cada aluno, facilitando o planejamento e ajustes.",
                "Controle pagamentos e mensalidades em um só lugar, com indicadores visuais de quem está em dia ou com pendências.",
                "Exporte relatórios de progresso em PDF para compartilhar com os alunos, agregando valor ao seu serviço."
            ]
        },
        {
            title: "Tecnologia por trás dos dados",
            points: [
                "O frontend em React consome uma API RESTful customizada, construída com Node.js, para buscar e manipular os dados.",
                "Utilizamos a biblioteca D3.js para criar visualizações de dados e gráficos customizados, oferecendo mais flexibilidade que bibliotecas prontas.",
                "O banco de dados PostgreSQL foi escolhido por sua robustez e capacidade de lidar com consultas complexas para gerar os relatórios de performance."
            ]
        }
    ]
  },
  {
    slug: "pizza-nova",
    name: "Pizza Nova",
    type: "Cardápio Digital & Sistema de Pedidos",
    image: "/projects/pizza-nova.webp",
    hint: "pizza website",
    link: "https://tangerine-lebkuchen-c4599f.netlify.app/",
    description: "Uma solução digital completa para pizzarias que agiliza o atendimento. Clientes pedem diretamente da mesa via QR Code, enviando os pedidos para a cozinha em tempo real, o que diminui a espera e otimiza o trabalho dos garçons.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Firebase"],
    details: [
        {
            title: "Como funciona para o cliente?",
            points: [
                "O cliente escaneia um QR Code na mesa e acessa o cardápio instantaneamente, sem precisar baixar nenhum aplicativo.",
                "Navega pelas pizzas e bebidas, adicionando itens ao seu pedido com um clique.",
                "Ao finalizar, o pedido é enviado diretamente para a cozinha, sem precisar chamar o garçom.",
                "Pode acompanhar o status do pedido (ex: 'Em preparo', 'Pronto') pelo celular."
            ]
        },
        {
            title: "O que o restaurante controla?",
            points: [
                "Um painel de controle simples permite cadastrar, editar e remover produtos do cardápio a qualquer momento.",
                "A cozinha recebe os pedidos em uma tela organizada, mostrando exatamente o que preparar e para qual mesa.",
                "Os garçons e o caixa têm uma visão geral de todos os pedidos, facilitando o fechamento da conta e o atendimento."
            ]
        },
        {
            title: "Tecnologia por trás da agilidade",
            points: [
                "A interface foi construída com Next.js para renderização rápida no lado do servidor, garantindo que o cardápio carregue quase instantaneamente.",
                "Utilizamos o Firestore do Firebase, um banco de dados NoSQL em tempo real, para sincronizar pedidos entre o cliente e a cozinha sem atrasos.",
                "O acesso ao painel administrativo é protegido pelo Firebase Authentication, garantindo que apenas funcionários autorizados gerenciem o sistema."
            ]
        }
    ]
  },
  {
    slug: "team-veo3",
    name: "Team VEO3",
    type: "Site Institucional com IA",
    image: "/projects/team-veo3.webp",
    hint: "ia videos",
    link: "https://www.teamveo3.com/",
    description: "Um site institucional de vanguarda para uma produtora de vídeos com Inteligência Artificial. O design futurista e as animações fluidas criam uma vitrine digital que reflete a inovação da marca e cativa clientes de alto nível.",
    technologies: ["Next.js", "React", "Tailwind CSS", "ShadCN UI", "Framer Motion"],
    details: [
        {
            title: "Impacto Visual e Navegação Intuitiva",
            points: [
                "O site causa uma primeira impressão memorável, guiando o usuário pela página de forma suave para contar a história da marca.",
                "O portfólio de vídeos é o centro das atenções, com uma galeria imersiva que carrega rapidamente e funciona bem em todos os dispositivos.",
                "Cada elemento foi desenhado para reforçar a identidade de uma marca que está à frente do seu tempo."
            ]
        },
        {
            title: "Foco em Resultados e Conversão",
            points: [
                "O site não é apenas bonito, ele foi projetado para transformar visitantes em clientes com chamadas para ação claras.",
                "Um formulário de contato direto e de fácil acesso permite que potenciais clientes solicitem orçamentos rapidamente.",
                "A estrutura foi otimizada para os mecanismos de busca (SEO), ajudando a Team VEO3 a ser encontrada no Google."
            ]
        },
        {
            title: "Tecnologia por trás da performance",
            points: [
                "Construído com Next.js, o site é gerado estaticamente (SSG), o que resulta em um carregamento ultra-rápido e excelente pontuação de SEO.",
                "As animações são feitas com Framer Motion, que utiliza aceleração de hardware (GPU) para garantir transições suaves e fluidas a 60fps.",
                "O uso de componentes ShadCN UI garante um design consistente, acessível e de fácil manutenção."
            ]
        }
    ]
  }
];

export type Project = (typeof projects)[number];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
