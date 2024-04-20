import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

import { InfoModal } from "@view/components/modals/InfoModal";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { useStyles } from "@view/screens/profile/utils/useStyles";
import { Info } from "./info/Info";
import {
  FormValues,
  spendingLevels,
  useOtherProducts,
} from "./useOtherProducts";

export const OtherProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const [modal, setModal] = useState<InfoModalState>({ show: false });
  const { control, handleUpdate, annualFootprint, setValue } =
    useOtherProducts();
  const { infoTextStyle } = useStyles();

  return (
    <>
      {modal.show && (
        <InfoModal
          content={modal.content}
          hide={() => setModal({ show: false })}
        />
      )}

      <ListAccordion
        title={t("emissions:everydayThings.otherProducts")}
        subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        icon="package"
      >
        <ListContentContainer>
          <ColumnContainer>
            <Text
              variant="labelLarge"
              style={{ flex: 1.5, ...infoTextStyle }}
              onPress={() => setModal({ show: true, content: <Info /> })}
            >
              {t("otherProducts.title")}
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
    </>
  );
};
