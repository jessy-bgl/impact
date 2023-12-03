import { useTranslation } from "react-i18next";
import { List, Text } from "react-native-paper";

import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";

export const OtherSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.other")}
      left={(props) => <List.Icon {...props} icon="bike" />}
    >
      <ListContentContainer>
        <Text>{t("common:comingSoon")}</Text>
      </ListContentContainer>
    </List.Accordion>
  );
};
