import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fragment, ReactNode, useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import {
  MarkedStyles,
  Renderer,
  RendererInterface,
  useMarkdown,
} from "react-native-marked";
import { Icon, MD3Theme, useTheme } from "react-native-paper";

import { openUrl } from "@common/utils/openUrl";

type Props = {
  value: string;
};

export const MarkdownText = ({ value }: Props) => {
  const theme = useTheme();

  const options = useMemo(
    () => ({
      renderer: new ThemedRenderer(theme.colors),
      styles: getStyles(theme),
      theme: {
        colors: {
          text: theme.colors.onSurfaceVariant,
          link: theme.colors.primary,
          border: theme.colors.outlineVariant,
          code: theme.colors.surface,
        },
      },
    }),
    [theme],
  );

  const elements = useMarkdown(value, options);

  return (
    <View>
      {elements.map((element, index) => (
        <Fragment key={index}>{element}</Fragment>
      ))}
    </View>
  );
};

/**
 * Draws links as tappable text opening the in-app browser, and blockquotes as
 * tip callouts: the model uses `>` for advice, not for actual quotes.
 */
class ThemedRenderer extends Renderer implements RendererInterface {
  constructor(private colors: MD3Theme["colors"]) {
    super({ selectable: false });
  }

  link(children: string | ReactNode[], href: string, styles?: TextStyle) {
    return (
      <Text
        key={this.getKey()}
        accessibilityRole="link"
        onPress={() => openUrl(href)}
        style={styles}
      >
        {children}{" "}
        <MaterialCommunityIcons
          name="open-in-new"
          size={styles?.fontSize}
          color={this.colors.primary}
        />
      </Text>
    );
  }

  blockquote(children: ReactNode[], styles?: ViewStyle) {
    return (
      <View key={this.getKey()} style={styles}>
        <View style={{ paddingTop: 8 }}>
          <Icon
            source="lightbulb-on-outline"
            size={18}
            color={this.colors.primary}
          />
        </View>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    );
  }
}

const getStyles = ({ colors, fonts, roundness }: MD3Theme): MarkedStyles => {
  const body: TextStyle = {
    ...fonts.bodyMedium,
    color: colors.onSurfaceVariant,
  };
  const heading: TextStyle = {
    ...fonts.titleMedium,
    color: colors.onSurface,
    marginTop: 8,
    marginBottom: 4,
  };

  return {
    text: body,
    li: body,
    strong: { ...body, fontWeight: "bold" },
    em: { ...body, fontStyle: "italic" },
    link: {
      ...body,
      color: colors.primary,
      fontStyle: "normal",
      textDecorationLine: "underline",
    },
    paragraph: { paddingVertical: 6 },
    blockquote: {
      flexDirection: "row",
      gap: 10,
      marginVertical: 6,
      paddingHorizontal: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderRadius: roundness,
      backgroundColor: colors.surface,
    },
    h1: heading,
    h2: heading,
    h3: heading,
    h4: heading,
    h5: heading,
    h6: heading,
  };
};
