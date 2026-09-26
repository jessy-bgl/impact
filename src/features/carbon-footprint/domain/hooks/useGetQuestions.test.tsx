import { act, renderHook } from "@testing-library/react-native";
import { PropsWithChildren, useContext } from "react";

import { ComputeEngineStub } from "@carbonFootprint/domain/entities/engine/ComputeEngine.stub";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { QuestionStub } from "@carbonFootprint/domain/entities/question/Question.stub";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { createFetchQuestions } from "@carbonFootprint/domain/usecases/profile/fetchQuestions";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { defaultAppStore } from "@common/store/store";
import { zustandAppStore } from "@common/store/store.zustand";

const questionKeys = {
  km: "transport . voiture . km",
  passengers: "transport . voiture . voyageurs",
} as const;

describe("useGetQuestions", () => {
  let engine: ComputeEngineStub;

  const km = (defaultValue: string) =>
    new QuestionStub(questionKeys.km, { defaultValue });
  const passengers = (defaultValue: string) =>
    new QuestionStub(questionKeys.passengers, { defaultValue });

  const setEngineQuestions = (questions: QuestionStub[]) => {
    engine.questions = Object.fromEntries(
      questions.map((question) => [question.label, question]),
    );
  };

  const Usecases = ({ children }: PropsWithChildren) => {
    const usecases = useContext(UsecasesContext);
    return (
      <UsecasesContext.Provider
        value={{ ...usecases, ...createFetchQuestions(engine) }}
      >
        {children}
      </UsecasesContext.Provider>
    );
  };

  const renderQuestions = () =>
    renderHook(() => useGetQuestions<typeof questionKeys>(questionKeys), {
      wrapper: Usecases,
    });

  const answer = async (profile: Profile) => {
    await act(async () => {
      zustandAppStore.setState((state) => ({
        profile: { ...state.profile, ademe: profile },
      }));
    });
  };

  const storeFootprints = async () => {
    await act(async () => {
      zustandAppStore.setState((state) => ({
        footprints: { ...state.footprints },
      }));
    });
  };

  beforeEach(() => {
    engine = new ComputeEngineStub();
    setEngineQuestions([km("12000"), passengers("1")]);
  });

  afterEach(async () => {
    await act(async () => {
      zustandAppStore.setState(defaultAppStore());
    });
  });

  it("returns the questions of the section by key", async () => {
    const { result } = await renderQuestions();

    expect(result.current.km.label).toBe(questionKeys.km);
    expect(result.current.passengers.label).toBe(questionKeys.passengers);
  });

  it("returns the same questions while nothing changed", async () => {
    const { result, rerender } = await renderQuestions();
    const before = result.current;

    await rerender(undefined);
    await act(async () => {
      zustandAppStore.setState({ actions: [] });
    });

    expect(result.current).toBe(before);
  });

  describe("when the profile changes", () => {
    it("keeps the instance of a question whose state did not change", async () => {
      const { result } = await renderQuestions();
      const before = result.current.km;

      setEngineQuestions([km("12000"), passengers("2")]);
      await answer({ [questionKeys.passengers]: 2 });

      expect(result.current.km).toBe(before);
    });

    it("replaces a question whose state changed", async () => {
      const { result } = await renderQuestions();
      const rebuilt = passengers("2");

      setEngineQuestions([km("12000"), rebuilt]);
      await answer({ [questionKeys.passengers]: 2 });

      expect(result.current.passengers).toBe(rebuilt);
    });
  });

  describe("when the footprints change", () => {
    it("rebuilds the questions from the engine", async () => {
      const { result } = await renderQuestions();
      const rebuilt = km("15000");

      setEngineQuestions([rebuilt, passengers("1")]);
      await storeFootprints();

      expect(result.current.km).toBe(rebuilt);
    });
  });
});
