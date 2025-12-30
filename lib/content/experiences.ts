export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  techStack?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: '10.123 Ventures, Inc',
    role: 'Senior Frontend Software Engineer',
    period: 'Nov 2023 – Present',
    location: 'São Paulo, Brazil',
    highlights: [
      'Led the creation and maintenance of dynamic, user-friendly interfaces',
      'Focused on frontend performance optimization and best practices',
      'Ensured consistent UI/UX standards with scalable and maintainable code',
      'Collaborated closely with design and backend teams',
      'Built reusable UI components using Styled Components',
      'Acted as a frontend reference for cross-functional communication',
    ],
    techStack: ['React', 'TypeScript', 'Styled Components', 'Prettier'],
  },
  {
    company: 'Jestor',
    role: 'Senior Frontend Software Engineer',
    period: 'Jun 2022 – Aug 2023',
    location: 'São Paulo, Brazil',
    highlights: [
      'Developed and maintained complex frontend components for a no-code platform',
      'Improved application performance and developer experience',
      'Integrated frontend workflows with DevOps using Docker',
      'Used Vite for fast development and HMR',
      'Managed dependencies using pnpm',
    ],
    techStack: ['React', 'Docker', 'Vite', 'Prettier', 'pnpm'],
  },
  {
    company: 'Zends Soluções Tecnológicas',
    role: 'Senior Frontend Software Engineer',
    period: 'Jun 2021 – Jun 2022',
    location: 'São Paulo, Brazil',
    highlights: [
      'Built React-based applications from business requirements',
      'Analyzed system and functional requirements',
      'Developed accessible, standards-compliant interfaces',
      'Designed and maintained CSS templates and layouts',
    ],
    techStack: ['JavaScript', 'TypeScript', 'LESS', 'SASS', 'SCSS', 'Bootstrap', 'React', 'GitLab'],
  },
  {
    company: 'Embracon Administradora de Consórcio',
    role: 'Senior Frontend Software Engineer',
    period: 'Jan 2021 – Jun 2021',
    location: 'Santana de Parnaíba, SP, Brazil',
    highlights: [
      'Developed React applications from requirements to deployment',
      'Worked on UI consistency and accessibility',
      'Maintained and extended frontend codebases',
    ],
    techStack: ['JavaScript', 'TypeScript', 'LESS', 'SASS', 'SCSS', 'Bootstrap', 'React', 'GitLab'],
  },
  {
    company: 'Webmotors',
    role: 'Senior Frontend Software Engineer',
    period: 'Aug 2019 – Jan 2021',
    location: 'São Paulo, Brazil',
    highlights: [
      'Worked on financial team frontend applications',
      'Focused on performance, usability, and SEO optimization',
      'Ensured high Google search ranking through best practices',
      'Used ESLint and Google Analytics to maintain quality',
    ],
    techStack: ['React', 'Next.js', 'Redux', 'TypeScript', 'JavaScript', 'SCSS', 'HTML', 'Bitbucket'],
  },
  {
    company: 'UnitedHealth Group',
    role: 'Frontend Software Engineer',
    period: 'Nov 2017 – Aug 2019',
    location: 'São Paulo, Brazil',
    highlights: [
      'Developed reusable and reliable frontend components',
      'Contributed to a healthcare product used by hundreds of doctors',
      'Participated in early-stage product development',
    ],
    techStack: ['React', 'Redux', 'TypeScript', 'JavaScript', 'SCSS', 'HTML', 'GitHub'],
  },
];
