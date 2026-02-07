import { cleanTitle } from '@/lib/utils/slug';

import type { RouteMapEntry } from './buildRouteMap';
import type { OldManifestPage } from './parseOldExport';

interface SeedContentInput {
  routeMap: RouteMapEntry[];
  pages: OldManifestPage[];
}

interface SeededBlogPost {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  needsCopy: boolean;
  content: string;
}

function isBoilerplateHeading(value: string): boolean {
  const normalized = value.toLowerCase().trim();
  return (
    normalized.includes('item added to your cart') ||
    normalized === 'connections' ||
    normalized === 'call us' ||
    normalized === 'subscribe to our emails' ||
    normalized === 'country/region' ||
    normalized === 'language' ||
    normalized === 'leave a comment'
  );
}

function findPage(path: string, pages: OldManifestPage[]): OldManifestPage | undefined {
  return pages.find((page) => {
    const pageUrl = page.finalUrl || page.url;
    return pageUrl ? new URL(pageUrl).pathname === path : false;
  });
}

function firstHeading(page: OldManifestPage | undefined): string | undefined {
  if (!page?.headings) {
    return undefined;
  }

  const candidates = [
    ...(page.headings.h1 || []),
    ...(page.headings.h2 || []),
    ...(page.headings.h3 || [])
  ].filter((item) => item && !isBoilerplateHeading(item));

  return candidates[0];
}

function inferCategory(slug: string): string {
  if (slug.includes('micro')) {
    return 'Skin & Brows';
  }
  if (slug.includes('cils')) {
    return 'Eyes';
  }
  if (slug.includes('peeling')) {
    return 'Skin Renewal';
  }
  if (slug.includes('chromo')) {
    return 'Body Toning';
  }
  return 'Cryotherapy';
}

function inferBenefits(name: string): string[] {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('slimming') || lowerName.includes('therapie')) {
    return [
      'Non-invasive protocol led by certified practitioners',
      'Structured sessions tailored to your silhouette goals',
      'Comfort-focused treatment with visible progression tracking'
    ];
  }

  if (lowerName.includes('microblading')) {
    return [
      'Bespoke brow architecture for your face shape',
      'Refined pigment technique with natural finish',
      'Aftercare support for stable, elegant results'
    ];
  }

  return [
    'Consultation-led protocol tailored to your goals',
    'Clinic-grade technology and hygiene standards',
    'Personalized follow-up with visible milestone tracking'
  ];
}

function extractPhone(pages: OldManifestPage[]): string {
  const serialized = JSON.stringify(pages);
  const match = serialized.match(/\+\d{8,15}/);
  return match?.[0] || '+212653870216';
}

export function seedContent({ routeMap, pages }: SeedContentInput): {
  siteSettings: Record<string, unknown>;
  services: Record<string, unknown>;
  pageContent: Record<string, unknown>;
  blogPosts: SeededBlogPost[];
} {
  const primaryRouteMap = routeMap.filter((entry) => entry.path.startsWith('/en'));
  const phone = extractPhone(pages);
  const serviceEntries = primaryRouteMap.filter((entry) => entry.type === 'service');
  const blogEntries = primaryRouteMap.filter((entry) => entry.type === 'blogPost');
  const genericEntries = primaryRouteMap.filter(
    (entry) => entry.type === 'generic' || entry.type === 'utility' || entry.type === 'about'
  );
  const serviceImageBySlug: Record<string, string> = {
    chromo: '/images/services/chromo.jpg',
    'extension-de-cils-en-soie-et-kashmir': '/images/services/extensions.jpg',
    'micro-needling': '/images/services/micro-needling.jpg',
    microblading: '/images/services/microblading.jpg',
    'peeling-naturel-aux-algues': '/images/services/peeling.jpg',
    therapiefaciale: '/images/services/anti-age.jpg',
    therapiefroid: '/images/services/slimming.jpg'
  };
  const serviceGalleryBySlug: Record<string, string[]> = {
    chromo: [
      '/images/services/chromo.jpg',
      '/images/services/chromo-detail-1.jpg',
      '/images/services/chromo-detail-2.jpg'
    ],
    'extension-de-cils-en-soie-et-kashmir': [
      '/images/services/extensions.jpg',
      '/images/services/extensions-detail-1.jpg',
      '/images/services/extensions-detail-2.jpg'
    ],
    'micro-needling': [
      '/images/services/micro-needling.jpg',
      '/images/services/micro-needling-detail-1.jpg',
      '/images/services/micro-needling-detail-2.jpg'
    ],
    microblading: [
      '/images/services/microblading.jpg',
      '/images/services/microblading-detail-1.jpg',
      '/images/services/microblading-detail-2.jpg'
    ],
    'peeling-naturel-aux-algues': [
      '/images/services/peeling.jpg',
      '/images/services/peeling-detail-1.jpg',
      '/images/services/peeling-detail-2.jpg'
    ],
    therapiefaciale: [
      '/images/services/anti-age.jpg',
      '/images/services/anti-age-detail-1.jpg',
      '/images/services/anti-age-detail-2.jpg'
    ],
    therapiefroid: [
      '/images/services/slimming.jpg',
      '/images/services/slimming-detail-1.jpg',
      '/images/services/slimming-detail-2.jpg'
    ]
  };

  const services = serviceEntries.map((entry) => {
    const sourcePage = findPage(entry.path, pages);
    const serviceName = cleanTitle(sourcePage?.title || entry.title);

    return {
      slug: entry.slug,
      path: entry.path,
      name: serviceName,
      category: inferCategory(entry.slug),
      tagline: firstHeading(sourcePage) || `${serviceName} in Marrakech`,
      summary:
        sourcePage?.meta?.description ||
        'Premium protocol delivered by Ice Lady experts with consultation-led personalization.',
      benefits: inferBenefits(serviceName),
      duration: '45-60 min',
      priceNote: 'Price shared during consultation',
      featured: entry.slug === 'therapiefroid' || entry.slug === 'therapiefaciale',
      heroImage: serviceImageBySlug[entry.slug] || '/images/services/default.jpg',
      galleryImages: serviceGalleryBySlug[entry.slug] || [serviceImageBySlug[entry.slug] || '/images/services/default.jpg'],
      needsCopy: entry.needsCopy,
      seo: {
        title: entry.title,
        description: entry.description
      }
    };
  });

  const pagesByPath = genericEntries.map((entry) => {
    const sourcePage = findPage(entry.path, pages);
    const heading = firstHeading(sourcePage) || entry.title;

    return {
      path: entry.path,
      title: entry.title,
      description: entry.description,
      heading,
      intro:
        sourcePage?.meta?.description ||
        'This page is being refreshed to match our new premium clinic experience while preserving SEO continuity.',
      sections: [
        {
          title: 'Why This Page Matters',
          body: 'We preserved this URL to retain ranking equity and existing customer navigation habits.'
        },
        {
          title: 'Next Update',
          body: 'Finalize localized copy and treatment specifics once medical and brand review is complete.'
        }
      ],
      cta: {
        label: 'Book a consultation',
        href: '/en/pages/contact'
      },
      template: entry.path.includes('resultats') ? 'results' : 'default',
      needsCopy: true
    };
  });

  const blogPosts: SeededBlogPost[] = blogEntries.map((entry, index) => {
    const sourcePage = findPage(entry.path, pages);
    const heading = firstHeading(sourcePage) || entry.title;
    const highlights = (sourcePage?.headings?.h2 || []).filter(
      (item) => item && !isBoilerplateHeading(item)
    );

    const content = `## ${heading}

${sourcePage?.meta?.description || 'Premium guidance from the Ice Lady team in Marrakech.'}

${highlights
      .slice(0, 3)
      .map((point) => `- ${point}`)
      .join('\n')}

### Clinical Note

Every recommendation starts with an in-clinic consultation to confirm protocol suitability and expected outcomes.`;

    return {
      slug: entry.slug,
      path: entry.path,
      title: entry.title,
      description: entry.description,
      date: `2025-0${(index % 9) + 1}-01`,
      needsCopy: entry.needsCopy,
      content
    };
  });

  const siteSettings = {
    brand: 'Ice Lady',
    siteName: 'Ice Lady Marrakech',
    baseUrl: 'https://islady.ma',
    locale: 'en-MA',
    tagline: 'Cryotherapy & Advanced Beauty Rituals in Marrakech',
    description:
      'Ice Lady is a premium Marrakech clinic specializing in cryotherapy-led body and skin programs with personalized treatment plans.',
    hero: {
      eyebrow: 'Marrakech Premium Clinic',
      title: 'Sculpted Results Through Precision Cryotherapy',
      subtitle:
        'Private, consultation-led treatment journeys combining clinical rigor and luxury care for body contouring, skin renewal, and confidence.',
      image: '/images/hero-main.jpg',
      primaryCta: {
        label: 'Book Your Consultation',
        href: '/en/pages/contact'
      },
      secondaryCta: {
        label: 'Explore Services',
        href: '/en/collections/all'
      }
    },
    cryotherapy: {
      title: 'Cryotherapy Is Our Signature Expertise',
      description:
        'Ice Lady protocols combine thermal precision, practitioner supervision, and progress tracking to deliver visible yet natural outcomes.',
      image: '/images/cryotherapy-feature.png',
      bullets: [
        'Non-invasive alternative aligned with busy lifestyles',
        'Treatment plans adapted to your physiology and goals',
        'Premium hygiene, comfort, and post-session guidance'
      ]
    },
    contact: {
      phone,
      whatsapp: phone,
      email: 'contact@islady.ma',
      bookingLink: '/en/pages/contact',
      address: 'Immeuble STAVROULA rue Av. 4eme D.M.M Plateau N 13, Marrakesh 40010',
      mapProfileUrl: 'https://maps.app.goo.gl/YVsfcBbGLEgMMNwq5',
      mapEmbedUrl:
        'https://maps.google.com/maps?q=Immeuble%20STAVROULA%20rue%20Av.%204eme%20D.M.M%20Plateau%20N%2013,%20Marrakesh%2040010&t=&z=15&ie=UTF8&iwloc=&output=embed',
      hours: [
        'Monday - Friday: 10:00 - 19:00',
        'Saturday: 10:00 - 17:00',
        'Sunday: By appointment'
      ],
      needsCopy: true
    },
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/', needsCopy: true },
      { label: 'Facebook', href: 'https://www.facebook.com/', needsCopy: true }
    ],
    testimonials: [
      {
        quote:
          'Ice Lady gives the level of detail and follow-up I expect from a premium clinic. The care plan felt truly personal.',
        name: 'Clinic Guest',
        role: 'Marrakech',
        needsCopy: true
      },
      {
        quote:
          'The cryotherapy protocol was explained clearly and monitored closely. I appreciated the medical-grade discipline.',
        name: 'Returning Client',
        role: 'Body Program',
        needsCopy: true
      }
    ],
    faq: [
      {
        question: 'Do you accept online payments?',
        answer: 'No. Appointments are confirmed directly with the clinic team.',
        needsCopy: false
      },
      {
        question: 'Is cryotherapy suitable for everyone?',
        answer: 'Suitability is validated during your consultation before any protocol begins.',
        needsCopy: false
      },
      {
        question: 'How many sessions will I need?',
        answer:
          'Session count depends on your goals, treatment type, and practitioner recommendations after assessment.',
        needsCopy: false
      }
    ]
  };

  return {
    siteSettings,
    services: {
      categories: [
        {
          id: 'cryotherapy',
          title: 'Cryotherapy Programs',
          description: 'Body contouring and anti-aging protocols anchored in controlled cold therapy.'
        },
        {
          id: 'skin-and-brows',
          title: 'Skin & Brows',
          description: 'High-precision treatments for texture, tone, and facial definition.'
        },
        {
          id: 'beauty-enhancement',
          title: 'Beauty Enhancement',
          description: 'Curated finishing treatments for subtle, elegant refinement.'
        }
      ],
      services
    },
    pageContent: {
      pages: pagesByPath
    },
    blogPosts
  };
}
