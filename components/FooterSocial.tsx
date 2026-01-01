'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Instagram } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function FooterSocial() {
  const t = useTranslations('footer');
  
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 py-8 px-4 sm:px-6 lg:px-8 fixed bottom-0 w-full bg-black z-1" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Social links */}
          <div className="flex flex-col items-center space-y-3">
            <p className="text-sm text-zinc-400">{t('connect')}</p>
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

          {/* Copyright */}
          <div className="text-center text-sm text-zinc-500">
            <p>
              © {currentYear} Lucas Pazzim. {t('rights')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
