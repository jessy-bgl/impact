import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { FootprintByCategory } from "../../../domain/models/Footprint";

type Props = {
  footprint: FootprintByCategory;
  icon: IconSource;
  imageSource?: string;
  onClick: () => void;
};

export const ProfileCategoryCard = ({
  footprint,
  icon,
  imageSource,
  onClick,
}: Props) => {
  const { t } = useTranslation("common");

  return (
    <Card style={styles.card} onPress={onClick}>
      <Card.Title
        title={t("transport")}
        subtitle={`${footprint.value} ${t("footprintKgPerYear")}`}
        left={(props: any) => (
          <Avatar.Icon
            {...props}
            icon={icon}
            style={{ backgroundColor: footprint.color }}
          />
        )}
        right={(props: any) => (
          <Avatar.Text
            {...props}
            label={`${footprint.part} %`}
            color={footprint.color}
            style={{
              backgroundColor: null,
              borderWidth: 2,
              borderColor: footprint.color,
              width: 40,
              height: 40,
            }}
          />
        )}
        style={{ paddingRight: 16 }}
      />
      <Card.Cover
        resizeMode="contain"
        source={{ uri: imageSource }}
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
