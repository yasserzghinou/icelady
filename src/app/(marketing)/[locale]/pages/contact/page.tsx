import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { DEFAULT_LOCALE, isLocale, t, type Locale } from '@/lib/i18n';
import { getLocalizedSiteSettingsAsync } from '@/lib/localizedContent';
import { buildMetadata } from '@/lib/seo/meta';
import { toWhatsAppHref } from '@/lib/whatsapp';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;
  const settings = await getLocalizedSiteSettingsAsync(locale);

  return buildMetadata({
    path: `/${locale}/pages/contact`,
    title: settings.contactPage.title,
    description: settings.contactPage.intro
  });
}

export default async function LocalizedContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const settings = await getLocalizedSiteSettingsAsync(locale);
  const whatsappNumber = settings.contact.whatsapp || settings.contact.phone;
  const whatsappHref = toWhatsAppHref(whatsappNumber);

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="section-card p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'nav.contact')}</p>
          <h1 className="mt-3 font-heading text-5xl">{settings.contactPage.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-text/75">{settings.contactPage.intro}</p>
          <ul className="mt-7 space-y-3 text-sm text-text/80">
            <li>
              <span className="font-semibold">{t(locale, 'contact.phone')}:</span> {settings.contact.phone}
            </li>
            <li>
              <span className="font-semibold">{t(locale, 'contact.whatsapp')}:</span>{' '}
              {whatsappHref !== '#' ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring underline decoration-stone-400 underline-offset-4 hover:text-accent"
                >
                  {whatsappNumber}
                </a>
              ) : (
                whatsappNumber
              )}
            </li>
            <li>
              <span className="font-semibold">{t(locale, 'contact.email')}:</span> {settings.contact.email}
            </li>
            <li>
              <span className="font-semibold">{t(locale, 'contact.address')}:</span>{' '}
              {settings.contact.mapProfileUrl ? (
                <a
                  href={settings.contact.mapProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring underline decoration-stone-400 underline-offset-4 hover:text-accent"
                >
                  {settings.contact.address}
                </a>
              ) : (
                settings.contact.address
              )}
            </li>
          </ul>
          {settings.contact.mapProfileUrl ? (
            <a
              href={settings.contact.mapProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-4 inline-flex text-sm font-semibold text-accent hover:text-accentDark"
            >
              {t(locale, 'contact.openMaps')}
            </a>
          ) : null}
          <div className="mt-7 rounded-2xl border border-stone/35 bg-white/70 p-4 text-sm text-text/80">
            {settings.contactPage.paymentNote}
          </div>
        </div>

        <div className="section-card overflow-hidden">
          <div className="p-8 md:p-10">
            <h2 className="font-heading text-3xl">{t(locale, 'contact.openingHours')}</h2>
            <ul className="mt-5 space-y-2 text-sm text-text/80">
              {settings.contact.hours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </div>
          <iframe
            title={settings.mapTitle}
            src={settings.contact.mapEmbedUrl}
            className="h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
