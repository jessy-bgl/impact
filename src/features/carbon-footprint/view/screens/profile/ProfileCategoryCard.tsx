import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Card, Icon, Text, useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/FootprintViewModel";
import { getImageAsset } from "@carbonFootprint/view/utils/imageAssets";

type Props = {
  title: string;
  footprintCategory: FootprintCategoryViewModel;
  onClick: () => void;
  completion: Record<string, boolean>;
};

export const ProfileCategoryCard = ({
  title,
  footprintCategory,
  onClick,
  completion,
}: Props) => {
  const { t } = useTranslation("common");

  const { colors } = useTheme();

  const { image, footprint, color, materialIcon } = footprintCategory;

  const isCompleted = Object.values(completion).every(Boolean);

  return (
    <Card style={{ width: "100%", maxWidth: 500 }} onPress={onClick}>
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
                color: color,
                textAlign: "center",
              }}
            >
              {footprint}
            </Text>
            <Text
              variant="labelSmall"
              style={{
                color: color,
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
  );
};
