import { Energy } from "@domain/models/housing/energy/Energy";
import { Home } from "@domain/models/housing/home/Home";
import { Leisure } from "@domain/models/housing/leisure/Leisure";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

export const createUseUpdateHousing = (
  emissionsRepository: EmissionsRepository,
) =>
  function useUpdateHousing() {
    const updateHome = (values: Home) => {
      const newHome = new Home(values);

      const newHousing = emissionsRepository.fetchHousing();
      newHousing.home = newHome;
      newHousing.energy.inhabitants = newHome.inhabitants;
      newHousing.energy.livingSpace = newHome.livingSpace;
      newHousing.energy.isAnApartment = newHome.isAnApartment;
      newHousing.leisure.inhabitants = newHome.inhabitants;
      newHousing.leisure.isAnApartment = newHome.isAnApartment;

      emissionsRepository.updateHousing(newHousing);
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
