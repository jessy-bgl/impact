import { WithAnnualFootprint } from "@carbonFootprint/domain/entities/footprints/types";
import { roundFootprint } from "@carbonFootprint/domain/entities/footprints/utils";

type Props = {
  carFootprint?: number;
  twoWheelerFootprint?: number;
  planeFootprint?: number;
  holidaysTransportFootprint?: number;
  publicTransportFootprint?: number;
  gentleMobilityFootprint?: number;
};

export class TransportFootprint implements WithAnnualFootprint {
  carFootprint: number;
  twoWheelerFootprint: number;
  planeFootprint: number;
  publicTransportFootprint: number;
  holidaysTransportFootprint: number;
  gentleMobilityFootprint: number;

  constructor({
    carFootprint,
    twoWheelerFootprint,
    planeFootprint,
    publicTransportFootprint,
    holidaysTransportFootprint,
    gentleMobilityFootprint,
  }: Props) {
    this.carFootprint = roundFootprint(carFootprint) ?? 0;
    this.twoWheelerFootprint = roundFootprint(twoWheelerFootprint) ?? 0;
    this.planeFootprint = roundFootprint(planeFootprint) ?? 0;
    this.publicTransportFootprint =
      roundFootprint(publicTransportFootprint) ?? 0;
    this.holidaysTransportFootprint =
      roundFootprint(holidaysTransportFootprint) ?? 0;
    this.gentleMobilityFootprint = roundFootprint(gentleMobilityFootprint) ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.carFootprint +
        this.twoWheelerFootprint +
        this.planeFootprint +
        this.publicTransportFootprint +
        this.holidaysTransportFootprint +
        this.gentleMobilityFootprint,
    );
  }
}
