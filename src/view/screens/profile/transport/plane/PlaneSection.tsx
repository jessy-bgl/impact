import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";

import { NumericInput } from "@view/components/forms/NumericInput";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues, usePlane } from "./usePlane";

export const PlaneSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, usage, annualFootprint } = usePlane();

  return (
    <ListAccordion
      title={t("emissions:transport.plane")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="airplane"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 1 }}>
            {t("plane.usage")}
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
            {t("plane.hoursPerYearInShortHaul")}
          </Text>
          <Controller<FormValues>
            name="hoursPerYearInShortHaul"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerYearInShortHaul")}
                onChangeText={onChange}
                value={value}
                disabled={!usage}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("plane.hoursPerYearInMediumHaul")}
          </Text>
          <Controller<FormValues>
            name="hoursPerYearInMediumHaul"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerYearInMediumHaul")}
                onChangeText={onChange}
                value={value}
                disabled={!usage}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("plane.hoursPerYearInLongHaul")}
          </Text>
          <Controller<FormValues>
            name="hoursPerYearInLongHaul"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerYearInLongHaul")}
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
