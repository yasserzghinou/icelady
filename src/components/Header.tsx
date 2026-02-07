'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CTA } from '@/components/CTA';
import { DEFAULT_LOCALE, localeLabel, Locale, localizePath, t } from '@/lib/i18n';

interface HeaderProps {
  locale?: Locale;
}

export function Header({ locale = DEFAULT_LOCALE }: HeaderProps) {
  const pathname = usePathname();
  const navItems = [
    { href: '/en', label: t(locale, 'nav.home') },
    { href: '/en/collections/all', label: t(locale, 'nav.services') },
    { href: '/en/blogs/news', label: t(locale, 'nav.journal') },
    { href: '/en/pages/contact', label: t(locale, 'nav.contact') }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone/35 bg-background/90 backdrop-blur">
      <div className="section-shell py-4">
        <div className="flex items-center justify-between">
          <Link href={localizePath('/en', locale)} className="focus-ring flex items-baseline gap-2">
            <span className="font-heading text-2xl tracking-wide text-text">Ice Lady</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-text/60">Marrakech</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className="focus-ring text-sm text-text/80 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="rounded-full border border-stone/45 bg-white/70 px-3 py-1 text-xs font-medium text-text/75">
              {(['fr', 'en', 'ar'] as const).map((lang) => (
                <Link
                  key={lang}
                  href={localizePath(pathname || '/en', lang)}
                  className={`mx-1 ${lang === locale ? 'text-accent' : 'hover:text-accent'}`}
                  hrefLang={lang}
                  locale={false}
                >
                  {localeLabel[lang]}
                </Link>
              ))}
            </div>
            <CTA href={localizePath('/en/pages/contact', locale)} label={t(locale, 'cta.book')} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 lg:hidden">
          <div className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={localizePath(item.href, locale)}
                className="focus-ring text-sm text-text/80 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="rounded-full border border-stone/45 bg-white/70 px-2 py-1 text-xs font-medium text-text/75">
            {(['fr', 'en', 'ar'] as const).map((lang) => (
              <Link
                key={`mobile-lang-${lang}`}
                href={localizePath(pathname || '/en', lang)}
                className={`mx-1 ${lang === locale ? 'text-accent' : 'hover:text-accent'}`}
                hrefLang={lang}
                locale={false}
              >
                {localeLabel[lang]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
