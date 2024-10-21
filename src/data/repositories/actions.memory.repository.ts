import { Action } from "@domain/entities/action/Action";
import { ActionsRepository } from "@domain/repositories/actions.repository";

export class ActionsInMemoryRepository implements ActionsRepository {
  actions: Action[] = [];

  fetchActions(): Action[] {
    return this.actions;
  }

  updateActions(actions: Action[]): void {
    this.actions = actions;
  }
}
