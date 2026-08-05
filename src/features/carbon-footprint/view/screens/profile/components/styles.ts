import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContentContainer: {
    paddingInline: 15,
    paddingBottom: 15,
    paddingTop: 5,
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
