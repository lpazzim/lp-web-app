'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
}

export function ProjectsGrid() {
  const t = useTranslations('projects');
  const projects = t.raw('items') as ProjectCard[];

  return (
    <section 
      className="py-16 md:py-24 bg-zinc-950/50" 
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          id="projects-heading"
          className="text-3xl md:text-4xl font-bold text-zinc-50 mb-12 text-center"
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCardItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardItem({ project }: { project: ProjectCard }) {
  const t = useTranslations('projects');

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:shadow-lg hover:shadow-zinc-900/50 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-zinc-50 text-xl">
          {project.title}
        </CardTitle>
        <CardDescription className="text-zinc-400 mt-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        {/* Tech Stack */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            {t('stack')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mt-auto"
            aria-label={`${t('viewGitHub')} - ${project.title}`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{t('viewGitHub')}</span>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
