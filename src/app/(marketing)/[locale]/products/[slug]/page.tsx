import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { CTA } from '@/components/CTA';
import { DEFAULT_LOCALE, isLocale, localizePath, t, type Locale } from '@/lib/i18n';
import { getCryotherapyPageCopy } from '@/lib/localizedCryotherapyPage';
import { getLocalizedServicesAsync } from '@/lib/localizedEntities';
import { buildMetadata } from '@/lib/seo/meta';

export async function generateStaticParams() {
  const locales = ['fr', 'en', 'ar'];
  const services = await getLocalizedServicesAsync('en');
  return locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;
  if (params.slug === 'therapiefroid') {
    const copy = getCryotherapyPageCopy(locale);
    return buildMetadata({
      path: `/${locale}/pages/cryotherapie`,
      title: copy.metaTitle,
      description: copy.metaDescription
    });
  }

  const service = (await getLocalizedServicesAsync(locale)).find((item) => item.slug === params.slug);

  if (!service) {
    return buildMetadata({
      path: `/${locale}/products/${params.slug}`,
      title: t(locale, 'errors.serviceNotFoundTitle'),
      description: t(locale, 'errors.serviceNotFoundDescription')
    });
  }

  return buildMetadata({
    path: localizePath(service.path, locale),
    title: service.seo.title || service.name,
    description: service.summary
  });
}

export default async function LocalizedServiceDetailPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  if (params.slug === 'therapiefroid') {
    redirect(localizePath('/en/pages/cryotherapie', locale));
  }

  const service = (await getLocalizedServicesAsync(locale)).find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  const gallery = service.galleryImages?.length ? service.galleryImages : [service.heroImage];

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="section-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{service.category}</p>
        <h1 className="mt-3 font-heading text-5xl">{service.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text/75">{service.summary}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {gallery.slice(0, 3).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`relative overflow-hidden rounded-2xl border border-stone/35 bg-stone/20 ${
                index === 0 ? 'h-72 md:col-span-2 md:h-full md:min-h-[24rem]' : 'h-40 md:h-56'
              }`}
            >
              <Image
                src={image}
                alt={`${service.name} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <ul className="space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="rounded-xl border border-stone/35 bg-white/65 px-4 py-3 text-sm text-text/80">
                {benefit}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-stone/35 bg-white/70 p-5 text-sm text-text/80">
            <p>
              <span className="font-semibold">{t(locale, 'services.duration')}:</span> {service.duration}
            </p>
            <p className="mt-2">
              <span className="font-semibold">{t(locale, 'services.pricing')}:</span> {service.priceNote}
            </p>
          </div>
        </div>

        <div className="mt-9">
          <CTA href={localizePath('/en/pages/contact', locale)} label={t(locale, 'services.bookConsultation')} />
        </div>
      </div>
    </section>
  );
}
