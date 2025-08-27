import { appStoreActions } from "@carbonFootprint/data/store/storeActions";
import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";

export class ActionsStoreRepository implements ActionsRepository {
  fetchActions(): Action[] {
    return appStoreActions.getActions();
  }

  updateActions(actions: Action[]): void {
    return appStoreActions.setActions(actions);
  }
}
