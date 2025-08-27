import { WithAnnualFootprint } from "@carbonFootprint/domain/entities/footprints/types";
import { roundFootprint } from "@carbonFootprint/domain/entities/footprints/utils";

type Props = {
  merchantServicesFootprint?: number;
  publicServicesFootprint?: number;
};

export class SocietalServicesFootprint implements WithAnnualFootprint {
  merchantServicesFootprint: number;
  publicServicesFootprint: number;

  constructor({ merchantServicesFootprint, publicServicesFootprint }: Props) {
    this.merchantServicesFootprint =
      roundFootprint(merchantServicesFootprint) ?? 0;
    this.publicServicesFootprint = roundFootprint(publicServicesFootprint) ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      this.merchantServicesFootprint + this.publicServicesFootprint,
    );
  }
}
