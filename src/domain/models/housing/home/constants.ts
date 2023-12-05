import { Home } from "@domain/models/housing/home/Home";

export const defaultNumberOfInhabitants = 2;

export const defaultLivingSpace = 70; // m2

export const defaultAgeInYears = 30;

// https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/
export const footprintByLivingSpace = ({ isAnApartment, isEcoBuilt }: Home) => {
  if (isEcoBuilt) return 144;
  else if (isAnApartment) return 525;
  else return 425;
};

// https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/
export const depreciationPeriodInYears = 50;

// https://futur.eco/documentation/piscine/empreinte-eau-froide
export const poolColdWaterFootprint = 18.91;

// https://futur.eco/documentation/piscine/traitement-chimique
export const poolChemicalTreatmentFootprint = 24.31;

// https://futur.eco/documentation/piscine/construction
export const poolConstructionFootprint = 164.07;
