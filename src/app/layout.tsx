import type { Metadata } from 'next';
import Script from 'next/script';

import { SeoJsonLd } from '@/components/Seo';
import { getSiteSettings } from '@/lib/content';
import { localBusinessSchema } from '@/lib/seo/schema';

import './globals.css';

const initialSettings = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || String(initialSettings.baseUrl) || 'https://islady.ma'),
  title: {
    default: 'Ice Lady Marrakech | Premium Cryotherapy & Beauty Clinic',
    template: '%s | Ice Lady Marrakech'
  },
  description: String(initialSettings.description)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = getSiteSettings();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr">
      <body>
        <SeoJsonLd
          schema={localBusinessSchema({
            siteName: String(siteSettings.siteName),
            description: String(siteSettings.description),
            contact: {
              phone: String(siteSettings.contact.phone),
              email: String(siteSettings.contact.email),
              address: String(siteSettings.contact.address)
            }
          })}
        />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        <main>{children}</main>
      </body>
    </html>
  );
}
