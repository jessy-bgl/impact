import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Digital } from "@domain/entities/categories/everyday-things/digital/Digital";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Digital>, "annualFootprint">;

export const DigitalLabels: (keyof FormValues)[] = [
  "mobilePhones",
  "televisions",
  "laptops",
  "desktopComputers",
  "tablets",
  "videoProjectors",
  "cameras",
  "homeCinemas",
  "bluetoothSpeakers",
  "vocalSpeakers",
  "smartWatches",
  "gamingConsoles",
  "portableConsoles",
];

export const useDigital = () => {
  const storedDigital = useAppStore((store) => store.everydayThings.digital);
  const annualFootprint = new Digital(storedDigital).annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateDigital } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    preservation: storedDigital.preservation,
    internetDailyHours: storedDigital.internetDailyHours.toString(),
    mobilePhones: storedDigital.mobilePhones.toString(),
    televisions: storedDigital.televisions.toString(),
    laptops: storedDigital.laptops.toString(),
    desktopComputers: storedDigital.desktopComputers.toString(),
    tablets: storedDigital.tablets.toString(),
    videoProjectors: storedDigital.videoProjectors.toString(),
    cameras: storedDigital.cameras.toString(),
    homeCinemas: storedDigital.homeCinemas.toString(),
    bluetoothSpeakers: storedDigital.bluetoothSpeakers.toString(),
    vocalSpeakers: storedDigital.vocalSpeakers.toString(),
    smartWatches: storedDigital.smartWatches.toString(),
    gamingConsoles: storedDigital.gamingConsoles.toString(),
    portableConsoles: storedDigital.portableConsoles.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<Digital, FormValues>(
    getDefaultValues(),
    storedDigital,
    updateDigital,
  );

  return { annualFootprint, control, handleUpdate };
};
