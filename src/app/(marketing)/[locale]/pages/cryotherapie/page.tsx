import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { SeoJsonLd } from '@/components/Seo';
import { ServiceLandingTemplate } from '@/components/landing/ServiceLandingTemplate';
import { DEFAULT_LOCALE, isLocale, localizePath, type Locale } from '@/lib/i18n';
import { getCryotherapyPageCopy } from '@/lib/localizedCryotherapyPage';
import { getLocalizedSiteSettings } from '@/lib/localizedContent';
import { buildMetadata } from '@/lib/seo/meta';
import { faqPageSchema, localBusinessSchema } from '@/lib/seo/schema';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;
  const copy = getCryotherapyPageCopy(locale);

  return buildMetadata({
    path: `/${locale}/pages/cryotherapie`,
    title: copy.metaTitle,
    description: copy.metaDescription,
    image: '/images/cryotherapy-feature.png',
    type: 'website'
  });
}

export default function CryotherapyLandingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = getCryotherapyPageCopy(locale);
  const settings = getLocalizedSiteSettings(locale);
  const contactPath = localizePath('/en/pages/contact', locale);
  const servicesPath = localizePath('/en/collections/all', locale);

  return (
    <>
      <SeoJsonLd
        schema={localBusinessSchema({
          siteName: String(settings.siteName),
          description: copy.metaDescription,
          contact: {
            phone: settings.contact.phone,
            email: settings.contact.email,
            address: settings.contact.address
          },
          urlPath: `/${locale}/pages/cryotherapie`,
          mapProfileUrl: settings.contact.mapProfileUrl
        })}
      />
      <SeoJsonLd schema={faqPageSchema(copy.faqVisit.faqs)} />

      <ServiceLandingTemplate
        content={{
          ...copy,
          catalogue: {
            ...copy.catalogue,
            cards: copy.catalogue.cards.map((card) => ({
              ...card,
              href: localizePath(card.href, locale)
            }))
          }
        }}
        paths={{
          contact: contactPath,
          services: servicesPath
        }}
        contact={{
          phone: settings.contact.phone,
          whatsapp: settings.contact.whatsapp,
          email: settings.contact.email,
          address: settings.contact.address,
          mapEmbedUrl: settings.contact.mapEmbedUrl,
          mapProfileUrl: settings.contact.mapProfileUrl,
          hours: settings.contact.hours
        }}
        heroImage="/images/services/slimming.jpg"
      />
    </>
  );
}
