import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://agencianew.site',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // uma entrada por projeto do portfólio
    ...projects.map((project) => ({
      url: `https://agencianew.site/portfolio/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
