import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

import { ListContentContainer } from "../../components/ListContentContainer";

export const HolidaysSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  return (
    <List.Accordion
      title={t("emissions:transport.holidays")}
      left={(props) => <List.Icon {...props} icon="tent" />}
    >
      <ListContentContainer />
    </List.Accordion>
  );
};
