import Image from 'next/image';

import { DEFAULT_LOCALE, Locale, localizePath, t } from '@/lib/i18n';
import { CTA } from '@/components/CTA';

interface CryotherapySectionProps {
  cryotherapy: {
    title: string;
    description: string;
    image?: string;
    bullets: string[];
  };
  locale?: Locale;
}

export function CryotherapySection({ cryotherapy, locale = DEFAULT_LOCALE }: CryotherapySectionProps) {
  return (
    <section className="section-shell mt-16">
      <div className="section-card grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'sections.signatureExpertise')}</p>
          <h2 className="mt-3 font-heading text-4xl leading-tight">{cryotherapy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-text/75">{cryotherapy.description}</p>
          <div className="mt-6">
            <CTA
              href={localizePath('/en/products/therapiefroid', locale)}
              label={t(locale, 'sections.exploreCryo')}
            />
          </div>
        </div>
        <div>
          <div className="relative h-52 overflow-hidden rounded-2xl bg-stone/20">
            {cryotherapy.image ? (
              <Image
                src={cryotherapy.image}
                alt="IceLady cryotherapy session"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <ul className="mt-4 space-y-4">
            {cryotherapy.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-2xl border border-stone/40 bg-white/70 px-5 py-4 text-sm text-text/75"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
