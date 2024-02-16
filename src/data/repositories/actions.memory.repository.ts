import { Action } from "@domain/entities/actions/Action";
import { ActionsRepository } from "@domain/repositories/actions.repository";

export class ActionsInMemoryRepository implements ActionsRepository {
  private actions: Action[] = [];

  fetchActions(): Action[] {
    return this.actions;
  }

  updateActions(actions: Action[]): void {
    this.actions = actions;
  }

  injectFakeActions(actions: Action[]): void {
    this.actions = actions;
  }
}
