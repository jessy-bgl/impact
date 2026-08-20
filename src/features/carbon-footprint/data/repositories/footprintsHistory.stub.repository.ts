import { FootprintsHistory } from "@carbonFootprint/domain/entities/history/FootprintSnapshot";
import { FootprintsHistoryRepository } from "@carbonFootprint/domain/repositories/footprintsHistory.repository";

export class FootprintsHistoryStubRepository implements FootprintsHistoryRepository {
  history: FootprintsHistory = [];

  fetchHistory(): FootprintsHistory {
    return this.history;
  }

  saveHistory(history: FootprintsHistory): void {
    this.history = history;
  }
}
