import { Clothes } from "@domain/entities/everyday-things/clothes/Clothes";
import { ConsumableProducts } from "@domain/entities/everyday-things/consumable-products/ConsumableProducts";
import { Digital } from "@domain/entities/everyday-things/digital/Digital";
import { Furniture } from "@domain/entities/everyday-things/furniture/Furniture";
import { Hobbies } from "@domain/entities/everyday-things/hobbies/Hobbies";
import { HouseholdAppliances } from "@domain/entities/everyday-things/household-appliances/HouseholdAppliances";
import { OtherProducts } from "@domain/entities/everyday-things/other-products/OtherProducts";
import { Pets } from "@domain/entities/everyday-things/pets/Pets";
import { Tobacco } from "@domain/entities/everyday-things/tobacco/Tobacco";
import { WithAnnualFootprint } from "@domain/entities/types";

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
