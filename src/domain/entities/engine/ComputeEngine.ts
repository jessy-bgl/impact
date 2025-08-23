import { Action } from "@domain/entities/action/Action";
import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/question/Question";

export interface ComputeEngine {
  getQuestions: (
    profile: Profile,
    questionKeys: (keyof Profile)[],
  ) => Record<keyof Profile, Question>;
  getActions: () => Action[];
  computeTransportFootprint: () => TransportFootprint;
  computeFoodFootprint: () => FoodFootprint;
  computeHousingFootprint: () => HousingFootprint;
  computeEverydayThingsFootprint: () => EverydayThingsFootprint;
  computeSocietalServicesFootprint: () => SocietalServicesFootprint;
  computeFootprints: () => {
    transport: TransportFootprint;
    food: FoodFootprint;
    housing: HousingFootprint;
    everydayThings: EverydayThingsFootprint;
    societalServices: SocietalServicesFootprint;
  };
  setProfile: (profile: Profile, keepCurrentValues?: boolean) => void;
}
