import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { CryotherapySection } from '@/components/sections/CryotherapySection';
import { FaqLocationSection } from '@/components/sections/FaqLocationSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServiceHighlightsSection } from '@/components/sections/ServiceHighlightsSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { DEFAULT_LOCALE, isLocale, localizePath, type Locale } from '@/lib/i18n';
import { getLocalizedSiteSettingsAsync } from '@/lib/localizedContent';
import { getLocalizedServicesAsync } from '@/lib/localizedEntities';
import { buildMetadata } from '@/lib/seo/meta';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;
  const settings = await getLocalizedSiteSettingsAsync(locale);

  return buildMetadata({
    path: `/${locale}`,
    title: settings.hero.title,
    description: settings.description,
    type: 'website'
  });
}

export default async function LocalizedHomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const settings = await getLocalizedSiteSettingsAsync(locale);
  const localizedSettings = {
    ...settings,
    hero: {
      ...settings.hero,
      primaryCta: {
        ...settings.hero.primaryCta,
        href: localizePath(settings.hero.primaryCta.href, locale)
      },
      secondaryCta: {
        ...settings.hero.secondaryCta,
        href: localizePath(settings.hero.secondaryCta.href, locale)
      }
    }
  };
  const services = (await getLocalizedServicesAsync(locale)).map((service) => ({
    ...service,
    path: localizePath(service.path, locale)
  }));

  return (
    <>
      <HeroSection hero={localizedSettings.hero} locale={locale} />
      <ServiceHighlightsSection services={services} locale={locale} />
      <CryotherapySection cryotherapy={localizedSettings.cryotherapy} locale={locale} />
      <SocialProofSection testimonials={localizedSettings.testimonials} locale={locale} />
      <FaqLocationSection faq={localizedSettings.faq} contact={localizedSettings.contact} locale={locale} />
    </>
  );
}
