import { getAllBlogPosts, getServices } from '@/lib/content';
import { getServicesDataAsync } from '@/lib/admin/store';
import type { Locale } from '@/lib/i18n';

type ServiceCopy = {
  name: string;
  summary: string;
  category: string;
  tagline: string;
};

const serviceTranslations: Record<string, Record<Locale, ServiceCopy>> = {
  chromo: {
    en: {
      name: 'Chromotherapy in Marrakech',
      category: 'Body Toning',
      tagline: 'Targeted Chromotherapy',
      summary:
        'Chromotherapy uses specific light frequencies to support drainage, improve skin comfort, and complement anti-cellulite programs.'
    },
    fr: {
      name: 'Chromothérapie à Marrakech',
      category: 'Tonification du corps',
      tagline: 'Chromothérapie ciblée',
      summary:
        'La chromothérapie utilise des longueurs d’onde spécifiques pour accompagner le drainage, améliorer le confort cutané et soutenir les protocoles anti-cellulite.'
    },
    ar: {
      name: 'العلاج اللوني في مراكش',
      category: 'تناغم وشدّ الجسم',
      tagline: 'جلسات علاج لوني موجهة',
      summary:
        'يعتمد العلاج اللوني على أطوال موجية محددة لدعم التصريف وتحسين مظهر الجلد والمساندة ضمن بروتوكولات مكافحة السيلوليت.'
    }
  },
  'extension-de-cils-en-soie-et-kashmir': {
    en: {
      name: 'Silk & Kashmir Eyelash Extensions',
      category: 'Eyes',
      tagline: 'Elegant Natural Volume',
      summary:
        'Ultra-light extensions that elevate the gaze with refined definition and better hold, tailored to your eye shape.'
    },
    fr: {
      name: 'Extensions de cils soie & Kashmir',
      category: 'Regard',
      tagline: 'Volume élégant et naturel',
      summary:
        'Extensions ultra-légères pour intensifier le regard avec une tenue optimisée et un rendu raffiné, adapté à la morphologie de vos yeux.'
    },
    ar: {
      name: 'تمديد رموش حرير وكشمير',
      category: 'العينان',
      tagline: 'حجم أنيق بمظهر طبيعي',
      summary:
        'رموش خفيفة للغاية تمنح كثافة راقية وثباتًا أفضل مع تصميم متناسب مع شكل العين.'
    }
  },
  'micro-needling': {
    en: {
      name: 'Micro-Needling in Marrakech',
      category: 'Skin & Texture',
      tagline: 'Targeted Skin Regeneration',
      summary:
        'A non-invasive protocol designed to improve skin texture, reduce visible imperfections, and stimulate healthier skin quality.'
    },
    fr: {
      name: 'Micro-Needling à Marrakech',
      category: 'Peau & texture',
      tagline: 'Régénération ciblée de la peau',
      summary:
        'Soin non invasif pour améliorer la texture, réduire l’apparence des marques et stimuler la qualité globale de la peau.'
    },
    ar: {
      name: 'مايكرونيدلينغ في مراكش',
      category: 'البشرة والملمس',
      tagline: 'تجديد دقيق للبشرة',
      summary:
        'علاج غير جراحي يساعد على تحسين ملمس البشرة وتقليل آثار العيوب وتعزيز جودة الجلد بشكل عام.'
    }
  },
  microblading: {
    en: {
      name: 'Microblading in Marrakech',
      category: 'Brows',
      tagline: 'Bespoke Brow Architecture',
      summary:
        'A precise artistic method to redesign brows with a natural finish that harmonizes with your facial structure.'
    },
    fr: {
      name: 'Microblading à Marrakech',
      category: 'Sourcils',
      tagline: 'Architecture sourcils sur mesure',
      summary:
        'Technique artistique et précise pour redessiner les sourcils avec un résultat naturel, harmonisé à votre visage.'
    },
    ar: {
      name: 'الميكروبليدنج في مراكش',
      category: 'الحواجب',
      tagline: 'تصميم حواجب مخصص',
      summary:
        'تقنية دقيقة لإعادة تشكيل الحواجب بنتيجة طبيعية ومتوازنة مع ملامح الوجه.'
    }
  },
  'peeling-naturel-aux-algues': {
    en: {
      name: 'Natural Seaweed Peeling',
      category: 'Skin Renewal',
      tagline: 'Progressive Brightness & Smoothing',
      summary:
        'A natural peel that smooths skin texture, reduces visible irregularities, and restores a clearer, more radiant tone.'
    },
    fr: {
      name: 'Peeling naturel aux algues',
      category: 'Renouvellement cutané',
      tagline: 'Éclat et lissage progressif',
      summary:
        'Peeling naturel pour lisser le grain de peau, réduire les irrégularités et raviver l’éclat du teint.'
    },
    ar: {
      name: 'تقشير طبيعي بالطحالب',
      category: 'تجديد البشرة',
      tagline: 'نضارة ونعومة تدريجية',
      summary:
        'تقشير طبيعي يساعد على تنعيم ملمس البشرة وتقليل الشوائب واستعادة الإشراقة.'
    }
  },
  therapiefaciale: {
    en: {
      name: 'Anti-Aging Program (Cryotherapy)',
      category: 'Facial Cryotherapy',
      tagline: 'Firmness & Radiance',
      summary:
        'A cryotherapy anti-aging protocol to tone tissues, support microcirculation, and refresh facial contours with visible vitality.'
    },
    fr: {
      name: 'Programme Anti-Âge (Cryothérapie)',
      category: 'Cryothérapie visage',
      tagline: 'Raffermissement et éclat',
      summary:
        'Programme anti-âge par le froid pour tonifier les tissus, soutenir la microcirculation et revitaliser les traits du visage.'
    },
    ar: {
      name: 'برنامج مضاد للشيخوخة (العلاج بالتبريد)',
      category: 'عناية الوجه بالتبريد',
      tagline: 'شدّ وإشراقة',
      summary:
        'برنامج تبريد مضاد للتقدم بالعمر يدعم تماسك البشرة ويحسن الدورة الدموية الدقيقة ويعيد الحيوية للوجه.'
    }
  },
  therapiefroid: {
    en: {
      name: 'Slimming Program (Cryotherapy)',
      category: 'Body Cryotherapy',
      tagline: 'Non-Invasive Body Sculpting',
      summary:
        'A cold-based slimming protocol targeting localized fat, supporting lymphatic drainage, and enhancing body definition without surgery.'
    },
    fr: {
      name: 'Programme Minceur (Cryothérapie)',
      category: 'Cryothérapie silhouette',
      tagline: 'Sculpture corporelle non invasive',
      summary:
        'Programme minceur par le froid pour cibler les amas localisés, améliorer le drainage et accompagner la redéfinition de la silhouette.'
    },
    ar: {
      name: 'برنامج النحت والتنحيف (العلاج بالتبريد)',
      category: 'نحت القوام بالتبريد',
      tagline: 'نحت غير جراحي للجسم',
      summary:
        'برنامج تبريد للتنحيف يستهدف الدهون الموضعية ويدعم التصريف اللمفاوي ويساعد على إعادة تحديد القوام.'
    }
  }
};

const blogTranslations: Record<
  string,
  {
    fr: { title: string; description: string };
    en: { title: string; description: string };
    ar: { title: string; description: string };
  }
> = {
  'clinique-de-cryolipolyse-a-marrakech-traitement-de-perte-de-poids-avance': {
    fr: {
      title: 'Clinique de cryolipolyse à Marrakech: traitement avancé',
      description:
        'Comment une approche encadrée de cryolipolyse peut accompagner vos objectifs de remodelage corporel en toute sécurité.'
    },
    en: {
      title: 'Cryolipolysis Clinic in Marrakech: Advanced Body Contouring Support',
      description:
        'How a supervised cryolipolysis protocol can support body contouring goals with comfort and clinical discipline.'
    },
    ar: {
      title: 'عيادة كريوليبوليز في مراكش: دعم متقدم لنحت الجسم',
      description:
        'كيف يمكن لبروتوكول كريوليبوليز بإشراف مختص أن يدعم أهداف نحت القوام بأمان وراحة.'
    }
  },
  'meilleures-methodes-de-perte-de-poids-en-2023': {
    fr: {
      title: 'Meilleures méthodes de perte de poids',
      description: 'Les leviers clés à combiner intelligemment pour progresser durablement vers vos objectifs de silhouette.'
    },
    en: {
      title: 'Best Weight-Loss Methods',
      description: 'The key levers to combine effectively for sustainable, measurable body-shape progress.'
    },
    ar: {
      title: 'أفضل طرق خسارة الوزن',
      description: 'أهم العوامل التي يمكن الجمع بينها بذكاء لتحقيق تقدم مستدام في أهداف الرشاقة.'
    }
  },
  prendre_controle_de_votre_poids: {
    fr: {
      title: 'Reprendre le contrôle de votre poids',
      description: 'Pourquoi la maîtrise du poids peut améliorer la confiance, l’énergie et la qualité de vie au quotidien.'
    },
    en: {
      title: 'Taking Control of Your Weight',
      description: 'Why weight management can elevate confidence, energy, and everyday well-being.'
    },
    ar: {
      title: 'استعادة التحكم في الوزن',
      description: 'كيف ينعكس تنظيم الوزن على الثقة والطاقة وجودة الحياة اليومية.'
    }
  },
  trouvez_le_bonheur_en_prenant_soin_de_votre_corps_en_meditant: {
    fr: {
      title: 'Bien-être: corps, méditation et équilibre',
      description: 'Un regard pratique sur le lien entre soins corporels, régularité mentale et qualité de vie globale.'
    },
    en: {
      title: 'Well-Being Through Body Care and Meditation',
      description: 'A practical perspective on the link between body care, mental rhythm, and better life balance.'
    },
    ar: {
      title: 'الرفاه عبر العناية بالجسم والتأمل',
      description: 'نظرة عملية إلى العلاقة بين العناية الجسدية والاتزان الذهني وجودة الحياة.'
    }
  }
};

const blogContentTranslations: Partial<Record<string, Record<Locale, string>>> = {
  'clinique-de-cryolipolyse-a-marrakech-traitement-de-perte-de-poids-avance': {
    fr: '',
    en: `## Why Cryolipolysis Requires Clinical Supervision

Cryolipolysis can support silhouette refinement when treatment parameters are tailored to your body profile and goals.

- Initial consultation confirms indications and expectations
- Sessions are scheduled with progressive monitoring
- Protocol adjustments are made based on visible response

### Clinical Note

Every plan is confirmed in-clinic before starting treatment.`,
    ar: `## لماذا يحتاج الكريوليبوليز إلى إشراف سريري

يساعد الكريوليبوليز في تحسين القوام عندما يتم ضبط البروتوكول حسب الحالة والأهداف.

- الاستشارة الأولى تحدد الملاءمة والنتائج المتوقعة
- الجلسات تُبرمج مع متابعة تدريجية
- يتم تعديل البروتوكول وفق تطور الاستجابة

### ملاحظة علاجية

يتم اعتماد الخطة داخل العيادة قبل بدء أي جلسة.`
  },
  'meilleures-methodes-de-perte-de-poids-en-2023': {
    fr: '',
    en: `## Effective Weight-Loss Strategy

Sustainable progress comes from combining structured care, movement, and nutritional discipline.

- Set measurable milestones with your practitioner
- Prioritize realistic weekly consistency
- Use non-invasive protocols as support, not shortcuts`,
    ar: `## استراتيجية فعالة لخسارة الوزن

النتائج المستدامة تأتي من دمج العناية المنظمة والنشاط البدني والانضباط الغذائي.

- تحديد مؤشرات واضحة مع المختص
- الالتزام المنتظم أسبوعيًا
- استخدام العلاجات غير الجراحية كدعم وليس كحل سريع`
  },
  prendre_controle_de_votre_poids: {
    fr: '',
    en: `## Taking Control Starts with Structure

Long-term weight control is easier when you follow a clear plan and regular follow-up.

- Clarify your priorities (health, silhouette, energy)
- Build a weekly rhythm you can maintain
- Reassess with your clinic team at each milestone`,
    ar: `## التحكم يبدأ بخطة واضحة

التحكم طويل المدى في الوزن يصبح أسهل مع برنامج منظم ومتابعة منتظمة.

- تحديد الأولويات: الصحة، القوام، والطاقة
- بناء روتين أسبوعي قابل للاستمرار
- مراجعة التقدم مع الفريق العلاجي بشكل دوري`
  },
  trouvez_le_bonheur_en_prenant_soin_de_votre_corps_en_meditant: {
    fr: '',
    en: `## Body Care and Mental Balance

Physical care and mental calm reinforce each other. A balanced routine improves consistency and recovery.

- Keep rituals simple and repeatable
- Pair treatment sessions with stress-reduction habits
- Protect sleep quality to support visible skin and body outcomes`,
    ar: `## العناية بالجسم والتوازن الذهني

العناية الجسدية والهدوء الذهني يعززان النتائج معًا. الروتين المتوازن يرفع الالتزام وجودة التعافي.

- اعتماد خطوات بسيطة وقابلة للاستمرار
- ربط الجلسات العلاجية بعادات تقليل التوتر
- تحسين جودة النوم لدعم نتائج البشرة والقوام`
  }
};

const defaultBenefitsByLocale: Record<Locale, string[]> = {
  en: [
    'Consultation-led protocol tailored to your goals',
    'Clinic-grade technology and hygiene standards',
    'Personalized follow-up with visible milestone tracking'
  ],
  fr: [
    'Protocole ajusté en consultation selon vos objectifs',
    'Technologie de niveau clinique et standards d’hygiène premium',
    'Suivi personnalisé avec étapes de progression visibles'
  ],
  ar: [
    'بروتوكول مخصص بعد الاستشارة وفق أهدافك',
    'تقنيات بمعايير عيادية مع مستوى عالٍ من النظافة',
    'متابعة شخصية مع قياس واضح لتطور النتائج'
  ]
};

const benefitTranslationsBySlug: Record<string, Record<Locale, string[]>> = {
  microblading: {
    en: [
      'Bespoke brow architecture for your face shape',
      'Refined pigment technique with natural finish',
      'Aftercare support for stable, elegant results'
    ],
    fr: [
      'Architecture de sourcils sur mesure selon votre morphologie',
      'Technique pigmentaire précise pour un rendu naturel',
      'Accompagnement post-soin pour un résultat stable et élégant'
    ],
    ar: [
      'تصميم حواجب مخصص بما يناسب ملامح الوجه',
      'تقنية صبغ دقيقة بنتيجة طبيعية وراقية',
      'متابعة بعد الجلسة لضمان ثبات النتيجة بأناقة'
    ]
  },
  therapiefroid: {
    en: [
      'Non-invasive protocol led by certified practitioners',
      'Structured sessions tailored to your silhouette goals',
      'Comfort-focused treatment with visible progression tracking'
    ],
    fr: [
      'Protocole non invasif encadré par des praticiennes certifiées',
      'Séances structurées selon vos objectifs silhouette',
      'Confort de traitement et suivi visible de la progression'
    ],
    ar: [
      'بروتوكول غير جراحي بإشراف مختصات معتمدات',
      'جلسات منظمة ومصممة لأهداف نحت القوام',
      'راحة أثناء العلاج مع متابعة واضحة لتطور النتائج'
    ]
  }
};

const priceNoteByLocale: Record<Locale, string> = {
  en: 'Price shared during consultation',
  fr: 'Tarif communiqué lors de la consultation',
  ar: 'يتم تحديد السعر أثناء الاستشارة'
};

function getLocalizedBenefits(slug: string, locale: Locale): string[] {
  return benefitTranslationsBySlug[slug]?.[locale] || defaultBenefitsByLocale[locale];
}

export function getLocalizedServices(locale: Locale) {
  return localizeServices(getServices(), locale);
}

export async function getLocalizedServicesAsync(locale: Locale) {
  const payload = await getServicesDataAsync();
  return localizeServices(payload.services, locale);
}

function localizeServices(services: ReturnType<typeof getServices>, locale: Locale) {

  return services.map((service) => {
    const localizedBase = {
      ...service,
      benefits: getLocalizedBenefits(service.slug, locale),
      priceNote: priceNoteByLocale[locale]
    };

    if (locale === 'en') {
      return localizedBase;
    }

    const adminTrans = service.translations?.[locale];
    const fallbackTrans = serviceTranslations[service.slug]?.[locale];

    const name = adminTrans?.name || fallbackTrans?.name || localizedBase.name;
    const category = adminTrans?.category || fallbackTrans?.category || localizedBase.category;
    const tagline = adminTrans?.tagline || fallbackTrans?.tagline || localizedBase.tagline;
    const summary = adminTrans?.summary || fallbackTrans?.summary || localizedBase.summary;

    return {
      ...localizedBase,
      name,
      category,
      tagline,
      summary,
      seo: {
        ...localizedBase.seo,
        title: adminTrans?.seo?.title || fallbackTrans?.name || localizedBase.seo.title || name,
        description:
          adminTrans?.seo?.description || fallbackTrans?.summary || localizedBase.seo.description || summary
      }
    };
  });
}

export function getLocalizedBlogPosts(locale: Locale) {
  const posts = getAllBlogPosts();

  return posts.map((post) => {
    const trans = blogTranslations[post.slug]?.[locale];
    if (!trans) {
      return post;
    }

    return {
      ...post,
      title: trans.title,
      description: trans.description,
      content:
        locale === 'fr'
          ? post.content
          : blogContentTranslations[post.slug]?.[locale] || post.content
    };
  });
}
