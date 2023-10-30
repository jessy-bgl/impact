import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

import { ListContentContainer } from "../../components/ListContentContainer";

export const TrainSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.train")}
      left={(props) => <List.Icon {...props} icon="train" />}
    >
      <ListContentContainer />
    </List.Accordion>
  );
};
