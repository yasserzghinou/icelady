export type ServiceLandingCard = {
  title: string;
  description: string;
  href: string;
  meta?: string;
};

export type ServiceLandingStep = {
  title: string;
  description: string;
};

export type ServiceLandingZone = {
  id: string;
  label: string;
  description: string;
  ctaLabel: string;
};

export type ServiceLandingReview = {
  quote: string;
  name: string;
  role: string;
};

export type ServiceLandingFaq = {
  question: string;
  answer: string;
};

export type ServiceLandingCopy = {
  metaTitle: string;
  metaDescription: string;
  quickNav: Array<{
    id: string;
    label: string;
  }>;
  contactHeader: {
    eyebrow: string;
    title: string;
    subtitle: string;
    responseNote: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    signatureLabel: string;
    signatureTitle: string;
    signatureLine: string;
  };
  trustSignals: string[];
  catalogue: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ServiceLandingCard[];
    ctaLabel: string;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ServiceLandingStep[];
  };
  leadForm: {
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    phoneLabel: string;
    slotLabel: string;
    zoneLabel: string;
    zoneOptions: string[];
    contactPreferenceLabel: string;
    contactPreferenceOptions: string[];
    submitLabel: string;
    submitHint: string;
    privacyNote: string;
    successTitle: string;
    successMessage: string;
  };
  zones: {
    eyebrow: string;
    title: string;
    description: string;
    tabs: ServiceLandingZone[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    description: string;
    beforeAfter: Array<{ title: string; note: string }>;
    reviews: ServiceLandingReview[];
    disclaimer: string;
  };
  safety: {
    eyebrow: string;
    title: string;
    contraindicationsTitle: string;
    contraindicationsText: string;
    comfortTitle: string;
    comfortText: string;
    hygieneTitle: string;
    hygieneText: string;
  };
  faqVisit: {
    faqEyebrow: string;
    faqTitle: string;
    faqs: ServiceLandingFaq[];
    visitEyebrow: string;
    visitTitle: string;
    visitIntro: string;
    appointmentCta: string;
    mapsCta: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
};
