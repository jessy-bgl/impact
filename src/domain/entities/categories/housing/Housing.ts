import { Energy } from "@domain/entities/categories/housing/energy/Energy";
import { Home } from "@domain/entities/categories/housing/home/Home";
import { Leisure } from "@domain/entities/categories/housing/leisure/Leisure";
import { WithAnnualFootprint } from "@domain/entities/categories/types";

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
