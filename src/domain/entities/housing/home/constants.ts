import { Home } from "@domain/entities/housing/home/Home";

export const defaultAgeInYears = 30;

// https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/
export const footprintByLivingSpace = ({ isAnApartment, isEcoBuilt }: Home) => {
  if (isEcoBuilt) return 144;
  else if (isAnApartment) return 525;
  else return 425;
};

// https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/
export const depreciationPeriodInYears = 50;
