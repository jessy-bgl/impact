import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { UsecasesContext } from "../../../../../common/UsecasesContext";
import { useAppStore } from "../../../../../data/store/store";
import { Car } from "../../../../../domain/models/transport/car/Car";
import {
  StringifyProperties,
  convertStringToType,
} from "../../../../../types/utils";

export type FormValues = Omit<StringifyProperties<Car>, "annualFootprint">;

export const useCar = () => {
  const storedCar = useAppStore((store) => store.transport.car);
  const storeRegularUser = useAppStore(
    (store) => store.transport.car.regularUser,
  );
  const { useUpdateTransport } = useContext(UsecasesContext);
  const { updateCar } = useUpdateTransport();

  const getDefaultValues = () => ({
    kmPerYear: storedCar.kmPerYear.toString(),
    regularUser: storedCar.regularUser.toString(),
    size: storedCar.size.toString(),
    engine: storedCar.engine.toString(),
    fuelType: storedCar.fuelType.toString(),
    age: storedCar.age.toString(),
    averagePassengers: storedCar.averagePassengers.toString(),
    averageFuelConsumption: storedCar.averageFuelConsumption.toString(),
  });

  const { control, getValues, watch, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  });

  const handleUpdate = (field: keyof FormValues) => {
    const stringValue = getValues(field);
    const value = convertStringToType(stringValue, typeof storedCar[field]);
    storedCar[field] = value as never;
    updateCar(storedCar);
  };

  useEffect(() => {
    if (!storeRegularUser) reset(getDefaultValues());
  }, [storeRegularUser]);

  const regularUser = watch("regularUser") === "true";

  return { control, handleUpdate, regularUser };
};