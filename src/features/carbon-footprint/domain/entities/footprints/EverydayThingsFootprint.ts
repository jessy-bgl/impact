import { WithAnnualFootprint } from "@carbonFootprint/domain/entities/footprints/types";
import { roundFootprint } from "@carbonFootprint/domain/entities/footprints/utils";

type Props = {
  petFootprint?: number;
  furnitureFootprint?: number;
  otherProductsFootprint?: number;
  hobbiesFootprint?: number;
  clothesFootprint?: number;
  digitalFootprint?: number;
  consumableProductsFootprint?: number;
  tobaccoFootprint?: number;
  householdApplicancesFootprint?: number;
};

export class EverydayThingsFootprint implements WithAnnualFootprint {
  petFootprint: number;
  furnitureFootprint: number;
  otherProductsFootprint: number;
  hobbiesFootprint: number;
  clothesFootprint: number;
  digitalFootprint: number;
  consumableProductsFootprint: number;
  tobaccoFootprint: number;
  householdApplicancesFootprint: number;

  constructor({
    petFootprint,
    furnitureFootprint,
    otherProductsFootprint,
    hobbiesFootprint,
    clothesFootprint,
    digitalFootprint,
    consumableProductsFootprint,
    tobaccoFootprint,
    householdApplicancesFootprint,
  }: Props) {
    this.petFootprint = roundFootprint(petFootprint) ?? 0;
    this.furnitureFootprint = roundFootprint(furnitureFootprint) ?? 0;
    this.otherProductsFootprint = roundFootprint(otherProductsFootprint) ?? 0;
    this.hobbiesFootprint = roundFootprint(hobbiesFootprint) ?? 0;
    this.clothesFootprint = roundFootprint(clothesFootprint) ?? 0;
    this.digitalFootprint = roundFootprint(digitalFootprint) ?? 0;
    this.consumableProductsFootprint =
      roundFootprint(consumableProductsFootprint) ?? 0;
    this.tobaccoFootprint = roundFootprint(tobaccoFootprint) ?? 0;
    this.householdApplicancesFootprint =
      roundFootprint(householdApplicancesFootprint) ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.petFootprint +
        this.furnitureFootprint +
        this.otherProductsFootprint +
        this.hobbiesFootprint +
        this.clothesFootprint +
        this.digitalFootprint +
        this.consumableProductsFootprint +
        this.tobaccoFootprint +
        this.householdApplicancesFootprint,
    );
  }
}
