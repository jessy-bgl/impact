import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

import { ListContentContainer } from "../../components/ListContentContainer";

export const PlaneSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.plane")}
      left={(props) => <List.Icon {...props} icon="airplane" />}
    >
      <ListContentContainer />
    </List.Accordion>
  );
};
