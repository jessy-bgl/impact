import { QuestionStub } from "@carbonFootprint/domain/entities/question/Question.stub";

describe("Question", () => {
  describe("hasSameState", () => {
    const question = () =>
      new QuestionStub("transport . voiture . km", {
        defaultValue: "12000",
        isEngineDefaultValueUsed: false,
      });

    it("is true for two questions in the same state", () => {
      expect(question().hasSameState(question())).toBe(true);
    });

    it.each([
      ["label", { label: "transport . voiture . voyageurs" }],
      ["applicability", { isApplicable: false }],
      ["default value", { defaultValue: "13000" }],
      ["engine default flag", { isEngineDefaultValueUsed: true }],
    ] as const)("is false when the %s differs", (_, change) => {
      const other = Object.assign(question(), change);

      expect(question().hasSameState(other)).toBe(false);
    });

    it("ignores what the rule defines", () => {
      const other = Object.assign(question(), {
        title: "other title",
        description: "other description",
        unit: "km",
      });

      expect(question().hasSameState(other)).toBe(true);
    });

    describe("with sub-questions", () => {
      const subQuestion = (defaultValue: string) =>
        new QuestionStub("transport . voiture . voyageurs", { defaultValue });
      const mosaic = (...defaultValues: string[]) =>
        new QuestionStub("transport . voiture . km", {
          type: "multi-number",
          subQuestions: defaultValues.map(subQuestion),
        });

      it("is true when every sub-question is in the same state", () => {
        expect(mosaic("1", "2").hasSameState(mosaic("1", "2"))).toBe(true);
      });

      it("is false when a sub-question changed state", () => {
        expect(mosaic("1", "2").hasSameState(mosaic("1", "3"))).toBe(false);
      });

      it("is false when the number of sub-questions differs", () => {
        expect(mosaic("1", "2").hasSameState(mosaic("1"))).toBe(false);
      });
    });
  });
});
