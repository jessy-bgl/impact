import { useContext } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";
import { HouseholdAppliances } from "@domain/models/everyday-things/household-appliances/HouseholdAppliances";

export type FormValues = Omit<
  StringifyProperties<HouseholdAppliances>,
  "annualFootprint"
>;

export const HouseholdAppliancesLabels: (keyof FormValues)[] = [
  "fridges",
  "miniFridges",
  "freezers",
  "washingMachines",
  "dryers",
  "dishWashers",
  "hoods",
  "ovens",
  "microwaves",
  "hotPlates",
  "kettles",
  "coffeeMachines",
  "vacuumCleaners",
  "kitchenRobots",
  "electricLawnMowers",
];

export const useHouseholdAppliances = () => {
  const storedHouseholdAppliances = useAppStore(
    (store) => store.everydayThings.householdAppliances,
  );
  const annualFootprint = new HouseholdAppliances(storedHouseholdAppliances)
    .annualFootprint;

  const { useUpdateEverydayThings } = useContext(UsecasesContext);
  const { updateHouseholdAppliances } = useUpdateEverydayThings();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    preservation: storedHouseholdAppliances.preservation,
    fridges: storedHouseholdAppliances.fridges.toString(),
    miniFridges: storedHouseholdAppliances.miniFridges.toString(),
    freezers: storedHouseholdAppliances.freezers.toString(),
    washingMachines: storedHouseholdAppliances.washingMachines.toString(),
    dryers: storedHouseholdAppliances.dryers.toString(),
    dishWashers: storedHouseholdAppliances.dishWashers.toString(),
    hoods: storedHouseholdAppliances.hoods.toString(),
    ovens: storedHouseholdAppliances.ovens.toString(),
    microwaves: storedHouseholdAppliances.microwaves.toString(),
    hotPlates: storedHouseholdAppliances.hotPlates.toString(),
    kettles: storedHouseholdAppliances.kettles.toString(),
    coffeeMachines: storedHouseholdAppliances.coffeeMachines.toString(),
    vacuumCleaners: storedHouseholdAppliances.vacuumCleaners.toString(),
    kitchenRobots: storedHouseholdAppliances.kitchenRobots.toString(),
    electricLawnMowers: storedHouseholdAppliances.electricLawnMowers.toString(),
  });

  const { handleUpdate, control } = useUpdateForm<
    HouseholdAppliances,
    FormValues
  >(getDefaultValues(), storedHouseholdAppliances, updateHouseholdAppliances);

  return { annualFootprint, control, handleUpdate };
};
