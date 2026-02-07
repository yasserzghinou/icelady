import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { SeoJsonLd } from '@/components/Seo';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo/meta';
import { blogPostingSchema } from '@/lib/seo/schema';

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({
      path: `/en/blogs/news/${params.slug}`,
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    });
  }

  return buildMetadata({
    path: post.path,
    title: post.title,
    description: post.description,
    type: 'article'
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="section-shell pb-14 pt-14">
      <SeoJsonLd
        schema={blogPostingSchema({
          title: post.title,
          description: post.description,
          path: post.path,
          datePublished: post.date
        })}
      />
      <div className="section-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.15em] text-accent">{post.date}</p>
        <h1 className="mt-3 font-heading text-5xl">{post.title}</h1>
        <p className="mt-5 text-base text-text/75">{post.description}</p>
        <div className="prose prose-stone mt-9 max-w-none prose-headings:font-heading prose-a:text-accent">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
