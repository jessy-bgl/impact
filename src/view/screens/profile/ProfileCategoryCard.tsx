import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { EmissionsByCategory } from "../../../domain/models/transport/car/EmissionCategories";

type Props = {
  emissions: EmissionsByCategory;
  icon: IconSource;
  imageSource?: string;
};

export const ProfileCategoryCard = ({
  emissions,
  icon,
  imageSource,
}: Props) => {
  const { t } = useTranslation("common");

  return (
    <Card style={styles.card} onPress={() => {}}>
      <Card.Title
        title={t("transport")}
        subtitle={`${emissions.value} ${t("footprintKgPerYear")}`}
        left={(props: any) => (
          <Avatar.Icon
            {...props}
            icon={icon}
            style={{ backgroundColor: emissions.color }}
          />
        )}
        right={(props: any) => (
          <Avatar.Text
            {...props}
            label={`${emissions.part} %`}
            color={emissions.color}
            style={{
              backgroundColor: null,
              borderWidth: 2,
              borderColor: emissions.color,
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
