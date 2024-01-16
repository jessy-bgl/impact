import { Energy } from "@domain/entities/housing/energy/Energy";
import { Home } from "@domain/entities/housing/home/Home";
import { Leisure } from "@domain/entities/housing/leisure/Leisure";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseUpdateHousing = (
  emissionsRepository: EmissionsRepository,
) =>
  function useUpdateHousing() {
    const updateHome = (values: Home) => {
      const newHome = new Home(values);

      const newHousing = emissionsRepository.fetchHousing();
      newHousing.home = newHome;
      newHousing.energy.occupants = newHome.occupants;
      newHousing.energy.livingSpace = newHome.livingSpace;
      newHousing.energy.isAnApartment = newHome.isAnApartment;
      newHousing.leisure.occupants = newHome.occupants;
      newHousing.leisure.isAnApartment = newHome.isAnApartment;

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.pets.occupants = newHome.occupants;
      newEverydayThings.digital.occupants = newHome.occupants;
      newEverydayThings.furniture.occupants = newHome.occupants;
      newEverydayThings.householdAppliances.occupants = newHome.occupants;

      emissionsRepository.updateHousing(newHousing);
      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateEnergy = (values: Energy) => {
      const newEnergy = new Energy(values);

      const newHousing = emissionsRepository.fetchHousing();
      newHousing.energy = newEnergy;

      emissionsRepository.updateHousing(newHousing);
    };

    const updateLeisure = (values: Leisure) => {
      const newLeisure = new Leisure(values);

      const newHousing = emissionsRepository.fetchHousing();
      newHousing.leisure = newLeisure;

      emissionsRepository.updateHousing(newHousing);
    };

    return {
      updateHome,
      updateEnergy,
      updateLeisure,
    };
  };
