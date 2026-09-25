import { Ref } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { DescriptionSheetContent } from "@carbonFootprint/view/components/DescriptionSheetContent";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";

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
  const { colors, roundness } = useTheme();

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
            backgroundColor: footprintViewModel.color,
            borderRadius: roundness,
            paddingVertical: 2,
            paddingHorizontal: 6,
          }}
        >
          <Icon source="arrow-down" size={16} color={colors.surface} />
          <Text variant="labelLarge" style={{ color: colors.surface }}>
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
        backgroundColor: footprintViewModel.color,
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
        icon={footprintViewModel.materialIcon}
        size={25}
        iconColor={colors.surfaceVariant}
        onPress={showDescription}
      />
    </View>
  );
};
