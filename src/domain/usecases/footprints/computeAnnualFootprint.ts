import { FootprintsRepository } from "@domain/repositories/footprints.repository";

// TODO
export const createComputeAnnualFootprint = (
  footprintsRepository: FootprintsRepository,
) => {
  const computeAnnualFootprint = (): number => {
    const transport = footprintsRepository.fetchTransportFootprint();

    return transport.annualFootprint;
  };

  return computeAnnualFootprint;
};
