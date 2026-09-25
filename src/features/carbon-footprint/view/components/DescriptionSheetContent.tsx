import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { MarkdownText } from "@carbonFootprint/view/components/MarkdownText";

type Props = PropsWithChildren<{
  title: string;
  description: string;
}>;

/**
 * Bottom sheet body for a model description, headed by the title of what it
 * describes so the user keeps the context. `children` go under the title.
 */
export const DescriptionSheetContent = ({
  title,
  description,
  children,
}: Props) => (
  <View style={{ gap: 6 }}>
    <Text variant="titleMedium">{title}</Text>
    {children}
    <MarkdownText value={description} />
  </View>
);
