import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Boat } from "@domain/models/transport/boat/Boat";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Boat>, "annualFootprint">;

export const useBoat = () => {
  const storedBoat = useAppStore((store) => store.transport.boat);
  const storedBoatUsage = storedBoat.usage;
  const annualFootprint = new Boat(storedBoat).annualFootprint;

  const { useUpdateTransport } = useContext(UsecasesContext);
  const { updateBoat } = useUpdateTransport();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    usage: storedBoat.usage.toString(),
    hoursPerYear: storedBoat.hoursPerYear.toString(),
  });

  const { handleUpdate, control, watch, reset } = useUpdateForm<
    Boat,
    FormValues
  >(getDefaultValues(), storedBoat, updateBoat);

  useEffect(() => {
    if (!storedBoatUsage) reset(getDefaultValues());
  }, [storedBoatUsage]);

  const usage = watch("usage") === "true";

  return { control, handleUpdate, usage, annualFootprint };
};
