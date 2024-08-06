import { WithAnnualFootprint } from "@domain/entities/footprints/types";

type Props = {
  carFootprint?: number;
  twoWheelerFootprint?: number;
  planeFootprint?: number;
  boatFootprint?: number;
  trainFootprint?: number;
  holidaysTransportFootprint?: number;
  publicTransportFootprint?: number;
  gentleMobilityFootprint?: number;
};

export class TransportFootprint implements WithAnnualFootprint {
  carFootprint: number;
  twoWheelerFootprint: number;
  planeFootprint: number;
  boatFootprint: number;
  trainFootprint: number;
  publicTransportFootprint: number;
  holidaysTransportFootprint: number;
  gentleMobilityFootprint: number;

  constructor({
    carFootprint,
    twoWheelerFootprint,
    planeFootprint,
    boatFootprint,
    trainFootprint,
    publicTransportFootprint,
    holidaysTransportFootprint,
    gentleMobilityFootprint,
  }: Props) {
    this.carFootprint = carFootprint ?? 0;
    this.twoWheelerFootprint = twoWheelerFootprint ?? 0;
    this.planeFootprint = planeFootprint ?? 0;
    this.boatFootprint = boatFootprint ?? 0;
    this.trainFootprint = trainFootprint ?? 0;
    this.publicTransportFootprint = publicTransportFootprint ?? 0;
    this.holidaysTransportFootprint = holidaysTransportFootprint ?? 0;
    this.gentleMobilityFootprint = gentleMobilityFootprint ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.carFootprint +
        this.twoWheelerFootprint +
        this.planeFootprint +
        this.boatFootprint +
        this.trainFootprint +
        this.publicTransportFootprint +
        this.holidaysTransportFootprint +
        this.gentleMobilityFootprint,
    );
  }
}
