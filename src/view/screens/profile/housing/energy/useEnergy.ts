import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Energy } from "@domain/models/housing/energy/Energy";
import { HeatingEnergies } from "@domain/models/housing/energy/types";
import { StringifyProperties, convertStringToType } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<
  StringifyProperties<Energy & HeatingEnergies>,
  "annualFootprint" | "occupants" | "livingSpace" | "isAnApartment"
>;

export const useEnergy = () => {
  const storedEnergy = useAppStore((store) => store.housing.energy);
  const annualFootprint = new Energy(storedEnergy).annualFootprint;

  const { useUpdateHousing } = useContext(UsecasesContext);
  const { updateEnergy } = useUpdateHousing();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    annualElectricityConsumption:
      storedEnergy.annualElectricityConsumption.toString(),
    airConditioners: storedEnergy.airConditioners.toString(),
    heatingEnergies: JSON.stringify(storedEnergy.heatingEnergies),
    electricity: storedEnergy.heatingEnergies.electricity.toString(),
    gas: storedEnergy.heatingEnergies.gas.toString(),
    heatNetwork: storedEnergy.heatingEnergies.heatNetwork.toString(),
    fuel: storedEnergy.heatingEnergies.fuel.toString(),
    wood: storedEnergy.heatingEnergies.wood.toString(),
    propane: storedEnergy.heatingEnergies.propane.toString(),
    gasCylinder: storedEnergy.heatingEnergies.gasCylinder.toString(),
    heatPump: storedEnergy.heatingEnergies.heatPump.toString(),
    bioGas: storedEnergy.heatingEnergies.bioGas.toString(),
    woodType: storedEnergy.woodType.toString(),
  });

  const { handleUpdate, control, watch, setValue } = useUpdateForm<
    Energy,
    FormValues
  >(getDefaultValues(), storedEnergy, updateEnergy);

  const electricity = watch("electricity");
  const gas = watch("gas");
  const heatNetwork = watch("heatNetwork");
  const fuel = watch("fuel");
  const wood = watch("wood");
  const propane = watch("propane");
  const gasCylinder = watch("gasCylinder");
  const heatPump = watch("heatPump");
  const bioGas = watch("bioGas");

  useEffect(() => {
    const newHeatingEnergies = JSON.stringify({
      electricity: convertStringToType(electricity, "boolean"),
      gas: convertStringToType(gas, "boolean"),
      heatNetwork: convertStringToType(heatNetwork, "boolean"),
      fuel: convertStringToType(fuel, "boolean"),
      wood: convertStringToType(wood, "boolean"),
      propane: convertStringToType(propane, "boolean"),
      gasCylinder: convertStringToType(gasCylinder, "boolean"),
      heatPump: convertStringToType(heatPump, "boolean"),
      bioGas: convertStringToType(bioGas, "boolean"),
    });
    setValue("heatingEnergies", newHeatingEnergies);
    handleUpdate("heatingEnergies");
  }, [
    electricity,
    gas,
    heatNetwork,
    fuel,
    wood,
    propane,
    gasCylinder,
    heatPump,
    bioGas,
  ]);

  const disableBioGas = gas === "false";
  const disableWoodType = wood === "false";

  return {
    annualFootprint,
    handleUpdate,
    control,
    setValue,
    disableBioGas,
    disableWoodType,
  };
};
