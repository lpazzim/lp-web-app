import { Header } from '@/components/Header';
import { IntroSection } from '@/components/IntroSection';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactForm } from '@/components/ContactForm';
import { FooterSocial } from '@/components/FooterSocial';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main id="main-content" role="main">
        <IntroSection />
        <ProjectsGrid />
        <ExperienceSection />
        <ContactForm />
      </main>
      <FooterSocial />
    </div>
  );
}
