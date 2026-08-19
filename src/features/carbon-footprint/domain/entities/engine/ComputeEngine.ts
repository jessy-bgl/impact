import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { Footprints } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

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
  computeFootprints: () => Footprints;
  computeFrenchAverageFootprint: () => number;
  setProfile: (profile: Profile, keepCurrentValues?: boolean) => void;
}
