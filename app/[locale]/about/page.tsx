import { useTranslations } from "next-intl";
import Image from "next/image";
import { Github, Linkedin, Instagram } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function AboutPage(){
    const t = useTranslations('intro');

     const socialLinks: SocialLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/lpazzim/',
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/lpazzim',
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/lucaspazzim/',
      icon: <Instagram className="w-5 h-5" aria-hidden="true" />,
    },
  ];
    return(
        <section aria-labelledby="about-heading">
            <div className="container flex w-full mx-auto">
              <Image
                src="/images/lucas-pazzim-about.jpeg"
                alt="About Banner"
                width={300}
                height={200}
                priority
              />
              <div>
                <h1 id="about-heading" className="text-white">Bio</h1>
                <p className="text-white">
                  {t('bio')}
                </p>
              </div>
            </div>
            <div className="container flex w-full mx-auto">
               <nav aria-label="Social media links">
              <ul className="flex items-center space-x-6">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                      aria-label={`Visit Lucas Pazzim on ${link.label}`}
                    >
                      {link.icon}
                      <span className="sr-only sm:not-sr-only sm:inline">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            </div>
        </section>
    )
}