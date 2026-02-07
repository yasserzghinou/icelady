import { DEFAULT_LOCALE, Locale, t } from '@/lib/i18n';
import { Testimonial } from '@/components/Testimonial';

interface SocialProofSectionProps {
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
  }>;
  locale?: Locale;
}

export function SocialProofSection({ testimonials, locale = DEFAULT_LOCALE }: SocialProofSectionProps) {
  return (
    <section className="section-shell mt-16">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'sections.socialProof')}</p>
      <h2 className="mt-3 font-heading text-4xl">{t(locale, 'sections.socialProofTitle')}</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <Testimonial key={`${item.name}-${item.role}`} quote={item.quote} name={item.name} role={item.role} />
        ))}
      </div>
    </section>
  );
}
