import { permanentRedirect } from 'next/navigation';

export default function BlogRedirectPage() {
  permanentRedirect('/fr/blogs/news');
}
