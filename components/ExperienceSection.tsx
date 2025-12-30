'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  techStack?: string[];
}

export function ExperienceSection() {
  const t = useTranslations('experience');
  const experiences = t.raw('items') as ExperienceItem[];

  return (
    <section 
      className="py-16 md:py-24" 
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          id="experience-heading"
          className="text-3xl md:text-4xl font-bold text-zinc-50 mb-12 text-center"
        >
          {t('title')}
        </h2>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceItem 
              key={`${experience.company}-${index}`} 
              experience={experience} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ experience }: { experience: ExperienceItem }) {
  const t = useTranslations('experience');

  return (
    <article className="relative pl-8 border-l-2 border-zinc-800 hover:border-zinc-700 transition-colors">
      {/* Timeline dot */}
      <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-zinc-700 border-2 border-zinc-900" />

      <div className="pb-2">
        {/* Company & Role */}
        <h3 className="text-xl md:text-2xl font-bold text-zinc-50 mb-1">
          {experience.role}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-zinc-400 mb-3">
          <span className="font-medium text-zinc-300">{experience.company}</span>
          {experience.location && (
            <>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="text-sm">{experience.location}</span>
            </>
          )}
        </div>
        
        {/* Period */}
        <p className="text-sm text-zinc-500 mb-4">
          {experience.period}
        </p>

        {/* Highlights */}
        {experience.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              {t('responsibilities')}
            </h4>
            <ul className="space-y-2" role="list">
              {experience.highlights.map((highlight, idx) => (
                <li 
                  key={idx}
                  className="text-zinc-400 text-sm leading-relaxed flex items-start gap-2"
                >
                  <span className="text-zinc-600 mt-1.5 shrink-0">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {experience.techStack && experience.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <Badge 
                key={tech}
                variant="outline"
                className="text-xs bg-zinc-900 text-zinc-400 border-zinc-800"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
