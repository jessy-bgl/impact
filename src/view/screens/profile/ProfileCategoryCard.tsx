import { cloneElement, isValidElement } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Card, Icon, Text, useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

type Props = {
  title: string;
  footprintCategory: FootprintCategoryViewModel;
  onClick: () => void;
  completed: boolean;
};

export const ProfileCategoryCard = ({
  title,
  footprintCategory,
  onClick,
  completed,
}: Props) => {
  const { t } = useTranslation("common");

  const { colors } = useTheme();

  const { image, footprint, color, materialIcon } = footprintCategory;

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
                source={completed ? "check-circle" : "information-outline"}
                color={completed ? colors.primary : colors.error}
                size={12}
              />
              <Text
                variant="bodyMedium"
                style={{ color: colors.onSurfaceVariant }}
              >
                {completed ? "Complété" : "A compléter"}
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
        <View style={{ height: 150 }}>
          {image && isValidElement(image) ? cloneElement(image) : image}
        </View>
      </Card.Content>
    </Card>
  );
};
