'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current locale from pathname
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (locales.includes(segments[0] as Locale) 
    ? segments[0] 
    : 'en') as Locale;

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Update cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    
    // Update localStorage
    try {
      localStorage.setItem('locale', newLocale);
    } catch (error) {
      console.warn('localStorage not available:', error);
    }

    // Navigate to new locale
    const segments = pathname.split('/').filter(Boolean);
    // Remove current locale from segments if present
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    
    const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
    router.push(newPath);
    router.refresh();
  };

  return (
    <div 
      role="group" 
      aria-label="Language selector"
      className="flex items-center gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 p-1"
    >
      <Globe className="w-4 h-4 text-zinc-600 dark:text-zinc-400 ml-1" aria-hidden="true" />
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          aria-pressed={currentLocale === locale}
          className={`
            px-3 py-1.5 text-sm font-medium rounded transition-colors
            focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-offset-black
            ${
              currentLocale === locale
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }
          `}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
