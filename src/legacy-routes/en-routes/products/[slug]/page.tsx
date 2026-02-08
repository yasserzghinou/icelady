import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { CTA } from '@/components/CTA';
import { buildMetadata } from '@/lib/seo/meta';
import { getServiceBySlug, getServices, getSiteSettings } from '@/lib/content';
import { toWhatsAppHref } from '@/lib/whatsapp';

export function generateStaticParams() {
  return getServices().map((service) => ({
    slug: service.slug
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return buildMetadata({
      path: `/en/products/${params.slug}`,
      title: 'Service Not Found',
      description: 'The requested IceLady service could not be found.'
    });
  }

  return buildMetadata({
    path: service.path,
    title: service.seo.title || service.name,
    description: service.seo.description || service.summary
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  const settings = getSiteSettings();
  const rawBookingHref = toWhatsAppHref(
    settings.contact.whatsapp || settings.contact.phone,
    `Hello Ice Lady, I want to book a consultation for ${service?.name || 'this treatment'}.`
  );
  const bookingHref = rawBookingHref === '#' ? '/en/pages/contact' : rawBookingHref;

  if (!service) {
    notFound();
  }

  return (
    <section className="section-shell pb-14 pt-14">
      <div className="section-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{service.category}</p>
        <h1 className="mt-3 font-heading text-5xl">{service.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text/75">{service.summary}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <ul className="space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="rounded-xl border border-stone/35 bg-white/65 px-4 py-3 text-sm text-text/80">
                {benefit}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-stone/35 bg-white/70 p-5 text-sm text-text/80">
            <p>
              <span className="font-semibold">Duration:</span> {service.duration}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Pricing:</span> {service.priceNote}
            </p>
          </div>
        </div>

        <div className="mt-9">
          <CTA href={bookingHref} label="Book Consultation" newTab={bookingHref.startsWith('http')} />
        </div>
      </div>
    </section>
  );
}
