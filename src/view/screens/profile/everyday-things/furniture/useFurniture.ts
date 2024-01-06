import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";
import { Furniture } from "@domain/models/everyday-things/furniture/Furniture";

export type FormValues = Omit<
  StringifyProperties<Furniture>,
  "annualFootprint"
>;

export const useFurniture = () => {
  const storedFurniture = useAppStore(
    (store) => store.everydayThings.furniture,
  );
  const annualFootprint = new Furniture(storedFurniture).annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateFurniture } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    preservation: storedFurniture.preservation,
    wardrobes: storedFurniture.wardrobes.toString(),
    couches: storedFurniture.couches.toString(),
    mattresses: storedFurniture.mattresses.toString(),
    beds: storedFurniture.beds.toString(),
    tables: storedFurniture.tables.toString(),
    chairs: storedFurniture.chairs.toString(),
    smallFurnitures: storedFurniture.smallFurnitures.toString(),
    bigFurnitures: storedFurniture.bigFurnitures.toString(),
    woodenGardenFurnitures: storedFurniture.woodenGardenFurnitures.toString(),
    resinOrMetalGardenFurnitures:
      storedFurniture.resinOrMetalGardenFurnitures.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<Furniture, FormValues>(
    getDefaultValues(),
    storedFurniture,
    updateFurniture,
  );

  return { annualFootprint, control, handleUpdate };
};
