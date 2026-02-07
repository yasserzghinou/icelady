import { DEFAULT_LOCALE, Locale, t } from '@/lib/i18n';
import { ServiceCard } from '@/components/ServiceCard';

interface ServiceItem {
  slug: string;
  path: string;
  name: string;
  category: string;
  summary: string;
  heroImage?: string;
}

interface ServiceHighlightsSectionProps {
  services: ServiceItem[];
  locale?: Locale;
}

export function ServiceHighlightsSection({ services, locale = DEFAULT_LOCALE }: ServiceHighlightsSectionProps) {
  return (
    <section className="section-shell mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'sections.serviceMenu')}</p>
          <h2 className="mt-3 font-heading text-4xl">{t(locale, 'sections.curatedCatalogue')}</h2>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.slice(0, 6).map((service) => (
          <ServiceCard
            key={service.slug}
            href={service.path}
            name={service.name}
            category={service.category}
            summary={service.summary}
            image={service.heroImage}
            ctaLabel={t(locale, 'services.viewTreatment')}
          />
        ))}
      </div>
    </section>
  );
}
