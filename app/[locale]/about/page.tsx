import { useTranslations } from "next-intl";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function AboutPage(){
    const t = useTranslations('intro');

     const socialLinks: SocialLink[] = [
       {
      label: 'Email',
      href: 'lpazzim@gmail.com',
      icon: <Mail className="w-5 h-5" aria-hidden="true" />,
    },
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



const displayHref = (href: string) => {
  const value = href.replace(/^mailto:/, "").trim();
  if (value.includes("@") && !value.startsWith("http")) return value.toLowerCase();
  try {
    const url = new URL(value);
    return (url.pathname && url.pathname !== "/" ? url.pathname : url.host).replace(/\/$/, "");
  } catch {
    return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const toAnchorHref = (href: string) => {
  const value = href.trim();
  if (value.includes("@") && !value.startsWith("http") && !value.startsWith("mailto:")) {
    return `mailto:${value}`;
  }
  return value;
};



    return(
        <section aria-labelledby="about-heading">
          <div className="px-16 w-full flex md:h-[calc(100vh-100px)] flex-col-reverse md:flex-row justify-between">           
            <div className="container flex flex-col place-content-between w-full h-full mx-auto">
                <h1 id="about-heading" className="text-white text-6xl md:text-8xl font-bold pb-8 md:pb-0">About</h1>
                <div className="container space-y-6">
                  <p className="text-white text-xl ">
                    {t('bio1')}
                  </p>
                  <p className="text-white text-xl ">
                    {t('bio2')}
                  </p>
                  <p className="text-white text-xl ">
                    {t('bio3')}
                  </p>
                </div>
            </div>
            <div className="container flex items-end flex-col w-full h-full mx-auto">
              
              <div className="relative w-full max-w-105 overflow-hidden rounded-sm aspect-2/3 sm:aspect-4/5">
                <Image
                  src="/images/lucas-pazzim-about.jpeg"
                  alt="About Banner"
                  fill
                  priority
                  className="object-cover grayscale"
                  sizes="(max-width: 640px) 100vw, 420px"
                />

                <div
                  className="
                    absolute bottom-0 left-0 right-0
                    h-[45%] sm:h-[40%]
                    bg-linear-to-t
                    from-[#087ea4]/90
                    via-[#087ea4]/60
                    to-transparent
                  "
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    LUCAS<br />PAZZIM
                  </h2>

                  <p className="mt-1 text-xs sm:text-sm opacity-90">
                    35 years, Brazil
                  </p>
                </div>
              </div>
              
              {/* <Image
                className="rounded-sm"
                src="/images/lucas-pazzim-about.jpeg"
                alt="About Banner"
                width={400}
                height={600}
                priority
              /> */}
                <div className="w-full flex md:justify-end">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 md:max-w-100 pt-6 pb-12 ">
                    {socialLinks.map((item) => (
                      <a
                        key={item.label}
                        href={toAnchorHref(item.href)}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group relative block"
                      >
                        <div className="relative flex items-start gap-3">
                          <div className="mt-0.5 text-white/90">{item.icon}</div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-semibold text-white">{item.label}</span>
                              <span className="text-white/70 transition-transform group-hover:translate-x-0.5">↗</span>
                            </div>

                            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/50 truncate">
                              {displayHref(item.href)}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
            </div>  
          </div>
        </section>
    )
}