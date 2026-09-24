import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { FootprintsHistoryRepository } from "@carbonFootprint/domain/repositories/footprintsHistory.repository";
import { useAppStore } from "@common/store/useStore";

export class FootprintsHistoryStoreRepository implements FootprintsHistoryRepository {
  constructor(private store: typeof useAppStore) {}

  fetchHistory(): FootprintsHistory {
    return this.store.getState().footprintsHistory;
  }

  saveHistory(footprintsHistory: FootprintsHistory): void {
    this.store.setState((state) => ({ ...state, footprintsHistory }));
  }
}
