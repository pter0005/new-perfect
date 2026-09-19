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
  // Headers de segurança aqui (e não só no netlify.toml): o runtime do Next no
  // Netlify não aplica os [[headers]] do toml nas páginas renderizadas pelo Next,
  // só nos arquivos estáticos. Conferido no ar em 18/09/2026.
  async headers() {
    const security = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    // CSP só em produção: o HMR do Next em dev precisa de eval()
    if (process.env.NODE_ENV === 'production') {
      security.push({ key: 'Content-Security-Policy', value: CSP });
    }
    return [{ source: '/(.*)', headers: security }];
  },
};

export default nextConfig;
