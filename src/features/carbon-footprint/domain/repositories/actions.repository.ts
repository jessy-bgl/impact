import { Action } from "@carbonFootprint/domain/entities/action/Action";

export interface ActionsRepository {
  fetchActions(): Action[];
  updateActions(actions: Action[]): void;
}
