import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Car } from "@domain/models/transport/car/Car";
import { StringifyProperties } from "@srctypes/utils";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";

export type FormValues = Omit<StringifyProperties<Car>, "annualFootprint">;

export const useCar = () => {
  const storedCar = useAppStore((store) => store.transport.car);
  const storedRegularUser = storedCar.regularUser;
  const annualFootprint = new Car(storedCar).annualFootprint;

  const { useUpdateTransport } = useContext(UsecasesContext);
  const { updateCar } = useUpdateTransport();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    kmPerYear: storedCar.kmPerYear.toString(),
    regularUser: storedCar.regularUser.toString(),
    size: storedCar.size.toString(),
    engine: storedCar.engine.toString(),
    fuelType: storedCar.fuelType.toString(),
    age: storedCar.age.toString(),
    averagePassengers: storedCar.averagePassengers.toString(),
    averageFuelConsumption: storedCar.averageFuelConsumption.toString(),
  });

  const { handleUpdate, control, watch, reset } = useUpdateForm<
    Car,
    FormValues
  >(getDefaultValues(), storedCar, updateCar);

  useEffect(() => {
    if (!storedRegularUser) reset(getDefaultValues());
  }, [storedRegularUser]);

  const regularUser = watch("regularUser") === "true";

  return { control, handleUpdate, regularUser, annualFootprint };
};
