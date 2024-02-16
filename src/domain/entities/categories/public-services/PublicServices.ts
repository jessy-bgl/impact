export const publicServicesFootprint = 1300; // kgCO2e/year
export const merchantServicesFootprint = 200; // kgCO2e/year
export const societalServicesFootprint =
  publicServicesFootprint + merchantServicesFootprint;

export class PublicServices {
  // https://github.com/datagir/nosgestesclimat/issues/1583
  public get annualFootprint(): number {
    return societalServicesFootprint;
  }
}
