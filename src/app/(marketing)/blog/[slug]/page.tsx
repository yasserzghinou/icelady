import { redirect } from 'next/navigation';

export default function BlogPostRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/fr/blogs/news/${params.slug}`);
}
