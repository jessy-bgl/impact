import { CarEngine, CarSize, FuelType } from "./CarEmissions";

// l / 100km
// https://librairie.ademe.fr/mobilite-et-transport/3273-elaboration-selon-les-principes-des-acv-des-bilans-energetiques-des-emissions-de-gaz-a-effet-de-serre-et-des-autres-impacts-environnementaux.html
export const defaultAverageFuelConsumption: Record<CarSize, number> = {
  small: 5,
  medium: 6,
  vul: 6,
  sedan: 7,
  suv: 8,
};

// https://bilans-ges.ademe.fr/fr/basecarbone/donnees-consulter/liste-element?recherche=diesel
export const defaultAverageFootPrintPerLiter: Record<FuelType, number> = {
  diesel: 3.1,
  gasoline: 2.7,
  biofuels: 1.11,
};

// https://librairie.ademe.fr/cadic/7353/enquete-autopartage-2022-rapport.pdf (p. 80)
export const sharedCarKmPerYear = 15130;

// https://librairie.ademe.fr/mobilite-et-transport/1267-bilan-transversal-de-l-impact-de-l-electrification-par-segment.html
export const lifetime = 10; // years

export const defaultSize: CarSize = "medium";

export const defaultEngine: CarEngine = "thermal";

export const defaultFuelType: FuelType = "gasoline";
