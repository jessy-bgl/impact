import { useRoute } from "@react-navigation/native";
import { RefObject, useEffect } from "react";
import { ScrollView } from "react-native";

import { scrollNodeIntoView } from "@common/tour/scrollIntoView";
import { useTourRegistry } from "@common/tour/TourContext";

/**
 * Lets the tour scroll this screen to bring an off-screen target into view
 * before spotlighting it.
 */
export const useTourScrollContainer = (
  scrollViewRef: RefObject<ScrollView | null>,
) => {
  const { name: screen } = useRoute();
  const { registerScrollContainer } = useTourRegistry();

  useEffect(
    () =>
      registerScrollContainer({
        screen,
        ensureVisible: (node) =>
          scrollNodeIntoView(scrollViewRef.current, node),
      }),
    [screen, registerScrollContainer, scrollViewRef],
  );
};
