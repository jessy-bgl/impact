import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

import { ListContentContainer } from "@carbonFootprint/view/screens/profile/components/lists/ListContentContainer";

export const OtherProductsSectionContent = () => {
  const { t } = useTranslation("everydayThings");

  return (
    <ListContentContainer>
      <Text variant="bodyMedium">{t("otherProducts.description")}</Text>
    </ListContentContainer>
  );
};
