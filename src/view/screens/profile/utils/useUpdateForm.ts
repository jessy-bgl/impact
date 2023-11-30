import { DefaultValues, FieldValues, useForm } from "react-hook-form";

import { WithAnnualFootprint } from "../../../../domain/models/types";
import { convertStringToType } from "../../../../types/utils";

export const useUpdateForm = <
  T extends WithAnnualFootprint,
  K extends FieldValues,
>(
  defaultValues: DefaultValues<K>,
  storedData: T,
  updateUsecase: (data: T) => void,
) => {
  const { getValues, ...rest } = useForm<K>({ defaultValues });

  const handleUpdate = (field: any) => {
    const stringValue = getValues(field);
    const targetType = typeof storedData[field as keyof T];
    if (targetType === "undefined") return;
    const value = convertStringToType(stringValue, targetType);
    const updatedData = { ...storedData, [field]: value };
    updateUsecase(updatedData);
  };

  return { handleUpdate, getValues, ...rest };
};
