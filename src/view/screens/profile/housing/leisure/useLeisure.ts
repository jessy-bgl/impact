import { useContext, useEffect } from "react";
import { DefaultValues } from "react-hook-form";

import { useAppStore } from "@data/store/store";
import { StringifyProperties, convertStringToType } from "@srctypes/utils";
import { UsecasesContext } from "@common/UsecasesContext";
import { useUpdateForm } from "@view/screens/profile/utils/useUpdateForm";
import { Leisure } from "@domain/models/housing/leisure/Leisure";
import { HolidayAccomodations } from "@domain/models/housing/leisure/types";

export const HolidayAccomodationLabels: (keyof HolidayAccomodations)[] = [
  "hotel",
  "rentals",
  "youthHostel",
  "camping",
  "exchange",
];

export type FormValues = Omit<
  StringifyProperties<Leisure & HolidayAccomodations>,
  "annualFootprint"
>;

export const useLeisure = () => {
  const storedLeisure = useAppStore((store) => store.housing.leisure);
  const isAnApartment = useAppStore(
    (store) => store.housing.home.isAnApartment,
  );
  const annualFootprint = new Leisure(storedLeisure).annualFootprint;

  const { useUpdateHousing } = useContext(UsecasesContext);
  const { updateLeisure } = useUpdateHousing();

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    hasIngroundPool: storedLeisure.hasIngroundPool.toString(),
    campingNightsPerYear: storedLeisure.campingNightsPerYear.toString(),
    exchangeNightsPerYear: storedLeisure.exchangeNightsPerYear.toString(),
    hotelNightsPerYear: storedLeisure.hotelNightsPerYear.toString(),
    rentalNightsPerYear: storedLeisure.rentalNightsPerYear.toString(),
    youthHostelNightsPerYear: storedLeisure.youthHostelNightsPerYear.toString(),
    holidayAccomodations: JSON.stringify(storedLeisure.holidayAccomodations),
    camping: storedLeisure.holidayAccomodations.camping.toString(),
    exchange: storedLeisure.holidayAccomodations.exchange.toString(),
    hotel: storedLeisure.holidayAccomodations.hotel.toString(),
    rentals: storedLeisure.holidayAccomodations.rentals.toString(),
    youthHostel: storedLeisure.holidayAccomodations.youthHostel.toString(),
  });

  const { handleUpdate, control, watch, setValue } = useUpdateForm<
    Leisure,
    FormValues
  >(getDefaultValues(), storedLeisure, updateLeisure);

  const camping = watch("camping");
  const exchange = watch("exchange");
  const hotel = watch("hotel");
  const rentals = watch("rentals");
  const youthHostel = watch("youthHostel");

  useEffect(() => {
    const newHolidayAccomodations = JSON.stringify({
      camping: convertStringToType(camping, "boolean"),
      exchange: convertStringToType(exchange, "boolean"),
      hotel: convertStringToType(hotel, "boolean"),
      rentals: convertStringToType(rentals, "boolean"),
      youthHostel: convertStringToType(youthHostel, "boolean"),
    });
    setValue("holidayAccomodations", newHolidayAccomodations);
    handleUpdate("holidayAccomodations");
  }, [camping, exchange, hotel, rentals, youthHostel]);

  const disablePool = isAnApartment;
  const showCamping = camping === "true";
  const showExchange = exchange === "true";
  const showHotel = hotel === "true";
  const showRentals = rentals === "true";
  const showYouthHostel = youthHostel === "true";

  return {
    annualFootprint,
    handleUpdate,
    control,
    setValue,
    disablePool,
    showCamping,
    showExchange,
    showHotel,
    showRentals,
    showYouthHostel,
  };
};
