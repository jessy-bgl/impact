import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/Question";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export const createUpdateProfile = (
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
) => {
  const updateProfile = (profile: Profile): void => {
    const updatedProfile = profileRepository.updateProfile(profile);
    AdemeFootprintEngine.updateSituation(updatedProfile);
  };

  const updateTransportProfile = (question: Question, value: string) => {
    updateProfile({ [question.label]: value });
    const footprint = AdemeFootprintEngine.computeTransportFootprint();
    footprintsRepository.updateTransportFootprint(footprint);
  };

  return { updateTransportProfile };
};
