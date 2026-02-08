import Image from 'next/image';

import { CTA } from '@/components/CTA';
import { DEFAULT_LOCALE, Locale, t } from '@/lib/i18n';

interface HeroSectionProps {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image?: string;
    primaryCta: { href: string; label: string };
    secondaryCta: { href: string; label: string };
  };
  locale?: Locale;
}

export function HeroSection({ hero, locale = DEFAULT_LOCALE }: HeroSectionProps) {
  return (
    <section className="section-shell pt-14 md:pt-20">
      <div className="section-card grid items-center gap-10 overflow-hidden p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
        <div className="animate-reveal">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
          <h1 className="mt-4 font-heading text-5xl leading-tight md:text-6xl">{hero.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text/75">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA
              href={hero.primaryCta.href}
              label={hero.primaryCta.label}
              newTab={hero.primaryCta.href.startsWith('http')}
            />
            <CTA
              href={hero.secondaryCta.href}
              label={hero.secondaryCta.label}
              variant="secondary"
              newTab={hero.secondaryCta.href.startsWith('http')}
            />
          </div>
        </div>
        <div className="relative h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-accent/25 via-stone/30 to-background md:h-[420px]">
          {hero.image ? (
            <Image
              src={hero.image}
              alt="Ice Lady premium clinic experience"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-text/45 to-transparent" />
          <div className="absolute inset-6 rounded-[2rem] border border-white/50 bg-white/30 backdrop-blur-[2px]" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/55 bg-white/85 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'hero.flagshipLabel')}</p>
            <p className="mt-2 font-heading text-2xl">{t(locale, 'hero.flagshipTitle')}</p>
            <p className="mt-2 text-sm text-text/70">{t(locale, 'hero.flagshipDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
