import { TouchableOpacity, View } from "react-native";
import { Checkbox, CheckboxItemProps, useTheme } from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { styles } from "@carbonFootprint/view/screens/profile/components/styles";

type Props = Omit<CheckboxItemProps, "label"> & {
  question: Question;
  value: string;
};

/**
 * `Checkbox.Item` only accepts a plain string label, which leaves no room for
 * the description icon. The row it renders is rebuilt here around `TextLabel`,
 * so a mosaic option opens its description like every other question.
 */
export const SelectCheckbox = ({ question, value, ...props }: Props) => {
  const { colors } = useTheme();

  const color = question.isEngineDefaultValueUsed
    ? colors.onSurfaceDisabled
    : undefined;

  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      accessibilityState={{ checked: props.status === "checked" }}
      style={{ ...styles.rowContainer, ...checkboxRowStyle }}
      onPress={props.onPress}
    >
      <TextLabel question={question} style={{ flex: 1 }} />
      <View
        pointerEvents="none"
        importantForAccessibility="no-hide-descendants"
      >
        <Checkbox status={props.status} color={color} />
      </View>
    </TouchableOpacity>
  );
};

// Matches the metrics `Checkbox.Item` used to apply: its own horizontal
// padding on top of the list one, and the height the profile lists rely on.
const checkboxRowStyle = { height: 40, paddingHorizontal: 16 };
