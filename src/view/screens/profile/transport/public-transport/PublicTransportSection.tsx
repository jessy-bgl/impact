import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, TextInput } from "react-native-paper";

import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { NumericInput } from "@view/components/forms/NumericInput";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { FormValues, usePublicTransport } from "./usePublicTransport";

export const PublicTransportSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = usePublicTransport();

  return (
    <ListAccordion
      title={t("emissions:transport.public")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="train"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("public.hoursPerYearInTrain")}
          </Text>
          <Controller<FormValues>
            name="hoursPerYearInTrain"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerYearInTrain")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("public.hoursPerWeekInBus")}
          </Text>
          <Controller<FormValues>
            name="hoursPerWeekInBus"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerWeekInBus")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("public.hoursPerWeekInMetro")}
          </Text>
          <Controller<FormValues>
            name="hoursPerWeekInMetro"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                right={<TextInput.Affix text="h" />}
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("hoursPerWeekInMetro")}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </RowContainer>
      </ListContentContainer>
    </ListAccordion>
  );
};
