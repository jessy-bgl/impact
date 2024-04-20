import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";

import { NumericInput } from "@view/components/forms/NumericInput";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues, useBoat } from "./useBoat";

export const BoatSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, usage, annualFootprint } = useBoat();

  return (
    <ListAccordion
      title={t("emissions:transport.boat")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="ferry"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 1 }}>
            {t("boat.usage")}
          </Text>
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
                style={{ flex: 1 }}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("boat.hoursPerYear")}
          </Text>
          <Controller<FormValues>
            name="hoursPerYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
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
    </ListAccordion>
  );
};
