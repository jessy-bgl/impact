import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { NumericInput } from "@view/components/forms/NumericInput";
import { FormValues, useClothes, ClothesLabels } from "./useClothes";

export const ClothesSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint } = useClothes();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.clothes")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="tshirt-crew"
    >
      <ListContentContainer>
        <RowContainer style={{ marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center" }}>
            {t("clothes.title")}
          </Text>
        </RowContainer>

        {ClothesLabels.map((label) => (
          <RowContainer key={label} style={{ marginTop: 10 }}>
            <Text variant="labelLarge" style={{ flex: 3 }}>
              {t(`clothes.${label}`)}
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
