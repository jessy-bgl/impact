import { HouseholdAppliancesPreservation } from "@domain/models/everyday-things/household-appliances/HouseholdAppliances";

export const fridge = {
  footprint: 257,
  lifetimeInYears: 10,
};

export const miniFridge = {
  footprint: 87.6,
  lifetimeInYears: 10,
};

export const freezer = {
  footprint: 415,
  lifetimeInYears: 10,
};

export const washingMachine = {
  footprint: 342,
  lifetimeInYears: 10,
};

export const dryer = {
  footprint: 266,
  lifetimeInYears: 10,
};

export const dishWasher = {
  footprint: 271,
  lifetimeInYears: 10,
};

export const hood = {
  footprint: 60.4,
  lifetimeInYears: 10,
};

export const oven = {
  footprint: 217,
  lifetimeInYears: 12,
};

export const microwaves = {
  footprint: 98.4,
  lifetimeInYears: 12,
};

export const hotplates = {
  footprint: 65.3,
  lifetimeInYears: 10,
};

export const kettle = {
  footprint: 9.9,
  lifetimeInYears: 6,
};

export const coffeeMachine = {
  footprint: 31.9,
  lifetimeInYears: 6,
};

export const vacuumCleaner = {
  footprint: 52.4,
  lifetimeInYears: 8,
};

export const kitchenRobot = {
  footprint: 41.3,
  lifetimeInYears: 8,
};

export const electricLawnMower = {
  footprint: 70.1,
  lifetimeInYears: 8,
};

// TODO : vérifier ces valeurs. Elles ne correspondent pas à celles
// sur Github, mais permettent d'obtenir des résultats cohérents avec
// nosgestesclimat.fr
export const preservationCoefficient = (
  preservation: HouseholdAppliancesPreservation,
) => {
  switch (preservation) {
    case "none":
      return 1;
    case "low":
      return 1.5;
    case "medium":
      return 2;
    case "high":
      return 2.5;
  }
};
