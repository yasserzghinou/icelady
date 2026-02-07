import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { DEFAULT_LOCALE, isLocale, localizePath, t, type Locale } from '@/lib/i18n';
import { getLocalizedBlogPosts } from '@/lib/localizedEntities';
import { buildMetadata } from '@/lib/seo/meta';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;

  return buildMetadata({
    path: `/${locale}/blogs/news`,
    title: t(locale, 'journal.title'),
    description: t(locale, 'journal.subtitle')
  });
}

export default function LocalizedBlogIndexPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const posts = getLocalizedBlogPosts(locale);

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'nav.journal')}</p>
        <h1 className="mt-3 font-heading text-5xl">{t(locale, 'journal.title')}</h1>
        <p className="mt-4 text-base text-text/75">{t(locale, 'journal.subtitle')}</p>
      </div>
      <div className="mt-10 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="section-card overflow-hidden p-0">
            <div className="grid md:grid-cols-[280px_1fr]">
              <div className="relative h-48 md:h-full">
                <Image
                  src={post.image || '/images/hero-main.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-accent">{post.date}</p>
                <h2 className="mt-2 font-heading text-3xl">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text/75">{post.description}</p>
                <Link
                  href={localizePath(post.path, locale)}
                  className="focus-ring mt-4 inline-flex text-sm font-semibold text-accent hover:text-accentDark"
                >
                  {t(locale, 'journal.readArticle')}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
