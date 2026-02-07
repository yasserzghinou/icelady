import { buildMetadata } from '@/lib/seo/meta';
import { getServices } from '@/lib/content';
import { ServiceCard } from '@/components/ServiceCard';

export const metadata = buildMetadata({
  path: '/en/collections/all',
  title: 'Service Catalogue',
  description: 'Explore IceLady Marrakech treatments including cryotherapy, skin renewal, and beauty rituals.'
});

export default function ServicesIndexPage() {
  const services = getServices();

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Service Catalogue</p>
        <h1 className="mt-3 font-heading text-5xl">Treatment Menu</h1>
        <p className="mt-4 text-base text-text/75">
          Select a service to view treatment benefits, protocol details, and consultation guidance.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            href={service.path}
            name={service.name}
            category={service.category}
            summary={service.summary}
            image={service.heroImage}
          />
        ))}
      </div>
    </section>
  );
}
