import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";

export const OtherSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <ListAccordion title={t("emissions:transport.other")} icon="bike">
      <ListContentContainer>
        <Text>{t("common:comingSoon")}</Text>
      </ListContentContainer>
    </ListAccordion>
  );
};
