/**
 * Real pharmaceutical packaging photos stored locally in /public/products/.
 * Source: Wikimedia Commons (CC-licensed), downloaded for reliable delivery.
 */

const P = "/products";

/** Local product packaging images */
export const REAL_IMAGES = {
  panadol: `${P}/panadol.jpg`,
  paracetamol: `${P}/paracetamol.jpg`,
  tylenol: `${P}/tylenol.jpg`,
  ibuprofen400: `${P}/ibuprofen-400.jpg`,
  ibuprofenBottle: `${P}/ibuprofen-bottle.jpg`,
  ibuprofenEquate: `${P}/ibuprofen-equate.jpg`,
  ibuprofenBurana: `${P}/ibuprofen-burana.jpg`,
  aspirin: `${P}/aspirin.jpg`,
  diclofenacGel: `${P}/diclofenac-gel.jpg`,
  voltarenTablets: `${P}/voltaren-tablets.jpg`,
  tramadol: `${P}/tramadol.jpg`,
  excedrin: `${P}/excedrin.jpg`,
  buscopan: `${P}/buscopan.jpg`,
  topicalGel: `${P}/topical-gel.jpg`,
  lidocaineGel: `${P}/lidocaine-gel.jpg`,
  injection: `${P}/injection.jpg`,
  patch: `${P}/patch.jpg`,
  suppository: `${P}/suppository.jpg`,
  syrup: `${P}/syrup.jpg`,
  powder: `${P}/powder.jpg`,
  medicineBottle: `${P}/medicine-bottle.jpg`,
  capsules: `${P}/capsules.jpg`,
  tabletGeneric: `${P}/paracetamol.jpg`,
  vitaminC: `${P}/vitamin-c.jpg`,
  vitaminD: `${P}/vitamin-d.jpg`,
  vitaminE: `${P}/vitamin-e.jpg`,
  vitaminA: `${P}/vitamin-a.jpg`,
  vitaminB: `${P}/vitamin-b.jpg`,
  iron: `${P}/iron.jpg`,
  calciumCitrate: `${P}/calcium-citrate.jpg`,
  calciumCarbonate: `${P}/calcium-carbonate.jpg`,
  magnesium: `${P}/magnesium.jpg`,
  zinc: `${P}/zinc.jpg`,
  codLiverOil: `${P}/cod-liver-oil.jpg`,
  fishOil: `${P}/fish-oil.jpg`,
  horlicks: `${P}/horlicks.jpg`,
  milo: `${P}/milo.jpg`,
  yakult: `${P}/yakult.jpg`,
  spirulina: `${P}/spirulina.jpg`,
  echinacea: `${P}/echinacea.jpg`,
  ginseng: `${P}/ginseng.jpg`,
  ginkgo: `${P}/ginkgo.jpg`,
  ashwagandha: `${P}/ashwagandha.jpg`,
  thermometer: `${P}/thermometer.jpg`,
  handSanitizer: `${P}/hand-sanitizer.jpg`,
  firstAidKit: `${P}/first-aid-kit.jpg`,
} as const;

interface ImageRule {
  pattern: RegExp;
  image: string;
}

/** Ordered most-specific → least-specific */
const IMAGE_RULES: ImageRule[] = [
  { pattern: /thermometer/, image: REAL_IMAGES.thermometer },
  { pattern: /blood glucose|glucose monitor/, image: REAL_IMAGES.thermometer },
  { pattern: /first aid/, image: REAL_IMAGES.firstAidKit },
  { pattern: /hand sanitizer|sanitizer gel/, image: REAL_IMAGES.handSanitizer },
  { pattern: /face cream|moistur/i, image: REAL_IMAGES.topicalGel },
  { pattern: /baby.*wash|gentle wash/, image: REAL_IMAGES.medicineBottle },

  { pattern: /injection/, image: REAL_IMAGES.injection },
  { pattern: /patch|salonpas/, image: REAL_IMAGES.patch },
  { pattern: /suppositor/, image: REAL_IMAGES.suppository },

  {
    pattern:
      /voltaren emulgel|voltaren gel|nurofen gel|diclofenac gel|deep freeze|deep heat|deep relief|counterpain|moov cream|biofreeze|olfen gel|fenbid gel|tiger balm|bengay|hydrocortisone cream|menthol rub|freeze gel|heat rub|emulgel|topical gel|pain cream|muscle rub|balm/,
    image: REAL_IMAGES.diclofenacGel,
  },
  { pattern: /gel|cream|rub|balm|ointment/, image: REAL_IMAGES.topicalGel },

  { pattern: /scott's emulsion|scott's vitamin/, image: REAL_IMAGES.codLiverOil },
  {
    pattern:
      /syrup|suspension|emulsion|tonic|livolin syrup|vitafit syrup|multivita syrup|kids multivitamin syrup|liver tonic/,
    image: REAL_IMAGES.syrup,
  },

  { pattern: /powder|boska powder|emergen/, image: REAL_IMAGES.powder },

  { pattern: /yakult|probiotic drink/, image: REAL_IMAGES.yakult },
  {
    pattern: /horlicks|complan|ensure|appeton weight|nutritional drink|meal replacement/,
    image: REAL_IMAGES.horlicks,
  },
  { pattern: /milo/, image: REAL_IMAGES.milo },

  { pattern: /vitamin c|redoxon|nutri-c|ascorbic/, image: REAL_IMAGES.vitaminC },
  { pattern: /vitamin d|vitabiotics ultra vitamin d/, image: REAL_IMAGES.vitaminD },
  { pattern: /vitamin e/, image: REAL_IMAGES.vitaminE },
  { pattern: /vitamin a/, image: REAL_IMAGES.vitaminA },
  { pattern: /vitamin b|b-complex|neurobion|becozyme|vitamin b12|vitamin b6/, image: REAL_IMAGES.vitaminB },
  { pattern: /iron|ferrous|feroglobin|hematinic/, image: REAL_IMAGES.iron },
  { pattern: /calcium|caltrate|osteocare|bonecare/, image: REAL_IMAGES.calciumCitrate },
  { pattern: /magnesium/, image: REAL_IMAGES.magnesium },
  { pattern: /zinc/, image: REAL_IMAGES.zinc },
  { pattern: /folic|pregnacare/, image: REAL_IMAGES.vitaminB },
  { pattern: /cod liver|seven seas|omega|fish oil/, image: REAL_IMAGES.codLiverOil },
  { pattern: /spirulina/, image: REAL_IMAGES.spirulina },
  { pattern: /echinacea/, image: REAL_IMAGES.echinacea },
  { pattern: /ginseng/, image: REAL_IMAGES.ginseng },
  { pattern: /ginkgo|gingko/, image: REAL_IMAGES.ginkgo },
  { pattern: /ashwagandha/, image: REAL_IMAGES.ashwagandha },
  {
    pattern:
      /centrum|multivitamin|supradyn|pharmaton|immunace|jointace|diabetone|menopace|visionace|cardioace|hairfollic|perfectil|wellman|wellwoman|vitaday|nutrifactor|nature's field|one-a-day|vitafol|vitaforce|appeton multivitamin|kids multivitamin|junior vitamin|zincovit|livolin forte|berocca|probiotic|coq10|glucosamine|chondroitin|collagen|garlic|royal jelly|bee propolis|lecithin|aloe vera|maca|selenium|biotin|nutrilite|vitabiotics ultra omega/,
    image: REAL_IMAGES.capsules,
  },

  { pattern: /excedrin|migril|solpadeine/, image: REAL_IMAGES.excedrin },
  { pattern: /buscopan/, image: REAL_IMAGES.buscopan },
  { pattern: /tramadol|codeine|co-codamol|myprodol|mybulen/, image: REAL_IMAGES.tramadol },
  { pattern: /panadol extra|panadol advance|panadol night/, image: REAL_IMAGES.panadol },
  {
    pattern:
      /panadol|calpol|cetamol|efferalgan|doliprane|dolocare|pabron|emzor paracetamol|kinapharma paracetamol|procold|fevergone|paracetamol/,
    image: REAL_IMAGES.paracetamol,
  },

  { pattern: /nurofen|brufen|ibuprofen|ibucap|profen|flexon|alaxan|flanax|neurofen/, image: REAL_IMAGES.ibuprofen400 },
  { pattern: /aspirin/, image: REAL_IMAGES.aspirin },
  { pattern: /voltaren|diclofenac|cataflam|olfen|biofenac|diclomol|diclogesic|fenbid|arthrotec/, image: REAL_IMAGES.voltarenTablets },
  {
    pattern:
      /naproxen|naprosyn|naprogesic|ponstan|mefenamic|ponstel|indomethacin|indocid|ketoprofen|piroxicam|feldene|meloxicam|celecoxib|arcoxia|etoricoxib|aceclofenac|lornoxicam|ketorolac|robaxin|methocarbamol|baclofen|tizanidine|norgesic|painex|prednisolone|boska tablet|boska forte|boska menthol|koflyn|prednis/,
    image: REAL_IMAGES.capsules,
  },
];

const IBUPROFEN_POOL = [
  REAL_IMAGES.ibuprofen400,
  REAL_IMAGES.ibuprofenBottle,
  REAL_IMAGES.ibuprofenEquate,
  REAL_IMAGES.ibuprofenBurana,
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getProductImage(name: string): string {
  const lower = name.toLowerCase();

  for (const rule of IMAGE_RULES) {
    if (!rule.pattern.test(lower)) continue;

    if (rule.image === REAL_IMAGES.ibuprofen400) {
      return IBUPROFEN_POOL[hashString(name) % IBUPROFEN_POOL.length];
    }

    if (
      rule.image === REAL_IMAGES.voltarenTablets &&
      /gel|emulgel|cream|rub|freeze|heat|patch/.test(lower)
    ) {
      return REAL_IMAGES.diclofenacGel;
    }

    return rule.image;
  }

  return REAL_IMAGES.tabletGeneric;
}

/** Same image for cards — Next.js Image handles sizing via `sizes` prop */
export function getProductImageThumb(name: string): string {
  return getProductImage(name);
}
