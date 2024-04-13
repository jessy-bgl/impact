import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const useActionStyles = () => {
  const { colors } = useTheme();

  const commonStyles = StyleSheet.create({
    card: {
      borderRadius: 5,
      borderColor: "transparent",
      width: 225,
      height: 200,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.primary,
      gap: 10,
      width: 150,
      padding: 10,
    },
  });

  return {
    inProgress: StyleSheet.create({
      card: {
        ...commonStyles.card,
      },
      content: {
        ...commonStyles.content,
      },
    }),
    completed: StyleSheet.create({
      card: {
        ...commonStyles.card,
        height: 150,
      },
      content: {
        ...commonStyles.content,
        marginBottom: 15,
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
