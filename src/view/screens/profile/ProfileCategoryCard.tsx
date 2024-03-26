import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

type Props = {
  title: string;
  footprintCategory: FootprintCategoryViewModel;
  icon: IconSource;
  onClick: () => void;
};

export const ProfileCategoryCard = ({
  title,
  footprintCategory,
  icon,
  onClick,
}: Props) => {
  const { t } = useTranslation("common");

  const { image, footprint, color, part } = footprintCategory;

  return (
    <Card style={styles.card} onPress={onClick}>
      <Card.Title
        title={title}
        subtitle={`${footprint} ${t("footprintKgPerYear")}`}
        left={(props: any) => (
          <Avatar.Icon
            {...props}
            icon={icon}
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
      />
      <Card.Cover
        resizeMode="contain"
        source={{ uri: image }}
        style={styles.image}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  image: {
    height: 150,
  },
});
