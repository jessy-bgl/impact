import { Clothes } from "@domain/entities/categories/everyday-things/clothes/Clothes";
import { ConsumableProducts } from "@domain/entities/categories/everyday-things/consumable-products/ConsumableProducts";
import { Digital } from "@domain/entities/categories/everyday-things/digital/Digital";
import { Furniture } from "@domain/entities/categories/everyday-things/furniture/Furniture";
import { Hobbies } from "@domain/entities/categories/everyday-things/hobbies/Hobbies";
import { HouseholdAppliances } from "@domain/entities/categories/everyday-things/household-appliances/HouseholdAppliances";
import { OtherProducts } from "@domain/entities/categories/everyday-things/other-products/OtherProducts";
import { Pets } from "@domain/entities/categories/everyday-things/pets/Pets";
import { Tobacco } from "@domain/entities/categories/everyday-things/tobacco/Tobacco";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseUpdateEverydayThings = (
  emissionsRepository: EmissionsRepository,
) =>
  function useUpdateEverydayThings() {
    const updatePets = (values: Pets) => {
      const newPets = new Pets(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.pets = newPets;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateClothes = (values: Clothes) => {
      const newClothes = new Clothes(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.clothes = newClothes;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateHouseholdAppliances = (values: HouseholdAppliances) => {
      const newHouseholdAppliances = new HouseholdAppliances(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.householdAppliances = newHouseholdAppliances;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateFurniture = (values: Furniture) => {
      const newFurniture = new Furniture(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.furniture = newFurniture;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateDigital = (values: Digital) => {
      const newDigital = new Digital(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.digital = newDigital;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateHobbies = (values: Hobbies) => {
      const newHobbies = new Hobbies(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.hobbies = newHobbies;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateConsumableProducts = (values: ConsumableProducts) => {
      const newConsumableProducts = new ConsumableProducts(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.consumableProducts = newConsumableProducts;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateTobacco = (values: Tobacco) => {
      const newTobacco = new Tobacco(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.tobacco = newTobacco;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    const updateOtherProducts = (values: OtherProducts) => {
      const newOtherProducts = new OtherProducts(values);

      const newEverydayThings = emissionsRepository.fetchEverydayThings();
      newEverydayThings.otherProducts = newOtherProducts;

      emissionsRepository.updateEverydayThings(newEverydayThings);
    };

    return {
      updatePets,
      updateClothes,
      updateHouseholdAppliances,
      updateFurniture,
      updateDigital,
      updateHobbies,
      updateConsumableProducts,
      updateTobacco,
      updateOtherProducts,
    };
  };
