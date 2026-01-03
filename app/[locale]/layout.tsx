import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import { locales } from '@/i18n';
import "../globals.css";
import { Header } from "@/components/Header";
import { FooterSocial } from "@/components/FooterSocial";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: "Lucas Pazzim | Frontend Developer",
    pt: "Lucas Pazzim | Desenvolvedor Frontend"
  };
  
  const descriptions = {
    en: "Frontend Developer with 6+ years experience in React, TypeScript, Next.js. Building fast, scalable, and accessible web applications.",
    pt: "Desenvolvedor Frontend com mais de 6 anos de experiência em React, TypeScript, Next.js. Criando aplicações web rápidas, escaláveis e acessíveis."
  };
  
  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  const ogImageUrl = '/images/og-image.svg';
  
  return {
    title,
    description,
    keywords: ['Frontend Developer', 'React', 'TypeScript', 'Next.js', 'Web Development', 'JavaScript'],
    authors: [{ name: 'Lucas Pazzim' }],
    creator: 'Lucas Pazzim',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      siteName: 'Lucas Pazzim Portfolio',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@lpazzim',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }
  
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-black font-sans">
            <Header />
            <main id="main-content" role="main">
                {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
