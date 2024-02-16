import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Waste } from "@domain/entities/categories/food/waste/Waste";
import { StringifyProperties, convertStringToType } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<
  StringifyProperties<
    Waste & {
      noFoodWaste: boolean;
      stopAdvertisingSticker: boolean;
      wasteComposting: boolean;
    }
  >,
  "annualFootprint"
>;

export const useWaste = () => {
  const storedWaste = useAppStore((store) => store.food.waste);
  const annualFootprint = new Waste(storedWaste).annualFootprint;

  const { useUpdateFood } = useContext(UsecasesContext);
  const { updateWaste } = useUpdateFood();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    quantity: storedWaste.quantity,
    wasteBonuses: JSON.stringify(storedWaste.wasteBonuses),
    noFoodWaste: storedWaste.wasteBonuses.noFoodWaste.toString(),
    wasteComposting: storedWaste.wasteBonuses.wasteComposting.toString(),
    stopAdvertisingSticker:
      storedWaste.wasteBonuses.stopAdvertisingSticker.toString(),
  });

  const { handleUpdate, control, watch, setValue } = useUpdateForm<
    Waste,
    FormValues
  >(getDefaultValues(), storedWaste, updateWaste);

  const noFoodWaste = watch("noFoodWaste");
  const stopAdvertisingSticker = watch("stopAdvertisingSticker");
  const wasteComposting = watch("wasteComposting");

  useEffect(() => {
    const newWasteBonuses = JSON.stringify({
      noFoodWaste: convertStringToType(noFoodWaste, "boolean"),
      wasteComposting: convertStringToType(wasteComposting, "boolean"),
      stopAdvertisingSticker: convertStringToType(
        stopAdvertisingSticker,
        "boolean",
      ),
    });
    setValue("wasteBonuses", newWasteBonuses);
    handleUpdate("wasteBonuses");
  }, [noFoodWaste, stopAdvertisingSticker, wasteComposting]);

  const disableWasteBonuses = storedWaste.quantity !== "reduction";

  return {
    annualFootprint,
    control,
    handleUpdate,
    setValue,
    disableWasteBonuses,
  };
};
