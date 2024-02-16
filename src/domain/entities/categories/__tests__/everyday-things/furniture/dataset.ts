import { Furniture } from "@domain/entities/categories/everyday-things/furniture/Furniture";

const fakeFurnitures: Omit<
  Furniture,
  "annualFootprint" | "occupants" | "preservation"
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
    furniture: new Furniture({
      ...fakeFurnitures,
      occupants: 2,
      preservation: "none",
    }),
    expectedAnnualFootprint: 190,
  },
  {
    furniture: new Furniture({
      ...fakeFurnitures,
      occupants: 2,
      preservation: "low",
    }),
    expectedAnnualFootprint: 142,
  },
  {
    furniture: new Furniture({
      ...fakeFurnitures,
      occupants: 2,
      preservation: "medium",
    }),
    expectedAnnualFootprint: 95,
  },
  {
    furniture: new Furniture({
      ...fakeFurnitures,
      occupants: 2,
      preservation: "high",
    }),
    expectedAnnualFootprint: 71,
  },
];
