"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

import { HyperText } from "./ui/hyper-text"
import { cn } from "@/lib/utils"

type NavItem = {
  key: "home" | "about" | "blog"
  href: string
}

const NAV: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
]

function stripLocale(pathname: string, locale: string) {
  // remove "/pt" ou "/en" do começo
  const prefix = `/${locale}`
  if (pathname === prefix) return "/"
  if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length)
  return pathname
}

function isActivePath(current: string, href: string) {
  if (href === "/") return current === "/"
  return current === href || current.startsWith(href + "/")
}

export function Header() {
  const t = useTranslations("header")
  const pathname = usePathname()
  const locale = useLocale()

  const normalizedPath = stripLocale(pathname, locale)

  return (
    <header className="sticky top-0 z-10 w-full dark:border-zinc-800 bg-transparent dark:bg-transparent backdrop-blur supports-backdrop-filter:bg-transparent dark:supports-backdrop-filter:bg-black/60">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6 w-full" aria-label="Main navigation">
          <div className="md:flex items-center gap-4 h-full w-full justify-between md:justify-start">
            {NAV.map((item) => {
              const active = isActivePath(normalizedPath, item.href)

              return (
               <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center px-1",
                    active && "text-white  text-shadow-md text-shadow-[#087ea4]"
                  )}
                >
                  {active && (
                    <>
                      <span className="pointer-events-none absolute left-0 top-0 h-1 w-1 border-l-2 border-t-2  border-[#087ea4]" />
                      <span className="pointer-events-none absolute right-0 top-0 h-1 w-1 border-r-2 border-t-2 border-[#087ea4]" />
                      <span className="pointer-events-none absolute left-0 bottom-0 h-1 w-1 border-l-2 border-b-2 border-[#087ea4]" />
                      <span className="pointer-events-none absolute right-0 bottom-0 h-1 w-1 border-r-2 border-b-2 border-[#087ea4]" />
                    </>
                  )}

                  <HyperText
                    animateOnHover={!active}
                    className={cn(
                      "relative block leading-none text-sm font-medium text-white transition-colors py-0 px-1",
                      "hover:text-white/80 "
                    )}
                  >
                    {item.key}
                  </HyperText>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
