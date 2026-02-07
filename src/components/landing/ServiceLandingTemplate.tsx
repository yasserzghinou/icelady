import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';
import { CryoLeadCaptureCard } from '@/components/sections/CryoLeadCaptureCard';
import { CryoZonesTabs } from '@/components/sections/CryoZonesTabs';
import type { ServiceLandingCopy } from '@/lib/serviceLandingTemplate';

interface ServiceLandingTemplateProps {
  content: ServiceLandingCopy;
  paths: {
    contact: string;
    services: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email?: string;
    address: string;
    mapEmbedUrl: string;
    mapProfileUrl?: string;
    hours: string[];
  };
  heroImage?: string;
}

function toTelHref(phone: string): string {
  const cleaned = phone.replace(/[^+\d]/g, '');
  return `tel:${cleaned}`;
}

function toWhatsAppHref(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `https://wa.me/${cleaned}`;
}

export function ServiceLandingTemplate({
  content,
  paths,
  contact,
  heroImage = '/images/services/slimming.jpg'
}: ServiceLandingTemplateProps) {
  return (
    <>
      <section className="section-shell pt-8 md:pt-10">
        <div className="section-card p-6 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {content.contactHeader.eyebrow}
              </p>
              <p className="mt-2 font-heading text-3xl leading-tight md:text-4xl">
                {content.contactHeader.title}
              </p>
              <p className="mt-3 text-sm text-text/75">{content.contactHeader.subtitle}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-text/60">
                {content.contactHeader.responseNote}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {content.contactHeader.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-stone/35 bg-white/70 px-3 py-2 text-xs text-text/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone/35 bg-white/75 p-4 md:p-5">
              <p className="text-sm text-text/75">
                <span className="font-semibold text-text">Telephone:</span>{' '}
                <Link href={toTelHref(contact.phone)} className="focus-ring hover:text-accent">
                  {contact.phone}
                </Link>
              </p>
              <p className="mt-1 text-sm text-text/75">
                <span className="font-semibold text-text">WhatsApp:</span>{' '}
                <Link
                  href={toWhatsAppHref(contact.whatsapp || contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring hover:text-accent"
                >
                  {contact.whatsapp || contact.phone}
                </Link>
              </p>
              <ul className="mt-2 space-y-1 text-xs text-text/60">
                {contact.hours.slice(0, 3).map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
              {contact.email ? (
                <p className="mt-2 text-xs text-text/70">Email: {contact.email}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                <CTA
                  href={paths.contact}
                  label={content.contactHeader.primaryCta}
                  trackingId="landing-header-primary"
                />
                <Link
                  href={toWhatsAppHref(contact.whatsapp || contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center rounded-full border border-text/20 bg-white/70 px-5 py-3 text-sm font-semibold text-text hover:border-accent hover:text-accent"
                  data-analytics-id="landing-header-whatsapp"
                >
                  {content.contactHeader.secondaryCta}
                </Link>
              </div>
            </div>
          </div>

          <nav aria-label="Navigation de la page" className="mt-5 overflow-x-auto pb-1">
            <div className="flex w-max items-center gap-2">
              {content.quickNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="focus-ring rounded-full border border-stone/45 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-text/70 hover:border-accent hover:text-accent"
                  data-analytics-id={`landing-jump-${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <section className="section-shell pt-6 md:pt-8">
        <div className="section-card grid items-center gap-10 overflow-hidden p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{content.hero.eyebrow}</p>
            <h1 className="mt-4 font-heading text-5xl leading-tight md:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text/75">
              {content.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTA
                href={paths.contact}
                label={content.hero.primaryCta}
                trackingId="landing-hero-primary"
              />
              <CTA
                href={paths.services}
                label={content.hero.secondaryCta}
                variant="secondary"
                trackingId="landing-hero-secondary"
              />
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {content.trustSignals.map((signal) => (
                <li
                  key={signal}
                  className="rounded-full border border-stone/45 bg-white/80 px-3 py-1 text-xs font-medium text-text/75"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-stone/25 to-background md:h-[420px]">
            <Image
              src={heroImage}
              alt="Traitement en clinique premium"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text/50 to-transparent" />
            <div className="absolute inset-6 rounded-[2rem] border border-white/50 bg-white/20 backdrop-blur-[2px]" />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/60 bg-white/85 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {content.hero.signatureLabel}
              </p>
              <p className="mt-2 font-heading text-2xl">{content.hero.signatureTitle}</p>
              <p className="mt-2 text-sm text-text/75">{content.hero.signatureLine}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogue" className="section-shell mt-12 scroll-mt-28">
        <div className="section-card p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {content.catalogue.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">{content.catalogue.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text/75">
            {content.catalogue.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.catalogue.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-stone/35 bg-white/70 p-5"
              >
                <h3 className="font-heading text-2xl leading-tight">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text/75">{card.description}</p>
                {card.meta ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text/55">
                    {card.meta}
                  </p>
                ) : null}
                <div className="mt-5">
                  <CTA
                    href={card.href}
                    label={content.catalogue.ctaLabel}
                    variant="secondary"
                    trackingId={`landing-catalog-${card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-shell mt-12 scroll-mt-28">
        <div className="section-card p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {content.process.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-4xl md:text-5xl">{content.process.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-text/75">
                {content.process.description}
              </p>

              <ol className="mt-7 space-y-4">
                {content.process.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-stone/35 bg-white/70 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-2xl">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text/75">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <CryoLeadCaptureCard
              eyebrow={content.leadForm.eyebrow}
              title={content.leadForm.title}
              subtitle={content.leadForm.subtitle}
              labels={{
                name: content.leadForm.nameLabel,
                phone: content.leadForm.phoneLabel,
                slot: content.leadForm.slotLabel,
                zone: content.leadForm.zoneLabel,
                contactPreference: content.leadForm.contactPreferenceLabel,
                zoneOptions: content.leadForm.zoneOptions,
                contactPreferenceOptions: content.leadForm.contactPreferenceOptions,
                submit: content.leadForm.submitLabel,
                submitHint: content.leadForm.submitHint,
                privacyNote: content.leadForm.privacyNote
              }}
              success={{
                title: content.leadForm.successTitle,
                message: content.leadForm.successMessage
              }}
            />
          </div>
        </div>
      </section>

      <section id="zones" className="section-shell mt-12 scroll-mt-28">
        <div className="section-card p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{content.zones.eyebrow}</p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">{content.zones.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-text/75">{content.zones.description}</p>
          <div className="mt-7">
            <CryoZonesTabs
              tabs={content.zones.tabs.map((tab) => ({
                ...tab,
                ctaHref: paths.contact
              }))}
            />
          </div>
        </div>
      </section>

      <section id="results" className="section-shell mt-12 scroll-mt-28">
        <div className="section-card p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {content.outcomes.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">{content.outcomes.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-text/75">
            {content.outcomes.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.outcomes.beforeAfter.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-dashed border-stone/55 bg-white/65 p-5"
              >
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-stone/30 to-background" />
                <h3 className="mt-4 font-heading text-2xl">{item.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-text/55">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.outcomes.reviews.map((review) => (
              <blockquote
                key={`${review.name}-${review.role}`}
                className="rounded-2xl border border-stone/35 bg-white/70 p-5"
              >
                <p className="text-sm leading-relaxed text-text/80">“{review.quote}”</p>
                <footer className="mt-4 text-xs uppercase tracking-[0.14em] text-text/55">
                  {review.name} - {review.role}
                </footer>
              </blockquote>
            ))}
          </div>

          <p className="mt-6 rounded-2xl border border-stone/35 bg-white/75 px-4 py-3 text-sm text-text/75">
            {content.outcomes.disclaimer}
          </p>
        </div>
      </section>

      <section id="safety" className="section-shell mt-12 scroll-mt-28">
        <div className="section-card p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{content.safety.eyebrow}</p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">{content.safety.title}</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-stone/35 bg-white/70 p-5">
              <h3 className="font-heading text-2xl">{content.safety.contraindicationsTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/75">
                {content.safety.contraindicationsText}
              </p>
            </article>
            <article className="rounded-2xl border border-stone/35 bg-white/70 p-5">
              <h3 className="font-heading text-2xl">{content.safety.comfortTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/75">
                {content.safety.comfortText}
              </p>
            </article>
            <article className="rounded-2xl border border-stone/35 bg-white/70 p-5">
              <h3 className="font-heading text-2xl">{content.safety.hygieneTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/75">
                {content.safety.hygieneText}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="section-shell mt-12 scroll-mt-28">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="section-card p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {content.faqVisit.faqEyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl">{content.faqVisit.faqTitle}</h2>
            <div className="mt-6 space-y-3">
              {content.faqVisit.faqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-stone/35 bg-white/70 p-4"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-text">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-text/75">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div id="visit" className="section-card overflow-hidden">
            <div className="p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {content.faqVisit.visitEyebrow}
              </p>
              <h2 className="mt-3 font-heading text-3xl">{content.faqVisit.visitTitle}</h2>
              <p className="mt-4 text-sm text-text/75">{content.faqVisit.visitIntro}</p>
              <p className="mt-4 text-sm text-text/75">{contact.address}</p>
              <p className="mt-1 text-sm text-text/75">
                Telephone / WhatsApp: {contact.phone || contact.whatsapp}
              </p>

              <div className="mt-6">
                <CTA
                  href={paths.contact}
                  label={content.faqVisit.appointmentCta}
                  trackingId="landing-visit-appointment"
                />
              </div>

              {contact.mapProfileUrl ? (
                <Link
                  href={contact.mapProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-4 inline-flex text-sm font-semibold text-accent hover:text-accentDark"
                  data-analytics-id="landing-open-maps"
                >
                  {content.faqVisit.mapsCta}
                </Link>
              ) : null}
            </div>

            <iframe
              title={content.faqVisit.visitTitle}
              src={contact.mapEmbedUrl}
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section-shell pb-28 pt-12 md:pb-14">
        <div className="section-card p-8 text-center md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {content.finalCta.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">{content.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text/75">
            {content.finalCta.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTA
              href={paths.contact}
              label={content.finalCta.primaryCta}
              className="px-8"
              trackingId="landing-final-primary"
            />
            <CTA
              href={paths.services}
              label={content.finalCta.secondaryCta}
              variant="secondary"
              trackingId="landing-final-secondary"
            />
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full border border-stone/40 bg-white/95 p-2 shadow-soft backdrop-blur">
          <CTA
            href={paths.contact}
            label={content.finalCta.primaryCta}
            className="flex-1 justify-center px-4 py-2"
            trackingId="landing-mobile-primary"
          />
          <Link
            href={toWhatsAppHref(contact.whatsapp || contact.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex flex-1 items-center justify-center rounded-full border border-text/20 bg-white px-4 py-2 text-sm font-semibold text-text"
            data-analytics-id="landing-mobile-whatsapp"
          >
            WhatsApp
          </Link>
        </div>
      </div>
    </>
  );
}
