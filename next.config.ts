import type {NextConfig} from 'next';

// Content-Security-Policy — só em produção.
// Em dev não aplica: o HMR do Next precisa de eval().
//
// Por que cada origem externa está aqui:
//   formsubmit.co                → formulário de contato (o POST sai direto pra lá)
//   static.cloudflareinsights.com→ script do Web Analytics do Cloudflare
//   cloudflareinsights.com       → beacon que esse script envia
//   'unsafe-inline'              → scripts inline do próprio Next (bootstrap/flight)
//                                  e os estilos inline que o framer-motion injeta
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://formsubmit.co https://cloudflareinsights.com https://static.cloudflareinsights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formsubmit.co",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Todas as imagens são locais (public/) desde 21/07 — sem hosts remotos.
  async headers() {
    if (process.env.NODE_ENV !== 'production') return [];
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Content-Security-Policy', value: CSP }],
      },
    ];
  },
};

export default nextConfig;
