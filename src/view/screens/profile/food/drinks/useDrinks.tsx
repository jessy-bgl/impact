import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Drinks } from "@domain/entities/food/drinks/Drinks";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<
  StringifyProperties<
    Drinks & {
      chocolatePerWeek: number;
      coffeePerWeek: number;
      teaPerWeek: number;
    }
  >,
  "annualFootprint"
>;

export const useDrinks = () => {
  const storedDrinks = useAppStore((store) => store.food.drinks);
  const annualFootprint = new Drinks(storedDrinks).annualFootprint;

  const { useUpdateFood } = useContext(UsecasesContext);
  const { updateDrinks } = useUpdateFood();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    hotDrinksPerWeek: JSON.stringify(storedDrinks.hotDrinksPerWeek),
    chocolatePerWeek: storedDrinks.hotDrinksPerWeek.chocolate.toString(),
    coffeePerWeek: storedDrinks.hotDrinksPerWeek.coffee.toString(),
    teaPerWeek: storedDrinks.hotDrinksPerWeek.tea.toString(),
    milkType: storedDrinks.milkType,
    alcoholLitersPerWeek: storedDrinks.alcoholLitersPerWeek.toString(),
    sodaLitersPerWeek: storedDrinks.sodaLitersPerWeek.toString(),
    bottledWater: storedDrinks.bottledWater.toString(),
  });

  const { handleUpdate, control, watch, setValue } = useUpdateForm<
    Drinks,
    FormValues
  >(getDefaultValues(), storedDrinks, updateDrinks);

  const chocolatePerWeek = watch("chocolatePerWeek");
  const coffeePerWeek = watch("coffeePerWeek");
  const teaPerWeek = watch("teaPerWeek");

  useEffect(() => {
    setValue(
      "hotDrinksPerWeek",
      JSON.stringify({
        chocolate: Number(chocolatePerWeek) || 0,
        coffee: Number(coffeePerWeek) || 0,
        tea: Number(teaPerWeek) || 0,
      }),
    );
    handleUpdate("hotDrinksPerWeek");
  }, [chocolatePerWeek, coffeePerWeek, teaPerWeek]);

  const disableMilkSelection = chocolatePerWeek === "0" || !chocolatePerWeek;

  return { annualFootprint, control, handleUpdate, disableMilkSelection };
};
