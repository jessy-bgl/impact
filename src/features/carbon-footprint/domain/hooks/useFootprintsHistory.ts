import { useCallback, useMemo, useState } from "react";

import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import {
  buildFootprintsHistoryViewModel,
  HistoryEmptyStateVariant,
  HistoryFilter,
} from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { isProfileCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useAppStore } from "@common/store/useStore";

/**
 * @param override drives the screen from this history and profile completion
 * instead of the stored ones, so that every state — both empty ones included —
 * can be reached. Only the `__DEV__` preview picker passes it; nothing is
 * written back to the store.
 */
export const useFootprintsHistory = (override?: {
  history: FootprintsHistory;
  profileCompleted: boolean;
}) => {
  const storedHistory = useAppStore((store) => store.footprintsHistory);
  const profileCompletion = useAppStore((store) => store.profile.completion);

  const history = override?.history ?? storedHistory;
  const profileCompleted =
    override?.profileCompleted ?? isProfileCompleted(profileCompletion);

  // The selection outlives a filter change: the same date is still plotted,
  // only the series under it changes.
  const [filter, selectFilter] = useState<HistoryFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // The view model is the authority on whether a selection survives: it drops
  // the ones that make no sense (on the latest point, on a date that is gone)
  // so the screen never renders a stale detail card.
  const viewModel = useMemo(
    () => buildFootprintsHistoryViewModel(history, filter, selectedDate),
    [history, filter, selectedDate],
  );

  const togglePoint = useCallback(
    (date: string) =>
      setSelectedDate((current) => (current === date ? null : date)),
    [],
  );

  const clearSelection = useCallback(() => setSelectedDate(null), []);

  // Tracking only starts once the profile is complete, so an empty history
  // means different things on either side of that.
  const emptyStateVariant: HistoryEmptyStateVariant =
    profileCompleted && viewModel.points.length === 1
      ? { name: "singleSnapshot", value: viewModel.currentValue }
      : { name: "incompleteProfile" };

  return {
    ...viewModel,
    emptyStateVariant,
    filter,
    selectFilter,
    togglePoint,
    clearSelection,
  };
};
