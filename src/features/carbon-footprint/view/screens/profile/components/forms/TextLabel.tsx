import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";

type Props = {
  question: Question;
  style?: StyleProp<ViewStyle>;
};

export const TextLabel = ({ question, style }: Props) => {
  const { present } = useCustomBottomSheetModal();

  const showBottomSheetModal = (content?: string) => {
    present(<Text>{content}</Text>);
  };

  const handlePress = () => {
    if (question.description) {
      showBottomSheetModal(question.description);
    }
  };

  const { colors } = useTheme();

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
        <View style={{ marginLeft: 4 }}>
          <Icon source="information" color={colors.secondary} size={12} />
        </View>
      )}
    </TouchableOpacity>
  );
};
