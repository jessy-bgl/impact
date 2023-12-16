import { defaultNumberOfInhabitants } from "@domain/models/housing/constants";
import { WithAnnualFootprint } from "@domain/models/types";
import { cat, dog } from "./constants";

type Props = {
  inhabitants?: number;
  littleDogs?: number;
  mediumDogs?: number;
  bigDogs?: number;
  cats?: number;
};

export class Pets implements WithAnnualFootprint {
  inhabitants: number;
  littleDogs: number;
  mediumDogs: number;
  bigDogs: number;
  cats: number;

  constructor({ inhabitants, littleDogs, mediumDogs, bigDogs, cats }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.littleDogs = littleDogs ?? 0;
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
      this.littleDogsAnnualFootprint +
      this.mediumDogsAnnualFootprint +
      this.bigDogsAnnualFootprint
    );
  }

  private get littleDogsAnnualFootprint(): number {
    return this.littleDogs * dog.annualFootprint("little");
  }

  private get mediumDogsAnnualFootprint(): number {
    return this.mediumDogs * dog.annualFootprint("medium");
  }

  private get bigDogsAnnualFootprint(): number {
    return this.bigDogs * dog.annualFootprint("big");
  }
}
