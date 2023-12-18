import { Furniture } from "@domain/models/everyday-things/furniture/Furniture";

const fakeFurnitures: Omit<
  Furniture,
  "annualFootprint" | "inhabitants" | "preservation"
> = {
  beds: 1,
  bigFurnitures: 1,
  chairs: 1,
  couches: 1,
  mattresses: 1,
  resinOrMetalGardenFurnitures: 1,
  smallFurnitures: 1,
  tables: 1,
  wardrobes: 1,
  woodenGardenFurnitures: 1,
};

export const furnitureDataset: {
  furniture: Furniture;
  expectedAnnualFootprint: number;
}[] = [
  {
    furniture: new Furniture({}),
    expectedAnnualFootprint: 0,
  },
  {
    furniture: new Furniture({ ...fakeFurnitures, preservation: "none" }),
    expectedAnnualFootprint: 190,
  },
  {
    furniture: new Furniture({ ...fakeFurnitures, preservation: "low" }),
    expectedAnnualFootprint: 142,
  },
  {
    furniture: new Furniture({ ...fakeFurnitures, preservation: "medium" }),
    expectedAnnualFootprint: 95,
  },
  {
    furniture: new Furniture({ ...fakeFurnitures, preservation: "high" }),
    expectedAnnualFootprint: 71,
  },
];
