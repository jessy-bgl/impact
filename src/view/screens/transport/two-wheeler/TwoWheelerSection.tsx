import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { List } from "react-native-paper";

import { styles } from "../styles";

export const TwoWheelerSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { container } = styles;

  return (
    <List.Accordion
      title={t("emissions:transport.twoWheeler")}
      left={(props) => <List.Icon {...props} icon="motorbike" />}
    >
      <View style={container} />
    </List.Accordion>
  );
};
