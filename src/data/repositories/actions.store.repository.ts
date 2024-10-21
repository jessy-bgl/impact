import { appStoreActions } from "@data/store/storeActions";
import { Action } from "@domain/entities/action/Action";
import { ActionsRepository } from "@domain/repositories/actions.repository";

export class ActionsStoreRepository implements ActionsRepository {
  fetchActions(): Action[] {
    return appStoreActions.getActions();
  }

  updateActions(actions: Action[]): void {
    return appStoreActions.setActions(actions);
  }
}
