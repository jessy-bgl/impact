import {
  FootprintByCategory,
  FootprintCategories,
} from "../../domain/models/transport/car/FootprintCategories";

export const defaultTotalFootprintPerYear = 7800;

export const defaultFootprintPerCategory = [
  new FootprintByCategory(
    FootprintCategories.GOODS,
    1000,
    (1000 / defaultTotalFootprintPerYear) * 100,
  ),
  new FootprintByCategory(
    FootprintCategories.TRANSPORT,
    2500,
    (2500 / defaultTotalFootprintPerYear) * 100,
  ),
  new FootprintByCategory(
    FootprintCategories.OTHER,
    500,
    (500 / defaultTotalFootprintPerYear) * 100,
  ),
  new FootprintByCategory(
    FootprintCategories.FOOD,
    2000,
    (2000 / defaultTotalFootprintPerYear) * 100,
  ),
  new FootprintByCategory(
    FootprintCategories.HOUSING,
    2500,
    (2500 / defaultTotalFootprintPerYear) * 100,
  ),
];
