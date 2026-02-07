import type { MetadataRoute } from 'next';

import { sitemapFromRouteMap } from '@/lib/seo/sitemapFromRouteMap';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapFromRouteMap();
}
