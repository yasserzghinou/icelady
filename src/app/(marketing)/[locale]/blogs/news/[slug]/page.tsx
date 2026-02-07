import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { SeoJsonLd } from '@/components/Seo';
import { DEFAULT_LOCALE, isLocale, localizePath, t, type Locale } from '@/lib/i18n';
import { getLocalizedBlogPosts } from '@/lib/localizedEntities';
import { buildMetadata } from '@/lib/seo/meta';
import { blogPostingSchema } from '@/lib/seo/schema';

export function generateStaticParams() {
  const locales = ['fr', 'en', 'ar'];
  const posts = getLocalizedBlogPosts('en');
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;
  const post = getLocalizedBlogPosts(locale).find((item) => item.slug === params.slug);

  if (!post) {
    return buildMetadata({
      path: `/${locale}/blogs/news/${params.slug}`,
      title: t(locale, 'errors.articleNotFoundTitle'),
      description: t(locale, 'errors.articleNotFoundDescription')
    });
  }

  return buildMetadata({
    path: localizePath(post.path, locale),
    title: post.title,
    description: post.description,
    image: post.image,
    type: 'article'
  });
}

export default function LocalizedBlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const post = getLocalizedBlogPosts(locale).find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="section-shell pb-14 pt-14">
      <SeoJsonLd
        schema={blogPostingSchema({
          title: post.title,
          description: post.description,
          path: localizePath(post.path, locale),
          datePublished: post.date
        })}
      />
      <div className="section-card overflow-hidden p-0">
        <div className="relative h-64 md:h-80">
          <Image
            src={post.image || '/images/hero-main.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text/55 to-transparent" />
        </div>
        <div className="p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.15em] text-accent">{post.date}</p>
          <h1 className="mt-3 font-heading text-5xl">{post.title}</h1>
          <p className="mt-5 text-base text-text/75">{post.description}</p>
          <div className="prose prose-stone mt-9 max-w-none prose-headings:font-heading prose-a:text-accent">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </div>
    </article>
  );
}
