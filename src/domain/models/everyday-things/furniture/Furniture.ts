import { Preservation } from "@domain/models/everyday-things/types";
import { defaultNumberOfInhabitants } from "@domain/models/housing/constants";
import { WithAnnualFootprint } from "@domain/models/types";
import {
  bed,
  bigFurniture,
  chair,
  couch,
  mattress,
  preservationCoefficient,
  resinOrMetalGardenFurniture,
  smallFurniture,
  table,
  wardrobe,
  woodenGardenFurniture,
} from "./constants";

type Props = {
  inhabitants?: number;
  preservation?: Preservation;
  wardrobes?: number;
  couches?: number;
  mattresses?: number;
  beds?: number;
  tables?: number;
  chairs?: number;
  smallFurnitures?: number;
  bigFurnitures?: number;
  woodenGardenFurnitures?: number;
  resinOrMetalGardenFurnitures?: number;
};

export class Furniture implements WithAnnualFootprint {
  inhabitants: number;
  preservation: Preservation;
  wardrobes: number;
  couches: number;
  mattresses: number;
  beds: number;
  tables: number;
  chairs: number;
  smallFurnitures: number;
  bigFurnitures: number;
  woodenGardenFurnitures: number;
  resinOrMetalGardenFurnitures: number;

  constructor({
    inhabitants,
    preservation,
    wardrobes,
    couches,
    mattresses,
    beds,
    tables,
    chairs,
    smallFurnitures,
    bigFurnitures,
    woodenGardenFurnitures,
    resinOrMetalGardenFurnitures,
  }: Props) {
    this.inhabitants = inhabitants ?? defaultNumberOfInhabitants;
    this.preservation = preservation ?? "medium";
    this.wardrobes = wardrobes ?? 0;
    this.couches = couches ?? 0;
    this.mattresses = mattresses ?? 0;
    this.beds = beds ?? 0;
    this.tables = tables ?? 0;
    this.chairs = chairs ?? 0;
    this.smallFurnitures = smallFurnitures ?? 0;
    this.bigFurnitures = bigFurnitures ?? 0;
    this.woodenGardenFurnitures = woodenGardenFurnitures ?? 0;
    this.resinOrMetalGardenFurnitures = resinOrMetalGardenFurnitures ?? 0;
  }

  public get annualFootprint(): number {
    return Math.round(
      (this.wardrobesAnnualFootprint +
        this.couchesAnnualFootprint +
        this.mattressesAnnualFootprint +
        this.bedsAnnualFootprint +
        this.tablesAnnualFootprint +
        this.chairsAnnualFootprint +
        this.smallFurnituresAnnualFootprint +
        this.bigFurnituresAnnualFootprint +
        this.woodenGardenFurnituresAnnualFootprint +
        this.resinOrMetalGardenFurnituresAnnualFootprint) /
        this.inhabitants,
    );
  }

  private get wardrobesAnnualFootprint(): number {
    return (
      this.wardrobes *
      (wardrobe.footprint /
        (wardrobe.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get couchesAnnualFootprint(): number {
    return (
      this.couches *
      (couch.footprint /
        (couch.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get mattressesAnnualFootprint(): number {
    return (
      this.mattresses *
      (mattress.footprint /
        (mattress.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get bedsAnnualFootprint(): number {
    return (
      this.beds *
      (bed.footprint /
        (bed.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get tablesAnnualFootprint(): number {
    return (
      this.tables *
      (table.footprint /
        (table.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get chairsAnnualFootprint(): number {
    return (
      this.chairs *
      (chair.footprint /
        (chair.lifetimeInYears * preservationCoefficient(this.preservation)))
    );
  }

  private get smallFurnituresAnnualFootprint(): number {
    return (
      this.smallFurnitures *
      (smallFurniture.footprint /
        (smallFurniture.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get bigFurnituresAnnualFootprint(): number {
    return (
      this.bigFurnitures *
      (bigFurniture.footprint /
        (bigFurniture.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get woodenGardenFurnituresAnnualFootprint(): number {
    return (
      this.woodenGardenFurnitures *
      (woodenGardenFurniture.footprint /
        (woodenGardenFurniture.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }

  private get resinOrMetalGardenFurnituresAnnualFootprint(): number {
    return (
      this.resinOrMetalGardenFurnitures *
      (resinOrMetalGardenFurniture.footprint /
        (resinOrMetalGardenFurniture.lifetimeInYears *
          preservationCoefficient(this.preservation)))
    );
  }
}
