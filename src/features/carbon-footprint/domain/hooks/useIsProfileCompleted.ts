import { isProfileCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useAppStore } from "@common/store/useStore";

export const useIsProfileCompleted = () =>
  useAppStore((state) => isProfileCompleted(state.profile.completion));
