import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";
import {
  CigarettesWeeklyConsumption,
  Tobacco,
} from "@domain/models/everyday-things/tobacco/Tobacco";

export type FormValues = Omit<StringifyProperties<Tobacco>, "annualFootprint">;

export const cigarettesConsumptionOptions: CigarettesWeeklyConsumption[] = [
  "none",
  "onePackPerMonth",
  "onePackPerWeek",
  "onePackPerDay",
];

export const useTobacco = () => {
  const storedTobacco = useAppStore((store) => store.everydayThings.tobacco);
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
