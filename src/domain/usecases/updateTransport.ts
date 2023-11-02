import { Car } from "../models/transport/car/Car";
import { Plane } from "../models/transport/plane/Plane";
import { TwoWheeler } from "../models/transport/two-wheeler/TwoWheeler";
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

    const updateTwoWheeler = (values: TwoWheeler) => {
      const newTwoWheeler = new TwoWheeler(values);
      if (!newTwoWheeler.usage) newTwoWheeler.resetValues();

      const newTransport = emissionsRepository.fetchTransport();
      newTransport.twoWheeler = newTwoWheeler;

      emissionsRepository.updateTransport(newTransport);
    };

    const updatePlane = (values: Plane) => {
      const newPlane = new Plane(values);
      if (!newPlane.usage) newPlane.resetValues();

      const newTransport = emissionsRepository.fetchTransport();
      newTransport.plane = newPlane;

      emissionsRepository.updateTransport(newTransport);
    };

    return { updateCar, updateTwoWheeler, updatePlane };
  };
