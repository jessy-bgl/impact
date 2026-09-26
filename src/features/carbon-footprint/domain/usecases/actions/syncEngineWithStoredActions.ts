import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";

export const createSyncEngineWithStoredActions = (
  computeEngine: ComputeEngine,
  actionsRepository: ActionsRepository,
) => {
  // The profile the engine held when the actions were last computed. Actions
  // only depend on the engine situation, and evaluating them all takes a few
  // hundred milliseconds: nothing to do while it did not change. Before the
  // startup synchronization gives the engine its profile, the stored actions
  // stay as they are: computing on an empty situation would be wrong anyway.
  let syncedProfile: Profile | undefined;

  const syncEngineWithStoredActions = () => {
    const profile = computeEngine.getProfile();
    if (profile === syncedProfile) return;

    const actions = computeEngine.getActions();
    const storedActions = actionsRepository.fetchActions();
    _restoreActionStates(actions, storedActions);
    actionsRepository.updateActions([...actions]);
    syncedProfile = profile;
  };

  const _restoreActionStates = (actions: Action[], storedActions: Action[]) => {
    actions.forEach((action) => {
      const storedAction = storedActions.find(
        (storedAction) => action.id === storedAction.id,
      );
      if (storedAction) action.restoreState(storedAction);
    });
  };

  return { syncEngineWithStoredActions };
};
