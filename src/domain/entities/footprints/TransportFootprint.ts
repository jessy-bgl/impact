import { WithAnnualFootprint } from "@domain/entities/footprints/types";
import { roundFootprint } from "./utils";

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
    this.carFootprint = roundFootprint(carFootprint) ?? 0;
    this.twoWheelerFootprint = roundFootprint(twoWheelerFootprint) ?? 0;
    this.planeFootprint = roundFootprint(planeFootprint) ?? 0;
    this.boatFootprint = roundFootprint(boatFootprint) ?? 0;
    this.trainFootprint = roundFootprint(trainFootprint) ?? 0;
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
        this.boatFootprint +
        this.trainFootprint +
        this.publicTransportFootprint +
        this.holidaysTransportFootprint +
        this.gentleMobilityFootprint,
    );
  }
}
