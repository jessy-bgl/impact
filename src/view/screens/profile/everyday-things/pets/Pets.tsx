import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

import { NumericInput } from "@view/components/forms/NumericInput";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues, PetsLabels, usePets } from "./usePets";

export const PetsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = usePets();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.pets")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="dog"
    >
      <ListContentContainer>
        <RowContainer>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("pets.title")}
          </Text>
        </RowContainer>

        {PetsLabels.map((label) => (
          <RowContainer key={label} style={{ marginTop: 10 }}>
            <Text variant="labelLarge" style={{ flex: 3 }}>
              {t(`pets.${label}`)}
            </Text>
            <Controller<FormValues>
              name={label}
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumericInput
                  style={{ flex: 1 }}
                  onBlur={() => handleUpdate(label)}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </RowContainer>
        ))}
      </ListContentContainer>
    </ListAccordion>
  );
};
