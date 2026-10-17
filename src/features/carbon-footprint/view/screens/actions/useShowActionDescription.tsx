import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";

import {
  Action,
  hasKnownSavings,
} from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { DescriptionSheetContent } from "@carbonFootprint/view/components/DescriptionSheetContent";
import { MarkdownText } from "@carbonFootprint/view/components/MarkdownText";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { formatTonnes } from "@common/utils/formatTonnes";
import { openUrl } from "@common/utils/openUrl";
import { readableTextOn } from "@common/utils/readableTextOn";

export const useShowActionDescription = (
  action: Action,
  footprintViewModel: FootprintCategoryViewModel,
) => {
  const { t } = useTranslation(["common", "actions"]);

  const { roundness } = useTheme();

  const fill = useCategoryPalette()[footprintViewModel.styleKey];
  const ink = readableTextOn(fill);

  const { present } = useCustomBottomSheetModal();
  const { fetchActionContent } = useContext(UsecasesContext);

  return () => {
    const content = fetchActionContent(action.id);

    present(
      <DescriptionSheetContent title={action.label}>
        {hasKnownSavings(action) && (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 4,
              backgroundColor: fill,
              borderRadius: roundness,
              paddingVertical: 2,
              paddingHorizontal: 6,
            }}
          >
            <Icon source="arrow-down" size={16} color={ink} />
            <Text variant="labelLarge" style={{ color: ink }}>
              {`${formatTonnes(action.savedFootprint)} ${t("footprintTonnesPerYear")}`}
            </Text>
          </View>
        )}
        {content && (
          <>
            <Text variant="titleSmall" style={{ marginTop: 6 }}>
              {t("actions:sections.understand")}
            </Text>
            <MarkdownText value={content.description} />
            {content.tips && (
              <>
                <Text variant="titleSmall">{t("actions:sections.act")}</Text>
                <MarkdownText value={content.tips} />
              </>
            )}
            {content.benefits && (
              <>
                <Text variant="titleSmall">
                  {t("actions:sections.benefits")}
                </Text>
                <MarkdownText value={content.benefits} />
              </>
            )}
            <Button
              mode="text"
              icon="open-in-new"
              style={{ alignSelf: "flex-start" }}
              onPress={() => openUrl(content.detailsUrl)}
            >
              {t("actions:learnMore")}
            </Button>
          </>
        )}
      </DescriptionSheetContent>,
    );
  };
};
