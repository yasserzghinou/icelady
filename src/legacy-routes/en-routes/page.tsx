import { buildMetadata } from '@/lib/seo/meta';
import { getServices, getSiteSettings } from '@/lib/content';
import { CryotherapySection } from '@/components/sections/CryotherapySection';
import { FaqLocationSection } from '@/components/sections/FaqLocationSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServiceHighlightsSection } from '@/components/sections/ServiceHighlightsSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';

export const metadata = buildMetadata({
  path: '/en',
  title: 'Cryotherapy & Microblading in Marrakech',
  description:
    'Discover IceLady Marrakech, a premium clinic for cryotherapy, skin, and beauty protocols with consultation-led care.',
  type: 'website'
});

export default function HomePage() {
  const settings = getSiteSettings();
  const services = getServices();

  return (
    <>
      <HeroSection hero={settings.hero} />
      <ServiceHighlightsSection services={services} />
      <CryotherapySection cryotherapy={settings.cryotherapy} />
      <SocialProofSection testimonials={settings.testimonials} />
      <FaqLocationSection faq={settings.faq} contact={settings.contact} />
    </>
  );
}
