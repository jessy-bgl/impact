import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { CompletionStatus } from "@carbonFootprint/view/components/CompletionStatus";
import { PROFILE_TOUR_TARGETS } from "@carbonFootprint/domain/entities/tour/profileTour";
import { OutlinedCard } from "@common/components/OutlinedCard";
import { useTourTarget } from "@common/tour/useTourTarget";
import { getImageAsset } from "@common/utils/imageAssets";
import { readableTextOn } from "@common/utils/readableTextOn";

type Props = {
  title: string;
  footprintCategory: FootprintCategoryViewModel;
  onClick: () => void;
  isCompleted: boolean;
};

export const ProfileCategoryCard = ({
  title,
  footprintCategory,
  onClick,
  isCompleted,
}: Props) => {
  const { t } = useTranslation("common");

  const { image, footprint, icon } = footprintCategory;

  const color = useCategoryPalette()[footprintCategory.styleKey];

  // The guided tour spotlights the first card rendered on the profile screen.
  const cardTourRef = useTourTarget(PROFILE_TOUR_TARGETS.categoryCard, {
    label: title,
  });

  return (
    <View
      ref={cardTourRef}
      collapsable={false}
      style={{ width: "100%", maxWidth: 500 }}
    >
      <OutlinedCard style={{ width: "100%" }} onPress={onClick}>
        <Card.Title
          title={
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Text variant="titleMedium">{title}</Text>
              <CompletionStatus isCompleted={isCompleted} />
            </View>
          }
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={icon}
              color={readableTextOn(color)}
              style={{ backgroundColor: color }}
            />
          )}
          right={(props) => (
            <View
              {...props}
              style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: color,
                width: 75,
                height: 40,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                variant="labelMedium"
                style={{
                  textAlign: "center",
                }}
              >
                {footprint}
              </Text>
              <Text
                variant="labelSmall"
                style={{
                  textAlign: "center",
                }}
              >
                {t("footprintKgPerYear")}
              </Text>
            </View>
          )}
          style={{ paddingRight: 16 }}
        />
        <Card.Content>
          <Image
            source={getImageAsset(image)}
            contentFit="contain"
            style={{ height: 130 }}
          />
        </Card.Content>
      </OutlinedCard>
    </View>
  );
};
