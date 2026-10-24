import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  Icon,
  RadioButton,
  RadioButtonGroupProps,
  RadioButtonProps,
  Text,
  useTheme,
} from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";

type Props = RadioButtonProps &
  Omit<RadioButtonGroupProps, "children"> & {
    question: Question;
  };

export const SelectRadio = ({ question, value, onValueChange }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation("common");

  const color = question.isEngineDefaultValueUsed
    ? colors.onSurfaceDisabled
    : undefined;

  if (!question.options) return;

  // Rules without `par défaut` stay unanswered: the model then uses an average.
  const isUnanswered = !question.options.some(
    (option) => option.value === value,
  );

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      {isUnanswered && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 15,
            marginBottom: 4,
          }}
        >
          <Icon
            source="information-outline"
            size={16}
            color={colors.onSurfaceVariant}
          />
          <Text
            variant="bodySmall"
            style={{ flex: 1, color: colors.onSurfaceVariant }}
          >
            {t("unansweredAverageUsed")}
          </Text>
        </View>
      )}
      {question.options.map((option) => {
        return (
          <View
            key={option.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ flex: 1 }}>{option.label}</Text>
            <RadioButton.Android value={option.value} color={color} />
          </View>
        );
      })}
    </RadioButton.Group>
  );
};
