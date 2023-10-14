import { useAppStore } from "./store";
import { FootprintByCategory } from "../../domain/models/transport/car/FootprintCategories";

export const appStoreActions = {
  getTotalFootprintPerYear: () => useAppStore.getState().totalFootprintPerYear,

  setTotalFootprintPerYear: (newValue: number) =>
    useAppStore.setState((state) => ({
      ...state,
      totalFootprintPerYear: newValue,
    })),

  getFootprintPerCategory: () => useAppStore.getState().footprintPerCategory,

  setFootprintPerCategory: (newValue: FootprintByCategory[]) =>
    useAppStore.setState((state) => ({
      ...state,
      footprintPerCategory: newValue,
    })),
};
