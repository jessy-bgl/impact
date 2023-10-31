import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { UsecasesContext } from "../../../../../common/UsecasesContext";
import { useAppStore } from "../../../../../data/store/store";
import { TwoWheeler } from "../../../../../domain/models/transport/two-wheeler/TwoWheeler";
import {
  StringifyProperties,
  convertStringToType,
} from "../../../../../types/utils";

export type FormValues = Omit<
  StringifyProperties<TwoWheeler>,
  "annualFootprint"
>;

export const useTwhoWheeler = () => {
  const storedTwoWheeler = useAppStore((store) => store.transport.twoWheeler);
  const storedTwoWheelerUsage = storedTwoWheeler.usage;
  const annualFootprint = new TwoWheeler(storedTwoWheeler).annualFootprint;

  const { useUpdateTransport } = useContext(UsecasesContext);
  const { updateTwoWheeler } = useUpdateTransport();

  const getDefaultValues = () => ({
    kmPerYear: storedTwoWheeler.kmPerYear.toString(),
    type: storedTwoWheeler.type.toString(),
    usage: storedTwoWheeler.usage.toString(),
  });

  const { control, getValues, watch, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  });

  const handleUpdate = (field: keyof FormValues) => {
    const stringValue = getValues(field);
    const value = convertStringToType(
      stringValue,
      typeof storedTwoWheeler[field],
    );
    storedTwoWheeler[field] = value as never;
    updateTwoWheeler(storedTwoWheeler);
  };

  useEffect(() => {
    if (!storedTwoWheelerUsage) reset(getDefaultValues());
  }, [storedTwoWheelerUsage]);

  const usage = watch("usage") === "true";

  return { control, handleUpdate, usage, annualFootprint };
};
