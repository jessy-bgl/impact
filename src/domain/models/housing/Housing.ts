import { Energy } from "@domain/models/housing/energy/Energy";
import { Home } from "@domain/models/housing/home/Home";
import { Leisure } from "@domain/models/housing/leisure/Leisure";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  home?: Home;
  energy?: Energy;
  leisure?: Leisure;
};

export class Housing implements WithAnnualFootprint {
  home: Home;
  energy: Energy;
  leisure: Leisure;

  constructor({ home, energy, leisure }: Props) {
    this.home = new Home(home ?? {});
    this.energy = new Energy(energy ?? {});
    this.leisure = new Leisure(leisure ?? {});
  }

  public get annualFootprint(): number {
    return Math.round(
      this.home.annualFootprint +
        this.energy.annualFootprint +
        this.leisure.annualFootprint,
    );
  }
}
