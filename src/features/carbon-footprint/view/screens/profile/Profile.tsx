import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { isCategoryCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { useProfileCompletion } from "@carbonFootprint/domain/hooks/useProfileCompletion";
import { useOpenCategoryProfile } from "@carbonFootprint/view/hooks/useOpenCategoryProfile";
import { ProfileCategoryCard } from "@carbonFootprint/view/screens/profile/ProfileCategoryCard";
import { ProfileTourHelpButton } from "@carbonFootprint/view/tour/ProfileTourHelpButton";
import { useTourScrollContainer } from "@common/tour/useTourScrollContainer";

export const Profile = () => {
  const { t } = useTranslation("emissions");

  const { setOptions } = useNavigation<EmissionsNavigatorProp>();

  const openCategory = useOpenCategoryProfile();

  const { footprints } = useFootprints();

  const profileCompletion = useProfileCompletion();

  useLayoutEffect(
    () => setOptions({ headerRight: () => <ProfileTourHelpButton /> }),
    [setOptions],
  );

  // The tour may start after the user scrolled down: let it bring the
  // spotlighted card back into view.
  const scrollViewRef = useRef<ScrollView>(null);
  useTourScrollContainer(scrollViewRef);

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        paddingBottom: 10,
        gap: 10,
      }}
    >
      {categoryOrder.map((category) => (
        <ProfileCategoryCard
          key={category}
          title={t(`categories.${category}`)}
          footprintCategory={footprints[category]}
          onClick={() => openCategory(category)}
          isCompleted={isCategoryCompleted(profileCompletion, category)}
        />
      ))}
    </ScrollView>
  );
};
