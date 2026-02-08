import { permanentRedirect } from 'next/navigation';

export default function IndexRedirectPage() {
  permanentRedirect('/fr');
}
