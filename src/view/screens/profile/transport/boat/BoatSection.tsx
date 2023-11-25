import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { List, SegmentedButtons, Text, TextInput } from "react-native-paper";

import { FormValues, useBoat } from "./useBoat";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { ListTitle } from "@view/screens/profile/components/ListTitle";
import { RowContainer } from "@view/screens/profile/components/RowContainer";

export const BoatSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, usage, annualFootprint } = useBoat();

  return (
    <List.Accordion
      title={
        <ListTitle
          title={t("emissions:transport.boat")}
          subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        />
      }
      left={(props) => <List.Icon {...props} icon="ferry" />}
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge">{t("boat.usage")}</Text>
          <Controller<FormValues>
            name="usage"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("usage");
                }}
                buttons={[
                  { value: "true", label: t("common:yes") },
                  { value: "false", label: t("common:no") },
                ]}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2 }}>
            {t("boat.hoursPerYear")}
          </Text>
          <Controller<FormValues>
            name="hoursPerYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                dense
                mode="outlined"
                keyboardType="numeric"
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerYear")}
                onChangeText={onChange}
                value={value}
                disabled={!usage}
              />
            )}
          />
        </RowContainer>
      </ListContentContainer>
    </List.Accordion>
  );
};
