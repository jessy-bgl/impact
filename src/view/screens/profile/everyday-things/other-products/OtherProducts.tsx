import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { RadioButton, Text } from "react-native-paper";
import { Controller } from "react-hook-form";

import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ModalInfoButton } from "@view/screens/profile/components/ModalInfoButton";
import { Info } from "./info/Info";
import {
  FormValues,
  spendingLevels,
  useOtherProducts,
} from "./useOtherProducts";

export const OtherProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const { control, handleUpdate, annualFootprint, setValue } =
    useOtherProducts();

  return (
    <ListAccordion
      title={t("emissions:everydayThings.otherProducts")}
      subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
      icon="package"
    >
      <ListContentContainer>
        <ColumnContainer>
          <Text variant="labelLarge">
            {t("otherProducts.title")}
            <ModalInfoButton modalContent={<Info />} />
          </Text>
          <Controller<FormValues>
            name="spendingLevel"
            control={control}
            render={({ field: { value } }) => (
              <RadioButton.Group
                value={value}
                onValueChange={(newValue) => {
                  setValue("spendingLevel", newValue);
                  handleUpdate("spendingLevel");
                }}
              >
                {spendingLevels.map((option) => (
                  <View
                    key={option}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <RadioButton value={option} />
                    <Text>{t(`otherProducts.spendingLevels.${option}`)}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            )}
          />
        </ColumnContainer>
      </ListContentContainer>
    </ListAccordion>
  );
};
