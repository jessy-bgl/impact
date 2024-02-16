import { daysInYear } from "@domain/entities/categories/constants";
import { HotDrinksPerWeek } from "@domain/entities/categories/food/drinks/Drinks";
import { MilkType } from "@domain/entities/categories/food/types";

export const defaultHotDrinksPerWeek: HotDrinksPerWeek = {
  coffee: 7,
  tea: 0,
  chocolate: 0,
};

// https://agribalyse.ademe.fr/app/aliments/18003#Caf%C3%A9,_moulu
const groundCoffeeFootprint = 10.09; // kgCO2eq/kg

// we assume that a cup of coffee contains on average 12 grams of ground coffee
const defaultCupOfCoffeeQuantity = 0.012; // kg

export const cupOfCoffeeFootprint =
  groundCoffeeFootprint * defaultCupOfCoffeeQuantity;

// https://agribalyse.ademe.fr/app/aliments/18020#Th%C3%A9_infus%C3%A9,_non_sucr%C3%A9
const brewedTeaFootprint = 0.04;

// https://agribalyse.ademe.fr/app/aliments/18020#Th%C3%A9_infus%C3%A9,_non_sucr%C3%A9
const brewedTeaFootprintPart = 0.25;

const cupOfTeaFootprintWithoutConsumption =
  brewedTeaFootprint * (1 - brewedTeaFootprintPart);

const defaultCupOfTeaQuantity = 0.25; // kg

export const cupOfTeaFootprint =
  cupOfTeaFootprintWithoutConsumption * defaultCupOfTeaQuantity;

// https://agribalyse.ademe.fr/app/aliments/18100#Cacao,_non_sucr%C3%A9,_poudre_soluble
const cocoaFootprint = 27.06;

const defaultCocoaQuantityPerCup = 0.02; // kg

const defaultMilkQuantityPerCup = 0.2; // kg

const milkFootprint = (milkType: MilkType): number => {
  switch (milkType) {
    case "cow":
      // https://agribalyse.ademe.fr/app/aliments/19042#Lait_demi-%C3%A9cr%C3%A9m%C3%A9,_pasteuris%C3%A9
      return 1.32;
    case "soy":
      // https://agribalyse.ademe.fr/app/aliments/18900#Boisson_au_soja,_nature
      return 0.44;
    case "oat":
      // https://agribalyse.ademe.fr/app/aliments/18905#Boisson_à_base_d'avoine,_nature
      return 0.54;
  }
};

export const cupOfChocolateFootprint = (milkType: MilkType): number =>
  cocoaFootprint * defaultCocoaQuantityPerCup +
  milkFootprint(milkType) * defaultMilkQuantityPerCup;

// https://agribalyse.ademe.fr/app/aliments/18430#Eau_embouteillée_de_source
const bottledWaterFootprint = 0.27;

const annualWaterConsumption = 1.5 * daysInYear;

export const bottledWaterAnnualFootprint =
  annualWaterConsumption * bottledWaterFootprint;

// https://agribalyse.ademe.fr/app/aliments/18037#Cola,_sucr%C3%A9,_avec_%C3%A9dulcorants
// https://agribalyse.ademe.fr/app/aliments/2069#Jus_multifruit,_%C3%A0_base_de_concentr%C3%A9,_standard
// https://agribalyse.ademe.fr/app/aliments/18058#Boisson_pr%C3%A9par%C3%A9e_%C3%A0_partir_de_sirop_%C3%A0_diluer_type_menthe,_fraise,_etc,_sucr%C3%A9,_dilu%C3%A9_dans_l'eau
export const sweetDrinkCoef = (0.51 + 0.91 + 0.1) / 3;

// https://agribalyse.ademe.fr/app/aliments/5001#Bi%C3%A8re_%22coeur_de_march%C3%A9%22_(4-5%C2%B0_alcool)
// https://agribalyse.ademe.fr/app/aliments/5215#Vin_blanc_sec
// https://agribalyse.ademe.fr/app/aliments/1012#Cocktail_%C3%A0_base_de_rhum
export const alcoholDrinkCoef = (1.12 + 1.22 + 0.91) / 3;
