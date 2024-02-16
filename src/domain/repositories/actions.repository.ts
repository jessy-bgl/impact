import { Action } from "@domain/entities/actions/Action";

export interface ActionsRepository {
  fetchActions(): Action[];
  updateActions(actions: Action[]): void;
}
