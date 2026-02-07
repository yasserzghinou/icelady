import { redirect } from 'next/navigation';

export default function ServiceRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/fr/products/${params.slug}`);
}
