import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";

export class ActionsInMemoryRepository implements ActionsRepository {
  actions: Action[] = [];

  fetchActions(): Action[] {
    return this.actions;
  }

  updateActions(actions: Action[]): void {
    this.actions = actions;
  }
}
