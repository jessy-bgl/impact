import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import {
  FootprintCategory,
  Footprints,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

export class ComputeEngineStub implements ComputeEngine {
  lastProfile: Profile | null = null;
  lastKeepPreviousValues: boolean | undefined = undefined;

  readonly transportFootprint = new TransportFootprint({});
  readonly foodFootprint = new FoodFootprint({});
  readonly housingFootprint = new HousingFootprint({});
  readonly everydayThingsFootprint = new EverydayThingsFootprint({});
  readonly societalServicesFootprint = new SocietalServicesFootprint({});

  setProfile(profile: Profile, keepPreviousValues?: boolean): void {
    this.lastProfile = profile;
    this.lastKeepPreviousValues = keepPreviousValues;
  }

  computeTransportFootprint(): TransportFootprint {
    return this.transportFootprint;
  }

  computeFoodFootprint(): FoodFootprint {
    return this.foodFootprint;
  }

  computeHousingFootprint(): HousingFootprint {
    return this.housingFootprint;
  }

  computeEverydayThingsFootprint(): EverydayThingsFootprint {
    return this.everydayThingsFootprint;
  }

  computeSocietalServicesFootprint(): SocietalServicesFootprint {
    return this.societalServicesFootprint;
  }

  computeFootprints(): Footprints {
    return {
      transport: this.transportFootprint,
      food: this.foodFootprint,
      housing: this.housingFootprint,
      everydayThings: this.everydayThingsFootprint,
      societalServices: this.societalServicesFootprint,
    };
  }

  getQuestions(): Record<keyof Profile, Question> {
    return {} as Record<keyof Profile, Question>;
  }

  getActions(): Action[] {
    return [];
  }

  getCategory(questionKey: keyof Profile): FootprintCategory {
    const root = questionKey.split(" . ")[0];
    if (root === "alimentation") return "food";
    if (root === "logement") return "housing";
    if (root === "divers") return "everydayThings";
    if (root === "services sociétaux") return "societalServices";
    return "transport";
  }
}
