import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Plane } from "@domain/entities/categories/transport/plane/Plane";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Plane>, "annualFootprint">;

export const usePlane = () => {
  const storedPlane = useAppStore((store) => store.transport.plane);
  const storedPlaneUsage = storedPlane.usage;
  const annualFootprint = new Plane(storedPlane).annualFootprint;

  const { useUpdateTransport } = useContext(UsecasesContext);
  const { updatePlane } = useUpdateTransport();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    usage: storedPlane.usage.toString(),
    hoursPerYearInShortHaul: storedPlane.hoursPerYearInShortHaul.toString(),
    hoursPerYearInMediumHaul: storedPlane.hoursPerYearInMediumHaul.toString(),
    hoursPerYearInLongHaul: storedPlane.hoursPerYearInLongHaul.toString(),
  });

  const { handleUpdate, control, watch, reset } = useUpdateForm<
    Plane,
    FormValues
  >(getDefaultValues(), storedPlane, updatePlane);

  useEffect(() => {
    if (!storedPlaneUsage) reset(getDefaultValues());
  }, [storedPlaneUsage]);

  const usage = watch("usage") === "true";

  return { control, handleUpdate, usage, annualFootprint };
};
