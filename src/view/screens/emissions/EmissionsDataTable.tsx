import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";

import { useAppStore } from "@data/store/store";
import { Footprints } from "@view/view-models/Footprint";

type Props = {
  footprints: Footprints;
};

export const EmissionsDataTable = ({ footprints }: Props) => {
  const { t } = useTranslation(["emissions", "common"]);

  const { colors } = useTheme();

  const profileCompletion = useAppStore((state) => state.profile.completion);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{t("category")}</DataTable.Title>
        <DataTable.Title numeric>{t("annualFootprint")}</DataTable.Title>
      </DataTable.Header>

      {Object.values(footprints)
        .sort((a, b) => b.footprint - a.footprint)
        .map((emissionsCategory) => {
          const isCompleted = Object.values(
            profileCompletion[emissionsCategory.category],
          ).every(Boolean);
          return (
            <DataTable.Row key={emissionsCategory.category}>
              <DataTable.Cell>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 32 / 2,
                      backgroundColor: emissionsCategory.color,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: colors.background, fontSize: 12 }}>
                      {emissionsCategory.part}%
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", gap: 2 }}>
                    <Text>{t(`categories.${emissionsCategory.category}`)}</Text>
                    {!isCompleted && (
                      <Text
                        variant="labelSmall"
                        style={{ color: colors.error }}
                      >
                        {t(`common:toComplete`)}
                      </Text>
                    )}
                  </View>
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {emissionsCategory.footprint} {t("common:footprintKg")}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
    </DataTable>
  );
};
