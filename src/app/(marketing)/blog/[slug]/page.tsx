import { permanentRedirect } from 'next/navigation';

export default function BlogPostRedirectPage({ params }: { params: { slug: string } }) {
  permanentRedirect(`/fr/blogs/news/${params.slug}`);
}
