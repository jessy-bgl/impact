import { defaultNumberOfInhabitants } from "@domain/models/housing/constants";
import { WithAnnualFootprint } from "@domain/models/types";
import { cat, dog } from "./constants";

type Props = {
  inhabitants?: number;
  smallDogs?: number;
  mediumDogs?: number;
  bigDogs?: number;
  cats?: number;
};

export class Pets implements WithAnnualFootprint {
  inhabitants: number;
  smallDogs: number;
  mediumDogs: number;
  bigDogs: number;
  cats: number;

  constructor({ inhabitants, smallDogs, mediumDogs, bigDogs, cats }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.smallDogs = smallDogs ?? 0;
    this.mediumDogs = mediumDogs ?? 0;
    this.bigDogs = bigDogs ?? 0;
    this.cats = cats ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      (this.catsAnnualFootprint + this.dogsAnnualFootprint) / this.inhabitants,
    );
  }

  private get catsAnnualFootprint(): number {
    return this.cats * cat.annualFootprint;
  }

  private get dogsAnnualFootprint(): number {
    return (
      this.smallDogsAnnualFootprint +
      this.mediumDogsAnnualFootprint +
      this.bigDogsAnnualFootprint
    );
  }

  private get smallDogsAnnualFootprint(): number {
    return this.smallDogs * dog.annualFootprint("small");
  }

  private get mediumDogsAnnualFootprint(): number {
    return this.mediumDogs * dog.annualFootprint("medium");
  }

  private get bigDogsAnnualFootprint(): number {
    return this.bigDogs * dog.annualFootprint("big");
  }
}
