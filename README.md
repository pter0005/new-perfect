# NEW — agencianew.site

Site institucional da NEW, agência de sites, lojas e sistemas sob medida.
Uma página só (herói + seções) mais as páginas de projeto do portfólio e a
ficha de apresentação em `/apresentacao`.

## Stack

- **Next.js 15.3** (App Router, React 18) — páginas estáticas
- **Tailwind CSS** + **framer-motion** para as animações
- **TypeScript** com type-check ligado no build (`ignoreBuildErrors: false`)
- Fontes self-hosted via `next/font` — nada de `@import` do Google em runtime
- Deploy na **Netlify**

## Rodando

```bash
npm install
npm run dev     # dev server em http://localhost:3000 (turbopack)
npm run build   # build de produção — roda type-check e lint junto
npm run lint    # só o ESLint
```

O build só passa com 0 erros de TypeScript e 0 erros de ESLint.

## Deploy

Automático pela Netlify: todo push na branch principal do GitHub dispara um
build novo. Os headers de cache e de segurança ficam em `netlify.toml`; o
Content-Security-Policy fica em `next.config.ts` e só vale em produção.

## Adicionando um projeto no portfólio

1. Coloque a capa em `public/projects/<slug>.webp`, em **1600×800**.
2. Adicione uma entrada no array `projects` de `src/lib/projects.ts`:

```ts
{
  slug: "meu-projeto",                   // vira a URL /portfolio/meu-projeto
  name: "Meu Projeto",
  type: "Loja virtual",
  image: "/projects/meu-projeto.webp",
  imagePosition: "50% 30%",              // opcional — recorte da capa no card
  hint: "online store",
  link: "https://site-do-cliente.com",   // use "#" se o site ainda não está no ar
  description: "Uma linha explicando o que o projeto resolve.",
  technologies: ["Next.js", "Tailwind"],
  details: [
    { title: "O que resolve", points: ["Ponto um.", "Ponto dois."] },
  ],
}
```

O card no portfólio, a página `/portfolio/<slug>`, o sitemap e as imagens de
Open Graph saem dessa entrada sozinhos. Quando `link` é `"#"`, o botão
"ACESSAR PROJETO" não aparece na página do projeto.

## Auditoria de front-end

O diagnóstico completo (performance, acessibilidade, SEO e o que foi corrigido)
está em [`AUDITORIA_FRONT_2026-09-18.md`](./AUDITORIA_FRONT_2026-09-18.md).
