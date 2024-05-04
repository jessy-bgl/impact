import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import {
  OtherProducts,
  SpendingLevel,
} from "@domain/entities/categories/everyday-things/other-products/OtherProducts";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<
  StringifyProperties<OtherProducts>,
  "annualFootprint"
>;

export const spendingLevels: SpendingLevel[] = ["low", "medium", "high"];

export const useOtherProducts = () => {
  const storedOtherProducts = useAppStore(
    (store) => store.emissions.everydayThings.otherProducts,
  );
  const annualFootprint = new OtherProducts(storedOtherProducts)
    .annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateOtherProducts } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    spendingLevel: storedOtherProducts.spendingLevel,
  });

  const { handleUpdate, control, setValue } = useUpdateForm<
    OtherProducts,
    FormValues
  >(getDefaultValues(), storedOtherProducts, updateOtherProducts);

  return { annualFootprint, control, handleUpdate, setValue };
};
