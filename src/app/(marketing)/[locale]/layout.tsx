import { notFound } from 'next/navigation';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { isLocale, localeDir, type Locale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default function LocaleLayout({
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

  return (
    <div dir={localeDir[locale]} className="min-h-screen">
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
