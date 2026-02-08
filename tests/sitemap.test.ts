import { describe, expect, it } from 'vitest';

import { sitemapFromRouteMap } from '../src/lib/seo/sitemapFromRouteMap';

describe('sitemap generation', () => {
  it('excludes utility and redirect-only URLs', () => {
    const sitemap = sitemapFromRouteMap();
    const urls = sitemap.map((entry) => entry.url);

    expect(urls.some((url) => url.includes('/cart') || url.includes('/search'))).toBe(false);
    expect(urls.some((url) => url.includes('/products/therapiefroid'))).toBe(false);
  });

  it('includes locale alternates for localized routes', () => {
    const sitemap = sitemapFromRouteMap();
    const entry = sitemap.find((item) => item.url.endsWith('/fr/pages/contact'));
    const languages = entry?.alternates?.languages as Record<string, string> | undefined;

    expect(languages?.['fr-MA']?.endsWith('/fr/pages/contact')).toBe(true);
    expect(languages?.['en-MA']?.endsWith('/en/pages/contact')).toBe(true);
    expect(languages?.['ar-MA']?.endsWith('/ar/pages/contact')).toBe(true);
    expect(languages?.['x-default']?.endsWith('/fr/pages/contact')).toBe(true);
  });
});
