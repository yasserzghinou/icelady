import { getSiteSettings } from '@/lib/content';
import translations from '@/content/translations.json';
import type { GenericPage } from '@/lib/content';
import { t, type Locale } from '@/lib/i18n';

type LocaleSiteCopy = {
  cryotherapyBullets: string[];
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    needsCopy: boolean;
  }>;
  faq: Array<{
    question: string;
    answer: string;
    needsCopy: boolean;
  }>;
  contactHours: string[];
};

const localeSiteCopy: Record<Locale, LocaleSiteCopy> = {
  fr: {
    cryotherapyBullets: [
      'Alternative non invasive adaptée aux rythmes de vie exigeants',
      'Protocoles ajustés à votre physiologie et à vos objectifs',
      'Hygiène premium, confort élevé et suivi post-séance personnalisé'
    ],
    testimonials: [
      {
        quote:
          'Ice Lady offre un niveau de précision et de suivi rare à Marrakech. Le protocole était vraiment personnalisé.',
        name: 'Cliente de la clinique',
        role: 'Marrakech',
        needsCopy: false
      },
      {
        quote:
          'Tout a été expliqué clairement avant la séance. J’ai apprécié la rigueur et l’accompagnement continu.',
        name: 'Cliente fidèle',
        role: 'Programme silhouette',
        needsCopy: false
      }
    ],
    faq: [
      {
        question: 'Proposez-vous un paiement en ligne ?',
        answer: 'Non. Les rendez-vous sont confirmés directement avec l’équipe de la clinique.',
        needsCopy: false
      },
      {
        question: 'La cryothérapie est-elle adaptée à tout le monde ?',
        answer: 'L’indication est validée en consultation avant le démarrage de tout protocole.',
        needsCopy: false
      },
      {
        question: 'Combien de séances sont nécessaires ?',
        answer: 'Le nombre de séances dépend de vos objectifs, de votre profil et de l’évaluation praticienne.',
        needsCopy: false
      }
    ],
    contactHours: [
      'Lundi - Vendredi : 10:00 - 19:00',
      'Samedi : 10:00 - 17:00',
      'Dimanche : Sur rendez-vous'
    ]
  },
  en: {
    cryotherapyBullets: [
      'Non-invasive alternative aligned with busy lifestyles',
      'Treatment plans adapted to your physiology and goals',
      'Premium hygiene, comfort, and post-session guidance'
    ],
    testimonials: [
      {
        quote:
          'Ice Lady gives the level of detail and follow-up I expect from a premium clinic. The care plan felt truly personal.',
        name: 'Clinic Guest',
        role: 'Marrakech',
        needsCopy: false
      },
      {
        quote:
          'The cryotherapy protocol was explained clearly and monitored closely. I appreciated the medical-grade discipline.',
        name: 'Returning Client',
        role: 'Body Program',
        needsCopy: false
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
    ],
    contactHours: [
      'Monday - Friday: 10:00 - 19:00',
      'Saturday: 10:00 - 17:00',
      'Sunday: By appointment'
    ]
  },
  ar: {
    cryotherapyBullets: [
      'بديل غير جراحي مناسب لوتيرة الحياة اليومية السريعة',
      'بروتوكولات مخصصة بحسب طبيعة الجسم والأهداف',
      'معايير نظافة عالية وراحة أثناء الجلسة ومتابعة بعد العلاج'
    ],
    testimonials: [
      {
        quote:
          'تجربة Ice Lady دقيقة وراقية، مع متابعة حقيقية لكل مرحلة من البرنامج.',
        name: 'عميلة العيادة',
        role: 'مراكش',
        needsCopy: false
      },
      {
        quote:
          'شرح واضح قبل الجلسة واحترافية في التنفيذ. المتابعة كانت ممتازة من البداية للنهاية.',
        name: 'عميلة مستمرة',
        role: 'برنامج نحت القوام',
        needsCopy: false
      }
    ],
    faq: [
      {
        question: 'هل يتوفر الدفع الإلكتروني؟',
        answer: 'لا. يتم تأكيد المواعيد مباشرة مع فريق العيادة.',
        needsCopy: false
      },
      {
        question: 'هل العلاج بالتبريد مناسب للجميع؟',
        answer: 'يتم التأكد من الملاءمة خلال الاستشارة قبل بدء أي بروتوكول علاجي.',
        needsCopy: false
      },
      {
        question: 'كم عدد الجلسات التي أحتاجها؟',
        answer: 'عدد الجلسات يختلف حسب الهدف والحالة وتقييم المختص بعد المعاينة.',
        needsCopy: false
      }
    ],
    contactHours: [
      'الاثنين - الجمعة: 10:00 - 19:00',
      'السبت: 10:00 - 17:00',
      'الأحد: حسب الموعد'
    ]
  }
};

const genericPhraseMap: Record<Locale, Record<string, string>> = {
  fr: {
    'This page is being refreshed to match our new premium clinic experience while preserving SEO continuity.':
      'Cette page est en cours d’actualisation pour refléter notre nouvelle expérience premium tout en préservant la continuité SEO.',
    'Why This Page Matters': 'Pourquoi cette page est importante',
    'We preserved this URL to retain ranking equity and existing customer navigation habits.':
      'Nous avons conservé cette URL afin de préserver les acquis SEO et les habitudes de navigation existantes.',
    'Next Update': 'Prochaine mise à jour',
    'Finalize localized copy and treatment specifics once medical and brand review is complete.':
      'La version finale localisée et les détails de soins seront publiés après validation médicale et éditoriale.',
    'Book a consultation': 'Demander un rendez-vous',
    'Your Shopping Cart': 'Votre panier',
    'Your cart': 'Votre panier',
    Search: 'Recherche'
  },
  en: {},
  ar: {
    'This page is being refreshed to match our new premium clinic experience while preserving SEO continuity.':
      'يتم تحديث هذه الصفحة لتتماشى مع التجربة الجديدة الفاخرة مع الحفاظ الكامل على استمرارية SEO.',
    'Why This Page Matters': 'لماذا هذه الصفحة مهمة',
    'We preserved this URL to retain ranking equity and existing customer navigation habits.':
      'حافظنا على هذا الرابط للحفاظ على قوة الترتيب في نتائج البحث واستمرارية وصول العملاء.',
    'Next Update': 'التحديث القادم',
    'Finalize localized copy and treatment specifics once medical and brand review is complete.':
      'سيتم اعتماد النسخة المحلية النهائية وتفاصيل العلاجات بعد المراجعة الطبية والتحريرية.',
    'Book a consultation': 'اطلب موعدًا',
    'Your Shopping Cart': 'سلة التسوق',
    'Your cart': 'سلة التسوق',
    Search: 'البحث'
  }
};

function mapPhrase(locale: Locale, value: string): string {
  if (locale === 'en') {
    return value;
  }

  return genericPhraseMap[locale][value] || value;
}

export function getLocalizedSiteSettings(locale: Locale) {
  const siteSettings = getSiteSettings();
  const trans = translations[locale] || translations.en;
  const localCopy = localeSiteCopy[locale] || localeSiteCopy.en;

  return {
    ...siteSettings,
    locale: `${locale}-MA`,
    tagline: trans.brandTagline,
    hero: {
      ...siteSettings.hero,
      eyebrow: trans.heroEyebrow,
      title: trans.heroTitle,
      subtitle: trans.heroSubtitle,
      primaryCta: {
        ...siteSettings.hero.primaryCta,
        label: trans.heroPrimaryCta
      },
      secondaryCta: {
        ...siteSettings.hero.secondaryCta,
        label: trans.heroSecondaryCta
      }
    },
    cryotherapy: {
      ...siteSettings.cryotherapy,
      title: trans.cryoTitle,
      description: trans.cryoDescription,
      bullets: localCopy.cryotherapyBullets
    },
    contact: {
      ...siteSettings.contact,
      hours:
        Array.isArray(siteSettings.contact.hours) && siteSettings.contact.hours.length > 0
          ? siteSettings.contact.hours
          : localCopy.contactHours
    },
    testimonials: localCopy.testimonials,
    faq: localCopy.faq,
    faqTitle: trans.faqTitle,
    mapTitle: trans.mapTitle,
    contactPage: {
      title: trans.contactTitle,
      intro: trans.contactIntro,
      paymentNote: trans.paymentNote
    }
  };
}

export function localizeGenericPage(page: GenericPage, locale: Locale): GenericPage {
  if (locale === 'en') {
    return page;
  }

  return {
    ...page,
    title: mapPhrase(locale, page.title),
    heading: mapPhrase(locale, page.heading),
    intro: mapPhrase(locale, page.intro),
    sections: page.sections.map((section) => ({
      ...section,
      title: mapPhrase(locale, section.title),
      body: mapPhrase(locale, section.body)
    })),
    cta: {
      ...page.cta,
      label: page.cta.label === 'Book a consultation' ? t(locale, 'cta.requestAppointment') : mapPhrase(locale, page.cta.label)
    }
  };
}
