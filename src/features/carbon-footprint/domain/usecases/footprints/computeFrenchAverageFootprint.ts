import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";

export const createComputeFrenchAverageFootprint = (
  computeEngine: ComputeEngine,
) => {
  const computeFrenchAverageFootprint = (): number =>
    computeEngine.computeFrenchAverageFootprint();

  return { computeFrenchAverageFootprint };
};
