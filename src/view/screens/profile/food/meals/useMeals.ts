import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Meals } from "@domain/entities/categories/food/meals/Meals";
import { BreakfastType } from "@domain/entities/categories/food/meals/types";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Meals>, "annualFootprint">;

export const useMeals = () => {
  const storedMeals = useAppStore((store) => store.food.meals);
  const storedBreakfast = storedMeals.breakfast;
  const annualFootprint = new Meals(storedMeals).annualFootprint;

  const { useUpdateFood } = useContext(UsecasesContext);
  const { updateMeals } = useUpdateFood();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    breakfast: storedMeals.breakfast,
    milkType: storedMeals.milkType,
    diet: storedMeals.diet,
    localProducts: storedMeals.localProducts,
    seasonalProducts: storedMeals.seasonalProducts,
  });

  const { handleUpdate, control, watch, setValue } = useUpdateForm<
    Meals,
    FormValues
  >(getDefaultValues(), storedMeals, updateMeals);

  useEffect(() => {
    if (storedBreakfast !== "milk & cereals") {
      setValue("milkType", "cow");
      handleUpdate("milkType");
    }
  }, [storedBreakfast]);

  const milkAndCerealsBreakfast =
    (watch("breakfast") as BreakfastType) === "milk & cereals";

  return { annualFootprint, milkAndCerealsBreakfast, control, handleUpdate };
};
