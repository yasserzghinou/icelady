import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo/meta';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;

  return buildMetadata({
    path: `/${locale}/pages/about`,
    title: 'About Ice Lady Marrakech',
    description: 'Learn about Ice Lady Marrakech, our clinical ethos, and our premium treatment methodology.'
  });
}

export default function LocalizedAboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="section-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">About</p>
        <h1 className="mt-3 font-heading text-5xl">Clinical Discipline, Luxury Care</h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-text/75">
          Ice Lady Marrakech combines advanced treatment expertise with a calm, premium client experience.
          Every protocol begins with consultation and remains personalized from first session to follow-up.
        </p>
      </div>
    </section>
  );
}
