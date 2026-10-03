import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";

import { posthog } from "@common/config/posthog";
import { UsecasesContext } from "@common/context/UsecasesContext";

/**
 * Syncs the whole profile with the engine when a category screen loses focus.
 *
 * An answer only recomputes its own category, while some categories are linked
 * together: updating the housing profile may affect the transport footprint.
 * Losing focus covers going back to the profile as well as switching tabs
 * straight from the category screen. The sync is also what records the day's
 * snapshot, from a consistent set of footprints.
 */
export const useProfileSync = () => {
  const { syncFootprintsProfileWithEngine } = useContext(UsecasesContext);

  useFocusEffect(
    useCallback(
      () => () => {
        syncFootprintsProfileWithEngine().catch((error) => {
          console.error("Syncing profile error:", error);
          // Never forward the raw error: it can embed the user's footprint
          // answers. See docs/gdpr-compliance.md §3.
          posthog.captureException(new Error("profile_sync_failed"));
        });
      },
      [syncFootprintsProfileWithEngine],
    ),
  );
};
