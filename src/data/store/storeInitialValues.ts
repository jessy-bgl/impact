import {
  FootprintByCategory,
  FootprintCategories,
} from "../../domain/models/Footprint";

export const defaultTotalFootprintPerYear = 7800;

export const defaultFootprints = {
  [FootprintCategories.GOODS]: new FootprintByCategory(
    FootprintCategories.GOODS,
    1000,
    (1000 / defaultTotalFootprintPerYear) * 100,
  ),
  [FootprintCategories.TRANSPORT]: new FootprintByCategory(
    FootprintCategories.TRANSPORT,
    2500,
    (2500 / defaultTotalFootprintPerYear) * 100,
  ),
  [FootprintCategories.OTHER]: new FootprintByCategory(
    FootprintCategories.OTHER,
    500,
    (500 / defaultTotalFootprintPerYear) * 100,
  ),
  [FootprintCategories.FOOD]: new FootprintByCategory(
    FootprintCategories.FOOD,
    2000,
    (2000 / defaultTotalFootprintPerYear) * 100,
  ),
  [FootprintCategories.HOUSING]: new FootprintByCategory(
    FootprintCategories.HOUSING,
    2500,
    (2500 / defaultTotalFootprintPerYear) * 100,
  ),
};
