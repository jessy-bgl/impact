export type AdemeComparatorType =
  | "convertisseur"
  | "numerique"
  | "usagenumerique"
  | "livraison"
  | "chauffage"
  | "transport"
  | "fruitsetlegumes"
  | "repas"
  | "habillement"
  | "mobilier"
  | "electromenager"
  | "boisson";

export const ADEME_IFRAME_BASE_URL = "https://impactco2.fr/iframes";

// impactco2.fr renames a few iframe routes, "convertisseur" being served under
// "comparateur". Mapping them here avoids a redirect on every screen load.
const ADEME_IFRAME_SLUGS: Partial<Record<AdemeComparatorType, string>> = {
  convertisseur: "comparateur",
};

export const buildAdemeComparatorUrl = (
  type: AdemeComparatorType,
  theme: "default" | "night",
): string =>
  `${ADEME_IFRAME_BASE_URL}/${ADEME_IFRAME_SLUGS[type] ?? type}?theme=${theme}`;
