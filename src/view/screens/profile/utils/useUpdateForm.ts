import { DefaultValues, FieldValues, useForm } from "react-hook-form";

import { WithAnnualFootprint } from "../../../../domain/models/transport/types";
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

  const handleUpdate = (field: keyof T) => {
    const stringValue = getValues(field as any) as string;
    const value = convertStringToType(stringValue, typeof storedData[field]);
    const updatedData = { ...storedData, [field]: value };
    updateUsecase(updatedData);
  };

  return { handleUpdate, ...rest };
};
