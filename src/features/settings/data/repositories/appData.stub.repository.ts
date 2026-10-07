import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { AppDataRepository } from "@settings/domain/repositories/appData.repository";

export class AppDataStubRepository implements AppDataRepository {
  constructor(private profileRepository: ProfileStubRepository) {}

  clearLocalData(): void {
    this.profileRepository.profile = {};
  }
}
