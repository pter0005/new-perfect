import type { MetadataRoute } from 'next';

// /apresentacao é material comercial interno — fora do índice
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/apresentacao',
    },
    sitemap: 'https://agencianew.site/sitemap.xml',
  };
}
