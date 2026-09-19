# Auditoria de front-end — agencianew.site (18/09/2026)

Site da agência NEW. Código em `C:\claude\new-perfect` (Next 15.3 + Tailwind + framer-motion), deploy Netlify, DNS/proxy Cloudflare.
Medições feitas no site NO AR (antes das correções): Lighthouse 13.5 em emulação mobile + inspeção no navegador em 360×740 e 1280×800.

## 1. Resumo em 6 linhas

| Métrica (mobile, antes) | Valor | Leitura |
|---|---|---|
| Performance | **71** | LCP 4,8 s · FCP 2,9 s · Speed Index 5,5 s · TBT 150 ms · CLS 0 |
| Acessibilidade | 91 | 10 links do dock sem nome, contraste, ordem de títulos |
| Boas práticas | 96 | erro React #418 (hydration) no console |
| SEO | 100 | mas sem imagem OG, sem sitemap, sem robots |
| Peso | 664 KB / 28 requisições | JS 330 KB · 4 fontes 91 KB · 4 capas 185 KB baixadas abaixo da dobra |
| TypeScript | **288 erros** escondidos por `ignoreBuildErrors: true` | 285 num único arquivo (hero) |

O que mais derruba o LCP não é bundle: é **decisão de produto** (loading fake de 1,5 s e herói que só mostra CTA depois de rolar). Isso fica com você (seção 3).

## 2. O que foi aplicado hoje (commit local, SEM push)

| # | Mudança | Arquivos |
|---|---|---|
| 1 | **Clau Camargo entrou no portfólio** como 1º card, com capa 1600×800 (`clau-camargo.webp`, 70 KB) e página de projeto completa | `src/lib/projects.ts`, `public/projects/clau-camargo.webp` |
| 2 | Card do portfólio ganhou `imagePosition` (foco do recorte) e as capas fora do card ativo carregam com `loading="lazy"` | `src/components/portfolio-section.tsx` |
| 3 | Fonte Barlow Condensed era baixada **duas vezes** (next/font + Google `@import` render-blocking, 832 ms no Lighthouse) e Space Grotesk era baixada sem uso. Agora tudo self-hosted via next/font (Lexend, Barlow, Bebas) | `globals.css`, `layout.tsx`, `tailwind.config.ts`, 11 componentes |
| 4 | Hydration mismatch (React #418): `isMobile` do herói era lido de `window` no cliente e `false` no servidor | `hero-section.tsx` |
| 5 | Página de projeto no celular: o HTML do servidor vinha com grid de 2 colunas espremidas (layout dependia de `useIsMobile`, que só resolve depois do JS). Virou CSS (`grid-cols-1 md:grid-cols-2`) | `project-detail-client.tsx` |
| 6 | Logo 3D travava o scroll no celular (`preventDefault` no `touchstart`). Agora `touch-action: pan-y`: rola na vertical, gira na horizontal | `new-logo-3d.tsx` |
| 7 | Dock fixo cobria o copyright do rodapé → padding inferior | `footer.tsx` |
| 8 | Ícones do dock e do rodapé (WhatsApp/Instagram) sem nome acessível → `aria-label` | `dock-nav.tsx`, `footer.tsx` |
| 9 | `params` síncrono (deprecado no Next 15) → `await params` | `portfolio/[slug]/page.tsx` |
| 10 | Formulário: `autoComplete` e `inputMode` (teclado numérico no WhatsApp, e-mail no e-mail) | `contact-section.tsx` |
| 11 | Compartilhamento: **imagem OG 1200×630** (antes o link no WhatsApp vinha sem preview), canonical, robots, `theme-color`, twitter card, `robots.txt` e `sitemap.xml` gerados | `layout.tsx`, `public/og.png`, `app/robots.ts`, `app/sitemap.ts` |
| 12 | Headers: `X-Frame-Options`, `Strict-Transport-Security`, `Permissions-Policy` | `netlify.toml` |
| 13 | TypeScript: erros corrigidos e `ignoreBuildErrors` desligado (o build agora acusa erro de tipo de verdade) | `hero-section.tsx`, `ui/sidebar.tsx`, `ui/hover-border-gradient.tsx`, `next.config.ts` |

Nada de visual mudou de propósito. Se algo mudou sem querer, é bug meu: me avisa.

**Conferido no build local depois das mudanças** (Lighthouse mobile em localhost, então LCP não é comparável com o site no ar): sem erro no console (hydration resolvido), única requisição render-blocking é o CSS do próprio Next, 16 requisições / 390 KB (eram 28 / 664 KB), 2 fontes na home (eram 4). Página da Clau em 360 px: título em 2 linhas, nada vazando, grids em 1 coluna.

## 3. Decisões que são suas (não mexi)

**A1. Loading screen fake (1,5 s + 0,55 s de saída, 1× por dia).** É a maior fatia do LCP de 4,8 s: o conteúdo já está no DOM mas fica `opacity: 0` até a barra "encher". Você escolheu isso em julho ("loading 1,5s"). Minha posição sincera: para um site que vende site rápido, 2 s de tela preta na primeira visita joga contra. Alternativas: 0,6 s só com a marca; ou só no desktop; ou tirar.

**A2. Herói esconde subtítulo e os dois botões até rolar 12–22% de 200vh.** No celular a primeira tela é só "COM A NEW / TUDO É POSSÍVEL" e um "SCROLL" quase invisível (contraste 2:1). Quem chega por anúncio não vê CTA nenhum sem rolar. Sugestão: manter o parallax, mas nascer com subtítulo e botões visíveis.

**A3. Métricas fictícias nas páginas de projeto.** Toda página mostra os MESMOS números (98/100 Lighthouse, +45% conversão, 0,4 s, 60 fps) para qualquer projeto, inclusive o da Clau. É prova social inventada; se um cliente conferir, queima a credibilidade. Sugestão: tirar a seção, ou colocar 1–2 números reais por projeto em `projects.ts`.

**A4. Toggle claro/escuro não faz nada.** `:root` e `.dark` têm as mesmas variáveis e 90% das cores são `rgba(255,255,255,…)` fixas. É um botão que não funciona ocupando espaço no dock (que em 360 px já usa 100% da largura). Sugestão: remover o toggle e o `next-themes`.

## 4. Achados restantes, por prioridade

### Performance
- **P1. Página de projeto abre em branco até o JS hidratar.** Título, descrição e botão nascem com `opacity 0`/`y 105%` no HTML do servidor; em 4G lento é 1–3 s de vazio. Correção: conteúdo visível no SSR e animação só depois de montar, ou `MotionConfig reducedMotion="user"` + `initial={false}` nos elementos do herói. Médio.
- **P2. Animação dupla ao rolar.** Cada seção é envolvida por `ScrollAnimator` (fade + translate 700 ms) E cada elemento dentro tem seu próprio `useInView`. O usuário espera duas vezes. Tirar o `ScrollAnimator` externo. Baixo esforço.
- **P3. framer-motion: chunk de 117 KB com 53 KB sem uso.** Trocar `motion` por `LazyMotion` + `m` com `domAnimation` corta ~30 KB. Médio; só vale se você quiser subir a nota.
- **P4. Cloudflare injeta 2 scripts:** `email-decode.min.js` (Scrape Shield → "Email Address Obfuscation", desligar no painel) e `beacon.min.js` (Web Analytics, 10 KB; manter se você usa). Zero código.
- **P5. `LoadingScreen` roda `setInterval` de progresso fake** e o `HoverBorderGradient` roda `setInterval` de 1 s para sempre nos dois botões do herói. Pequeno, mas é CPU em loop.

### Acessibilidade
- **AC1. Contraste.** Texto em `rgba(255,255,255,α)` sobre preto: α 0,20 → 1,7:1 · 0,25 → 2,0:1 · 0,30 → 2,5:1 · 0,38 → 3,4:1 · 0,45 → 4,4:1 · 0,50 → 5,3:1. WCAG AA pede 4,5:1 em texto corrido. Falham: subtítulo do herói (0,45), parágrafos de abertura das seções (0,38), descrições dos cards de serviço/processo (0,40–0,45), links do rodapé (0,30), rótulos "ARRASTE" (0,22–0,30). Sugestão: piso de 0,55 em texto corrido, 0,45 em rótulos grandes. É uma passada de find/replace.
- **AC2. `prefers-reduced-motion` ignorado na home** (só a `/apresentacao` respeita). Um `MotionConfig reducedMotion="user"` no layout resolve 90%.
- **AC3. FAQ:** botões sem `aria-expanded`/`aria-controls`. **Carrossel:** botões ← → sem `aria-label`; os "dots" são só decorativos (ok). **Quem Somos:** cards usam `h3` sem `h2` acima (o título da seção é `div`).

### SEO / conversão
- **S1. JSON-LD `Organization`/`LocalBusiness`** (nome, WhatsApp, Instagram, área atendida). Ajuda no Google local. Baixo esforço.
- **S2. Página de projeto sem OG próprio:** cada `/portfolio/[slug]` poderia usar a capa do projeto como `openGraph.images` no `generateMetadata`. Trivial.
- **S3. Link do projeto MusicArt é `#`** (sem site no ar). O botão "ACESSAR PROJETO" abre nada. Ou coloca a URL, ou esconde o botão quando `link === "#"`.
- **S4. Link da Clau é URL de preview** (`prospector-web-9ly.pages.dev/s/claucamargo/`). Funciona, mas num portfólio pega mal. Um subdomínio (`claucamargo.aproximaja.com.br`) resolve.

### Segurança
- **SG1. CSP** ausente. Exige listar `formsubmit.co`, `static.cloudflareinsights.com`, fontes e `unsafe-inline` para estilos (framer). Vale fazer, mas testando; não fiz para não derrubar nada.
- **SG2. Formulário** vai para `formsubmit.co` com `_captcha=false` (só honeypot). Se começar a chegar spam, ligar o captcha deles ou trocar por Cloudflare Turnstile.

### Higiene de código
- **H1. Dependências sem nenhum import no `src`:** `firebase` (v11, pesado), `recharts`, `react-day-picker`, `@react-three/fiber`, `@react-three/drei`, `date-fns`, `dotenv`, `zod`, `react-hook-form`, `@hookform/resolvers`, `embla-carousel-react`, `motion` (duplica o `framer-motion`), `@types/nodemailer`. Não entram no bundle, mas pesam no `npm install`, no Netlify e na superfície de CVE. `npm uninstall` neles.
- **H2. 30 componentes em `src/components/ui/` sem uso** (accordion, alert, alert-dialog, avatar, badge, calendar, card, card-stack, carousel, chart, checkbox, collapsible, dialog, dropdown-menu, form, hero-highlight, logo-carousel, menubar, popover, progress, radio-group, scroll-area, select, sidebar, slider, switch, table, tabs, text-roll, textarea). Apagar.
- **H3. Sobras do Firebase Studio:** `.idx/`, `apphosting.yaml`, `docs/blueprint.md`, `README.md` genérico ("This is a NextJS starter in Firebase Studio"), `components.json`. `src/tailwind.config.ts` é cópia morta do da raiz. `tech-logos.tsx` é um componente vazio. `public/images/veo3-cover.png` (236 bytes) e `public/videos/space-background.mp4` (27 bytes) são placeholders quebrados.
- **H4. ESLint ignorado no build e sem config.** `next lint` nem roda. Criar `.eslintrc` com `next/core-web-vitals` e tirar o `ignoreDuringBuilds`.
- **H5. Estilo 90% inline (`style={{}}`)** em vez de classes. Funciona, mas por isso o tema claro é impossível e o contraste não dá pra ajustar num lugar só.

## 5. Ordem que eu seguiria
1. Decidir A1–A4 (é onde está o LCP e a credibilidade).
2. P1 + P2 + AC2 (animação: visível por padrão, sem fade duplo, respeita reduced motion).
3. AC1 (contraste) e S1–S3.
4. H1–H3 (limpeza) e SG1 (CSP).
