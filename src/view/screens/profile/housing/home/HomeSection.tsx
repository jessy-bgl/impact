import { useTranslation } from "react-i18next";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { NumericInput } from "@view/components/forms/NumericInput";
import { FormValues, useHome } from "./useHome";

export const HomeSection = () => {
  const { t } = useTranslation(["housing", "emissions", "common"]);

  const { annualFootprint, control, handleUpdate } = useHome();

  return (
    <ListAccordion
      title={t("emissions:housing.home")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="home"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("housing:home.occupants")}
          </Text>
          <Controller<FormValues>
            name="occupants"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("occupants")}
                onChangeText={onChange}
                value={value}
                min={1}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 3 }}>
            {t("housing:home.livingSpace")}
          </Text>
          <Controller<FormValues>
            name="livingSpace"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("livingSpace")}
                onChangeText={onChange}
                value={value}
                min={10}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge" style={{ flex: 2.5 }}>
            {t("housing:home.ageInYears")}
          </Text>
          <Controller<FormValues>
            name="ageInYears"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericInput
                style={{ flex: 1 }}
                onBlur={() => handleUpdate("ageInYears")}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Affix text="ans" />}
              />
            )}
          />
        </RowContainer>

        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge">{t("housing:home.isAnApartment")}</Text>
          <Controller<FormValues>
            name="isAnApartment"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("isAnApartment");
                }}
                buttons={[
                  { value: "true", label: t("common:yes") },
                  { value: "false", label: t("common:no") },
                ]}
              />
            )}
          />
        </RowContainer>

        {/* 
        NB : the "ecoBuilt" CO2e impact formula is not precise enough to be included
        in the app for now (cf. https://github.com/incubateur-ademe/nosgestesclimat)
        
        <ListItemDivider />

        <RowContainer>
          <Text variant="labelLarge">{t("housing:home.isEcoBuilt")}</Text>
          <Controller<FormValues>
            name="isEcoBuilt"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                density="small"
                value={value}
                onValueChange={(e) => {
                  onChange(e);
                  handleUpdate("isEcoBuilt");
                }}
                buttons={[
                  { value: "true", label: t("common:yes") },
                  { value: "false", label: t("common:no") },
                ]}
              />
            )}
          />
        </RowContainer> 
        */}
      </ListContentContainer>
    </ListAccordion>
  );
};
