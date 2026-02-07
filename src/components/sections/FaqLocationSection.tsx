import { DEFAULT_LOCALE, Locale, t } from '@/lib/i18n';
import { CTA } from '@/components/CTA';

interface FaqLocationSectionProps {
  faq: Array<{ question: string; answer: string }>;
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    mapEmbedUrl: string;
    mapProfileUrl?: string;
  };
  locale?: Locale;
}

export function FaqLocationSection({ faq, contact, locale = DEFAULT_LOCALE }: FaqLocationSectionProps) {
  return (
    <section className="section-shell mt-16 pb-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="section-card p-7 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'sections.faq')}</p>
          <h2 className="mt-3 font-heading text-3xl">{t(locale, 'sections.faq')}</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-stone/35 bg-white/70 p-4">
                <summary className="cursor-pointer font-medium text-text">{item.question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-text/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="section-card overflow-hidden">
          <div className="p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(locale, 'sections.visit')}</p>
            <h2 className="mt-3 font-heading text-3xl">{t(locale, 'sections.marrakechClinic')}</h2>
            <p className="mt-4 text-sm text-text/75">
              {contact.mapProfileUrl ? (
                <a
                  href={contact.mapProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring underline decoration-stone-400 underline-offset-4 hover:text-accent"
                >
                  {contact.address}
                </a>
              ) : (
                contact.address
              )}
            </p>
            <p className="mt-1 text-sm text-text/75">
              {t(locale, 'contact.phoneWhatsapp')}: {contact.phone || contact.whatsapp}
            </p>
            <div className="mt-6">
              <CTA href={`/${locale}/pages/contact`} label={t(locale, 'cta.requestAppointment')} />
            </div>
            {contact.mapProfileUrl ? (
              <a
                href={contact.mapProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-4 inline-flex text-sm font-semibold text-accent hover:text-accentDark"
              >
                {t(locale, 'contact.openMaps')}
              </a>
            ) : null}
          </div>
          <iframe
            title={t(locale, 'sections.marrakechClinic')}
            src={contact.mapEmbedUrl}
            className="h-56 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
