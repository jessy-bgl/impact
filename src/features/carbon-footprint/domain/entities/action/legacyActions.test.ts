import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";

import { legacyActionIds } from "@carbonFootprint/domain/entities/action/legacyActions";

const model = AdemeModel as unknown as Record<
  string,
  { meta?: { id?: string } } | null
>;

describe("legacyActionIds", () => {
  it("maps to actions of the model", () => {
    for (const dottedName of Object.keys(legacyActionIds))
      expect(model[dottedName]?.meta?.id).toBeDefined();
  });

  it("maps from actions the model no longer declares", () => {
    for (const legacyId of Object.values(legacyActionIds))
      expect(model[legacyId!]).toBeUndefined();
  });

  it("maps each legacy action once", () => {
    const legacyIds = Object.values(legacyActionIds);

    expect(new Set(legacyIds).size).toBe(legacyIds.length);
  });
});
