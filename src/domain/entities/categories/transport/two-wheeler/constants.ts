import { g45 } from "@domain/entities/categories/transport/constants";
import { TwoWheelerType } from "@domain/entities/categories/transport/two-wheeler/TwoWheeler";

export const defaultTwoWheelerType: TwoWheelerType = "thermalScooter";

// cf ADEME - HBEFA (2020)
export const twoWheelerDefaultFootprint: Record<TwoWheelerType, number> = {
  thermalScooter: 0.0763,
  electricScooter: 0.03,
  motorbikeLT250: 0.0763,
  motorbikeGT250: 0.191,
};

// https://nosgestesclimat.fr/documentation/empreinte-branche/G45?lang=fr
const g45VehicleMaintenancePart = 0.07;
const g45VehicleBusinessPart = 0.69;
const g45MotorbikePart = 0.02;

// https://www.onisr.securite-routiere.gouv.fr/etudes-et-recherches/vehicules/parc-des-vehicules/le-parc-deux-roues-motorises-des-menages
const twoWheelerInCirculation = 2700000;

// https://www.statistiques.developpement-durable.gouv.fr/bilan-annuel-des-transports-en-2019-0 (G1-1)
const averageTwoWheelerKmPerYear = 3000;

export const thermalMaintenanceFootprint =
  (g45 * 1000000 * g45MotorbikePart * g45VehicleMaintenancePart) /
  (g45VehicleBusinessPart + g45VehicleMaintenancePart) /
  twoWheelerInCirculation /
  averageTwoWheelerKmPerYear;
