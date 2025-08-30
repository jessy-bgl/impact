import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";
import { useAppStore } from "@common/store/useStore";

export class ActionsStoreRepository implements ActionsRepository {
  constructor(private store: typeof useAppStore) {}

  fetchActions(): Action[] {
    return this.store.getState().actions;
  }

  updateActions(actions: Action[]): void {
    this.store.setState((state) => ({ ...state, actions }));
  }
}
