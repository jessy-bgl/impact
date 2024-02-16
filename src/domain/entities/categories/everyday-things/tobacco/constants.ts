import { CigarettesWeeklyConsumption } from "@domain/entities/categories/everyday-things/tobacco/Tobacco";

// https://pubs.acs.org/doi/full/10.1021/acs.est.8b01533
export const cigaretteFootprint = 0.014;

export const cigarettesInPack = 20;

export const cigarettePacksPerWeek = (
  weeklyConsumption: CigarettesWeeklyConsumption,
) => {
  switch (weeklyConsumption) {
    case "none":
      return 0;
    case "onePackPerMonth":
      return 0.25;
    case "onePackPerWeek":
      return 1;
    case "onePackPerDay":
      return 7;
  }
};
