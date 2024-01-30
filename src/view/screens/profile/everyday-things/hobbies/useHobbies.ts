import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Hobbies } from "@domain/entities/everyday-things/hobbies/Hobbies";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Hobbies>, "annualFootprint">;

export const SportLabels: (keyof FormValues)[] = [
  "outdoorIndividualSport",
  "ballSport",
  "swimming",
  "martialSport",
  "athletics",
  "gym",
  "riding",
  "golf",
  "waterSport",
  "winterSport",
  "motorSport",
  "otherSport",
];

export const CulturalLabels: (keyof FormValues)[] = [
  "concertsAndShows",
  "museumsAndMonuments",
  "editions",
  "music",
];

export const useHobbies = () => {
  const storedHobbies = useAppStore((store) => store.everydayThings.hobbies);
  const annualFootprint = new Hobbies(storedHobbies).annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateHobbies } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    concertsAndShows: storedHobbies.concertsAndShows.toString(),
    museumsAndMonuments: storedHobbies.museumsAndMonuments.toString(),
    editions: storedHobbies.editions.toString(),
    music: storedHobbies.music.toString(),
    outdoorIndividualSport: storedHobbies.outdoorIndividualSport.toString(),
    ballSport: storedHobbies.ballSport.toString(),
    waterSport: storedHobbies.waterSport.toString(),
    swimming: storedHobbies.swimming.toString(),
    martialSport: storedHobbies.martialSport.toString(),
    athletics: storedHobbies.athletics.toString(),
    gym: storedHobbies.gym.toString(),
    riding: storedHobbies.riding.toString(),
    golf: storedHobbies.golf.toString(),
    winterSport: storedHobbies.winterSport.toString(),
    motorSport: storedHobbies.motorSport.toString(),
    otherSport: storedHobbies.otherSport.toString(),
  });

  const { handleUpdate, control, setValue } = useUpdateForm<
    Hobbies,
    FormValues
  >(getDefaultValues(), storedHobbies, updateHobbies);

  return { annualFootprint, control, handleUpdate, setValue };
};
