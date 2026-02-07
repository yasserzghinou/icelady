import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { TreatmentMenuTabs } from '@/components/sections/TreatmentMenuTabs';
import { DEFAULT_LOCALE, isLocale, localizePath, t, type Locale } from '@/lib/i18n';
import { getLocalizedServicesAsync } from '@/lib/localizedEntities';
import { buildMetadata } from '@/lib/seo/meta';

type GoalId = 'all' | 'slim' | 'drain' | 'antiAge' | 'glow' | 'redefine';
type CardKey =
  | 'bodyProgramCryo'
  | 'bodyProgramElectro'
  | 'bodyProgramChromo'
  | 'bodyProgramPress'
  | 'bodyCryo'
  | 'bodyElectro'
  | 'bodyChromo'
  | 'bodyPress'
  | 'faceSignatureHollywood'
  | 'faceCryo'
  | 'faceChromo'
  | 'facePeeling'
  | 'bodyPeeling'
  | 'eyesMicroblading'
  | 'eyesBrowLift'
  | 'eyesLashExtensions'
  | 'eyesLashLift';

interface CardCopy {
  title: string;
  summary: string;
  idealFor: string;
  duration?: string;
  badge?: string;
}

interface CardBlueprint {
  key: CardKey;
  kind: 'programme' | 'signature' | 'treatment';
  sourceSlug?: string;
  discoverSlug?: string;
  image?: string;
  goals: GoalId[];
  interest: string;
}

const bodyProgramBlueprints: CardBlueprint[] = [
  {
    key: 'bodyProgramCryo',
    kind: 'programme',
    sourceSlug: 'therapiefroid',
    discoverSlug: 'therapiefroid',
    image: '/images/services/new-Cryo-body.png',
    goals: ['slim', 'redefine'],
    interest: 'programme-amincissant-cryotherapie'
  },
  {
    key: 'bodyProgramElectro',
    kind: 'programme',
    image: '/images/services/slimming-detail-2.jpg',
    goals: ['slim', 'redefine'],
    interest: 'programme-amincissant-electrostimulation'
  },
  {
    key: 'bodyProgramChromo',
    kind: 'programme',
    sourceSlug: 'chromo',
    discoverSlug: 'chromo',
    image: '/images/services/chromo.jpg',
    goals: ['slim', 'drain'],
    interest: 'programme-amincissant-chromotherapie-corps'
  },
  {
    key: 'bodyProgramPress',
    kind: 'programme',
    image: '/images/services/slimming-detail-1.jpg',
    goals: ['drain', 'redefine'],
    interest: 'programme-drainage-pressotherapie'
  }
];

const bodyTreatmentBlueprints: CardBlueprint[] = [
  {
    key: 'bodyCryo',
    kind: 'treatment',
    sourceSlug: 'therapiefroid',
    discoverSlug: 'therapiefroid',
    image: '/images/services/new-Cryo-body.png',
    goals: ['slim', 'redefine'],
    interest: 'cryotherapie-corps'
  },
  {
    key: 'bodyElectro',
    kind: 'treatment',
    image: '/images/services/slimming-detail-2.jpg',
    goals: ['slim', 'redefine'],
    interest: 'electrostimulation'
  },
  {
    key: 'bodyChromo',
    kind: 'treatment',
    sourceSlug: 'chromo',
    discoverSlug: 'chromo',
    image: '/images/services/chromo.jpg',
    goals: ['drain', 'glow'],
    interest: 'chromotherapie-corps'
  },
  {
    key: 'bodyPress',
    kind: 'treatment',
    image: '/images/services/slimming.jpg',
    goals: ['drain'],
    interest: 'pressotherapie'
  },
  {
    key: 'bodyPeeling',
    kind: 'treatment',
    sourceSlug: 'peeling-naturel-aux-algues',
    discoverSlug: 'peeling-naturel-aux-algues',
    image: '/images/services/new-peeling-detail-2.jpg',
    goals: ['glow', 'redefine'],
    interest: 'peeling-corps'
  }
];

const faceProgramBlueprints: CardBlueprint[] = [
  {
    key: 'faceSignatureHollywood',
    kind: 'signature',
    sourceSlug: 'micro-needling',
    discoverSlug: 'micro-needling',
    image: '/images/services/new-hollywoodskin.jpg',
    goals: ['antiAge', 'glow', 'redefine'],
    interest: 'hollywood-skin-signature-visage'
  }
];

const faceTreatmentBlueprints: CardBlueprint[] = [
  {
    key: 'faceCryo',
    kind: 'treatment',
    sourceSlug: 'therapiefaciale',
    discoverSlug: 'therapiefaciale',
    image: '/images/services/new-cryo-face-lift-.png',
    goals: ['antiAge', 'redefine'],
    interest: 'cryotherapie-faciale'
  },
  {
    key: 'faceChromo',
    kind: 'treatment',
    sourceSlug: 'chromo',
    discoverSlug: 'chromo',
    image: '/images/services/chromo-detail-1.jpg',
    goals: ['glow', 'antiAge'],
    interest: 'chromotherapie-faciale'
  },
  {
    key: 'facePeeling',
    kind: 'treatment',
    sourceSlug: 'peeling-naturel-aux-algues',
    discoverSlug: 'peeling-naturel-aux-algues',
    image: '/images/services/new-peeling-detail-2.jpg',
    goals: ['glow', 'antiAge'],
    interest: 'peeling-visage'
  }
];

const browBlueprints: CardBlueprint[] = [
  {
    key: 'eyesMicroblading',
    kind: 'treatment',
    sourceSlug: 'microblading',
    discoverSlug: 'microblading',
    image: '/images/services/new-microblading.jpeg',
    goals: ['redefine'],
    interest: 'microblading'
  },
  {
    key: 'eyesBrowLift',
    kind: 'treatment',
    sourceSlug: 'microblading',
    image: '/images/services/new-browlift.jpeg',
    goals: ['redefine', 'glow'],
    interest: 'brow-lift'
  }
];

const lashBlueprints: CardBlueprint[] = [
  {
    key: 'eyesLashExtensions',
    kind: 'treatment',
    sourceSlug: 'extension-de-cils-en-soie-et-kashmir',
    discoverSlug: 'extension-de-cils-en-soie-et-kashmir',
    image: '/images/services/new-lashes.jpeg',
    goals: ['redefine', 'glow'],
    interest: 'extensions-cil-a-cil'
  },
  {
    key: 'eyesLashLift',
    kind: 'treatment',
    sourceSlug: 'extension-de-cils-en-soie-et-kashmir',
    image: '/images/services/new-lashlift.jpeg',
    goals: ['glow', 'redefine'],
    interest: 'lash-lift'
  }
];

const menuCopy: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    tabsLabel: string;
    goalsLabel: string;
    emptyState: string;
    goals: Array<{ id: GoalId; label: string }>;
    reserveLabel: string;
    discoverLabel: string;
    durationLabel: string;
    tabs: {
      body: { label: string; intro: string; programsTitle: string; treatmentsTitle: string };
      face: { label: string; intro: string; programsTitle: string; treatmentsTitle: string };
      eyes: { label: string; intro: string; browsTitle: string; lashesTitle: string };
      signature: { label: string; intro: string; treatmentsTitle: string };
    };
    cards: Record<CardKey, CardCopy>;
  }
> = {
  fr: {
    title: 'Menu des Soins',
    subtitle:
      'Une organisation premium par objectif pour orienter rapidement chaque cliente vers le bon protocole.',
    tabsLabel: 'Soins',
    goalsLabel: 'Je veux :',
    emptyState: 'Aucun soin ne correspond encore a ce filtre. Essayez une autre intention.',
    goals: [
      { id: 'all', label: 'Tous' },
      { id: 'slim', label: 'Amincir' },
      { id: 'drain', label: 'Drainer' },
      { id: 'antiAge', label: 'Anti-age' },
      { id: 'glow', label: 'Eclat' },
      { id: 'redefine', label: 'Redessiner' }
    ],
    reserveLabel: 'Reserver',
    discoverLabel: 'Decouvrir',
    durationLabel: 'Duree',
    tabs: {
      body: {
        label: 'Body',
        intro: 'Des programmes silhouette premium et des traitements unitaires selon votre priorite clinique.',
        programsTitle: 'Programmes',
        treatmentsTitle: 'Traitements'
      },
      face: {
        label: 'Face',
        intro: 'Une logique signature + traitements cibles pour l eclat, le tonus et la qualite cutanee.',
        programsTitle: 'Soin Signature',
        treatmentsTitle: 'Traitements Visage'
      },
      eyes: {
        label: 'Brows & Lashes',
        intro: 'Une separation claire entre sourcils et cils pour un parcours simple et lisible.',
        browsTitle: 'Sourcils',
        lashesTitle: 'Cils'
      },
      signature: {
        label: 'Signature Programs',
        intro: 'Nos protocoles premium les plus demandes, regroupes dans une section dediee.',
        treatmentsTitle: 'Programmes Signature'
      }
    },
    cards: {
      bodyProgramCryo: {
        title: 'Programme Amincissant - Cryotherapie (Corps)',
        summary: 'Programme corps pour relancer le metabolisme local et accompagner la reduction des volumes.',
        idealFor: 'Ideal pour : amas localises, cellulite, perte de fermete',
        badge: 'Programme'
      },
      bodyProgramElectro: {
        title: 'Programme Amincissant - Electrostimulation',
        summary: 'Protocoles electrodynamiques pour tonifier, soutenir la depense energetique et redessiner la silhouette.',
        idealFor: 'Ideal pour : relachement musculaire, objectif silhouette',
        duration: '35-45 min',
        badge: 'Programme'
      },
      bodyProgramChromo: {
        title: 'Programme Amincissant - Chromotherapie (Corps)',
        summary: 'Association de frequences lumineuses pour completer les parcours minceur et confort tissulaire.',
        idealFor: 'Ideal pour : retention, cellulite, peau terne',
        badge: 'Programme'
      },
      bodyProgramPress: {
        title: 'Programme Drainage & Jambes Legeres - Pressotherapie',
        summary: 'Programme drainage dedie au retour veineux et a la sensation de jambes legeres.',
        idealFor: 'Ideal pour : retention d eau, jambes lourdes, confort circulatoire',
        duration: '35-45 min',
        badge: 'Programme'
      },
      bodyCryo: {
        title: 'Cryotherapie (Corps)',
        summary: 'Soin cible par le froid pour affiner, tonifier et accompagner un remodelage progressif.',
        idealFor: 'Ideal pour : zones localisees, peau d orange'
      },
      bodyElectro: {
        title: 'Electrostimulation',
        summary: 'Seances de stimulation musculaire pour soutenir la tonicite et la definition corporelle.',
        idealFor: 'Ideal pour : tonus, redessiner les contours',
        duration: '35-45 min'
      },
      bodyChromo: {
        title: 'Chromotherapie (Corps)',
        summary: 'Application de lumieres specifiques pour soutenir les protocoles minceur et drainage.',
        idealFor: 'Ideal pour : drainage, confort cutane'
      },
      bodyPress: {
        title: 'Pressotherapie',
        summary: 'Soin mecanique de drainage pour alleger les jambes et optimiser la recuperation.',
        idealFor: 'Ideal pour : retention, jambes lourdes',
        duration: '35-45 min'
      },
      faceSignatureHollywood: {
        title: 'Hollywood Skin (Soin Signature Visage)',
        summary: 'Combinaison premium de micro-needling, cryotherapie faciale et chromotherapie pour un effet global.',
        idealFor: 'Ideal pour : eclat, grain de peau, anti-age',
        duration: '60-75 min',
        badge: 'Soin Signature'
      },
      faceCryo: {
        title: 'Cryotherapie faciale',
        summary: 'Soin de tonification visage pour raffermir les traits et raviver l eclat.',
        idealFor: 'Ideal pour : anti-age, fermete'
      },
      faceChromo: {
        title: 'Chromotherapie faciale',
        summary: 'Lumieres ciblees pour apaiser, illuminer et completer les cures de rejuvenation.',
        idealFor: 'Ideal pour : teint fatigue, manque d eclat'
      },
      facePeeling: {
        title: 'Peeling (Visage)',
        summary: 'Peeling progressif pour lisser la texture, uniformiser et stimuler l eclat du visage.',
        idealFor: 'Ideal pour : pores, irregularites, teint terne'
      },
      bodyPeeling: {
        title: 'Peeling (Corps)',
        summary: 'Peeling corps pour ameliorer la qualite de peau et lisser les zones rugueuses.',
        idealFor: 'Ideal pour : texture, zones rugueuses, eclat corps'
      },
      eyesMicroblading: {
        title: 'Microblading',
        summary: 'Architecture sur mesure du sourcil pour un rendu naturel, net et durable.',
        idealFor: 'Ideal pour : sourcils clairsemes, manque de definition'
      },
      eyesBrowLift: {
        title: 'Brow Lift',
        summary: 'Soin de fixation et de discipline du sourcil pour un effet plus leve et structure.',
        idealFor: 'Ideal pour : sourcils indisciplines, effet lifting regard',
        duration: '40-50 min'
      },
      eyesLashExtensions: {
        title: 'Extensions de cils (Cil a cil)',
        summary: 'Extensions cil a cil pour une intensite elegante et une definition precise du regard.',
        idealFor: 'Ideal pour : allonger, densifier, ouvrir le regard'
      },
      eyesLashLift: {
        title: 'Lash Lift',
        summary: 'Rehaussement naturel des cils pour un regard ouvert sans extensions.',
        idealFor: 'Ideal pour : courbure naturelle, entretien simple',
        duration: '40-50 min'
      }
    }
  },
  en: {
    title: 'Treatment Menu',
    subtitle: 'Premium treatment architecture organized by objective for faster and clearer booking decisions.',
    tabsLabel: 'Treatments',
    goalsLabel: 'I want to:',
    emptyState: 'No treatment matches this filter yet. Try another objective.',
    goals: [
      { id: 'all', label: 'All' },
      { id: 'slim', label: 'Slim' },
      { id: 'drain', label: 'Drain' },
      { id: 'antiAge', label: 'Anti-aging' },
      { id: 'glow', label: 'Glow' },
      { id: 'redefine', label: 'Redefine' }
    ],
    reserveLabel: 'Book',
    discoverLabel: 'Discover',
    durationLabel: 'Duration',
    tabs: {
      body: {
        label: 'Body',
        intro: 'High-value silhouette programs combined with targeted single treatments.',
        programsTitle: 'Programs',
        treatmentsTitle: 'Treatments'
      },
      face: {
        label: 'Face',
        intro: 'A signature-first face architecture plus targeted protocols by skin objective.',
        programsTitle: 'Signature Care',
        treatmentsTitle: 'Facial Treatments'
      },
      eyes: {
        label: 'Brows & Lashes',
        intro: 'A clear split between brow and lash services for a simple and premium journey.',
        browsTitle: 'Brows',
        lashesTitle: 'Lashes'
      },
      signature: {
        label: 'Signature Programs',
        intro: 'Our most premium and memorable programs grouped in one dedicated section.',
        treatmentsTitle: 'Signature Programs'
      }
    },
    cards: {
      bodyProgramCryo: {
        title: 'Slimming Program - Cryotherapy (Body)',
        summary: 'Body cryotherapy protocol designed to support contour reduction and tissue tone.',
        idealFor: 'Ideal for: localized fat, cellulite, loss of firmness',
        badge: 'Program'
      },
      bodyProgramElectro: {
        title: 'Slimming Program - Electrostimulation',
        summary: 'Electro-muscle protocol to support toning, body definition, and metabolic activation.',
        idealFor: 'Ideal for: muscle tone, silhouette definition',
        duration: '35-45 min',
        badge: 'Program'
      },
      bodyProgramChromo: {
        title: 'Slimming Program - Chromotherapy (Body)',
        summary: 'Light-frequency protocol integrated into slimming and tissue comfort journeys.',
        idealFor: 'Ideal for: fluid retention, cellulite, dull skin tone',
        badge: 'Program'
      },
      bodyProgramPress: {
        title: 'Drainage & Light Legs Program - Pressotherapy',
        summary: 'A drainage-led protocol focused on circulation comfort and lower-body lightness.',
        idealFor: 'Ideal for: retention, heavy legs, circulation support',
        duration: '35-45 min',
        badge: 'Program'
      },
      bodyCryo: {
        title: 'Cryotherapy (Body)',
        summary: 'Targeted cold treatment to support shaping, firmness, and progressive contouring.',
        idealFor: 'Ideal for: localized zones, visible cellulite'
      },
      bodyElectro: {
        title: 'Electrostimulation',
        summary: 'Muscle stimulation sessions to improve tone and support body redefinition.',
        idealFor: 'Ideal for: body tone, contour definition',
        duration: '35-45 min'
      },
      bodyChromo: {
        title: 'Chromotherapy (Body)',
        summary: 'Targeted light protocol designed to complement drainage and body programs.',
        idealFor: 'Ideal for: drainage support, skin comfort'
      },
      bodyPress: {
        title: 'Pressotherapy',
        summary: 'Mechanical drainage treatment to relieve heavy legs and support recovery.',
        idealFor: 'Ideal for: retention, heavy legs',
        duration: '35-45 min'
      },
      faceSignatureHollywood: {
        title: 'Hollywood Skin (Signature Face Care)',
        summary: 'Premium combination of microneedling, facial cryotherapy, and facial chromotherapy.',
        idealFor: 'Ideal for: glow, skin texture, anti-aging',
        duration: '60-75 min',
        badge: 'Signature Care'
      },
      faceCryo: {
        title: 'Facial Cryotherapy',
        summary: 'Face toning protocol to refresh contours and restore radiance.',
        idealFor: 'Ideal for: anti-aging, firmness'
      },
      faceChromo: {
        title: 'Facial Chromotherapy',
        summary: 'Targeted light treatment to calm, illuminate, and support rejuvenation plans.',
        idealFor: 'Ideal for: dull skin, uneven glow'
      },
      facePeeling: {
        title: 'Peeling (Face)',
        summary: 'Progressive peel designed to refine texture, tone, and radiance.',
        idealFor: 'Ideal for: pores, uneven texture, dull complexion'
      },
      bodyPeeling: {
        title: 'Peeling (Body)',
        summary: 'Body peel protocol to improve skin quality and smooth rough areas.',
        idealFor: 'Ideal for: texture irregularities, body radiance'
      },
      eyesMicroblading: {
        title: 'Microblading',
        summary: 'Bespoke brow design for a natural, structured, and long-lasting finish.',
        idealFor: 'Ideal for: sparse brows, low definition'
      },
      eyesBrowLift: {
        title: 'Brow Lift',
        summary: 'Brow styling protocol for a lifted and more disciplined shape.',
        idealFor: 'Ideal for: unruly brows, lifted-eye effect',
        duration: '40-50 min'
      },
      eyesLashExtensions: {
        title: 'Lash Extensions (Classic)',
        summary: 'Classic one-by-one lash extensions for refined and elegant intensity.',
        idealFor: 'Ideal for: length, density, open gaze'
      },
      eyesLashLift: {
        title: 'Lash Lift',
        summary: 'Natural lash lifting protocol for a wider look without extensions.',
        idealFor: 'Ideal for: natural curve, low-maintenance routine',
        duration: '40-50 min'
      }
    }
  },
  ar: {
    title: 'قائمة العلاجات',
    subtitle: 'تنظيم علاجي فاخر حسب الهدف لتوجيه العميلة بسرعة نحو البروتوكول المناسب.',
    tabsLabel: 'العلاجات',
    goalsLabel: 'أريد:',
    emptyState: 'لا توجد نتيجة مطابقة لهذا الفلتر حاليا. جربي هدفا اخر.',
    goals: [
      { id: 'all', label: 'الكل' },
      { id: 'slim', label: 'تنحيف' },
      { id: 'drain', label: 'تصريف' },
      { id: 'antiAge', label: 'مضاد للشيخوخة' },
      { id: 'glow', label: 'اشراقة' },
      { id: 'redefine', label: 'اعادة تحديد' }
    ],
    reserveLabel: 'احجزي',
    discoverLabel: 'اكتشفي',
    durationLabel: 'المدة',
    tabs: {
      body: {
        label: 'Body',
        intro: 'برامج قوام متقدمة مع امكانية اختيار علاجات منفردة حسب الهدف.',
        programsTitle: 'البرامج',
        treatmentsTitle: 'العلاجات'
      },
      face: {
        label: 'Face',
        intro: 'هيكلة تبدأ بعلاج توقيعي ثم علاجات وجه موجهة حسب حالة البشرة.',
        programsTitle: 'العناية التوقيعية',
        treatmentsTitle: 'علاجات الوجه'
      },
      eyes: {
        label: 'Brows & Lashes',
        intro: 'تقسيم واضح بين خدمات الحواجب والرموش لتجربة ابسط واوضح.',
        browsTitle: 'الحواجب',
        lashesTitle: 'الرموش'
      },
      signature: {
        label: 'Signature Programs',
        intro: 'تجميع للبرامج الفاخرة الاكثر طلبا داخل تبويب واحد واضح.',
        treatmentsTitle: 'البرامج التوقيعية'
      }
    },
    cards: {
      bodyProgramCryo: {
        title: 'برنامج التنحيف - العلاج بالتبريد (الجسم)',
        summary: 'برنامج تبريد للجسم لدعم تنسيق القوام وتحسين تماسك الانسجة.',
        idealFor: 'مثالي لـ: الدهون الموضعية، السيلوليت، ضعف التماسك',
        badge: 'برنامج'
      },
      bodyProgramElectro: {
        title: 'برنامج التنحيف - التحفيز الكهربائي',
        summary: 'بروتوكول تحفيز عضلي لدعم الشد والنحت ورفع كفاءة الطاقة.',
        idealFor: 'مثالي لـ: ضعف التونوس وتحديد القوام',
        duration: '35-45 دقيقة',
        badge: 'برنامج'
      },
      bodyProgramChromo: {
        title: 'برنامج التنحيف - العلاج اللوني (الجسم)',
        summary: 'جلسات ضوئية ضمن برامج التنحيف لتحسين راحة الانسجة والمظهر العام.',
        idealFor: 'مثالي لـ: احتباس السوائل، السيلوليت، بهتان البشرة',
        badge: 'برنامج'
      },
      bodyProgramPress: {
        title: 'برنامج التصريف وخفة الساقين - بريسوثيرابي',
        summary: 'برنامج تصريف مركز على الراحة الدموية والشعور بخفة الساقين.',
        idealFor: 'مثالي لـ: الاحتباس، ثقل الساقين، دعم الدورة',
        duration: '35-45 دقيقة',
        badge: 'برنامج'
      },
      bodyCryo: {
        title: 'العلاج بالتبريد (الجسم)',
        summary: 'جلسة تبريد موجهة لدعم النحت والشد بشكل تدريجي.',
        idealFor: 'مثالي لـ: المناطق الموضعية والسيلوليت'
      },
      bodyElectro: {
        title: 'التحفيز الكهربائي',
        summary: 'جلسات تنشيط عضلي لتحسين التماسك ودعم تحديد القوام.',
        idealFor: 'مثالي لـ: شد الجسم ونحته',
        duration: '35-45 دقيقة'
      },
      bodyChromo: {
        title: 'العلاج اللوني (الجسم)',
        summary: 'بروتوكول ضوئي موجه يدعم برامج التصريف والعناية بالجسم.',
        idealFor: 'مثالي لـ: التصريف وراحة الجلد'
      },
      bodyPress: {
        title: 'بريسوثيرابي',
        summary: 'علاج تصريف ميكانيكي لتخفيف ثقل الساقين ودعم التعافي.',
        idealFor: 'مثالي لـ: الاحتباس وثقل الساقين',
        duration: '35-45 دقيقة'
      },
      faceSignatureHollywood: {
        title: 'هوليوود سكين (عناية توقيعية للوجه)',
        summary: 'مزيج فاخر من المايكرونيدلينغ والتبريد والعلاج اللوني للوجه.',
        idealFor: 'مثالي لـ: الاشراقة، تحسين الملمس، مقاومة علامات العمر',
        duration: '60-75 دقيقة',
        badge: 'عناية توقيعية'
      },
      faceCryo: {
        title: 'العلاج بالتبريد للوجه',
        summary: 'جلسة شد وتنشيط لملامح الوجه مع اشراقة فورية.',
        idealFor: 'مثالي لـ: مقاومة العمر وتحسين التماسك'
      },
      faceChromo: {
        title: 'العلاج اللوني للوجه',
        summary: 'ضوء موجه لتهدئة البشرة وتعزيز النضارة ضمن خطط التجديد.',
        idealFor: 'مثالي لـ: بهتان البشرة وعدم تجانس الاشراقة'
      },
      facePeeling: {
        title: 'تقشير (الوجه)',
        summary: 'تقشير تدريجي لتحسين الملمس وتوحيد اللون وتعزيز النضارة.',
        idealFor: 'مثالي لـ: المسام والملمس غير المتجانس'
      },
      bodyPeeling: {
        title: 'تقشير (الجسم)',
        summary: 'تقشير للجسم لتحسين جودة الجلد وتنعيم المناطق الخشنة.',
        idealFor: 'مثالي لـ: ملمس غير منتظم واشراقة الجسم'
      },
      eyesMicroblading: {
        title: 'ميكروبليدنج',
        summary: 'تصميم دقيق للحواجب بنتيجة طبيعية ومتوازنة تدوم.',
        idealFor: 'مثالي لـ: حواجب خفيفة ونقص التحديد'
      },
      eyesBrowLift: {
        title: 'براو ليفت',
        summary: 'تثبيت ورفع شعيرات الحاجب لمظهر مرتب ومرفوع.',
        idealFor: 'مثالي لـ: حواجب غير منتظمة وتأثير رفع النظرة',
        duration: '40-50 دقيقة'
      },
      eyesLashExtensions: {
        title: 'تمديد رموش (شعرة بشعرة)',
        summary: 'تمديد كلاسيكي يمنح كثافة انيقة وتعريفا ادق للنظرة.',
        idealFor: 'مثالي لـ: زيادة الطول والكثافة وفتح النظرة'
      },
      eyesLashLift: {
        title: 'لاش ليفت',
        summary: 'رفع طبيعي للرموش لمظهر اوسع من دون تمديد.',
        idealFor: 'مثالي لـ: انحناءة طبيعية وروتين اسهل',
        duration: '40-50 دقيقة'
      }
    }
  }
};

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;

  return buildMetadata({
    path: `/${locale}/collections/all`,
    title: t(locale, 'services.title'),
    description: t(locale, 'services.subtitle')
  });
}

export default async function LocalizedServicesIndexPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const services = await getLocalizedServicesAsync(locale);
  const copy = menuCopy[locale];
  const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
  const contactHref = localizePath('/en/pages/contact', locale);
  const defaultPriceNote =
    services.find((service) => service.priceNote)?.priceNote ||
    (locale === 'fr'
      ? 'Tarif communique lors de la consultation'
      : locale === 'ar'
        ? 'يتم تحديد السعر اثناء الاستشارة'
        : 'Price shared during consultation');

  function mapCard(blueprint: CardBlueprint) {
    const cardCopy = copy.cards[blueprint.key];
    const sourceService = blueprint.sourceSlug ? serviceBySlug.get(blueprint.sourceSlug) : undefined;
    const discoverService = blueprint.discoverSlug ? serviceBySlug.get(blueprint.discoverSlug) : undefined;

    return {
      id: blueprint.key,
      title: sourceService?.name || cardCopy.title,
      summary: sourceService?.summary || cardCopy.summary,
      idealFor: cardCopy.idealFor,
      duration: `${copy.durationLabel}: ${cardCopy.duration || sourceService?.duration || '45-60 min'}`,
      priceNote: sourceService?.priceNote || defaultPriceNote,
      image: sourceService?.heroImage || blueprint.image || '/images/services/default.jpg',
      discoverHref: discoverService
        ? localizePath(discoverService.path, locale)
        : `${contactHref}?intent=${encodeURIComponent(blueprint.interest)}`,
      reserveHref: `${contactHref}?intent=${encodeURIComponent(blueprint.interest)}`,
      discoverLabel: copy.discoverLabel,
      reserveLabel: copy.reserveLabel,
      badge: cardCopy.badge,
      kind: blueprint.kind
    };
  }

  return (
    <div className="section-shell">
      <TreatmentMenuTabs
        title={copy.title}
        subtitle={copy.subtitle}
        tabsLabel={copy.tabsLabel}
        emptyState={copy.emptyState}
        tabs={[
          {
            id: 'body',
            label: copy.tabs.body.label,
            intro: copy.tabs.body.intro,
            treatmentsTitle: copy.tabs.body.treatmentsTitle,
            treatments: bodyTreatmentBlueprints.map(mapCard)
          },
          {
            id: 'face',
            label: copy.tabs.face.label,
            intro: copy.tabs.face.intro,
            treatmentsTitle: copy.tabs.face.treatmentsTitle,
            treatments: faceTreatmentBlueprints.map(mapCard)
          },
          {
            id: 'eyes',
            label: copy.tabs.eyes.label,
            intro: copy.tabs.eyes.intro,
            groupedTreatments: [
              {
                id: 'brows',
                title: copy.tabs.eyes.browsTitle,
                cards: browBlueprints.map(mapCard)
              },
              {
                id: 'lashes',
                title: copy.tabs.eyes.lashesTitle,
                cards: lashBlueprints.map(mapCard)
              }
            ]
          },
          {
            id: 'signature',
            label: copy.tabs.signature.label,
            intro: copy.tabs.signature.intro,
            treatmentsTitle: copy.tabs.signature.treatmentsTitle,
            treatments: [...bodyProgramBlueprints, ...faceProgramBlueprints].map(mapCard)
          }
        ]}
      />
    </div>
  );
}
