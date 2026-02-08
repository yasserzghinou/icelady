import { permanentRedirect } from 'next/navigation';

export default function ServiceRedirectPage({ params }: { params: { slug: string } }) {
  permanentRedirect(`/fr/products/${params.slug}`);
}
