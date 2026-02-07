import type { Locale } from '@/lib/i18n';
import type { ServiceLandingCopy } from '@/lib/serviceLandingTemplate';

const frenchCopy: ServiceLandingCopy = {
  metaTitle: 'Cryolipolyse a Marrakech | Ice Lady',
  metaDescription:
    'Cryolipolyse a Marrakech avec parcours prive, protocole personnalise et suivi clinique premium chez Ice Lady.',
  quickNav: [
    { id: 'catalogue', label: 'Soins' },
    { id: 'process', label: 'Parcours' },
    { id: 'zones', label: 'Zones' },
    { id: 'results', label: 'Resultats' },
    { id: 'safety', label: 'Securite' },
    { id: 'faq', label: 'FAQ' },
    { id: 'visit', label: 'Visiter' }
  ],
  contactHeader: {
    eyebrow: 'CONTACT PRIORITAIRE',
    title: 'Parlez a la clinique avant votre seance',
    subtitle:
      "Un premier echange permet de confirmer votre eligibilite et d'organiser un parcours adapte.",
    responseNote: "Reponse rapide pendant les horaires d'ouverture.",
    primaryCta: 'Prendre rendez-vous',
    secondaryCta: 'Contacter sur WhatsApp',
    highlights: [
      "Consultation d'eligibilite avant protocole",
      'Plan personnalise zone par zone',
      'Suivi progressif avec points de controle'
    ]
  },
  hero: {
    eyebrow: 'CLINIQUE PREMIUM A MARRAKECH',
    title: 'Cryolipolyse a Marrakech : sculpter la silhouette avec precision.',
    subtitle:
      'Un parcours prive et personnalise qui associe rigueur clinique, confort premium et accompagnement attentif a chaque etape.',
    primaryCta: 'Prendre rendez-vous',
    secondaryCta: 'Explorer les soins',
    signatureLabel: 'SIGNATURE',
    signatureTitle: 'Programme Cryo Sculpt',
    signatureLine:
      'Protocole personnalise avec suivi progressif adapte a votre silhouette et a vos objectifs.'
  },
  trustSignals: [
    'Avis Google consultables en clinique',
    'Clinique premium a Marrakech',
    "Protocole d'hygiene strict",
    'Accompagnement personalise'
  ],
  catalogue: {
    eyebrow: 'CATALOGUE DE SOINS',
    title: 'Catalogue de soins',
    description:
      'Des zones ciblees, une approche medicalement encadree et des protocoles non invasifs personnalises.',
    cards: [
      {
        title: 'Cryolipolyse - Silhouette (zones ciblees)',
        description:
          'Traitement des amas localises pour accompagner une redessine progressive de la silhouette.',
        meta: 'Duree indicative: 45 a 60 min',
        href: '/en/products/therapiefroid'
      },
      {
        title: 'Double menton',
        description:
          'Protocole dedie au contour du visage pour une approche precise de la zone sous-mentonniere.',
        meta: 'Duree indicative: 30 a 45 min',
        href: '/en/products/therapiefaciale'
      },
      {
        title: 'Bras / ligne soutien-gorge',
        description:
          'Refroidissement controle pour harmoniser les lignes laterales et la zone des bras.',
        meta: 'Duree indicative: 45 a 60 min',
        href: '/en/products/therapiefroid'
      },
      {
        title: 'Cuisses',
        description:
          'Programme progressif pour cibler les zones des cuisses selon vos objectifs esthetiques.',
        meta: 'Duree indicative: 45 a 60 min',
        href: '/en/products/therapiefroid'
      },
      {
        title: "Hanches / poignees d'amour",
        description:
          'Traitement sur-mesure des zones laterales pour affiner la silhouette avec suivi personnalise.',
        meta: 'Duree indicative: 45 a 60 min',
        href: '/en/products/therapiefroid'
      }
    ],
    ctaLabel: 'Demander un RDV'
  },
  process: {
    eyebrow: 'COMMENT CA MARCHE',
    title: 'Comment ca marche',
    description: 'Chaque plan est valide en consultation avant toute seance.',
    steps: [
      {
        title: 'Consultation & eligibilite',
        description:
          'Analyse de vos objectifs, de vos zones et de vos antecedents. Eligibilite confirmee avant toute intervention.'
      },
      {
        title: 'Seance de refroidissement cible',
        description:
          'Application localisee avec controle progressif de la temperature et du confort pendant la seance.'
      },
      {
        title: 'Suivi & resultats progressifs',
        description:
          'Points de controle planifies sur plusieurs semaines pour ajuster le rythme du protocole.'
      }
    ]
  },
  leadForm: {
    eyebrow: 'PRISE DE CONTACT RAPIDE',
    title: 'Demander un rendez-vous',
    subtitle: "L'equipe vous recontacte rapidement pour proposer un creneau.",
    nameLabel: 'Nom',
    phoneLabel: 'Telephone / WhatsApp',
    slotLabel: 'Creneau prefere',
    zoneLabel: 'Zone prioritaire',
    zoneOptions: ['Ventre', 'Hanches', 'Cuisses', 'Bras', 'Double menton', 'Dos/soutien-gorge'],
    contactPreferenceLabel: 'Canal prefere',
    contactPreferenceOptions: ['Appel', 'WhatsApp'],
    submitLabel: 'Envoyer la demande',
    submitHint: 'Sans paiement en ligne. Confirmation avec la clinique.',
    privacyNote:
      'Vos informations servent uniquement a organiser votre rendez-vous et ne sont pas revendues.',
    successTitle: 'Demande envoyee',
    successMessage: 'Merci. Notre equipe vous contacte rapidement pour confirmer votre rendez-vous.'
  },
  zones: {
    eyebrow: 'ZONES TRAITEES',
    title: 'Zones traitees',
    description:
      "Selectionnez une zone pour verifier si la cryolipolyse peut s'integrer a votre plan.",
    tabs: [
      {
        id: 'ventre',
        label: 'Ventre',
        description:
          "Zone centrale frequemment ciblee lorsque l'objectif est une silhouette plus harmonieuse.",
        ctaLabel: 'Est-ce adapte pour moi ?'
      },
      {
        id: 'hanches',
        label: 'Hanches',
        description: 'Approche localisee pour accompagner la reduction des volumes lateraux.',
        ctaLabel: 'Est-ce adapte pour moi ?'
      },
      {
        id: 'cuisses',
        label: 'Cuisses',
        description:
          "Protocole progressif selon l'epaisseur tissulaire et la tolerance individuelle.",
        ctaLabel: 'Est-ce adapte pour moi ?'
      },
      {
        id: 'bras',
        label: 'Bras',
        description:
          'Traitement des zones du bras et de la ligne soutien-gorge selon votre morphologie.',
        ctaLabel: 'Est-ce adapte pour moi ?'
      },
      {
        id: 'double-menton',
        label: 'Double menton',
        description:
          'Ciblage de la zone sous-mentonniere pour soutenir une definition plus nette du profil.',
        ctaLabel: 'Est-ce adapte pour moi ?'
      },
      {
        id: 'dos',
        label: 'Dos/soutien-gorge',
        description:
          'Zone dorsale traitee avec precision pour completer une approche globale de la silhouette.',
        ctaLabel: 'Est-ce adapte pour moi ?'
      }
    ]
  },
  outcomes: {
    eyebrow: 'RESULTATS & AVIS',
    title: 'Resultats & avis',
    description: "Visualisations et retours d'experience presentes a titre indicatif.",
    beforeAfter: [
      {
        title: 'Avant / Apres - Ventre',
        note: 'Illustration de progression a 6-8 semaines'
      },
      {
        title: 'Avant / Apres - Hanches',
        note: 'Illustration de progression a 6-8 semaines'
      },
      {
        title: 'Avant / Apres - Cuisses',
        note: 'Illustration de progression a 8-12 semaines'
      },
      {
        title: 'Avant / Apres - Double menton',
        note: 'Illustration de progression a 4-8 semaines'
      }
    ],
    reviews: [
      {
        quote: 'Equipe attentive, protocole clair et suivi rassurant tout au long du programme.',
        name: 'Avis Google',
        role: 'Cliente verifiee - Marrakech'
      },
      {
        quote: "J'ai apprecie l'approche clinique et le niveau d'hygiene de la clinique.",
        name: 'Avis Google',
        role: 'Cliente verifiee - Programme silhouette'
      },
      {
        quote:
          "Le confort est bien gere pendant la seance et l'accompagnement reste tres professionnel.",
        name: 'Avis Google',
        role: 'Cliente verifiee - Cryolipolyse ciblee'
      }
    ],
    disclaimer: 'Resultats variables selon la personne et le protocole.'
  },
  safety: {
    eyebrow: 'SECURITE & ELIGIBILITE',
    title: 'Securite & eligibilite',
    contraindicationsTitle: 'Contre-indications',
    contraindicationsText:
      'Certaines situations medicales peuvent contre-indiquer le soin (ex: sensibilite au froid, grossesse, pathologies specifiques). Eligibilite confirmee en consultation.',
    comfortTitle: 'Confort de seance',
    comfortText:
      "Sensation de froid intense au debut, suivie d'un engourdissement progressif de la zone.",
    hygieneTitle: 'Protocoles & hygiene',
    hygieneText:
      'Materiel desinfecte, environnement controle et procedures standardisees au sein de la clinique.'
  },
  faqVisit: {
    faqEyebrow: 'FAQ',
    faqTitle: 'Questions frequentes',
    faqs: [
      {
        question: 'Acceptez-vous les paiements en ligne ?',
        answer:
          'Non. Les modalites de paiement sont confirmees directement avec la clinique lors de la prise de rendez-vous.'
      },
      {
        question: 'La cryolipolyse convient-elle a tout le monde ?',
        answer:
          "Non. Une consultation prealable est necessaire pour verifier l'eligibilite et les contre-indications."
      },
      {
        question: 'Combien de seances faut-il prevoir ?',
        answer:
          "Le nombre de seances varie selon la zone, les objectifs et l'evaluation clinique initiale."
      },
      {
        question: 'Est-ce douloureux ?',
        answer:
          "La seance est generalement bien toleree. Le froid initial diminue avec l'engourdissement local."
      },
      {
        question: 'Quand voit-on les resultats ?',
        answer:
          'Les evolutions sont progressives et peuvent apparaitre sur plusieurs semaines selon les profils.'
      },
      {
        question: 'Y a-t-il des effets secondaires ?',
        answer:
          "Des effets transitoires peuvent survenir selon les profils. L'equipe vous informe avant tout protocole."
      }
    ],
    visitEyebrow: 'VISITER ICE LADY',
    visitTitle: 'Visiter Ice Lady - Clinique Marrakech',
    visitIntro:
      'Clinique premium au coeur de Marrakech pour un accompagnement personnalise, de la consultation au suivi.',
    appointmentCta: 'Demander un rendez-vous',
    mapsCta: 'Ouvrir dans Google Maps'
  },
  finalCta: {
    eyebrow: 'PROCHAINE ETAPE',
    title: 'Un plan personnalise commence en consultation.',
    description:
      "Rencontrez l'equipe Ice Lady pour confirmer votre eligibilite et definir un protocole de cryolipolyse adapte.",
    primaryCta: 'Prendre rendez-vous',
    secondaryCta: 'Explorer les soins'
  }
};

const cryotherapyPageCopy: Partial<Record<Locale, ServiceLandingCopy>> = {
  fr: frenchCopy
};

export function getCryotherapyPageCopy(locale: Locale): ServiceLandingCopy {
  return cryotherapyPageCopy[locale] || frenchCopy;
}
