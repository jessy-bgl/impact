import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

import { ListContentContainer } from "../../components/ListContentContainer";

export const BoatSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.boat")}
      left={(props) => <List.Icon {...props} icon="ferry" />}
    >
      <ListContentContainer />
    </List.Accordion>
  );
};
