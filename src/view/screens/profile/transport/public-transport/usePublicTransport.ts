import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "../../../../../common/UsecasesContext";
import { useAppStore } from "../../../../../data/store/store";
import { PublicTransport } from "../../../../../domain/models/transport/public-transport/PublicTransport";
import { StringifyProperties } from "../../../../../types/utils";
import { useUpdateForm } from "../../utils/useUpdateForm";

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

  const { handleUpdate, control } = useUpdateForm<PublicTransport>(
    getDefaultValues(),
    storedPublicTransport,
    updatePublicTransport,
  );

  return { control, handleUpdate, annualFootprint };
};
