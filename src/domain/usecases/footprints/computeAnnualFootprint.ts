import { FootprintsRepository } from "@domain/repositories/footprints.repository";

export const createComputeAnnualFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const computeAnnualFootprint = (): number => {
    const transport = footprintsRepository.fetchTransportFootprint();
    const food = footprintsRepository.fetchFoodFootprint();
    const housing = footprintsRepository.fetchHousingFootprint();
    const everydayThings = footprintsRepository.fetchEverydayThingsFootprint();
    const societalServices =
      footprintsRepository.fetchSocietalServicesFootprint();

    return Number(
      (
        transport.annualFootprint +
        food.annualFootprint +
        housing.annualFootprint +
        everydayThings.annualFootprint +
        societalServices.annualFootprint
      ).toFixed(2),
    );
  };

  return computeAnnualFootprint;
};
