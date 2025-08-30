import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { AppStore } from "@common/store/store";

const ademeComputeEngine = new AdemeComputeEngine();

export const defaultAppStoreValues: AppStore = {
  shouldShowIntro: {
    app: true,
    profile: true,
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
    transport: ademeComputeEngine.computeTransportFootprint(),
    food: ademeComputeEngine.computeFoodFootprint(),
    housing: ademeComputeEngine.computeHousingFootprint(),
    everydayThings: ademeComputeEngine.computeEverydayThingsFootprint(),
    societalServices: ademeComputeEngine.computeSocietalServicesFootprint(),
  },
  actions: [],
};
