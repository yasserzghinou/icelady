import Link from 'next/link';

import { getSiteSettings } from '@/lib/content';
import { DEFAULT_LOCALE, Locale, localizePath, t } from '@/lib/i18n';
import translations from '@/content/translations.json';

const footerLinks = [
  { href: '/en', key: 'nav.home' as const },
  { href: '/en/collections/all', key: 'nav.services' as const },
  { href: '/en/blogs/news', key: 'nav.journal' as const },
  { href: '/en/pages/contact', key: 'nav.contact' as const }
];

interface FooterProps {
  locale?: Locale;
}

export function Footer({ locale = DEFAULT_LOCALE }: FooterProps) {
  const siteSettings = getSiteSettings();
  const localizedDescription = translations[locale]?.brandTagline || siteSettings.description;

  return (
    <footer className="mt-20 border-t border-stone/35 bg-white/50">
      <div className="section-shell grid gap-10 py-10 md:grid-cols-3">
        <div>
          <h2 className="font-heading text-2xl">{siteSettings.siteName}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text/70">{localizedDescription}</p>
        </div>
        <div>
          <h3 className="font-heading text-xl">{t(locale, 'footer.navigate')}</h3>
          <ul className="mt-3 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={localizePath(link.href, locale)}
                  className="focus-ring text-sm text-text/75 hover:text-accent"
                >
                  {t(locale, link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-xl">{t(locale, 'footer.contact')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-text/75">
            <li>{siteSettings.contact.address}</li>
            <li>{siteSettings.contact.phone}</li>
            <li>{siteSettings.contact.email}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
