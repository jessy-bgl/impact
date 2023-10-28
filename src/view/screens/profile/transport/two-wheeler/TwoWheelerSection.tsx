import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

import { ListContentContainer } from "../../components/ListContentContainer";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.twoWheeler")}
      left={(props) => <List.Icon {...props} icon="motorbike" />}
    >
      <ListContentContainer />
    </List.Accordion>
  );
};
