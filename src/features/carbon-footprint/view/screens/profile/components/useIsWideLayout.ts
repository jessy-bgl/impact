import { useWindowDimensions } from "react-native";

// Below this width a question is stacked (label above the control), above it the
// label and the control share a row.
const WIDE_LAYOUT_BREAKPOINT = 450;

export const useIsWideLayout = (): boolean => {
  const { width } = useWindowDimensions();
  return width > WIDE_LAYOUT_BREAKPOINT;
};
