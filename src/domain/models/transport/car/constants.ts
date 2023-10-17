import { CarEngine, CarSize, FuelType } from "./Car";

export const defaultSize: CarSize = "medium";

export const defaultEngine: CarEngine = "thermal";

export const defaultFuelType: FuelType = "gasoline";

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

// https://www.statistiques.developpement-durable.gouv.fr/bilan-annuel-des-transports-en-2019-0 (p.3)
export const averageCarKmPerYear = 12200;

// https://librairie.ademe.fr/cadic/7353/enquete-autopartage-2022-rapport.pdf (p.80)
export const sharedCarKmPerYear = 15130;

// https://librairie.ademe.fr/mobilite-et-transport/1267-bilan-transversal-de-l-impact-de-l-electrification-par-segment.html
export const defaultCarLifetime = 10; // years

// https://nosgestesclimat.fr/documentation/empreinte-branche/G45?lang=fr
export const g45 = 6140; // KtCO2e
export const g45VehiclePart = 0.07;

// https://www.insee.fr/fr/statistiques/2045167#tableau-figure1_radio1
export const vehiclesInCirculation = 37880000 + 5977000;

// https://www.citepa.org/fr/secten/
export const fluorinatedGasEmissions = 1374000000; // kgCO2e

export const thermalMaintenanceFootprint =
  (g45 * g45VehiclePart) / vehiclesInCirculation / averageCarKmPerYear;

export const airConditionerFootprint =
  fluorinatedGasEmissions / vehiclesInCirculation / averageCarKmPerYear;

export const electricSmallCarFootprint = 0.0159;
export const electricMediumCarFootprint = 0.0198;
export const electricCarFootprint = 0.0273;

// https://github.com/betagouv/ecolab-data/files/5945898/vehicule_electrique_rapport.pdf
export const thermalCarManufacturingFootprint: Record<CarSize, number> = {
  small: 6700,
  medium: 6700,
  vul: 7600,
  sedan: 7600,
  suv: 7600,
};

// https://github.com/betagouv/ecolab-data/files/5945898/vehicule_electrique_rapport.pdf
export const hybridCarManufacturingFootprint: Record<CarSize, number> = {
  small: 9600,
  medium: 9600,
  vul: 6900,
  sedan: 6900,
  suv: 6900,
};

// https://github.com/betagouv/ecolab-data/files/5945898/vehicule_electrique_rapport.pdf
export const electricCarManufacturingFootprint: Record<CarSize, number> = {
  small: 10200,
  medium: 10200,
  vul: 20200,
  sedan: 20200,
  suv: 20200,
};
