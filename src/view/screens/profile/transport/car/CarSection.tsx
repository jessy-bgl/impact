import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native-paper";

import { useAppStore } from "@data/store/store";
import { NumericInput } from "@view/components/forms/NumericInput";
import { TextLabel } from "@view/components/forms/TextLabel";
import { ListAccordion } from "@view/screens/profile/components/ListAccordion";
import { ListContentContainer } from "@view/screens/profile/components/ListContentContainer";
import { ListItemDivider } from "@view/screens/profile/components/ListItemDivider";
import { RowContainer } from "@view/screens/profile/components/RowContainer";
import { FormValues } from "@view/screens/profile/utils/types";
import { useCar } from "./useCar";

export const CarSection = () => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.carFootprint,
  );

  const {
    control,
    handleUpdateTransportProfile,
    kmPerYearQuestion,
    averagePassengersQuestion,
    regularUsageOfSameCarQuestion,
  } = useCar();

  return (
    <>
      <ListAccordion
        title={t("emissions:transport.car")}
        subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        icon="car"
      >
        <ListContentContainer>
          <RowContainer>
            <TextLabel question={kmPerYearQuestion} style={{ flex: 1.5 }} />
            <Controller<FormValues>
              name={kmPerYearQuestion.label}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <NumericInput
                    question={kmPerYearQuestion}
                    right={<TextInput.Affix text="km" />}
                    style={{ flex: 1 }}
                    onBlur={(e) =>
                      handleUpdateTransportProfile(
                        kmPerYearQuestion,
                        e.target.value,
                      )
                    }
                    onChangeText={onChange}
                    value={value}
                  />
                );
              }}
            />
          </RowContainer>

          <ListItemDivider />

          <RowContainer>
            <TextLabel
              question={averagePassengersQuestion}
              style={{ flex: 3 }}
            />
            <Controller<FormValues>
              name={averagePassengersQuestion.label}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <NumericInput
                    question={averagePassengersQuestion}
                    style={{ flex: 1 }}
                    onBlur={(e) =>
                      handleUpdateTransportProfile(
                        averagePassengersQuestion,
                        e.target.value,
                      )
                    }
                    onChangeText={onChange}
                    value={value}
                  />
                );
              }}
            />
            {/* <Text
                variant="labelLarge"
                onPress={() =>
                  setModal({ show: true, content: <InfoSameCar /> })
                }
              >
                {t("car.regularUser")}
              </Text>
              <Controller<FormValues>
                name="regularUser"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SegmentedButtons
                    density="small"
                    value={value}
                    onValueChange={(e) => {
                      onChange(e);
                      handleUpdate("regularUser");
                    }}
                    buttons={[
                      { value: "true", label: t("common:yes") },
                      { value: "false", label: t("common:no") },
                    ]}
                  />
                )}
              /> */}
          </RowContainer>
        </ListContentContainer>
      </ListAccordion>
    </>
  );
};
