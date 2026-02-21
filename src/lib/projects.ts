export const projects = [
  {
    slug: "pizza-nova",
    name: "Pizza Nova",
    type: "Cardápio Digital & Sistema de Pedidos",
    image: "https://i.imgur.com/Ed9Oo8w.png",
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
    image: "https://i.imgur.com/Tu4WgVV.png",
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
  },
  {
    slug: "sufgang",
    name: "Sufgang",
    type: "E-commerce de Moda Conceitual",
    image: "https://i.imgur.com/78iIp9n.png",
    hint: "fashion store",
    link: "https://www.sufgang.com.br/",
    description: "Uma loja virtual para uma marca de moda com identidade forte e conceitual. A plataforma oferece uma experiência de compra imersiva, onde o design sombrio e minimalista destaca os produtos e reflete a exclusividade da marca.",
    technologies: ["Next.js", "Shopify API", "Tailwind CSS", "Stripe"],
    details: [
        {
            title: "Experiência de Compra Única",
            points: [
                "O cliente navega por coleções e produtos de forma fluida, com fotos de alta qualidade que valorizam cada detalhe das peças.",
                "O processo de checkout é rápido e seguro, com poucas etapas para evitar que o cliente desista da compra.",
                "Clientes podem criar uma conta para salvar seus dados e acompanhar o status de entrega dos seus pedidos."
            ]
        },
        {
            title: "Gestão Simplificada para a Marca",
            points: [
                "A loja é integrada com o sistema da Shopify, permitindo que a Sufgang gerencie produtos, estoque e pedidos de forma centralizada.",
                "Os pagamentos são processados com segurança pela Stripe, uma das maiores e mais confiáveis plataformas do mundo.",
                "Um sistema de busca inteligente ajuda os clientes a encontrarem exatamente o que procuram."
            ]
        },
        {
            title: "Tecnologia por trás da loja",
            points: [
                "Adotamos uma arquitetura de 'headless commerce', consumindo a API da Shopify. Isso nos deu total liberdade criativa no frontend com Next.js, mantendo o backend robusto da Shopify.",
                "O frontend é desacoplado, o que permite atualizações de design e funcionalidades sem afetar a lógica de negócio do e-commerce.",
                "A integração com a Stripe foi feita via API, garantindo um processo de pagamento seguro e compatível com as normas PCI."
            ]
        }
    ]
  },
  {
    slug: "personal-trainer-dashboard",
    name: "Personal Trainer",
    type: "Dashboard Analítico de Performance",
    image: "https://i.imgur.com/eiVreq3.png",
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
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
