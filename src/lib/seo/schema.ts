import { absoluteUrl } from '@/lib/seo/meta';

interface BlogSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}

export function localBusinessSchema(settings: {
  siteName: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  urlPath?: string;
  mapProfileUrl?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: settings.siteName,
    description: settings.description,
    url: absoluteUrl(settings.urlPath || '/fr'),
    telephone: settings.contact.phone,
    email: settings.contact.email,
    sameAs: settings.mapProfileUrl ? [settings.mapProfileUrl] : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marrakech',
      addressCountry: 'MA',
      streetAddress: settings.contact.address
    }
  };
}

export function blogPostingSchema(input: BlogSchemaInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    mainEntityOfPage: absoluteUrl(input.path),
    url: absoluteUrl(input.path),
    author: {
      '@type': 'Organization',
      name: 'Ice Lady Marrakech'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ice Lady Marrakech'
    }
  };
}

export function faqPageSchema(
  entries: Array<{
    question: string;
    answer: string;
  }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer
      }
    }))
  };
}
