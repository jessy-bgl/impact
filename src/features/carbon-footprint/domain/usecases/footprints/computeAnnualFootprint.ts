import { Footprints } from "@carbonFootprint/domain/entities/footprints/types";

export const createComputeAnnualFootprint = () => {
  const computeAnnualFootprint = (footprints: Footprints): number => {
    return Number(
      (
        footprints.transport.annualFootprint +
        footprints.food.annualFootprint +
        footprints.housing.annualFootprint +
        footprints.everydayThings.annualFootprint +
        footprints.societalServices.annualFootprint
      ).toFixed(2),
    );
  };

  return { computeAnnualFootprint };
};
