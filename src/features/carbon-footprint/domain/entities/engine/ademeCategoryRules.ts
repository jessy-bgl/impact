import { DottedName } from "@incubateur-ademe/nosgestesclimat";

import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/types";

/**
 * The NGC rule each footprint category is rooted at. NGC keys every question and
 * every computed value under one of these five roots.
 */
export const ademeCategoryRoots = {
  transport: "transport",
  food: "alimentation",
  housing: "logement",
  everydayThings: "divers",
  societalServices: "services sociétaux",
} as const satisfies Record<FootprintCategory, DottedName>;

/**
 * The NGC rules `AdemeComputeEngine` sums into each footprint of a category.
 * The NGC categories are plain `somme` rules, so this has to cover every
 * sub-rule NGC declares under the root: `AdemeComputeEngine.test.ts` asserts
 * exactly that, so a model update adding, renaming or removing a sub-rule fails
 * there instead of silently dropping it from the total footprint.
 */
export const ademeCategoryRules = {
  transport: {
    car: ["transport . voiture"],
    twoWheeler: ["transport . deux roues"],
    plane: ["transport . avion"],
    publicTransport: [
      "transport . transports commun",
      "transport . ferry",
      "transport . train",
    ],
    holidaysTransport: ["transport . vacances"],
    gentleMobility: ["transport . mobilité douce"],
  },
  food: {
    drinks: ["alimentation . boisson"],
    meals: ["alimentation . repas"],
    waste: ["alimentation . déchets"],
  },
  housing: {
    home: ["logement . construction"],
    energy: [
      "logement . électricité",
      "logement . chauffage",
      "logement . climatisation",
    ],
    leisure: [
      "logement . vacances",
      "logement . piscine",
      "logement . extérieur",
    ],
  },
  everydayThings: {
    pet: ["divers . animaux domestiques"],
    furniture: ["divers . ameublement"],
    hobbies: ["divers . loisirs"],
    clothes: ["divers . textile"],
    digital: ["divers . numérique"],
    tobacco: ["divers . tabac"],
    householdAppliances: ["divers . électroménager"],
    otherProducts: [
      "divers . autres produits",
      "divers . produits consommables",
    ],
  },
  societalServices: {
    merchantServices: ["services sociétaux . services marchands"],
    publicServices: ["services sociétaux . services publics"],
  },
} as const satisfies Record<
  FootprintCategory,
  Record<string, readonly DottedName[]>
>;
