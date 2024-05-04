import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import {
  ConsumableProducts,
  ConsumptionFrequency,
} from "@domain/entities/categories/everyday-things/consumable-products/ConsumableProducts";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<
  StringifyProperties<ConsumableProducts>,
  "annualFootprint"
>;

export const consumptionOptions: ConsumptionFrequency[] = [
  "low",
  "medium",
  "high",
];

export const useConsumableProducts = () => {
  const storedConsumableProducts = useAppStore(
    (store) => store.emissions.everydayThings.consumableProducts,
  );
  const annualFootprint = new ConsumableProducts(storedConsumableProducts)
    .annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateConsumableProducts } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    consumption: storedConsumableProducts.consumption,
  });

  const { handleUpdate, control, setValue } = useUpdateForm<
    ConsumableProducts,
    FormValues
  >(getDefaultValues(), storedConsumableProducts, updateConsumableProducts);

  return { annualFootprint, control, handleUpdate, setValue };
};
