import personasData from "@incubateur-ademe/nosgestesclimat/public/personas-fr.json";

import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

const engine = new AdemeComputeEngine();

describe("AdemeComputeEngine", () => {
  // Each setProfile call replaces the full situation, so tests are isolated by default.
  // The beforeEach ensures a clean state even if a test throws mid-way.
  beforeEach(() => {
    engine.setProfile({});
  });

  describe("default profile (French average)", () => {
    it("total footprint is within the French average range (~7-12 tCO2e)", () => {
      const { transport, food, housing, everydayThings, societalServices } =
        engine.computeFootprints();
      const total =
        transport.annualFootprint +
        food.annualFootprint +
        housing.annualFootprint +
        everydayThings.annualFootprint +
        societalServices.annualFootprint;
      expect(total).toBeGreaterThan(7000);
      expect(total).toBeLessThan(12000);
    });

    it("each category has a positive footprint", () => {
      const { transport, food, housing, everydayThings, societalServices } =
        engine.computeFootprints();
      expect(transport.annualFootprint).toBeGreaterThan(0);
      expect(food.annualFootprint).toBeGreaterThan(0);
      expect(housing.annualFootprint).toBeGreaterThan(0);
      expect(everydayThings.annualFootprint).toBeGreaterThan(0);
      expect(societalServices.annualFootprint).toBeGreaterThan(0);
    });
  });

  describe("directional coherence by category", () => {
    describe("transport", () => {
      it("driving more km increases the footprint", () => {
        engine.setProfile({
          "transport . voiture . utilisateur": "'propriétaire'",
          "transport . voiture . km": 0,
        } as Profile);
        const low = engine.computeTransportFootprint().annualFootprint;

        engine.setProfile({
          "transport . voiture . utilisateur": "'propriétaire'",
          "transport . voiture . km": 30000,
        } as Profile);
        const high = engine.computeTransportFootprint().annualFootprint;

        expect(high).toBeGreaterThan(low);
      });

      it("flying more frequently increases the footprint", () => {
        engine.setProfile({
          "transport . avion . usager": "'jamais'",
        } as Profile);
        const rarely = engine.computeTransportFootprint().annualFootprint;

        engine.setProfile({
          "transport . avion . usager": "'fréquemment'",
        } as Profile);
        const frequently = engine.computeTransportFootprint().annualFootprint;

        expect(frequently).toBeGreaterThan(rarely);
      });
    });

    describe("food", () => {
      it("eating more red meat increases the footprint", () => {
        engine.setProfile({
          "alimentation . plats . viande rouge . nombre": 0,
        } as Profile);
        const withoutMeat = engine.computeFoodFootprint().annualFootprint;

        engine.setProfile({
          "alimentation . plats . viande rouge . nombre": 7,
        } as Profile);
        const withMeat = engine.computeFoodFootprint().annualFootprint;

        expect(withMeat).toBeGreaterThan(withoutMeat);
      });
    });

    describe("housing", () => {
      it("a larger home surface increases the footprint", () => {
        engine.setProfile({ "logement . surface": 20 } as Profile);
        const small = engine.computeHousingFootprint().annualFootprint;

        engine.setProfile({ "logement . surface": 150 } as Profile);
        const large = engine.computeHousingFootprint().annualFootprint;

        expect(large).toBeGreaterThan(small);
      });
    });

    describe("everydayThings", () => {
      it("more hours per day on the internet increases the footprint", () => {
        engine.setProfile({
          "divers . numérique . internet . durée journalière": 0,
        } as Profile);
        const low = engine.computeEverydayThingsFootprint().annualFootprint;

        engine.setProfile({
          "divers . numérique . internet . durée journalière": 10,
        } as Profile);
        const high = engine.computeEverydayThingsFootprint().annualFootprint;

        expect(high).toBeGreaterThan(low);
      });
    });

    // societalServices footprint is engine-determined and does not respond to
    // profile inputs. Its positive contribution is verified in the default
    // profile tests above.
  });

  describe("persona regression snapshots", () => {
    // Snapshots are stored in __snapshots__/AdemeComputeEngine.test.ts.snap.
    // Run `npm test -- --updateSnapshot` after a model update to refresh them.
    Object.entries(personasData).forEach(([, persona]) => {
      it(persona.nom, () => {
        engine.setProfile(persona.situation as Profile);
        expect({
          transport: engine.computeTransportFootprint().annualFootprint,
          food: engine.computeFoodFootprint().annualFootprint,
          housing: engine.computeHousingFootprint().annualFootprint,
          everydayThings:
            engine.computeEverydayThingsFootprint().annualFootprint,
          societalServices:
            engine.computeSocietalServicesFootprint().annualFootprint,
        }).toMatchSnapshot();
      });
    });
  });
});
