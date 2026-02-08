import { buildMetadata } from '@/lib/seo/meta';
import { getSiteSettings } from '@/lib/content';
import { toWhatsAppHref } from '@/lib/whatsapp';

export const metadata = buildMetadata({
  path: '/en/pages/contact',
  title: 'Book Your Consultation',
  description: 'Contact IceLady Marrakech to schedule your consultation and design your personalized program.'
});

export default function ContactPage() {
  const settings = getSiteSettings();
  const whatsappNumber = settings.contact.whatsapp || settings.contact.phone;
  const whatsappHref = toWhatsAppHref(whatsappNumber);

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="section-card p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h1 className="mt-3 font-heading text-5xl">Your Appointment at IceLady Marrakech</h1>
          <p className="mt-5 text-base leading-relaxed text-text/75">
            Speak with our team to define your goals and identify the most suitable treatment protocol.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-text/80">
            <li>
              <span className="font-semibold">Phone:</span> {settings.contact.phone}
            </li>
            <li>
              <span className="font-semibold">WhatsApp:</span>{' '}
              {whatsappHref !== '#' ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring underline decoration-stone-400 underline-offset-4 hover:text-accent"
                >
                  {whatsappNumber}
                </a>
              ) : (
                whatsappNumber
              )}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {settings.contact.email}
            </li>
            <li>
              <span className="font-semibold">Address:</span> {settings.contact.address}
            </li>
          </ul>
          <div className="mt-7 rounded-2xl border border-stone/35 bg-white/70 p-4 text-sm text-text/80">
            No online payments. Confirmation and payment details are handled directly by the clinic.
          </div>
        </div>

        <div className="section-card overflow-hidden">
          <div className="p-8 md:p-10">
            <h2 className="font-heading text-3xl">Opening Hours</h2>
            <ul className="mt-5 space-y-2 text-sm text-text/80">
              {settings.contact.hours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </div>
          <iframe
            title="IceLady map"
            src={settings.contact.mapEmbedUrl}
            className="h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
