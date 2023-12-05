import { Home } from "@domain/models/housing/home/Home";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  home?: Home;
};

export class Housing implements WithAnnualFootprint {
  home: Home;

  constructor({ home }: Props) {
    this.home = new Home(home ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(this.home.annualFootprint);
  }
}
