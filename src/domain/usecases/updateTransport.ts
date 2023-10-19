import { Car } from "../models/transport/car/Car";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseUpdateTransport = (
  emissionsRepository: EmissionsRepository,
) =>
  function useUpdateTransport() {
    const updateCar = (values: Car) => {
      const newCar = new Car(values);
      if (!newCar.regularUser) newCar.initValuesForNonRegularUser();

      const newTransport = emissionsRepository.fetchTransport();
      newTransport.car = newCar;

      emissionsRepository.updateTransport(newTransport);
    };

    return { updateCar };
  };
