import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { PROFILE_TOUR_TARGETS } from "@carbonFootprint/domain/entities/tour/profileTour";
import { DescriptionSheetContent } from "@carbonFootprint/view/components/DescriptionSheetContent";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";
import { useTourTarget } from "@common/tour/useTourTarget";

type Props = {
  question: Question;
  style?: StyleProp<ViewStyle>;
};

export const TextLabel = ({ question, style }: Props) => {
  const { present } = useCustomBottomSheetModal();

  const handlePress = () => {
    if (question.description) {
      present(
        <DescriptionSheetContent
          title={question.title}
          description={question.description}
        />,
      );
    }
  };

  const { colors } = useTheme();

  const infoIconTourRef = useTourTarget(PROFILE_TOUR_TARGETS.infoIcon, {
    enabled: Boolean(question.description),
  });

  return (
    <TouchableOpacity
      style={[{ flexDirection: "row", alignItems: "center" }, style]}
      onPress={question.description ? handlePress : undefined}
      disabled={!question.description}
    >
      <Text variant="labelLarge" style={{ flexShrink: 1 }}>
        {question.title}
      </Text>
      {question.description && (
        <View
          ref={infoIconTourRef}
          collapsable={false}
          style={{ marginLeft: 4 }}
        >
          <Icon source="information" color={colors.secondary} size={12} />
        </View>
      )}
    </TouchableOpacity>
  );
};
