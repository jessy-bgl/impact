import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";
import {
  ConsumableProducts,
  ConsumptionFrequency,
} from "@domain/models/everyday-things/consumable-products/ConsumableProducts";

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
    (store) => store.everydayThings.consumableProducts,
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
