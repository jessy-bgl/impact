import { WithAnnualFootprint } from "@carbonFootprint/domain/entities/footprints/types";
import { roundFootprint } from "@carbonFootprint/domain/entities/footprints/utils";

type Props = {
  homeFootprint?: number;
  energyFootprint?: number;
  leisureFootprint?: number;
};

export class HousingFootprint implements WithAnnualFootprint {
  homeFootprint: number;
  energyFootprint: number;
  leisureFootprint: number;

  constructor({ homeFootprint, energyFootprint, leisureFootprint }: Props) {
    this.homeFootprint = roundFootprint(homeFootprint) ?? 0;
    this.energyFootprint = roundFootprint(energyFootprint) ?? 0;
    this.leisureFootprint = roundFootprint(leisureFootprint) ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.homeFootprint + this.energyFootprint + this.leisureFootprint,
    );
  }
}
