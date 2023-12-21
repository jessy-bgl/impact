import { Clothes } from "@domain/models/everyday-things/clothes/Clothes";
import { ConsumableProducts } from "@domain/models/everyday-things/consumable-products/ConsumableProducts";
import { Digital } from "@domain/models/everyday-things/digital/Digital";
import { Furniture } from "@domain/models/everyday-things/furniture/Furniture";
import { Hobbies } from "@domain/models/everyday-things/hobbies/Hobbies";
import { HouseholdAppliances } from "@domain/models/everyday-things/household-appliances/HouseholdAppliances";
import { OtherProducts } from "@domain/models/everyday-things/other-products/OtherProducts";
import { Pets } from "@domain/models/everyday-things/pets/Pets";
import { Tobacco } from "@domain/models/everyday-things/tobacco/Tobacco";
import { WithAnnualFootprint } from "@domain/models/types";

type Props = {
  pets?: Pets;
  clothes?: Clothes;
  householdAppliances?: HouseholdAppliances;
  furniture?: Furniture;
  digital?: Digital;
  hobbies?: Hobbies;
  consumableProducts?: ConsumableProducts;
  tobacco?: Tobacco;
  otherProducts?: OtherProducts;
};

export class EverydayThings implements WithAnnualFootprint {
  pets: Pets;
  clothes: Clothes;
  householdAppliances: HouseholdAppliances;
  furniture: Furniture;
  digital: Digital;
  hobbies: Hobbies;
  consumableProducts: ConsumableProducts;
  tobacco: Tobacco;
  otherProducts: OtherProducts;

  constructor({
    pets,
    clothes,
    householdAppliances,
    furniture,
    digital,
    hobbies,
    consumableProducts,
    tobacco,
    otherProducts,
  }: Props) {
    this.pets = new Pets(pets ?? {});
    this.clothes = new Clothes(clothes ?? {});
    this.furniture = new Furniture(furniture ?? {});
    this.digital = new Digital(digital ?? {});
    this.hobbies = new Hobbies(hobbies ?? {});
    this.consumableProducts = new ConsumableProducts(consumableProducts ?? {});
    this.tobacco = new Tobacco(tobacco ?? {});
    this.otherProducts = new OtherProducts(otherProducts ?? {});
    this.householdAppliances = new HouseholdAppliances(
      householdAppliances ?? {},
    );
  }

  public get annualFootprint(): number {
    return Math.round(
      this.pets.annualFootprint +
        this.clothes.annualFootprint +
        this.furniture.annualFootprint +
        this.digital.annualFootprint +
        this.hobbies.annualFootprint +
        this.consumableProducts.annualFootprint +
        this.tobacco.annualFootprint +
        this.otherProducts.annualFootprint +
        this.householdAppliances.annualFootprint,
    );
  }
}
