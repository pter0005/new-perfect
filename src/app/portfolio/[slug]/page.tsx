// src/app/portfolio/[slug]/page.tsx
import { projects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

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

  return (
    <div className="min-h-screen bg-background galaxy-background">
      <header className="sticky top-0 z-50 glassmorphism">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                  <Link href="/#portfolio" className="flex items-center group text-primary hover:text-primary/80 transition-colors">
                      <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                      Voltar ao Portfólio
                  </Link>
                  <div className="flex items-center text-primary drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.5)] font-bold text-xl">
                      <span>N</span>
                      <div className="flex flex-col items-center justify-center mx-1 space-y-1.5 h-[1em]">
                          <div className="w-[0.4em] h-[0.25em] bg-primary rounded-full"></div>
                          <div className="w-[0.4em] h-[0.25em] bg-primary rounded-full"></div>
                          <div className="w-[0.4em] h-[0.25em] bg-primary rounded-full"></div>
                      </div>
                      <span>W</span>
                  </div>
              </div>
          </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.5)]">{project.name}</h1>
            <p className="mt-2 text-lg sm:text-xl text-foreground/80">{project.type}</p>
          </div>

          <div className="mb-12 rounded-lg overflow-hidden border border-primary/30 shadow-[0_0_25px_hsl(var(--primary)_/_0.3)]">
            <Image
              src={project.image}
              alt={`Imagem do projeto ${project.name}`}
              width={1920}
              height={1200}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-8">
              {project.details.map((detail, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-primary pl-4">{detail.title}</h2>
                  <ul className="list-disc list-inside space-y-2 text-base text-foreground/80">
                    {detail.points.map((point, pIndex) => (
                      <li key={pIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <aside className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="border-primary/50 text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="sticky top-24 space-y-4">
                 <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 hover:drop-shadow-[0_0_10px_hsl(var(--primary))]">
                    <Link href="/#contact">
                        Quero um site assim
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    Visitar o Site
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
       <footer className="py-12 bg-black/30 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-foreground/70">
            <div className="flex items-center justify-center text-sm">
              <span>© 2025</span>
              <div className="flex items-center text-primary drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.5)] font-bold text-base mx-2">
                <span>N</span>
                <div className="flex flex-col items-center justify-center mx-1 space-y-1 h-[1em]">
                  <div className="w-[0.4em] h-[0.2em] bg-primary rounded-full"></div>
                  <div className="w-[0.4em] h-[0.2em] bg-primary rounded-full"></div>
                  <div className="w-[0.4em] h-[0.2em] bg-primary rounded-full"></div>
                </div>
                <span>W</span>
              </div>
              <span>– Construindo o futuro digital.</span>
            </div>
          </div>
        </footer>
    </div>
  );
}
