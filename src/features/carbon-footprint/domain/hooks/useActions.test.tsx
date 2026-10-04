import { act, renderHook, waitFor } from "@testing-library/react-native";
import { PropsWithChildren, useContext } from "react";

import { ActionsStubRepository } from "@carbonFootprint/data/repositories/actions.stub.repository";
import { ActionStub } from "@carbonFootprint/domain/entities/action/Action.stub";
import { ComputeEngineStub } from "@carbonFootprint/domain/entities/engine/ComputeEngine.stub";
import {
  useActions,
  useActionsInState,
} from "@carbonFootprint/domain/hooks/useActions";
import { createSyncEngineWithStoredActions } from "@carbonFootprint/domain/usecases/actions/syncEngineWithStoredActions";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { defaultAppStore } from "@common/store/store";
import { zustandAppStore } from "@common/store/store.zustand";

const mockNavigation = { isFocused: true };

jest.mock("@react-navigation/native", () => ({
  useIsFocused: () => mockNavigation.isFocused,
}));

describe("useActions", () => {
  let engine: ComputeEngineStub;
  let actionsRepository: ActionsStubRepository;

  const Usecases = ({ children }: PropsWithChildren) => {
    const usecases = useContext(UsecasesContext);
    return (
      <UsecasesContext.Provider
        value={{
          ...usecases,
          ...createSyncEngineWithStoredActions(engine, actionsRepository),
        }}
      >
        {children}
      </UsecasesContext.Provider>
    );
  };

  const renderActions = () => renderHook(useActions, { wrapper: Usecases });

  // What a profile synchronization ends with: a new engine situation, then
  // the footprints stored.
  const syncProfile = async (km: number, actionIds: string[]) => {
    engine.setProfile({ "transport . voiture . km": km });
    engine.actions = actionIds.map((id) => new ActionStub(id));
    await act(async () => {
      zustandAppStore.setState((state) => ({
        footprints: { ...state.footprints },
      }));
    });
  };

  const storedActionIds = () =>
    actionsRepository.actions.map((action) => action.id);

  const waitForStoredActions = (ids: string[]) =>
    waitFor(() => expect(storedActionIds()).toEqual(ids));

  const letTimersRun = () =>
    act(() => new Promise((resolve) => setTimeout(resolve, 10)));

  beforeEach(() => {
    mockNavigation.isFocused = true;
    engine = new ComputeEngineStub();
    engine.setProfile({});
    engine.actions = [new ActionStub("initial")];
    actionsRepository = new ActionsStubRepository();
  });

  afterEach(async () => {
    await act(async () => {
      zustandAppStore.setState(defaultAppStore());
    });
  });

  it("synchronizes the actions after the first render", async () => {
    const { result } = await renderActions();

    expect(result.current.isLoading).toBe(true);
    expect(storedActionIds()).toEqual([]);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(storedActionIds()).toEqual(["initial"]);
  });

  it("synchronizes again when the footprints change", async () => {
    await renderActions();
    await waitForStoredActions(["initial"]);

    await syncProfile(15000, ["updated"]);

    await waitForStoredActions(["updated"]);
  });

  it("waits for the screen to be focused", async () => {
    mockNavigation.isFocused = false;
    const { rerender } = await renderActions();

    await syncProfile(15000, ["updated"]);
    await letTimersRun();
    expect(storedActionIds()).toEqual([]);

    mockNavigation.isFocused = true;
    await rerender(undefined);

    await waitForStoredActions(["updated"]);
  });

  describe("hasFirstAvailableActionSavings", () => {
    const actionSaving = (id: string, savedFootprint: number) => {
      const action = new ActionStub(id);
      action.savedFootprint = savedFootprint;
      return action;
    };

    const storeActions = (actions: ActionStub[]) =>
      act(async () => {
        zustandAppStore.setState({ actions });
      });

    it("is true when the first available action has known savings", async () => {
      await storeActions([actionSaving("first", 120), actionSaving("next", 0)]);

      const { result } = await renderActions();

      expect(result.current.hasFirstAvailableActionSavings).toBe(true);
    });

    it("is false when the first available action has none", async () => {
      const started = actionSaving("started", 120);
      started.state = "inProgress";
      await storeActions([started, actionSaving("first", 0)]);

      const { result } = await renderActions();

      expect(result.current.hasFirstAvailableActionSavings).toBe(false);
    });
  });
});

describe("useActionsInState", () => {
  afterEach(async () => {
    await act(async () => {
      zustandAppStore.setState(defaultAppStore());
    });
  });

  it("keeps the stored actions in that state only", async () => {
    const started = new ActionStub("started");
    started.state = "inProgress";
    await act(async () => {
      zustandAppStore.setState({ actions: [new ActionStub("new"), started] });
    });

    const { result } = await renderHook(() => useActionsInState("inProgress"));

    expect(result.current.map((action) => action.id)).toEqual(["started"]);
  });
});
