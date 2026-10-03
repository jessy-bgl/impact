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
 * What the history screen is drawn from. The profile completion is part of it
 * because it is what tells the empty states apart.
 */
export type FootprintsHistorySource = {
  history: FootprintsHistory;
  profileCompleted: boolean;
};

export const useStoredFootprintsHistory = (): FootprintsHistorySource => {
  const history = useAppStore((store) => store.footprintsHistory);
  const profileCompletion = useAppStore((store) => store.profile.completion);

  return { history, profileCompleted: isProfileCompleted(profileCompletion) };
};

export const useFootprintsHistory = ({
  history,
  profileCompleted,
}: FootprintsHistorySource) => {
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
  // means different things on either side of that. Past it, an empty history
  // is the gap before the first snapshot lands: a profile completed before
  // tracking existed only gets one from the deferred startup sync.
  const emptyStateVariant: HistoryEmptyStateVariant = !profileCompleted
    ? { name: "incompleteProfile" }
    : viewModel.points.length === 0
      ? { name: "firstSnapshotPending" }
      : { name: "singleSnapshot", value: viewModel.currentValue };

  return {
    ...viewModel,
    emptyStateVariant,
    filter,
    selectFilter,
    togglePoint,
    clearSelection,
  };
};
