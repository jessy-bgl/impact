import personasData from "@incubateur-ademe/nosgestesclimat/public/personas-fr.json";

import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

const engine = new AdemeComputeEngine();

// Each setProfile call replaces the full situation, so tests are isolated by default.
// The beforeEach ensures a clean state even if a test throws mid-way.
beforeEach(() => {
  engine.setProfile({});
});

describe("AdemeComputeEngine", () => {
  describe("profil par défaut (moyenne française)", () => {
    it("le bilan total est cohérent avec la moyenne française (~7-12 tCO2e)", () => {
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

    it("chaque catégorie contribue positivement au bilan", () => {
      const { transport, food, housing, everydayThings, societalServices } =
        engine.computeFootprints();
      expect(transport.annualFootprint).toBeGreaterThan(0);
      expect(food.annualFootprint).toBeGreaterThan(0);
      expect(housing.annualFootprint).toBeGreaterThan(0);
      expect(everydayThings.annualFootprint).toBeGreaterThan(0);
      expect(societalServices.annualFootprint).toBeGreaterThan(0);
    });
  });

  describe("cohérence directionnelle par catégorie", () => {
    describe("transport", () => {
      it("augmenter les km en voiture augmente l'empreinte", () => {
        engine.setProfile({ "transport . voiture . km": 0 } as Profile);
        const low = engine.computeTransportFootprint().annualFootprint;

        engine.setProfile({ "transport . voiture . km": 20000 } as Profile);
        const high = engine.computeTransportFootprint().annualFootprint;

        expect(high).toBeGreaterThan(low);
      });

      it("un vol long-courrier augmente l'empreinte", () => {
        engine.setProfile({
          "transport . avion . usager": "oui",
          "transport . avion . long courrier . heures de vol": 0,
        } as Profile);
        const noFlight = engine.computeTransportFootprint().annualFootprint;

        engine.setProfile({
          "transport . avion . usager": "oui",
          "transport . avion . long courrier . heures de vol": 20,
        } as Profile);
        const withFlight = engine.computeTransportFootprint().annualFootprint;

        expect(withFlight).toBeGreaterThan(noFlight);
      });
    });

    describe("alimentation", () => {
      it("consommer plus de viande rouge augmente l'empreinte", () => {
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

    describe("logement", () => {
      it("une surface habitable plus grande augmente l'empreinte", () => {
        engine.setProfile({ "logement . surface": 20 } as Profile);
        const small = engine.computeHousingFootprint().annualFootprint;

        engine.setProfile({ "logement . surface": 150 } as Profile);
        const large = engine.computeHousingFootprint().annualFootprint;

        expect(large).toBeGreaterThan(small);
      });
    });
  });

  describe("régressions par persona", () => {
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
