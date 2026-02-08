import { permanentRedirect } from 'next/navigation';

export default function AboutRedirectPage() {
  permanentRedirect('/fr/pages/about');
}
