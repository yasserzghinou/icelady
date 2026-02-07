import type { Metadata } from 'next';

import { getSiteSettings } from '@/lib/content';
import { joinUrl, normalizePath } from '@/lib/utils/paths';

export function absoluteUrl(path: string): string {
  const settings = getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || String(settings.baseUrl) || 'https://islady.ma';

  return joinUrl(baseUrl, normalizePath(path));
}

interface MetadataInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
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

export function buildMetadata({ path, title, description, image, type = 'website' }: MetadataInput): Metadata {
  const settings = getSiteSettings();
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical
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
          url: image || '/images/og-default.jpg',
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
      images: [image || '/images/og-default.jpg']
    }
  };
}
