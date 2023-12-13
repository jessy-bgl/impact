import {
  defaultNumberOfInhabitants,
  isAnApartmentDefaultValue,
} from "@domain/models/housing/constants";
import {
  defaultHolidayAccomodations,
  hotelFootprintPerNight,
  averageHotelNightsPerYear,
  averageCampingNightsPerYear,
  campingFootprintPerNight,
  youthHostelFootprintPerNight,
  averageYouthHostelNightsPerYear,
  rentalFootprintPerNight,
  averageRentalNightsPerYear,
  averageExchangeNightsPerYear,
  poolFootprint,
} from "@domain/models/housing/leisure/constants";
import { HolidayAccomodations } from "@domain/models/housing/leisure/types";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  hasIngroundPool?: boolean;
  poolSize?: number;
  isAnApartment?: boolean;
  inhabitants?: number;
  holidayAccomodations?: HolidayAccomodations;
  hotelNightsPerYear?: number;
  campingNightsPerYear?: number;
  youthHostelNightsPerYear?: number;
  rentalNightsPerYear?: number;
  exchangeNightsPerYear?: number;
};

export class Leisure implements WithAnnualFootprint {
  hasIngroundPool: boolean;
  poolSize: number;
  isAnApartment: boolean;
  inhabitants: number;
  holidayAccomodations: HolidayAccomodations;
  hotelNightsPerYear: number;
  campingNightsPerYear: number;
  youthHostelNightsPerYear: number;
  rentalNightsPerYear: number;
  exchangeNightsPerYear: number;

  constructor({
    hasIngroundPool,
    poolSize,
    isAnApartment,
    inhabitants,
    holidayAccomodations,
    hotelNightsPerYear,
    campingNightsPerYear,
    youthHostelNightsPerYear,
    rentalNightsPerYear,
    exchangeNightsPerYear,
  }: Props) {
    this.hasIngroundPool = hasIngroundPool ?? false;
    this.poolSize = poolSize ?? 0;
    this.isAnApartment = isAnApartment ?? isAnApartmentDefaultValue;
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
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
    return this.poolAnnualFootprint + this.holidaysAnnualFootprint;
  }

  private get holidaysAnnualFootprint(): number {
    if (this.noHolidayAccomodation)
      return this.holidaysDefaultFootprint / this.inhabitants;
    return this.holidaysTotalFootprint / this.inhabitants;
  }

  private get noHolidayAccomodation(): boolean {
    return !Object.values(this.holidayAccomodations).some(
      (accomodation) => accomodation,
    );
  }

  private get holidaysDefaultFootprint(): number {
    return (
      averageHotelNightsPerYear * hotelFootprintPerNight +
      averageCampingNightsPerYear * campingFootprintPerNight +
      averageRentalNightsPerYear * rentalFootprintPerNight +
      averageExchangeNightsPerYear * rentalFootprintPerNight +
      averageYouthHostelNightsPerYear *
        youthHostelFootprintPerNight *
        this.inhabitants
    );
  }

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
    if (this.inhabitants > 8) return footprint * 3;
    else if (this.inhabitants > 4) return footprint * 2;
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

  private get poolAnnualFootprint(): number {
    if (!this.hasIngroundPool || this.isAnApartment) return 0;
    return poolFootprint / this.inhabitants;
  }
}
