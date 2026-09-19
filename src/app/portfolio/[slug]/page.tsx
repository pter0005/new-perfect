import { projects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailClient from './project-detail-client';

// Next 15: `params` chega como Promise e precisa de await
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    };
  }

  return {
    title: `${project.name} | Portfólio NEW`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Portfólio NEW`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1600,
          height: 800,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Portfólio NEW`,
      description: project.description,
      images: [project.image],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
