import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { Footprints } from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

export class ComputeEngineStub implements ComputeEngine {
  lastProfile: Profile | null = null;
  lastKeepCurrentValues: boolean | undefined = undefined;
  questions: Partial<Record<keyof Profile, Question>> = {};
  frenchAverageFootprint = 0;

  readonly transportFootprint = new TransportFootprint({});
  readonly foodFootprint = new FoodFootprint({});
  readonly housingFootprint = new HousingFootprint({});
  readonly everydayThingsFootprint = new EverydayThingsFootprint({});
  readonly societalServicesFootprint = new SocietalServicesFootprint({});

  setProfile(profile: Profile, keepPreviousValues?: boolean): void {
    this.lastProfile = profile;
    this.lastKeepCurrentValues = keepPreviousValues;
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

  computeFrenchAverageFootprint(): number {
    return this.frenchAverageFootprint;
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

  getQuestions(
    _profile: Profile,
    questionLabels: (keyof Profile)[],
  ): Record<keyof Profile, Question> {
    return Object.fromEntries(
      questionLabels
        .filter((label) => this.questions[label] !== undefined)
        .map((label) => [label, this.questions[label]]),
    ) as Record<keyof Profile, Question>;
  }

  getActions(): Action[] {
    return [];
  }
}
