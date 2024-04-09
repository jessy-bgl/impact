import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const useActionStyles = () => {
  const { colors } = useTheme();

  const commonStyles = StyleSheet.create({
    card: { borderRadius: 5, borderColor: "transparent", width: 200 },
    content: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 4,
      gap: 10,
      borderColor: colors.primary,
    },
  });

  return {
    inProgress: StyleSheet.create({
      card: {
        ...commonStyles.card,
        borderColor: colors.primary,
        borderWidth: 1,
      },
      content: {
        ...commonStyles.content,
      },
    }),
    completed: StyleSheet.create({
      card: {
        ...commonStyles.card,
        borderWidth: 1,
      },
      content: {
        ...commonStyles.content,
      },
    }),
    skipped: StyleSheet.create({
      card: {
        ...commonStyles.card,
        opacity: 0.7,
      },
      content: {
        ...commonStyles.content,
      },
    }),
    notStarted: StyleSheet.create({
      card: {
        ...commonStyles.card,
      },
      content: {
        ...commonStyles.content,
      },
    }),
  };
};
