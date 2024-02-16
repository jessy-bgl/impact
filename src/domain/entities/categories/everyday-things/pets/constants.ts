import { daysInYear } from "@domain/entities/categories/constants";

export type PetSize = "small" | "medium" | "big";

// https://reader.elsevier.com/reader/sd/pii/S0959378020307366?token=375964333F28DED330C9C2CACCD5553CAAE486B7BD641A4F39738E9EC323613DCDABF4A0263131197CB5B47E1D304B99&originRegion=eu-west-1&originCreation=20230330100228
const petFoodEnergyIntake = 4610; // kcal/kg

// https://user-images.githubusercontent.com/55186402/229517254-01e77c3d-acef-4053-9b8f-2931a6ce33a9.png
const numberOfPetsInFranceExceptFishAndBirds = 35700000;

// https://nosgestesclimat.fr/documentation/empreinte-branche/M75
export const petVeterinaryCareFootprint =
  (141.6 * 1000000) / numberOfPetsInFranceExceptFishAndBirds; // kgCO2e

export const cat = {
  foodFootprintPerKg: 2.5, // kgCO2e/kg
  dailyFoodRequirements: (100 * 2.53) / petFoodEnergyIntake, // kg/day
  get foodAnnualFootprint() {
    return this.dailyFoodRequirements * daysInYear * this.foodFootprintPerKg;
  },
  litterAnnualQuantity: 33, // kg,
  litterFootprintPerKg: 0.0506, // kgCO2e/kg
  get litterAnnualFootprint() {
    return this.litterAnnualQuantity * this.litterFootprintPerKg;
  },
  get annualFootprint() {
    return (
      this.foodAnnualFootprint +
      petVeterinaryCareFootprint +
      this.litterAnnualFootprint
    );
  },
};

// https://europeanpetfood.org/wp-content/uploads/2022/03/Updated-Nutritional-Guidelines.pdf
const dogDailyFoodRequirements = (petSize: PetSize) => {
  switch (petSize) {
    case "small":
      return (3.34 * 110) / petFoodEnergyIntake; // kg/day
    case "medium":
      return (9.46 * 110) / petFoodEnergyIntake; // kg/day
    case "big":
      return (15.9 * 110) / petFoodEnergyIntake; // kg/day
  }
};

export const dog = {
  foodFootprintPerKg: 4.3, // kgCO2e/kg
  foodAnnualFootprint: (petSize: PetSize) => {
    return (
      dogDailyFoodRequirements(petSize) * daysInYear * dog.foodFootprintPerKg
    );
  },
  annualFootprint: (petSize: PetSize) => {
    return dog.foodAnnualFootprint(petSize) + petVeterinaryCareFootprint;
  },
};
