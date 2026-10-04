import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import {
  Action,
  hasKnownSavings,
} from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { DescriptionSheetContent } from "@carbonFootprint/view/components/DescriptionSheetContent";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";
import { formatTonnes } from "@common/utils/formatTonnes";
import { readableTextOn } from "@common/utils/readableTextOn";

export const useShowActionDescription = (
  action: Action,
  footprintViewModel: FootprintCategoryViewModel,
) => {
  const { t } = useTranslation("common");

  const { roundness } = useTheme();

  const fill = useCategoryPalette()[footprintViewModel.styleKey];
  const ink = readableTextOn(fill);

  const { present } = useCustomBottomSheetModal();

  return () =>
    present(
      <DescriptionSheetContent
        title={action.label}
        description={action.description}
      >
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
      </DescriptionSheetContent>,
    );
};
