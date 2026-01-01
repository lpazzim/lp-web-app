'use client';

import { useTranslations } from 'next-intl';
import BlurText from './BlurText';
import DotGrid from './DotGrid';
const slugs = [
  "typescript",
  "javascript",
  "react",
  "angular",
  "html5",
  "css3",
  "nextdotjs",
  "vercel",
  "testinglibrary",
  "jest",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "figma",
  "vite",
]

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

  const handleAnimationComplete = () => {
};

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )

  return (
    <section 
      aria-labelledby="intro-heading"
    >
      <div>
       <div className="w-full h-[calc(100vh-229px)] relative">
  <div className="absolute top-0 inset-0 z-0">
    <DotGrid
      dotSize={1}
      gap={15}
      baseColor="#087ea4"
      activeColor="#087ea4"
      proximity={120}
      shockRadius={250}
      shockStrength={5}
      resistance={750}
      returnDuration={1.5}
    />
  </div>

  <div className="relative z-1 flex flex-col items-center justify-center h-full my-auto">
    <BlurText
      text="Lucas Pazzim"
      delay={150}
      animateBy="words"
      direction="top"
      onAnimationComplete={handleAnimationComplete}
      className="text-4xl md:text-6xl font-semibold text-white"
    />
    {/* <IconCloud images={images} /> */}
  </div>

</div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">       
          <div className="flex-1">
            
          </div>
        </div>
      </div>
    </section>
  );
}
