import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Card, Icon, Text, useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { PROFILE_TOUR_TARGETS } from "@carbonFootprint/domain/entities/tour/profileTour";
import { useTourTarget } from "@common/tour/useTourTarget";
import { getImageAsset } from "@common/utils/imageAssets";

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

  const { colors } = useTheme();

  const { image, footprint, color, materialIcon } = footprintCategory;

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
      <Card style={{ width: "100%" }} onPress={onClick}>
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
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Icon
                  source={isCompleted ? "check-circle" : "information-outline"}
                  color={isCompleted ? colors.primary : colors.error}
                  size={12}
                />
                <Text
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  {isCompleted ? t("completed") : t("toComplete")}
                </Text>
              </View>
            </View>
          }
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={materialIcon}
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
          subtitleStyle={{ marginTop: -5, color: colors.onSurfaceVariant }}
        />
        <Card.Content>
          <Image
            source={getImageAsset(image)}
            contentFit="contain"
            style={{ height: 130 }}
          />
        </Card.Content>
      </Card>
    </View>
  );
};
