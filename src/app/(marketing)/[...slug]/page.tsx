import { redirect } from 'next/navigation';

export default function LegacyFallbackRedirect({ params }: { params: { slug: string[] } }) {
  const path = params.slug?.length ? `/${params.slug.join('/')}` : '';
  redirect(`/fr${path}`);
}
