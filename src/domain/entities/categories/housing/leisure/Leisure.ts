import {
  defaultNumberOfOccupants,
  isAnApartmentDefaultValue,
} from "@domain/entities/categories/housing/constants";
import {
  averageCampingNightsPerYear,
  averageExchangeNightsPerYear,
  averageHotelNightsPerYear,
  averageRentalNightsPerYear,
  averageYouthHostelNightsPerYear,
  campingFootprintPerNight,
  defaultHolidayAccomodations,
  hotelFootprintPerNight,
  poolFootprint,
  rentalFootprintPerNight,
  youthHostelFootprintPerNight,
} from "@domain/entities/categories/housing/leisure/constants";
import { HolidayAccomodations } from "@domain/entities/categories/housing/leisure/types";
import { WithAnnualFootprint } from "@domain/entities/categories/types";

type Props = {
  occupants?: number;
  isAnApartment?: boolean;
  hasIngroundPool?: boolean;
  holidayAccomodations?: HolidayAccomodations;
  hotelNightsPerYear?: number;
  campingNightsPerYear?: number;
  youthHostelNightsPerYear?: number;
  rentalNightsPerYear?: number;
  exchangeNightsPerYear?: number;
};

export class Leisure implements WithAnnualFootprint {
  occupants: number;
  isAnApartment: boolean;
  hasIngroundPool: boolean;
  holidayAccomodations: HolidayAccomodations;
  hotelNightsPerYear: number;
  campingNightsPerYear: number;
  youthHostelNightsPerYear: number;
  rentalNightsPerYear: number;
  exchangeNightsPerYear: number;

  constructor({
    occupants,
    isAnApartment,
    hasIngroundPool,
    holidayAccomodations,
    hotelNightsPerYear,
    campingNightsPerYear,
    youthHostelNightsPerYear,
    rentalNightsPerYear,
    exchangeNightsPerYear,
  }: Props) {
    this.occupants = occupants ?? defaultNumberOfOccupants;
    this.isAnApartment = isAnApartment ?? isAnApartmentDefaultValue;
    this.hasIngroundPool = isAnApartment ? false : hasIngroundPool ?? false;
    this.holidayAccomodations =
      holidayAccomodations ?? defaultHolidayAccomodations;
    this.hotelNightsPerYear = hotelNightsPerYear ?? averageHotelNightsPerYear;
    this.campingNightsPerYear =
      campingNightsPerYear ?? averageCampingNightsPerYear;
    this.youthHostelNightsPerYear =
      youthHostelNightsPerYear ?? averageYouthHostelNightsPerYear;
    this.rentalNightsPerYear =
      rentalNightsPerYear ?? averageRentalNightsPerYear;
    this.exchangeNightsPerYear =
      exchangeNightsPerYear ?? averageExchangeNightsPerYear;
  }

  get annualFootprint(): number {
    return Math.round(this.poolAnnualFootprint + this.holidaysAnnualFootprint);
  }

  public get holidaysAnnualFootprint(): number {
    return Math.round(
      (this.noHolidayAccomodation ? 0 : this.holidaysTotalFootprint) /
        this.occupants,
    );
  }

  private get noHolidayAccomodation(): boolean {
    return !Object.values(this.holidayAccomodations).some(
      (accomodation) => accomodation,
    );
  }

  // NB : calcul utilisé par défaut sur le simulateur nosgestesclimat
  // lorsqu'aucune valeur n'a été renseignée par l'utilisateur.
  // Non utilisé ici car nous utilisons des valeurs par défaut.
  /*private get holidaysDefaultFootprint(): number {
    return (
      averageHotelNightsPerYear * hotelFootprintPerNight +
      averageCampingNightsPerYear * campingFootprintPerNight +
      averageRentalNightsPerYear * rentalFootprintPerNight +
      averageExchangeNightsPerYear * rentalFootprintPerNight +
      averageYouthHostelNightsPerYear *
        youthHostelFootprintPerNight *
        this.occupants
    );
  }*/

  private get holidaysTotalFootprint(): number {
    return (
      this.hotelFootprint +
      this.campingFootprint +
      this.youthHostelFootprint +
      this.rentalsFootprint +
      this.exchangeFootprint
    );
  }

  private get hotelFootprint(): number {
    if (!this.holidayAccomodations.hotel) return 0;
    const footprint = this.hotelNightsPerYear * hotelFootprintPerNight;
    if (this.occupants > 8) return footprint * 3;
    else if (this.occupants > 4) return footprint * 2;
    else return footprint;
  }

  private get campingFootprint(): number {
    if (!this.holidayAccomodations.camping) return 0;
    return campingFootprintPerNight * this.campingNightsPerYear;
  }

  private get youthHostelFootprint(): number {
    if (!this.holidayAccomodations.youthHostel) return 0;
    return youthHostelFootprintPerNight * this.youthHostelNightsPerYear;
  }

  private get rentalsFootprint(): number {
    if (!this.holidayAccomodations.rentals) return 0;
    return rentalFootprintPerNight * this.rentalNightsPerYear;
  }

  private get exchangeFootprint(): number {
    if (!this.holidayAccomodations.exchange) return 0;
    return rentalFootprintPerNight * this.exchangeNightsPerYear;
  }

  public get poolAnnualFootprint(): number {
    if (!this.hasIngroundPool || this.isAnApartment) return 0;
    return Math.round(poolFootprint / this.occupants);
  }
}
