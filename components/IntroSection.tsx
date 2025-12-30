'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const coreSkills = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Frontend Architecture',
  'Performance Optimization',
  'UI/UX',
  'Styled Components',
  'SCSS',
  'Git',
  'Docker',
  'Vite',
];

export function IntroSection() {
  const t = useTranslations('intro');

  return (
    <section 
      className="py-16 md:py-24" 
      aria-labelledby="intro-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
              <Image
                src="/images/avatar-placeholder.svg"
                alt="Lucas Pazzim"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 
              id="intro-heading"
              className="text-4xl md:text-5xl font-bold text-zinc-50 mb-2"
            >
              Lucas Pazzim
            </h1>
            <h2 className="text-xl md:text-2xl text-zinc-300 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              {t('bio')}
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                {t('skills')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700 hover:border-zinc-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
