import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { CTA } from '@/components/CTA';
import { getPageByPath } from '@/lib/content';
import { DEFAULT_LOCALE, isLocale, localizePath, t, type Locale } from '@/lib/i18n';
import { localizeGenericPage } from '@/lib/localizedContent';
import routeMap from '@/lib/routing/routeMap.json';
import { buildMetadata } from '@/lib/seo/meta';

function toPath(locale: Locale, slug: string[] | undefined): string {
  if (!slug || slug.length === 0) {
    return `/${locale}`;
  }

  return `/${locale}/${slug.join('/')}`;
}

function toPrimaryPath(path: string): string {
  return path.replace(/^\/(fr|ar)\//, '/en/').replace(/^\/(fr|ar)$/, '/en');
}

export function generateMetadata({ params }: { params: { locale: string; slug: string[] } }): Metadata {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;
  const urlPath = toPath(locale, params.slug);
  const route = routeMap.find((entry) => entry.path === urlPath);

  if (!route) {
    return buildMetadata({
      path: urlPath,
      title: t(locale, 'errors.pageNotFoundTitle'),
      description: t(locale, 'errors.pageNotFoundDescription')
    });
  }

  return buildMetadata({
    path: route.path,
    title: route.title,
    description: route.description
  });
}

export default function LocalizedGenericPage({ params }: { params: { locale: string; slug: string[] } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const urlPath = toPath(locale, params.slug);
  const route = routeMap.find((entry) => entry.path === urlPath);

  if (!route) {
    notFound();
  }

  const content = getPageByPath(toPrimaryPath(route.path));
  const localizedContent = content ? localizeGenericPage(content, locale) : undefined;

  if (!localizedContent) {
    return (
      <section className="section-shell pb-14 pt-14">
        <div className="section-card p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'generic.seoPreservedRoute')}</p>
          <h1 className="mt-3 font-heading text-4xl">{route.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text/75">{route.description}</p>
          <div className="mt-8">
            <CTA href={localizePath('/en/pages/contact', locale)} label={t(locale, 'generic.contactIceLady')} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="section-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'generic.preservedUrl')}</p>
        <h1 className="mt-3 font-heading text-5xl">{localizedContent.heading}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text/75">{localizedContent.intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {localizedContent.sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-stone/35 bg-white/65 p-5">
              <h2 className="font-heading text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text/75">{section.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <CTA href={localizePath(localizedContent.cta.href, locale)} label={localizedContent.cta.label} />
        </div>
      </div>
    </section>
  );
}
