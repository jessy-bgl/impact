import { View, ViewStyle } from "react-native";
import {
  SegmentedButtons,
  SegmentedButtonsProps,
  useTheme,
} from "react-native-paper";

import {
  Option,
  Question,
} from "@carbonFootprint/domain/entities/question/Question";

type Props = Omit<SegmentedButtonsProps, "buttons"> & {
  question: Question;
  options: Option[];
  direction?: "row" | "column";
};

export const SelectSegmented = ({
  question,
  options,
  direction = "row",
  ...props
}: Props) => {
  const { colors } = useTheme();

  const selectedColor = question.isEngineDefaultValueUsed
    ? colors.inverseOnSurface
    : colors.onSurfaceDisabled;

  if (!options.length) return;

  if (direction === "column")
    return (
      <View style={{ maxWidth: 300 }}>
        {options.map(({ label, value }) => {
          const isSelected = props.value === value;
          return (
            <SegmentedButtons
              {...(props as SegmentedButtonsProps)}
              key={label}
              density="small"
              buttons={[
                {
                  value,
                  label,
                  style: {
                    backgroundColor: isSelected ? selectedColor : undefined,
                  },
                },
              ]}
            />
          );
        })}
      </View>
    );

  return (
    <SegmentedButtons
      {...(props as SegmentedButtonsProps)}
      density="small"
      buttons={options.map(({ label, value }) => {
        const isSelected = props.value === value;
        return {
          key: label,
          value,
          label,
          style: {
            backgroundColor: isSelected ? selectedColor : undefined,
          },
        };
      })}
      style={{
        ...(props.style as ViewStyle),
        minWidth: 200,
        maxWidth: 300,
        alignSelf: "center",
      }}
    />
  );
};
