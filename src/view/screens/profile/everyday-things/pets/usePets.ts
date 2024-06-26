import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Pets } from "@domain/entities/categories/everyday-things/pets/Pets";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Pets>, "annualFootprint">;

export const PetsLabels: (keyof FormValues)[] = [
  "smallDogs",
  "mediumDogs",
  "bigDogs",
  "cats",
];

export const usePets = () => {
  const storedPets = useAppStore(
    (store) => store.emissions.everydayThings.pets,
  );
  const annualFootprint = new Pets(storedPets).annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updatePets } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    smallDogs: storedPets.smallDogs.toString(),
    mediumDogs: storedPets.mediumDogs.toString(),
    bigDogs: storedPets.bigDogs.toString(),
    cats: storedPets.cats.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<Pets, FormValues>(
    getDefaultValues(),
    storedPets,
    updatePets,
  );

  return { annualFootprint, control, handleUpdate };
};
