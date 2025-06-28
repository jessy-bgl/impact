import { cloneElement, isValidElement } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Card, useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

type Props = {
  title: string;
  footprintCategory: FootprintCategoryViewModel;
  onClick: () => void;
};

export const ProfileCategoryCard = ({
  title,
  footprintCategory,
  onClick,
}: Props) => {
  const { t } = useTranslation("common");

  const { colors } = useTheme();

  const { image, footprint, color, part, materialIcon } = footprintCategory;

  return (
    <Card style={{ width: "100%", maxWidth: 500 }} onPress={onClick}>
      <Card.Title
        title={title}
        subtitle={`${footprint} ${t("footprintKgPerYear")}`}
        left={(props: any) => (
          <Avatar.Icon
            {...props}
            icon={materialIcon}
            style={{ backgroundColor: color }}
          />
        )}
        right={(props: any) => (
          <Avatar.Text
            {...props}
            label={`${part} %`}
            color={color}
            style={{
              backgroundColor: null,
              borderWidth: 2,
              borderColor: color,
              width: 40,
              height: 40,
            }}
          />
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
