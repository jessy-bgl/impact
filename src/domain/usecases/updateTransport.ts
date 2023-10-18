import { Car } from "../models/transport/car/Car";
import { EmissionsRepository } from "../repositories/EmissionsRepository";

export const createUseUpdateTransport = (
  emissionsRepository: EmissionsRepository,
) =>
  function useUpdateTransport() {
    const updateCar = (values: Car) => {
      const newCar = new Car(values);
      const newTransport = emissionsRepository.fetchTransport();
      newTransport.car = newCar;
      if (!newTransport.car.regularUser) newCar.initValuesForNonRegularUser();
      emissionsRepository.updateTransport(newTransport);
    };

    return { updateCar };
  };
