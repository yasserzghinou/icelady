import type { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';
import routeMap from '@/lib/routing/routeMap.json';
import { replaceFirstSegment } from '@/lib/utils/paths';

const INDEXABLE_TYPES = new Set([
  'home',
  'servicesIndex',
  'contact',
  'service',
  'blogIndex',
  'blogPost',
  'generic'
]);

const REDIRECT_ONLY_PATHS = new Set(
  SUPPORTED_LOCALES.map((locale) => `/${locale}/products/therapiefroid`)
);

function resolveBaseUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://islady.ma';

  try {
    return new URL(candidate).origin;
  } catch {
    return 'https://islady.ma';
  }
}

function localeFromPath(path: string): Locale | undefined {
  const segment = path.split('/').filter(Boolean)[0];
  if (!segment) {
    return undefined;
  }

  const locale = segment as Locale;
  return SUPPORTED_LOCALES.includes(locale) ? locale : undefined;
}

function canonicalLocaleKey(path: string): string {
  const locale = localeFromPath(path);
  if (!locale) {
    return path;
  }

  return replaceFirstSegment(path, 'en');
}

function buildLocaleAlternates(baseUrl: string): Map<string, Record<string, string>> {
  const mapping = new Map<string, Record<string, string>>();

  for (const route of routeMap) {
    const locale = localeFromPath(route.path);
    if (!locale) {
      continue;
    }

    const key = canonicalLocaleKey(route.path);
    const alternates = mapping.get(key) || {};
    alternates[locale] = `${baseUrl}${route.path}`;
    mapping.set(key, alternates);
  }

  return mapping;
}

function sitemapPriority(path: string, type: string): number {
  if (type === 'home') {
    return 1;
  }

  if (type === 'contact' || type === 'servicesIndex') {
    return 0.9;
  }

  if (type === 'service' || type === 'blogIndex') {
    return 0.8;
  }

  if (
    path.startsWith('/fr/pages/cryotherapie') ||
    path.startsWith('/en/pages/cryotherapie') ||
    path.startsWith('/ar/pages/cryotherapie')
  ) {
    return 0.9;
  }

  if (type === 'blogPost') {
    return 0.7;
  }

  return 0.6;
}

function sitemapChangeFrequency(type: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (type === 'blogPost') {
    return 'monthly';
  }

  if (type === 'home' || type === 'servicesIndex' || type === 'contact') {
    return 'weekly';
  }

  return 'monthly';
}

export function sitemapFromRouteMap(): MetadataRoute.Sitemap {
  const baseUrl = resolveBaseUrl();
  const alternatesByPath = buildLocaleAlternates(baseUrl);

  return routeMap
    .map((entry) => ({
      path: entry.path,
      type: entry.type
    }))
    .filter((entry) => INDEXABLE_TYPES.has(entry.type) && !REDIRECT_ONLY_PATHS.has(entry.path))
    .map((entry) => {
      const alternates = alternatesByPath.get(canonicalLocaleKey(entry.path));
      const languageAlternates = alternates
        ? {
            ...(alternates.fr ? { 'fr-MA': alternates.fr } : {}),
            ...(alternates.en ? { 'en-MA': alternates.en } : {}),
            ...(alternates.ar ? { 'ar-MA': alternates.ar } : {}),
            ...(alternates.fr ? { 'x-default': alternates.fr } : {})
          }
        : undefined;

      return {
        url: `${baseUrl}${entry.path}`,
        changeFrequency: sitemapChangeFrequency(entry.type),
        priority: sitemapPriority(entry.path, entry.type),
        alternates: languageAlternates
          ? {
              languages: languageAlternates
            }
          : undefined
      };
    });
}
