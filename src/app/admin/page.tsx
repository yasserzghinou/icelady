import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin/session';
import {
  getAdminSettings,
  getLeadAnalytics,
  getLeadSubmissions,
  getServicesData,
  getSiteSettingsData
} from '@/lib/admin/store';
import { getLocalizedServices } from '@/lib/localizedEntities';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = 'force-dynamic';

const statusMessageByCode: Record<string, string> = {
  'business-saved': 'Business settings saved.',
  'business-invalid-email': 'Business email is invalid.',
  'forms-saved': 'Form settings saved.',
  'forms-invalid-email': 'Form email settings are invalid.',
  'service-saved': 'Treatment updated successfully.',
  'service-not-found': 'Treatment slug was not found.'
};

function formatDate(iso: string): string {
  const value = Date.parse(iso);
  if (Number.isNaN(value)) {
    return iso;
  }

  return new Intl.DateTimeFormat('fr-MA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams?: { status?: string; slug?: string };
}) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);
  if (!isAuthenticated) {
    redirect('/admin/login?returnTo=%2Fadmin');
  }

  const siteSettings = getSiteSettingsData();
  const adminSettings = getAdminSettings();
  const servicesPayload = getServicesData();
  const localizedFrBySlug = new Map(
    getLocalizedServices('fr').map((service) => [service.slug, service])
  );
  const localizedArBySlug = new Map(
    getLocalizedServices('ar').map((service) => [service.slug, service])
  );
  const analytics = getLeadAnalytics();
  const submissions = getLeadSubmissions(20);

  const statusCode = searchParams?.status;
  const statusMessage = statusCode ? statusMessageByCode[statusCode] : null;
  const slug = searchParams?.slug;

  return (
    <section className="section-shell py-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Private Dashboard</p>
          <h1 className="mt-3 font-heading text-5xl">Admin Panel</h1>
          <p className="mt-2 text-sm text-text/75">
            Manage business info, treatment catalog, and form operations.
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="focus-ring rounded-full border border-text/20 bg-white/85 px-5 py-2 text-sm font-semibold text-text hover:border-accent hover:text-accent"
          >
            Sign out
          </button>
        </form>
      </div>

      {statusMessage ? (
        <p className="mb-6 rounded-2xl border border-stone/45 bg-white/80 px-4 py-3 text-sm text-text/80">
          {statusMessage}
          {slug ? ` (${slug})` : ''}
        </p>
      ) : null}

      {!process.env.RESEND_API_KEY ? (
        <p className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Email forwarding is disabled. Set `RESEND_API_KEY` to deliver leads by email while keeping
          analytics tracking active.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <article className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-text/60">Total Forms</p>
          <p className="mt-2 font-heading text-4xl">{analytics.total}</p>
        </article>
        <article className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-text/60">Last 7 Days</p>
          <p className="mt-2 font-heading text-4xl">{analytics.last7Days}</p>
        </article>
        <article className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-text/60">Email Failures</p>
          <p className="mt-2 font-heading text-4xl">{analytics.emailFailed}</p>
        </article>
      </div>

      <div className="mt-8 grid gap-8">
        <section className="section-card p-6 md:p-7">
          <h2 className="font-heading text-3xl">Business & Maps</h2>
          <p className="mt-2 text-sm text-text/70">
            Controls the public contact information, address, and Google Maps links shown on the
            website.
          </p>

          <form
            action="/api/admin/business"
            method="post"
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <input type="hidden" name="returnTo" value="/admin" />

            <label className="text-sm text-text/80">
              Site name
              <input
                name="siteName"
                defaultValue={siteSettings.siteName}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80">
              Public email
              <input
                name="publicEmail"
                type="email"
                defaultValue={siteSettings.contact.email}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80">
              Phone
              <input
                name="phone"
                defaultValue={siteSettings.contact.phone}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80">
              WhatsApp
              <input
                name="whatsapp"
                defaultValue={siteSettings.contact.whatsapp}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80 md:col-span-2">
              Description
              <textarea
                name="description"
                defaultValue={siteSettings.description}
                rows={3}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80 md:col-span-2">
              Address
              <textarea
                name="address"
                defaultValue={siteSettings.contact.address}
                rows={2}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80 md:col-span-2">
              Google Maps profile URL
              <input
                name="mapProfileUrl"
                type="url"
                defaultValue={siteSettings.contact.mapProfileUrl}
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80 md:col-span-2">
              Google Maps embed URL
              <input
                name="mapEmbedUrl"
                type="url"
                defaultValue={siteSettings.contact.mapEmbedUrl}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80 md:col-span-2">
              Opening hours (one line per day)
              <textarea
                name="openingHours"
                defaultValue={siteSettings.contact.hours.join('\n')}
                rows={4}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="focus-ring rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accentDark"
              >
                Save business settings
              </button>
            </div>
          </form>
        </section>

        <section className="section-card p-6 md:p-7">
          <h2 className="font-heading text-3xl">Forms</h2>
          <p className="mt-2 text-sm text-text/70">
            Configure where lead forms are delivered and inspect recent submissions.
          </p>

          <form
            action="/api/admin/forms/settings"
            method="post"
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <input type="hidden" name="returnTo" value="/admin" />

            <label className="text-sm text-text/80">
              Recipient email
              <input
                name="formRecipientEmail"
                type="email"
                defaultValue={adminSettings.formRecipientEmail}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80">
              Sender name
              <input
                name="resendFromName"
                defaultValue={adminSettings.resendFromName}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm text-text/80 md:col-span-2">
              Sender email (for Resend)
              <input
                name="resendFromEmail"
                type="email"
                defaultValue={adminSettings.resendFromEmail}
                required
                className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="focus-ring rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accentDark"
              >
                Save form settings
              </button>
            </div>
          </form>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone/35 bg-white/75">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-stone/35 bg-white/85">
                <tr>
                  <th className="px-4 py-3 font-semibold text-text/70">Date</th>
                  <th className="px-4 py-3 font-semibold text-text/70">Name</th>
                  <th className="px-4 py-3 font-semibold text-text/70">Phone</th>
                  <th className="px-4 py-3 font-semibold text-text/70">Preferred slot</th>
                  <th className="px-4 py-3 font-semibold text-text/70">Zone</th>
                  <th className="px-4 py-3 font-semibold text-text/70">Contact</th>
                  <th className="px-4 py-3 font-semibold text-text/70">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length ? (
                  submissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-stone/30 last:border-b-0">
                      <td className="px-4 py-3 text-text/70">
                        {formatDate(submission.submittedAt)}
                      </td>
                      <td className="px-4 py-3">{submission.name}</td>
                      <td className="px-4 py-3">{submission.phone}</td>
                      <td className="px-4 py-3">{submission.slot}</td>
                      <td className="px-4 py-3">{submission.zone || '-'}</td>
                      <td className="px-4 py-3">{submission.contactPreference || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-stone/45 bg-white px-2.5 py-1 text-xs uppercase tracking-[0.08em]">
                          {submission.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-6 text-text/60" colSpan={7}>
                      No form submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-card p-6 md:p-7">
          <h2 className="font-heading text-3xl">Treatment Catalog</h2>
          <p className="mt-2 text-sm text-text/70">
            Edit treatment titles, descriptions, and images used across product/catalog pages for
            English, French, and Arabic.
          </p>

          <div className="mt-6 space-y-4">
            {servicesPayload.services.map((service) => {
              const frService = localizedFrBySlug.get(service.slug);
              const arService = localizedArBySlug.get(service.slug);

              return (
              <details
                key={service.slug}
                className="rounded-2xl border border-stone/35 bg-white/75 p-4"
                open={slug === service.slug}
              >
                <summary className="cursor-pointer text-sm font-semibold text-text">
                  {service.name} ({service.slug})
                </summary>

                <form
                  action={`/api/admin/services/${service.slug}`}
                  method="post"
                  className="mt-4 grid gap-4 md:grid-cols-2"
                >
                  <input type="hidden" name="returnTo" value="/admin" />

                  <label className="text-sm text-text/80 md:col-span-2">
                    English title
                    <input
                      name="name"
                      defaultValue={service.name}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80">
                    English category
                    <input
                      name="category"
                      defaultValue={service.category}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80">
                    English tagline
                    <input
                      name="tagline"
                      defaultValue={service.tagline}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80 md:col-span-2">
                    English description
                    <textarea
                      name="summary"
                      defaultValue={service.summary}
                      rows={5}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80">
                    Duration
                    <input
                      name="duration"
                      defaultValue={service.duration}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80">
                    Price note
                    <input
                      name="priceNote"
                      defaultValue={service.priceNote}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80 md:col-span-2">
                    Hero image URL/path
                    <input
                      name="heroImage"
                      defaultValue={service.heroImage}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80 md:col-span-2">
                    Gallery images (one per line)
                    <textarea
                      name="galleryImages"
                      defaultValue={(service.galleryImages || []).join('\n')}
                      rows={4}
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="inline-flex items-center gap-2 text-sm text-text/80 md:col-span-2">
                    <input
                      type="checkbox"
                      name="featured"
                      defaultChecked={service.featured}
                      className="h-4 w-4"
                    />
                    Featured treatment
                  </label>

                  <label className="text-sm text-text/80 md:col-span-2">
                    English SEO title
                    <input
                      name="seoTitle"
                      defaultValue={service.seo.title}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm text-text/80 md:col-span-2">
                    English SEO description
                    <textarea
                      name="seoDescription"
                      defaultValue={service.seo.description}
                      rows={3}
                      required
                      className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                    />
                  </label>

                  <div className="md:col-span-2 rounded-2xl border border-stone/35 bg-white/65 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-text/60">French content</p>
                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                      <label className="text-sm text-text/80 md:col-span-2">
                        French title
                        <input
                          name="frName"
                          defaultValue={frService?.name || service.name}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80">
                        French category
                        <input
                          name="frCategory"
                          defaultValue={frService?.category || service.category}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80">
                        French tagline
                        <input
                          name="frTagline"
                          defaultValue={frService?.tagline || service.tagline}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80 md:col-span-2">
                        French description
                        <textarea
                          name="frSummary"
                          defaultValue={frService?.summary || service.summary}
                          rows={4}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80 md:col-span-2">
                        French SEO title
                        <input
                          name="frSeoTitle"
                          defaultValue={frService?.seo?.title || frService?.name || service.seo.title}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80 md:col-span-2">
                        French SEO description
                        <textarea
                          name="frSeoDescription"
                          defaultValue={
                            frService?.seo?.description || frService?.summary || service.seo.description
                          }
                          rows={3}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>
                    </div>
                  </div>

                  <div
                    dir="rtl"
                    className="md:col-span-2 rounded-2xl border border-stone/35 bg-white/65 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-text/60">Arabic content</p>
                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                      <label className="text-sm text-text/80 md:col-span-2">
                        Arabic title
                        <input
                          name="arName"
                          defaultValue={arService?.name || service.name}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80">
                        Arabic category
                        <input
                          name="arCategory"
                          defaultValue={arService?.category || service.category}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80">
                        Arabic tagline
                        <input
                          name="arTagline"
                          defaultValue={arService?.tagline || service.tagline}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80 md:col-span-2">
                        Arabic description
                        <textarea
                          name="arSummary"
                          defaultValue={arService?.summary || service.summary}
                          rows={4}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80 md:col-span-2">
                        Arabic SEO title
                        <input
                          name="arSeoTitle"
                          defaultValue={arService?.seo?.title || arService?.name || service.seo.title}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="text-sm text-text/80 md:col-span-2">
                        Arabic SEO description
                        <textarea
                          name="arSeoDescription"
                          defaultValue={
                            arService?.seo?.description || arService?.summary || service.seo.description
                          }
                          rows={3}
                          required
                          className="mt-1 w-full rounded-xl border border-stone/45 bg-white px-3 py-2 text-sm"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="focus-ring rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accentDark"
                    >
                      Save treatment
                    </button>
                  </div>
                </form>
              </details>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
