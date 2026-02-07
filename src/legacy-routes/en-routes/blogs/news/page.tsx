import Link from 'next/link';

import { buildMetadata } from '@/lib/seo/meta';
import { getAllBlogPosts } from '@/lib/content';

export const metadata = buildMetadata({
  path: '/en/blogs/news',
  title: 'IceLady Journal',
  description: 'Insights on cryotherapy, body programs, and advanced beauty care from IceLady Marrakech.'
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Editorial</p>
        <h1 className="mt-3 font-heading text-5xl">The IceLady Journal</h1>
        <p className="mt-4 text-base text-text/75">
          Practical guidance and clinic perspectives on beauty, wellness, and cryotherapy-driven protocols.
        </p>
      </div>
      <div className="mt-10 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="section-card p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-accent">{post.date}</p>
            <h2 className="mt-2 font-heading text-3xl">{post.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-text/75">{post.description}</p>
            <Link href={post.path} className="focus-ring mt-4 inline-flex text-sm font-semibold text-accent hover:text-accentDark">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
