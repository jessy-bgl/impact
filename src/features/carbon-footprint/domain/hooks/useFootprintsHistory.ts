import { useCallback, useMemo, useState } from "react";

import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import {
  buildFootprintsHistoryViewModel,
  HistoryFilter,
} from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { isProfileCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useAppStore } from "@common/store/useStore";

/**
 * @param historyOverride plots this history instead of the stored one. Only the
 * `__DEV__` preview switch passes it; nothing is written back to the store.
 */
export const useFootprintsHistory = (historyOverride?: FootprintsHistory) => {
  const storedHistory = useAppStore((store) => store.footprintsHistory);
  const profileCompletion = useAppStore((store) => store.profile.completion);

  const history = historyOverride ?? storedHistory;

  const [filter, setFilter] = useState<HistoryFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // The view model is the authority on whether a selection survives: it drops
  // the ones that make no sense (outside "all", on the latest point, on a date
  // that is gone) so the screen never renders a stale detail card.
  const viewModel = useMemo(
    () => buildFootprintsHistoryViewModel(history, filter, selectedDate),
    [history, filter, selectedDate],
  );

  const selectFilter = useCallback((next: HistoryFilter) => {
    setFilter(next);
    if (next !== "all") setSelectedDate(null);
  }, []);

  const togglePoint = useCallback(
    (date: string) =>
      setSelectedDate((current) => (current === date ? null : date)),
    [],
  );

  const clearSelection = useCallback(() => setSelectedDate(null), []);

  return {
    viewModel,
    filter,
    selectFilter,
    togglePoint,
    clearSelection,
    isProfileComplete: isProfileCompleted(profileCompletion),
  };
};
