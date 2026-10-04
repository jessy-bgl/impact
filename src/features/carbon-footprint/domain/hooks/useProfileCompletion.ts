import { useAppStore } from "@common/store/useStore";

export const useProfileCompletion = () =>
  useAppStore((store) => store.profile.completion);
