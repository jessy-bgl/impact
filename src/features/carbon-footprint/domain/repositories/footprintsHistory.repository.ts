import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";

/**
 * Deliberately a plain read/write of the whole list: the merge rules (daily
 * upsert, duplicate removal) are pure functions on `FootprintSnapshot` so they
 * stay unit-testable without a store.
 */
export interface FootprintsHistoryRepository {
  fetchHistory(): FootprintsHistory;
  saveHistory(history: FootprintsHistory): void;
}
