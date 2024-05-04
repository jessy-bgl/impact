import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Home } from "@domain/entities/categories/housing/home/Home";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Home>, "annualFootprint">;

export const useHome = () => {
  const storedHome = useAppStore((store) => store.emissions.housing.home);
  const annualFootprint = new Home(storedHome).annualFootprint;

  const { useUpdateHousing } = useContext(UsecasesContext);
  const { updateHome } = useUpdateHousing();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    occupants: storedHome.occupants.toString(),
    livingSpace: storedHome.livingSpace.toString(),
    ageInYears: storedHome.ageInYears.toString(),
    isAnApartment: storedHome.isAnApartment.toString(),
    isEcoBuilt: storedHome.isEcoBuilt.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<Home, FormValues>(
    getDefaultValues(),
    storedHome,
    updateHome,
  );

  return {
    annualFootprint,
    handleUpdate,
    control,
  };
};
