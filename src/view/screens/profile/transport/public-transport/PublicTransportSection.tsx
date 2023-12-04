import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { List, Text, TextInput } from "react-native-paper";

import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { ListTitle } from "@view/screens/profile/components/ListTitle";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues, usePublicTransport } from "./usePublicTransport";
import { NumericInput } from "@view/components/forms/NumericInput";

export const PublicTransportSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = usePublicTransport();

  return (
    <List.Accordion
      title={
        <ListTitle
          title={t("emissions:transport.public")}
          subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        />
      }
      left={(props) => <List.Icon {...props} icon="train" />}
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
    </List.Accordion>
  );
};
