import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  JSX,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";

import { AppNavigationProp } from "@app/AppNavigation";
import { UsecasesContext } from "@common/context/UsecasesContext";

type Props = {
  renderSyncIcon: (animatedValue: Animated.Value) => JSX.Element;
};

export const useProfileSync = ({ renderSyncIcon }: Props) => {
  const { syncFootprintsProfileWithEngine } = useContext(UsecasesContext);

  const isFocused = useIsFocused();
  const hasInitiallyFocused = useRef(false);

  const [isSyncing, setIsSyncing] = useState(false);

  const { setOptions } = useNavigation<AppNavigationProp>();

  // Sync profile with engine is required here when returning from other screens
  // because some footprint categories are linked together. For example,
  // updating the housing profile may affect the transport footprint.
  useEffect(() => {
    if (!isFocused) return;

    // Skip sync on initial focus (first time visiting the screen)
    if (!hasInitiallyFocused.current) {
      hasInitiallyFocused.current = true;
      return;
    }

    const syncProfile = async () => {
      setIsSyncing(true);
      try {
        await syncFootprintsProfileWithEngine();
      } catch (error) {
        console.error("Error syncing profile:", error); // TODO: envoyer l'erreur à un service de monitoring
      } finally {
        setIsSyncing(false);
      }
    };

    syncProfile();

    return () => setIsSyncing(false);
  }, [isFocused, syncFootprintsProfileWithEngine]);

  const syncAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSyncing) {
      syncAnimation.setValue(0); // Reset rotation value to 0 before starting
      const rotation = Animated.loop(
        Animated.timing(syncAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );
      rotation.start();
      return () => rotation.stop();
    }
  }, [isSyncing, syncAnimation]);

  const renderSyncingIconCallback = useCallback(() => {
    if (!isSyncing) return undefined;
    return renderSyncIcon(syncAnimation);
  }, [isSyncing, renderSyncIcon, syncAnimation]);

  useLayoutEffect(
    () => setOptions({ headerRight: renderSyncingIconCallback }),
    [setOptions, renderSyncingIconCallback],
  );
};
