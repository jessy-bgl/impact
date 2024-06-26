import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import {
  CigarettesWeeklyConsumption,
  Tobacco,
} from "@domain/entities/categories/everyday-things/tobacco/Tobacco";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Tobacco>, "annualFootprint">;

export const cigarettesConsumptionOptions: CigarettesWeeklyConsumption[] = [
  "none",
  "onePackPerMonth",
  "onePackPerWeek",
  "onePackPerDay",
];

export const useTobacco = () => {
  const storedTobacco = useAppStore(
    (store) => store.emissions.everydayThings.tobacco,
  );
  const annualFootprint = new Tobacco(storedTobacco).annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateTobacco } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    weeklyConsumption: storedTobacco.weeklyConsumption,
  });

  const { handleUpdate, control, setValue } = useUpdateForm<
    Tobacco,
    FormValues
  >(getDefaultValues(), storedTobacco, updateTobacco);

  return { annualFootprint, control, handleUpdate, setValue };
};
