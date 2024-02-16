import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { PublicTransport } from "@domain/entities/categories/transport/public-transport/PublicTransport";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<
  StringifyProperties<PublicTransport>,
  "annualFootprint"
>;

export const usePublicTransport = () => {
  const storedPublicTransport = useAppStore(
    (store) => store.transport.publicTransport,
  );
  const annualFootprint = new PublicTransport(storedPublicTransport)
    .annualFootprint;

  const { useUpdateTransport } = useContext(UsecasesContext);
  const { updatePublicTransport } = useUpdateTransport();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    hoursPerYearInTrain: storedPublicTransport.hoursPerYearInTrain.toString(),
    hoursPerWeekInBus: storedPublicTransport.hoursPerWeekInBus.toString(),
    hoursPerWeekInMetro: storedPublicTransport.hoursPerWeekInMetro.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<PublicTransport, FormValues>(
    getDefaultValues(),
    storedPublicTransport,
    updatePublicTransport,
  );

  return { control, handleUpdate, annualFootprint };
};
