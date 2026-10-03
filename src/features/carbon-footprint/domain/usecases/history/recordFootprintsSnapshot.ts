import {
  buildSnapshot,
  toDayKey,
  upsertSnapshot,
} from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { isProfileCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { FootprintsHistoryRepository } from "@carbonFootprint/domain/repositories/footprintsHistory.repository";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";
import { Clock } from "@common/domain/Clock";

/**
 * Records the current footprints under today's date.
 *
 * Only called by the engine sync, once every category has been computed from
 * the same profile: an answer recomputes its own category only, while it can
 * move the others too. Self-guarding on purpose, so the sync stays free of
 * "should we record?" logic.
 */
export const createRecordFootprintsSnapshot = (
  clock: Clock,
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
  footprintsHistoryRepository: FootprintsHistoryRepository,
) => {
  const recordFootprintsSnapshot = (): void => {
    // An incomplete profile is mostly engine defaults, so tracking it would open
    // the history on a French-average value the user never stated.
    if (!isProfileCompleted(profileRepository.fetchProfileCompletion())) return;

    const snapshot = buildSnapshot(
      toDayKey(clock.now()),
      footprintsRepository.fetchFootprints(),
    );
    if (!snapshot) return;

    const updatedHistory = upsertSnapshot(
      footprintsHistoryRepository.fetchHistory(),
      snapshot,
    );

    if (updatedHistory) footprintsHistoryRepository.saveHistory(updatedHistory);
  };

  return { recordFootprintsSnapshot };
};
