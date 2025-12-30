export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
}

// Placeholder projects - to be replaced with real data
export const projects: ProjectCard[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product catalog, cart, and checkout functionality.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    githubUrl: 'https://github.com/lpazzim/project-1',
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    stack: ['React', 'Redux', 'TypeScript', 'Firebase', 'Material-UI'],
    githubUrl: 'https://github.com/lpazzim/project-2',
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'An interactive weather dashboard with forecasts, maps, and location-based alerts.',
    stack: ['Next.js', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/lpazzim/project-3',
  },
  {
    id: 'project-4',
    title: 'Portfolio CMS',
    description: 'A headless CMS for managing portfolio content with drag-and-drop interface.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Styled Components'],
    githubUrl: 'https://github.com/lpazzim/project-4',
  },
  {
    id: 'project-5',
    title: 'Analytics Platform',
    description: 'Real-time analytics platform with custom dashboards and data visualization.',
    stack: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Redis'],
    githubUrl: 'https://github.com/lpazzim/project-5',
  },
  {
    id: 'project-6',
    title: 'Design System',
    description: 'A comprehensive design system with reusable components and documentation.',
    stack: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS', 'Radix UI'],
    githubUrl: 'https://github.com/lpazzim/project-6',
  },
];
