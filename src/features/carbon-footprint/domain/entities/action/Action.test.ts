import { hasKnownSavings } from "@carbonFootprint/domain/entities/action/Action";
import { ActionStub } from "@carbonFootprint/domain/entities/action/Action.stub";

describe("hasKnownSavings", () => {
  it("is false when the engine gave no saving", () => {
    expect(hasKnownSavings(new ActionStub("unknown"))).toBe(false);
  });

  it("is true when the engine gave a saving", () => {
    const action = new ActionStub("known");
    action.savedFootprint = 120;

    expect(hasKnownSavings(action)).toBe(true);
  });
});
