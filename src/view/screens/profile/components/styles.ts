import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContentContainer: {
    padding: 15,
    // paddingLeft: 15, // needed to force the left padding
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  columnContainer: {
    flexDirection: "column",
    gap: 10,
  },
});
