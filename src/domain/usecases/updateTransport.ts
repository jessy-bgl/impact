import { Boat } from "@domain/models/transport/boat/Boat";
import { Car } from "@domain/models/transport/car/Car";
import { Plane } from "@domain/models/transport/plane/Plane";
import { PublicTransport } from "@domain/models/transport/public-transport/PublicTransport";
import { TwoWheeler } from "@domain/models/transport/two-wheeler/TwoWheeler";
import { EmissionsRepository } from "@domain/repositories/EmissionsRepository";

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

    const updateBoat = (values: Boat) => {
      const newBoat = new Boat(values);
      if (!newBoat.usage) newBoat.resetValues();

      const newTransport = emissionsRepository.fetchTransport();
      newTransport.boat = newBoat;

      emissionsRepository.updateTransport(newTransport);
    };

    const updatePublicTransport = (values: PublicTransport) => {
      const newPublicTransport = new PublicTransport(values);

      const newTransport = emissionsRepository.fetchTransport();
      newTransport.publicTransport = newPublicTransport;

      emissionsRepository.updateTransport(newTransport);
    };

    return {
      updateCar,
      updateTwoWheeler,
      updatePlane,
      updateBoat,
      updatePublicTransport,
    };
  };
