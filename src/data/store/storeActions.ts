import { useAppStore } from "./store";
import { Footprints } from "../../domain/models/Footprint";

export const appStoreActions = {
  getTotalFootprintPerYear: () => useAppStore.getState().totalFootprintPerYear,

  setTotalFootprintPerYear: (newValue: number) =>
    useAppStore.setState((state) => ({
      ...state,
      totalFootprintPerYear: newValue,
    })),

  getFootprintPerCategory: () => useAppStore.getState().footprints,

  setFootprintPerCategory: (newValue: Footprints) =>
    useAppStore.setState((state) => ({
      ...state,
      footprints: newValue,
    })),
};
