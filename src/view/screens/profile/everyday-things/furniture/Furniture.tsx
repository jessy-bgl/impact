import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import { preservationOptions } from "@domain/entities/categories/everyday-things/types";
import { NumericInput } from "@view/components/forms/NumericInput";
import { InfoModal } from "@view/components/modals/InfoModal";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { useStyles } from "@view/screens/profile/utils/useStyles";
import { InfoPreservation } from "./info/InfoPreservation";
import { FormValues, FurnitureLabels, useFurniture } from "./useFurniture";

export const FurnitureSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);
  const [modal, setModal] = useState<InfoModalState>({ show: false });
  const { control, handleUpdate, annualFootprint } = useFurniture();
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
        title={t("emissions:everydayThings.furniture")}
        subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        icon="bed"
      >
        <ListContentContainer>
          <ColumnContainer>
            <Text
              variant="labelLarge"
              style={{ flex: 1.5, ...infoTextStyle }}
              onPress={() =>
                setModal({ show: true, content: <InfoPreservation /> })
              }
            >
              {t("furniture.preservation")}
            </Text>
            <Controller<FormValues>
              name="preservation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <SegmentedButtons
                    density="small"
                    value={value}
                    onValueChange={(e) => {
                      onChange(e);
                      handleUpdate("preservation");
                    }}
                    buttons={preservationOptions.slice(0, 2).map((option) => ({
                      value: option,
                      label: t(`furniture.preservationChoices.${option}`),
                    }))}
                  />
                  <SegmentedButtons
                    density="small"
                    value={value}
                    onValueChange={(e) => {
                      onChange(e);
                      handleUpdate("preservation");
                    }}
                    buttons={preservationOptions.slice(2, 4).map((option) => ({
                      value: option,
                      label: t(`furniture.preservationChoices.${option}`),
                    }))}
                  />
                </View>
              )}
            />
          </ColumnContainer>

          <ListItemDivider />

          <RowContainer>
            <Text variant="labelLarge" style={{ textAlign: "center" }}>
              {t("furniture.title")}
            </Text>
          </RowContainer>

          {FurnitureLabels.map((label) => (
            <RowContainer key={label} style={{ marginTop: 10 }}>
              <Text variant="labelLarge" style={{ flex: 3 }}>
                {t(`furniture.${label}`)}
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
    </>
  );
};
