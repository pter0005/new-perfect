import { projects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailClient from './project-detail-client';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    };
  }

  return {
    title: `${project.name} | Portfólio NEW`,
    description: project.description,
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
