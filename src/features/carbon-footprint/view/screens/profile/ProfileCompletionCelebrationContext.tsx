import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { ProfileCompletionCelebration } from "@carbonFootprint/view/screens/profile/ProfileCompletionCelebration";

interface ProfileCompletionCelebrationContextType {
  celebrate: () => void;
}

const ProfileCompletionCelebrationContext = createContext<
  ProfileCompletionCelebrationContextType | undefined
>(undefined);

/**
 * The celebration state lives here rather than in ValidateResponsesButton:
 * that button unmounts as soon as its section is validated, so it cannot host
 * the overlay it triggers.
 */
export const ProfileCompletionCelebrationProvider = ({
  children,
}: PropsWithChildren) => {
  const [isCelebrating, setIsCelebrating] = useState(false);

  const celebrate = useCallback(() => setIsCelebrating(true), []);

  const dismiss = useCallback(() => setIsCelebrating(false), []);

  const value = useMemo(() => ({ celebrate }), [celebrate]);

  return (
    <ProfileCompletionCelebrationContext.Provider value={value}>
      {children}
      <ProfileCompletionCelebration
        visible={isCelebrating}
        onDismiss={dismiss}
      />
    </ProfileCompletionCelebrationContext.Provider>
  );
};

export const useProfileCompletionCelebration = () => {
  const context = useContext(ProfileCompletionCelebrationContext);

  if (context === undefined) {
    throw new Error(
      "useProfileCompletionCelebration must be used within a ProfileCompletionCelebrationProvider",
    );
  }

  return context;
};
