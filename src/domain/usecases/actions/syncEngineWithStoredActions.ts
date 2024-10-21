import { Action } from "@domain/entities/action/Action";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { ActionsRepository } from "@domain/repositories/actions.repository";

export const createSyncEngineWithStoredActions = (
  actionsRepository: ActionsRepository,
) => {
  const syncEngineWithStoredActions = () => {
    const actions = AdemeFootprintEngine.getActions();
    const storedActions = actionsRepository.fetchActions();
    _restoreActionStates(actions, storedActions);
    actionsRepository.updateActions([...actions]);
  };

  const _restoreActionStates = (actions: Action[], storedActions: Action[]) => {
    actions.forEach((action) => {
      const storedAction = storedActions.find(
        (storedAction) => action.id === storedAction.id,
      );
      if (storedAction) action.restoreState(storedAction);
    });
  };

  return syncEngineWithStoredActions;
};
