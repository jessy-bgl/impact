import { AppStore } from "@data/store/store";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";

export const defaultAppStore: AppStore = {
  shouldShowIntro: {
    app: true,
    actions: true,
  },
  profile: {
    ademe: {},
    completion: {
      transport: {
        boat: false,
        car: false,
        otherTransport: false,
        plane: false,
        publicTransport: false,
        twoWheeler: false,
      },
      food: {
        drinks: false,
        meals: false,
        waste: false,
      },
      housing: {
        energy: false,
        home: false,
        leisure: false,
      },
      everydayThings: {
        clothes: false,
        consumableProducts: false,
        digital: false,
        furniture: false,
        hobbies: false,
        householdAppliances: false,
        otherProducts: false,
        pets: false,
        tobacco: false,
      },
      societalServices: {
        publicServices: true,
        merchantServices: true,
      },
    },
  },
  footprints: {
    transport: AdemeFootprintEngine.computeTransportFootprint(),
    food: AdemeFootprintEngine.computeFoodFootprint(),
    housing: AdemeFootprintEngine.computeHousingFootprint(),
    everydayThings: AdemeFootprintEngine.computeEverydayThingsFootprint(),
    societalServices: AdemeFootprintEngine.computeSocietalServicesFootprint(),
  },
  actions: [],
};
