import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Clothes } from "@domain/entities/categories/everyday-things/clothes/Clothes";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Clothes>, "annualFootprint">;

export const ClothesLabels: (keyof FormValues)[] = [
  "tshirts",
  "shirts",
  "sweatshirts",
  "sweaters",
  "shorts",
  "coats",
  "dresses",
  "pants",
  "shoes",
  "smallItems",
  "bigItems",
];

export const useClothes = () => {
  const storedClothes = useAppStore(
    (store) => store.emissions.everydayThings.clothes,
  );
  const annualFootprint = new Clothes(storedClothes).annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateClothes } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    tshirts: storedClothes.tshirts.toString(),
    shirts: storedClothes.shirts.toString(),
    sweatshirts: storedClothes.sweatshirts.toString(),
    sweaters: storedClothes.sweaters.toString(),
    shorts: storedClothes.shorts.toString(),
    coats: storedClothes.coats.toString(),
    dresses: storedClothes.dresses.toString(),
    pants: storedClothes.pants.toString(),
    shoes: storedClothes.shoes.toString(),
    smallItems: storedClothes.smallItems.toString(),
    bigItems: storedClothes.bigItems.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<Clothes, FormValues>(
    getDefaultValues(),
    storedClothes,
    updateClothes,
  );

  return { annualFootprint, control, handleUpdate };
};
