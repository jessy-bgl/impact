import * as React from "react";
import { useTranslation } from "react-i18next";
import { Divider, List } from "react-native-paper";

export const TransportProfil = () => {
  const { t } = useTranslation(["emissions", "common"]);

  return (
    <List.Section>
      <List.Accordion
        title={t("transport.car")}
        left={(props) => <List.Icon {...props} icon="car" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <Divider />
    </List.Section>
  );
};
