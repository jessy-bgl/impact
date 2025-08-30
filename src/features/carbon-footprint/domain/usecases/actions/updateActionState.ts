import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";

export const createUpdateActionState = (
  actionsRepository: ActionsRepository,
) => {
  const updateActionState = (actionId: string, state: ActionState) => {
    const storedActions: Action[] = actionsRepository.fetchActions();
    const actionToUpdate = storedActions.find((a) => a.id === actionId);
    if (!actionToUpdate) return;
    actionToUpdate.state = state;
    actionsRepository.updateActions([...storedActions]);
  };

  return { updateActionState };
};
