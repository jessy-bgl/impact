import { View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

import { DevHistoryPreview } from "@carbonFootprint/view/screens/history/devFakeHistory";

type Props = {
  value: DevHistoryPreview;
  onValueChange: (value: DevHistoryPreview) => void;
};

// Hardcoded on purpose — these labels must never reach a released build, so
// they have no business in the translation files.
const buttons: { value: DevHistoryPreview; label: string }[] = [
  { value: "real", label: "Réel" },
  { value: "incompleteProfile", label: "Vide" },
  { value: "singleSnapshot", label: "1 relevé" },
  { value: "fullHistory", label: "Historique" },
];

/**
 * Development scaffolding: render only behind `__DEV__`. Walks the screen
 * through each of its three states without touching the store, so the two empty
 * states can be reviewed as easily as the chart itself.
 */
export const DevHistoryPreviewPicker = ({ value, onValueChange }: Props) => (
  <View style={{ paddingHorizontal: 16 }}>
    <SegmentedButtons
      value={value}
      onValueChange={(next) => onValueChange(next as DevHistoryPreview)}
      density="small"
      buttons={buttons}
    />
  </View>
);
