import type { Locale } from '@/lib/i18n';
import type { ServiceLandingCopy, ServiceLandingFaq, ServiceLandingReview } from '@/lib/serviceLandingTemplate';

type Localized<T> = Record<Locale, T>;

type LandingCardSeed = {
  title: string;
  description: string;
  meta?: string;
  href: string;
};

type LandingStepSeed = {
  title: string;
  description: string;
};

type LandingZoneSeed = {
  id: string;
  label: string;
  description: string;
};

type LandingBeforeAfterSeed = {
  title: string;
  note: string;
};

type LandingProfile = {
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  contactTitle: Localized<string>;
  contactSubtitle: Localized<string>;
  highlights: Localized<string[]>;
  heroEyebrow: Localized<string>;
  heroTitle: Localized<string>;
  heroSubtitle: Localized<string>;
  signatureTitle: Localized<string>;
  signatureLine: Localized<string>;
  trustSignals: Localized<string[]>;
  catalogueDescription: Localized<string>;
  cards: Localized<LandingCardSeed[]>;
  processDescription: Localized<string>;
  processSteps: Localized<LandingStepSeed[]>;
  leadZoneOptions: Localized<string[]>;
  zonesDescription: Localized<string>;
  zonesTabs: Localized<LandingZoneSeed[]>;
  outcomesDescription: Localized<string>;
  beforeAfter: Localized<LandingBeforeAfterSeed[]>;
  reviews: Localized<ServiceLandingReview[]>;
  disclaimer: Localized<string>;
  safetyContra: Localized<string>;
  safetyComfort: Localized<string>;
  safetyHygiene: Localized<string>;
  faqs: Localized<ServiceLandingFaq[]>;
  visitTitle: Localized<string>;
  visitIntro: Localized<string>;
  finalTitle: Localized<string>;
  finalDescription: Localized<string>;
};

const navByLocale: Localized<Array<{ id: string; label: string }>> = {
  fr: [
    { id: 'catalogue', label: 'Soins' },
    { id: 'process', label: 'Parcours' },
    { id: 'zones', label: 'Zones' },
    { id: 'results', label: 'Resultats' },
    { id: 'safety', label: 'Securite' },
    { id: 'faq', label: 'FAQ' },
    { id: 'visit', label: 'Visite' }
  ],
  en: [
    { id: 'catalogue', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'zones', label: 'Focus Areas' },
    { id: 'results', label: 'Outcomes' },
    { id: 'safety', label: 'Safety' },
    { id: 'faq', label: 'FAQ' },
    { id: 'visit', label: 'Visit' }
  ],
  ar: [
    { id: 'catalogue', label: 'الخدمات' },
    { id: 'process', label: 'المسار' },
    { id: 'zones', label: 'المناطق' },
    { id: 'results', label: 'النتائج' },
    { id: 'safety', label: 'السلامة' },
    { id: 'faq', label: 'الاسئلة' },
    { id: 'visit', label: 'الزيارة' }
  ]
};

const commonReviews: Localized<ServiceLandingReview[]> = {
  fr: [
    {
      quote: 'Equipe claire, protocole bien explique et tres bon suivi apres la seance.',
      name: 'Avis Google',
      role: 'Cliente verifiee - Marrakech'
    },
    {
      quote: 'Le parcours est personnalise et le confort est bien gere pendant le soin.',
      name: 'Avis Google',
      role: 'Cliente verifiee - Ice Lady'
    },
    {
      quote: 'Approche professionnelle, hygiene serieuse et communication rapide.',
      name: 'Avis Google',
      role: 'Cliente verifiee - Programme premium'
    }
  ],
  en: [
    {
      quote: 'Clear consultation, professional protocol, and reliable follow-up after treatment.',
      name: 'Google Review',
      role: 'Verified client - Marrakech'
    },
    {
      quote: 'The team customizes the plan and keeps the session comfortable from start to finish.',
      name: 'Google Review',
      role: 'Verified client - Ice Lady'
    },
    {
      quote: 'Strong hygiene standards and very responsive communication.',
      name: 'Google Review',
      role: 'Verified client - Premium plan'
    }
  ],
  ar: [
    {
      quote: 'الاستشارة واضحة والبروتوكول منظم والمتابعة بعد الجلسة ممتازة.',
      name: 'تقييم Google',
      role: 'عميلة موثقة - مراكش'
    },
    {
      quote: 'الخطة مخصصة لكل حالة مع راحة جيدة اثناء الجلسة.',
      name: 'تقييم Google',
      role: 'عميلة موثقة - Ice Lady'
    },
    {
      quote: 'نظافة عالية وتواصل سريع من الفريق طوال الرحلة.',
      name: 'تقييم Google',
      role: 'عميلة موثقة - برنامج فاخر'
    }
  ]
};

const commonTrustSignals: Localized<string[]> = {
  fr: [
    'Clinique premium a Marrakech',
    'Protocoles non invasifs personnalises',
    'Hygiene clinique et materiel desinfecte',
    'Suivi progressif apres seance'
  ],
  en: [
    'Premium clinic in Marrakech',
    'Personalized non-invasive protocols',
    'Clinic-grade hygiene standards',
    'Structured post-session follow-up'
  ],
  ar: [
    'عيادة فاخرة في مراكش',
    'بروتوكولات غير جراحية مخصصة',
    'معايير نظافة علاجية عالية',
    'متابعة تدريجية بعد كل جلسة'
  ]
};

const profiles: Record<string, LandingProfile> = {
  therapiefroid: {
    metaTitle: {
      fr: 'Cryolipolyse a Marrakech | Programme Minceur Ice Lady',
      en: 'Cryolipolysis in Marrakech | Ice Lady Slimming Program',
      ar: 'كريوليبوليز في مراكش | برنامج التنحيف من Ice Lady'
    },
    metaDescription: {
      fr: 'Programme de cryolipolyse a Marrakech avec consultation, protocole cible et suivi progressif.',
      en: 'Cryolipolysis program in Marrakech with consultation, targeted protocol, and progressive follow-up.',
      ar: 'برنامج كريوليبوليز في مراكش مع استشارة مسبقة وبروتوكول موجه ومتابعة تدريجية.'
    },
    contactTitle: {
      fr: 'Parlez a la clinique avant de commencer votre programme',
      en: 'Speak to the clinic before starting your program',
      ar: 'تواصلي مع العيادة قبل بدء البرنامج'
    },
    contactSubtitle: {
      fr: 'La consultation valide les zones, le rythme des seances et les objectifs realistes.',
      en: 'The consultation validates treatment zones, session rhythm, and realistic goals.',
      ar: 'الاستشارة تحدد المناطق المناسبة وعدد الجلسات والاهداف الواقعية.'
    },
    highlights: {
      fr: ['Eligibilite confirmee en consultation', 'Plan zone par zone', 'Suivi sur plusieurs semaines'],
      en: ['Eligibility confirmed in consultation', 'Zone-by-zone planning', 'Progress tracking over weeks'],
      ar: ['تحديد الملاءمة قبل العلاج', 'خطة لكل منطقة', 'متابعة النتائج عبر اسابيع']
    },
    heroEyebrow: {
      fr: 'CRYOTHERAPIE SILHOUETTE',
      en: 'BODY CRYOTHERAPY',
      ar: 'العلاج بالتبريد للقوام'
    },
    heroTitle: {
      fr: 'Sculpter la silhouette avec une cryolipolyse encadree.',
      en: 'Sculpt body contours with supervised cryolipolysis.',
      ar: 'نحت القوام عبر كريوليبوليز باشراف متخصص.'
    },
    heroSubtitle: {
      fr: 'Approche non invasive inspiree des meilleurs protocoles internationaux de contouring par le froid.',
      en: 'A non-invasive approach inspired by international cold-contouring standards.',
      ar: 'نهج غير جراحي مستوحى من افضل بروتوكولات النحت بالتبريد عالميا.'
    },
    signatureTitle: {
      fr: 'Programme Cryo Sculpt',
      en: 'Cryo Sculpt Program',
      ar: 'برنامج Cryo Sculpt'
    },
    signatureLine: {
      fr: 'Seances personnalisees pour ventre, hanches, cuisses, bras et double menton.',
      en: 'Personalized sessions for abdomen, flanks, thighs, arms, and submental area.',
      ar: 'جلسات مخصصة للبطن والخواصر والفخذين والذراعين ومنطقة تحت الذقن.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Selection de protocoles lies a la cryolipolyse et au remodelage corporel non invasif.',
      en: 'A focused set of protocols around cryolipolysis and non-invasive body contouring.',
      ar: 'مجموعة بروتوكولات تركز على كريوليبوليز واعادة تشكيل القوام بدون جراحة.'
    },
    cards: {
      fr: [
        {
          title: 'Programme minceur cryolipolyse',
          description: 'Traitement cible des amas localises avec suivi de progression.',
          meta: '45 a 60 min',
          href: '/en/products/therapiefroid'
        },
        {
          title: 'Cryotherapie faciale anti-age',
          description: 'Tonification du visage et relance de la microcirculation.',
          meta: '30 a 45 min',
          href: '/en/products/therapiefaciale'
        },
        {
          title: 'Pressotherapie drainage',
          description: 'Soutien circulatoire et reduction de la sensation de jambes lourdes.',
          meta: '35 a 45 min',
          href: '/en/products/pressotherapie'
        }
      ],
      en: [
        {
          title: 'Cryolipolysis slimming program',
          description: 'Targeted treatment of localized fat with progressive tracking.',
          meta: '45 to 60 min',
          href: '/en/products/therapiefroid'
        },
        {
          title: 'Facial cryotherapy anti-aging',
          description: 'Facial toning protocol supporting microcirculation and glow.',
          meta: '30 to 45 min',
          href: '/en/products/therapiefaciale'
        },
        {
          title: 'Pressotherapy drainage',
          description: 'Circulatory support and light-leg comfort between sessions.',
          meta: '35 to 45 min',
          href: '/en/products/pressotherapie'
        }
      ],
      ar: [
        {
          title: 'برنامج تنحيف كريوليبوليز',
          description: 'استهداف الدهون الموضعية مع متابعة تدريجية واضحة.',
          meta: '45 الى 60 دقيقة',
          href: '/en/products/therapiefroid'
        },
        {
          title: 'تبريد الوجه المضاد للعمر',
          description: 'تنشيط ملامح الوجه ودعم الاشراقة.',
          meta: '30 الى 45 دقيقة',
          href: '/en/products/therapiefaciale'
        },
        {
          title: 'بريسوثيرابي للتصريف',
          description: 'دعم الدورة الدموية وتخفيف ثقل الساقين.',
          meta: '35 الى 45 دقيقة',
          href: '/en/products/pressotherapie'
        }
      ]
    },
    processDescription: {
      fr: 'Le protocole suit les etapes recommandees par les centres reputes de cryolipolyse.',
      en: 'The protocol follows key steps used by reputable cryolipolysis centers.',
      ar: 'يعتمد البروتوكول على المراحل المعتمدة في مراكز كريوليبوليز الموثوقة.'
    },
    processSteps: {
      fr: [
        {
          title: 'Consultation et mesure de zone',
          description: 'Evaluation des zones cibles, antecedents et attentes avant toute seance.'
        },
        {
          title: 'Seance de froid controle',
          description: 'Application localisee avec suivi du confort et du temps de pose.'
        },
        {
          title: 'Plan de suivi 6-12 semaines',
          description: 'Controle de progression et ajustements eventuels selon la reponse de votre corps.'
        }
      ],
      en: [
        {
          title: 'Consultation and zone assessment',
          description: 'We evaluate target zones, history, and goals before the first session.'
        },
        {
          title: 'Controlled cold session',
          description: 'Localized application with comfort checks and timed exposure.'
        },
        {
          title: '6-12 week follow-up plan',
          description: 'Progress reviews and potential protocol adjustments based on response.'
        }
      ],
      ar: [
        {
          title: 'استشارة وتقييم المناطق',
          description: 'نحدد المناطق المستهدفة والحالة الصحية والهدف قبل اول جلسة.'
        },
        {
          title: 'جلسة تبريد محكومة',
          description: 'تطبيق موضعي مع مراقبة الراحة والمدة بدقة.'
        },
        {
          title: 'متابعة من 6 الى 12 اسبوع',
          description: 'مراجعة التطور وتعديل الخطة عند الحاجة حسب الاستجابة.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Ventre', 'Hanches', 'Cuisses', 'Bras', 'Double menton', 'Dos'],
      en: ['Abdomen', 'Flanks', 'Thighs', 'Arms', 'Double chin', 'Back'],
      ar: ['البطن', 'الخواصر', 'الفخذان', 'الذراعان', 'تحت الذقن', 'الظهر']
    },
    zonesDescription: {
      fr: 'Selectionnez la zone principale a traiter pour preparer votre consultation.',
      en: 'Select the primary zone so we can prepare your consultation plan.',
      ar: 'اختاري المنطقة الرئيسية لتهيئة خطة الاستشارة.'
    },
    zonesTabs: {
      fr: [
        { id: 'abdomen', label: 'Ventre', description: 'Zone prioritaire pour affiner la ligne abdominale.' },
        { id: 'flanks', label: 'Hanches', description: 'Cible les volumes lateraux et poignees d amour.' },
        { id: 'thighs', label: 'Cuisses', description: 'Accompagnement progressif pour les zones internes ou externes.' },
        { id: 'chin', label: 'Double menton', description: 'Option dediee au contour du profil facial.' }
      ],
      en: [
        { id: 'abdomen', label: 'Abdomen', description: 'A core area for progressive waistline refinement.' },
        { id: 'flanks', label: 'Flanks', description: 'Targets side volume and love-handle zones.' },
        { id: 'thighs', label: 'Thighs', description: 'Progressive approach for inner or outer thigh pockets.' },
        { id: 'chin', label: 'Double chin', description: 'Dedicated option for submental contour support.' }
      ],
      ar: [
        { id: 'abdomen', label: 'البطن', description: 'منطقة اساسية لتحسين تحديد الخصر تدريجيا.' },
        { id: 'flanks', label: 'الخواصر', description: 'استهداف الدهون الجانبية ومناطق الحب.' },
        { id: 'thighs', label: 'الفخذان', description: 'نهج تدريجي لمناطق الفخذ الداخلية او الخارجية.' },
        { id: 'chin', label: 'تحت الذقن', description: 'خيار مخصص لدعم تحديد خط الفك.' }
      ]
    },
    outcomesDescription: {
      fr: 'Les changements apparaissent progressivement selon la zone et le metabolisme.',
      en: 'Visible changes appear progressively depending on zone and metabolic response.',
      ar: 'تظهر النتائج تدريجيا حسب المنطقة واستجابة الجسم.'
    },
    beforeAfter: {
      fr: [
        { title: 'Ventre', note: 'Suivi typique a 6-8 semaines' },
        { title: 'Hanches', note: 'Suivi typique a 6-8 semaines' },
        { title: 'Cuisses', note: 'Suivi typique a 8-12 semaines' },
        { title: 'Double menton', note: 'Suivi typique a 4-8 semaines' }
      ],
      en: [
        { title: 'Abdomen', note: 'Typical review at 6-8 weeks' },
        { title: 'Flanks', note: 'Typical review at 6-8 weeks' },
        { title: 'Thighs', note: 'Typical review at 8-12 weeks' },
        { title: 'Double chin', note: 'Typical review at 4-8 weeks' }
      ],
      ar: [
        { title: 'البطن', note: 'متابعة نموذجية بعد 6-8 اسابيع' },
        { title: 'الخواصر', note: 'متابعة نموذجية بعد 6-8 اسابيع' },
        { title: 'الفخذان', note: 'متابعة نموذجية بعد 8-12 اسبوع' },
        { title: 'تحت الذقن', note: 'متابعة نموذجية بعد 4-8 اسابيع' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Resultats variables selon le profil, les habitudes et la regularite du protocole.',
      en: 'Results vary based on profile, lifestyle habits, and protocol consistency.',
      ar: 'النتائج تختلف حسب الحالة ونمط الحياة والالتزام بالبروتوكول.'
    },
    safetyContra: {
      fr: 'Contre-indications possibles: grossesse, sensibilite au froid, certaines pathologies.',
      en: 'Possible contraindications include pregnancy, cold sensitivity, and specific medical conditions.',
      ar: 'قد توجد موانع مثل الحمل او حساسية البرد او بعض الحالات الطبية.'
    },
    safetyComfort: {
      fr: 'Le froid est intense au debut puis la zone devient plus confortable progressivement.',
      en: 'Cold intensity is strongest at first, then comfort improves as the area adapts.',
      ar: 'يكون الاحساس بالبرد اقوى في البداية ثم يتحسن الشعور تدريجيا.'
    },
    safetyHygiene: {
      fr: 'Protocoles d hygiene stricte et verification systematique avant chaque seance.',
      en: 'Strict hygiene protocol and pre-session checks are applied at every visit.',
      ar: 'يتم تطبيق بروتوكول نظافة صارم وفحص قبل كل جلسة.'
    },
    faqs: {
      fr: [
        {
          question: 'Combien de seances faut-il en moyenne ?',
          answer: 'Souvent 1 a 3 seances par zone selon vos objectifs et la reponse tissulaire.'
        },
        {
          question: 'Quand voit-on les resultats ?',
          answer: 'Generalement de facon progressive entre 4 et 12 semaines.'
        },
        {
          question: 'Est-ce une alternative a la chirurgie ?',
          answer: 'Oui, c est un protocole non invasif qui accompagne le remodelage sans chirurgie.'
        },
        {
          question: 'Y a-t-il un temps de recuperation ?',
          answer: 'La reprise des activites est habituellement rapide apres la seance.'
        }
      ],
      en: [
        {
          question: 'How many sessions are usually needed?',
          answer: 'Most plans involve 1 to 3 sessions per zone depending on goals and response.'
        },
        {
          question: 'When do results become visible?',
          answer: 'Changes are usually progressive, often between weeks 4 and 12.'
        },
        {
          question: 'Is this an alternative to surgery?',
          answer: 'Yes. It is a non-invasive contouring protocol that does not require surgery.'
        },
        {
          question: 'Is there downtime?',
          answer: 'Most clients return quickly to normal daily activity after treatment.'
        }
      ],
      ar: [
        {
          question: 'كم عدد الجلسات المطلوبة غالبا؟',
          answer: 'غالبا من جلسة الى ثلاث جلسات لكل منطقة حسب الهدف والاستجابة.'
        },
        {
          question: 'متى تظهر النتائج؟',
          answer: 'عادة بشكل تدريجي بين الاسبوع الرابع والثاني عشر.'
        },
        {
          question: 'هل يعتبر بديلا للجراحة؟',
          answer: 'نعم، هو بروتوكول غير جراحي لدعم نحت القوام.'
        },
        {
          question: 'هل توجد فترة نقاهة؟',
          answer: 'غالبا يمكن العودة للنشاط اليومي بسرعة بعد الجلسة.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Cryolipolyse Marrakech',
      en: 'Visit Ice Lady - Cryolipolysis Marrakech',
      ar: 'زيارة Ice Lady - كريوليبوليز مراكش'
    },
    visitIntro: {
      fr: 'La clinique vous accueille pour une consultation privee avant toute prise de protocole.',
      en: 'The clinic welcomes you for a private consultation before starting treatment.',
      ar: 'نستقبلك في استشارة خاصة قبل بدء اي بروتوكول.'
    },
    finalTitle: {
      fr: 'Votre programme commence par une consultation ciblee.',
      en: 'Your program starts with a focused consultation.',
      ar: 'برنامجك يبدأ باستشارة دقيقة.'
    },
    finalDescription: {
      fr: 'Prenez rendez-vous pour definir les zones, le nombre de seances et le rythme adapte.',
      en: 'Book your appointment to define target zones, session count, and pacing.',
      ar: 'احجزي موعدك لتحديد المناطق وعدد الجلسات والايقاع المناسب.'
    }
  },
  pressotherapie: {
    metaTitle: {
      fr: 'Pressotherapie a Marrakech | Drainage & Jambes legeres',
      en: 'Pressotherapy in Marrakech | Drainage & Light Legs',
      ar: 'بريسوثيرابي في مراكش | تصريف وخفة الساقين'
    },
    metaDescription: {
      fr: 'Soin de pressotherapie inspire des protocoles europeens pour drainage lymphatique et confort circulatoire.',
      en: 'Pressotherapy session inspired by European protocols for lymphatic drainage and circulatory comfort.',
      ar: 'جلسات بريسوثيرابي مستوحاة من البروتوكولات الاوروبية للتصريف اللمفاوي وراحة الدورة الدموية.'
    },
    contactTitle: {
      fr: 'Planifier votre seance de drainage pressotherapie',
      en: 'Plan your pressotherapy drainage session',
      ar: 'خططي جلسة التصريف بالبريسوثيرابي'
    },
    contactSubtitle: {
      fr: 'Parfait en cure jambes legeres, recuperation sportive ou soutien post-programme minceur.',
      en: 'Ideal for light-leg programs, sports recovery, or support between slimming sessions.',
      ar: 'مناسب لبرامج خفة الساقين والتعافي الرياضي ودعم برامج التنحيف.'
    },
    highlights: {
      fr: ['Drainage progressif', 'Sensation de jambes legeres', 'Confort circulatoire renforce'],
      en: ['Progressive drainage', 'Light-leg sensation', 'Improved circulation comfort'],
      ar: ['تصريف تدريجي', 'احساس بخفة الساقين', 'دعم راحة الدورة الدموية']
    },
    heroEyebrow: {
      fr: 'DRAINAGE PREMIUM',
      en: 'PREMIUM DRAINAGE',
      ar: 'تصريف فاخر'
    },
    heroTitle: {
      fr: 'Pressotherapie: relancer le drainage en douceur.',
      en: 'Pressotherapy: restart drainage with gentle compression.',
      ar: 'بريسوثيرابي: تنشيط التصريف بضغط متدرج ولطيف.'
    },
    heroSubtitle: {
      fr: 'Inspire de centres reputes en France, ce soin aide a reduire la sensation de lourdeur et de retention.',
      en: 'Inspired by reputable French centers, this protocol helps reduce heaviness and fluid retention sensation.',
      ar: 'مستوحى من مراكز فرنسية موثوقة، يساعد هذا العلاج على تقليل الثقل واحتباس السوائل.'
    },
    signatureTitle: {
      fr: 'Programme Drainage & Recovery',
      en: 'Drainage & Recovery Program',
      ar: 'برنامج التصريف والتعافي'
    },
    signatureLine: {
      fr: 'Compression sequentielle des jambes, abdomen ou bras selon vos objectifs.',
      en: 'Sequential compression for legs, abdomen, or arms based on your objective.',
      ar: 'ضغط تسلسلي للساقين او البطن او الذراعين حسب الهدف.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Programme recommande en complement des parcours minceur ou apres efforts intenses.',
      en: 'Recommended as a complement to slimming plans or after intense physical effort.',
      ar: 'يوصى به كمكمل لبرامج التنحيف او بعد الجهد البدني.'
    },
    cards: {
      fr: [
        {
          title: 'Pressotherapie jambes legeres',
          description: 'Seance ciblee sur jambes pour confort circulatoire.',
          meta: '35 a 45 min',
          href: '/en/products/pressotherapie'
        },
        {
          title: 'Cryotherapie corps',
          description: 'Programme contouring non invasif a associer en cure.',
          meta: '45 a 60 min',
          href: '/en/products/therapiefroid'
        },
        {
          title: 'Chromotherapie corps',
          description: 'Soutien circulation et qualite de peau en parcours global.',
          meta: '30 a 45 min',
          href: '/en/products/chromo'
        }
      ],
      en: [
        {
          title: 'Light-legs pressotherapy',
          description: 'Leg-focused session to support circulatory comfort.',
          meta: '35 to 45 min',
          href: '/en/products/pressotherapie'
        },
        {
          title: 'Body cryotherapy',
          description: 'Non-invasive contouring protocol to combine in a full plan.',
          meta: '45 to 60 min',
          href: '/en/products/therapiefroid'
        },
        {
          title: 'Body chromotherapy',
          description: 'Light-based support for comfort and skin quality.',
          meta: '30 to 45 min',
          href: '/en/products/chromo'
        }
      ],
      ar: [
        {
          title: 'بريسوثيرابي لخفة الساقين',
          description: 'جلسة موجهة للساقين لدعم الراحة الدموية.',
          meta: '35 الى 45 دقيقة',
          href: '/en/products/pressotherapie'
        },
        {
          title: 'تبريد الجسم',
          description: 'برنامج نحت غير جراحي يمكن دمجه ضمن خطة كاملة.',
          meta: '45 الى 60 دقيقة',
          href: '/en/products/therapiefroid'
        },
        {
          title: 'العلاج اللوني للجسم',
          description: 'دعم ضوئي للراحة وجودة الجلد.',
          meta: '30 الى 45 دقيقة',
          href: '/en/products/chromo'
        }
      ]
    },
    processDescription: {
      fr: 'Le protocole suit une logique utilisee dans les centres bien-etre europeens.',
      en: 'The protocol follows a sequence commonly used in leading European wellness centers.',
      ar: 'يعتمد البروتوكول على تسلسل مستخدم في مراكز العافية الاوروبية.'
    },
    processSteps: {
      fr: [
        {
          title: 'Evaluation du besoin',
          description: 'Analyse de la retention, des jambes lourdes ou de la recuperation souhaitee.'
        },
        {
          title: 'Compression sequentielle',
          description: 'Bottes ou manchons avec cycles de pression adaptes a votre tolerance.'
        },
        {
          title: 'Suivi hydratation & rythme',
          description: 'Conseils post-seance pour maximiser le drainage entre deux rendez-vous.'
        }
      ],
      en: [
        {
          title: 'Need assessment',
          description: 'We assess retention, heavy-leg symptoms, and recovery goals.'
        },
        {
          title: 'Sequential compression phase',
          description: 'Boots or sleeves run timed pressure cycles adapted to your comfort.'
        },
        {
          title: 'Hydration and rhythm follow-up',
          description: 'Post-session guidance helps maintain drainage benefits between visits.'
        }
      ],
      ar: [
        {
          title: 'تقييم الحاجة',
          description: 'تقييم احتباس السوائل او ثقل الساقين وهدف التعافي.'
        },
        {
          title: 'مرحلة الضغط التسلسلي',
          description: 'استخدام احذية او اكمام بضغط متدرج يناسب راحتك.'
        },
        {
          title: 'متابعة الترطيب والايقاع',
          description: 'ارشادات بعد الجلسة للحفاظ على فوائد التصريف بين الزيارات.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Jambes', 'Abdomen', 'Bras', 'Recuperation sportive'],
      en: ['Legs', 'Abdomen', 'Arms', 'Sports recovery'],
      ar: ['الساقان', 'البطن', 'الذراعان', 'تعافي رياضي']
    },
    zonesDescription: {
      fr: 'Choisissez la zone prioritaire pour preparer la bonne configuration de compression.',
      en: 'Choose your priority zone so we can prepare the right compression setup.',
      ar: 'اختاري المنطقة الاساسية لتجهيز نوع الضغط المناسب.'
    },
    zonesTabs: {
      fr: [
        { id: 'legs', label: 'Jambes', description: 'Zone la plus demandee pour sensation de legerete.' },
        { id: 'abdomen', label: 'Abdomen', description: 'Soutien du drainage dans les parcours silhouette.' },
        { id: 'arms', label: 'Bras', description: 'Option utile pour retention et confort post-effort.' },
        { id: 'recovery', label: 'Recuperation', description: 'Aide a recuperer apres efforts intenses.' }
      ],
      en: [
        { id: 'legs', label: 'Legs', description: 'Most requested area for light-leg comfort.' },
        { id: 'abdomen', label: 'Abdomen', description: 'Supports drainage during contouring plans.' },
        { id: 'arms', label: 'Arms', description: 'Useful option for retention and post-effort comfort.' },
        { id: 'recovery', label: 'Recovery', description: 'Helps restore comfort after intense activity.' }
      ],
      ar: [
        { id: 'legs', label: 'الساقان', description: 'المنطقة الاكثر طلبا لاحساس الخفة.' },
        { id: 'abdomen', label: 'البطن', description: 'يدعم التصريف ضمن برامج نحت القوام.' },
        { id: 'arms', label: 'الذراعان', description: 'خيار مفيد لاحتباس السوائل وراحة ما بعد الجهد.' },
        { id: 'recovery', label: 'التعافي', description: 'يساعد على استرجاع الراحة بعد النشاط القوي.' }
      ]
    },
    outcomesDescription: {
      fr: 'Souvent ressenti des la premiere seance sur la sensation de jambes legeres.',
      en: 'Many clients feel lighter legs from the first session, with better comfort over a series.',
      ar: 'تشعر كثير من العميلات بخفة اوضح منذ الجلسة الاولى مع تحسن تدريجي.'
    },
    beforeAfter: {
      fr: [
        { title: 'Confort jambes', note: 'Apres 1-2 seances' },
        { title: 'Retention', note: 'Apres 2-4 seances' },
        { title: 'Recuperation', note: 'Apres effort ou vol long' },
        { title: 'Bien-etre global', note: 'Cure de 4 a 8 seances' }
      ],
      en: [
        { title: 'Leg comfort', note: 'After 1-2 sessions' },
        { title: 'Fluid retention', note: 'After 2-4 sessions' },
        { title: 'Recovery ease', note: 'After training or long travel' },
        { title: 'Overall lightness', note: 'Series of 4-8 sessions' }
      ],
      ar: [
        { title: 'راحة الساقين', note: 'بعد 1-2 جلسة' },
        { title: 'احتباس السوائل', note: 'بعد 2-4 جلسات' },
        { title: 'سهولة التعافي', note: 'بعد التمرين او السفر الطويل' },
        { title: 'خفة عامة', note: 'سلسلة 4-8 جلسات' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Ce soin ne remplace pas un avis medical en cas de pathologie circulatoire.',
      en: 'This session does not replace medical care for diagnosed vascular conditions.',
      ar: 'هذا العلاج لا يعوض المتابعة الطبية في حالات الاوعية الدموية المرضية.'
    },
    safetyContra: {
      fr: 'A verifier en consultation: thrombose active, insuffisance cardiaque severe, grossesse.',
      en: 'Consultation check is required for active thrombosis, severe cardiac issues, or pregnancy.',
      ar: 'يجب التحقق في الاستشارة عند وجود تخثر نشط او مشاكل قلبية شديدة او حمل.'
    },
    safetyComfort: {
      fr: 'La pression est progressive et ajustee pendant la seance selon votre sensation.',
      en: 'Pressure is progressive and adjusted in-session to your comfort level.',
      ar: 'الضغط يكون تدريجيا ويتم ضبطه اثناء الجلسة حسب راحتك.'
    },
    safetyHygiene: {
      fr: 'Materiel nettoye entre chaque cliente avec protocole d hygiene standardise.',
      en: 'Equipment is cleaned between clients under a standardized hygiene workflow.',
      ar: 'يتم تعقيم المعدات بين كل عميلة وفق بروتوكول نظافة ثابت.'
    },
    faqs: {
      fr: [
        {
          question: 'A quelle frequence faire la pressotherapie ?',
          answer: 'Souvent 1 a 2 fois par semaine en cure initiale, puis entretien selon besoin.'
        },
        {
          question: 'Est-ce douloureux ?',
          answer: 'Non, la sensation est generalement confortable et relaxante.'
        },
        {
          question: 'Puis-je la combiner avec d autres soins ?',
          answer: 'Oui, notamment avec cryotherapie, programmes minceur et recuperation sportive.'
        },
        {
          question: 'Quand ressent-on les effets ?',
          answer: 'La sensation de legerete peut etre rapide, avec effet plus stable en cure.'
        }
      ],
      en: [
        {
          question: 'How often should pressotherapy be scheduled?',
          answer: 'Most initial plans use 1-2 sessions weekly, then maintenance as needed.'
        },
        {
          question: 'Is it painful?',
          answer: 'No. Most clients describe it as comfortable and relaxing.'
        },
        {
          question: 'Can it be combined with other treatments?',
          answer: 'Yes, especially with cryotherapy programs and recovery-focused plans.'
        },
        {
          question: 'When are effects noticeable?',
          answer: 'Light-leg sensation can be quick, with stronger effect through a session series.'
        }
      ],
      ar: [
        {
          question: 'كم مرة ينصح بجلسات البريسوثيرابي؟',
          answer: 'غالبا من 1 الى 2 جلسة اسبوعيا في البداية ثم صيانة حسب الحاجة.'
        },
        {
          question: 'هل الجلسة مؤلمة؟',
          answer: 'لا، غالبا تكون الجلسة مريحة وهادئة.'
        },
        {
          question: 'هل يمكن دمجها مع علاجات اخرى؟',
          answer: 'نعم، خصوصا مع برامج التبريد والتعافي.'
        },
        {
          question: 'متى تظهر الفائدة؟',
          answer: 'قد يظهر احساس الخفة بسرعة، ويتثبت اكثر مع سلسلة جلسات.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Pressotherapie Marrakech',
      en: 'Visit Ice Lady - Pressotherapy Marrakech',
      ar: 'زيارة Ice Lady - بريسوثيرابي مراكش'
    },
    visitIntro: {
      fr: 'Nous adaptons la pression et la zone pour une seance confortable et utile.',
      en: 'We tailor pressure cycles and target zones for an effective comfortable session.',
      ar: 'نقوم بتعديل الضغط والمنطقة لتحقيق جلسة فعالة ومريحة.'
    },
    finalTitle: {
      fr: 'Demarrez votre cure drainage en toute simplicite.',
      en: 'Start your drainage routine with a simple first session.',
      ar: 'ابدئي روتين التصريف بجلسة اولى بسيطة.'
    },
    finalDescription: {
      fr: 'Prenez rendez-vous et precisez votre priorite: jambes, retention ou recuperation.',
      en: 'Book your visit and define your priority: legs, retention, or recovery.',
      ar: 'احجزي وحددي اولويتك: الساقان او الاحتباس او التعافي.'
    }
  },
  chromo: {
    metaTitle: {
      fr: 'Chromotherapie a Marrakech | Ice Lady',
      en: 'Chromotherapy in Marrakech | Ice Lady',
      ar: 'العلاج اللوني في مراكش | Ice Lady'
    },
    metaDescription: {
      fr: 'Chromotherapie corps et visage avec protocoles lumineux cibles pour confort cutane et eclat.',
      en: 'Body and facial chromotherapy with targeted light protocols for comfort and visible glow.',
      ar: 'علاج لوني للجسم والوجه ببروتوكولات ضوئية موجهة لتحسين الراحة والاشراقة.'
    },
    contactTitle: {
      fr: 'Parlez avec la clinique pour choisir le bon programme lumineux',
      en: 'Talk to the clinic to choose the right light protocol',
      ar: 'تواصلي مع العيادة لاختيار البروتوكول الضوئي المناسب'
    },
    contactSubtitle: {
      fr: 'Ce soin est souvent combine avec cryotherapie, drainage et soins peau.',
      en: 'This protocol is often combined with cryotherapy, drainage, and skin plans.',
      ar: 'هذا العلاج غالبا يدمج مع التبريد والتصريف وبرامج العناية بالبشرة.'
    },
    highlights: {
      fr: ['Lumieres ciblees selon objectif', 'Soin non invasif', 'Compatible avec parcours combine'],
      en: ['Goal-based light settings', 'Non-invasive protocol', 'Compatible with combined plans'],
      ar: ['اعدادات ضوئية حسب الهدف', 'علاج غير جراحي', 'قابل للدمج مع برامج اخرى']
    },
    heroEyebrow: {
      fr: 'SOIN LUMIERE',
      en: 'LIGHT THERAPY',
      ar: 'العلاج الضوئي'
    },
    heroTitle: {
      fr: 'Chromotherapie pour soutenir confort, eclat et tonus.',
      en: 'Chromotherapy to support comfort, glow, and tissue tone.',
      ar: 'العلاج اللوني لدعم الراحة والاشراقة وتحسين التماسك.'
    },
    heroSubtitle: {
      fr: 'Inspiree des protocoles de phototherapie esthetique, la seance utilise des couleurs selon l objectif.',
      en: 'Inspired by aesthetic light-therapy methods, each session uses color frequencies by objective.',
      ar: 'مستوحى من اساليب العلاج الضوئي التجميلي، ويستخدم الوانا حسب الهدف.'
    },
    signatureTitle: {
      fr: 'Chromo Sculpt & Glow',
      en: 'Chromo Sculpt & Glow',
      ar: 'Chromo Sculpt & Glow'
    },
    signatureLine: {
      fr: 'Applications corps et visage avec plan personnalise selon la zone.',
      en: 'Body and facial applications with zone-specific planning.',
      ar: 'تطبيقات للوجه والجسم مع خطة مخصصة لكل منطقة.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Choix de protocoles chromotherapie associes aux besoins corps, visage ou drainage.',
      en: 'A curated set of chromotherapy options for body, face, and drainage support.',
      ar: 'مجموعة خيارات علاج لوني مخصصة للجسم والوجه ودعم التصريف.'
    },
    cards: {
      fr: [
        {
          title: 'Chromotherapie corps',
          description: 'Soutien anti-cellulite et confort tissulaire.',
          meta: '30 a 45 min',
          href: '/en/products/chromo'
        },
        {
          title: 'Chromotherapie visage',
          description: 'Aide a raviver l eclat et calmer les peaux fatiguees.',
          meta: '30 min',
          href: '/en/products/chromo'
        },
        {
          title: 'Peeling naturel aux algues',
          description: 'Complement ideal pour texture et luminosite du teint.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        }
      ],
      en: [
        {
          title: 'Body chromotherapy',
          description: 'Supports anti-cellulite plans and tissue comfort.',
          meta: '30 to 45 min',
          href: '/en/products/chromo'
        },
        {
          title: 'Facial chromotherapy',
          description: 'Boosts glow and supports calm skin response.',
          meta: '30 min',
          href: '/en/products/chromo'
        },
        {
          title: 'Natural seaweed peel',
          description: 'Ideal complement for texture and luminosity.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        }
      ],
      ar: [
        {
          title: 'العلاج اللوني للجسم',
          description: 'يدعم برامج مكافحة السيلوليت وراحة الانسجة.',
          meta: '30 الى 45 دقيقة',
          href: '/en/products/chromo'
        },
        {
          title: 'العلاج اللوني للوجه',
          description: 'يعزز الاشراقة ويدعم هدوء البشرة.',
          meta: '30 دقيقة',
          href: '/en/products/chromo'
        },
        {
          title: 'تقشير طبيعي بالطحالب',
          description: 'مكمل مثالي لتحسين الملمس والنضارة.',
          meta: '45 دقيقة',
          href: '/en/products/peeling-naturel-aux-algues'
        }
      ]
    },
    processDescription: {
      fr: 'Le protocole s appuie sur les references de phototherapie non invasive.',
      en: 'The sequence is aligned with non-invasive aesthetic light-therapy references.',
      ar: 'يعتمد التسلسل على مراجع العلاج الضوئي التجميلي غير الجراحي.'
    },
    processSteps: {
      fr: [
        {
          title: 'Diagnostic de peau et objectif',
          description: 'Choix des couleurs et de la duree selon votre priorite.'
        },
        {
          title: 'Application lumineuse ciblee',
          description: 'Exposition controlee des zones pour un travail progressif.'
        },
        {
          title: 'Plan combine si necessaire',
          description: 'Integration possible avec peeling, cryotherapie ou drainage.'
        }
      ],
      en: [
        {
          title: 'Skin and objective assessment',
          description: 'We select color settings and exposure time for your priority.'
        },
        {
          title: 'Targeted light application',
          description: 'Controlled exposure on selected zones for gradual support.'
        },
        {
          title: 'Combined-plan recommendation',
          description: 'Can be paired with peel, cryotherapy, or drainage protocols.'
        }
      ],
      ar: [
        {
          title: 'تقييم البشرة والهدف',
          description: 'نختار اللون ومدة التعرض حسب الاولويات.'
        },
        {
          title: 'تطبيق ضوئي موجه',
          description: 'تعرض محكوم للمناطق المختارة بشكل تدريجي.'
        },
        {
          title: 'اقتراح دمج علاجي',
          description: 'يمكن دمجه مع التقشير او التبريد او التصريف.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Visage', 'Corps', 'Cellulite', 'Teint terne'],
      en: ['Face', 'Body', 'Cellulite support', 'Dull tone'],
      ar: ['الوجه', 'الجسم', 'دعم السيلوليت', 'بهتان البشرة']
    },
    zonesDescription: {
      fr: 'Selectionnez votre priorite: eclat, confort peau ou soutien anti-cellulite.',
      en: 'Select your priority: glow, skin comfort, or anti-cellulite support.',
      ar: 'اختاري الاولوية: اشراقة او راحة البشرة او دعم السيلوليت.'
    },
    zonesTabs: {
      fr: [
        { id: 'face', label: 'Visage', description: 'Teint fatigue, manque d eclat, peau reactive.' },
        { id: 'body', label: 'Corps', description: 'Zones avec aspect irregulier ou terne.' },
        { id: 'cellulite', label: 'Cellulite', description: 'Complement dans les parcours silhouette.' },
        { id: 'recovery', label: 'Recovery', description: 'Soin doux entre deux protocoles plus intenses.' }
      ],
      en: [
        { id: 'face', label: 'Face', description: 'Dull tone, tired appearance, reactive skin.' },
        { id: 'body', label: 'Body', description: 'Zones with uneven texture or low radiance.' },
        { id: 'cellulite', label: 'Cellulite support', description: 'Useful complement in silhouette programs.' },
        { id: 'recovery', label: 'Recovery', description: 'Gentle support between stronger protocols.' }
      ],
      ar: [
        { id: 'face', label: 'الوجه', description: 'بهتان او تعب البشرة او حساسية خفيفة.' },
        { id: 'body', label: 'الجسم', description: 'مناطق بملمس غير متجانس او اشراقة منخفضة.' },
        { id: 'cellulite', label: 'دعم السيلوليت', description: 'مكمل مفيد ضمن برامج القوام.' },
        { id: 'recovery', label: 'التعافي', description: 'دعم لطيف بين البروتوكولات الاقوى.' }
      ]
    },
    outcomesDescription: {
      fr: 'L effet recherché est progressif: peau plus confortable et aspect plus lumineux.',
      en: 'Expected outcomes are progressive: better comfort and a brighter skin appearance.',
      ar: 'النتائج متدرجة: راحة اكبر للبشرة ومظهر اكثر نضارة.'
    },
    beforeAfter: {
      fr: [
        { title: 'Eclat visage', note: 'Apres 1-3 seances' },
        { title: 'Confort peau', note: 'Apres 2-4 seances' },
        { title: 'Aspect texture', note: 'Apres 3-6 seances' },
        { title: 'Soutien cellulite', note: 'En programme combine' }
      ],
      en: [
        { title: 'Facial glow', note: 'After 1-3 sessions' },
        { title: 'Skin comfort', note: 'After 2-4 sessions' },
        { title: 'Texture support', note: 'After 3-6 sessions' },
        { title: 'Cellulite support', note: 'In combined programs' }
      ],
      ar: [
        { title: 'اشراقة الوجه', note: 'بعد 1-3 جلسات' },
        { title: 'راحة البشرة', note: 'بعد 2-4 جلسات' },
        { title: 'تحسن الملمس', note: 'بعد 3-6 جلسات' },
        { title: 'دعم السيلوليت', note: 'ضمن برنامج مدمج' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'La chromotherapie est un soin d accompagnement, non un traitement medical.',
      en: 'Chromotherapy is a supportive aesthetic protocol, not a medical treatment.',
      ar: 'العلاج اللوني بروتوكول تجميلي داعم وليس علاجا طبيا.'
    },
    safetyContra: {
      fr: 'Informer la clinique en cas de photosensibilite, medicaments photosensibilisants ou lesion active.',
      en: 'Tell the clinic about photosensitivity, photosensitizing medication, or active lesions.',
      ar: 'يجب اخبار العيادة عند وجود حساسية ضوئية او ادوية ضوئية او التهابات نشطة.'
    },
    safetyComfort: {
      fr: 'Soin doux, sans douleur, avec intensite adaptee selon la reactivite de votre peau.',
      en: 'Gentle and non-painful session with intensity adapted to skin reactivity.',
      ar: 'جلسة لطيفة وغير مؤلمة مع ضبط الشدة حسب تفاعل البشرة.'
    },
    safetyHygiene: {
      fr: 'Nettoyage des surfaces et materiel entre chaque cliente, selon protocole clinique.',
      en: 'Surfaces and accessories are sanitized between clients under clinic protocol.',
      ar: 'يتم تعقيم الاسطح والاكسسوارات بين العميلات وفق بروتوكول العيادة.'
    },
    faqs: {
      fr: [
        {
          question: 'Combien de seances sont conseillees ?',
          answer: 'Souvent 4 a 8 seances selon l objectif et la reactivite de la peau.'
        },
        {
          question: 'Peut-on combiner avec peeling ?',
          answer: 'Oui, un plan combine est souvent propose selon votre tolérance.'
        },
        {
          question: 'Y a-t-il une eviction sociale ?',
          answer: 'Le plus souvent non, la reprise des activites est immediate.'
        },
        {
          question: 'Le soin est-il adapte a tous les types de peau ?',
          answer: 'Une evaluation initiale permet de verifier l adaptation du protocole.'
        }
      ],
      en: [
        {
          question: 'How many sessions are recommended?',
          answer: 'Most plans include 4 to 8 sessions depending on goals and skin response.'
        },
        {
          question: 'Can it be combined with peeling?',
          answer: 'Yes. A combined plan is often recommended when skin tolerance is suitable.'
        },
        {
          question: 'Is there downtime?',
          answer: 'Usually no. Most clients return to routine activities immediately.'
        },
        {
          question: 'Is it suitable for all skin types?',
          answer: 'Initial assessment confirms whether settings should be adapted for your skin.'
        }
      ],
      ar: [
        {
          question: 'كم عدد الجلسات الموصى بها؟',
          answer: 'غالبا من 4 الى 8 جلسات حسب الهدف واستجابة البشرة.'
        },
        {
          question: 'هل يمكن دمجه مع التقشير؟',
          answer: 'نعم، غالبا نقترح خطة دمج عندما تكون البشرة متحملة.'
        },
        {
          question: 'هل توجد فترة توقف؟',
          answer: 'غالبا لا، ويمكن العودة للنشاط اليومي مباشرة.'
        },
        {
          question: 'هل يناسب كل انواع البشرة؟',
          answer: 'التقييم الاولي يحدد الاعدادات المناسبة لكل بشرة.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Chromotherapie Marrakech',
      en: 'Visit Ice Lady - Chromotherapy Marrakech',
      ar: 'زيارة Ice Lady - العلاج اللوني مراكش'
    },
    visitIntro: {
      fr: 'Nous choisissons le protocole lumineux selon votre objectif esthetique prioritaire.',
      en: 'We select the light protocol based on your top aesthetic objective.',
      ar: 'نختار بروتوكول الضوء حسب هدفك التجميلي الاساسي.'
    },
    finalTitle: {
      fr: 'Lancez votre parcours glow avec un plan personnalise.',
      en: 'Start your glow plan with a personalized protocol.',
      ar: 'ابدئي خطة الاشراقة ببروتوكول مخصص.'
    },
    finalDescription: {
      fr: 'Prenez rendez-vous pour definir la frequence et la combinaison de soins adaptees.',
      en: 'Book your visit to define ideal frequency and treatment combination.',
      ar: 'احجزي لتحديد التكرار والدمج العلاجي الانسب.'
    }
  },
  'micro-needling': {
    metaTitle: {
      fr: 'Microneedling a Marrakech | Texture & Eclat',
      en: 'Microneedling in Marrakech | Texture & Glow',
      ar: 'مايكرونيدلينغ في مراكش | ملمس واشراقة'
    },
    metaDescription: {
      fr: 'Microneedling non invasif pour soutenir le renouvellement cutane et ameliorer la texture.',
      en: 'Non-invasive microneedling to support skin renewal and improve visible texture.',
      ar: 'مايكرونيدلينغ غير جراحي لدعم تجدد البشرة وتحسين الملمس.'
    },
    contactTitle: {
      fr: 'Programmer votre seance microneedling en securite',
      en: 'Schedule your microneedling session safely',
      ar: 'حددي موعد المايكرونيدلينغ بطريقة امنة'
    },
    contactSubtitle: {
      fr: 'Un protocole inspire des standards internationaux pour rides fines, pores et marques.',
      en: 'A protocol inspired by international standards for fine lines, pores, and visible marks.',
      ar: 'بروتوكول مستوحى من المعايير الدولية لتحسين الخطوط الرفيعة والمسام والاثار.'
    },
    highlights: {
      fr: ['Stimule le renouvellement cutane', 'Approche progressive', 'Plan de suivi personnalise'],
      en: ['Supports skin renewal', 'Progressive approach', 'Personalized follow-up plan'],
      ar: ['يدعم تجدد البشرة', 'نهج تدريجي', 'خطة متابعة مخصصة']
    },
    heroEyebrow: {
      fr: 'REGENERATION CUTANEE',
      en: 'SKIN REGENERATION',
      ar: 'تجديد البشرة'
    },
    heroTitle: {
      fr: 'Microneedling: lisser la texture et raviver la peau.',
      en: 'Microneedling: refine texture and revive the skin.',
      ar: 'مايكرونيدلينغ: تحسين الملمس واعادة حيوية البشرة.'
    },
    heroSubtitle: {
      fr: 'Technique de stimulation mecanique superficielle, avec seances planifiees selon l objectif.',
      en: 'Superficial mechanical stimulation technique with sessions planned by objective.',
      ar: 'تقنية تحفيز ميكانيكي سطحي مع جلسات منظمة حسب الهدف.'
    },
    signatureTitle: {
      fr: 'Skin Reset Protocol',
      en: 'Skin Reset Protocol',
      ar: 'Skin Reset Protocol'
    },
    signatureLine: {
      fr: 'Ideal pour pores visibles, grain irregulier et marques superficielles.',
      en: 'Ideal for visible pores, uneven texture, and superficial marks.',
      ar: 'مناسب للمسام الواضحة والملمس غير المتجانس والاثار السطحية.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Protocoles associes pour renforcer eclat, texture et confort de la peau.',
      en: 'Complementary protocols to support glow, texture, and skin comfort.',
      ar: 'بروتوكولات مكملة لدعم الاشراقة وتحسين الملمس وراحة البشرة.'
    },
    cards: {
      fr: [
        {
          title: 'Microneedling visage',
          description: 'Stimule le renouvellement et regularise la texture.',
          meta: '45 a 60 min',
          href: '/en/products/micro-needling'
        },
        {
          title: 'Peeling naturel aux algues',
          description: 'Preparation ou entretien pour luminosite du teint.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        },
        {
          title: 'Cryotherapie faciale',
          description: 'Complement tonus et eclat apres parcours peau.',
          meta: '30 a 45 min',
          href: '/en/products/therapiefaciale'
        }
      ],
      en: [
        {
          title: 'Facial microneedling',
          description: 'Supports renewal and helps refine visible skin texture.',
          meta: '45 to 60 min',
          href: '/en/products/micro-needling'
        },
        {
          title: 'Natural seaweed peel',
          description: 'Preparation or maintenance step for improved glow.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        },
        {
          title: 'Facial cryotherapy',
          description: 'Tone and radiance support after skin programs.',
          meta: '30 to 45 min',
          href: '/en/products/therapiefaciale'
        }
      ],
      ar: [
        {
          title: 'مايكرونيدلينغ للوجه',
          description: 'يدعم تجدد البشرة ويحسن الملمس الظاهر.',
          meta: '45 الى 60 دقيقة',
          href: '/en/products/micro-needling'
        },
        {
          title: 'تقشير طبيعي بالطحالب',
          description: 'تحضير او صيانة لتحسين اشراقة البشرة.',
          meta: '45 دقيقة',
          href: '/en/products/peeling-naturel-aux-algues'
        },
        {
          title: 'تبريد الوجه',
          description: 'دعم للشد والنضارة بعد برامج البشرة.',
          meta: '30 الى 45 دقيقة',
          href: '/en/products/therapiefaciale'
        }
      ]
    },
    processDescription: {
      fr: 'Le plan suit les references de centres dermatologiques pour la stimulation progressive.',
      en: 'The sequence follows common dermatology-center standards for progressive stimulation.',
      ar: 'يتبع التسلسل معايير شائعة في مراكز الجلدية للتحفيز التدريجي.'
    },
    processSteps: {
      fr: [
        {
          title: 'Bilan peau et objectif',
          description: 'Analyse du type de peau, zones et attentes.'
        },
        {
          title: 'Seance de microneedling',
          description: 'Passages controles et profondeur adaptee selon la zone.'
        },
        {
          title: 'Post-soin et rythme',
          description: 'Conseils de recuperation et planification des seances suivantes.'
        }
      ],
      en: [
        {
          title: 'Skin assessment and goal',
          description: 'We evaluate skin type, priority zones, and expected outcomes.'
        },
        {
          title: 'Microneedling session',
          description: 'Controlled passes with depth adjusted to each facial zone.'
        },
        {
          title: 'Aftercare and timing',
          description: 'Recovery guidance plus scheduling of follow-up sessions.'
        }
      ],
      ar: [
        {
          title: 'تقييم البشرة والهدف',
          description: 'تحديد نوع البشرة والمناطق ذات الاولوية.'
        },
        {
          title: 'جلسة المايكرونيدلينغ',
          description: 'تمريرات محكومة بعمق مناسب لكل منطقة.'
        },
        {
          title: 'العناية بعد الجلسة',
          description: 'ارشادات التعافي وجدولة الجلسات التالية.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Pores visibles', 'Texture irreguliere', 'Marques', 'Eclat global'],
      en: ['Visible pores', 'Uneven texture', 'Visible marks', 'Overall glow'],
      ar: ['مسام واضحة', 'ملمس غير متجانس', 'اثار ظاهرة', 'اشراقة عامة']
    },
    zonesDescription: {
      fr: 'Indiquez la priorite principale pour adapter la profondeur et le rythme.',
      en: 'Choose your primary concern so depth and pacing can be adapted.',
      ar: 'حددي المشكلة الاساسية لتكييف العمق والايقاع.'
    },
    zonesTabs: {
      fr: [
        { id: 'pores', label: 'Pores', description: 'Pour resserrer visuellement la texture globale.' },
        { id: 'texture', label: 'Texture', description: 'Pour regulariser le grain de peau.' },
        { id: 'marks', label: 'Marques', description: 'Pour accompagner l attenuation progressive des traces.' },
        { id: 'glow', label: 'Eclat', description: 'Pour relancer la luminosite du teint.' }
      ],
      en: [
        { id: 'pores', label: 'Pores', description: 'Helps improve the visible look of enlarged pores.' },
        { id: 'texture', label: 'Texture', description: 'Supports smoother and more even skin surface.' },
        { id: 'marks', label: 'Marks', description: 'Gradual support for appearance of superficial marks.' },
        { id: 'glow', label: 'Glow', description: 'Helps revive skin brightness and freshness.' }
      ],
      ar: [
        { id: 'pores', label: 'المسام', description: 'يساعد على تحسين مظهر المسام الواسعة.' },
        { id: 'texture', label: 'الملمس', description: 'يدعم نعومة وتجانس سطح البشرة.' },
        { id: 'marks', label: 'الاثار', description: 'دعم تدريجي لتقليل مظهر الاثار السطحية.' },
        { id: 'glow', label: 'الاشراقة', description: 'يساعد على استعادة نضارة البشرة.' }
      ]
    },
    outcomesDescription: {
      fr: 'Les resultats sont progressifs, souvent plus visibles apres plusieurs seances.',
      en: 'Outcomes are progressive and usually become clearer over multiple sessions.',
      ar: 'النتائج تدريجية وتظهر بشكل اوضح مع عدة جلسات.'
    },
    beforeAfter: {
      fr: [
        { title: 'Pores', note: 'Apres 2-4 seances' },
        { title: 'Texture', note: 'Apres 3-6 seances' },
        { title: 'Marques', note: 'Apres 4-6 seances' },
        { title: 'Eclat', note: 'Apres 1-3 seances' }
      ],
      en: [
        { title: 'Pores', note: 'After 2-4 sessions' },
        { title: 'Texture', note: 'After 3-6 sessions' },
        { title: 'Marks', note: 'After 4-6 sessions' },
        { title: 'Glow', note: 'After 1-3 sessions' }
      ],
      ar: [
        { title: 'المسام', note: 'بعد 2-4 جلسات' },
        { title: 'الملمس', note: 'بعد 3-6 جلسات' },
        { title: 'الاثار', note: 'بعد 4-6 جلسات' },
        { title: 'الاشراقة', note: 'بعد 1-3 جلسات' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Un diagnostic medical peut etre necessaire pour certaines pathologies cutanees actives.',
      en: 'Active skin conditions may require prior medical advice before treatment.',
      ar: 'قد تتطلب بعض الحالات الجلدية النشطة تقييما طبيا مسبقا.'
    },
    safetyContra: {
      fr: 'A reporter en cas d infection active, acne inflammatoire severe ou lesion ouverte.',
      en: 'Postpone in case of active infection, severe inflammatory acne, or open lesions.',
      ar: 'يؤجل عند وجود التهاب نشط او حب شباب التهابي شديد او جروح مفتوحة.'
    },
    safetyComfort: {
      fr: 'Rougeur legere possible apres seance, generalement transitoire.',
      en: 'Mild redness can appear after session and usually settles quickly.',
      ar: 'قد يظهر احمرار خفيف بعد الجلسة وغالبا يزول بسرعة.'
    },
    safetyHygiene: {
      fr: 'Materiel sterile et protocoles stricts de desinfection.',
      en: 'Sterile equipment and strict disinfection procedures are applied.',
      ar: 'يتم استخدام ادوات معقمة وبروتوكولات تعقيم دقيقة.'
    },
    faqs: {
      fr: [
        {
          question: 'Combien de seances pour la texture ?',
          answer: 'Souvent 3 a 6 seances selon la peau et la cible esthetique.'
        },
        {
          question: 'Peut-on maquiller juste apres ?',
          answer: 'Il est preferable de laisser la peau respirer selon les consignes post-soin.'
        },
        {
          question: 'Le microneedling est-il douloureux ?',
          answer: 'La sensation est supportable et ajustee selon votre sensibilite.'
        },
        {
          question: 'Avec quels soins le combiner ?',
          answer: 'Peeling doux, cryotherapie faciale et protocoles glow selon bilan.'
        }
      ],
      en: [
        {
          question: 'How many sessions are needed for texture improvement?',
          answer: 'Most plans involve 3 to 6 sessions depending on skin and target concern.'
        },
        {
          question: 'Can I wear makeup right after?',
          answer: 'It is usually better to let skin recover according to aftercare guidance.'
        },
        {
          question: 'Is microneedling painful?',
          answer: 'Sensation is generally manageable and settings are adapted to your sensitivity.'
        },
        {
          question: 'What can it be combined with?',
          answer: 'Often with gentle peel, facial cryotherapy, or glow-focused protocols.'
        }
      ],
      ar: [
        {
          question: 'كم جلسة يلزم لتحسين الملمس؟',
          answer: 'غالبا من 3 الى 6 جلسات حسب البشرة والمشكلة المستهدفة.'
        },
        {
          question: 'هل يمكن وضع المكياج مباشرة؟',
          answer: 'يفضل ترك البشرة تتعافى حسب تعليمات ما بعد الجلسة.'
        },
        {
          question: 'هل المايكرونيدلينغ مؤلم؟',
          answer: 'الاحساس غالبا محتمل ويتم ضبط الاعدادات حسب الحساسية.'
        },
        {
          question: 'مع ماذا يمكن دمجه؟',
          answer: 'مع تقشير لطيف او تبريد الوجه او بروتوكولات الاشراقة.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Microneedling Marrakech',
      en: 'Visit Ice Lady - Microneedling Marrakech',
      ar: 'زيارة Ice Lady - مايكرونيدلينغ مراكش'
    },
    visitIntro: {
      fr: 'Chaque plan est adapte au type de peau et a la tolerance de la cliente.',
      en: 'Every plan is adapted to skin type and individual tolerance.',
      ar: 'كل خطة يتم تكييفها مع نوع البشرة ودرجة التحمل.'
    },
    finalTitle: {
      fr: 'Redemarrez la qualite de peau avec un plan progressif.',
      en: 'Reset your skin quality with a progressive plan.',
      ar: 'ابدئي تحسين جودة البشرة بخطة تدريجية.'
    },
    finalDescription: {
      fr: 'Reservez une consultation pour fixer nombre de seances et calendrier.',
      en: 'Book a consultation to define session count and treatment calendar.',
      ar: 'احجزي استشارة لتحديد عدد الجلسات والجدول المناسب.'
    }
  },
  microblading: {
    metaTitle: {
      fr: 'Microblading a Marrakech | Sourcils sur mesure',
      en: 'Microblading in Marrakech | Bespoke Brows',
      ar: 'ميكروبليدنج في مراكش | حواجب مخصصة'
    },
    metaDescription: {
      fr: 'Microblading artistique pour redefinir la ligne des sourcils avec rendu naturel et elegant.',
      en: 'Artistic microblading to redefine brows with a natural and elegant finish.',
      ar: 'ميكروبليدنج فني لاعادة رسم الحواجب بنتيجة طبيعية وانيقة.'
    },
    contactTitle: {
      fr: 'Parlez a notre brow artist avant la seance',
      en: 'Speak with our brow artist before your session',
      ar: 'تواصلي مع خبيرة الحواجب قبل الجلسة'
    },
    contactSubtitle: {
      fr: 'Morphologie du visage, style souhaite et teinte sont valides en consultation.',
      en: 'Face shape, desired style, and pigment tone are validated in consultation.',
      ar: 'شكل الوجه والنمط المطلوب ولون الصبغة يتم تحديدها في الاستشارة.'
    },
    highlights: {
      fr: ['Design sourcil sur mesure', 'Effet naturel poil a poil', 'Conseils de cicatrisation'],
      en: ['Custom brow architecture', 'Natural hair-stroke effect', 'Healing and aftercare guidance'],
      ar: ['تصميم حواجب مخصص', 'نتيجة شعرة بشعرة طبيعية', 'ارشادات العناية والالتئام']
    },
    heroEyebrow: {
      fr: 'BROW ARCHITECTURE',
      en: 'BROW ARCHITECTURE',
      ar: 'هندسة الحواجب'
    },
    heroTitle: {
      fr: 'Microblading: une ligne de sourcil precise et harmonieuse.',
      en: 'Microblading: precise and harmonious brow definition.',
      ar: 'ميكروبليدنج: تحديد دقيق ومتناسق للحواجب.'
    },
    heroSubtitle: {
      fr: 'Technique semi-permanente inspiree des meilleurs studios brow internationaux.',
      en: 'A semi-permanent technique inspired by leading international brow studios.',
      ar: 'تقنية شبه دائمة مستوحاة من افضل استوديوهات الحواجب عالميا.'
    },
    signatureTitle: {
      fr: 'Brow Signature Design',
      en: 'Brow Signature Design',
      ar: 'Brow Signature Design'
    },
    signatureLine: {
      fr: 'Mesure des proportions, tracage et execution poil a poil.',
      en: 'Proportion mapping, sketch approval, and hair-stroke execution.',
      ar: 'قياس التناسق ورسم اولي ثم تنفيذ شعرة بشعرة.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Services complementaires pour un regard defini et naturel.',
      en: 'Complementary eye-beauty services for a defined natural look.',
      ar: 'خدمات مكملة لجمال العينين بمظهر محدد وطبيعي.'
    },
    cards: {
      fr: [
        {
          title: 'Microblading sur mesure',
          description: 'Reconstruction ou perfection de la ligne de sourcil.',
          meta: '60 a 90 min',
          href: '/en/products/microblading'
        },
        {
          title: 'Extensions de cils soie & kashmir',
          description: 'Intensifier le regard sans surcharge.',
          meta: '60 min',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'Cryotherapie faciale',
          description: 'Combinaison ideale pour un visage reposé et structure.',
          meta: '30 a 45 min',
          href: '/en/products/therapiefaciale'
        }
      ],
      en: [
        {
          title: 'Bespoke microblading',
          description: 'Rebuild or refine your brow line with natural strokes.',
          meta: '60 to 90 min',
          href: '/en/products/microblading'
        },
        {
          title: 'Silk & Kashmir lash extensions',
          description: 'Enhance eye intensity while keeping an elegant finish.',
          meta: '60 min',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'Facial cryotherapy',
          description: 'Great complement for refreshed and sculpted facial look.',
          meta: '30 to 45 min',
          href: '/en/products/therapiefaciale'
        }
      ],
      ar: [
        {
          title: 'ميكروبليدنج مخصص',
          description: 'اعادة بناء او تحسين خط الحاجب بنتيجة طبيعية.',
          meta: '60 الى 90 دقيقة',
          href: '/en/products/microblading'
        },
        {
          title: 'تمديد رموش حرير وكشمير',
          description: 'تعزيز جمال النظرة بدون مظهر مبالغ.',
          meta: '60 دقيقة',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'تبريد الوجه',
          description: 'مكمل مثالي لمظهر وجه اكثر انتعاشا وتحديدا.',
          meta: '30 الى 45 دقيقة',
          href: '/en/products/therapiefaciale'
        }
      ]
    },
    processDescription: {
      fr: 'Le processus respecte les standards des studios premium en design sourcil.',
      en: 'The process follows premium brow-studio standards for shape and symmetry.',
      ar: 'تتبع العملية معايير استوديوهات الحواجب الفاخرة في الدقة والتناسق.'
    },
    processSteps: {
      fr: [
        {
          title: 'Analyse du visage',
          description: 'Mesure des proportions et choix de l effet recherche.'
        },
        {
          title: 'Tracage puis pigmentation',
          description: 'Validation du dessin avant execution poil a poil.'
        },
        {
          title: 'Cicatrisation et retouche',
          description: 'Suivi post-soin et retouche si necessaire selon evolution.'
        }
      ],
      en: [
        {
          title: 'Face mapping',
          description: 'We map proportions and define your preferred brow style.'
        },
        {
          title: 'Sketch then pigmentation',
          description: 'The shape is approved before hair-stroke execution starts.'
        },
        {
          title: 'Healing and touch-up',
          description: 'Aftercare follow-up and optional touch-up based on healing.'
        }
      ],
      ar: [
        {
          title: 'تحليل ملامح الوجه',
          description: 'قياس التناسق وتحديد الشكل المناسب للحاجب.'
        },
        {
          title: 'رسم اولي ثم صبغ',
          description: 'اعتماد الرسم قبل بدء تنفيذ الشعيرات.'
        },
        {
          title: 'التئام ولمسة نهائية',
          description: 'متابعة بعد الجلسة ولمسة تصحيح عند الحاجة.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Sourcils clairsemes', 'Asymetrie', 'Reconstruction', 'Retouche'],
      en: ['Sparse brows', 'Asymmetry', 'Reconstruction', 'Touch-up'],
      ar: ['حواجب خفيفة', 'عدم تماثل', 'اعادة بناء', 'تصحيح']
    },
    zonesDescription: {
      fr: 'Choisissez votre besoin principal pour personnaliser le design.',
      en: 'Select your main brow concern so we can tailor the design.',
      ar: 'اختاري احتياجك الاساسي لتخصيص تصميم الحواجب.'
    },
    zonesTabs: {
      fr: [
        { id: 'sparse', label: 'Clairsemes', description: 'Comblement naturel des zones peu denses.' },
        { id: 'shape', label: 'Forme', description: 'Correction de la ligne et des proportions.' },
        { id: 'symmetry', label: 'Symetrie', description: 'Equilibrage entre sourcil droit et gauche.' },
        { id: 'refresh', label: 'Retouche', description: 'Rafraichissement d un ancien microblading.' }
      ],
      en: [
        { id: 'sparse', label: 'Sparse areas', description: 'Natural filling for low-density brow zones.' },
        { id: 'shape', label: 'Shape', description: 'Adjust brow line and facial proportion balance.' },
        { id: 'symmetry', label: 'Symmetry', description: 'Refine right and left brow alignment.' },
        { id: 'refresh', label: 'Refresh', description: 'Touch-up or refresh for previous brow work.' }
      ],
      ar: [
        { id: 'sparse', label: 'مناطق خفيفة', description: 'ملء طبيعي للمناطق قليلة الكثافة.' },
        { id: 'shape', label: 'الشكل', description: 'تصحيح خط الحاجب وتوازنه مع الوجه.' },
        { id: 'symmetry', label: 'التناسق', description: 'تحسين التوازن بين الحاجبين.' },
        { id: 'refresh', label: 'تحديث', description: 'تجديد او تصحيح ميكروبليدنج سابق.' }
      ]
    },
    outcomesDescription: {
      fr: 'Le resultat final apparait apres cicatrisation et stabilization du pigment.',
      en: 'Final appearance is evaluated after healing and pigment stabilization.',
      ar: 'النتيجة النهائية تقيم بعد اكتمال الالتئام وثبات الصبغة.'
    },
    beforeAfter: {
      fr: [
        { title: 'Design initial', note: 'Jour de seance' },
        { title: 'Phase de cicatrisation', note: 'J+7 a J+21' },
        { title: 'Stabilisation', note: 'Semaine 4 a 6' },
        { title: 'Retouche', note: 'Si necessaire' }
      ],
      en: [
        { title: 'Initial design', note: 'Session day' },
        { title: 'Healing phase', note: 'Day 7 to day 21' },
        { title: 'Pigment settling', note: 'Week 4 to 6' },
        { title: 'Touch-up', note: 'If needed' }
      ],
      ar: [
        { title: 'التصميم الاول', note: 'يوم الجلسة' },
        { title: 'مرحلة الالتئام', note: 'من اليوم 7 الى 21' },
        { title: 'ثبات الصبغة', note: 'من الاسبوع 4 الى 6' },
        { title: 'تصحيح', note: 'عند الحاجة' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Le rendu varie selon la peau, la cicatrisation et le respect des consignes post-soin.',
      en: 'Results vary with skin type, healing response, and aftercare compliance.',
      ar: 'النتيجة تختلف حسب نوع البشرة وسرعة الالتئام والالتزام بالتعليمات.'
    },
    safetyContra: {
      fr: 'A reporter en cas de grossesse, infection locale active ou traitements dermatologiques recents.',
      en: 'Postpone with pregnancy, active local infection, or recent aggressive skin procedures.',
      ar: 'يؤجل في حالة الحمل او التهاب موضعي نشط او اجراءات جلدية حديثة قوية.'
    },
    safetyComfort: {
      fr: 'Le confort est gere pendant la seance avec pauses et ajustements.',
      en: 'Comfort is managed during the session with pacing and short pauses.',
      ar: 'تتم مراعاة الراحة خلال الجلسة مع ضبط الايقاع وفترات توقف قصيرة.'
    },
    safetyHygiene: {
      fr: 'Materiel a usage controle et desinfection stricte de la zone de travail.',
      en: 'Controlled-use tools and strict disinfection of the work area.',
      ar: 'ادوات استخدام محكوم مع تعقيم صارم لمنطقة العمل.'
    },
    faqs: {
      fr: [
        {
          question: 'Combien de temps tient le microblading ?',
          answer: 'La tenue varie selon la peau et l entretien, avec retouche conseillee.'
        },
        {
          question: 'Le rendu est-il naturel ?',
          answer: 'Oui, le tracage poil a poil vise un resultat doux et harmonieux.'
        },
        {
          question: 'Y a-t-il une phase de cicatrisation ?',
          answer: 'Oui, une phase de cicatrisation est normale et expliquee en detail.'
        },
        {
          question: 'Puis-je corriger un ancien travail ?',
          answer: 'Une evaluation en consultation permet de definir faisabilite et plan.'
        }
      ],
      en: [
        {
          question: 'How long does microblading usually last?',
          answer: 'Longevity varies by skin type and aftercare, with periodic touch-up recommended.'
        },
        {
          question: 'Will it look natural?',
          answer: 'Yes. Hair-stroke technique is designed for a soft, natural brow finish.'
        },
        {
          question: 'Is there a healing phase?',
          answer: 'Yes. Healing is expected and aftercare guidance is provided in detail.'
        },
        {
          question: 'Can an old brow job be corrected?',
          answer: 'Consultation determines what can be corrected and how to plan it safely.'
        }
      ],
      ar: [
        {
          question: 'كم تدوم نتيجة الميكروبليدنج؟',
          answer: 'المدة تختلف حسب نوع البشرة والعناية، مع توصية بلمسة تجديد دورية.'
        },
        {
          question: 'هل النتيجة طبيعية؟',
          answer: 'نعم، تقنية الشعيرات تمنح مظهرا ناعما وطبيعيا.'
        },
        {
          question: 'هل توجد مرحلة التئام؟',
          answer: 'نعم، وهي مرحلة طبيعية مع تعليمات واضحة للعناية.'
        },
        {
          question: 'هل يمكن تصحيح عمل سابق؟',
          answer: 'الاستشارة تحدد امكانية التصحيح وخطة التنفيذ المناسبة.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Microblading Marrakech',
      en: 'Visit Ice Lady - Microblading Marrakech',
      ar: 'زيارة Ice Lady - ميكروبليدنج مراكش'
    },
    visitIntro: {
      fr: 'Chaque sourcil est dessine sur mesure selon votre visage et votre style.',
      en: 'Each brow is designed to match your facial lines and aesthetic style.',
      ar: 'يتم تصميم كل حاجب بما يتناسب مع ملامح وجهك واسلوبك.'
    },
    finalTitle: {
      fr: 'Obtenez des sourcils harmonieux avec une methode precise.',
      en: 'Achieve balanced brows with a precise artistic method.',
      ar: 'احصلي على حواجب متناسقة بتقنية دقيقة.'
    },
    finalDescription: {
      fr: 'Reservez votre consultation pour valider forme, couleur et plan de suivi.',
      en: 'Book your consultation to validate shape, pigment tone, and follow-up plan.',
      ar: 'احجزي استشارة لتحديد الشكل واللون وخطة المتابعة.'
    }
  },
  'extension-de-cils-en-soie-et-kashmir': {
    metaTitle: {
      fr: 'Extensions de cils Soie & Kashmir a Marrakech',
      en: 'Silk & Kashmir Lash Extensions in Marrakech',
      ar: 'تمديد رموش حرير وكشمير في مراكش'
    },
    metaDescription: {
      fr: 'Extensions cil a cil legeres pour un regard intensifie, elegant et confortable.',
      en: 'Lightweight one-by-one lash extensions for elegant eye definition and comfort.',
      ar: 'تمديد رموش خفيفة شعرة بشعرة لمنح النظرة كثافة انيقة ومريحة.'
    },
    contactTitle: {
      fr: 'Choisissez votre style de regard avec notre lash expert',
      en: 'Choose your lash style with our expert',
      ar: 'اختاري ستايل الرموش مع خبيرة العيون'
    },
    contactSubtitle: {
      fr: 'Design adapte a la forme de l oeil, au volume souhaite et a votre routine.',
      en: 'Design is adapted to eye shape, desired volume, and daily routine.',
      ar: 'التصميم يتكيف مع شكل العين والكثافة المطلوبة وروتينك اليومي.'
    },
    highlights: {
      fr: ['Fibres legeres', 'Pose precise cil a cil', 'Conseils entretien et retouche'],
      en: ['Ultra-light fibers', 'Precise one-by-one application', 'Refill and aftercare support'],
      ar: ['الياف خفيفة جدا', 'تطبيق دقيق شعرة بشعرة', 'متابعة تعبئة وعناية']
    },
    heroEyebrow: {
      fr: 'LASH STUDIO',
      en: 'LASH STUDIO',
      ar: 'استوديو الرموش'
    },
    heroTitle: {
      fr: 'Extensions soie & kashmir pour un regard elegant.',
      en: 'Silk & Kashmir extensions for an elegant eye look.',
      ar: 'تمديد حرير وكشمير لنظرة انيقة.'
    },
    heroSubtitle: {
      fr: 'Inspire des studios premium, la pose optimise confort, tenue et esthetique naturelle.',
      en: 'Inspired by premium studios, the application balances comfort, retention, and natural style.',
      ar: 'مستوحاة من استوديوهات فاخرة، مع توازن بين الراحة والثبات والمظهر الطبيعي.'
    },
    signatureTitle: {
      fr: 'Signature Silk Lash',
      en: 'Signature Silk Lash',
      ar: 'Signature Silk Lash'
    },
    signatureLine: {
      fr: 'Classique, volume leger ou effet glamour selon votre morphologie.',
      en: 'Classic, light volume, or glam style based on your eye anatomy.',
      ar: 'ستايل كلاسيك او حجم خفيف او جلوامور حسب شكل العين.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Trois approches pour adapter intensite, courbure et frequence de retouche.',
      en: 'Three approaches to calibrate intensity, curl profile, and refill frequency.',
      ar: 'ثلاثة اساليب لضبط الكثافة والانحناء وتواتر التعبئة.'
    },
    cards: {
      fr: [
        {
          title: 'Pose classique cil a cil',
          description: 'Resultat naturel, ideal premiere pose.',
          meta: '60 min',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'Volume leger',
          description: 'Plus de densite sans effet surcharge.',
          meta: '60 a 75 min',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'Microblading sourcils',
          description: 'Associer regard structure et cils harmonieux.',
          meta: '60 a 90 min',
          href: '/en/products/microblading'
        }
      ],
      en: [
        {
          title: 'Classic one-by-one set',
          description: 'Natural finish and ideal first-time extension style.',
          meta: '60 min',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'Light volume set',
          description: 'More fullness while keeping an elegant look.',
          meta: '60 to 75 min',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'Microblading brows',
          description: 'Combine structured brows with harmonized lashes.',
          meta: '60 to 90 min',
          href: '/en/products/microblading'
        }
      ],
      ar: [
        {
          title: 'تمديد كلاسيك شعرة بشعرة',
          description: 'مظهر طبيعي ومناسب لاول تجربة.',
          meta: '60 دقيقة',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'حجم خفيف',
          description: 'كثافة اضافية بدون مظهر مبالغ.',
          meta: '60 الى 75 دقيقة',
          href: '/en/products/extension-de-cils-en-soie-et-kashmir'
        },
        {
          title: 'ميكروبليدنج الحواجب',
          description: 'دمج تحديد الحاجب مع رموش متناسقة.',
          meta: '60 الى 90 دقيقة',
          href: '/en/products/microblading'
        }
      ]
    },
    processDescription: {
      fr: 'Le protocole suit les pratiques des studios lashes reputes: isolation, precision, hygiene.',
      en: 'The workflow follows leading lash-studio practices: isolation, precision, and hygiene.',
      ar: 'يتبع العمل معايير استوديوهات الرموش الموثوقة: عزل دقيق ونظافة عالية.'
    },
    processSteps: {
      fr: [
        {
          title: 'Diagnostic du regard',
          description: 'Choix longueur, courbure et style selon la forme des yeux.'
        },
        {
          title: 'Pose cil a cil',
          description: 'Application precise avec controle de symetrie et de confort.'
        },
        {
          title: 'Conseils et retouche',
          description: 'Routine entretien et calendrier de remplissage recommande.'
        }
      ],
      en: [
        {
          title: 'Eye design consultation',
          description: 'Length, curl, and style are selected for your eye shape.'
        },
        {
          title: 'One-by-one application',
          description: 'Precise placement with symmetry and comfort checks.'
        },
        {
          title: 'Aftercare and refill plan',
          description: 'Maintenance routine and refill schedule are explained clearly.'
        }
      ],
      ar: [
        {
          title: 'استشارة تصميم النظرة',
          description: 'اختيار الطول والانحناء والستايل المناسب لشكل العين.'
        },
        {
          title: 'تطبيق شعرة بشعرة',
          description: 'وضع دقيق مع فحص التناسق والراحة.'
        },
        {
          title: 'خطة العناية والتعبئة',
          description: 'شرح روتين العناية وجدول التعبئة المقترح.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Effet naturel', 'Volume leger', 'Look glamour', 'Retouche'],
      en: ['Natural look', 'Light volume', 'Glam look', 'Refill'],
      ar: ['مظهر طبيعي', 'حجم خفيف', 'ستايل جلوامور', 'تعبئة']
    },
    zonesDescription: {
      fr: 'Selectionnez le style de regard que vous souhaitez obtenir.',
      en: 'Select the eye style you want to achieve.',
      ar: 'اختاري الستايل الذي تريدينه للنظرة.'
    },
    zonesTabs: {
      fr: [
        { id: 'natural', label: 'Naturel', description: 'Definition douce pour le quotidien.' },
        { id: 'volume', label: 'Volume leger', description: 'Densite supplementaire sans effet lourd.' },
        { id: 'glam', label: 'Glam', description: 'Intensite marquee pour occasions et shooting.' },
        { id: 'refill', label: 'Retouche', description: 'Maintenance de la tenue et de la forme.' }
      ],
      en: [
        { id: 'natural', label: 'Natural', description: 'Soft definition for everyday elegance.' },
        { id: 'volume', label: 'Light volume', description: 'Added fullness with balanced comfort.' },
        { id: 'glam', label: 'Glam', description: 'Higher intensity for events and photos.' },
        { id: 'refill', label: 'Refill', description: 'Maintains shape and retention over time.' }
      ],
      ar: [
        { id: 'natural', label: 'طبيعي', description: 'تحديد ناعم للاستخدام اليومي.' },
        { id: 'volume', label: 'حجم خفيف', description: 'كثافة اضافية مع راحة متوازنة.' },
        { id: 'glam', label: 'جلوامور', description: 'حدة اكبر للمناسبات والتصوير.' },
        { id: 'refill', label: 'تعبئة', description: 'الحفاظ على الشكل والثبات بمرور الوقت.' }
      ]
    },
    outcomesDescription: {
      fr: 'Resultat visible immediatement, tenue optimisee avec entretien adapte.',
      en: 'Immediate visual effect, with retention improved by proper maintenance.',
      ar: 'نتيجة فورية مع ثبات افضل عند الالتزام بالعناية.'
    },
    beforeAfter: {
      fr: [
        { title: 'Avant / Apres naturel', note: 'Pose classique' },
        { title: 'Avant / Apres volume', note: 'Densite legere' },
        { title: 'Symetrie regard', note: 'Controle en fin de seance' },
        { title: 'Retouche', note: 'Toutes les 2-4 semaines' }
      ],
      en: [
        { title: 'Before / After natural', note: 'Classic set' },
        { title: 'Before / After volume', note: 'Light volume style' },
        { title: 'Eye symmetry', note: 'Checked at end of session' },
        { title: 'Refill cadence', note: 'Every 2-4 weeks' }
      ],
      ar: [
        { title: 'قبل / بعد طبيعي', note: 'تطبيق كلاسيكي' },
        { title: 'قبل / بعد حجم', note: 'ستايل حجم خفيف' },
        { title: 'تناسق النظرة', note: 'فحص في نهاية الجلسة' },
        { title: 'تكرار التعبئة', note: 'كل 2-4 اسابيع' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'La tenue varie selon cycle naturel des cils et routine entretien.',
      en: 'Retention varies with natural lash cycle and aftercare routine.',
      ar: 'مدة الثبات تختلف حسب دورة الرمش الطبيعية وروتين العناية.'
    },
    safetyContra: {
      fr: 'A reporter en cas d infection oculaire active ou allergie connue aux adhesifs.',
      en: 'Postpone with active eye infection or known adhesive allergy.',
      ar: 'يؤجل عند وجود التهاب عين نشط او حساسية معروفة من المواد اللاصقة.'
    },
    safetyComfort: {
      fr: 'La pose se fait yeux fermes, en position confortable, sans douleur.',
      en: 'Application is done with eyes closed in a comfortable, non-painful setup.',
      ar: 'يتم التطبيق والعينان مغمضتان في وضعية مريحة وبدون الم.'
    },
    safetyHygiene: {
      fr: 'Zone et accessoires desinfectes avant chaque pose.',
      en: 'Work area and accessories are sanitized before every application.',
      ar: 'يتم تعقيم منطقة العمل والاكسسوارات قبل كل جلسة.'
    },
    faqs: {
      fr: [
        {
          question: 'Combien de temps tiennent les extensions ?',
          answer: 'La tenue depend du cycle ciliaire et de l entretien, retouche souvent toutes 2-4 semaines.'
        },
        {
          question: 'Puis-je mouiller les cils apres la pose ?',
          answer: 'Suivez les consignes post-pose communiquees en fin de seance.'
        },
        {
          question: 'Quel style choisir ?',
          answer: 'La consultation permet de choisir naturel, volume leger ou glamour.'
        },
        {
          question: 'Peut-on combiner avec microblading ?',
          answer: 'Oui, c est une combinaison frequente pour structurer le regard.'
        }
      ],
      en: [
        {
          question: 'How long do lash extensions last?',
          answer: 'Retention depends on natural lash cycle and aftercare, with refills often every 2-4 weeks.'
        },
        {
          question: 'Can lashes get wet right after treatment?',
          answer: 'Follow the post-application instructions provided at the end of your session.'
        },
        {
          question: 'Which style should I choose?',
          answer: 'Consultation helps you pick natural, light volume, or glam style.'
        },
        {
          question: 'Can it be combined with microblading?',
          answer: 'Yes, this is a common pairing for a fully structured eye look.'
        }
      ],
      ar: [
        {
          question: 'كم تدوم وصلات الرموش؟',
          answer: 'تعتمد على دورة الرموش الطبيعية والعناية، وغالبا تحتاج تعبئة كل 2-4 اسابيع.'
        },
        {
          question: 'هل يمكن تبليل الرموش مباشرة؟',
          answer: 'اتّبعي تعليمات ما بعد الجلسة التي تقدمها الخبيرة.'
        },
        {
          question: 'اي ستايل اختار؟',
          answer: 'الاستشارة تساعدك على اختيار الطبيعي او الحجم الخفيف او الجلوامور.'
        },
        {
          question: 'هل يمكن دمجه مع الميكروبليدنج؟',
          answer: 'نعم، وهو دمج شائع لمنح النظرة شكلا متكاملا.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Lash Studio Marrakech',
      en: 'Visit Ice Lady - Lash Studio Marrakech',
      ar: 'زيارة Ice Lady - استوديو الرموش مراكش'
    },
    visitIntro: {
      fr: 'Notre equipe adapte la pose a votre style et a la sante de vos cils naturels.',
      en: 'Our team adapts each set to your style and natural lash condition.',
      ar: 'فريقنا يخصص كل تطبيق حسب ستايلك وحالة رموشك الطبيعية.'
    },
    finalTitle: {
      fr: 'Intensifiez votre regard avec une pose elegante et confortable.',
      en: 'Enhance your gaze with an elegant and comfortable lash set.',
      ar: 'عززي جمال النظرة بتمديد انيق ومريح.'
    },
    finalDescription: {
      fr: 'Reservez votre consultation et choisissez le style qui vous ressemble.',
      en: 'Book your consultation and choose the lash style that fits you best.',
      ar: 'احجزي استشارة وحددي الستايل الذي يناسبك اكثر.'
    }
  },
  'peeling-naturel-aux-algues': {
    metaTitle: {
      fr: 'Peeling naturel aux algues a Marrakech',
      en: 'Natural Seaweed Peel in Marrakech',
      ar: 'تقشير طبيعي بالطحالب في مراكش'
    },
    metaDescription: {
      fr: 'Peeling marin progressif pour lisser la texture, purifier et raviver l eclat.',
      en: 'Progressive marine peel to smooth texture, purify skin, and revive glow.',
      ar: 'تقشير بحري تدريجي لتنعيم الملمس وتنقية البشرة واستعادة النضارة.'
    },
    contactTitle: {
      fr: 'Choisir votre protocole peeling selon la sensibilite de peau',
      en: 'Choose your peel protocol based on skin sensitivity',
      ar: 'اختاري بروتوكول التقشير حسب حساسية البشرة'
    },
    contactSubtitle: {
      fr: 'Le peeling aux algues accompagne le renouvellement sans approche agressive.',
      en: 'Seaweed peeling supports skin renewal with a controlled non-aggressive approach.',
      ar: 'تقشير الطحالب يدعم تجدد البشرة بطريقة محكومة وغير قاسية.'
    },
    highlights: {
      fr: ['Renouvellement progressif', 'Texture plus lisse', 'Eclat relance'],
      en: ['Progressive renewal', 'Smoother texture', 'Brighter complexion'],
      ar: ['تجدد تدريجي', 'ملمس اكثر نعومة', 'نضارة اوضح']
    },
    heroEyebrow: {
      fr: 'PEELING MARIN',
      en: 'MARINE PEEL',
      ar: 'تقشير بحري'
    },
    heroTitle: {
      fr: 'Peeling aux algues: purifier, lisser, illuminer.',
      en: 'Seaweed peel: purify, smooth, and brighten.',
      ar: 'تقشير الطحالب: تنقية وتنعيم واشراقة.'
    },
    heroSubtitle: {
      fr: 'Soin inspire des rituels marins premium pour peau terne, texture irreguliere et pores visibles.',
      en: 'Inspired by premium marine skincare rituals for dull tone, rough texture, and visible pores.',
      ar: 'مستوحى من طقوس العناية البحرية الفاخرة للبشرة الباهتة والملمس غير المتجانس.'
    },
    signatureTitle: {
      fr: 'Marine Skin Renewal',
      en: 'Marine Skin Renewal',
      ar: 'Marine Skin Renewal'
    },
    signatureLine: {
      fr: 'Actifs marins pour un teint plus net, plus lisse et plus lumineux.',
      en: 'Marine actives for clearer, smoother, and brighter skin appearance.',
      ar: 'مكونات بحرية لبشرة اوضح وانعم واكثر اشراقة.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Combinaisons recommandees avec microneedling et chromotherapie visage.',
      en: 'Recommended combinations with microneedling and facial chromotherapy.',
      ar: 'دمج موصى به مع المايكرونيدلينغ والعلاج اللوني للوجه.'
    },
    cards: {
      fr: [
        {
          title: 'Peeling naturel visage',
          description: 'Renouvellement du teint et lissage progressif.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        },
        {
          title: 'Microneedling',
          description: 'Soutien texture et marques avec protocole combine.',
          meta: '45 a 60 min',
          href: '/en/products/micro-needling'
        },
        {
          title: 'Chromotherapie visage',
          description: 'Apaisement et eclat en entretien.',
          meta: '30 min',
          href: '/en/products/chromo'
        }
      ],
      en: [
        {
          title: 'Natural facial peel',
          description: 'Progressive tone renewal and texture refinement.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        },
        {
          title: 'Microneedling',
          description: 'Texture and mark support in combined plans.',
          meta: '45 to 60 min',
          href: '/en/products/micro-needling'
        },
        {
          title: 'Facial chromotherapy',
          description: 'Glow and calming support between peel sessions.',
          meta: '30 min',
          href: '/en/products/chromo'
        }
      ],
      ar: [
        {
          title: 'تقشير طبيعي للوجه',
          description: 'تجدد تدريجي للون البشرة وتحسين الملمس.',
          meta: '45 دقيقة',
          href: '/en/products/peeling-naturel-aux-algues'
        },
        {
          title: 'مايكرونيدلينغ',
          description: 'دعم الملمس والاثار ضمن خطة مدمجة.',
          meta: '45 الى 60 دقيقة',
          href: '/en/products/micro-needling'
        },
        {
          title: 'العلاج اللوني للوجه',
          description: 'دعم النضارة والتهدئة بين جلسات التقشير.',
          meta: '30 دقيقة',
          href: '/en/products/chromo'
        }
      ]
    },
    processDescription: {
      fr: 'Le protocole est progressif pour proteger la barriere cutanee et optimiser le resultat.',
      en: 'The protocol is progressive to protect the skin barrier and optimize results.',
      ar: 'البروتوكول تدريجي لحماية حاجز البشرة وتحقيق نتائج افضل.'
    },
    processSteps: {
      fr: [
        {
          title: 'Bilan cutane initial',
          description: 'Evaluation de la sensibilite et de l objectif principal.'
        },
        {
          title: 'Application peeling aux algues',
          description: 'Temps de pose adapte et controle selon reaction de peau.'
        },
        {
          title: 'Hydratation et suivi',
          description: 'Plan post-soin et frequence recommandee pour maintenir les gains.'
        }
      ],
      en: [
        {
          title: 'Initial skin check',
          description: 'We assess skin sensitivity and your primary objective.'
        },
        {
          title: 'Seaweed peel application',
          description: 'Exposure time is adapted and monitored by skin response.'
        },
        {
          title: 'Hydration and follow-up',
          description: 'Aftercare plan and recommended cadence maintain visible results.'
        }
      ],
      ar: [
        {
          title: 'فحص البشرة الاولي',
          description: 'تقييم الحساسية والهدف الرئيسي.'
        },
        {
          title: 'تطبيق تقشير الطحالب',
          description: 'ضبط مدة التعرض ومراقبة تفاعل البشرة.'
        },
        {
          title: 'ترطيب ومتابعة',
          description: 'خطة بعد الجلسة وتكرار مناسب للحفاظ على النتائج.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Teint terne', 'Texture', 'Pores', 'Peau grasse mixte'],
      en: ['Dull tone', 'Texture irregularity', 'Visible pores', 'Oily / combination skin'],
      ar: ['بهتان', 'ملمس غير متجانس', 'مسام واضحة', 'بشرة دهنية او مختلطة']
    },
    zonesDescription: {
      fr: 'Precisez la priorite pour adapter intensite et frequence des seances.',
      en: 'Specify your priority so intensity and session cadence can be tuned.',
      ar: 'حددي الاولويات لضبط شدة التقشير وتواتر الجلسات.'
    },
    zonesTabs: {
      fr: [
        { id: 'dull', label: 'Teint terne', description: 'Redonne de la luminosite au teint fatigue.' },
        { id: 'texture', label: 'Texture', description: 'Lisse les irregularites superficielles.' },
        { id: 'pores', label: 'Pores', description: 'Aide a affiner visuellement le grain de peau.' },
        { id: 'oil', label: 'Peau mixte', description: 'Soutient l equilibre et la purete de la peau.' }
      ],
      en: [
        { id: 'dull', label: 'Dull tone', description: 'Revives complexion brightness and freshness.' },
        { id: 'texture', label: 'Texture', description: 'Supports smoother superficial skin surface.' },
        { id: 'pores', label: 'Pores', description: 'Helps refine visible pore appearance.' },
        { id: 'oil', label: 'Oily/combination', description: 'Supports cleaner and more balanced skin feel.' }
      ],
      ar: [
        { id: 'dull', label: 'بهتان', description: 'يعيد للبشرة نضارة واكثر حيوية.' },
        { id: 'texture', label: 'الملمس', description: 'يساعد على تنعيم السطح الخارجي للبشرة.' },
        { id: 'pores', label: 'المسام', description: 'يساعد على تحسين مظهر المسام.' },
        { id: 'oil', label: 'بشرة مختلطة', description: 'يدعم توازن البشرة ونقائها.' }
      ]
    },
    outcomesDescription: {
      fr: 'Le teint devient plus propre et lumineux de facon progressive sur plusieurs seances.',
      en: 'Complexion clarity and glow generally improve progressively over sessions.',
      ar: 'تتحسن نقاوة البشرة واشراقتها تدريجيا عبر الجلسات.'
    },
    beforeAfter: {
      fr: [
        { title: 'Nettoyage du teint', note: '1-2 seances' },
        { title: 'Texture lissee', note: '2-4 seances' },
        { title: 'Pores visuels', note: '3-5 seances' },
        { title: 'Eclat durable', note: 'Cure reguliere' }
      ],
      en: [
        { title: 'Tone clarity', note: '1-2 sessions' },
        { title: 'Texture smoothing', note: '2-4 sessions' },
        { title: 'Visible pores', note: '3-5 sessions' },
        { title: 'Sustained glow', note: 'Regular program' }
      ],
      ar: [
        { title: 'نقاوة اللون', note: '1-2 جلسة' },
        { title: 'تنعيم الملمس', note: '2-4 جلسات' },
        { title: 'تحسن المسام', note: '3-5 جلسات' },
        { title: 'نضارة مستمرة', note: 'برنامج منتظم' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Les reactions varient selon la sensibilite cutanee individuelle.',
      en: 'Skin responses can vary depending on individual sensitivity.',
      ar: 'تفاعل البشرة يختلف حسب درجة الحساسية الفردية.'
    },
    safetyContra: {
      fr: 'A reporter en cas de lesion active, irritation severe ou traitement dermatologique recent.',
      en: 'Postpone with active lesions, severe irritation, or recent aggressive skin procedures.',
      ar: 'يؤجل عند وجود التهابات نشطة او تهيج شديد او اجراء جلدي حديث قوي.'
    },
    safetyComfort: {
      fr: 'Des sensations transitoires peuvent apparaitre puis s attenuer rapidement.',
      en: 'Temporary sensations can occur and usually settle quickly.',
      ar: 'قد تظهر احاسيس مؤقتة وتختفي غالبا بسرعة.'
    },
    safetyHygiene: {
      fr: 'Protocoles d hygiene stricte et produits appliques selon evaluation prealable.',
      en: 'Strict hygiene workflow and product selection based on prior assessment.',
      ar: 'بروتوكول نظافة صارم واختيار المنتجات بعد تقييم مسبق.'
    },
    faqs: {
      fr: [
        {
          question: 'Le peeling aux algues est-il adapte aux peaux sensibles ?',
          answer: 'Une evaluation initiale est indispensable pour ajuster intensite et frequence.'
        },
        {
          question: 'Combien de seances faut-il ?',
          answer: 'Souvent 3 a 6 seances selon l objectif peau.'
        },
        {
          question: 'Quand voit-on l eclat ?',
          answer: 'Souvent des la premiere seance avec effet renforce en cure.'
        },
        {
          question: 'Peut-on le combiner avec microneedling ?',
          answer: 'Oui, selon un calendrier determine en consultation.'
        }
      ],
      en: [
        {
          question: 'Is seaweed peeling suitable for sensitive skin?',
          answer: 'Initial assessment is required to adapt intensity and scheduling safely.'
        },
        {
          question: 'How many sessions are usually recommended?',
          answer: 'Most plans include 3 to 6 sessions depending on skin objective.'
        },
        {
          question: 'When does glow appear?',
          answer: 'Many clients notice early freshness, with stronger results across a series.'
        },
        {
          question: 'Can it be combined with microneedling?',
          answer: 'Yes, when timing is coordinated in consultation.'
        }
      ],
      ar: [
        {
          question: 'هل يناسب تقشير الطحالب البشرة الحساسة؟',
          answer: 'يتطلب تقييما اوليا لضبط الشدة والتكرار بشكل امن.'
        },
        {
          question: 'كم عدد الجلسات الموصى بها؟',
          answer: 'غالبا من 3 الى 6 جلسات حسب هدف البشرة.'
        },
        {
          question: 'متى تظهر النضارة؟',
          answer: 'قد تظهر من الجلسة الاولى وتتضح اكثر مع سلسلة الجلسات.'
        },
        {
          question: 'هل يمكن دمجه مع المايكرونيدلينغ؟',
          answer: 'نعم، مع جدولة مناسبة يتم تحديدها في الاستشارة.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Peeling Marrakech',
      en: 'Visit Ice Lady - Seaweed Peel Marrakech',
      ar: 'زيارة Ice Lady - تقشير الطحالب مراكش'
    },
    visitIntro: {
      fr: 'Le soin est adapte a votre peau pour un resultat progressif et controle.',
      en: 'The peel is adapted to your skin profile for controlled progressive results.',
      ar: 'يتم تكييف التقشير مع بشرتك لتحقيق نتائج تدريجية ومحكومة.'
    },
    finalTitle: {
      fr: 'Retrouvez une peau plus nette et lumineuse.',
      en: 'Reveal clearer and brighter skin.',
      ar: 'استعيدي بشرة اوضح واكثر اشراقة.'
    },
    finalDescription: {
      fr: 'Prenez rendez-vous pour definir votre parcours peeling et entretien.',
      en: 'Book your session to define your peel sequence and maintenance routine.',
      ar: 'احجزي لتحديد برنامج التقشير وروتين المتابعة.'
    }
  },
  therapiefaciale: {
    metaTitle: {
      fr: 'Cryotherapie faciale anti-age a Marrakech',
      en: 'Anti-Aging Facial Cryotherapy in Marrakech',
      ar: 'العلاج بالتبريد للوجه المضاد للعمر في مراكش'
    },
    metaDescription: {
      fr: 'Programme anti-age par cryotherapie pour raffermir, tonifier et raviver l eclat du visage.',
      en: 'Facial cryotherapy anti-aging program to tone, firm, and refresh facial radiance.',
      ar: 'برنامج تبريد مضاد للعمر لشد البشرة وتنشيطها واستعادة اشراقتها.'
    },
    contactTitle: {
      fr: 'Planifier votre programme cryotherapie visage',
      en: 'Plan your facial cryotherapy program',
      ar: 'خططي برنامج تبريد الوجه'
    },
    contactSubtitle: {
      fr: 'Ideal pour peau fatiguee, manque de tonus et besoin de coup d eclat.',
      en: 'Ideal for tired skin, reduced tone, and visible freshness goals.',
      ar: 'مناسب للبشرة المجهدة وضعف التماسك والحاجة الى نضارة سريعة.'
    },
    highlights: {
      fr: ['Effet tonifiant', 'Soutien microcirculation', 'Glow immediat et progressif'],
      en: ['Toning effect', 'Microcirculation support', 'Immediate and progressive glow'],
      ar: ['تأثير شد', 'دعم الدورة الدقيقة', 'نضارة فورية وتدريجية']
    },
    heroEyebrow: {
      fr: 'CRYO VISAGE',
      en: 'FACIAL CRYO',
      ar: 'تبريد الوجه'
    },
    heroTitle: {
      fr: 'Redonner energie et definition au visage.',
      en: 'Restore energy and definition to facial contours.',
      ar: 'استعادة حيوية وتحديد ملامح الوجه.'
    },
    heroSubtitle: {
      fr: 'Protocole anti-age inspire des techniques cryo premium pour tonus et eclat.',
      en: 'Anti-aging protocol inspired by premium cryo techniques for tone and radiance.',
      ar: 'بروتوكول مضاد للعمر مستوحى من تقنيات تبريد فاخرة لدعم الشد والاشراقة.'
    },
    signatureTitle: {
      fr: 'Cryo Face Lift Program',
      en: 'Cryo Face Lift Program',
      ar: 'Cryo Face Lift Program'
    },
    signatureLine: {
      fr: 'Approche non invasive pour contour visage, tonus et recuperation cutanee.',
      en: 'Non-invasive approach for facial contour support, tone, and recovery.',
      ar: 'نهج غير جراحي لدعم تحديد الوجه والشد وتجدد البشرة.'
    },
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: 'Combinaisons recommandees avec microneedling, peeling et chromotherapie visage.',
      en: 'Recommended combinations with microneedling, peel, and facial chromotherapy.',
      ar: 'دمج موصى به مع المايكرونيدلينغ والتقشير والعلاج اللوني للوجه.'
    },
    cards: {
      fr: [
        {
          title: 'Cryotherapie faciale anti-age',
          description: 'Tonifie et ravive les traits avec approche douce.',
          meta: '30 a 45 min',
          href: '/en/products/therapiefaciale'
        },
        {
          title: 'Microneedling',
          description: 'Ameliore texture et qualite cutanee en cure combinee.',
          meta: '45 a 60 min',
          href: '/en/products/micro-needling'
        },
        {
          title: 'Peeling aux algues',
          description: 'Relance luminosite et uniformite du teint.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        }
      ],
      en: [
        {
          title: 'Anti-aging facial cryotherapy',
          description: 'Gently tones and refreshes facial contours.',
          meta: '30 to 45 min',
          href: '/en/products/therapiefaciale'
        },
        {
          title: 'Microneedling',
          description: 'Supports texture and skin quality in combined programs.',
          meta: '45 to 60 min',
          href: '/en/products/micro-needling'
        },
        {
          title: 'Seaweed peel',
          description: 'Revives radiance and promotes a clearer complexion.',
          meta: '45 min',
          href: '/en/products/peeling-naturel-aux-algues'
        }
      ],
      ar: [
        {
          title: 'تبريد الوجه المضاد للعمر',
          description: 'يشد الملامح وينعش الوجه بطريقة لطيفة.',
          meta: '30 الى 45 دقيقة',
          href: '/en/products/therapiefaciale'
        },
        {
          title: 'مايكرونيدلينغ',
          description: 'يدعم الملمس وجودة البشرة ضمن خطة مدمجة.',
          meta: '45 الى 60 دقيقة',
          href: '/en/products/micro-needling'
        },
        {
          title: 'تقشير الطحالب',
          description: 'يعزز النضارة ويعمل على توحيد اللون.',
          meta: '45 دقيقة',
          href: '/en/products/peeling-naturel-aux-algues'
        }
      ]
    },
    processDescription: {
      fr: 'Parcours anti-age en trois etapes: evaluation, seance ciblee, suivi.',
      en: 'Anti-aging journey in three steps: assessment, targeted session, and follow-up.',
      ar: 'مسار مضاد للعمر من ثلاث مراحل: تقييم وجلسة موجهة ومتابعة.'
    },
    processSteps: {
      fr: [
        {
          title: 'Diagnostic anti-age',
          description: 'Evaluation du tonus, de la texture et de l hydratation.'
        },
        {
          title: 'Seance cryo faciale',
          description: 'Application controlee pour stimuler et tonifier les tissus.'
        },
        {
          title: 'Plan entretien',
          description: 'Frequence de seance et combinaisons recommandees.'
        }
      ],
      en: [
        {
          title: 'Anti-aging consultation',
          description: 'Assessment of tone, texture, and hydration priorities.'
        },
        {
          title: 'Facial cryo session',
          description: 'Controlled cold application to stimulate and tone tissues.'
        },
        {
          title: 'Maintenance plan',
          description: 'Recommended cadence and combined-care options.'
        }
      ],
      ar: [
        {
          title: 'استشارة مضاد العمر',
          description: 'تقييم الشد والملمس والترطيب حسب الاولوية.'
        },
        {
          title: 'جلسة تبريد الوجه',
          description: 'تطبيق تبريد محكوم لتنشيط وشد الانسجة.'
        },
        {
          title: 'خطة صيانة',
          description: 'تحديد التكرار وخيارات الدمج العلاجي.'
        }
      ]
    },
    leadZoneOptions: {
      fr: ['Contour visage', 'Rides fines', 'Teint fatigue', 'Fermete'],
      en: ['Facial contour', 'Fine lines', 'Tired complexion', 'Firmness'],
      ar: ['تحديد الوجه', 'خطوط رفيعة', 'بشرة متعبة', 'شد البشرة']
    },
    zonesDescription: {
      fr: 'Choisissez votre objectif anti-age prioritaire.',
      en: 'Choose your primary anti-aging objective.',
      ar: 'اختاري هدفك الاساسي في مكافحة علامات العمر.'
    },
    zonesTabs: {
      fr: [
        { id: 'contour', label: 'Contour', description: 'Soutient une definition plus nette des traits.' },
        { id: 'lines', label: 'Rides fines', description: 'Ameliore l apparence des signes precoces.' },
        { id: 'tone', label: 'Tonus', description: 'Ravive la fermete et l aspect reposé.' },
        { id: 'glow', label: 'Eclat', description: 'Relance une luminosite saine du teint.' }
      ],
      en: [
        { id: 'contour', label: 'Contour', description: 'Supports sharper facial line definition.' },
        { id: 'lines', label: 'Fine lines', description: 'Helps improve early visible aging signs.' },
        { id: 'tone', label: 'Tone', description: 'Supports firmer and fresher appearance.' },
        { id: 'glow', label: 'Glow', description: 'Revives healthy and luminous complexion.' }
      ],
      ar: [
        { id: 'contour', label: 'التحديد', description: 'يدعم وضوح خطوط الوجه بشكل افضل.' },
        { id: 'lines', label: 'الخطوط الرفيعة', description: 'يساعد على تحسين مظهر علامات التقدم المبكرة.' },
        { id: 'tone', label: 'الشد', description: 'يدعم مظهرا اكثر تماسكا وانتعاشا.' },
        { id: 'glow', label: 'الاشراقة', description: 'يعيد للبشرة نضارة صحية.' }
      ]
    },
    outcomesDescription: {
      fr: 'Effet coup d eclat rapide, puis progression visible avec un plan regulier.',
      en: 'Quick refresh effect followed by stronger improvement in a regular plan.',
      ar: 'انتعاش سريع ثم تحسن اوضح مع برنامج منتظم.'
    },
    beforeAfter: {
      fr: [
        { title: 'Eclat immediate', note: 'Apres 1 seance' },
        { title: 'Tonus visage', note: 'Apres 2-4 seances' },
        { title: 'Contour', note: 'Apres 3-6 seances' },
        { title: 'Programme anti-age', note: 'Plan mensuel' }
      ],
      en: [
        { title: 'Immediate glow', note: 'After 1 session' },
        { title: 'Facial tone', note: 'After 2-4 sessions' },
        { title: 'Contour support', note: 'After 3-6 sessions' },
        { title: 'Anti-aging plan', note: 'Monthly rhythm' }
      ],
      ar: [
        { title: 'نضارة فورية', note: 'بعد جلسة واحدة' },
        { title: 'شد الوجه', note: 'بعد 2-4 جلسات' },
        { title: 'دعم التحديد', note: 'بعد 3-6 جلسات' },
        { title: 'برنامج مضاد العمر', note: 'ايقاع شهري' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Le soin ne remplace pas un acte medical dermatologique ou chirurgical.',
      en: 'This protocol does not replace medical dermatology or surgical interventions.',
      ar: 'هذا البروتوكول لا يعوض العلاجات الجلدية الطبية او الجراحية.'
    },
    safetyContra: {
      fr: 'A reporter en cas de lesion active, infection cutanee ou procedure recente invasive.',
      en: 'Postpone with active lesions, skin infection, or recent invasive facial procedures.',
      ar: 'يؤجل عند وجود التهابات نشطة او عدوى جلدية او اجراء تدخلي حديث.'
    },
    safetyComfort: {
      fr: 'Sensation de fraicheur controlee, generalement bien toleree.',
      en: 'Controlled cooling sensation that is generally well tolerated.',
      ar: 'احساس تبريد محكوم وغالبا جيد التحمل.'
    },
    safetyHygiene: {
      fr: 'Protocoles d hygiene stricts et verification avant chaque seance.',
      en: 'Strict hygiene checks and pre-session screening at every visit.',
      ar: 'فحوص ونظافة صارمة قبل كل جلسة.'
    },
    faqs: {
      fr: [
        {
          question: 'Combien de seances anti-age recommandez-vous ?',
          answer: 'Souvent une cure initiale puis un entretien selon votre peau et vos objectifs.'
        },
        {
          question: 'Le resultat est-il immediat ?',
          answer: 'Un effet eclat peut etre rapide, avec progression sur les seances suivantes.'
        },
        {
          question: 'Peut-on combiner avec microneedling ?',
          answer: 'Oui, cette combinaison est frequente dans les plans anti-age progressifs.'
        },
        {
          question: 'Y a-t-il une eviction sociale ?',
          answer: 'La plupart des clientes reprennent leurs activites apres la seance.'
        }
      ],
      en: [
        {
          question: 'How many anti-aging sessions are recommended?',
          answer: 'Usually an initial series followed by maintenance based on skin goals.'
        },
        {
          question: 'Are results immediate?',
          answer: 'Glow can be quick, while stronger changes build progressively over sessions.'
        },
        {
          question: 'Can it be combined with microneedling?',
          answer: 'Yes, this is a frequent combination in progressive anti-aging plans.'
        },
        {
          question: 'Is there downtime?',
          answer: 'Most clients return to normal activities quickly after the session.'
        }
      ],
      ar: [
        {
          question: 'كم جلسة مضاد عمر ينصح بها؟',
          answer: 'غالبا سلسلة اولية ثم صيانة حسب حالة البشرة والهدف.'
        },
        {
          question: 'هل النتائج فورية؟',
          answer: 'قد تظهر النضارة بسرعة، بينما التحسن الاقوى يظهر تدريجيا.'
        },
        {
          question: 'هل يمكن دمجه مع المايكرونيدلينغ؟',
          answer: 'نعم، وهو دمج شائع ضمن خطط مكافحة علامات العمر.'
        },
        {
          question: 'هل توجد فترة توقف؟',
          answer: 'غالبا يمكن العودة للروتين اليومي بسرعة بعد الجلسة.'
        }
      ]
    },
    visitTitle: {
      fr: 'Visiter Ice Lady - Cryotherapie faciale Marrakech',
      en: 'Visit Ice Lady - Facial Cryotherapy Marrakech',
      ar: 'زيارة Ice Lady - تبريد الوجه مراكش'
    },
    visitIntro: {
      fr: 'Un parcours anti-age personnalise commence toujours par une consultation.',
      en: 'A personalized anti-aging journey always starts with consultation.',
      ar: 'رحلة مضاد العمر المخصصة تبدأ دائما باستشارة.'
    },
    finalTitle: {
      fr: 'Offrez a votre visage un programme tonus & glow.',
      en: 'Give your face a tone-and-glow program.',
      ar: 'امنحي وجهك برنامجا للشد والاشراقة.'
    },
    finalDescription: {
      fr: 'Reservez pour definir la frequence et la combinaison la plus adaptee.',
      en: 'Book now to define the right cadence and treatment combination.',
      ar: 'احجزي الان لتحديد التكرار والدمج العلاجي الانسب.'
    }
  }
};

function toCopy(locale: Locale, profile: LandingProfile): ServiceLandingCopy {
  const catalogueCards = profile.cards[locale];

  return {
    metaTitle: profile.metaTitle[locale],
    metaDescription: profile.metaDescription[locale],
    quickNav: navByLocale[locale],
    contactHeader: {
      eyebrow: locale === 'ar' ? 'تواصل سريع' : locale === 'fr' ? 'CONTACT PRIORITAIRE' : 'PRIORITY CONTACT',
      title: profile.contactTitle[locale],
      subtitle: profile.contactSubtitle[locale],
      responseNote:
        locale === 'ar'
          ? 'رد سريع خلال اوقات العمل.'
          : locale === 'fr'
            ? 'Reponse rapide pendant les horaires d ouverture.'
            : 'Fast response during opening hours.',
      primaryCta: locale === 'ar' ? 'احجز موعدا' : locale === 'fr' ? 'Prendre rendez-vous' : 'Book appointment',
      secondaryCta: locale === 'ar' ? 'تواصل واتساب' : locale === 'fr' ? 'WhatsApp direct' : 'WhatsApp chat',
      highlights: profile.highlights[locale]
    },
    hero: {
      eyebrow: profile.heroEyebrow[locale],
      title: profile.heroTitle[locale],
      subtitle: profile.heroSubtitle[locale],
      primaryCta: locale === 'ar' ? 'احجز استشارة' : locale === 'fr' ? 'Prendre rendez-vous' : 'Book consultation',
      secondaryCta: locale === 'ar' ? 'استكشف الخدمات' : locale === 'fr' ? 'Explorer les soins' : 'Explore services',
      signatureLabel: locale === 'ar' ? 'التوقيع' : locale === 'fr' ? 'SIGNATURE' : 'SIGNATURE',
      signatureTitle: profile.signatureTitle[locale],
      signatureLine: profile.signatureLine[locale]
    },
    trustSignals: profile.trustSignals[locale],
    catalogue: {
      eyebrow: locale === 'ar' ? 'كتالوج الخدمات' : locale === 'fr' ? 'CATALOGUE DE SOINS' : 'TREATMENT CATALOGUE',
      title: locale === 'ar' ? 'الخدمات المتاحة' : locale === 'fr' ? 'Selection de soins' : 'Treatment Selection',
      description: profile.catalogueDescription[locale],
      cards: catalogueCards,
      ctaLabel: locale === 'ar' ? 'اطلب موعدا' : locale === 'fr' ? 'Demander un RDV' : 'Request appointment'
    },
    process: {
      eyebrow: locale === 'ar' ? 'كيف يتم العلاج' : locale === 'fr' ? 'COMMENT CA MARCHE' : 'HOW IT WORKS',
      title: locale === 'ar' ? 'مسار الجلسة' : locale === 'fr' ? 'Parcours de soin' : 'Treatment Journey',
      description: profile.processDescription[locale],
      steps: profile.processSteps[locale]
    },
    leadForm: {
      eyebrow: locale === 'ar' ? 'طلب سريع' : locale === 'fr' ? 'PRISE DE CONTACT RAPIDE' : 'QUICK REQUEST',
      title: locale === 'ar' ? 'اطلب موعدا' : locale === 'fr' ? 'Demander un rendez-vous' : 'Request an appointment',
      subtitle:
        locale === 'ar'
          ? 'سيقوم الفريق بالتواصل معك لتأكيد الموعد.'
          : locale === 'fr'
            ? 'Notre equipe vous rappelle rapidement pour confirmer le creneau.'
            : 'Our team will contact you quickly to confirm your preferred slot.',
      nameLabel: locale === 'ar' ? 'الاسم' : locale === 'fr' ? 'Nom' : 'Name',
      phoneLabel: locale === 'ar' ? 'الهاتف / واتساب' : locale === 'fr' ? 'Telephone / WhatsApp' : 'Phone / WhatsApp',
      slotLabel: locale === 'ar' ? 'الوقت المفضل' : locale === 'fr' ? 'Creneau prefere' : 'Preferred slot',
      zoneLabel: locale === 'ar' ? 'المنطقة او الهدف' : locale === 'fr' ? 'Zone prioritaire' : 'Priority area',
      zoneOptions: profile.leadZoneOptions[locale],
      contactPreferenceLabel: locale === 'ar' ? 'طريقة التواصل' : locale === 'fr' ? 'Canal prefere' : 'Preferred contact channel',
      contactPreferenceOptions:
        locale === 'ar' ? ['مكالمة', 'واتساب'] : locale === 'fr' ? ['Appel', 'WhatsApp'] : ['Call', 'WhatsApp'],
      submitLabel: locale === 'ar' ? 'ارسال الطلب' : locale === 'fr' ? 'Envoyer la demande' : 'Send request',
      submitHint:
        locale === 'ar'
          ? 'بدون دفع عبر الموقع. التأكيد يتم مع العيادة.'
          : locale === 'fr'
            ? 'Sans paiement en ligne. Confirmation avec la clinique.'
            : 'No online payment. Confirmation is handled by the clinic.',
      privacyNote:
        locale === 'ar'
          ? 'معلوماتك تستخدم فقط لتنظيم الموعد ولا يتم بيعها.'
          : locale === 'fr'
            ? 'Vos informations servent uniquement a organiser votre rendez-vous.'
            : 'Your information is used only to organize your appointment.',
      successTitle: locale === 'ar' ? 'تم ارسال الطلب' : locale === 'fr' ? 'Demande envoyee' : 'Request sent',
      successMessage:
        locale === 'ar'
          ? 'شكرا. سيتواصل فريقنا معك قريبا.'
          : locale === 'fr'
            ? 'Merci. Notre equipe vous contacte rapidement.'
            : 'Thank you. Our team will contact you shortly.'
    },
    zones: {
      eyebrow: locale === 'ar' ? 'المناطق' : locale === 'fr' ? 'ZONES CIBLEES' : 'TARGET AREAS',
      title: locale === 'ar' ? 'اختر اولويتك' : locale === 'fr' ? 'Zones et objectifs' : 'Areas & Goals',
      description: profile.zonesDescription[locale],
      tabs: profile.zonesTabs[locale].map((tab) => ({
        ...tab,
        ctaLabel: locale === 'ar' ? 'هل يناسبني؟' : locale === 'fr' ? 'Est-ce adapte ?' : 'Am I eligible?'
      }))
    },
    outcomes: {
      eyebrow: locale === 'ar' ? 'نتائج ومتابعة' : locale === 'fr' ? 'RESULTATS & AVIS' : 'OUTCOMES & REVIEWS',
      title: locale === 'ar' ? 'النتائج' : locale === 'fr' ? 'Resultats progressifs' : 'Progressive outcomes',
      description: profile.outcomesDescription[locale],
      beforeAfter: profile.beforeAfter[locale],
      reviews: profile.reviews[locale],
      disclaimer: profile.disclaimer[locale]
    },
    safety: {
      eyebrow: locale === 'ar' ? 'السلامة' : locale === 'fr' ? 'SECURITE & ELIGIBILITE' : 'SAFETY & ELIGIBILITY',
      title: locale === 'ar' ? 'السلامة والملاءمة' : locale === 'fr' ? 'Securite & eligibilite' : 'Safety & eligibility',
      contraindicationsTitle: locale === 'ar' ? 'موانع محتملة' : locale === 'fr' ? 'Contre-indications' : 'Contraindications',
      contraindicationsText: profile.safetyContra[locale],
      comfortTitle: locale === 'ar' ? 'الراحة اثناء الجلسة' : locale === 'fr' ? 'Confort de seance' : 'Session comfort',
      comfortText: profile.safetyComfort[locale],
      hygieneTitle: locale === 'ar' ? 'النظافة والبروتوكول' : locale === 'fr' ? 'Protocoles & hygiene' : 'Hygiene protocols',
      hygieneText: profile.safetyHygiene[locale]
    },
    faqVisit: {
      faqEyebrow: locale === 'ar' ? 'الاسئلة الشائعة' : 'FAQ',
      faqTitle: locale === 'ar' ? 'اسئلة متكررة' : locale === 'fr' ? 'Questions frequentes' : 'Frequently asked questions',
      faqs: profile.faqs[locale],
      visitEyebrow: locale === 'ar' ? 'زيارة العيادة' : locale === 'fr' ? 'VISITER ICE LADY' : 'VISIT ICE LADY',
      visitTitle: profile.visitTitle[locale],
      visitIntro: profile.visitIntro[locale],
      appointmentCta: locale === 'ar' ? 'اطلب موعدا' : locale === 'fr' ? 'Demander un rendez-vous' : 'Request appointment',
      mapsCta: locale === 'ar' ? 'فتح في خرائط جوجل' : locale === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'
    },
    finalCta: {
      eyebrow: locale === 'ar' ? 'الخطوة القادمة' : locale === 'fr' ? 'PROCHAINE ETAPE' : 'NEXT STEP',
      title: profile.finalTitle[locale],
      description: profile.finalDescription[locale],
      primaryCta: locale === 'ar' ? 'احجز الاستشارة' : locale === 'fr' ? 'Prendre rendez-vous' : 'Book consultation',
      secondaryCta: locale === 'ar' ? 'استكشف الخدمات' : locale === 'fr' ? 'Explorer les soins' : 'Explore services'
    }
  };
}

type QuickProfileInput = {
  name: Localized<string>;
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  heroEyebrow: Localized<string>;
  heroTitle: Localized<string>;
  heroSubtitle: Localized<string>;
  signatureTitle: Localized<string>;
  signatureLine: Localized<string>;
  cards: Localized<LandingCardSeed[]>;
  zoneOptions: Localized<string[]>;
  zonesTabs: Localized<LandingZoneSeed[]>;
  faqs: Localized<ServiceLandingFaq[]>;
};

function buildQuickProfile(input: QuickProfileInput): LandingProfile {
  return {
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    contactTitle: {
      fr: `Planifier votre seance ${input.name.fr}`,
      en: `Plan your ${input.name.en} session`,
      ar: `خططي جلسة ${input.name.ar}`
    },
    contactSubtitle: {
      fr: `Une consultation rapide permet d adapter le protocole ${input.name.fr} a votre objectif.`,
      en: `A short consultation helps tailor ${input.name.en} to your goals.`,
      ar: `استشارة سريعة تساعد على تكييف ${input.name.ar} حسب هدفك.`
    },
    highlights: {
      fr: ['Protocole personnalise', 'Seance non invasive', 'Suivi par la clinique'],
      en: ['Personalized protocol', 'Non-invasive session', 'Clinic follow-up'],
      ar: ['بروتوكول مخصص', 'جلسة غير جراحية', 'متابعة من العيادة']
    },
    heroEyebrow: input.heroEyebrow,
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    signatureTitle: input.signatureTitle,
    signatureLine: input.signatureLine,
    trustSignals: commonTrustSignals,
    catalogueDescription: {
      fr: `Selection de soins complementaires autour de ${input.name.fr}.`,
      en: `Complementary treatment selection around ${input.name.en}.`,
      ar: `مجموعة خدمات مكملة حول ${input.name.ar}.`
    },
    cards: input.cards,
    processDescription: {
      fr: 'Parcours en trois etapes: evaluation, seance ciblee, suivi.',
      en: 'Three-step journey: assessment, targeted session, and follow-up.',
      ar: 'مسار من ثلاث خطوات: تقييم وجلسة موجهة ومتابعة.'
    },
    processSteps: {
      fr: [
        { title: 'Consultation', description: 'Validation de vos besoins et objectifs prioritaires.' },
        { title: 'Seance', description: 'Execution du protocole avec ajustement du confort en direct.' },
        { title: 'Suivi', description: 'Conseils post-seance et planning des prochaines etapes.' }
      ],
      en: [
        { title: 'Consultation', description: 'Validation of your needs and primary objective.' },
        { title: 'Session', description: 'Protocol execution with in-session comfort adjustments.' },
        { title: 'Follow-up', description: 'Aftercare guidance and next-step scheduling.' }
      ],
      ar: [
        { title: 'استشارة', description: 'تحديد الاحتياج والهدف الاساسي قبل البدء.' },
        { title: 'جلسة', description: 'تنفيذ البروتوكول مع ضبط مستوى الراحة اثناء الجلسة.' },
        { title: 'متابعة', description: 'تعليمات ما بعد الجلسة وجدولة الخطوات التالية.' }
      ]
    },
    leadZoneOptions: input.zoneOptions,
    zonesDescription: {
      fr: 'Choisissez la zone ou priorite principale pour personnaliser la seance.',
      en: 'Choose your main area or objective so we can personalize the session.',
      ar: 'اختاري المنطقة او الاولوية الرئيسية لتخصيص الجلسة.'
    },
    zonesTabs: input.zonesTabs,
    outcomesDescription: {
      fr: 'Les resultats evoluent progressivement selon votre profil et la regularite du plan.',
      en: 'Outcomes evolve progressively based on profile and plan consistency.',
      ar: 'تتطور النتائج تدريجيا حسب الحالة والالتزام بالخطة.'
    },
    beforeAfter: {
      fr: [
        { title: 'Premiere etape', note: 'Bilan initial' },
        { title: 'Progression', note: 'Apres quelques seances' },
        { title: 'Stabilisation', note: 'Programme regulier' },
        { title: 'Entretien', note: 'Suivi personnalise' }
      ],
      en: [
        { title: 'Initial step', note: 'First assessment' },
        { title: 'Progression', note: 'After a few sessions' },
        { title: 'Stabilization', note: 'Regular plan' },
        { title: 'Maintenance', note: 'Personalized follow-up' }
      ],
      ar: [
        { title: 'المرحلة الاولى', note: 'تقييم اولي' },
        { title: 'تقدم', note: 'بعد عدة جلسات' },
        { title: 'تثبيت', note: 'برنامج منتظم' },
        { title: 'صيانة', note: 'متابعة مخصصة' }
      ]
    },
    reviews: commonReviews,
    disclaimer: {
      fr: 'Resultats variables selon le profil individuel et le respect des recommandations.',
      en: 'Results vary by profile and adherence to recommendations.',
      ar: 'النتائج تختلف حسب الحالة ومدى الالتزام بالتوصيات.'
    },
    safetyContra: {
      fr: 'Contre-indications eventuelles verifiees en consultation avant toute seance.',
      en: 'Potential contraindications are checked in consultation before treatment.',
      ar: 'يتم التحقق من الموانع المحتملة خلال الاستشارة قبل بدء الجلسات.'
    },
    safetyComfort: {
      fr: 'Le protocole est adapte au confort de la cliente pendant toute la seance.',
      en: 'Protocol settings are adjusted to keep session comfort high.',
      ar: 'يتم ضبط البروتوكول لضمان راحة العميلة طوال الجلسة.'
    },
    safetyHygiene: {
      fr: 'Materiel et espaces desinfectes selon protocole hygiene clinique.',
      en: 'Equipment and spaces are sanitized under clinic hygiene protocol.',
      ar: 'تعقيم المعدات ومساحات العمل وفق بروتوكول نظافة العيادة.'
    },
    faqs: input.faqs,
    visitTitle: {
      fr: `Visiter Ice Lady - ${input.name.fr}`,
      en: `Visit Ice Lady - ${input.name.en}`,
      ar: `زيارة Ice Lady - ${input.name.ar}`
    },
    visitIntro: {
      fr: 'Notre equipe vous accompagne de la consultation au suivi post-seance.',
      en: 'Our team supports you from consultation to post-session follow-up.',
      ar: 'فريقنا يرافقك من الاستشارة الى المتابعة بعد الجلسة.'
    },
    finalTitle: {
      fr: `Commencez votre parcours ${input.name.fr}.`,
      en: `Start your ${input.name.en} journey.`,
      ar: `ابدئي رحلة ${input.name.ar}.`
    },
    finalDescription: {
      fr: 'Reservez votre consultation pour valider rythme, zones et plan personnalise.',
      en: 'Book consultation to confirm cadence, target areas, and personalized plan.',
      ar: 'احجزي استشارة لتحديد الايقاع والمناطق وخطة العلاج المخصصة.'
    }
  };
}

const quickProfiles: Record<string, LandingProfile> = {
  electrostimulation: buildQuickProfile({
    name: {
      fr: 'Electrostimulation',
      en: 'Electrostimulation',
      ar: 'التحفيز الكهربائي'
    },
    metaTitle: {
      fr: 'Electrostimulation a Marrakech | Ice Lady',
      en: 'Electrostimulation in Marrakech | Ice Lady',
      ar: 'التحفيز الكهربائي في مراكش | Ice Lady'
    },
    metaDescription: {
      fr: 'Seances d electrostimulation a Marrakech pour soutenir tonification et definition de la silhouette.',
      en: 'Electrostimulation sessions in Marrakech to support toning and body contour definition.',
      ar: 'جلسات تحفيز كهربائي في مراكش لدعم الشد وتحديد القوام.'
    },
    heroEyebrow: {
      fr: 'TONIFICATION MUSCULAIRE',
      en: 'MUSCLE TONING',
      ar: 'شد العضلات'
    },
    heroTitle: {
      fr: 'Electrostimulation pour tonifier et redessiner.',
      en: 'Electrostimulation to tone and redefine.',
      ar: 'تحفيز كهربائي لشد العضلات وتحديد القوام.'
    },
    heroSubtitle: {
      fr: 'Activation musculaire ciblee pour completer les parcours minceur et body contouring.',
      en: 'Targeted muscle activation to complement slimming and body contouring plans.',
      ar: 'تنشيط عضلي موجه كمكمل لبرامج التنحيف ونحت القوام.'
    },
    signatureTitle: {
      fr: 'Electro Sculpt Program',
      en: 'Electro Sculpt Program',
      ar: 'Electro Sculpt Program'
    },
    signatureLine: {
      fr: 'Seances adaptees selon zones et objectifs de tonicite.',
      en: 'Sessions adapted to your zones and toning objectives.',
      ar: 'جلسات مخصصة حسب المناطق واهداف الشد.'
    },
    cards: {
      fr: [
        { title: 'Electrostimulation', description: 'Tonification musculaire ciblee.', meta: '35 a 45 min', href: '/en/products/electrostimulation' },
        { title: 'Cryotherapie corps', description: 'Complement pour definir la silhouette.', meta: '45 a 60 min', href: '/en/products/therapiefroid' },
        { title: 'Pressotherapie', description: 'Drainage et recuperation circulatoire.', meta: '35 a 45 min', href: '/en/products/pressotherapie' }
      ],
      en: [
        { title: 'Electrostimulation', description: 'Targeted muscle toning protocol.', meta: '35 to 45 min', href: '/en/products/electrostimulation' },
        { title: 'Body cryotherapy', description: 'Complement for contour definition.', meta: '45 to 60 min', href: '/en/products/therapiefroid' },
        { title: 'Pressotherapy', description: 'Drainage and circulation support.', meta: '35 to 45 min', href: '/en/products/pressotherapie' }
      ],
      ar: [
        { title: 'التحفيز الكهربائي', description: 'بروتوكول شد عضلي موجه.', meta: '35 الى 45 دقيقة', href: '/en/products/electrostimulation' },
        { title: 'تبريد الجسم', description: 'مكمل لتحديد القوام.', meta: '45 الى 60 دقيقة', href: '/en/products/therapiefroid' },
        { title: 'بريسوثيرابي', description: 'تصريف ودعم الدورة الدموية.', meta: '35 الى 45 دقيقة', href: '/en/products/pressotherapie' }
      ]
    },
    zoneOptions: {
      fr: ['Abdomen', 'Cuisses', 'Bras', 'Fessiers'],
      en: ['Abdomen', 'Thighs', 'Arms', 'Glutes'],
      ar: ['البطن', 'الفخذان', 'الذراعان', 'الارداف']
    },
    zonesTabs: {
      fr: [
        { id: 'abdomen', label: 'Abdomen', description: 'Renforcer et soutenir la definition du centre du corps.' },
        { id: 'thighs', label: 'Cuisses', description: 'Tonification ciblee des membres inferieurs.' },
        { id: 'arms', label: 'Bras', description: 'Ameliorer tonicite et apparence des bras.' },
        { id: 'glutes', label: 'Fessiers', description: 'Soutien du tonus et du galbe.' }
      ],
      en: [
        { id: 'abdomen', label: 'Abdomen', description: 'Supports core tone and central contour definition.' },
        { id: 'thighs', label: 'Thighs', description: 'Targeted toning for lower-body zones.' },
        { id: 'arms', label: 'Arms', description: 'Helps improve arm tone and visual firmness.' },
        { id: 'glutes', label: 'Glutes', description: 'Supports lift and muscle activation.' }
      ],
      ar: [
        { id: 'abdomen', label: 'البطن', description: 'يدعم شد المنطقة المركزية وتحسين التحديد.' },
        { id: 'thighs', label: 'الفخذان', description: 'شد موجه لمناطق الجزء السفلي.' },
        { id: 'arms', label: 'الذراعان', description: 'يساعد على تحسين التماسك والمظهر.' },
        { id: 'glutes', label: 'الارداف', description: 'يدعم التونوس والتنشيط العضلي.' }
      ]
    },
    faqs: {
      fr: [
        { question: 'A quelle frequence faire les seances ?', answer: 'Souvent 1 a 3 seances par semaine selon le programme.' },
        { question: 'Est-ce douloureux ?', answer: 'La sensation est generalement supportable et ajustee en cours de seance.' },
        { question: 'Peut-on combiner avec cryotherapie ?', answer: 'Oui, c est une combinaison frequente pour la silhouette.' },
        { question: 'Quand voit-on les effets ?', answer: 'Les effets sont progressifs avec plus de regularite.' }
      ],
      en: [
        { question: 'How often should sessions be done?', answer: 'Most plans use 1 to 3 sessions per week, depending on objective.' },
        { question: 'Is it painful?', answer: 'Sensation is usually manageable and adjusted during treatment.' },
        { question: 'Can it be combined with cryotherapy?', answer: 'Yes, this combination is frequently used in contour plans.' },
        { question: 'When are effects visible?', answer: 'Effects are progressive and improve with consistency.' }
      ],
      ar: [
        { question: 'كم مرة ينصح بالجلسات؟', answer: 'غالبا من 1 الى 3 جلسات اسبوعيا حسب الهدف.' },
        { question: 'هل الجلسة مؤلمة؟', answer: 'الاحساس غالبا محتمل ويمكن ضبطه اثناء الجلسة.' },
        { question: 'هل يمكن دمجه مع التبريد؟', answer: 'نعم، وهو دمج شائع ضمن خطط تنسيق القوام.' },
        { question: 'متى تظهر النتائج؟', answer: 'النتائج تدريجية وتتحسن مع الانتظام.' }
      ]
    }
  }),
  'brow-lift': buildQuickProfile({
    name: { fr: 'Brow Lift', en: 'Brow Lift', ar: 'براو ليفت' },
    metaTitle: {
      fr: 'Brow Lift a Marrakech | Ice Lady',
      en: 'Brow Lift in Marrakech | Ice Lady',
      ar: 'براو ليفت في مراكش | Ice Lady'
    },
    metaDescription: {
      fr: 'Brow lift a Marrakech pour discipliner et relever les sourcils avec rendu naturel.',
      en: 'Brow lift sessions in Marrakech for lifted, structured, and natural-looking brows.',
      ar: 'جلسات براو ليفت في مراكش لرفع وترتيب الحواجب بمظهر طبيعي.'
    },
    heroEyebrow: { fr: 'STYLING SOURCILS', en: 'BROW STYLING', ar: 'تصفيف الحواجب' },
    heroTitle: {
      fr: 'Brow Lift pour un sourcil releve et net.',
      en: 'Brow Lift for a lifted and clean brow shape.',
      ar: 'براو ليفت لمنح الحاجب شكلا مرفوعا ومرتبا.'
    },
    heroSubtitle: {
      fr: 'Discipline les poils du sourcil pour une ligne plus harmonieuse au quotidien.',
      en: 'Disciplines brow hairs for a cleaner, more harmonious everyday shape.',
      ar: 'يرتب شعيرات الحاجب ليمنح شكلا اكثر تناسقا بشكل يومي.'
    },
    signatureTitle: { fr: 'Brow Lift Signature', en: 'Brow Lift Signature', ar: 'Brow Lift Signature' },
    signatureLine: {
      fr: 'Adaptation du style selon la morphologie de votre regard.',
      en: 'Style is adapted to your facial and eye proportions.',
      ar: 'تخصيص الستايل حسب تناسق ملامح الوجه والعين.'
    },
    cards: {
      fr: [
        { title: 'Brow Lift', description: 'Ligne sourcil plus disciplinee.', meta: '40 a 50 min', href: '/en/products/brow-lift' },
        { title: 'Microblading', description: 'Completer la structure des sourcils.', meta: '60 a 90 min', href: '/en/products/microblading' },
        { title: 'Extensions cils', description: 'Renforcer l intensite du regard.', meta: '60 min', href: '/en/products/extension-de-cils-en-soie-et-kashmir' }
      ],
      en: [
        { title: 'Brow Lift', description: 'Disciplined and lifted brow line.', meta: '40 to 50 min', href: '/en/products/brow-lift' },
        { title: 'Microblading', description: 'Complements brow architecture.', meta: '60 to 90 min', href: '/en/products/microblading' },
        { title: 'Lash extensions', description: 'Enhances overall eye intensity.', meta: '60 min', href: '/en/products/extension-de-cils-en-soie-et-kashmir' }
      ],
      ar: [
        { title: 'براو ليفت', description: 'خط حاجب اكثر ترتيبا ورفعا.', meta: '40 الى 50 دقيقة', href: '/en/products/brow-lift' },
        { title: 'ميكروبليدنج', description: 'مكمل مثالي لهندسة الحاجب.', meta: '60 الى 90 دقيقة', href: '/en/products/microblading' },
        { title: 'تمديد رموش', description: 'تعزيز جمالي شامل لمنطقة العين.', meta: '60 دقيقة', href: '/en/products/extension-de-cils-en-soie-et-kashmir' }
      ]
    },
    zoneOptions: {
      fr: ['Sourcils indisciplines', 'Effet releve', 'Symetrie', 'Entretien'],
      en: ['Unruly brows', 'Lift effect', 'Symmetry', 'Maintenance'],
      ar: ['حواجب غير مرتبة', 'تأثير مرفوع', 'تناسق', 'صيانة']
    },
    zonesTabs: {
      fr: [
        { id: 'discipline', label: 'Discipline', description: 'Fixer les poils dans une direction harmonieuse.' },
        { id: 'lift', label: 'Lift', description: 'Effet sourcil leve et regard ouvert.' },
        { id: 'shape', label: 'Forme', description: 'Affiner le dessin et les proportions.' },
        { id: 'maintain', label: 'Entretien', description: 'Conserver la tenue dans le temps.' }
      ],
      en: [
        { id: 'discipline', label: 'Discipline', description: 'Set brow hairs into a clean directional pattern.' },
        { id: 'lift', label: 'Lift effect', description: 'Creates a lifted and more open eye look.' },
        { id: 'shape', label: 'Shape', description: 'Refines brow architecture and proportion.' },
        { id: 'maintain', label: 'Maintenance', description: 'Maintain style retention over time.' }
      ],
      ar: [
        { id: 'discipline', label: 'ترتيب', description: 'تثبيت الشعيرات باتجاه منظم ومتناسق.' },
        { id: 'lift', label: 'رفع', description: 'منح تأثير حاجب مرفوع ونظرة اوسع.' },
        { id: 'shape', label: 'شكل', description: 'تحسين رسم الحاجب وتناسق النسب.' },
        { id: 'maintain', label: 'صيانة', description: 'الحفاظ على النتيجة لفترة اطول.' }
      ]
    },
    faqs: {
      fr: [
        { question: 'Combien de temps tient un brow lift ?', answer: 'La tenue varie selon le type de poil et la routine, avec entretien recommande.' },
        { question: 'Peut-on combiner avec microblading ?', answer: 'Oui, selon votre ligne de sourcil et vos objectifs esthetiques.' },
        { question: 'Est-ce douloureux ?', answer: 'Le soin est generalement confortable.' },
        { question: 'A qui ce soin convient-il ?', answer: 'Aux personnes cherchant des sourcils mieux disciplines et plus leves.' }
      ],
      en: [
        { question: 'How long does a brow lift last?', answer: 'Longevity depends on hair type and routine; maintenance is recommended.' },
        { question: 'Can it be combined with microblading?', answer: 'Yes, depending on your brow structure and final goal.' },
        { question: 'Is it painful?', answer: 'The session is generally comfortable.' },
        { question: 'Who is it suitable for?', answer: 'Clients seeking more disciplined and lifted natural brows.' }
      ],
      ar: [
        { question: 'كم تدوم نتيجة البراو ليفت؟', answer: 'تعتمد المدة على نوع الشعرة وروتين العناية مع توصية بالصيانة.' },
        { question: 'هل يمكن دمجه مع الميكروبليدنج؟', answer: 'نعم، حسب شكل الحاجب والنتيجة المرغوبة.' },
        { question: 'هل الجلسة مؤلمة؟', answer: 'غالبا الجلسة مريحة.' },
        { question: 'لمن يناسب هذا العلاج؟', answer: 'لمن ترغب في حواجب اكثر ترتيبا ورفعا بشكل طبيعي.' }
      ]
    }
  }),
  'lash-lift': buildQuickProfile({
    name: { fr: 'Lash Lift', en: 'Lash Lift', ar: 'لاش ليفت' },
    metaTitle: {
      fr: 'Lash Lift a Marrakech | Ice Lady',
      en: 'Lash Lift in Marrakech | Ice Lady',
      ar: 'لاش ليفت في مراكش | Ice Lady'
    },
    metaDescription: {
      fr: 'Lash lift a Marrakech pour courber les cils naturels et ouvrir le regard.',
      en: 'Lash lift sessions in Marrakech to enhance natural curl and open the gaze.',
      ar: 'جلسات لاش ليفت في مراكش لتعزيز انحناءة الرموش الطبيعية وتوسيع النظرة.'
    },
    heroEyebrow: { fr: 'REHAUSSEMENT CILS', en: 'LASH ENHANCEMENT', ar: 'تعزيز الرموش' },
    heroTitle: {
      fr: 'Lash Lift pour une courbure naturelle elegante.',
      en: 'Lash Lift for a natural and elegant curl.',
      ar: 'لاش ليفت لانحناءة طبيعية وانيقة للرموش.'
    },
    heroSubtitle: {
      fr: 'Alternative low maintenance aux extensions pour un regard ouvert au quotidien.',
      en: 'A low-maintenance alternative to extensions for a naturally open-eye look.',
      ar: 'بديل بسيط للتمديدات يمنح نظرة اوسع بشكل طبيعي يوميا.'
    },
    signatureTitle: { fr: 'Lash Lift Signature', en: 'Lash Lift Signature', ar: 'Lash Lift Signature' },
    signatureLine: {
      fr: 'Courbure adaptee a la longueur naturelle de vos cils.',
      en: 'Curl profile adapted to your natural lash length.',
      ar: 'تحديد الانحناءة حسب طول الرموش الطبيعية.'
    },
    cards: {
      fr: [
        { title: 'Lash Lift', description: 'Courbure naturelle sans extensions.', meta: '40 a 50 min', href: '/en/products/lash-lift' },
        { title: 'Extensions cils', description: 'Pour plus de densite et longueur.', meta: '60 min', href: '/en/products/extension-de-cils-en-soie-et-kashmir' },
        { title: 'Brow Lift', description: 'Combiner sourcils et cils pour regard harmonieux.', meta: '40 a 50 min', href: '/en/products/brow-lift' }
      ],
      en: [
        { title: 'Lash Lift', description: 'Natural curl without extensions.', meta: '40 to 50 min', href: '/en/products/lash-lift' },
        { title: 'Lash Extensions', description: 'For added density and length.', meta: '60 min', href: '/en/products/extension-de-cils-en-soie-et-kashmir' },
        { title: 'Brow Lift', description: 'Combine brow and lash styling for balance.', meta: '40 to 50 min', href: '/en/products/brow-lift' }
      ],
      ar: [
        { title: 'لاش ليفت', description: 'انحناءة طبيعية بدون تمديدات.', meta: '40 الى 50 دقيقة', href: '/en/products/lash-lift' },
        { title: 'تمديد رموش', description: 'لزيادة الطول والكثافة.', meta: '60 دقيقة', href: '/en/products/extension-de-cils-en-soie-et-kashmir' },
        { title: 'براو ليفت', description: 'دمج الحواجب والرموش لمظهر متناسق.', meta: '40 الى 50 دقيقة', href: '/en/products/brow-lift' }
      ]
    },
    zoneOptions: {
      fr: ['Courbure naturelle', 'Regard ouvert', 'Routine simple', 'Entretien'],
      en: ['Natural curl', 'Open-eye effect', 'Low-maintenance', 'Maintenance'],
      ar: ['انحناءة طبيعية', 'نظرة اوسع', 'روتين بسيط', 'صيانة']
    },
    zonesTabs: {
      fr: [
        { id: 'curl', label: 'Courbure', description: 'Accentuer la courbure des cils naturels.' },
        { id: 'open', label: 'Regard ouvert', description: 'Donner plus de presence au regard.' },
        { id: 'routine', label: 'Routine', description: 'Faciliter la mise en beaute quotidienne.' },
        { id: 'maintain', label: 'Entretien', description: 'Planifier une frequence d entretien adaptee.' }
      ],
      en: [
        { id: 'curl', label: 'Curl', description: 'Enhance the natural curve of your lashes.' },
        { id: 'open', label: 'Open-eye', description: 'Create a more lifted and awake eye look.' },
        { id: 'routine', label: 'Routine', description: 'Simplify daily eye beauty maintenance.' },
        { id: 'maintain', label: 'Maintenance', description: 'Set a suitable maintenance cadence.' }
      ],
      ar: [
        { id: 'curl', label: 'انحناءة', description: 'تعزيز الانحناءة الطبيعية للرموش.' },
        { id: 'open', label: 'نظرة اوسع', description: 'منح العين حضورا اكبر ومظهرا مشرقا.' },
        { id: 'routine', label: 'روتين', description: 'تسهيل العناية اليومية بالرموش.' },
        { id: 'maintain', label: 'صيانة', description: 'تحديد تكرار مناسب للمحافظة على النتيجة.' }
      ]
    },
    faqs: {
      fr: [
        { question: 'Combien de temps tient le lash lift ?', answer: 'La tenue varie selon votre cycle ciliaire et votre routine.' },
        { question: 'Puis-je le faire sans extensions ?', answer: 'Oui, c est justement un soin sur cils naturels.' },
        { question: 'Est-ce douloureux ?', answer: 'La seance est generalement confortable.' },
        { question: 'Quel soin associer ?', answer: 'Souvent combine avec brow lift ou extensions selon l objectif.' }
      ],
      en: [
        { question: 'How long does lash lift last?', answer: 'Longevity varies by natural lash cycle and daily routine.' },
        { question: 'Can I do it without extensions?', answer: 'Yes, this treatment is designed for natural lashes.' },
        { question: 'Is it painful?', answer: 'The session is generally comfortable.' },
        { question: 'What can it be paired with?', answer: 'Often paired with brow lift or extensions based on your goal.' }
      ],
      ar: [
        { question: 'كم تدوم نتيجة اللاش ليفت؟', answer: 'تعتمد على دورة الرموش الطبيعية وروتين العناية.' },
        { question: 'هل يمكن اجراؤه بدون تمديدات؟', answer: 'نعم، هو علاج مخصص للرموش الطبيعية.' },
        { question: 'هل الجلسة مؤلمة؟', answer: 'غالبا الجلسة مريحة.' },
        { question: 'مع ماذا يمكن دمجه؟', answer: 'غالبا يدمج مع براو ليفت او تمديد الرموش حسب الهدف.' }
      ]
    }
  }),
  'hollywood-skin': buildQuickProfile({
    name: { fr: 'Hollywood Skin', en: 'Hollywood Skin', ar: 'هوليوود سكين' },
    metaTitle: {
      fr: 'Hollywood Skin a Marrakech | Soin Signature',
      en: 'Hollywood Skin in Marrakech | Signature Care',
      ar: 'هوليوود سكين في مراكش | عناية توقيعية'
    },
    metaDescription: {
      fr: 'Soin signature Hollywood Skin a Marrakech pour glow immediat et qualite de peau.',
      en: 'Hollywood Skin signature treatment in Marrakech for immediate glow and refined texture.',
      ar: 'عناية هوليوود سكين في مراكش لنضارة فورية وتحسين ملمس البشرة.'
    },
    heroEyebrow: { fr: 'SOIN SIGNATURE', en: 'SIGNATURE CARE', ar: 'عناية توقيعية' },
    heroTitle: {
      fr: 'Hollywood Skin pour une peau lumineuse et affinee.',
      en: 'Hollywood Skin for luminous and refined skin.',
      ar: 'هوليوود سكين لبشرة اكثر اشراقة ونعومة.'
    },
    heroSubtitle: {
      fr: 'Protocole premium combine pour preparer la peau aux evenements et maintenir un glow regulier.',
      en: 'A premium combined protocol for event-ready glow and ongoing skin quality support.',
      ar: 'بروتوكول فاخر مدمج لبشرة جاهزة للمناسبات مع دعم مستمر للجودة.'
    },
    signatureTitle: { fr: 'Hollywood Glow Signature', en: 'Hollywood Glow Signature', ar: 'Hollywood Glow Signature' },
    signatureLine: {
      fr: 'Combinaison de techniques visage pour eclat, texture et effet peau lisse.',
      en: 'Facial-technique combination for glow, texture, and smoother appearance.',
      ar: 'دمج تقنيات وجه لدعم النضارة وتنعيم الملمس.'
    },
    cards: {
      fr: [
        { title: 'Hollywood Skin', description: 'Soin signature glow.', meta: '60 a 75 min', href: '/en/products/hollywood-skin' },
        { title: 'Microneedling', description: 'Renforce texture et qualite peau.', meta: '45 a 60 min', href: '/en/products/micro-needling' },
        { title: 'Peeling naturel', description: 'Relance eclat et uniformite.', meta: '45 min', href: '/en/products/peeling-naturel-aux-algues' }
      ],
      en: [
        { title: 'Hollywood Skin', description: 'Signature glow-focused protocol.', meta: '60 to 75 min', href: '/en/products/hollywood-skin' },
        { title: 'Microneedling', description: 'Supports texture and skin quality.', meta: '45 to 60 min', href: '/en/products/micro-needling' },
        { title: 'Natural peel', description: 'Boosts tone clarity and radiance.', meta: '45 min', href: '/en/products/peeling-naturel-aux-algues' }
      ],
      ar: [
        { title: 'هوليوود سكين', description: 'بروتوكول توقيعي للوهج.', meta: '60 الى 75 دقيقة', href: '/en/products/hollywood-skin' },
        { title: 'مايكرونيدلينغ', description: 'يدعم الملمس وجودة البشرة.', meta: '45 الى 60 دقيقة', href: '/en/products/micro-needling' },
        { title: 'تقشير طبيعي', description: 'يعزز نقاء اللون والاشراقة.', meta: '45 دقيقة', href: '/en/products/peeling-naturel-aux-algues' }
      ]
    },
    zoneOptions: {
      fr: ['Eclat evenement', 'Texture', 'Teint terne', 'Entretien glow'],
      en: ['Event glow', 'Texture', 'Dull complexion', 'Glow maintenance'],
      ar: ['نضارة المناسبات', 'الملمس', 'بهتان البشرة', 'صيانة الوهج']
    },
    zonesTabs: {
      fr: [
        { id: 'glow', label: 'Glow', description: 'Effet lumineux et peau fraiche.' },
        { id: 'texture', label: 'Texture', description: 'Lissage progressif du grain de peau.' },
        { id: 'tone', label: 'Teint', description: 'Uniformiser et clarifier le teint.' },
        { id: 'maintenance', label: 'Entretien', description: 'Planifier une routine signature.' }
      ],
      en: [
        { id: 'glow', label: 'Glow', description: 'Luminous and refreshed skin appearance.' },
        { id: 'texture', label: 'Texture', description: 'Progressive smoothing of visible texture.' },
        { id: 'tone', label: 'Tone', description: 'Supports even and clearer complexion.' },
        { id: 'maintenance', label: 'Maintenance', description: 'Set a signature routine cadence.' }
      ],
      ar: [
        { id: 'glow', label: 'الوهج', description: 'مظهر مضيء وبشرة منتعشة.' },
        { id: 'texture', label: 'الملمس', description: 'تنعيم تدريجي للملمس الظاهر.' },
        { id: 'tone', label: 'اللون', description: 'دعم توحيد ونقاء لون البشرة.' },
        { id: 'maintenance', label: 'الصيانة', description: 'تحديد ايقاع روتين توقيعي.' }
      ]
    },
    faqs: {
      fr: [
        { question: 'A qui convient Hollywood Skin ?', answer: 'Aux clientes qui veulent un glow visible et une peau mieux preparee.' },
        { question: 'Combien de seances recommandez-vous ?', answer: 'Une seance ponctuelle ou une cure selon objectif et calendrier.' },
        { question: 'Peut-on combiner avec peeling ?', answer: 'Oui, selon la sensibilite peau et le planning valide en consultation.' },
        { question: 'Le resultat est-il immediat ?', answer: 'Un effet eclat est souvent rapide puis se renforce avec un suivi.' }
      ],
      en: [
        { question: 'Who is Hollywood Skin suitable for?', answer: 'Clients seeking visible glow and improved skin readiness.' },
        { question: 'How many sessions are recommended?', answer: 'Single event-focused session or a program, based on your objective.' },
        { question: 'Can it be combined with peeling?', answer: 'Yes, depending on skin sensitivity and consultation guidance.' },
        { question: 'Are results immediate?', answer: 'Glow is often visible quickly and can be reinforced through follow-up.' }
      ],
      ar: [
        { question: 'لمن يناسب هوليوود سكين؟', answer: 'لمن ترغب في نضارة واضحة وتحسين جاهزية البشرة.' },
        { question: 'كم عدد الجلسات الموصى به؟', answer: 'جلسة مناسبة للمناسبة او برنامج كامل حسب الهدف.' },
        { question: 'هل يمكن دمجه مع التقشير؟', answer: 'نعم، حسب حساسية البشرة وتقييم الاستشارة.' },
        { question: 'هل النتيجة فورية؟', answer: 'غالبا تظهر النضارة بسرعة وتتحسن اكثر مع المتابعة.' }
      ]
    }
  })
};

export function getServiceLandingCopyBySlug(locale: Locale, slug: string): ServiceLandingCopy | null {
  const profile = profiles[slug] || quickProfiles[slug];
  if (!profile) {
    return null;
  }

  return toCopy(locale, profile);
}
