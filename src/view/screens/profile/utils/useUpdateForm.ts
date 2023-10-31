import { DefaultValues, useForm } from "react-hook-form";

import { WithAnnualFootprint } from "../../../../domain/models/transport/types";
import {
  StringifyProperties,
  convertStringToType,
} from "../../../../types/utils";

export const useUpdateForm = <T extends WithAnnualFootprint>(
  defaultValues: DefaultValues<Omit<StringifyProperties<T>, "annualFootprint">>,
  storedData: T,
  updateUsecase: (data: T) => void,
) => {
  type FormValues = Omit<StringifyProperties<T>, "annualFootprint">;

  const { getValues, ...rest } = useForm<FormValues>({ defaultValues });

  const handleUpdate = (field: keyof FormValues) => {
    const stringValue = getValues(field as any) as string;
    const value = convertStringToType(stringValue, typeof storedData[field]);
    const updatedData = { ...storedData, [field]: value };
    updateUsecase(updatedData);
  };

  return { handleUpdate, ...rest };
};
