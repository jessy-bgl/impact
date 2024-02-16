import { Preservation } from "@domain/entities/categories/everyday-things/types";

export const wardrobe = {
  footprint: 907,
  lifetimeInYears: 10,
};

export const couch = {
  footprint: 186,
  lifetimeInYears: 10,
};

export const mattress = {
  footprint: 258.5,
  lifetimeInYears: 10,
};

export const bed = {
  footprint: 87.5,
  lifetimeInYears: 10,
};

export const table = {
  footprint: 60.1,
  lifetimeInYears: 10,
};

export const chair = {
  footprint: 25.95,
  lifetimeInYears: 10,
};

const furnitureFootprintPerKg = 1.833; // kgCO2e/kg

export const smallFurniture = {
  footprint: furnitureFootprintPerKg * 5,
  lifetimeInYears: 10,
};

export const bigFurniture = {
  footprint: furnitureFootprintPerKg * 25,
  lifetimeInYears: 10,
};

export const woodenGardenFurniture = {
  footprint: 69.2,
  lifetimeInYears: 10,
};

export const resinOrMetalGardenFurniture = {
  footprint: 249,
  lifetimeInYears: 10,
};

export const preservationCoefficient = (preservation: Preservation) => {
  switch (preservation) {
    case "none":
      return 1 / 2;
    case "low":
      return 2 / 3;
    case "medium":
      return 1;
    case "high":
      return 4 / 3;
  }
};
