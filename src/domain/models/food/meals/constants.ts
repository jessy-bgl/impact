import { Diet, LunchesAndDinersPerWeek, Frequency } from "./types";
import { MilkType } from "../types";

// https://nosgestesclimat.fr/documentation/alimentation/plats
// https://www.bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?repas.htm
export const lunchesAndDinersPerWeekByDiet = (
  diet: Diet,
): LunchesAndDinersPerWeek => {
  switch (diet) {
    case "vegan": {
      return {
        vegan: 14,
        vegetarian: 0,
        whiteMeat: 0,
        redMeat: 0,
        fattyFish: 0,
        whiteFish: 0,
      };
    }
    case "vegetarian": {
      return {
        vegan: 3,
        vegetarian: 11,
        whiteMeat: 0,
        redMeat: 0,
        fattyFish: 0,
        whiteFish: 0,
      };
    }
    case "littleMeatConsumer": {
      return {
        vegan: 1,
        vegetarian: 7,
        whiteMeat: 4,
        redMeat: 0,
        fattyFish: 1,
        whiteFish: 1,
      };
    }
    case "regularMeatConsumer": {
      return {
        vegan: 0,
        vegetarian: 4,
        whiteMeat: 6,
        redMeat: 2,
        fattyFish: 1,
        whiteFish: 1,
      };
    }
    case "heavyMeatConsumer": {
      return {
        vegan: 0,
        vegetarian: 0,
        whiteMeat: 6,
        redMeat: 6,
        fattyFish: 1,
        whiteFish: 1,
      };
    }
    default: {
      return defaultLunchesAndDinersPerWeek;
    }
  }
};

export const defaultLunchesAndDinersPerWeek: LunchesAndDinersPerWeek =
  lunchesAndDinersPerWeekByDiet("regularMeatConsumer");

// https://docs.google.com/spreadsheets/d/1SVYvBaaYDOUDcg5jX0eZFEColnWWIL8PCLMGrPR000o/edit#gid=1694091424
export const veganMealFootprint = 0.785;

// https://docs.google.com/spreadsheets/d/1SVYvBaaYDOUDcg5jX0eZFEColnWWIL8PCLMGrPR000o/edit#gid=1694091424
export const vegetarianMealFootprint = 1.115;

// https://docs.google.com/spreadsheets/d/1SVYvBaaYDOUDcg5jX0eZFEColnWWIL8PCLMGrPR000o/edit#gid=1200865486
export const whiteMeatMealFootprint = 2.098;

// https://docs.google.com/spreadsheets/d/1SVYvBaaYDOUDcg5jX0eZFEColnWWIL8PCLMGrPR000o/edit#gid=1200865486
export const redMeatMealFootprint = 5.51;

// https://docs.google.com/spreadsheets/d/1SVYvBaaYDOUDcg5jX0eZFEColnWWIL8PCLMGrPR000o/edit#gid=731092178
export const fishMealFootprint = 1.63;

// https://docs.google.com/spreadsheets/d/1SVYvBaaYDOUDcg5jX0eZFEColnWWIL8PCLMGrPR000o/edit#gid=731092178
export const whiteFishMealFootprint = 2.368;

export const continentalBreakfastFootprint = 0.289;

export const milkAndCerealsBreakfastFootprint = (milkType: MilkType) => {
  switch (milkType) {
    case "cow": {
      return 0.468;
    }
    case "oat": {
      return 0.312;
    }
    case "soy": {
      return 0.292;
    }
    default: {
      return 0.468;
    }
  }
};

export const britishBreakfastFootprint = 1.124;

export const veganBreakfastFootprint = 0.419;

export const localProductsFootprintReductionRate = (
  frequency: Frequency,
): number => {
  switch (frequency) {
    case "sometimes": {
      return 0.33;
    }
    case "often": {
      return 0.66;
    }
    case "always": {
      return 1;
    }
    default: {
      return 0;
    }
  }
};

export const seasonalProductsPart = (frequency: Frequency): number => {
  switch (frequency) {
    case "sometimes": {
      return 0.33;
    }
    case "often": {
      return 0.66;
    }
    case "always": {
      return 1;
    }
    default: {
      return 0;
    }
  }
};

// https://github.com/datagir/nosgestesclimat/blob/master/data/alimentation/alimentation%20.%20de%20saison%20.%20ratio.ods
export const seasonalProductsRatio = 2.26;

// https://github.com/datagir/nosgestesclimat/blob/master/data/alimentation/alimentation . de saison . pourcentage saisonable.ods
export const seasonalPercentage = 0.073;
