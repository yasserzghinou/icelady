import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

export interface Service {
  slug: string;
  path: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  benefits: string[];
  duration: string;
  priceNote: string;
  featured: boolean;
  heroImage: string;
  galleryImages?: string[];
  needsCopy: boolean;
  seo: {
    title: string;
    description: string;
  };
  translations?: Partial<
    Record<
      'fr' | 'ar',
      {
        name: string;
        category: string;
        tagline: string;
        summary: string;
        seo: {
          title: string;
          description: string;
        };
      }
    >
  >;
}

export interface GenericPage {
  path: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  cta: {
    label: string;
    href: string;
  };
  template: string;
  needsCopy: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  path: string;
  date: string;
  image?: string;
  needsCopy: boolean;
  content: string;
}

export interface SiteSettings {
  brand: string;
  siteName: string;
  baseUrl: string;
  locale: string;
  tagline: string;
  description: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image?: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  cryotherapy: {
    title: string;
    description: string;
    image?: string;
    bullets: string[];
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    bookingLink: string;
    address: string;
    mapProfileUrl: string;
    mapEmbedUrl: string;
    hours: string[];
    [key: string]: unknown;
  };
  socials: Array<{
    label: string;
    href: string;
    needsCopy?: boolean;
  }>;
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    needsCopy?: boolean;
  }>;
  faq: Array<{
    question: string;
    answer: string;
    needsCopy?: boolean;
  }>;
  [key: string]: unknown;
}

function blogDirectory(): string {
  return path.join(process.cwd(), 'src', 'content', 'blog');
}

function readContentJson<T>(fileName: string, fallback: T): T {
  const filePath = path.join(process.cwd(), 'src', 'content', fileName);

  try {
    const raw = readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getSiteSettings() {
  return readContentJson<SiteSettings>('site-settings.json', {
    brand: 'Ice Lady',
    siteName: 'Ice Lady Marrakech',
    baseUrl: 'https://islady.ma',
    locale: 'en-MA',
    tagline: '',
    description: '',
    hero: {
      eyebrow: '',
      title: '',
      subtitle: '',
      image: '',
      primaryCta: {
        label: '',
        href: '/en/pages/contact'
      },
      secondaryCta: {
        label: '',
        href: '/en/collections/all'
      }
    },
    cryotherapy: {
      title: '',
      description: '',
      image: '',
      bullets: []
    },
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      bookingLink: '/en/pages/contact',
      address: '',
      mapProfileUrl: '',
      mapEmbedUrl: '',
      hours: []
    },
    socials: [],
    testimonials: [],
    faq: []
  });
}

export function getServices(): Service[] {
  const payload = readContentJson<{ services: Service[] }>('services.json', {
    services: []
  });
  return payload.services.slice();
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getPages(): GenericPage[] {
  const payload = readContentJson<{ pages: GenericPage[] }>('pages.json', {
    pages: []
  });
  return payload.pages.slice();
}

export function getPageByPath(urlPath: string): GenericPage | undefined {
  return getPages().find((page) => page.path === urlPath);
}

export function getAllBlogPosts(): BlogPost[] {
  const dir = blogDirectory();
  const files = readdirSync(dir).filter((fileName) => fileName.endsWith('.mdx'));

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const source = readFileSync(path.join(dir, fileName), 'utf8');
    const { data, content } = matter(source);

    return {
      slug,
      title: String(data.title || slug),
      description: String(data.description || ''),
      path: String(data.path || `/en/blogs/news/${slug}`),
      date: String(data.date || '2025-01-01'),
      image: String(data.image || ''),
      needsCopy: Boolean(data.needsCopy),
      content
    } satisfies BlogPost;
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
