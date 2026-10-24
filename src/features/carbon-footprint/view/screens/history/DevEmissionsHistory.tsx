import { useState } from "react";

import { useStoredFootprintsHistory } from "@carbonFootprint/domain/hooks/useFootprintsHistory";
import { DevHistoryPreviewPicker } from "@carbonFootprint/view/screens/history/DevHistoryPreviewPicker";
import {
  DevHistoryPreview,
  devHistoryOverrides,
} from "@carbonFootprint/view/screens/history/devFakeHistory";
import { EmissionsHistoryContent } from "@carbonFootprint/view/screens/history/EmissionsHistory";
import { isDemoMode } from "@common/constants";

/**
 * Development scaffolding: the history screen with a picker to walk it through
 * each of its states before real snapshots exist. Only reachable behind
 * `__DEV__`, so neither the picker nor the fake datasets reach a release bundle.
 */
export const DevEmissionsHistory = () => {
  const storedSource = useStoredFootprintsHistory();
  const [preview, setPreview] = useState<DevHistoryPreview>(
    isDemoMode ? "fullHistory" : "real",
  );

  return (
    <EmissionsHistoryContent
      source={devHistoryOverrides[preview] ?? storedSource}
      // Stays visible on the empty states: that is exactly where it is needed.
      header={
        !isDemoMode && (
          <DevHistoryPreviewPicker value={preview} onValueChange={setPreview} />
        )
      }
    />
  );
};
