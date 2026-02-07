import type { MetadataRoute } from 'next';

import routeMap from '@/lib/routing/routeMap.json';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://islady.ma';

export function sitemapFromRouteMap(): MetadataRoute.Sitemap {
  return routeMap.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: new Date(),
    changeFrequency: entry.type === 'blogPost' ? 'monthly' : 'weekly',
    priority: entry.path === '/en' ? 1 : 0.7
  }));
}
