import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "../../../../../common/UsecasesContext";
import { useAppStore } from "../../../../../data/store/store";
import { TwoWheeler } from "../../../../../domain/models/transport/two-wheeler/TwoWheeler";
import { StringifyProperties } from "../../../../../types/utils";
import { useUpdateForm } from "../../utils/useUpdateForm";

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

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    kmPerYear: storedTwoWheeler.kmPerYear.toString(),
    type: storedTwoWheeler.type.toString(),
    usage: storedTwoWheeler.usage.toString(),
  });

  const { handleUpdate, control, watch, reset } = useUpdateForm<
    TwoWheeler,
    FormValues
  >(getDefaultValues(), storedTwoWheeler, updateTwoWheeler);

  useEffect(() => {
    if (!storedTwoWheelerUsage) reset(getDefaultValues());
  }, [storedTwoWheelerUsage]);

  const usage = watch("usage") === "true";

  return { control, handleUpdate, usage, annualFootprint };
};
