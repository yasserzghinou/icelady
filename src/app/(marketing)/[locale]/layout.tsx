import { notFound } from 'next/navigation';

import { getSiteSettingsDataAsync } from '@/lib/admin/store';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { isLocale, localeDir, type Locale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const siteSettings = await getSiteSettingsDataAsync();
  const whatsappNumber = String(siteSettings.contact.whatsapp || siteSettings.contact.phone || '');

  return (
    <div dir={localeDir[locale]} className="min-h-screen">
      <Header locale={locale} whatsappNumber={whatsappNumber} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
