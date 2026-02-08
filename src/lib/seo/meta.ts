import type { Metadata } from 'next';

import { getSiteSettings } from '@/lib/content';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';
import { joinUrl, normalizePath, replaceFirstSegment } from '@/lib/utils/paths';

const HREFLANG_BY_LOCALE: Record<Locale, string> = {
  fr: 'fr-MA',
  en: 'en-MA',
  ar: 'ar-MA'
};

export function absoluteUrl(path: string): string {
  const settings = getSiteSettings();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || String(settings.baseUrl) || 'https://islady.ma';

  return joinUrl(baseUrl, normalizePath(path));
}

interface MetadataInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: Metadata['robots'];
}

function ogLocaleFromPath(path: string): string {
  if (path.startsWith('/fr')) {
    return 'fr_MA';
  }
  if (path.startsWith('/ar')) {
    return 'ar_MA';
  }
  return 'en_MA';
}

function localeFromPath(path: string): Locale | undefined {
  const segment = path.split('/').filter(Boolean)[0];
  if (!segment) {
    return undefined;
  }

  const locale = segment as Locale;
  return SUPPORTED_LOCALES.includes(locale) ? locale : undefined;
}

function languageAlternates(path: string): Record<string, string> | undefined {
  const locale = localeFromPath(path);
  if (!locale) {
    return undefined;
  }

  const alternatives = SUPPORTED_LOCALES.reduce<Record<string, string>>((accumulator, value) => {
    const localizedPath = replaceFirstSegment(path, value);
    accumulator[HREFLANG_BY_LOCALE[value]] = absoluteUrl(localizedPath);
    return accumulator;
  }, {});

  alternatives['x-default'] = absoluteUrl(replaceFirstSegment(path, DEFAULT_LOCALE));

  return alternatives;
}

export function buildMetadata({
  path,
  title,
  description,
  image,
  type = 'website',
  robots
}: MetadataInput): Metadata {
  const settings = getSiteSettings();
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image || '/images/og-default.jpg');
  const languages = languageAlternates(path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: String(settings.siteName),
      locale: ogLocaleFromPath(path),
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots
  };
}
