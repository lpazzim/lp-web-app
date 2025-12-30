'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Header() {
  const t = useTranslations('header');

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-zinc-900 focus:text-zinc-900 dark:focus:text-zinc-100 focus:rounded focus:ring-2 focus:ring-zinc-400"
      >
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            <Link 
              href="/" 
              className="text-xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded"
            >
              LP
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="#projects"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded px-2 py-1"
              >
                {t('projects')}
              </Link>
              <Link 
                href="#experience"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded px-2 py-1"
              >
                {t('experience')}
              </Link>
              <Link 
                href="#contact"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded px-2 py-1"
              >
                {t('contact')}
              </Link>
            </div>
          </nav>

          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
}
