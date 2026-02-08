'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CTA } from '@/components/CTA';
import { DEFAULT_LOCALE, localeLabel, Locale, localizePath, t } from '@/lib/i18n';
import { toWhatsAppHref } from '@/lib/whatsapp';

interface HeaderProps {
  locale?: Locale;
  whatsappNumber?: string;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 3.4 16.6L2 22l5.5-1.4A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.8-3.1-.2-.3A9 9 0 1 1 12 20.5Zm4.9-6.7c-.3-.2-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.1 8.1 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5s0-.4 0-.5c-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4s-.9.9-.9 2.1.9 2.4 1 2.5c.1.2 1.8 2.8 4.3 3.9.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2 0-.2-.2-.2-.5-.4Z" />
    </svg>
  );
}

export function Header({ locale = DEFAULT_LOCALE, whatsappNumber = '' }: HeaderProps) {
  const pathname = usePathname();
  const rawBookingHref = toWhatsAppHref(whatsappNumber);
  const bookingHref =
    rawBookingHref === '#' ? localizePath('/en/pages/contact', locale) : rawBookingHref;
  const bookingNewTab = bookingHref.startsWith('http');
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
            <CTA
              href={bookingHref}
              label={
                <span className="inline-flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>{t(locale, 'cta.book')}</span>
                </span>
              }
              newTab={bookingNewTab}
            />
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
          <CTA
            href={bookingHref}
            label={
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4" />
                <span>{t(locale, 'cta.book')}</span>
              </span>
            }
            className="px-4 py-2 text-xs"
            newTab={bookingNewTab}
          />
        </div>
      </div>
    </header>
  );
}
