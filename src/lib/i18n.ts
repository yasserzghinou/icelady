export const SUPPORTED_LOCALES = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

export const localeLabel: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR'
};

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية'
};

export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  ar: 'rtl'
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function detectLocaleFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0] || '';
  if (isLocale(first)) {
    return first;
  }

  if (first === 'en') {
    return 'en';
  }

  return DEFAULT_LOCALE;
}

export function stripLeadingLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) {
    return '/';
  }

  const first = parts[0];
  if (isLocale(first) || first === 'en') {
    const remaining = parts.slice(1);
    return remaining.length ? `/${remaining.join('/')}` : '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function withLocale(pathname: string, locale: Locale): string {
  const corePath = stripLeadingLocale(pathname);
  const normalizedCore = corePath.startsWith('/') ? corePath : `/${corePath}`;

  if (normalizedCore === '/') {
    return `/${locale}`;
  }

  return `/${locale}${normalizedCore}`;
}

export type TranslationKey =
  | 'nav.home'
  | 'nav.services'
  | 'nav.journal'
  | 'nav.contact'
  | 'cta.book'
  | 'cta.requestAppointment'
  | 'sections.serviceMenu'
  | 'sections.curatedCatalogue'
  | 'sections.signatureExpertise'
  | 'sections.socialProof'
  | 'sections.faq'
  | 'sections.visit'
  | 'sections.exploreCryo'
  | 'journal.title'
  | 'journal.subtitle'
  | 'journal.readArticle'
  | 'services.title'
  | 'services.subtitle'
  | 'services.viewTreatment'
  | 'services.duration'
  | 'services.pricing'
  | 'services.bookConsultation'
  | 'contact.openingHours'
  | 'contact.phone'
  | 'contact.whatsapp'
  | 'contact.email'
  | 'contact.address'
  | 'contact.openMaps'
  | 'contact.phoneWhatsapp'
  | 'footer.navigate'
  | 'footer.contact'
  | 'sections.socialProofTitle'
  | 'sections.marrakechClinic'
  | 'hero.flagshipLabel'
  | 'hero.flagshipTitle'
  | 'hero.flagshipDescription'
  | 'generic.seoPreservedRoute'
  | 'generic.preservedUrl'
  | 'generic.contactIceLady'
  | 'errors.pageNotFoundTitle'
  | 'errors.pageNotFoundDescription'
  | 'errors.serviceNotFoundTitle'
  | 'errors.serviceNotFoundDescription'
  | 'errors.articleNotFoundTitle'
  | 'errors.articleNotFoundDescription';

const translations: Record<Locale, Record<TranslationKey, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Soins',
    'nav.journal': 'Journal',
    'nav.contact': 'Contact',
    'cta.book': 'Réserver',
    'cta.requestAppointment': 'Demander un rendez-vous',
    'sections.serviceMenu': 'Carte des Soins',
    'sections.curatedCatalogue': 'Catalogue de Soins',
    'sections.signatureExpertise': 'Expertise Signature',
    'sections.socialProof': 'Avis Clients',
    'sections.faq': 'FAQ',
    'sections.visit': 'Visiter Ice Lady',
    'sections.exploreCryo': 'Découvrir la cryothérapie',
    'journal.title': 'Le Journal Ice Lady',
    'journal.subtitle':
      'Conseils pratiques et perspectives cliniques sur la cryothérapie, la beauté et le bien-être.',
    'journal.readArticle': 'Lire l’article',
    'services.title': 'Menu des Soins',
    'services.subtitle':
      'Choisissez un soin pour consulter ses bénéfices, son protocole et les recommandations de consultation.',
    'services.viewTreatment': 'Voir le soin',
    'services.duration': 'Durée',
    'services.pricing': 'Tarif',
    'services.bookConsultation': 'Réserver une consultation',
    'contact.openingHours': 'Horaires d’ouverture',
    'contact.phone': 'Téléphone',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.openMaps': 'Ouvrir dans Google Maps',
    'contact.phoneWhatsapp': 'Téléphone / WhatsApp',
    'footer.navigate': 'Navigation',
    'footer.contact': 'Contact',
    'sections.socialProofTitle': 'Ce que nos clientes disent d’Ice Lady',
    'sections.marrakechClinic': 'Clinique de Marrakech',
    'hero.flagshipLabel': 'Soin signature',
    'hero.flagshipTitle': 'Programme Sculpt Cryothérapie',
    'hero.flagshipDescription': 'Protocole personnalisé avec suivi premium en clinique.',
    'generic.seoPreservedRoute': 'URL SEO préservée',
    'generic.preservedUrl': 'URL conservée',
    'generic.contactIceLady': 'Contacter Ice Lady',
    'errors.pageNotFoundTitle': 'Page introuvable',
    'errors.pageNotFoundDescription': 'La page demandée est introuvable.',
    'errors.serviceNotFoundTitle': 'Service introuvable',
    'errors.serviceNotFoundDescription': 'Le service Ice Lady demandé est introuvable.',
    'errors.articleNotFoundTitle': 'Article introuvable',
    'errors.articleNotFoundDescription': 'L’article demandé est introuvable.'
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.journal': 'Journal',
    'nav.contact': 'Contact',
    'cta.book': 'Book',
    'cta.requestAppointment': 'Request Appointment',
    'sections.serviceMenu': 'Service Menu',
    'sections.curatedCatalogue': 'Curated Treatment Catalogue',
    'sections.signatureExpertise': 'Signature Expertise',
    'sections.socialProof': 'Social Proof',
    'sections.faq': 'FAQ',
    'sections.visit': 'Visit Ice Lady',
    'sections.exploreCryo': 'Explore Cryotherapy',
    'journal.title': 'The Ice Lady Journal',
    'journal.subtitle':
      'Practical guidance and clinic perspectives on cryotherapy, beauty, and wellness protocols.',
    'journal.readArticle': 'Read article',
    'services.title': 'Treatment Menu',
    'services.subtitle':
      'Select a service to review treatment benefits, protocol details, and consultation guidance.',
    'services.viewTreatment': 'View treatment',
    'services.duration': 'Duration',
    'services.pricing': 'Pricing',
    'services.bookConsultation': 'Book Consultation',
    'contact.openingHours': 'Opening Hours',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.openMaps': 'Open in Google Maps',
    'contact.phoneWhatsapp': 'Phone / WhatsApp',
    'footer.navigate': 'Navigate',
    'footer.contact': 'Contact',
    'sections.socialProofTitle': 'What Clients Say About Ice Lady',
    'sections.marrakechClinic': 'Marrakech Clinic',
    'hero.flagshipLabel': 'Flagship',
    'hero.flagshipTitle': 'Cryotherapy Sculpt Program',
    'hero.flagshipDescription': 'Personalized protocol with premium clinic follow-up.',
    'generic.seoPreservedRoute': 'SEO Preserved Route',
    'generic.preservedUrl': 'Preserved URL',
    'generic.contactIceLady': 'Contact Ice Lady',
    'errors.pageNotFoundTitle': 'Page Not Found',
    'errors.pageNotFoundDescription': 'The requested page could not be found.',
    'errors.serviceNotFoundTitle': 'Service Not Found',
    'errors.serviceNotFoundDescription': 'The requested Ice Lady service could not be found.',
    'errors.articleNotFoundTitle': 'Article Not Found',
    'errors.articleNotFoundDescription': 'The requested article could not be found.'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.journal': 'المجلة',
    'nav.contact': 'اتصل بنا',
    'cta.book': 'احجز',
    'cta.requestAppointment': 'اطلب موعدًا',
    'sections.serviceMenu': 'قائمة الخدمات',
    'sections.curatedCatalogue': 'كتالوج العلاجات',
    'sections.signatureExpertise': 'خبرتنا المميزة',
    'sections.socialProof': 'آراء العملاء',
    'sections.faq': 'الأسئلة الشائعة',
    'sections.visit': 'زيارة آيس ليدي',
    'sections.exploreCryo': 'اكتشف العلاج بالتبريد',
    'journal.title': 'مجلة آيس ليدي',
    'journal.subtitle': 'إرشادات عملية ورؤى سريرية حول العلاج بالتبريد والجمال والعافية.',
    'journal.readArticle': 'اقرأ المقال',
    'services.title': 'قائمة العلاجات',
    'services.subtitle': 'اختر خدمة للاطلاع على الفوائد والتفاصيل والتوصيات قبل الحجز.',
    'services.viewTreatment': 'عرض الخدمة',
    'services.duration': 'المدة',
    'services.pricing': 'السعر',
    'services.bookConsultation': 'احجز استشارة',
    'contact.openingHours': 'ساعات العمل',
    'contact.phone': 'الهاتف',
    'contact.whatsapp': 'واتساب',
    'contact.email': 'البريد الإلكتروني',
    'contact.address': 'العنوان',
    'contact.openMaps': 'افتح في خرائط Google',
    'contact.phoneWhatsapp': 'الهاتف / واتساب',
    'footer.navigate': 'التصفح',
    'footer.contact': 'اتصل بنا',
    'sections.socialProofTitle': 'آراء عميلات آيس ليدي',
    'sections.marrakechClinic': 'عيادة مراكش',
    'hero.flagshipLabel': 'العلاج المميز',
    'hero.flagshipTitle': 'برنامج نحت القوام بالتبريد',
    'hero.flagshipDescription': 'بروتوكول مخصص مع متابعة فاخرة داخل العيادة.',
    'generic.seoPreservedRoute': 'مسار SEO محفوظ',
    'generic.preservedUrl': 'رابط محفوظ',
    'generic.contactIceLady': 'تواصل مع آيس ليدي',
    'errors.pageNotFoundTitle': 'الصفحة غير موجودة',
    'errors.pageNotFoundDescription': 'الصفحة المطلوبة غير متوفرة.',
    'errors.serviceNotFoundTitle': 'الخدمة غير موجودة',
    'errors.serviceNotFoundDescription': 'الخدمة المطلوبة من آيس ليدي غير متوفرة.',
    'errors.articleNotFoundTitle': 'المقال غير موجود',
    'errors.articleNotFoundDescription': 'المقال المطلوب غير متوفر.'
  }
};

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export function localizePath(pathname: string, locale: Locale): string {
  if (/^[a-z][a-z\d+\-.]*:/i.test(pathname) || pathname.startsWith('//')) {
    return pathname;
  }

  const cleaned = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleaned === '/en') {
    return `/${locale}`;
  }

  if (cleaned.startsWith('/en/')) {
    return cleaned.replace('/en/', `/${locale}/`);
  }

  return withLocale(cleaned, locale);
}
