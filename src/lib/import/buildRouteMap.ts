import { cleanTitle, pathToSlug } from '@/lib/utils/slug';
import { normalizePath } from '@/lib/utils/paths';

import type { OldManifestPage } from './parseOldExport';

export type RouteType =
  | 'home'
  | 'servicesIndex'
  | 'service'
  | 'blogIndex'
  | 'blogPost'
  | 'contact'
  | 'about'
  | 'utility'
  | 'generic';

export interface RouteMapEntry {
  path: string;
  type: RouteType;
  slug: string;
  title: string;
  description: string;
  canonical: string;
  sourceUrl?: string;
  needsCopy: boolean;
}

function inferRouteType(path: string): RouteType {
  if (path === '/en') {
    return 'home';
  }

  if (path === '/en/collections/all') {
    return 'servicesIndex';
  }

  if (path.startsWith('/en/products/')) {
    return 'service';
  }

  if (path === '/en/blogs/news') {
    return 'blogIndex';
  }

  if (path.startsWith('/en/blogs/news/')) {
    return 'blogPost';
  }

  if (path === '/en/pages/contact') {
    return 'contact';
  }

  if (path === '/en/pages/about') {
    return 'about';
  }

  if (path === '/en/cart' || path === '/en/search') {
    return 'utility';
  }

  return 'generic';
}

function manifestIndexByPath(pages: OldManifestPage[]): Map<string, OldManifestPage> {
  const index = new Map<string, OldManifestPage>();

  for (const page of pages) {
    const source = page.finalUrl || page.url;
    if (!source) {
      continue;
    }

    try {
      const pathname = normalizePath(new URL(source).pathname);
      if (!index.has(pathname)) {
        index.set(pathname, page);
      }
    } catch {
      continue;
    }
  }

  return index;
}

function normalizeBrandTypos(text: string | undefined): string {
  if (!text) {
    return '';
  }

  return text
    .replace(/\bis lady\b/gi, 'Ice Lady')
    .replace(/\bice lady\b/gi, 'Ice Lady')
    .replace(/\bIce lady\b/g, 'Ice Lady');
}

export function buildRouteMap(
  sitemapPaths: string[],
  pages: OldManifestPage[],
  baseUrl = 'https://islady.ma'
): RouteMapEntry[] {
  const pageIndex = manifestIndexByPath(pages);
  const entries: RouteMapEntry[] = [];

  const primaryEntries = sitemapPaths.map((rawPath) => {
    const path = normalizePath(rawPath);
    const page = pageIndex.get(path);
    const rawTitle = page?.title;
    const title = normalizeBrandTypos(cleanTitle(rawTitle));
    const description = normalizeBrandTypos(page?.meta?.description?.trim()) ||
      'Premium cryotherapy and beauty treatments in Marrakech.';
    const type = inferRouteType(path);
    const slug = pathToSlug(path);

    return {
      path,
      type,
      slug,
      title,
      description,
      canonical: `${baseUrl}${path}`,
      sourceUrl: page?.url,
      needsCopy: !rawTitle || !page?.meta?.description
    };
  });

  entries.push(...primaryEntries);

  for (const locale of ['fr', 'ar']) {
    for (const entry of primaryEntries) {
      if (!entry.path.startsWith('/en')) {
        continue;
      }
      const localizedPath = entry.path.replace('/en', `/${locale}`);
      entries.push({
        ...entry,
        path: localizedPath,
        canonical: `${baseUrl}${localizedPath}`,
        sourceUrl: entry.sourceUrl?.replace('/en', `/${locale}`)
      });
    }
  }

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.path)) {
      return false;
    }
    seen.add(entry.path);
    return true;
  });
}
