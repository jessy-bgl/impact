import { Ref } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { DescriptionSheetContent } from "@carbonFootprint/view/components/DescriptionSheetContent";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";
import { readableTextOn } from "@common/utils/readableTextOn";

type Props = {
  action: Action;
  footprintViewModel: FootprintCategoryViewModel;
  tourRef?: Ref<View>;
};

export const ActionCardCategory = ({
  action,
  footprintViewModel,
  tourRef,
}: Props) => {
  const { roundness } = useTheme();

  const fill = useCategoryPalette()[footprintViewModel.styleKey];
  const ink = readableTextOn(fill);

  const { t } = useTranslation("common");

  const { present } = useCustomBottomSheetModal();

  const showDescription = () =>
    present(
      <DescriptionSheetContent
        title={action.label}
        description={action.description}
      >
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
            {`${action.savedFootprint} ${t("footprintKgPerYear")}`}
          </Text>
        </View>
      </DescriptionSheetContent>,
    );

  return (
    <View
      ref={tourRef}
      collapsable={false}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: fill,
        borderTopRightRadius: roundness,
        borderBottomLeftRadius: roundness,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <IconButton
        icon={footprintViewModel.icon}
        size={25}
        iconColor={ink}
        onPress={showDescription}
      />
    </View>
  );
};
