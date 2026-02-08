import type { MetadataRoute } from 'next';

function resolveBaseUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://islady.ma';

  try {
    return new URL(candidate).origin;
  } catch {
    return 'https://islady.ma';
  }
}

function canIndex(): boolean {
  const context = process.env.CONTEXT;
  if (!context) {
    return true;
  }

  return context === 'production';
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = resolveBaseUrl();
  const allowIndexing = canIndex();

  return {
    rules: allowIndexing
      ? [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api/admin']
          }
        ]
      : [
          {
            userAgent: '*',
            disallow: '/'
          }
        ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
