import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { readableTextOn } from "@common/utils/readableTextOn";

type Props = {
  color: string;
  size?: number;
} & (
  | { icon: IconSource }
  /** The category's share, where the badge marks a value. */
  | { label: string; fontSize?: number }
);

/** The round category marker: its color, with its icon or its share on it. */
export const CategoryBadge = ({ color, size = 32, ...content }: Props) => {
  const ink = readableTextOn(color);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {"icon" in content ? (
        <Icon
          source={content.icon}
          size={Math.round(size * 0.55)}
          color={ink}
        />
      ) : (
        <Text style={{ fontSize: content.fontSize ?? 14, color: ink }}>
          {content.label}
        </Text>
      )}
    </View>
  );
};
